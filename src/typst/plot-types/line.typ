#import "template.typ": *
#show: template
#import "@preview/tiptoe:0.3.0"

#diagram(
  margin: (x: 30%, y: 40%),
  lq.line((1, 1), (2, 2), stroke: color),
  lq.line(
    (1, -1), (2, 0), 
    tip: tiptoe.stealth,
    toe: tiptoe.bar
  )
)
