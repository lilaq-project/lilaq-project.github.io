import React from 'react';
import TOCItems from '@theme-original/TOCItems';

export default function TOCItemsWrapper(props) {
  for (let tocItem of props.toc) {
    if (tocItem.value.includes("<code>")){
      tocItem.value = tocItem.id
    }
  }
  return (
    <>
      <TOCItems {...props} />
    </>
  );
}
