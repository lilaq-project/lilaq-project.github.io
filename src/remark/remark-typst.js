import { visit } from "unist-util-visit";
import { exec } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";

const typTemplate = `
#set page(width: eval(sys.inputs.width), height: eval(sys.inputs.height), margin: .5cm, fill: white)
`;

const typcTemplate = [
  `
    #set page(width: sys.inputs.width, height: sys.inputs.height, fill: white, margin: .5cm)
    `,
  "",
];

function generate_typst_inputs(options) {
  let inputs = []
  for (const key in options) {
    inputs.push("--input " + key + "=" + options[key])
  }
  return inputs.join(" ")
}

const plugin = () => {
  /**
   * This transformer renders code blocks of type "typ" (Typst file)
   * and "typc" (Typst code).
   * If the code should be shown, "example" must be inside the metadata,
   * otherwise "render" (i.e. only output the rendered code).
   *
   *
   * The code is cached inside the `typst_renders/` folder.
   *
   * @example
   *
   * ````markdown
   * ```typc example
   * 12 + 3
   * ```
   *
   * ```typc example
   * 12 + 3
   * ```
   * ````
   */
  const transformer = async (ast) => {
    let children = [];
    let folder = "typst_renders/";
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
    visit(ast, { type: "code" }, (node, index, parent) => {
      let options = { width: "auto", height: "auto" };
      let title = null;
      if (node.meta != null) {
        let args = node.meta.split(" ");
        for (let arg of args) {
          let parts = arg.split("=");
          if (parts.length == 1) {
          } else {
            const [name, value] = parts;
            if (name in options) { options[name] = value; }
            else if (name == "title") { title = value.trim("\""); }
          }
        }
      }
      const input_options = generate_typst_inputs(options)
      if (
        !(
          (node.lang === "typ" || node.lang === "typc") &&
          (node.meta?.includes("render") || node.meta?.includes("example"))
        )
      ) {
        return;
      }


      if (index === undefined || parent === undefined) {
        throw new Error("Invalid location for typst code example");
      }

      if (title === null) {
        const hash = createHash("md5")
          .update(node.value)
          .digest("hex")
          .slice(0, 6);
        title = hash
      }
      const path = folder + title + ".svg";
      if (!existsSync(path)) {
        children.push(
          new Promise((resolve) => {
            const child = exec(`typst c - ${path} ${input_options} --root ./lilac/`);

            if (!child.stdout || !child.stderr || !child.stdin)
              throw new Error(`Failed to spawn typst process`);

            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
            if (node.lang === "typ") {
              child.stdin.write(typTemplate + node.value);
            } else {
              child.stdin.write(typcTemplate[0] + node.value + typcTemplate[1]);
            }
            child.stdin.end();
            child.on("exit", () => resolve());
          }),
        );
      }

      if (node.meta.includes("render")) {
        parent.children[index] = {
          type: "image",
          url: "@site/" + path,
        };
      } else {
        // Wrap the code and rendered image in the `PreviewedCode` component.
        // This is equivalent to the following JSX:
        //
        // <PreviewedCode>
        //   {code}
        //   <img src="@site/..." />
        // </PreviewedCode>
        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "PreviewedCode",
          children: [
            node,
            {
              // @ts-expect-error This will be transformed into an <img> by the image transformer
              type: "image",
              url: "@site/" + path,
            },
          ],
        };
      }
    });
    await Promise.all(children);
  };
  return transformer;
};

export default plugin;
