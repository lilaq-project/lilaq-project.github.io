#import "template.typ": *
#show: template


#let y = lq.arange(-4, 5)
#let x = y.map(x => calc.sin(x*x/6))

#diagram(
  lq.hbar(x, y, fill: color),
)
