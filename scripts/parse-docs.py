
import os
import tidy
import typ2md
import re

def process_description(description: str) -> str:
    md = typ2md.typ_to_md(description)
    def replace_cross_ref(match):
        name = match.group()[1:]
        return f'<Crossref target="{name}">{name}</Crossref>'
    md = re.sub(R"(?<!\\)(@\w[\w\d\-\._]*[\w\d\-]+)", replace_cross_ref, md)
    return md

def param2doc(param: dict) -> str:
    name, description = param["name"], param["description"].replace("\n", "\n  ")
    string = f"### {name}"
    if "types" in param:
        types = [f"`{t}`" for t in param["types"]]
        string += f" : {' | '.join(types)}"
    if "default" in param:
        string += f", _default:_ `{param['default']}`"
    string += f" {{#{name}}}"
    string += f"\n<Param>\n  {process_description(description)}\n</Param>"
    return string

def generate_signature(definition):
    name = definition["name"]
    string = f"<Signature>\n  <code>lilac."
    string += f"<span className='docs-signature-name'>{name}</span>"
    def display_param(param):
        name = param["name"]
        result = f"[{name}](#{name})"
        if "default" in param:
            result += f"={param['default']}"
        return result
    if "params" in definition:
        string += f"({', '.join(map(display_param, definition['params']))})"
    string += "</code>\n</Signature>"
    return string


def generate_mdx(docs):
    content = ""

    for definition in docs["definitions"]:
        name = definition['name']
        params = definition["params"]
        content += f"# {name}\n"
        content += generate_signature(definition) + "\n\n"

        content += process_description(definition["description"]) + "\n\n"
        content += "## Parameters\n<Parameters>\n"
        content += "\n\n\n".join(map(param2doc, params))
        content += "\n\n\n</Parameters>"
    return content

def main():
    path = "lilac/plot-types"
    outpath = "docs/plot-types"
    filenames = os.listdir(path)

    for filename in filenames:
        with open(os.path.join(path, filename), "r") as file:
            content = file.read()
        docs = tidy.TypDocParser().parse(content)
        mdx = generate_mdx(docs)

        with open(os.path.join(outpath, filename.replace(".typ", ".mdx")), "w") as file:
            file.write(mdx)



if __name__ == "__main__":
    main()