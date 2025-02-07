

import os
import subprocess



if __name__ == "__main__":
    path = "src/typst"
    destination = "static/img/typst"
    for root, subdirs, filenames in os.walk(path):
        for filename in filenames:
            if filename.endswith(".typ") and not "template" in filename:
                input_file = os.path.join(root, filename)
                output_file = os.path.join(destination, os.path.relpath(input_file, path).replace(".typ", ".svg"))
                os.makedirs(os.path.dirname(output_file), exist_ok=True)
                print(input_file, output_file)
                os.system(f"typst c {input_file} {output_file} --root .")
