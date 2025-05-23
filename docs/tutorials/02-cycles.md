---
title: Using style cycles
description: Creating and using cycles to style consecutive plots. 
---


:::warning

**Note that currently style cycles are in a mock-up stage since there are no user-defined types available yet. Instead, we use a _huge_ hack abusing existing types.** But this is good for studying how everything should behave. 

::: 


Style cycles define a repeating sequence of for example colors or marks for consecutive plots. This is useful to 
- quickly be able to distinguish multiple plots without explicitly setting their color and
- to ensure consistency between diagrams. 

```example
#lq.diagram(
  lq.plot(range(4), range(2, 6), label: [1]),
  lq.plot(range(4), range(1, 5), label: [2]),
  lq.plot(range(4), range(0, 4), label: [3]),
)
```
Many [plot types](/docs/plot-types) are affected by style cycles (exceptions are for example <Crossref target="boxplot" />, <Crossref target="colormesh" />, and <Crossref target="contour" />). 



## Usage

The style cycle can be set through <Crossref target="diagram#cycle" />. The simple option is to pass an array of colors:
```example
#lq.diagram(
  cycle: (red, teal),
  lq.plot(range(4), range(2, 6), label: [1]),
  lq.plot(range(4), range(1, 5), label: [2]),
)
```

Alternatively, an array of dictionaries can be used to specify `color`, `mark`, and `stroke` (all optional). 
```example
#lq.diagram(
  cycle: (
    (color: red, mark: "x"),
    (color: teal, mark: "+")
  ),
  lq.plot(range(4), range(2, 6), label: [1]),
  lq.plot(range(4), range(1, 5), label: [2]),
)
```

For full control we can pass an array of content-transforming functions:
```example
#lq.diagram(
  cycle: (
    it => { 
      set lq.style(fill: red); 
      set lq.mark(align: lq.marks.s3) 
      it 
    },
    it => { 
      set lq.style(fill: teal)
      set lq.mark(align: lq.marks.s) 
      it
    },
  ),
  lq.plot(range(4), range(2, 6), label: [1]),
  lq.plot(range(4), range(1, 5), label: [2]),
)
```
Here, we set properties of `lq.style` and `lq.mark` to define a custom style cycle. These are explained more in-depth in the following section. 



## Style properties

Currently, there are two things that can be set: `lq.style` and `lq.mark`. 
- `lq.style` determines the general color and stroke settings that also apply to bar plots etc. 
  - `lq.style.fill` is the main color. This sets the line, mark and fill color at once. However, this setting has the lowest precedence and is overridden by all other settings if they are not set to `auto`. 
  - `lq.style.stroke` is the main stroke, applied to the line of <Crossref target="plot" />, <Crossref target="stem" /> etc. but also to <Crossref target="bar" />. If the stroke contains no color, the color is inherited from `lq.style.fill`
- `lq.mark` determines all settings concerning marks
  - `lq.mark.fill`: How to fill the mark. Normally inherited from `lq.style.fill`
  - `lq.mark.stroke`: How to stroke the mark. Normally inherited from `lq.style.fill` (!)
  - `lq.mark.inset`: The size of the mark. The name `inset` is of course temporary and due to the hack of abusing the `grid` type for marks. 
  - `lq.mark.align`: The mark to use. This has to be one of `lq.marks` or another function that takes a single positional dictionary with the keys `fill`, `stroke`, and `size`. The name `align` is of course temporary and due to the hack of abusing the `grid` type for marks. 

Many parameters of <Crossref target="plot" />, <Crossref target="scatter" /> etc. are by default set to `auto`, e.g., `stroke`, `mark`, and `mark-size`. This means that the fields are inherited from the current _style_. The current style can of course be overridden per-plot by setting these parameters to explicit values. 



## Built-in color sequences

Lilaq features a number of built-in color sequences under `lq.color.map`. As the default, Lilaq uses the color cycle `petroff10`. This is a color sequence introduced by Matthew A. Petroff in https://arxiv.org/abs/2107.02270 that is optimized for distinguishability, aesthetics, and people with color vision deficiencies (CVD). 

```typ render
#import "src/typst/_color-sequence.typ": *

#show-sequence("petroff10", cvd-friendly: true)
#show-sequence("petroff8", cvd-friendly: true)
#show-sequence("petroff6", cvd-friendly: true)
```

The `okabe-ito` sequence, suggested in https://jfly.uni-koeln.de/color/ (but reordered, with black removed and yellow slightly darkened) serves similar purposes. In the [Mackie.jl](https://docs.makie.org/dev/) framework, this sequence is called "wong". 
```typ render
#import "src/typst/_color-sequence.typ": *

#show-sequence("okabe-ito", cvd-friendly: true)
```

In the [color reference](/docs/reference/color), you can find additional sequential maps that can be used for color-coding purposes such as heatmaps or scatter plots. 


## Generating and folding color cycles

The module `lq.cycle` contains helper functions for generating color cycles. 