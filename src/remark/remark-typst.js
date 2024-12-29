import { visit } from "unist-util-visit";
import { exec } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";

const typTemplate = `
#set page(width: auto, height: auto, margin: .5cm, fill: white)
#import "lilac/lilac.typ" as lc
`;

const typcTemplate = [
  `
    #set page(width: auto, height: auto, margin: .5cm, fill: white)
    `,
  "",
];

const replacements = [
  ["#import lilac", "#import \"@preview/lilac:0.1.0\" as lc", "#import \"lilac/lilac.typ\" as lc"]
]

function split_once(content, separator) {
  let i = content.indexOf(separator);
  if (i == -1) { return [content]; }
  return [content.slice(0, i), content.slice(i + 1)];
}

function parse_options(argstring) {
  let options = { title: null }
  let args = argstring.replaceAll("\\\"", "$$$$$$$$").split(" ");
  let connected = false;
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (connected && !arg.includes("\"") && i != args.length - 1) {
      // args[i + 1] = arg + " " + args[i + 1];
      args[i] = args[i - 1] + " " + args[i];
      continue;
    }
    if (arg.includes("\"")) {
      if (!connected) {
        if (!arg.endsWith("\"")) {
          connected = true;
          continue;
        }
      } else {
        arg = args[i - 1] + " " + arg;
        connected = false;
      }
    }
    let parts = split_once(arg, "=");
    if (parts.length == 1) {
    } else {
      let [name, value] = parts;
      value = value.replace(/^\"+|\"+$/g, '').replaceAll("$$$$", "\\\"")
      if (name == "title") {
        options.title = value
      } else {
        options[name] = value;
      }
    }
  }
  return options;
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
      let title = null;
      if (node.meta != null) {
        let options = parse_options(node.meta)
        title = options.title;
        console.log(options)
      }



      if (node.lang === "example") {
        node.lang = "typ"
        node.meta = "example"
      }
      if (node.lang === "examplec") {
        node.lang = "typc"
        node.meta = "example"
      }
      if (
        !(
          (node.lang === "typ" || node.lang === "typc" || node.lang === "example" || node.lang === "examplec") &&
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
          .update(node.meta + node.value)
          .digest("hex")
          .slice(0, 6);
        title = hash
      }
      const path = folder + title + ".svg";
      let code = node.value
      for (const [value, raw_replacement, code_replacement] of replacements) {
        node.value = node.value.replace(value, raw_replacement)
        node.value = node.value.split("\n").filter((line) => !line.trimStart().startsWith(">>>")).join("\n")
        code = code.replace(value, code_replacement)
        code = code.replace(">>>", "")
      }
      if (!existsSync(path)) {
        children.push(
          new Promise((resolve) => {
            const child = exec(`typst c - ${path} --root .`);

            if (!child.stdout || !child.stderr || !child.stdin)
              throw new Error(`Failed to spawn typst process`);

            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
            if (node.lang === "typ") {
              child.stdin.write(typTemplate + code);
            } else {
              child.stdin.write(typcTemplate[0] + code + typcTemplate[1]);
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
