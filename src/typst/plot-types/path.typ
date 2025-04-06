#import "_template.typ": *
#show: template


#diagram(
  margin: (x: 20%, y: 15%),
  lq.path(
    ((0, 1), (0, -1)),
    ((.5, 1), (0, 1)),
    ((0,-1), (0, 1), (0, 1)),
    ((-.5, 1), (0, -1)),
    ((0, 1), (0, 1)),
    fill: color.lighten(40%),
    stroke: color
  )
)
