---
title: Bar plot with numbers
sidebar_custom_props:
  tags: [bar]
---

This example shows how to add labels to the bars of a bar chart. 

We use <Crossref target="place" /> to add a text label for each bar. Based on the $y$ value, we place the label either inside or − when there is not enough space − on top of the bar. 

```example
#let xs = range(9)
#let ys = (12, 51, 23, 36, 38, 15, 10, 22, 86)

#lq.diagram(
  width: 9cm,
  xaxis: (subticks: none),

  lq.bar(
    xs, ys
  ),

  ..xs.zip(ys).map(((x, y)) => {
    let align = if y > 12 { top } else { bottom }
    lq.place(x, y, pad(0.2em)[#y], align: align)
  })
)
```
