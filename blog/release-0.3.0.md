---
title: "Release: Lilaq 0.3.0"
authors: [Mc-Zen]
tags: [release]
date: 2025-05-09
---

This release brings various improvements to important components of Lilaq along with new scientific and colorblind-friendly color maps. 

<!-- truncate -->

Notably, we've added a new tutorial on [data loading](https://lilaq.org/docs/tutorials/data-loading) with Typst and Lilaq.


## Changelog

Additions 
- A set of [predefined themes](https://lilaq.org/themes) is now available!
- Added the qualitative color sequence `lq.color.map.okabe-ito` according to https://jfly.uni-koeln.de/color/.
- Added a range of sequential and diverging color maps that are _scientific_, i.e., perceptually uniform, perceptually ordered, and color-vision deficiency (CVD) friendly, see https://lilaq.org/docs/reference/color. 
- An `axis.inverted` property to quickly swap min/max limits. 
- A tick locator for symlog axes.  


Breaking changes
- ⚠️ The parameter `line` of `hlines` and `vlines` has been renamed to `stroke` to bring the signature in line with the other plotting functions. 
- ⚠️ The `symlog.threshold` is now by default 1 (instead of 2). 



Improvements
- `diagram.legend` now accepts a full `legend` as argument which enables one to specify all entries manually. 
- `boxplot` now allows defining the statistical values manually instead of passing a data set. 
- Functions like `plot` can now have empty coordinate arrays. 


Fixed
- The `step` mode for `fill-between` works again. 
- The parameters `diagram.xlim` and `diagram.ylim` don't fold any more through array concatenation with `set` rules. 
- For plot functions like `colormesh` that ignore the cycle style, the cycle counter is now _not_ advanced. 
- Fixed an issue with the default tick locator when an integer tick distance was given. 


Documentation
- Added a tutorial on [data loading](https://lilaq.org/docs/tutorials/data-loading). 
- Mention the usage of `std.pad` together with `lq.place`. 
- Mention the possibility of masking values with `colormesh`.
