
import os
import tidy
import typ2md
import re

def process_description(description: str) -> str:
    md = typ2md.typ_to_md(description)
    def replace_cross_ref(match):
        name = match.group()[1:].replace(".", "#")
        target = name
        return f'<Crossref target="{target}" />'
    md = re.sub(R"(?<!\\)(@\w[\w\d\-\._:]*[\w\d\-]+)", replace_cross_ref, md)
    return md

def load_available_examples():
    path = "docs/examples"
    filenames = os.listdir(path)
    examples = []
    for filename in filenames:
        if filename == "index.mdx": continue
        name = os.path.splitext(os.path.basename(filename))[0]
        with open(os.path.join(path, filename), "r") as file:
            content = file.read()
            if not content.startswith("---"):
                continue
            endfrontmatter = content[3:].index("\n---") + 3
            frontmatter = content[:endfrontmatter].strip("-\n").split("\n")

            def get_value(key, default=None):
                value = list(filter(lambda line: line.startswith(key + ":"), frontmatter))
                if len(value) == 0: return default
                return value[0][len(key) + 1:].strip()
            title = get_value("title", default=name)
            description = get_value("description", default="")
            image = get_value("  image")
            tags = get_value("  tags")
            if tags is not None:
                tags = list(map(str.strip, tags.strip("[]").split(",")))
            print(image, tags)


            examples.append({
                "name": name,
                "title": title,
                "image": image,
                "tags": tags,
                "description": description
            })

    return examples

def param2doc(param: dict) -> str:
    name, description = param["name"], param["description"].replace("\n", "\n  ")
    string = f"### {name}"
    if "types" in param:
        types = [f"`{t}`" for t in param["types"]]
        string += f" : {' | '.join(types)}"
    if "default" in param:
        string += f" <Default>`{param['default']}`</Default>"
    string += f" {{#{name}}}"
    string += f"\n<Param>\n  {process_description(description)}\n</Param>"
    return string

def generate_signature(definition):
    name = definition["name"]
    string = f"<Signature>\n  <code>lilac."
    string += f"<SignatureName>{name}</SignatureName>"
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


def generate_mdx(docs, examples=[]):
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

        tags = [name]
        concerned_examples = []
        print(examples)
        concerned_examples = list(filter(lambda example: any([tag in example["tags"] for tag in tags]), examples))
        if len(concerned_examples) != 0:
            content += "\n\nimport DocCard from '@theme/DocCard';\n"
            content += "\n\n## Examples\n\n<ExampleCards>\n"

            for concerned_example in concerned_examples:
                name = f"name: '{concerned_example['name']}', "
                href = f"href: '/docs/examples/{concerned_example['name']}', "
                image = f"image: require('@site/typst_renders/{concerned_example['image']}'), "
                description = f"description: '{concerned_example['description']}', "
                content += "  <DocCard item={{type: 'link', "+href+image+description + " }} />"
            content += "\n\n</ExampleCards>"
    return content

def main():
    examples = load_available_examples()
    path = "lilac/plot-types"
    outpath = "docs/plot-types"
    filenames = os.listdir(path)

    for filename in filenames:
        with open(os.path.join(path, filename), "r") as file:
            content = file.read()
        docs = tidy.TypDocParser().parse(content)
        mdx = generate_mdx(docs, examples=examples)

        with open(os.path.join(outpath, filename.replace(".typ", ".mdx")), "w") as file:
            file.write(mdx)



if __name__ == "__main__":
    main()

    # load_available_examples()