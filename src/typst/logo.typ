#set page(margin: 0pt, width: auto, height: auto)

#import "/lilaq/src/lilaq.typ" as lq

#let clrs = (
  "ba80a3", "a5609a", "856cb3", "7769c2", "6f5bbd",
  "8f234f", "811d53", "4d2a85", "2a138f", "3a219c",
  "8e3064", "780b3f", "63296d", "342081", "62509e",
  "bcb9e4", "7d71b4", "442c95", "5e5193", "8e5f8b",
  "dedefb", "bfb9e6", "5a47ad", "67509d", "8b4e8e"
)

#lq.diagram(
  width: 4cm, height: 4cm,
  xaxis: (hidden: true),
  yaxis: (hidden: true),
  lq.colormesh(
    range(5), 
    range(5), 
    clrs.map(rgb).chunks(5).rev()
  )
)