#import "template.typ": *
#show: template


#diagram(
  margin: (x: 20%, y: 15%),
  lq.plot(
    (1, 2, 3, 4),  (2, 2.5, 2.2, 3), 
    yerr: (.5,.3,.5,.4), 
    color: color
  ),
  lq.plot(
    (1, 2, 3, 4), (4, 3.5, 5, 4.5), 
    color: color, 
    step: start, 
    mark-size: 6pt
  )
)
