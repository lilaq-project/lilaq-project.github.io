---
title: Drawing shapes
description: Drawing primitive shapes and arbitrary content into diagrams. 
---


Aside from conventional plot types, it is possible to draw a selection of geometric primitives. These are
- <Crossref target="line" /> for lines and arrows,
- <Crossref target="rect" /> for rectangles,
- <Crossref target="ellipse" /> for ellipses, 
- and <Crossref target="path" /> for arbitrary Bézier splines. 

In addition, with
- <Crossref target="place" />,

it is possible to add any content on top of the diagram. 


These primitives can be especially useful since their positions (and partly also their dimensions) can be specified in
- data coordinates (using `int` or `float` values), 
- or absolute coordinates (using `length` values like `10pt` `3em`), or
- or relative diagram coordinates (using `ratio` values, e.g., `50%` lies in the center of the diagram area),
and in many cases even a combination of the above. 

The [Koch curve example](/docs/examples/koch-snowflake.mdx) demonstrates how to use <Crossref target="path" /> for drawing a fractal. 
