#import "template.typ": *
#import "@preview/suiji:0.3.0"
#show: template


#let rng = suiji.gen-rng(16)
#let (rng, x) = suiji.uniform(rng, low: 0, high: 10, size: 10)
#let (rng, y) = suiji.uniform(rng, low: 0, high: 10, size: 10)
#let (rng, colors) = suiji.uniform(rng, size: 10)
#let (rng, sizes) = suiji.uniform(rng, low: 10, high: 400, size: 10)

#diagram(
  margin: 20%,
  lq.scatter(
    x, y, 
    color: colors, 
    size: sizes, 
    map: (color, luma(240))
  )
)
