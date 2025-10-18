---
title: Stacked area chart
sidebar_custom_props:
  tags: [fill]
---

This example shows how related series can be compounded,
using the fill-between function to create a stacked area chart.

```example
#let series_1 = (0, 1, 3, 9, 5, 4, 2, 2, 1, 0)
#let series_2 = (5, 3, 2, 0, 1, 2, 2, 2, 3, 2).zip(series_1).map(((a, b)) => a + b)
#let series_3 = (0, 0, 0, 0, 1, 2, 4, 5, 5, 9).zip(series_2).map(((a, b)) => a + b)

#lq.diagram(
  lq.fill-between(x, series_1),
  lq.fill-between(x, series_2, y2: series_1),
  lq.fill-between(x, series_3, y2: series_2),
)
```
