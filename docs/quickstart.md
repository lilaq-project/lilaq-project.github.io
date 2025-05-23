---
title: Quick-start guide
sidebar_position: 2
---

In this guide you will learn how to use Lilaq for creating basic diagrams and plots. 

**Reading this guide may save you a lot of scrolling! That's why it's kept _really short_ ;)**
On top, this guide links you to all necessary resources you need to understand Lilaq. 


## Getting started

We will start by importing Lilaq under the canonical abbreviation `lq`.
```typ
#import lilaq
```
Since Lilaq has a rather flat namespace with many definitions, it is highly recommended *not* to import everything `*` into the global scope. 




## The first plot

In order to create our first visualization, we use [`diagram`](./reference/diagram). A diagram can take an arbitrary number of plot objects that are generated by the various [plot functions](./plot-types). For this example, we use [`plot`](./reference/plot) to make a 2D line plot from arrays of $x$ and $y$ values. 

```typ example
#lq.diagram(
  lq.plot((0, 1, 2, 3, 4), (5, 4, 2, 1, 2))
)
```
Pretty easy. Let's add another plot, a title, and axis labels!
```typ example
#let xs = (0, 1, 2, 3, 4)

#lq.diagram(
  title: [Precious data],
  xlabel: $x$, 
  ylabel: $y$,

  lq.plot(xs, (5, 4, 2, 1, 2), mark: "s", label: [A]),
  lq.plot(xs, (2, 5, 4, 2, 3), mark: "o", label: [B])
)
```
Note that a legend automatically appears when the plots are labeled. Only labeled plots are listed. You can find out more in the [**legend tutorial**](./tutorials/legend) on how to configure and customize legends. 

Also check out the [**data loading tutorial**](./tutorials/data-loading) for best practices on loading data from files. 




## Style cycles

You may have noticed that in the previous example, our two plots had different colors − without explicitly specifying so! The default plot styles are defined in so-called _cycles_ that reduce redundancy and enhance consistency between diagrams. The [**cycle tutorial**](tutorials/cycles) explains how to use and create such style cycles. 

:::info
Note that you can always override the cycle style by passing explicit arguments to the plot functions. Here for example we could write `lq.plot(.., color: green)` to force a different plot color. 
:::




## Diagram axes

Although usually on the side, the axes carry part of the most important information that a diagram bears − from ticks over axis labels to scales. The [**axis tutorial**](tutorials/axis) and [**ticks tutorial**](tutorials/ticks) guide you through a series of steps to set up and adapt the diagram axes to your needs.  




## Anatomy of a diagram

A diagram consists of plots, axes, ticks, labels, legends and more. Click on any annotation to find out more about parameters, usage, and customization. 

import Anatomy from '@site/src/components/Anatomy';

<Anatomy />




## Tutorials

Please refer to the following resources for further guidance. In particular, the tutorial [**styling and themes**](tutorials/styling-and-themes) may save you a lot of time. 

import useCurrentSidebarCategory from '@docusaurus/theme-common';
import DocCardList from '@theme/DocCardList';
import { findSidebarCategory, useDocsSidebar } from '@docusaurus/plugin-content-docs/client';

<DocCardList items={findSidebarCategory(useDocsSidebar().items, x => x.label == "Tutorials").items} />
 