import os
import sys
import re
import tomllib
# data = sys.argv[1]

def replace_in_file(filename: str, text: str, replacement: str):
    with open(filename, "r") as file:
        content = file.read()
    content = content.replace(text, replacement)
    with open(filename, "w") as file:
        file.write(content)
    

if __name__ == "__main__":
    assert len(sys.argv) == 2, "Please pass the new version as argument"
    
    new_version = sys.argv[1]
    assert re.match(R"\d+\.\d\.+\d+$", new_version) != None, f"The version \"{new_version}\" seems invalid"
    

    os.system(f"npm version {new_version}")

    with open("lilaq/typst.toml", "rb") as file:
        current_version = tomllib.load(file)["package"]["version"]

    assert current_version != new_version, "The new version is the same as the old one"

    print(f"Bumping version from {current_version} to {new_version}")
    replace_in_file("lilaq/README.md", current_version, new_version)
    replace_in_file("lilaq/typst.toml", current_version, new_version)
