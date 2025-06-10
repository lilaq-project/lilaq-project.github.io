---
title: "Release: Lilaq 0.4.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-05-09
---



<!-- truncate -->


## Changelog

Additions 
- Lilaq now (official) has color bars that can be used to create a legend for colored plots like `scatter` or `colormesh`, 
- The function `plot` now supports smoothing through `plot.smooth` (thanks to @Netzwerk2). 
- There is now a formatter for `symlog` axes. 
- The linear tick locator now features a `unit` parameter making it easy to set up scales based on multiples of $\pi$ or other real numbers. In addition, the linear tick formatter is now equipped with a `suffix` parameter and reacts to the `unit` of the linear tick locator. 
- The types `tick` and `tick-label` now have a field `kind` which can be `x` or `y`, referring to the kind of axis that they are placed on. 
- Lilaq now uses the new version of [elembic](https://github.com/PgBiel/elembic), introducing features like conditional set rules like `lq.cond-set(lq.grid.with(kind: "x"), stroke: yellow)` and filtered show rules through `lq.show_(lq.tick-label.with(sub: true), it => {..})`. 
- The type `tick-label` now has a field `sub`. 
- One can now pass a list of extra ticks to `axis.extra-ticks` (for example through `lq.diagram(xaxis: (extra-ticks: ()))`). 
- The plot functions `ellipse` and `rect` now have a parameter `align`.

Breaking changes
- The parameter `tick.shorten-sub` now takes a ratio between `0%` and `100%` instead of a float between `0` and `1` and its behavior is inverted: Setting it to `70%` for example shortens the subticks _by_ 70% and not _to_ 70%. 
- The parameter `grid.sub` is now named instead of positional. 
- When a function is passed to `quiver.color`, it is passed both the coordinates and directions as `(x, y, u, v)` instead of just the coordinates. 


Improvements
- Updated tiptoe from `0.3.0` to `0.3.1`. 
- The fields `stem.mark-size` and `hstem.mark-size` now default to `auto`. 


Fixed
- Diagrams now work in a context with right-to-left text direction. 
- Fixed `axis.inverted` which was ignored whenever there was at least one plot with non-tight limits. 
- Setting `mark.stroke` and `mark.fill` via plot cycles now work for `scatter`. 
- Manual tick locations are now clipped to the range of the axis. 
- Fixed computation of significant digits with non-integer steps. 
- Subticks can now be formatted easily. 
- The interaction of various color and stroke settings for `scatter`. 
- Fixed error bars when the y-axis range is inverted. 
- Median inset has been fixed for inverted axes. 
- Breaking of tick labels when the diagram is too narrow (thanks to @Xendergo). 


Documentation
- Finally there is a [tutorial on ticks](https://lilaq.org/docs/tutorials/ticks)!