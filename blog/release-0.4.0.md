---
title: "Release: Lilaq 0.4.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-07-09
---


With version 0.4.0, we finally get 
- [color bars](https://lilaq.org/docs/reference/colorbar), 
- [plot smoothing](https://lilaq.org/docs/reference/plot#smooth), 
- a [tutorial on ticks](https://lilaq.org/docs/tutorials/ticks), 
- [$\pi$-based scales](https://lilaq.org/docs/examples/multiples-of-pi-scale), 
- [individual addressing of the $x$ and $y$ grid](https://lilaq.org/docs/reference/grid)

and a lot more.


<!-- truncate -->


## Changelog

Additions 
- Lilaq now (official) has color bars that can be used to create a legend for colored plots like <Crossref target="scatter" /> or <Crossref target="colormesh" />, 
- The function <Crossref target="plot" /> now supports smoothing through <Crossref target="plot#smooth" /> (thanks to @Netzwerk2). 
- There is now a formatter for <Crossref target="symlog" /> axes. 
- The linear tick locator now features a `unit` parameter making it easy to set up scales based on multiples of $\pi$ or other real numbers. In addition, the linear tick formatter is now equipped with a `suffix` parameter and reacts to the `unit` of the linear tick locator. 
- The types <Crossref target="tick" /> and <Crossref target="tick-label" /> now have a field `kind` which can be `"x"` or `"y"`, referring to the kind of axis that they are placed on. 
- Lilaq now uses the new version 1.1.0 of [elembic](https://github.com/PgBiel/elembic), introducing features like conditional set rules like `show: lq.cond-set(lq.grid.with(kind: "x"), stroke: yellow)` and filtered show rules through `lq.show_(lq.tick-label.with(sub: true), it => {..})`. 
- The type <Crossref target="tick-label" /> now has a field <Crossref target="tick-label#sub" />. 
- One can now pass a list of extra ticks to <Crossref target="axis#extra-ticks" /> (for example through `lq.diagram(xaxis: (extra-ticks: ()))`). 
- The plot functions <Crossref target="ellipse" /> and <Crossref target="rect" /> now have a parameter `align`.

Breaking changes
- ⚠️ The parameter <Crossref target="tick#shorten-sub" /> now takes a ratio between `0%` and `100%` instead of a float between `0` and `1` and its behavior is inverted: Setting it to `70%` for example shortens the sub-ticks _by_ 70% and not _to_ 70%. 
- ⚠️ The parameter <Crossref target="grid#sub" /> is now named instead of positional. 
- ⚠️ When a function is passed to <Crossref target="quiver#color" />, it is passed both the coordinates and directions as `(x, y, u, v)` instead of just the coordinates. 
- ⚠️ The legend now uses a `grid` instead of a `table` to lay out its items, so you need to replace any `show lq.selector(lq.legend): set table(..)` with `show lq.selector(lq.legend): set grid(..)`

Improvements
- The diagram bounds are updated accordingly for content placed with <Crossref target="lq.place" />. 
- Updated [Tiptoe](https://typst.app/universe/package/tiptoe) from `0.3.0` to `0.3.1` (it now works with right-to-left text direction). 
- Updated [Zero](https://typst.app/universe/package/zero) from `0.3.3` to `0.4.0` (some fixes, including with right-to-left text). 
- The fields <Crossref target="stem#mark-size" /> and <Crossref target="hstem#mark-size" /> now default to `auto`. 


Fixed
- Diagrams now work in a context with right-to-left text direction. 
- Fixed <Crossref target="axis#inverted" /> which was ignored whenever there was at least one plot with non-tight limits. 
- Setting <Crossref target="mark#stroke" /> and <Crossref target="mark#fill" /> via plot cycles now works for <Crossref target="scatter" />. 
- Breaking of tick labels when the diagram is too narrow (thanks to @Xendergo). 
- Manual tick locations are now clipped to the range of the axis. 
- Fixed computation of significant digits with non-integer steps. 
- Sub-ticks can now be formatted easily. 
- The interaction of various color and stroke settings for <Crossref target="scatter" />. 
- Fixed error bars when the y-axis range is inverted. 
- Median inset has been fixed for inverted axes. 
- A conflict when using <Crossref target="plot#every" /> together with legend labels has been resolved. 


Documentation
- Finally there is a [tutorial on ticks](https://lilaq.org/docs/tutorials/ticks)!