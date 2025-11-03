import itertools
import re


def replace_header(line: str):
    trimmed_line = line.lstrip()
    tr = trimmed_line.lstrip("=")
    count_eq = len(trimmed_line) - len(tr)
    if tr.startswith(" ") and count_eq > 0:
        return line[:len(line) - len(trimmed_line)] + "#" * count_eq + tr
    return line


def match_parentheses(string, paren="()"):
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
        if brace == "(" and source[function_end] == "[":
            more_args = match_parentheses(source[function_end:], "[]")
            index = function_end + len(more_args) + 2
            result += lookup[name](args, more_args)
        else:
            result += lookup[name](args)

    result += source[index:]
    result = "".join(itertools.chain(*zip(result.split("`"), raws)))
    return result


assert replace_functions("234#asd(asdasd)56#klp()78") == "2345678"
assert replace_functions("234#asd(asdasd)56#klp(--)78", lookup={
                         "klp": lambda x: f"<details>{x}</details>"}) == "23456<details>--</details>78"

replace_functions("```jojo#asd()```#asd()`#e()`")
# print(replace_functions(
#     "#link(\"https:/\")[name]",
#     lookup={"link": lambda x, y: f"[{y}]({x})"}
# ))
# == "[abc]"
# assert replace_header("= Heading") == "# Heading"
# assert replace_header("== Heading") == "## Heading"
# assert replace_header("    === Heading") == "    ### Heading"
# assert replace_header("h kdjfhs d = a") == "h kdjfhs d = a"


def typ_to_md(source: str) -> str:
    lines = source.split("\n")
    lines = map(replace_header, lines)
    source = "\n".join(lines)

    def replace_link(url, content):
        url = url.strip("\"")
        if not url.startswith("https"):
            url = "/docs/" + url
        return f"[{content}]({url})"

    def replace_details(it: str):
        indentation = ""
        if it.startswith("\n"):
            indentation = " " * (len(it) - len(it.lstrip()) - 1)
        return f"<details>\n{indentation}<summary>Example</summary>{it}</details>"
    
    source = replace_functions(source, {
        "details": replace_details,
        "summary": lambda it: f"<summary>{it}</summary>",
        "link": replace_link
    })
    return source
