---
title: Axis configuration
description: A tutorial for configuring and customizing the diagram axes. 
---

In this tutorial you will learn how to configure and customize the axes of a diagram. 




## Scales

The scaling of an axes is crucial to how your data is presented. By default, _linear_ scaling is used,  mapping the data coordinates _proportionally_ to document coordinates. The scale can be changed with the parameters <Crossref target="diagram#xscale" /> and <Crossref target="diagram#yscale" /> for the two main axes. Other common scalings are logarithmic (`"log"`) and symmetric logarithm (`"symlog"`)
```example
#lq.diagram(
  xlim: (1, 100),
  ylim: (-10, 10),
  xscale: "log",
  yscale: "symlog"
)
```
These strings are just short-hands to select predefined scale objects. Equivalently, you can put `xscale: lq.scale.log()`. Although it is more verbose, this way of creating a new scale gives use more control. Let us create a new symlog scale with a different threshold. 
```example
#lq.diagram(
  ylim: (-10, 10),
  yscale: lq.scale.symlog(threshold: 10)
)
```
You can also make up your own scale with the [`scale`](../reference/scale) constructor. 




## Limits

By default, the limits of the diagrams are computed automatically as the maxima and minima of all plots contained in a diagram. On top, so-called margins (see <Crossref target="diagram#margin" />) are applied to enhance the computed range a bit. 

You can define the limits manually through <Crossref target="diagram#xlim" /> and <Crossref target="diagram#ylim" />. 
```example
#let xs = lq.linspace(-3, 10)

#lq.diagram(
  xlim: (0, 8),
  ylim: (0, auto),
  lq.plot(xs, xs.map(calc.sin))
)
```
Note that 
- no margins are applied to fixed limits and
- it is possible to leave the upper or lower limit at `auto`. 




## Axis labels

No data without context! It is important to meaningfully label each axis of a diagram − for this we use <Crossref target="diagram#xlabel" /> and <Crossref target="diagram#ylabel" />. Instead of passing content to these parameters, you can also create a <Crossref target="label" /> to benefit from its additional parameters. 
```example
#lq.diagram(
  xlabel: [On the $x$ axis],
  ylabel: lq.ylabel(pad: 2em)[and the $y$ axis... ]
)
```
Through the <Crossref target="label" /> type, we can also apply powerful customization. Let us align the $x$ and $y$ labels with the right and top edge of the diagram, respectively. 

```example
#show lq.selector(lq.label): set align(top + right)
#show: lq.set-label(pad: 1em)

#lq.diagram(
  xlabel: [Time],
  ylabel: [Value]
)
```
:::warning

Since Typst does not yet support user-defined types for which `set` and `show` rules can be written, Lilaq uses [elembic](https://github.com/PgBiel/elembic) as a temporary solution to work around this limitation. 

In the future, you will be able to write
```typ
#show lq.label: set align(top + right)
#set label(pad: 1em)
```

:::




## Ticks

Todo: This is a long story. Let us make this a separate tutorial. 


## The spine

todo




## Placement and mirrors

Usually, the $x$ axis is placed at the bottom and the $y$ axis is placed at the left. But what if we wanted to change that up? 

todo




## Arrows and schoolbook styles

The previous section leads us to the following question: What if want to have our axis right in the middle, going through the origin of the coordinate system? Let us make some modifications to get a "schoolbook"-style diagram. 

1. Instead of passing an `alignment` to `position`, we can also pass a data value on the _other_ axis, through which the axis should pass. 

2. In addition, let us add arrow tips to the axes. These are powered by the package [tiptoe](https://typst.app/universe/package/tiptoe).

3. Also, we want to filter the ticks. It doesn't look nice when the $0$ ticks overlap the axes at the origin and also, the outermost ticks overlap with the arrow marks. To avoid that, we install a tick filter that returns `false` when the tick value is `0` and its distance to the outer edges of the diagram is less than `5pt`. 

4. Finally, the tick marks on the axis should be centered. We can achieve this by applying a "`set`" rule on <Crossref target="tick" />. 

```example
#import "@preview/tiptoe:0.2.0"

#show: lq.set-tick(inset: 2pt, outset: 2pt, pad: 0.4em)

#let filter(value, distance) = value != 0 and distance >= 5pt

#lq.diagram(
  xlim: (-5.8, 5.8), 
  ylim: (-5.8, 5.8),
  xaxis: (position: 0, tip: tiptoe.stealth, filter: filter),
  yaxis: (position: 0, tip: tiptoe.stealth, filter: filter),
)
```



## Additional axes

### Dependent axes

### Independent axes (twin axes)