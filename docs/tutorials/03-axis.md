---
title: Axis configuration
description: A tutorial for configuring and customizing the diagram axes. 
---

In this tutorial you will learn how to configure and customize the axes of a diagram. 




## Scales

The scaling of an axes is crucial to how data is presented. By default, _linear_ scaling is used,  mapping the data coordinates _proportionally_ to document coordinates. The scale can be changed with the parameters <Crossref target="diagram#xscale" /> and <Crossref target="diagram#yscale" /> for the two main axes (or <Crossref target="axis#scale" /> in general). Other common scalings are logarithmic (`"log"`) and symmetric logarithm (`"symlog"`). 
```example
#lq.diagram(
  xlim: (1, 100),
  ylim: (-10, 10),
  xscale: "log",
  yscale: "symlog"
)
```
These strings are just shorthands to select predefined scale objects. Equivalently, you can put `xscale: lq.scale.log()`. Although it is more verbose, this second way of creating a new scale gives use more control. As an example, let us create a new symlog scale with a different threshold than the default. 
```example
#lq.diagram(
  ylim: (-10, 10),
  yscale: lq.scale.symlog(threshold: 10)
)
```
You can also make up your own scale with the [`scale`](../reference/scale) constructor. 




## Limits

By default, the limits of the diagrams are computed automatically as the maxima and minima of all plots contained in a diagram. On top, so-called margins (see <Crossref target="diagram#margin" />) are applied to enhance the computed range by a bit. 

You can define the limits manually through <Crossref target="diagram#xlim" /> and <Crossref target="diagram#ylim" /> (or <Crossref target="axis#lim" /> in general). 
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

No data without context! It is important to meaningfully label each axis of a diagram − for this we use <Crossref target="diagram#xlabel" /> and <Crossref target="diagram#ylabel" /> (again <Crossref target="axis#label" /> in general). Instead of passing content to these parameters, you can also create a <Crossref target="label" /> to benefit from its additional parameters. 
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

In the future, you will be able to write just
```typ
#show lq.label: set align(top + right)
#set lq.label(pad: 1em)
```

:::




## Ticks

Todo: This is a long story. Let us make this a separate tutorial. 




## The spine

The axis <Crossref target="spine" /> (the line drawn along the axis) is an element of its own. 
```example
#show: lq.set-spine(stroke: 1pt + red)
#show: lq.set-tick(stroke: 0.5pt)

#lq.diagram(width: 2cm, height: 3cm)
```
By default, <Crossref target="tick" /> inherits its stroke from the spine to make setting thickness and color easier. The spine also has parameters for arrow tips which is demonstrated in the next section. 

Note that the parameters <Crossref target="axis#stroke" />, <Crossref target="axis#tip" />, and <Crossref target="axis#toe" /> are directly forwarded to the spine of the axis and can be used to override the spine settings per-axis. 




## Placement and mirrors

Usually, the $x$-axis is placed at the bottom and the $y$-axis is placed at the left of a diagram. But what if we wanted to change that up? The parameter <Crossref target="axis#position" /> allows us to do just that. 

```example
#lq.diagram(
  yaxis: (position: right),
  width: 3cm, height: 3cm
)
```

But now the axis on the left has vanished entirely while before, there was a copy − a so-called _mirror_ of the axis on the right side (although without the tick labels). This is because when specifying the position explicitly, the mirror is turned off by default. 

We can restore the mirror axis by setting <Crossref target="mirror" /> to `true`. This parameter also gives us more fine-grained control over the nature of the mirror. By passing `(ticks: false)`, we can for example remove the ticks from the mirror. 

```example
#lq.diagram(
  yaxis: (position: right, mirror: true),
  xaxis: (mirror: (ticks: false)),
  width: 3cm, height: 3cm
)
```
With `(tick-labels: true)`, it is even possible to show the tick labels on the mirror axis. 

Not only can axes be placed at the four sides of the diagram, they can even be moved [in-](#arrows-and-schoolbook-styles) or [outside](#additional-axes) the diagram, see the sections below. 




## Arrows and schoolbook styles

The previous section leads us to the following question: What if want to have our axis right in the middle, going through the origin of the coordinate system? Let us make some modifications to get a "schoolbook"-style diagram. 

1. Instead of passing an `alignment` to <Crossref target="axis#position" />, we can also pass a `float`, a data value on the _other_ axis, through which the axis should pass. 

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

Following the [styling and preset tutorial](styling-and-presets), we can wrap this up in a reusable preset. 

```example
#import "@preview/tiptoe:0.2.0"

#let schoolbook-style = it => {
  let filter(value, distance) = value != 0 and distance >= 5pt
  let axis-args = (position: 0, filter: filter)
  
  show: lq.set-tick(inset: 2pt, outset: 2pt, pad: 0.4em)
  show: lq.set-spine(tip: tiptoe.stealth)
  show: lq.set-diagram(xaxis: axis-args, yaxis: axis-args)
  it
}

#show: schoolbook-style

#lq.diagram()
```



## Additional axes

Sometimes, two is just not enough. In this section, you will learn how to add an arbitrary number of axes to a diagram. We differentiate between three kinds of axes:
- The _main axes_ which are just the two default $x$-axis and $y$-axis. 
- _Dependent axes_ which are axes that show equivalent values but in different units. An example would be a spectrum that is shown in dependence of the wavelength on one side and in terms of photon energy on the opposite side. Note that there is a fixed relation between the wavelength and the energy of a photon, so these two really describe the same data. Another example is the famous Hertzsprung-Russell diagram which commonly shows absolute magnitude and luminosity on the $y$-axis and temperature and the corresponding spectral class on the $x$-axis. 

  A dependent axis is linked to the corresponding main axis ($x$ or $y$) and defines a pair of functions that transform to and from this secondary unit, see the example below. A dependent axes
- An _independent_ or _twin axis_ shows data unrelated to the corresponding main $x$ or $y$-axis. Twin axis are used to unite two plots in one diagram when they share one common axes. 

  One traditional example is a climograph that shows the average temperature and precipitation per month. Both data sets share the “month” axis but have a unique (usually) $y$ axis. 


### Dependent axes


### Independent axes (twin axes)

An independent axis contains plots as children. 
```example
#lq.diagram(
  yaxis: (mirror: false),

  lq.yaxis(
    position: right,
    lq.bar(
      fill: blue.lighten(40%),
      (1, 2, 3),
      (20, 30, 24)
    )
  ),

  lq.plot(
    (1, 2, 3),
    (14, 16, 13)
  ),
)
```
The [climograph example](/docs/examples/climograph) shows a fully-fledged demo. 