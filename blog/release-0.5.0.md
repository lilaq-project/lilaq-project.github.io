---
title: "Release: Lilaq 0.5.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-08-31
---

With version 0.5.0, we are introducing several major improvements including:
- [datetime support](/docs/tutorials/time-series) for time series plotting,
- [relative sizing](/docs/reference/diagram#width) for diagrams,
- significant performance improvements through [Komet](https://github.com/Mc-Zen/komet) integration,
- and enhanced bar plot capabilities.

<!-- truncate -->

## Changelog

Additions
- Added comprehensive datetime support for time series plotting with customizable formatting.
- Diagrams now support relative and ratio inputs for <Crossref target="diagram#width" /> and <Crossref target="diagram#height" />.
- Bar plots gained variable offset support through the new <Crossref target="bar#offset" /> parameter.
- Functions can now be used as $y$ parameter in <Crossref target="plot" />, <Crossref target="bar" />, <Crossref target="stem" />, and <Crossref target="fill-between" />.
- Column headers in text files can now be used as converter names in <Crossref target="load-txt" />.

Improvements
- **Major Performance Boost**: 
  - Boxplot statistics computation is now significantly faster using Komet.
  - Contour computation shows enormous speed improvements through Komet integration.
- <Crossref target="tick-locate.linear" /> now supports constrained tick distances.
- Improved inline behavior for diagrams with relative sizes.
- Enhanced axis positioning and alignment.

Fixed
- Corrected colormesh positioning in zoomed-in views.
- Fixed label space computation when using show rules.
- Resolved issues with subtick labels and axis attachments.
- Fixed plot datetime check for empty arrays.
- Corrected axis position when alignment is flipped.
- Fixed regression with setting <Crossref target="label#pad" /> to `none`.
- Resolved placement of extra subticks.

Documentation
- Improved colorbar documentation.
- Fixed various typos and broken links.
- Added comprehensive documentation for datetime formatting.

---

A big thank you to [@timfi](https://github.com/timfi), [@Jacobgarm](https://github.com/Jacobgarm), [@F2011](https://github.com/F2011), and [@xkeviota](https://github.com/xkeviota) for their contributions to this release!