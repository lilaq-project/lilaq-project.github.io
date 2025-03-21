---
title: Bar plot with error bars
sidebar_custom_props:
  tags: [bar, errorbars]
---

This example demonstrates how to place error bars on a bar plot. This is achieved by adding a <Crossref target="plot" /> with error bars but without lines on top of the bar chart. 

```example
#let xs = range(4)

#let ys1 = (1.35, 3, 2.1, 4)
#let ys2 = (1.4, 3.3, 1.9, 4.2)

#let yerr1 = (0.2, 0.3, 0.5, 0.4)
#let yerr2 = (0.3, 0.3, 0.4, 0.7)

#lq.diagram(
  width: 5cm,
  legend: (position: left + top),

  lq.bar(xs, ys1, offset: -0.2, width: 0.4, label: [Left]),
  lq.bar(xs, ys2, offset: 0.2, width: 0.4, label: [Right]),
  
  lq.plot(
    xs.map(x => x - 0.2), ys1, 
    yerr: yerr1,
    color: black,
    stroke: none 
  ),
  lq.plot(
    xs.map(x => x + 0.2), ys2, 
    yerr: yerr2,
    color: black,
    stroke: none 
  )
)
```
