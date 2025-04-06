#import "_template.typ": *
#show: template


#let x = lq.arange(-4, 5)
#let y = x.map(x => calc.exp(-x*x/6))

#diagram(
  lq.bar(x, y, fill: color),
)
