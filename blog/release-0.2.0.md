---
title: "Release: Lilaq 0.2.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-04-02
---

With this release, important improvements are made to the defaults, prominently including a new default color cycle.  
<!-- truncate -->

:::info

Feedback on the default settings are welcome! Defaults are important because they are often left unchanged − currently, Lilaq is in a stage where they can still be tuned. Later, such breaking changes will be mostly impossible. 

You can open a [Discussion](https://github.com/orgs/lilaq-project/discussions) on GitHub and share your thoughts. 

:::

Instead of a somewhat arbitrary color cycle, Lilaq now uses a thoroughly researched, highly optimized color sequence that is friendly to people with color deficiencies. This map is a result of the work of M. A. Petroff (https://arxiv.org/abs/2107.02270). 
On top, Lilaq ships a small set of color sequences, available under `lq.color.map`. 

Moreover, the default axis thickness and tick length have been reduced, resulting in a better harmony with text surrounding a diagram figure. 

The mark shapes of Lilaq are carefully designed to match in optical size, so they look good together in one plot without further adaptation. This release makes some fine adjustments to the mark sizes. Furthermore, some marks have been added and a few ones renamed (see below). 

The most important fixes in this release concern a bug that made it impossible to replace the default style cycle and an issue when first-line-indent was applied to all paragraphs. 




## Changelog
