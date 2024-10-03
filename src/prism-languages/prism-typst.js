const comment = [
    {
      pattern: /\/\*[\s\S]*?\*\//,
      greedy: true,
    },
    {
      pattern: /(^|[^:])\/\/.*/,
      lookbehind: true,
      greedy: true,
    },
  ];
  
  Prism.languages["typst-code"] = {
    comment: comment,
    function: /\b(?!\d)[\w-]+(?=\[|\()/,
    keyword:
      /(?:#|\b)(?:as|break|context|continue|else|export|for|if|import|in|include|let|return|set|show|while|none|auto)\b/,
    interpolate: /#[\w-]+/,
    number: /[\d][\de.]*(?:deg|rad|mm|cm|em|fr|in|pt|%)?/,
    string: {
      pattern: /#?"(?:\\.|[^\\"])*"/,
      greedy: true,
    },
  };
  
  Prism.languages.typst = {
    comment: comment,
    string: [
      {
        pattern: /\$(?:\\.|[^\\$])*\$/,
        greedy: true,
      },
    ],
    "code-mode": [
      {
        pattern: /(?<=#.*)\{[\s\S]*\}/,
        inside: Prism.languages["typst-code"],
      },
      {
        pattern: /#.+/,
        inside: Prism.languages["typst-code"],
      },
    ],
  };
  
  Prism.languages.typ = Prism.languages.typst;
  Prism.languages.typc = Prism.languages["typst-code"];