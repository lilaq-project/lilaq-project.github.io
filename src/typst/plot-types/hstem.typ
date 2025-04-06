#import "_template.typ": *
#show: template

#let y = lq.arange(-4, 5)
#let x = y.map(x => calc.exp(-x*x/6))

#diagram(
  margin: 10%,
  lq.hstem(
    x, y, 
    color: color, 
    base-stroke: none
  ),
)
