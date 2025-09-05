---
title: "Release: Lilaq 0.5.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-08-31
---

With version 0.5.0, we are introducing several major improvements including:
- [datetime support](/docs/tutorials/time-series) for time series plotting,
- [relative sizing](/docs/reference/diagram#width) for diagrams,
- and significant performance improvements through integration with [Komet](https://github.com/Mc-Zen/komet).

<!-- truncate -->

## Changelog

Additions
- Added comprehensive datetime support for time series plotting with customizable formatting.
- Diagrams now support relative and ratio inputs for <Crossref target="diagram#width" /> and <Crossref target="diagram#height" />.
- The parameter <Crossref target="bar#offset" /> now accepts `array` arguments for variable offsets.
- In addition to coordinate arrays, functions `x => f(x)` can now be used as $y$ arguments in <Crossref target="plot" />, <Crossref target="bar" />, <Crossref target="stem" />, and <Crossref target="fill-between" /> (thanks to [@xkevio](https://github.com/xkevio)).
- Column headers in text files can now be used as converter names in <Crossref target="load-txt" /> (thanks to [@timfi](https://github.com/timfi)).

Improvements
- **Major Performance Boost**: 
  - Contour computations are now significantly faster through Komet integration.
  - Boxplots can now be computed for considerably larger data sets thanks to using the Komet plugin. 
- <Crossref target="tick-locate.linear" /> now supports constrained tick distances like `tick-distance: (min: 1)`.
- ⚠️ The default for <Crossref target="label#angle" /> is now `auto` which results in 0° for x-labels and -90° for y-labels. With this change, the angle can now be changed with a conditional show rule (before, this was not possible since the -90° was hard-coded into the y-label). 
- ⚠️ Improved the schoolbook [theme](/themes). 

Fixed
- Corrected colormesh positioning in zoomed-in views.
- Fixed label space computation when using show rules.
- Resolved issues with subtick labels and axis attachments.
- Corrected axis positions defined in terms of data coordinates along the other axis when using top or right alignment.
- Fixed a regression with setting <Crossref target="label#pad" /> to `none`.
- Resolved placement of extra subticks.

Documentation
- Added a comprehensive tutorial for datetime formatting.
- Added documentation for tick locators and formatters. 
- Improved the <Crossref target="colorbar" /> documentation.
- Fixed various typos and broken links (also thanks to [@Jacobgarm](https://github.com/Jacobgarm) and [@F2011](https://github.com/F2011)).
