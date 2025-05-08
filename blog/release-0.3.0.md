---
title: "Release: Lilaq 0.3.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-05-09
---



The new version ships with a set of predefined [themes](/themes) that you can use to quickly change the style of your plots. 



Moreover, various improvements to important components of Lilaq have been made along with the addition of a large selection of scientific and colorblind-friendly color maps. 

Notably, we have added a new tutorial on [data loading](/docs/tutorials/data-loading) with Typst and Lilaq.


<!-- truncate -->


## Changelog

Additions 
- A set of [predefined themes](/themes) is now available!
- Added the qualitative color sequence `lq.color.map.okabe-ito` according to https://jfly.uni-koeln.de/color/.
- Added a range of sequential and diverging [color maps](/docs/reference/color) that are _scientific_, i.e., perceptually uniform, perceptually ordered, and color-vision deficiency (CVD) friendly, see . 
- An <Crossref target="axis#inverted" /> property to quickly swap min/max limits. 
- A tick locator for symlog axes.  


Breaking changes
- ⚠️ The parameter `line` of <Crossref target="hlines" />  and <Crossref target="vlines" />  has been renamed to `stroke` to bring the signature in line with the other plotting functions. 
- ⚠️ The <Crossref target="symlog#threshold" /> is now by default 1 (instead of 2). 



Improvements
- <Crossref target="diagram#legend" /> now accepts a full <Crossref target="legend" /> as argument which enables one to specify all entries manually. 
- <Crossref target="boxplot" /> now allows defining the statistical values manually instead of passing a data set. 
- Functions like <Crossref target="plot" /> can now have empty coordinate arrays. 


Fixed
- The `step` mode for <Crossref target="fill-between" /> works again. 
- The parameters <Crossref target="diagram#xlim" /> and <Crossref target="diagram#ylim" /> don't fold any more through array concatenation with `set` rules. 
- For plot functions like <Crossref target="colormesh" /> that ignore the cycle style, the cycle counter is now _not_ advanced. 
- Fixed an issue with the default tick locator when an integer tick distance was given. 


Documentation
- Added a tutorial on [data loading](https://lilaq.org/docs/tutorials/data-loading). 
- Mention the usage of `std.pad` together with <Crossref target="lq.place" />. 
- Mention the possibility of masking values with <Crossref target="colormesh" />.
