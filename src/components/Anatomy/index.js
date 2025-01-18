import clsx from 'clsx';
import styles from './anatomy.module.css';
import Anatomy from '@site/src/pages/_graphics/anatomy.mdx';

function Label({ title, href }) {
  if (href == undefined) {
    href = "/docs/reference/" + title
  }
  return (
    <div className={clsx(styles.annotation, styles[title.replace(".", "-")])}><a href={href}><code><span>lq.</span>{title}</code></a></div>
  );
}

export default function Annotations() {
  return (
    <div className={styles.anatomyWrapper}>
      <div className={styles.anatomy}>

        <Anatomy />
        {/* <img src={require("@site/static/img/anatomy.png").default} /> */}
        <Label title="title" />
        <Label title="ylabel" href="/docs/reference/axis-label" />
        <Label title="xlabel" href="/docs/reference/axis-label" />
        <Label title="yaxis" href="/docs/reference/axis" />
        <Label title="xaxis" href="/docs/reference/axis" />
        <Label title="legend" />
        {/* <Label title="ticklabel" /> */}
        <Label title="tick" />
        <Label title="subtick" href="/docs/reference/tick" />
        <Label title="scatter" />
        <Label title="plot" />
      </div>
    </div>
  );
}
