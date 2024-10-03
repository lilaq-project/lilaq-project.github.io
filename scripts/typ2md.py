
def replace_header(line: str):
    trimmed_line = line.lstrip()
    tr = trimmed_line.lstrip("=")
    count_eq = len(trimmed_line) - len(tr)
    print(trimmed_line, tr)
    if tr.startswith(" ") and count_eq > 0:
        return line[:len(line) - len(trimmed_line)] + "#" * count_eq + tr
    return line


assert replace_header("= Heading") == "# Heading"
assert replace_header("== Heading") == "## Heading"
assert replace_header("    === Heading") == "    ### Heading"
assert replace_header("h kdjfhs d = a") == "h kdjfhs d = a"


def typ_to_md(source: str) -> str:
    lines = source.split("\n")
    lines = map(replace_header, lines)
    return "\n".join(lines)
