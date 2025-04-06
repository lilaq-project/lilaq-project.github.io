#import "/lilaq/src/lilaq.typ" as lq

#let template(body) = {

    set page(width: auto, height: auto, margin: 0pt, fill: none)
    body
    
}




#set line(stroke: white.transparentize(100%))

#let color = color.mix((purple, 40%), (blue, 60%))

#let diagram = lq.diagram.with(
  width: 2cm, height: 2cm,
  xaxis: (ticks: none), 
  yaxis: (ticks: none), 
)