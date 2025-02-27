to-do

# Documentation
- add license
- document quiver
- document mark
- document return values?


# Plotting
- path -> curve
- add tip and toe to path
- use pixmaps for mesh
- add labels to bar

# API
- vmin/vmax -> min/max
- unsupport legend dictionary?
- make `pos`/`position` consistent

# Elements
- factor out axis.exponent, axis.offset ? nah maybe no 
- work on axis mirror: probably we also want mirroring of the spine but not the ticks
- add something like a safe zone around the axis tips. 

# Chores
- CHECK that match-type still keeps working (maybe str(type))



✅ pattern -> tiling
✅ fix cross refs like mesh
✅ In docs files that document more than one function, the links to parameters are ambiguous.  
✅ lq.mesh only output last component
✅ hbar
✅ add tips/toes to lq.line
✅ replace boolean->bool
✅ document math 
✅ make functions like _axis-compute-limits "private" and ignore them in parse-docs 
✅ remove old-number and fix exponent/offset 
✅ rename plot-types 
✅ add full-stop after first sentence in docs of fill-between 
✅ for single-function reference files add the first sentence of the description to the mdx description 