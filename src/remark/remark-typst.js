import { visit } from "unist-util-visit";
import { exec } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, existsSync, mkdirSync } from "node:fs";

const typTemplate = `
#set page(width: auto, height: auto, margin: .5cm, fill: white)
#import lilaq
`;

const toml = require('toml');
let package_config = toml.parse(readFileSync("lilaq/typst.toml", "utf8"));

const replacements = [
  ["#import lilaq", "#import \"@preview/lilaq:" + package_config.package.version + "\" as lq", "#import \"lilaq/src/lilaq.typ\" as lq"]
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
   * Transforms code blocks with language typ/typc or
   * example/examplec. 
   * 
   * - The code `#import lilaq` is transformed to a proper import
   *  statement using the latest package version. 
   * 
   * - When the language is example/examplec, it is transformed to
   *   typ/typc, respectively and the code is automatically executed
   *   and shown along with the code text with the PreviewedCode element. 
   * 
   *   This is then equivalent to 
   *      ```markdown
   *      <PreviewedCode>
   *      
   *      ```typ
   *      ...
   *      ```
   *      
   *      <img src="@site/..." />
   *      </PreviedCode>
   *      ```
   * 
   * - Lines starting with `>>>` are hidden but executed in examples.
   * - Lines starting with `<<<` are not executed but shown in examples.
   * 
   */
  const transformer = async (ast) => {
    let children = [];
    const folder = "static/img/typst-generated/";
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
    visit(ast, { type: "code" }, (node, index, parent) => {
      let title = null;
      if (node.meta != null) {
        title = parse_options(node.meta).title;
      }

      let reverse_order = (node.meta?.includes("reverse-order"))
      


      if (node.lang === "example") {
        node.lang = "typ";
        node.meta = "example";
      }
      if (node.lang === "examplec") {
        node.lang = "typc";
        node.meta = "example";
      }

      if(!["typ", "typc"].includes(node.lang)) { return; }
      
      if (index === undefined || parent === undefined) {
        throw new Error("Invalid location for typst code example");
      }

      
      let code = node.value;
      if (node.lang == "typc") {
        code = "\n#{\n" + code + "\n}";
      }
      code = typTemplate + code
      for (const [value, raw_replacement, code_replacement] of replacements) {
        node.value = node.value.replaceAll(value, raw_replacement);
        code = code.replaceAll(value, code_replacement);
      }
      node.value = node.value.split("\n").filter((line) => !line.trimStart().startsWith(">>>")).join("\n");
      code = code.replaceAll(">>>", "");
      code = code.split("\n").filter((line) => !line.trimStart().startsWith("<<<")).join("\n");
      node.value = node.value.replaceAll("<<<", "");

      if(!(node.meta?.includes("render") || node.meta?.includes("example"))) { return; }

      if (title === null) {
        const hash = createHash("md5")
          .update(node.meta + node.value)
          .digest("hex")
          .slice(0, 6);
        title = hash;
      }

      const path = folder + title + ".svg";
      if (!existsSync(path)) {
        children.push(
          new Promise((resolve) => {
            const child = exec(`typst c - ${path} --root .`);

            if (!child.stdout || !child.stderr || !child.stdin)
              throw new Error(`Failed to spawn typst process`);

            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
            child.stdin.write(code);
            child.stdin.end();
            child.on("exit", () => resolve());
          }),
        );
      }

      let image = {
        type: "image",
        url: "@site/" + path,
      }
      

      if (node.meta?.includes("render")) {
        parent.children[index] = image
      } else {
        let children = [
          {
            type: "mdxJsxFlowElement",
            name: "Code",
            children: [node],
          },
          {
            type: "mdxJsxFlowElement",
            name: "Preview",
            children: [image],
          }
        ]

        if (reverse_order) {
          children.reverse()
        }

        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "PreviewWrapper",
          children: children,
        };
      }
    });
    await Promise.all(children);
  };
  return transformer;
};

export default plugin;
