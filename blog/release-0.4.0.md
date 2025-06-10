---
title: "Release: Lilaq 0.4.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-05-09
---



<!-- truncate -->


## Changelog

Additions 
- The type `tick-label` now has a field `sub`. 
- `ellipse` and `rect` now have a parameter `align`.
- There is now a formatter for `symlog` axes. 
- The linear tick locator now features a `unit` parameter making it easy to set up scales based on multiples of $\pi$ or other real numbers. In addition, the linear tick formatter is now equipped with a `suffix` parameter and reacts to the `unit` of the linear tick locator. 
- The types `tick` and `tick-label` now have a field `kind` which can be `x` or `y`, referring to the kind of axis that they are placed on. 

Breaking changes
- The parameter `tick.shorten-sub` now takes a ratio between `0%` and `100%` instead of a float between `0` and `1` and its behaviour is inverted: Setting it to `70%` for example shortens the subticks _by_ 70% and not _to_ 70%. 
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
- Fixed errorbars when the y-axis range is inverted. 
- Median inset has been fixed for inverted axes. 


Documentation
- Finally there is a [tutorial on ticks](https://lilaq.org/docs/tutorials/ticks)!