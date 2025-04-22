import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import PreviewedCode from '@site/src/components/PreviewedCode';
import { Parameters, Param, ParamName, Signature, Default, SignatureName, SignatureParam, SourceLink } from '@site/src/components/Docs/FunctionDocumentation.js';
import { Crossref } from '@site/src/components/Docs/Crossref.js';
import { ExampleCards } from '@site/src/components/Docs/ExampleCards.js';
import { LilaqTheme } from '@site/src/components/LilaqTheme';

export default {
  ...MDXComponents,
  PreviewedCode,
  Parameters,
  Param,
  ParamName,
  Signature,
  SignatureName,
  SignatureParam,
  SourceLink,
  Default,
  Crossref,
  ExampleCards,
  LilaqTheme
};
