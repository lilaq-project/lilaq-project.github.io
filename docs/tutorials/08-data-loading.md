---
title: Data loading
description: Best practices for loading data from external files. 
---

import CodeBlock from '@theme/CodeBlock';


This tutorial will teach you a few tips and tricks for loading data files for plotting. 


## Which format should I use?

If you have control on the file format that your data is stored in, we recommend using JSON for the following reasons:
- JSON has good support with Typst, through the built-in function [`json`](https://typst.app/docs/reference/data-loading/json/). Also it is a universal and human-readable format. 
- JSON data is typed, i.e., there are strings, ints, floats, arrays, and objects (dictionaries) and the Typst function `json` automatically converts these types to Typst types (unlike with CSV). 
- Along with data arrays, you can also store single variables or other pieces of data that you might need in the document. This is difficult with CSV. 

Of course, there might be special reasons to use some other file format. And oftentimes, you will just have to plot the contents of a file that you have been given by someone else. The function <Crossref target="lq.load-txt" /> for example can be used to read CSV-like files and addresses some limitations of the built-in Typst function `csv`. 


## Simple data set


Let's start with a data set of subjects with several attributes, stored in a JSON file. 



import SubjectsJSON from '!!raw-loader!./data/subjects.json';

<CodeBlock language="json" title="subjects.json">{SubjectsJSON}</CodeBlock>


In this example, we want to make a scatter plot with age and height on the $x$ and $y$ axes and attributes a and b encoded in marker size and color, respectively. 

The built-in Typst function `json` loads the data and returns a dictionary with the given keys. Unlike with `csv`, the JSON values are typed and automatically converted to `int` or `float`, as needed. 

Now we use destructuring syntax to access the four wanted attributes (note that the order in `let (age, height, a, b)` does not matter for dictionary destructuring). We simply discard the third property c because we don't need it. 

```example
>>> #let json = p => json("docs/tutorials/data/" + p)
#let (age, height, a, b) = json("subjects.json")

#lq.diagram(
  xlabel: [age (years)],
  ylabel: [height (cm)],
  lq.scatter(age, height, size: a, color: b)
)
```

## Multiple data sets

Let us look at a more complicated example with two data sets in one file, each one providing (fictional) time-dependent information about the wind strength in a specific city. In addition, the height above sea level (which we want to display in the title) is stored per city in the JSON file. 


import WindJSON from '!!raw-loader!./data/wind.json';

<CodeBlock language="json" title="wind.json">{WindJSON}</CodeBlock>


Iterating over the entries in the data set, we now generate a diagram for each city. 

```example
>>> #let json = p => json("docs/tutorials/data/" + p)
#let data = json("wind.json")

#for (city, details) in data {

  let (hour, wind, gusts) = details 
  
  lq.diagram(
    title: [#city -- #(details.height)m above sea level],

    xlabel: [hour],
    ylabel: [velocity (m/s)],

    lq.plot(hour, wind, label: [wind]),
    lq.plot(hour, gusts, label: [gusts]),
  )

  h(4mm)
}
```
As you can see, with JSON files we can conveniently store and load data with a rich structure, naturally accessing the respective fields. 