---
title: "Release: Lilaq 0.6.0"
authors: [Mc-Zen]
tags: [release]
date: 2026-01-01
---


Lilaq 0.6.0 introduces native diagram grids, new violin plot types, and improved colormesh image support as well as support for datetime coordinates. Note: diagram bounds now more strictly respect tick label bounds, and the bar width default has changed — please review the breaking changes below before upgrading.

<!-- truncate -->


## Changelog


### Breaking changes
- **Diagram bounds** now strictly respect tick label bounds. This new default may change diagram layouts; restore the previous behavior with:

  ```typ
  #show: lq.set-diagram(bounds: "relaxed")
  ```

- The default for **`bar.width`** and **`hbar.width`** changed from `0.8` to `80%`. This improves bar visibility on datetime axes or widely spaced positions; unit-distance data is unaffected.

- **`vec.transform`** now takes individual arguments instead of a tuple. See the Utility section for details.

- **`axis.mirror`** now reacts differently when set to `auto`. Before, axis mirrors where removed automatically when `axis.position` was changed. Now, they are removed automatically when either a secondary axis is added or `axis.position` is set to a data or screen coordinate. 



### Diagram
- Added native diagram grids via `show` rules with `lq.layout`.
- Added `diagram.aspect` to set up a fixed aspect ratio between data x-and y-coordinates (by adjusting dimensions or margins).
- Added `diagram.bounds` with modes: `"strict"`, `"relaxed"`, and `"data-area"`.
- Added support for em-lengths in `diagram.width` and `diagram.height`.
- Improved the smartness of `axis.mirror`. 
- When axis limits are set to `datetime` values, the scale switches to a datetime scale if `axis.scale` is set to `auto`. 
- Fixed inverted colorbars on PDF export.
- Fixed spacing when labels are larger than the diagram.



### Plots
- Added `violin` and `hviolin` plot types.
- Colormesh
  - Now accepts pre-rendered images as input. When `min`, `max`, and `map` are provided the colormesh behaves as if it rendered the mesh itself (including colorbars).
  - Added `colormesh.align` to control mesh rectangle alignment with x/y coordinates.
  - Now accepts edge arrays for x and y (length n+1) to specify mesh edges instead of point centers.
- Bar plots
  - Now, `bar.width` and `hbar.width` accept `ratio` (relative to consecutive bar positions) and `duration` (for datetime coordinates).
  - ⚠️ Default `bar.width`/`hbar.width` changed from `0.8` to `80%` to improve visibility on datetime or sparse axes; unit-spaced data unchanged.
  - Changed `hbar.align` default from `center` to `horizon` (both values are supported).
  - Fixed integer handling for `bar.width` and `hbar.width`.
- Added `fill-between.smooth`, similar to `plot.smooth`.
- Added support for datetime coordinates with `place`, `rect`, `ellipse`, and `line`. 
- Added `plot.tip` and `plot.toe` to place [Tiptoe](https://typst.app/universe/package/tiptoe) arrow marks at the start and end of lines.
- Fixed behavior for empty coordinate arrays.
- Fixed colormesh scaling when `scale.reflow` is set to true via set rules.
- Fixed polygon rotation when `rotate.reflow` is set to true via set rules.
- Fixed `rect` and `ellipse` content and gradient fills when the dimensions are negative. 


### Ticks
- Added `tick-format.fraction` for automatic fraction formatting.
- Added `tick-format.linear.pad` to disable zero-padding when formatting linear ticks.
- Fixed formatting of linear ticks with suffix. In particular, the "0" and minus sign of negative ticks were previously not passed to `zero.num`. This can be important for consistency when text and math fonts don't match.
- Fixed rounding issues for `tick-distance` when using the linear locator.
- Fixed an issue where the wrong subtick locator was selected when the log locator resolves to linear ticks. 

### Utility
- Added `vec.jitter` to apply randomized offsets to numeric arrays.
- Added the `minmax.margin` option.
- ⚠️ Note: **`vec.transform`** now takes individual arguments rather than a tuple. Use:

  `lq.vec.transform(a, b, (a, b) => ...)`

  instead of the previous:

  `lq.vec.transform(a, b, ((a, b)) => ...)`.



### Dependencies
- Zero: 0.5.0 → 0.6.0
- Komet: 0.1.0 → 0.2.0
- Tiptoe: 0.3.1 → 0.4.0



### Documentation
- Fixed typos and improved clarity across the docs.
- Typst built-in type annotations now link to the corresponding pages on the Typst website. 
