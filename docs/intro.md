---
sidebar_position: 1
---


```typ

= Typst Prism

== Distinguishing markup and code mode <section1>

Distinguishing between *markup* and *code* mode (not 
to forget _math_) is not as easy as one would think. 
#[
  Especially since they can be
  #{
    "nested"
    [
      _and nested_
      #{
        "and even more"
        [
          *nested*. 
        ]
      }
    ]
  }
]
Basically, Typst code consists of three languages. And 
you can go from each language to each other language 
by using all kinds of
#let parentheses = ("()", "[]", "{}")
In order to parse the code properly, we need to do 
_balanced matching_ for these #parentheses. The problem
is that #regex() is not good at doing recursive things. 

This is why the recursion depth is _*limited*_. 


== Code mode

After we enter code mode, which is quite tricky as we
saw in section @section1, syntax highlighting looks 
quite different. 

There are
#{
  let lengths = (1pt, 1fr, -2, 1em, 3deg, 0in, 9cm, 0rad, 100%, 1mm)
  [and]
  let floats = (1.2, 2e9, -3.0003e99)
}


When in markup mode, certain keywords change the 
context to code mode for the entire line
#import "@preview/conchord:0.2.0" as con
#let x = range(0, 10)

We can #emoji.wave and #data.rev()
#if true [
  *yes*
] else [ // this is a bug and I don't know how to fix it
  noe
]

#let my-func(a: 1pt, b, c) = {
  2pt + 20pt
  if true {
    return false
  }
}

#show heading: it => {
  it * 2
}
#show math.equation.where(block: true): it => {}
#show math.equation: it => {}
#show: template
#show  : template

== Markup mode

All escaped symbols, like \@, \{, \} etc. are noticed! 
The same holds for line/equation breaks \

#set text(2em, red)
#show math.equation(numbering: "(1)")

#hide[_hidden_]

#table(
  columns: (auto, auto, 1fr),
  $A$, $B$, $C$,
  ..range(20).map(i => str(2*(i+1))) // note: here lurks a recursion limit for () pairs
)


#(23+
23)
#let p = ("a", "k")
#(21)
#let p = ("a", "k")
21
#let pd = "a"
12

== Equations <equations>

$ 
  c^2 &= a^2 + b^2 \ 
    c &= plus.minus sqrt(a^2 + b^2) 
$

#[
  $ a + x + b $
  $ a + #place([]) x + b $
]


Switching to content mode within equations is currently
not supported: $#box[*2*]$


== Modes and comments

Due to matching rules, it is tricky to get comments and switched language modes to work. Let's check some cases
#{
  // We have entered code mode
  let verification = "Is this parsed as code?"
  table(
    columns: 2, // we're still in code mode, the "2" is an int
  )
  let /*really bad practice*/ x = 2pt
  [
    // Back in markup mode
    #hide()
    let // <- not a keyword
  ]
  [/**/ #hide[]]
}
#table(
  columns: 2, // we're now in code mode, the "2" is an int
)

#let url = "https://another.edge/case" // sometimes "tricky"


This is not simplified

#{
  [$ a + c $ *heaing*]
}
let asd #var #emoji.face let
#lc.asd.diagram(
  lc.plot(x, x.map(x => calc.sin((x+(2+2))*2)))
)
#d.iagram(
  lc.plot(x, x.map(x => calc.sin(x)))
)

#asd()

<script> 
   let 
</script>
```
```markup
# asd
<div>
/*a*/
</div>
```
```typ
if true {
} else {
}

#{
  if true {
    [*markup*]
  } else {

  }
}

if true {
} else {
}
```
```typ
34
#table(auto)

/* asd as */
= heading <label\> \<label> <label\> <label>
<asd> <lilac0-.asasd> < asd >

*intro* _italic_
@asd \@notasd \| \a a
#{
  let k = auto
  if a = {

  }
  let k = auto
}
#let a 
let j


#{
  [
    #let a 
  ]
}
as34
#[
  #let a 
  <asd>
  *asd*
  #x
  #{
    let k 
    [*bold font* +34 *+* _italic_ _*boltalic*_ *_also boltalic_*]
  }
  let 
]
```


```typ

```

```typ example width=auto title=bsd_asd
#table(
  columns: (auto, auto, auto),
  inset: 10pt,
  align: horizon,
  table.header(
    [], [Area], [*Parameters*],
  ),
  [aCylindar],
  $ pi ha (D^2 - d^2) / 4 $,
  [
    $h$: height \
    $D$: outer radius \
    $d$: inner radius
  ],
  [Tetrahedron],
  $ sqrt(2) / 12 a^3 $,
  [$a$: edge length]
)

```


```typc
place(dx: 2pt, rect())
```
# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
