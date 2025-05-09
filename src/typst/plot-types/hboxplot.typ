#import "_template.typ": *
#import "@preview/suiji:0.3.0"
#show: template


#let rng = suiji.gen-rng(16)
#let (rng, x1) = suiji.uniform(rng, low: 0, high: 10, size: 10)
#let (rng, x2) = suiji.uniform(rng, low: 0, high: 10, size: 10)
#let (rng, x3) = suiji.uniform(rng, low: 0, high: 10, size: 10)

#diagram(
  lq.hboxplot(
    x1, x2, x3, 
    stroke: color, 
    median: black
  ),
)
