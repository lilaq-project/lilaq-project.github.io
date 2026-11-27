---
title: "Release: Lilaq 0.7.0"
authors: [Mc-Zen]
tags: [release]
date: 2026-11-21
---

Lilaq 0.7.0 upgrades contour plots and adds  presentation-friendly plot reveals as well as a new type legend-icon, error bars for the scatter function and a new plot routine to simplify plotting functions. It also improves color handling, control over the legend, and compatibility with Typst 0.15.




<!-- truncate -->


## Changelog


### Breaking changes
- Default spine, tick, grid, and legend colors are now derived from the surrounding text and page colors, improving theme behavior.

- Colorbars for filled contour plots now use discrete bands, while colorbars for stroked contour plots use discrete line segments (before, a continuous gradient was displayed).

- For contour plots, explicitly specified `min` and `max` values are now not only respected for coloring but also when
 generating automatic level positions. 

- The option <Crossref target="contour#fill" /> now expects `none | auto` instead of `false | true`. In addition, it can take an `array`. For backwards-compatibility, a boolean is still accepted until the next version.

- The default legend ordering changed to top-to-bottom (`ttb`). Set <Crossref target="legend#ordering" /> to `ltr` for the previous left-to-right layout. This change only has an effect when the legend is laid out in multiple columns.

- The default `grid.inset` used in the <Crossref target="legend" /> changed from a fixed `2pt` to `2em / 11`, so the legend grid spacing scales with the text size. For a font size of 11pt, this change has no effect.


### Diagram
- Added <Crossref target="diagram#reveal" /> for presentation tools: reveal a fixed number of plots or reveal plots conditionally with a function.
- Added an option `use-cycle` (e.g. <Crossref target="plot#use-cycle" />) to most plot types, allowing plots to opt in or out of participation in the diagram style cycle.
- Added a new type <Crossref target="legend-icon" /> to expose control over the size of legend icons.
- Added <Crossref target="legend#columns" /> and <Crossref target="legend#ordering" /> for arranging legend entries in multiple columns and choosing left-to-right or top-to-bottom order.
- Default spine, tick, grid, and legend colors are now derived from the surrounding text and page colors, improving theme behavior.
- Added support for setting <Crossref target="tick#stroke" /> to `none` to hide tick marks.
- Added an option <Crossref target="axis#include-zero" /> to force inclusion of the coordinate 0 in automatic axis limits. 
- Fixed legend `z-index` handling for individual legends passed through <Crossref target="diagram#legend" />.
- Fixed legend placement when a `set block(width: 100%)` or `set block(height: 100%)` rule is applied to the surrounding block.
- Fixed manual tick locations on inverted axes.
- Fixed manual tick labels supplied as dictionaries.
- Fixed rendering of extreme coordinates by clamping to 100000 times the width/height in all directions.
- Deactivated rounding for exponent/offset formatting.
- Added an explicit error message when <Crossref target="axis#subticks" /> is set to an integer for a nonlinear axis.
- Fixed extra-tick custom formatters, including the case where <Crossref target="axis#ticks" /> is set to `none`.

### Plots
- Added <Crossref target="plot-function" /> for plotting a `function` over an explicit domain with sampling controlled by `samples`. This function forwards to <Crossref target="plot" /> with modified defaults of `mark: none` and `smooth: true`.
- Added support for error bars with <Crossref target="scatter" />.
- Expanded contour plot features with:
  - In-plot level labels, see <Crossref target="contour#level-labels" />.
  - Per-level fill overrides and per-level strokes.
  - Tiling support for filled contours.
  - Improved colorbars which are now discrete for filled and stroked contour plots.
  - Improved automatic contour level generation by respecting explicit `min` and `max` values.
- Improved mark rendering when fill and stroke colors coincide, avoiding redundant outline strokes while preserving visual size.
- Improved performance for plots with `mark: none` by skipping mark placement entirely.


### Themes
- The schoolbook theme now uses the new axis option <Crossref target="axis#include-zero" /> to ensure that the origin is included in the plot. 


### Utility
- Added <Crossref target="geomspace" /> for geometric progressions with linear sample counts.


### Dependencies
- Zero: 0.6.1 → 0.7.1
- Komet: 0.2.0 → 0.3.0
- Added Typst 0.15 compatibility.


### Documentation
- Improved documentation for contour. 
- Updated the legend and cycle tutorials. 
- Fixed legend inset documentation and several plot and mark documentation typos.
