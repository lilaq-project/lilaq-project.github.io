---
title: Legend customization
description: Demos on changing the appearance of the legend. 
---


The <Crossref target="legend" /> element creates a list of all plots in a diagram that have a label. The parameters of `legend` can either be specified through the <Crossref target="diagram#legend" /> parameter which takes a dictionary of options or through a `set` rule, e.g.,

```example
#show: lq.set-legend(position: bottom)

#lq.diagram(
  lq.plot((1,2,3), (1,2,3), label: [A]),
  lq.plot((1,2,3), (2,3,4), label: [B]),
)
```


:::warning

Since Typst does not yet support user-defined types for which `set` and `show` rules can be written, Lilaq uses [elembic](https://github.com/PgBiel/elembic) as a temporary solution to work around this limitation. 

In the future, you will be able to write
```typ
#set lq.legend(position: bottom)
#show lq.legend: set grid(columns: 4)
```

:::



## Positioning

When the plot is too crowded, it might be better to show the legend next to the diagram instead of inside it. 
We can achieve this by passing a coordinate tuple to <Crossref target="legend#position" />. Here we place the legend at the right of the diagram (`x: 100%` plus some padding) and at the top (`y: 0%`). 

```example
#lq.diagram(
  legend: (position: (100% + .5em, 0%)),
  lq.plot((1,2,3), (1,2,3), label: [A]),
  lq.plot((1,2,3), (2,3,4), label: [B]),
)
```

It is also possible to use an `alignment` position like `left` and tweak this position with <Crossref target="legend#dx" /> and <Crossref target="legend#dy" />. 

```example
#lq.diagram(
  legend: (position: left, dy: -1em),
  lq.plot((1,2,3), (1,2,3), label: [A]),
  lq.plot((1,2,3), (2,3,4), label: [B]),
)
```

When `position` is an `alignment`, <Crossref target="legend#pad" /> determines the padding to the diagram borders. 

Now, let us use a combination of `position` and `dx` to move the legend to the right of the diagram but have it vertically centered (in contrast to the first example in this subsection). 
```example
#lq.diagram(
  legend: (position: left + horizon, dx: 100%),
  lq.plot((1,2,3), (1,2,3), label: [A]),
  lq.plot((1,2,3), (2,3,4), label: [B]),
)
```



## Modifying the legend grid

Since the legend entries are arranged in a [grid](https://typst.app/docs/reference/layout/grid/), many parameters of the legend can be adjusted through `set` rules on `grid`. 

For demonstration, let us use this technique to arrange the legend entries in two columns. Each entry consists of a preview image and the label, so we need to set the number of grid columns to 4. 

```example
#show lq.selector(lq.legend): set grid(columns: 4)

#lq.diagram(
  lq.plot((1,2,3), (1,2,3), label: [A]),
  lq.plot((1,2,3), (2,3,4), label: [B]),
)
```


## Fully custom entries

The <Crossref target="diagram#legend" /> also accepts a <Crossref target="legend" /> instance to which you can pass legend entries manually. In this case, all automatically created legend entries are discarded.  
```example
#lq.diagram(
  legend: lq.legend(
    [a], [A],
    [b], [B],
  )
)

```
