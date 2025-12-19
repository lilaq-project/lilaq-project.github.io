#import "_template.typ": *
#import "@preview/suiji:0.3.0"
#show: template


#let rng = suiji.gen-rng(29)
#let (rng, x1) = suiji.normal(rng, scale: 1.5, size: 100)
#let (rng, x2) = suiji.normal(rng, loc: 2, size: 100)


#show: lq.set-violin-boxplot(width: 30%)
#diagram(
  cycle: (color,),
  lq.violin(
    x1, x2, 
    stroke: color, 
    median: white,
    width: .8,
  ),
  margin: (x: 15%),
)
