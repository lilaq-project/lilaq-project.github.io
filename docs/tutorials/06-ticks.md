---
title: Working with ticks
description: Styling and configuring axis ticks. 
---

In this tutorial, we will learn techniques to generate, configure, manipulate, and also remove ticks on an axis. 



## Styling ticks
The appearance of the ticks can be configured through the <Crossref target="tick" /> element. With a `set` rule, you can for example configure how much the ticks stick into and out of the diagram as well as how much subticks are shortened compared to regular ticks. 
```example
#show: lq.set-tick(
  inset: 0pt, outset: 3pt, 
  shorten-sub: 75%,
  stroke: blue
)

#lq.diagram()
```
You can hide the ticks while keeping the tick labels by setting both `inset` and `outset` to zero. 

Please check out this [section of the axis tutorial](axis/#placement-and-mirrors) for tips on how to remove ticks and/or tick labels for _mirror axes_ (here, mirror axes are the right and top axes). 


## Styling tick labels

Tick labels are instances of <Crossref target="tick-label" />. This type can be used to apply show rules to all tick labels, for example to set the text size: 
```example
#show lq.selector(lq.tick-label): set text(0.8em)
#show lq.selector(lq.tick-label): box.with(fill: yellow)

#lq.diagram()
```
You can hide the tick labels while keeping the ticks themselves by setting `axis.format-ticks` to `none`, e.g., 
```example
#show: lq.set-diagram(
  xaxis: (format-ticks: none),
  yaxis: (format-ticks: none)
)

#lq.diagram()
```


## Locating ticks

This section deals with _how locations for ticks are determined_. 


By default, Lilaq tries to automatically find a good distance and distribution for axis ticks. However, in some cases the algorithm might produce suboptimal results or a specific configuration is required. 

There are different levels of control, ascending both in power and complexity. 
- [Automatic tick locations](#automatic-tick-locations)
- [Semi-automatic control](#semi-automatic-control)
- [Manual tick locations](#manual-tick-locations)
- [Custom tick locators](#custom-tick-locators)

### Automatic tick locations

Lilaq comes with a few automatic tick locators, dedicated to finding appropriate tick locations for linear, logarithmic, or symlog plots. Depending on the chosen scale (e.g., through <Crossref target="diagram#xscale" />), the matching locator is automatically chosen from <Crossref target="scale#locate-ticks" />. 

### Semi-automatic control

If you find the automatically generated ticks too loose or dense, you don't need to skip to manual ticks right away. Through <Crossref target="axis#tick-args" /> you can talk to the current tick locator if you know the appropriate language:
- All automatic tick locators have a `density` setting that can be used qualitatively to increase or decrease the number of ticks. The default value is `100%`. Since the possible automatic tick distances are discrete (multiples of 1, 2, and 5), values like `105%` will often have no impact. 

  ```example
  #show: lq.set-diagram(
    xaxis: (tick-args: (density: 150%))
  )

  #lq.diagram()
  ```

- The linear tick locator features a useful `tick-distance` parameter that can be used to force a precise distance between consecutive ticks. This parameter is sufficiently important that it's available directly under <Crossref target="axis#tick-distance" /> as a shorthand for `(tick-args: (tick-distance: ..))`.

  ```example
  #lq.diagram(
    xaxis: (tick-distance: 0.25)
  ) 
  ```
- The linear tick locator also has a `unit` parameter that can be used to change the base unit relative to which the tick distance is computed. A common use case are scales that mark multiples of $\pi$ as [demonstrated in this example](/docs/examples/multiple-of-pi-scale). 

### Manual tick locations
When all else fails, or you need to mark some irregularly distributed ticks, or want to specify string labels, you can also give a manual list of tick locations. Note that in general, this approach is discouraged because the ticks won't be updated according to the data. 

The parameter <Crossref target="axis#ticks" /> can be set to `none` (no ticks are produced), `auto` (select the default tick locator associated with the scale of the axis), or an array of manual tick locations. 
Note that when the ticks are not evenly spaced, the automatic subtick locator can get confused. 
```example
#lq.diagram(
  xaxis: (ticks: (0.1, 0.4, 0.7, 1.0)),
  yaxis: (
    ticks: (0.0, 0.2, 0.7, 0.8, 1.0),
    subticks: none
  ),
)
```

Another good usecase are custom and individual tick labels:
```example
#lq.diagram(
  xlim: (2, 6),
  xaxis: (
    ticks: range(2, 7).zip(([A], [B], [C], [D], [E]))
  ),
)
```
If the tick locations are integers and start at zero, you can also write more elegantly:
```
([A], [B], [C], [D], [E]).enumerate()
```


### Custom tick locators

You can also write your own tick locator. The day may come when there will be a separate tutorial for this, but it is not this day. 


### Subticks

Subticks work similarly to regular ticks. Each built-in tick locator has a corresponding subtick-locator that is suited to fill the gaps. Subticks can be controlled through <Crossref target="axis.subticks" />. Here you can for instance remove subticks by setting `subticks: none` or you can specify the number of subticks between two consecutive major ticks. 
```example
#show: lq.set-diagram(
  xaxis: (subticks: 1),
  yaxis: (subticks: none)
)

#lq.diagram()
```


### Ticks and the grid
The computed tick locations are passed internally to the <Crossref target="grid" /> to generate grid lines for all ticks. Therefore, when `ticks: none` is passed to an axis, no grid lines are shown at all because no ticks are generated. [Above](#styling-ticks), we saw how to _visually_ get rid of ticks [or just the labels](#styling-tick-labels) without actually removing them. 



## Formatting ticks

Just like with the tick locator, Lilaq selects a tick formatter matching the axis scale. The built-in formatters are
- `lq.format-ticks-linear`,
- `lq.format-ticks-log`,
- `lq.format-ticks-symlog`,
- `lq.format-ticks-manual` (which is selected automatically when manual locations together with labels are passed to <Crossref target="axis#ticks" />). 

The tick formatter can be changed with <Crossref target="axis#format-ticks" />. Let us write a custom formatter. 

### Custom tick formatting
A tick formatter is just a function which receives the ticks computed by the tick locator (and a few optional arguments) and that returns an array of tick labels. 

The most naive formatter takes the tick locations and just converts them to a string. 
```typ
#lq.diagram(
  yaxis: (
    format-ticks: (ticks, ..) => ticks.map(str)
  ),
)
```
However, due to rounding issues, a simple conversion can lead to awkward tick labels like `0.60000000000001` instead of `0.6` which is why the default formatter are much smarter than that. Instead of writing a formatter from scratch, it can be beneficial to _call an existing one_. 
```example
#let k-formatter(ticks, ..args) = {
  let result = lq.format-ticks-linear(ticks, ..args)
  ticks.zip(result.labels).map(((tick, label)) => {
    label + if tick != 0 { $k$ }
  })
}

#lq.diagram(
  xlim: (-5, 5),
  xaxis: (format-ticks: k-formatter)
)
```
This case actually has built-in support with the default formatter through the `suffix` parameter:
```typ
#lq.diagram(
  xaxis: (
    format-ticks: lq.format-ticks-linear.with(suffix: $k$)
  )
)
```

Note that a tick formatter can either return an array of labels or a dictionary with the keys:
- `labels` containing an array of the tick labels,
- `exponent` specifying and axis exponent,
- and `offset` for axis offsets. 
The latter two are optional. The linear tick formatter returns such a dictionary while the other formatters just return an array. 


### Displaying subtick labels
Usually subticks don't need labels but in case you still need them, it is easy to set up <Crossref target="axis#format-subticks" />:
```example
#show: lq.show_(
  lq.tick-label.with(sub: true), 
  it => { set text(.6em); it }
)

#let axis-args = (
  subticks: 1, 
  format-subticks: lq.format-ticks-linear
)

#show: lq.set-diagram(
  xaxis: axis-args,
  yaxis: axis-args
)

#lq.diagram(xlim: (0, 2))
```
Here we also use a conditional `show` rule on subticks to reduce the text size. 