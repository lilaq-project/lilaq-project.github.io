---
title: Time series
description: Plotting data with dates and times
---

Lilaq has built-in support for plotting time series with [`datetime`](https://typst.app/docs/reference/foundations/datetime/) values. In addition to arrays of float values, most plotting functions also accept an array of datetimes as inputs. 

```example
#lq.diagram(
  title: [Size of the Lilaq source code],
  ylabel: [Size in kilobyte],
  xlabel: [Time],
  lq.plot(
    (
      datetime(year: 2025, month: 3, day: 14),
      datetime(year: 2025, month: 4, day: 2),
      datetime(year: 2025, month: 5, day: 14),
      datetime(year: 2025, month: 7, day: 8),
      datetime(year: 2025, month: 8, day: 27),
    ),
    (254, 265, 295, 301, 330)
  )
)
```
In order to adjust the viewing limits, <Crossref target="diagram#xlim" /> and <Crossref target="diagram#ylim" /> also accept datetimes. 

When a diagram contains a plot that uses datetimes along one axis, the <Crossref target="scale" /> along for this axis is changed to a datetime scale that activates the adaptive tick locator designed for finding appropriate datetime locations. 



## Formatting options

By default, Lilaq tries to find a good distance between axis ticks which can be in years, months, days, hours, minutes, or seconds. The dates and times are then displayed in a space-saving manner which can be configured in various ways. 


## Internationalization/Localization

Unfortunately, the built-in display method of the `datetime` type does not support localization and can only display the month names in English. In order to overcome this problem, you can use a function like the following to format a month:
```typ
#let french-months = (
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
)
#show: lq.set-smart-format(
  month: dt => french-months.at(dt.month() - 1),
)
```

```typ
#show: e.set_(ticking.tick-datetime-smart-first, day: "[day]\n[month repr:short]")
#lq.diagram(
  width: 10cm,
  lq.plot(
    (
      datetime(year: 2011, month: 1, day: 1),
      datetime(year: 2011, month: 3, day: 4)
    ),
    (1, 2)
  )
)
```