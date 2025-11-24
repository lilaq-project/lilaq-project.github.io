---
title: Setting up a scale to display multiples of π
sidebar_custom_props:
  tags: [bar]
---

It is possible to specify a unit other than 1 for locating ticks on an axis. This is for example useful to generate ticks that are multiples of $\pi$ (or any other real number). Changing the unit is more powerful than setting the tick distance because the tick step is still smartly selected depending on the range − just based on multiples of $\pi$.

Moreover, we configure a suffix `$pi$` to add to all ticks except with the value 0, 1, and −1. 
```example
#lq.diagram(
  xlim: (-2*calc.pi, 2*calc.pi),
  xaxis: (
    locate-ticks: lq.tick-locate.linear.with(unit: calc.pi),
    format-ticks: lq.tick-format.linear.with(suffix: $pi$)
  )
)
```