#import "_template.typ": *
#show: template

#let x = lq.arange(-4, 5)

#diagram(
  margin: 10%,
  lq.stem(
    x, x => calc.exp(-x*x/6),
    color: color, 
    base-stroke: none
  ),
)
