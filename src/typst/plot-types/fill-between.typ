#import "_template.typ": *
#show: template


#diagram(
  lq.fill-between(
    lq.linspace(0, 3, num: 25), 
    calc.sin,
    y2: calc.cos,
    fill: color.lighten(40%), 
    stroke: color
  ),
)
