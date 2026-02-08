---
title: Bivariate plot with marginals
sidebar_custom_props:
  tags: [fill]
---

This example shows how to equip a bivariate scatter plot with univariate histograms or kernel density estimation for both axes with the help of the package [Komet](https://typst.app/universe/package/komet). 

This is achieved by laying out three plots in a grid. A special rule `show: lq.layout` is used (see tutorial)

```example reverse-order
// Generate data
#import "@preview/suiji:0.5.1"
#let rng = suiji.gen-rng(14)
#let (rng, x) = suiji.normal(rng, size: 100)
#let (rng, y) = suiji.normal(rng, size: 100)

// Bin data
#import "@preview/komet:0.2.0"
#let hist-x = komet.histogram(x)
#let hist-y = komet.histogram(y)

// Converts histogram edges to center coordinates
#let hist-edges-to-centers(edges) = {
  edges.windows(2).map(a => a.sum() / 2)
}

#let xlim = lq.minmax(x, margin: 5%)
#let ylim = lq.minmax(y, margin: 5%)

#show: lq.set-diagram(
  width: 5cm, height: 5cm,
  xlim: xlim,
  ylim: ylim,
  xaxis: (mirror: none),
  yaxis: (mirror: none),
)

#show: lq.layout 

#grid(
  columns: 2,
  column-gutter: 0.5em,
  row-gutter: 0.5em,
  lq.diagram(
    ylim: auto, 
    height: 2cm,
    xaxis: (ticks: none),
    yaxis: none,
    grid: none,
    lq.bar(hist-edges-to-centers(hist-x.edges), hist-x.counts),
  ),
  [],

  lq.diagram(
    lq.scatter(x, y)
  ),
  lq.diagram(
    xlim: auto, 
    width: 2cm,
    yaxis: (ticks: none),
    xaxis: none,
    grid: none,
    lq.hbar(hist-y.counts, hist-edges-to-centers(hist-y.edges))
  ),
)
```


And an alternative with kernel density estimation instead of histograms:


```example
// Generate data
#import "@preview/suiji:0.5.1"
#let rng = suiji.gen-rng(14)
#let (rng, x) = suiji.normal(rng, size: 100)
#let (rng, y) = suiji.normal(rng, size: 100)

// Bin data
#import "@preview/komet:0.2.0"
#let kde-x = komet.kde(x)
#let kde-y = komet.kde(y)


#let xlim = lq.minmax(x, margin: 5%)
#let ylim = lq.minmax(y, margin: 5%)

#show: lq.set-diagram(
  width: 5cm, height: 5cm,
  xlim: xlim,
  ylim: ylim,
  xaxis: (mirror: none),
  yaxis: (mirror: none),
)

#show: lq.layout 

#grid(
  columns: 2,
  column-gutter: 0.5em,
  row-gutter: 0.5em,
  lq.diagram(
    ylim: auto, 
    height: 1cm,
    xaxis: (ticks: none),
    yaxis: none,
    grid: none,
    lq.fill-between(kde-x.x, kde-x.y),
  ),
  [],

  lq.diagram(
    lq.scatter(x, y)
  ),
  lq.diagram(
    xlim: auto, 
    width: 1cm,
    yaxis: (ticks: none),
    xaxis: none,
    grid: none,
    lq.fill-between(kde-y.y, kde-y.x)
  ),
)
```


