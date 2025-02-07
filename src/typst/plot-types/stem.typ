#import "template.typ": *
#show: template

#let x = lq.arange(-4, 5)
#let y = x.map(x => calc.exp(-x*x/6))

#diagram(
  margin: 10%,
  lq.stem(
    x, y, 
    color: color, 
    base-stroke: none
  ),
)
