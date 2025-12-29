---
title: "Release: Lilaq 0.6.0"
authors: [Mc-Zen]
tags: [release]
date: 2026-01-01
---


<!-- truncate -->

## Changelog

Additions
- A new layout function. ....
- violin plots ...
- The new option `diagram.aspect` allows for setting up a fixed aspect ratio between data x and y-coordinates − either by adjusting the diagram dimensions or the diagram margins. 
- The parameters `bar.width` and `hbar.width` now allow `ratio` values which are measured between consecutive bar positions and `duration` values when using datetime values as coordinates. 
- Added a new tick formatter `tick-format.fraction` for displaying automatic fractions.
- Added a parameter `tick-format.linear.pad` to disable padding ticks with zeros to the same precision. 
- The utility function `vec.jitter` makes adding randomized offsets to an array of numerical values easy. 
- The plot type `colormesh` can now take a pre-rendered image as input. Through the parameters `min`, `max`, and `map`, the colormesh instance can behave just as if it drew the mesh itself − including when colorbars are generated for the mesh.
- The new parameter `colormesh.align` controls how the mesh rectangles should be aligned at the x and y coordinates. 
- Added the possibility to specify edges of the mesh instead of points by passing x and y coordinate arrays which are one larger than the respective dimensions of the two-dimensional z array.
- Added support for em-lengths in `diagram.width` and `diagram.height`. 
- Added the option `fill-between.smooth`, just like `plot.smooth`. 
- plot.tip/toe ...
- bounds mode ...
- `minmax.margin` option ...



Improvements
- ⚠️ The default for `bar.width` and `hbar.width` is now `80%` instead of `0.8`, making bars also visible for datetime axis or when consecutive bar positions are far apart. With bar plots where the bars have unit distance like `(1, 2, 3, 4)`, this effectively changes nothing. 
- ⚠️ The function `vec.transform` now takes individual arguments instead of a tuple. The usage is thus now `lq.vec.transform(a, b, (a, b) => ..)` instead of
`lq.vec.transform(a, b, ((a, b)) => ..)`. 
- Changed default of `hbar.align` from `center` to `horizon`. The former `center` is still allowed. 

Fixes
- Integer arguments to `bar.width` and `hbar.width`. 
- Issues with rounding of `tick-distance` with the linear tick locator. 
- Fixes an issue with inverted colorbars on PDF export. 
- Fixed several plots for empty coordinate array inputs. 
- Fixed formatting of linear ticks with suffix. In partifular, the "0" and minus sign of negative ticks were previously not passed to `zero.num`. This can be important for consistency when text and math fonts don't match.
- Fixed rotation of the polygon mark when `rotate.reflow` is set to true through a set rule. 
- Fixed scaling of colormeshes when `scale.reflow` is set to true through a set rule. 
- Fixed spacing with labels that are longer or wider than the diagram. 

Dependencies
- Bumped Tiptoe from 0.3.1 to 0.4.0. 
- Bumped Komet from 0.1.0 to 0.2.0. 


Documentation
- Fixed various typos. 
- Type annotations of Typst built-in types now link to their respective documentations from the Typst website. 