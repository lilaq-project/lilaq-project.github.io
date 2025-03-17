#set page(margin: 1em, width: auto, height: auto)

#import "/lilaq/src/lilaq.typ" as lq


#set curve(stroke: (join: "bevel"))
#lq.diagram(
  width: 6cm,
  height: 3.5cm,
  margin: 8%,
  lq.path(
    (0.3, 0),
    (0.3, .9),
    (-.2, .4),
    (.5, .4),
    stroke: 10pt + color.mix((blue, 45%), (red, 55%))
  ),
  lq.path(
    ((1.14, .15), (-.5, 0)),
    ((1.14, .8), (.5, 0)),
    ((1.14, .15), (-.5, 0)),
    stroke: 10pt + color.mix((blue, 60%), (red, 40%))
  ),
  lq.path(
    (2.3, 0),
    (2.3, .9),
    (1.8, .4),
    (2.5, .4),
    stroke: 10pt + color.mix((blue, 70%), (red, 30%))
  )
  
)