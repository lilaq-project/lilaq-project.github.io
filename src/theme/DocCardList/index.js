import React from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
  findSidebarCategory,
  useDocsSidebar
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
function DocCardListForCurrentSidebarCategory({className}) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}
export default function DocCardList(props) {
  
  // const sidebar = useDocsSidebar();
  // console.log(sidebar)
  // if (sidebar) {
  //   let examplesCategory = findSidebarCategory(sidebar.items, x => x.label == "Examples")
  //   let items = examplesCategory.items
  //   console.log(items)
  // }
  const {items, className} = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row', className)}>
      {filteredItems.map((item, index) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
