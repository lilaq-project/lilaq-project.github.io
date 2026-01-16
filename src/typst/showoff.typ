#import "/lilaq/src/lilaq.typ" as lq
#import "@preview/suiji:0.5.1"

#set page(margin: .5cm, width: auto, height: auto)


#let colorbar(plot) = {
  let cinfo = plot.cinfo
  lq.diagram(
    width: .3cm, 
    xaxis: (ticks: none), 
    yaxis: (position: right, mirror: (:)),
    grid: none,
    // ylabel: "color",
    ylim: (cinfo.min, cinfo.max),
    yscale: cinfo.norm,
    lq.rect(0%, 0%, width: 100%, height: 100%, fill: gradient.linear(..cinfo.colormap.stops(), angle: -90deg))
  )
}


#let rng = suiji.gen-rng(33)
#let (rng, x) = suiji.uniform(rng, low: 0, high: 10, size: 20)
#let (rng, y) = suiji.uniform(rng, low: 0, high: 10, size: 20)
#let (rng, colors) = suiji.uniform(rng, size: 20)
#let (rng, sizes) = suiji.uniform(rng, low: 10, high: 100, size: 20)

#let data = lq.scatter(x, y, color: colors, size: sizes, map: (luma(20%), color.mix((purple, 40%), (blue, 60%)), luma(240)).rev(), min: 0, max: 1)
#lq.diagram(
  xlim: (0, 10), ylim: (0, 10),
  data, 
)
#h(2mm)
#colorbar(data)
