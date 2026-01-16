#import "_template.typ": *
#import "@preview/suiji:0.5.1"
#show: template


#let rng = suiji.gen-rng(16)
#let (rng, x1) = suiji.uniform(rng, low: 0, high: 10, size: 10)
#let (rng, x2) = suiji.uniform(rng, low: 0, high: 10, size: 10)

#diagram(
  lq.boxplot(
    x1, x2, 
    stroke: color, 
    median: black
  ),
)
