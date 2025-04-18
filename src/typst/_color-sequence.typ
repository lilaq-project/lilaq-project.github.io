#import "/lilaq/src/lilaq.typ" as lq


#let check = box(baseline: .15em, {
  circle(
    fill: green.lighten(20%), 
    radius: .5em, inset: 1pt,
    curve(
      curve.move((0%, 50%)),
      curve.line((40%, 100%)),
      curve.line((90%, 10%)),
      stroke: (paint: white, cap: "round", join: "round", thickness: 1.5pt)
    )
  )
})

#let show-sequence(name, cvd-friendly: false) = block(width: 13cm, {
  show "lq.color.map.": set text(gray)
  raw("lq.color.map." + name)
  let map = dictionary(lq.color.map).at(name)
  if cvd-friendly [
     #h(1fr) #check #text(luma(30%))[CVD-friendly]
  ]
  grid(
    columns: (1fr, ) * map.len(),
    ..map.map(color => rect(fill: color, width: 100%, height: 30pt))
  )
})


#let show-map(name) = block(width: 13cm, {
  let map = dictionary(lq.color.map).at(name)
  show "lq.color.map.": set text(gray)
  raw("lq.color.map." + name)
  stack(spacing: -1pt,
    rect(
      width: 100%,
      height: 1.5cm,
      fill: gradient.linear(..map)
    ),
    rect(
      width: 100%,
      height: 1cm,
      fill: gradient.linear(..map).sharp(map.len()),
    )
  )
})
