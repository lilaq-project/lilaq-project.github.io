#import "/lilaq/src/lilaq.typ" as lq

#grid(
  columns: 3, 
  column-gutter: 1em, 
      
  lq.diagram(
    let xs = lq.linspace(-2, 2, num: 20),
    cycle: lq.color.map.okabe-ito,
    // legend: (position: left, dx: 100%),
    ..range(10).map(i => 
      lq.plot(xs, xs.map(x => x*x*x - x*i))
    )
  ),
  
  lq.diagram(
    lq.plot(
      range(8), (3, 6, 2, 9, 5, 6, 0, 4),
      yerr: (1, 1, .7, .8, .2, .6, .5, 1),
      // stroke: none,
      mark-size: 6pt,
      label: [Data],
    )
  ),
  
  lq.diagram(
    lq.bar(range(1, 11), (3,6,3,6,2,8,9,5,3,2), align: left, width: .4),
    lq.bar(range(1, 11), (4,7,2,2.3,1,9,9.2,4,2,1), align: right, width: .4)
  ),

)
