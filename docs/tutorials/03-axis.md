---
title: Axis configuration
description: A tutorial for configuring and customizing the diagram axes. 
---

In this tutorial you will learn how to configure and customize the axes of a diagram. 
The possible parameters are documented at <Crossref target="axis" />. 

Axes use the Typst package [Zero](https://typst.app/universe/package/zero) for formatting numbers in a consistent way throughout a document. Please refer to its documentation for configuring how numbers are displayed. 




## Scales

The scaling of the diagram axes is crucial to how the data is presented. By default, _linear_ scaling is used,  mapping the data coordinates _proportionally_ to document coordinates. The scale can be changed through the parameters <Crossref target="diagram#xscale" /> and <Crossref target="diagram#yscale" /> for the two main axes (or <Crossref target="axis#scale" /> in general). Other common scalings are logarithmic (`"log"`) and symmetric logarithm (`"symlog"`). 
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

By default, the axis limits are computed automatically as the maxima and minima of all data points plotted in the diagram. On top, so-called margins (see <Crossref target="diagram#margin" />) are applied to increase the computed range by some amount. 

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
- it is possible to leave the upper or lower limit at `auto` while fixing the other. 




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
By default, <Crossref target="tick" /> inherits its stroke from the spine to make setting thickness and color easier. The spine also has parameters for arrow tips, as demonstrated in [this section](#arrows-and-schoolbook-styles) of the tutorial. 

Note that the parameters <Crossref target="axis#stroke" />, <Crossref target="axis#tip" />, and <Crossref target="axis#toe" /> are directly forwarded to the spine of the axis and can be used to override the spine settings per-axis. 




## Placement and mirrors

Usually, the $x$-axis is placed at the bottom and the $y$-axis is placed at the left of a diagram. But what if we wanted to change that up? The parameter <Crossref target="axis#position" /> allows us to do just that. 

```example
#lq.diagram(
  yaxis: (position: right),
  width: 3cm, height: 3cm
)
```

But now the axis on the left has vanished entirely. Before, there was a copy − a so-called _mirror_ of the axis on the right side (although without the tick labels). This is because when specifying the position explicitly, the mirror is turned off by default. 

We can restore the mirror axis by setting <Crossref target="axis#mirror" /> to `true`. This parameter also gives us more fine-grained control over the nature of the mirror. By passing `(ticks: false)`, we can for example remove the ticks from the mirror. 

```example
#lq.diagram(
  yaxis: (position: right, mirror: true),
  xaxis: (mirror: (ticks: false)),
  width: 3cm, height: 3cm
)
```
With `(tick-labels: true)`, it is even possible to show the tick labels on the mirror axis. 

Not only can axes be placed at the four sides of the diagram, they can even be moved [in-](#arrows-and-schoolbook-styles) or [outside](#additional-axes) the diagram, as shown in the sections below. 




## Arrows and schoolbook styles

The previous section leads us to the following question: What if want to have our axis right in the middle, going through the origin of the coordinate system? Let us make some modifications to get a "schoolbook"-style diagram. 

1. Instead of passing an `alignment` to <Crossref target="axis#position" />, we can also pass a `float`, a data value on the _other_ axis, through which the axis should pass. 

2. In addition, let us add arrow tips to the axes. These are powered by the package [tiptoe](https://typst.app/universe/package/tiptoe).

3. Also, we want to filter the ticks. It doesn't look nice when the $0$ ticks overlap the axes at the origin and also, the outermost ticks would overlap with the arrow marks. To avoid that, we install a tick filter that returns `false` when the tick value is `0` and its distance to the outer edges of the diagram is less than `5pt`. 

4. Finally, the tick marks on the axis should be centered. We can achieve this by applying a "`set`" rule on <Crossref target="tick" />. 

```example
#import "@preview/tiptoe:0.3.0"

#show: lq.set-tick(inset: 2pt, outset: 2pt, pad: 0.4em)

#let filter(value, distance) = value != 0 and distance >= 5pt

#lq.diagram(
  xlim: (-5.8, 5.8), 
  ylim: (-5.8, 5.8),
  xaxis: (position: 0, tip: tiptoe.stealth, filter: filter),
  yaxis: (position: 0, tip: tiptoe.stealth, filter: filter),
)
```

Following the [styling and preset tutorial](styling-and-presets), we can wrap this up in a reusable preset. This is demonstrated in the [schoolbook style example](/docs/examples/schoolbook-style). 



## Additional axes

Sometimes, two is just not enough. In this section, you will learn how to add an arbitrary number of axes to a diagram. We differentiate between three kinds of axes:
- The _main axes_ are just the two default $x$-axis and $y$-axis. 
- _Dependent axes_ are axes that show equivalent values for the same data but in different units. 
- An _independent_ or _twin axis_ shows data unrelated to the corresponding main $x$ or $y$-axis. Twin axis are used to unite two plots in one diagram when they share one common axes. 


### Dependent axes

A dependent axis is linked to the corresponding main axis ($x$ or $y$) and defines a pair of functions that transform to and from this secondary unit. The axis limits are automatically inherited from the _parent_ axis and cannot be specified manually. 

An example would be a spectrum that is shown in dependence of the wavelength on one side and in terms of photon energy on the opposite side. Note that there is a fixed relation between the wavelength and the energy of a photon, so these two really describe the same data. Another example is the famous Hertzsprung-Russell diagram which commonly shows absolute magnitude and luminosity on the $y$-axis and temperature and the corresponding spectral class on the $x$-axis. 

In the following example, we have a velocity $v$ along the bottom $x$-axis and the corresponding kinetic energy which scales quadratically with $v$ on a secondary axis at the top. First, we remove the mirror of the main $x$-axis (see section on [placement and mirrors](#placement-and-mirrors) above). Then we add a second <Crossref target="axis" /> at `position: top`. Through <Crossref target="axis#functions" />, we give the transformation from velocity to energy and its inverse. 

```example
#let m = 1 // Let's assume mass of 1

#lq.diagram(
  xaxis: (mirror: false),
  xlabel: $v$,
  xlim: (0, 10),

  yaxis: none,

  lq.xaxis(
    position: top, 
    label: $E=1/2 m v^2$,
    functions: (
      v => 0.5 * m * v*v, 
      E => calc.sqrt(2 * E / m)
    )
  )
)
```

Another demonstration can be found in the [dual-axis example](/docs/examples/dual-axis). 




### Independent axes (twin axes)

An independent axis is not bound to a parent axis and contains plots as children. It can have its own scaling and individual limits. 

One traditional example is a climograph that shows the average temperature and precipitation per month. Both data sets share the “month” axis but have a unique (usually) $y$ axis, one for the temperature, one for the precipitation. 

First, we turn off the mirror of the main axis and set the main $y$-label. Now we add a secondary axis on the right side to which we add a bar plot of rainfall values. 
Finally, we create a temperature plot on the main axes. We use this order to ensure that the temperature is plotted on top of the bars. Alternatively, we could use <Crossref target="plot#z-index" /> to control the plot order. 

```example
#lq.diagram(
  yaxis: (mirror: false),
  ylabel: [Temperature],

  lq.yaxis(
    position: right,
    label: [Precipitation],
    lq.bar(
      fill: blue.lighten(60%),
      (1, 2, 3),
      (20, 30, 24)
    )
  ),

  lq.plot(
    color: red,
    (1, 2, 3),
    (14, 16, 13)
  ),
)
```
The [climograph example](/docs/examples/climograph) shows a fully-fledged demo. 

The number of axes that can be added to a diagram is in principal unlimited. The <Crossref target="axis#position" /> can also take a dictionary `(align: .., offset: ..)` that makes it possible to move axes outside the diagram. 

```example
#lq.diagram(
  xscale: lq.scale.log(base: 2),
  ylim: (-1, 1),

  lq.yaxis(
    position: (align: right, offset: 20pt), 
    functions: (x => 2*x, y => 0.5*y)
  ),
  lq.yaxis(
    position: (align: right, offset: 50pt), 
    functions: (x => calc.exp(x), y => calc.ln(y))
  ),
  lq.yaxis(
    position: (align: right, offset: 80pt), 
    functions: (x => (x+1)*(x+1), y => calc.sqrt(y)-1)
  ),
)
```