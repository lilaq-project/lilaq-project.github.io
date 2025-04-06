#import "_template.typ": *
#show: template


#let y = lq.arange(-4, 2)
#let x = y.map(x => calc.exp(x*x/8))

#diagram(
  lq.hbar(x, y, fill: color),
)
