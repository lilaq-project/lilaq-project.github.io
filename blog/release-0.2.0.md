---
title: "Release: Lilaq 0.2.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-04-02
---

With this release, important improvements are made to the defaults, prominently including a new default color cycle.  
<!-- truncate -->

:::info

Feedback on the default settings are welcome! Defaults are important because they are often left unchanged − currently, Lilaq is in a stage where they can still be tuned. Later, such breaking changes will be mostly impossible. 

You can open a [Discussion](https://github.com/orgs/lilaq-project/discussions) on GitHub and share your thoughts. 

:::

Instead of a somewhat arbitrary color cycle, Lilaq now uses a thoroughly researched, highly optimized color sequence that is friendly to people with color deficiencies. This map is a result of the work of M. A. Petroff (https://arxiv.org/abs/2107.02270). 
On top, Lilaq ships a small set of color sequences, available under `lq.color.map`. 

Moreover, the default axis thickness and tick length have been reduced, resulting in a better harmony with text surrounding a diagram figure. 

The mark shapes of Lilaq are carefully designed to match in optical size, so they look good together in one plot without further adaptation. This release makes some fine adjustments to the mark sizes. Furthermore, some marks have been added and a few ones renamed (see below). 

The most important fixes in this release concern a bug that made it impossible to replace the default style cycle and an issue when first-line-indent was applied to all paragraphs. 



## Changelog

Highlights
- Lilaq now features a professional default color cycle. 


Added 
- `plot.every` for plotting marks for only a subset of the data points. 
- Sequential color maps, e.g., for style cycles under `lq.color.map`. 
- Tools for creating cycles. 
- Options `tip` and `toe` to `lq.path` for adding arrow tips or other marks. 


Improved
- `diagram.xaxis` and `diagram.yaxis` dictionaries will now fold which is useful for `set` rules and overriding only specific settings made in templates. 
- `axis.dx` and `axis.dy` can now be of type `relative` or `ratio` for more positioning control. 
- Ticks now use `cap: "butt"` by default leading to better results when the spine stroke is set to `none`. This also shortens the ticks by half their width compared to before. 
- The function `locate-ticks-linear` now features a parameter `density` that can be used to tune the number of generated ticks based on the automatic estimate. 
- The parameter `label.pad` can now be `none` for placement directly on the axis (ignoring the ticks). 
- `diagram.cycle` can now also take an array of colors for the common case that the style cycle only consists of color changes. Moreover, and array of dictionaries with the possible keys `color`, `stroke`, and `mark` is supported. 


Marks

- Tweaked mark sizes. 
- ⚠️ Replaced `triangle` with `^` and added other triangle rotations `<`, `>`, and `v`. 
- ⚠️ Replaced `diamond` with `d`
- ⚠️ Replaced `pentagon`, `hexagon`, `heptagon`, and `octagon` with `p5`, `p6`, `p7`, `p8`. 
- Added star variations `s3`, `s4`, `s5`, and `s6`
- ⚠️ Default mark stroke thickness is now 0.7pt instead of 1pt matching it with the default line width of 0.7pt. 

Other breaking changes
- ⚠️ The default color cycle has changed. We now use a color sequence introduced by Matthew A. Petroff in https://arxiv.org/pdf/2107.02270 that is optimized for distinguishability, aesthetics, and people with color deficiencies. 
- ⚠️ The default spine thickness has changed from `0.7pt` to `0.5pt`. 
- ⚠️ The default tick length has been reduced from `4pt` to `3pt`. 
- ⚠️ `diagram.legend` no longer supports `bool` arguments. Instead, use `legend: none` to turn the legend off (or `legend: (:)` to turn it back on after it has been deactivated previously). 
- ⚠️ The default color of `vlines` and `hlines` is now black instead of blue. 

Fixed
- An urgent [bug](https://github.com/lilaq-project/lilaq/issues/8) with style cycle lists being appended.
- The [bottom axis being misplaced](https://github.com/lilaq-project/lilaq/issues/7) when a first-line-indent is applied to all paragraphs. 
- Combination of `plot.stroke: none` and a fixed `plot.color` resulted in black error bars. 

Documentation
- Added examples for advanced bar charts with labels and error bars. 
- Added mark documentation and tutorial. 
- Improved style cycle documentation. 


