
const comment = [
  {
    pattern: /\/\*[\s\S]*?\*\//,
    greedy: true,
  },
  {
    pattern: /\/\/.*/,
    greedy: true,
  },
];



Prism.languages["typst-math"] = {
  comment: comment,
  escaped: /\\\S/,
  operator: [
    /[_\\\^\+\-\*\/&]/,
  ],
  string: /\$/,
  function: /\b[a-zA-Z][\w-]*(?=\[|\()/,
  symbol: /[a-zA-Z][\w]+/
}

const math = [
  {
    pattern: /\$(?:\\.|[^\\$])*?\$/,
    inside: Prism.languages["typst-math"],
    // greedy: true,
  },
]


Prism.languages["typst-code"] = {
  typst: {
    pattern: /\[[\s\S]*\]/,
    inside: Prism.languages["typst"],
    greedy: true
  },
  comment: comment,
  math: math,
  function: [
    /#?[a-zA-Z][\w-]*(?=\[|\()/,
    /(?<=#show [\w.]*)[a-zA-Z][\w-]*\s*:/,
    /(?<=#show\s*:\s*)[a-zA-Z][\w-]*/,
  ],
  keyword: /(?:#|\b)(?:true|false|none|auto|let|return|if|else|set|show|context|for|while|not|in|continue|break|include|import|as)\b/,
  boolean: /(?:#|\b)(?:true|false)\b/,
  string: {
    pattern: /#?"(?:\\.|[^\\"])*"/,
    greedy: true,
  },
  number: /[\d]+\.?[\d]*(e\d+)?(?:in|mm|cm|pt|em|deg|rad|fr|%)?/,
  symbol: /#[\w-.]+\./,
};


Prism.languages.typst = {
  comment: comment,
  math: math,
  "code-mode": [
    {
      // enter code mode via #my-func() or #()
      pattern: /(?<=#[a-zA-Z][\w-.]*\()(?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\)/,
      pattern: /(?<=#([a-zA-Z][\w-.]*)?\()(?:[^)(]|\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\))*\))*\)/,
      // between # and ( either
      // - nothing: #(
      // - Declaration: #let ... (
      // - Function call: #my-func2(
      // # 
      // pattern: /#.*?\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\))*\))*\)(?!\s*=)/,
      pattern: /(?:#(?:(?:let.*?)|(?:[\w-.]+)|(?:)))\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\))*\))*\)(?!\s*=)/,
      // lookbehind: true,
      inside: Prism.languages["typst-code"],
      greedy: true,
    },
    {
      // enter code mode via #{}
      // pattern: /(?<=#)\{[\s\S]*\}/,
      // pattern: /#.*\{(?:[^}{]|\{(?:[^}{]|\{(?:[^}{]|\{[^}{]*\})*\})*\})*\}/,
      // pattern: /(?<=#).*\{(?:[^}{]|\{(?:[^}{]|\{(?:[^}{]|\{[^}{]*\})*\})*\})*\}/,
      pattern: /#.*\{(?:[^}{]|\{(?:[^}{]|\{(?:[^}{]|\{[^}{]*\})*\})*\})*\}/,
      inside: Prism.languages["typst-code"],
      greedy: true,
    },
    {
      pattern: /#(?:import|let|if|context|set|show).*/,
      inside: Prism.languages["typst-code"],
      greedy: true,
    },
  ],
  function: [
    {
      pattern: /#\b[a-zA-Z][\w-]*(?=\[|\()/,
      greedy: true,
    },
    /(?<=#[\w.]+)[a-zA-Z][\w-]*(?=\[|\()/,
  ],
  escaped: [
    /\\\S/,
    /\\\s/,
  ],
  string: math,
  label: {
    pattern: /<[\w-\.]*>/, // starting with ([^\\]) not necessary anymore when matching "escaped" before
    lookbehind: true,
  },
  reference: {
    pattern: /@[\w-\.]*/,
    lookbehind: true,
  },
  boltalic: [
    /_\*.*?\*_/,
    /\*_.*?_\*/,
  ],
  bold: /\*.*?\*/,
  italic: /_.*?_/,
  backslash: /\\/,
  heading: /^\s*=+ .*/m,
  symbol: /#[\w-.]*[\w-]+/,
};


Prism.languages["typst-code"].typst = {
  pattern: /\[[\s\S]*\]/,
  inside: Prism.languages["typst"],
}


Prism.languages.typ = Prism.languages.typst;
Prism.languages.typc = Prism.languages["typst-code"];