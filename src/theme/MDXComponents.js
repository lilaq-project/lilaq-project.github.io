import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import {Preview, Code, PreviewWrapper} from '@site/src/components/PreviewedCode';
import { Parameters, Param, ParamName, Signature, Default, SignatureName, SignatureParam, SourceLink } from '@site/src/components/Docs/FunctionDocumentation.js';
import { Crossref } from '@site/src/components/Docs/Crossref.js';
import { Typstref } from '@site/src/components/Docs/Typstref.js';
import { ExampleCards } from '@site/src/components/Docs/ExampleCards.js';
import { LilaqTheme } from '@site/src/components/LilaqTheme';

export default {
  ...MDXComponents,
  PreviewedCode,
  Preview,
  PreviewWrapper,
  Parameters,
  Param,
  ParamName,
  Signature,
  SignatureName,
  SignatureParam,
  SourceLink,
  Default,
  Crossref,
  Typstref,
  ExampleCards,
  LilaqTheme
};
