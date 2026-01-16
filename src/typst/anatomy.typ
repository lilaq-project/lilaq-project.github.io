
#set page(margin: 1cm, width: auto, height: auto)

#import "/lilaq/src/lilaq.typ" as lq
#import "@preview/suiji:0.5.1"

#let x = lq.linspace(.3, 3.7, num: 11)
#let y = x.map(x => x*x*.8 + 2)

#let rng = suiji.gen-rng(31)

#let (rng, dx) = suiji.uniform(rng, low: -.2, high: .2, size: x.len())
#let (rng, dy) = suiji.uniform(rng, low: -2, high: 2, size: x.len())
#let (rng, color) = suiji.uniform(rng, low: 1, high: 10, size: x.len())
#let (rng, size) = suiji.uniform(rng, low: 1, high: 50, size: x.len())


#scale(
  200%, 
  reflow: true, 
  lq.diagram(
    title: [Anatomy],
    xlabel:  [$x$],
    ylabel:  [$y$],
    width: 180pt,
    height: 120pt,
    yaxis: (tick-distance: 5),
    xlim: (0, 4),
    ylim: (0, 15),
    legend: (position: right + bottom),
    lq.scatter(
        x.zip(dx).map(array.sum),
        y.zip(dy).map(array.sum),
        size: size,
        label: [Data]
    ),
    lq.plot(x, y, mark: none, label: [Fit]),
    lq.plot(
      (1,), (6,),
      yerr: 1
    )
  )
)
