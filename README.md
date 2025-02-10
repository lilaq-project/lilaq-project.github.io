# Lilaq

This repository hosts the documentation of [Lilaq](https://github.com/lilaq-project/lilaq). 

## Dependencies

- Node.js
- Python >= 3.8
- Typst >= 0.12


### Local Development

You can run a local test version by cloning this repository recursively (!)
```
$ git clone https://github.com/lilaq-project/lilaq.github.io --recursive
```
and executing the following commands. 

```
$ npm run compile-typst-images
$ npm run parse-docs
$ npm run start
```