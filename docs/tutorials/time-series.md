---
title: Datetime support
description: Plotting dates and times through datetime values. 
sidebar_position: 6
---

Lilaq has built-in support for plotting time series with [`datetime`](https://typst.app/docs/reference/foundations/datetime/) values. In addition to arrays of float values, most plotting functions also accept an array of datetimes as coordinate inputs. 

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



## Supplying a fixed format string
One way to configure the formatter is through a fixed [datetime format string](https://typst.app/docs/reference/foundations/datetime/#definitions-display) or a function `datetime => content`. 
```example
#lq.diagram(
  xaxis: (
    format-ticks: lq.tick-format.datetime.with(
      format: "[year]/[month]",
    ),
    tick-args: (density: 80%)
  ),
  lq.plot(
    (
      datetime(year: 2025, month: 1, day: 2),
      datetime(year: 2025, month: 4, day: 2),
      datetime(year: 2025, month: 8, day: 14),
    ),
    (2, 3, 1)
  )
)
```
Such formats are often difficult to accommodate on an $x$-axis due to the length of tick labels. If using the smart formatter (see next section) is no option, you can instead rotate the labels. 
```example
#show: lq.show_(
  lq.tick-label.with(kind: "x"), 
  rotate.with(-90deg, reflow: true)
)

#lq.diagram(
  xaxis: (
    format-ticks: lq.tick-format.datetime.with(
      format: "[year]/[month]",
    ),
  ),
<<<  ..
>>>  lq.plot(
>>>    (
>>>      datetime(year: 2025, month: 1, day: 2),
>>>      datetime(year: 2025, month: 4, day: 2),
>>>      datetime(year: 2025, month: 8, day: 14),
>>>    ),
>>>    (2, 3, 1)
>>>  )
)
```

## Modifying the component formats

By default, <Crossref target="tick-format.datetime#format" /> is set to <Crossref target="tick-format.datetime-smart-format" />. The smart formatter removes redundancies and produces short tick labels. It does so by
- only displaying the leading component of the changing date (e.g., the month if the ticks are placed on the first of every (other) month),
- replacing the first month/day/hour etc. of a year/month/day etc. by the year/month/day (through the <Crossref target="tick-format.datetime-smart-first" /> element),
- and adding any missing information as an _offset_ to the end of the axis (through the <Crossref target="tick-format.datetime-smart-offset" /> element). 


### Period formats

For example, we can use a `set` rule to change how months are displayed from short names to long ones. 
```example
#show: lq.tick-format.set-datetime-smart-format(
  month: "[month repr:long]"
)
>>>#lq.diagram(
>>>  xscale: "datetime", 
>>>  height: 20pt, 
>>>  yaxis: none,
>>>  xlim: (
>>>    datetime(year: 2024, month: 12, day: 25),
>>>    datetime(year: 2025, month: 7, day: 7),
>>>  )
>>>)
```
The `datetime-smart-format` element has a field for each period: year, month, day, hour, minute, and second. All accept a [datetime format string](https://typst.app/docs/reference/foundations/datetime/#definitions-display) or a function with the signature `datetime => content`. 
```example
#show: lq.tick-format.set-datetime-smart-format(
  day: "[weekday repr:short]"
)
>>>#lq.diagram(
>>>  xscale: "datetime", 
>>>  height: 20pt, 
>>>  yaxis: none,
>>>  xaxis: (offset: none),
>>>  xlim: (
>>>    datetime(year: 2025, month: 1, day: 2),
>>>    datetime(year: 2025, month: 1, day: 6),
>>>  )
>>>)
```

### The first of a period

Note that in the last snippet "January" has been replaced by "2025". You can disable this behaviour by setting <Crossref target="tick-format.datetime-smart-format#smart-first" /> to `false`. 
```example
#show: lq.tick-format.set-datetime-smart-format(
  smart-first: false
)       
>>>
>>>#lq.diagram(
>>>  xscale: "datetime", 
>>>  height: 20pt, 
>>>  yaxis: none,
>>>  xlim: (
>>>    datetime(year: 2024, month: 12, day: 25),
>>>    datetime(year: 2025, month: 7, day: 7),
>>>  )
>>>)
```

What is displayed for the first of a period can be configured through the <Crossref target="tick-format.datetime-smart-first" /> element. Let us turn the smart-first back on and change what is displayed for the first month, i.e., January, to the last two digits of the year:
```example
#show: lq.tick-format.set-datetime-smart-first(
  month: "[year repr:last_two]",
)
>>>
>>>#lq.diagram(
>>>  xscale: "datetime", 
>>>  height: 20pt, 
>>>  yaxis: none,
>>>  xlim: (
>>>    datetime(year: 2024, month: 12, day: 25),
>>>    datetime(year: 2025, month: 7, day: 7),
>>>  )
>>>)
```

In some cases, it can be nice to show the month name below the first day of the month. This can also be achieved by making use of <Crossref target="tick-format.datetime-smart-first" />. 

```example
#show: lq.tick-format.set-datetime-smart-first(day: "[day]\n[month repr:short]")

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
The same can be done for `month: "[month repr:short]\n[year]"` etc. 


## Axis offset

In order to complete the datetime information on an axis, the _offset_ shows the missing components of a date or time. For example, if the axis only shows days, the offset tells the year and month. 

```example
#lq.diagram(
  xscale: "datetime", 
  height: 20pt, 
  yaxis: none,
  xlim: (
    datetime(year: 2025, month: 3, day: 14),
    datetime(year: 2025, month: 3, day: 19),
  )
)
```
The offset is configured through the element <Crossref target="tick-format.datetime-smart-offset" />. Let us change the case where the offset needs to display the date up to the month. 
```example
#show: lq.tick-format.set-datetime-smart-offset(
  month: "[year] [month repr:long]",
)
>>>#lq.diagram(
>>>  xscale: "datetime", 
>>>  height: 20pt, 
>>>  yaxis: none,
>>>  xlim: (
>>>    datetime(year: 2025, month: 3, day: 14),
>>>    datetime(year: 2025, month: 3, day: 19),
>>>  )
>>>)
```
Of course, it is always possible to override the offset entirely by setting <Crossref target="axis#offset" /> to some content value. 

## Internationalization/Localization

Unfortunately, the built-in display method of the `datetime` type does not support localization and can only display the month names in English. In order to overcome this problem, you can use a function like the following to format a month:
```typ
#let french-months = (
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
)
#show: lq.tick-format.set-datetime-smart-format(
  month: dt => french-months.at(dt.month() - 1),
)
```

