import React from 'react';
import clsx from 'clsx';
import {
    useDocById,
    findSidebarCategory,
    useDocsSidebar
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';

export const ExampleCards2 = ({ props, tags }) => {
    // let x = require("@site/static/img/scatter-plot.png")
    // return (
    //     <img src={(x).default} height="100"></img>
    // );
    const sidebar = useDocsSidebar();
    if (!sidebar) {
        return (
            <span></span>
        );
    }
    let examplesCategory = findSidebarCategory(sidebar.items, x => x.label == "Examples")
    let items = examplesCategory.items
    if (tags) {
        items = items.filter(item => {
            let doc_tags = item.customProps?.tags
            if (doc_tags == undefined) return false;
            return tags.some(tag => doc_tags.includes(tag))
        })
    }

    if (!items) {
        return (
            <div></div>
        );
    }
    return (<div>
        <section className={clsx('row')}>
            {items.map((item, index) => (
                <article key={index} className="col col--6 margin-bottom--lg">
                    <DocCard item={item} />
                </article>
            ))}
        </section></div>
    );
}

export const ExampleCards = ({ children }) => {
    return (
        <section className={clsx('row')}>
            {children}
        </section>
    );
}
