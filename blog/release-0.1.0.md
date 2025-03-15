---
title: "Release: Lilaq 0.1.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-03-14
---

Today we release the first official version of Lilaq. 
<!-- truncate -->

It can now be installed from the Typst package manager through
```typ
#import lilaq
```


This release makes some big changes and a vast number of improvements. 

Primarily, types in form of [elembic](https://github.com/PgBiel/elembic) elements are introduced to greatly enhance user customization possibilities. 



## Changelog

Added 
- New elements `grid`, `title`, `label`, `legend`, `diagram`, `tick`, `tick-label`, `spine`, and `errorbar`. 
- Added `hbar` plotting function. 
- Support for individual rectangle side coloring of `bar`. 
- New `filter` parameter for `axis`. 

Breaking changes
- The parameters `vmin`/`vmax` have been renamed to `min`/`max` for `quiver`, `contour`, `colormesh`. 
- `mesh` now only returns the 2d mesh array and not any more also the given inputs. Furthermore, `mesh` returns a **transposed** mesh in comparison to before. 
- Consequently, `colormesh` and `quiver` now take transposed 2D input arrays. 
- Removed parameter `color` of `contour` in favor of the new `stroke` parameter. 
- `hline` and `vline` now expect coordinates as individual positional arguments (before one array was expected).
- `legend.pos` is now `legend.position`.
- `title.pos` is now `title.position`.
- The format for asymmetric errorbars (in `plot.xerr` and `plot.yerr`) has changed. Please refer to the documentation. 
- `axis.position` now takes a dictionary instead of an array for combined `align`+`offset` configuration. 


Improvements
- Improved `contour` rendering by using the new `curve` element to remove rare artifacts. 
- `colormesh` now creates pixmaps when possible (when the coordinates are evenly spaced) to avoid artifacts and to support smooth interpolation. 
- Quiver can now take a function for `color`. 
- Axis exponents/offsets now use Zero for showing numbers. 
- Arrow tips for `axis`. 
- Arrow tips for `line`. 
- Added `fill` parameter to `diagram`. 
- Improved ticking heuristic for horizontal axes. 
- Use square cap for base stroke for `stem` and `hstem`. 
- Updated to tiptoe:0.2.0. 


Fixed
- plots legend images with error bars. 
- ticking: automatic e base label (after Typst 0.13 it was shown incorrectly). 
- `fill-between` now responds to the current style cycle. 
- Overflowing, crammed legends. 
- empty diagrams with log scales resulting in an error. 
- additional axes now respect `diagram.margin`. 
- Plots in additional axes now work properly: they are shown in the legend (if labeled), they behave properly with style cycles, and their z-index is not ignored anymore. 
- The default symlog formatter now uses Zero. 


Docs
- Documentation website!
- Large-scale documentation improvements. 
- Added examples to all important functions, types and sometimes parameters. 

