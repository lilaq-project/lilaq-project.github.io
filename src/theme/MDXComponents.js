import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import PreviewedCode from '@site/src/components/PreviewedCode.js';
import {Parameters, Param, Signature} from '@site/src/components/Docs/Parameters.js';
import {Crossref} from '@site/src/components/Docs/Crossref.js';

export default {
  ...MDXComponents,
  PreviewedCode,
  Parameters, 
  Param,
  Signature, 
  Crossref
};
