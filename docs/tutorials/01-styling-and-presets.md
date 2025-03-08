---
title: Styling and presets
description: How to use show and set rules to power up Lilaq elements. 
---

This tutorial deals with styling and configuration in general and on a broader level. The following tutorials give more insight into styling of individual parts of a diagram. 
- [Axis tutorial](axis)
- [Legend tutorial](legend)

## Elements for styling

Many components of a diagram, such as <Crossref target="title" />, <Crossref target="legend" />, <Crossref target="label" />, <Crossref target="grid" /> and more are _element functions_. In particular, <Crossref target="diagram" /> itself is an element function, enabling powerful customization and an intuitive way of [creating presets](#how-to-create-a-preset) (see below). 

:::info
Element functions in Typst are functions that can be used with `set` and `show` rules. 
:::

:::warning
Since custom element functions (in the future so-called _types_) are not yet available in Typst, Lilaq uses [elembic](https://github.com/PgBiel/elembic) to provide a powerful workaround. For this reason, instead of
```typ
#set lq.diagram(width: 10cm)
#show lq.diagram: set text(0.8em)
```
for now, we need to write:
```typ
#show: lq.set-diagram(width: 10cm)
#show lq.selector(lq.diagram): set text(0.8em)
```
:::

In the following, we will configure different aspects of a diagram by means of illustrative examples. 

## Setting the text size


It is common to use a slightly smaller font size for diagrams compared to the main text, especially in two-column formats. Below, we use a `show`-`set`-rule to configure the text size for all diagrams. 

```typ
#show lq.selector(lq.diagram): set text(.8em)
```

This will affect all text nodes of the diagram, i.e., the title, axis and tick labels, legend text etc. at once. In order to apply a `set` rule selectively to just some of these elements, we can address them individually:

```typ
#show lq.selector(lq.legend): set text(.8em)
#show lq.selector(lq.tick-label): set text(.8em)
```



## Title and label positions

Although axis labels and titles are by default all centered, they are designed in a way so that they work nicely with `set align()` rules. 

In the following example, we change the default alignment to `top + right` for <Crossref target="label" />, so $x$-labels are aligned at the right and $y$-labels are aligned at the top. Furthermore, we move the <Crossref target="title" /> to the right. 
```example
#show lq.selector(lq.label): set align(top + right)
#show lq.selector(lq.title): set align(right)

#lq.diagram(
  title: [Title],
  xlabel: $x$,
  ylabel: $y$
)
```



## How to create a preset

If you know that all of your diagrams will use logarithmic scaling on the $x$-axis, you set this up at the start of the document instead of repeating `xscale: "log"` for each diagram:

```typ
#show: lq.set-diagram(xscale: "log")

#lq.diagram()
```

<!-- Even better would be to create a reusable _preset_ for similar diagrams.  -->
This is great, but we might have different types of diagrams in our document and would like to apply these styles only to some plots. 

Let's imagine we want to draw a series of spectra, all featuring the same axis labels and a logarithmic $y$-scaling. To avoid repeating the same information over and over (and also to make future changes easier), we want to create a reusable preset. A preset will be just a function that can be used in a document-level `show` rule for transforming content. 

```typ
#let spectrum-plot = it => {
  // <- insert set and show rules here
  it
}
```
To use the preset, we create a scope (to avoid applying the preset to all following plots) and apply the preset with a `show` rule.
```typ
#{
  show: spectrum-plot
  lq.diagram()
}
```

Let us now fill this preset with some configuration!

```example
#let spectrum-plot = it => {
  show: lq.set-diagram(
    title: [Spectrum], 
    yscale: "log",
    ylabel: [Intensity],
    xlabel: [Wavelength],
    xaxis: (subticks: none)
  )
  show: lq.set-tick(
    outset: 2pt, inset: 0pt
  )
  it
}


#{
  show: spectrum-plot

  lq.diagram(
    lq.plot((1, 3), (1, 100))
  )
}
```
