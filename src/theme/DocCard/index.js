import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}
function CardContainer({href, children}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer)}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", columnGap: "1em"}}>
          {children}
        </div>
    </Link>
  );
}
function CardLayout({href, icon, title, description, image}) {
  const heading = (
    <Heading
      as="h3"
      className={clsx('text--truncate', styles.cardTitle)}
      title={title}>
      {title}
    </Heading>
  )
  const desc = description && (
    <p
      className={clsx('text--truncate', styles.cardDescription)}
      title={description}>
      {description}
    </p>
  )
  return (
    <CardContainer href={href}>
      <div style={{minWidth: "0"}}>
        {heading}
        {desc}
      </div>
    </CardContainer>
  );
}
function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}
function CardLink({item}) {
  const icon = isInternalUrl(item.href) ? '📄️' : '🔗';
  const doc = useDocById(item.docId ?? undefined);
  let image_file = item.customProps?.image
  // let image = undefined
  // if (image_file) {
  //   image_file = "" + image_file
  //   // image = <img src="/assets/images/plotimage-19a6a5edcbca9aa080bd639a3801e641.svg" height="100" width="100"></img>
  //   // image = <img src={require("@site/static/img/scatter-plot.png").default} height="100"></img>
  //   image = <img src={image_file} height="100"></img>
  //   // image = <img src={require('@site/typst_renders/plot-example.svg').default} height="100"></img>
  // }
  let image = item.image
  if (image) {
    image = <img src={item.image.default} height="100"></img>
  }
  return (
    <CardLayout
      href={item.href}
      // icon={icon}
      title={item.label}
      image={image}
      description={item.description ?? doc?.description}
    />
  );
}
export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
