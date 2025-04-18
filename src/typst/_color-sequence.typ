
#let template(body) = {
  set page(width: 400pt)
  body
}

#show: template

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

#let show-sequence(colors, name, cvd-friendly: false) = {
  raw(name)
  if cvd-friendly [
     #h(1fr) #check #text(luma(30%))[CVD-friendly]
  ]
  grid(
    columns: (1fr, ) * colors.len(),
    ..colors.map(color => rect(fill: color, width: 100%, height: 30pt))
  )
}
#show-sequence(color.map.viridis, "matplotlib", cvd-friendly: true)
