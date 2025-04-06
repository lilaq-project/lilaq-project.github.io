#import "_template.typ": *
#show: template


#let x = lq.linspace(0, 3, num: 25)
#let y1 = x.map(x => calc.sin(x))
#let y2 = x.map(x => calc.cos(x))

#diagram(
  lq.fill-between(
    x, y1, y2: y2, 
    fill: color.lighten(40%), 
    stroke: color
  ),
)
