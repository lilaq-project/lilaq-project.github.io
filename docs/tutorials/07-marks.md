---
title: Marks
description: Everything about marks. 
---



Marks serve for _mark_-ing data points. Lilaq features a set of built-in marks, shown below. Marks can be set via the `mark` key for all plot types that use marks (e.g., <Crossref target="plot#mark" />, <Crossref target="scatter#mark" />, <Crossref target="stem#mark" />). 

There are two ways to specify a mark
- Either by fetching a mark directly from `lq.marks`, e.g., `lq.marks.star`. Some marks have additional parameters that can be set here, e.g., `lq.marks.star.with(n: 6)`. 
- Or as a `string` with a mark name from `lq.marks`. 
The available names are also shown in the table below. 



## Available marks

The following marks are available under `lq.marks`. 
```typ render
#set text(1.1em)
#let config = (size: 20pt, fill: blue, stroke: blue + 1pt)

#let display-mark(mark) = box(
  width: config.size * 1.5, 
  height: config.size * 1.5,
  // inset: config.size*0.25,
  stroke: 1pt + gray,
  {
      set line(stroke: .5pt + gray)
      place(
        center + horizon,
        rect(width: config.size, height: config.size, fill: luma(90%))
      )
      place(line(start: (0%, 50%), length: config.size*1.5))
      place(line(start: (50%, 0%), angle: 90deg, length: config.size*1.5))
      place(mark(config), dx: 50%, dy: 50%)
  }
)

#let el(mark, ..names) = {
  names = names.pos()
  names = (mark,) + names
  (names.map(raw).join(", "), display-mark(lq.marks.at(mark)))
}

#table(
  columns: 8,
  align: right + horizon,
  column-gutter: (0em, 1em) * 4,
  stroke: none,
  ..el("none"), ..el("."), ..el(","), [], [],
  ..el("x"), ..el("+"), ..el("-"), ..el("|"), 
  ..el("a3"), ..el("a4"), ..el("a5"), ..el("a6"), 
  ..el("o"), ..el("s"), ..el("d"), [],[],
  ..el("^"), ..el("v"), ..el("<"), ..el(">"),
  ..el("p5"), ..el("p6"), ..el("p7"), ..el("p8"),
  ..el("s3"), ..el("s4"), ..el("s5"), ..el("s6"),
  ..el("moon"), [],[], [], [],[], [],
  table.hline(),
  table.cell(colspan: 8, align: center)[General marks],
  ..el("polygon"), ..el("star"), ..el("asterisk"), ..el("text"), 

)
```



The triangle marks `^`, `v`, `<`, and `>` as well as `p5`, `p6`, `p7`, and `p8` are specializations of the `polygon` mark which features the parameters `n` and `angle`. 

The same holds for the star marks `s3`, `s4`, `s5`, and `s6` which are specializations of the `star`. Aside from the parameters `n` and `angle`, this mark also features the parameter `inset` that determines how far the inner points are pulled to the center.

The asterisks `a3`, `a4`, `a5`, and `a6` are specializations of the `asterisk` mark which is just `star.with(inset: 100%)`. The `+` mark is an alias for `a4`. 

The text mark can be used to show anything given to the `body` parameter, e.g., `text.with(body: [Y])`. 
Notable marks are:
- The point mark `,` which is always `1pt` in diameter, regardless of the mark size. 
- The general-use `text` mark for showing anything given to the `body` parameter. 


## Custom mark shapes

It is easy to create a custom mark shape. A shape is just a function that receives a `mark` object with the fields `size` (a `length`), `fill` (a `color`), and `stroke` which returns the mark content. 

```example
#lq.diagram(
  lq.plot(
    (1, 2, 3, 4),
    (1, 2, 3, 4),
    stroke: none,
    mark: mark => place(
      center + horizon, text(mark.fill)[%]
    )
  )
)
```

There is also the special `lq.marks.text` marker that can be employed to quickly use any symbol (or really any content) as a marker. 


## Sizing

Marks are carefully designed to match in their optical size for the same size setting. This gives a nice and homogeneous look when plotting with different marks. 

The optical size of a mark is of course subjective and is influenced by a combination of the area and the dimensions of a mark. 


- The circle mark has (at least when it has no stroke) the exact radius as given through `mark.size`. 
- The square is a bit smaller to better match the optical size of the circle. 
- The polygons (including the diamond) with low $n$ are drawn with a larger circumference. 
- In addition, polygons with 3, 5, and 7 sides are shifted by a fraction to improve the optical center. 
- Stars are drawn a bit larger to compensate their lack of area. 
- The asterisk and plus marks are enlarged. 

