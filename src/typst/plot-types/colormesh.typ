#import "_template.typ": *
#show: template


#diagram(
  lq.colormesh(
    lq.linspace(-1, 3, num: 12),
    lq.linspace(-1, 3, num: 12),
    (x, y) => calc.pow(calc.sin(x) * calc.cos(x/5 + y), 3),
    map: (color, luma(240))
  ),
)
