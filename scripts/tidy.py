import re

def trim_trailing_comments(line: str) -> str:
  return line
  pos = line.find("//")
  if pos == -1: 
      return line
  return line[:pos].strip()

# assert trim_trailing_comments("Hello from here // comment // another") == "Hello from here"
# assert trim_trailing_comments(" abc//34") == "abc"

class ArgumentParser:
    def __init__(self, start=False):
        self.brace_level = 1
        self.literal_mode = None # Whether in ".."

        self.args = []
        self.arg = ""
        self.is_named = False # Whether current argument is a named arg
        self.previous_char = None # lookbehind of 1
        self.count_processed_chars = 1
        self.running = start

    def _add_current_arg(self):
        if self.is_named:
            (name, value) = map(str.strip, self.arg.split(":", maxsplit=1))
            self.args.append({ "name": name, "default": value, "description": "" })
        else:
            self.arg = self.arg.strip()
            self.args.append({ "name": self.arg, "description": "" })

    def parse(self, string: str) -> bool:
        self.running = True
        if self.brace_level == 0:
            raise RuntimeError("Argument list is already finished", string)
        for c in string:
            ignore_char = False
            if c == "\"" and self.previous_char != "\\": 
                if self.literal_mode == None: self.literal_mode = "\""
                elif self.literal_mode == "\"": self.literal_mode = None
            if self.literal_mode == None:
                if c == "(": self.brace_level += 1
                elif c == ")": self.brace_level -= 1
                elif c == "," and self.brace_level == 1:
                    self._add_current_arg()
                    self.arg = ""
                    ignore_char = True
                    self.is_named = False
                elif c == ":" and self.brace_level == 1:
                    self.is_named = True

            self.count_processed_chars += 1
            if self.brace_level == 0:
                if len(self.arg.strip()) > 0: 
                    self._add_current_arg()
                break
            if not ignore_char: self.arg += c
            self.previous_char = c
        if self.brace_level == 0:
            self.running = False
        return self.brace_level == 0


class TypDocParser:
    def __init__(self):
        self.state = "idle"
        self.description = ""
        self.definitions = []

        # parser state
        self.params = []
        self.desc_lines = []
        self.name = None
        self.found_code = False
        self.args = []
        self.arg_parser = ArgumentParser()

    def parse(self, source: str, ignore_private_definitions=True):
        lines = map(str.strip, (source.split("\n") + [""]))
        for line in lines:
            self._parse_line(line)
        if ignore_private_definitions:
            self.definitions = list(filter(lambda x: not x["name"].startswith("_"), self.definitions))
        return {
            "name": self.name,
            "description": self.description,
            "definitions": self.definitions
        }

    def _parse_line(self, line: str):
        if line.startswith("///"):
            self._process_doc_comment_line(line)
        elif len(self.desc_lines) != 0 or True:
            self._process_code_line(trim_trailing_comments(line))

    def _process_desc_lines(self, lines: list) -> str:
        description = "\n".join(lines)
        pos = description.rfind("->")
        types = None
        if pos != -1:
            types = map(str.strip, description[pos + 2:].replace(",", "|").split("|"))
            description = description[:pos]
        result = { "description": description.strip() }
        if types != None:
            result["types"] = list(types)
        return result


    def _process_doc_comment_line(self, line: str):
        line = line[3:]
        if line.startswith(" "): 
            line = line[1:]
        self.desc_lines.append(line)

    def _add_current_definition(self, var=False):
        definition = { "name": self.name }
        definition.update(self._process_desc_lines(self.desc))
        if not var:
            definition["params"] = self.arg_parser.args

        self.definitions.append(definition)
        self.name = None
        self.desc_lines = []

    def _process_code_line(self, line):
        if self.arg_parser.running:
            num_args = len(self.arg_parser.args)
            has_finished = self.arg_parser.parse(line)
            if len(self.arg_parser.args) > num_args and len(self.desc_lines) != 0:
                self.arg_parser.args[num_args].update(self._process_desc_lines(self.desc_lines))
                self.desc_lines = []
            if has_finished:
                self._add_current_definition()
        elif len(self.desc_lines) != 0:
            line = line.lstrip("#")
            if line.startswith("let ") and self.name == None:
                self.found_code = True
                match = re.match(R"#?let (\w[\w\d\-_]*)\s*(\(?)", line)
                if match == None:
                    return
                self.name, paren = match.groups()
                
                if paren == "(":
                    self.state = "running"
                    self.arg_parser = ArgumentParser(start=True)
                    self.desc = self.desc_lines
                    self.desc_lines = []
                    if self.arg_parser.parse(line[match.end():]):
                        self._add_current_definition()
                else:
                    self.desc = self.desc_lines
                    self.desc_lines = []
                    self._add_current_definition(var=True)
                
            else:
                if not self.found_code:
                    self.found_code = True
                    self.description = "\n".join(self.desc_lines).strip()
                    self.desc_lines = []
                
                if self.name == None:
                    self.desc_lines = []

