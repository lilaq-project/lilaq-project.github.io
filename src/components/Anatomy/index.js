import clsx from 'clsx';
import styles from './anatomy.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Label({ title, href }) {
  if (href == undefined) {
    href = "/docs/reference/" + title
  }
  return (
    <div className={clsx(styles.annotation, styles[title.replaceAll(".", "-")])}><a href={href}><code><span>lq.</span>{title}</code></a></div>
  );
}

export default function Annotations() {
  return (
    <div className={styles.anatomyWrapper}>
      <div className={styles.anatomy}>

        {/* <Anatomy /> */}

        <img src={useBaseUrl('/img/typst-generated/anatomy.svg')} alt="bsg" />

        <Label title="title" />
        <Label title="ylabel" href="/docs/reference/label" />
        <Label title="xlabel" href="/docs/reference/label" />
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
