import itertools
import re


def replace_header(line: str):
    trimmed_line = line.lstrip()
    tr = trimmed_line.lstrip("=")
    count_eq = len(trimmed_line) - len(tr)
    print(trimmed_line, tr)
    if tr.startswith(" ") and count_eq > 0:
        return line[:len(line) - len(trimmed_line)] + "#" * count_eq + tr
    return line


def match_parentheses(string, paren="()"):
    print(string)
    assert len(paren) == 2
    bl, br = paren
    assert string[0] == bl
    level = 0
    prev_char = ""
    end = 0
    is_within_literal = False

    for char in string:
        if prev_char != "\\":
            if char == "\"":
                is_within_literal = not is_within_literal
            elif char == bl and not is_within_literal:
                level += 1
            elif char == br and not is_within_literal:
                level -= 1
        prev_char = char
        end += 1
        if level == 0:
            break
    return string[1:end - 1]


def replace_functions(source: str, lookup: dict = {}) -> str:
    a = source.split("`")
    source = "`".join(a[::2])
    raws = [f"`{raw}`" for raw in a[1::2]] + [""]
    matches = list(re.finditer(R"(?<!\\)\#([\w\-\.]+)([\[\(])", source))

    if matches == None:
        return source

    result = ""
    index = 0
    for match in matches:
        result += source[index:match.start()]
        name, brace = match.groups()
        args = match_parentheses(source[match.end() - 1:], "()" if brace == "(" else "[]")
        function_end = match.end() + len(args) + 1
        index = function_end
        if name not in lookup:
            continue
        result += lookup[name](args)

    result += source[index:]
    result = "".join(itertools.chain(*zip(result.split("`"), raws)))
    return result


assert replace_functions("234#asd(asdasd)56#klp()78") == "2345678"
assert replace_functions("234#asd(asdasd)56#klp(--)78", lookup={
                         "klp": lambda x: f"<details>{x}</details>"}) == "23456<details>--</details>78"

replace_functions("```jojo#asd()```#asd()`#e()`")
# assert replace_header("= Heading") == "# Heading"
# assert replace_header("== Heading") == "## Heading"
# assert replace_header("    === Heading") == "    ### Heading"
# assert replace_header("h kdjfhs d = a") == "h kdjfhs d = a"


def typ_to_md(source: str) -> str:
    lines = source.split("\n")
    lines = map(replace_header, lines)
    source = "\n".join(lines)
    source = replace_functions(source, {
        "details": lambda it: f"<details>{it}</details>",
        "summary": lambda it: f"<summary>{it}</summary>",
        })
    return source
