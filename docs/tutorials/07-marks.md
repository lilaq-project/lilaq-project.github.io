---
title: Marks
description: Everything about marks. 
---

## Available marks

The following marks are available under `lq.marks`. 
```typ render
#set text(1.1em)
#let config = (size: 20pt, fill: blue, stroke: blue + 1pt)
#let mark-names = lq.marks.keys().map(raw)
#let marks = lq.marks.values().map(mark => box(
    width: config.size*1.5, 
    height: config.size*1.5,
    
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
  )

#let cols = 4
#table(
    columns: cols*2, align: right + horizon,
    column-gutter: (0em, 1em) * cols,
    stroke: none,
    ..mark-names.zip(marks).join()
)
```

Some marks feature extra parameters. They can be used like this:
```typc
lq.plot(mark: lq.marks.moon.with(angle: 90deg))
```
The parameter `n` always denotes the number of sides or spikes and `angle` the rotation of a mark. The `inset` of the star mark determines how far the inner points are pulled to the center. 
```typc
polygon(n: 5, angle: 0deg)
```
```typc
star(n: 5, angle: 0deg, inset: 60%)
```
```typc
asterisk(n: 5, angle: 0deg)
```
```typc
moon(angle: 0deg)
```
```typc
text(body: emoji.heart)
```

Notable marks are:
- The point mark `,` which is always `1pt` in diameter, regardless of the mark size. 
- The general-use `text` mark for showing anything given to the `body` parameter. 


## Sizing

Marks are carefully designed to match in their optical size for the same size setting. This gives a nice and homogeneous look when plotting with different marks. 

The optical size of a mark is of course subjective and is influenced by a combination of the area and the dimensions of a mark. 


- The circle mark has (at least when it has no stroke) the exact radius as given through `mark.size`. 
- The square is a bit smaller to better match the optical size of the circle. 
- The polygons (including the diamond) with low $n$ are drawn with a larger circumference. 
- In addition, polygons with 3, 5, and 7 sides are shifted by a fraction to improve the optical center. 
- Stars are drawn a bit larger to compensate their lack of area. 
- The asterisk and plus marks are enlarged. 

