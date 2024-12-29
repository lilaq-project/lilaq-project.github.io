import clsx from 'clsx';
import styles from './anatomy.module.css';
import Anatomy1 from '@site/src/pages/_home/anatomy.mdx';
// import Anatomy1 from '@site/src/components/Anatomy/anatomy.mdx';
// import Anatomy1 from './anatomy.mdx';

function Label({ title, href }) {
  return (
    <div className={clsx(styles.annotation, styles[title.replace(".", "-")])}><a href={href}><code><span>lq.</span>{title}</code></a></div>
  );
}

export default function Annotations() {
  return (
    <div className={styles.anatomyWrapper}>
      <div className={styles.anatomy}>

        <Anatomy1 />
        {/* <img src={require("@site/static/img/anatomy.png").default} /> */}
        <Label title="title" />
        <Label title="ylabel" />
        <Label title="xlabel" />
        <Label title="yaxis" />
        <Label title="xaxis" />
        <Label title="legend" />
        <Label title="ticklabel" />
        <Label title="tick.major" />
        <Label title="tick.minor" />
        <Label title="scatter" href="/docs/plot-types/scatter" />
        <Label title="plot" href="/docs/plot-types/plot" />
      </div>
    </div>
  );
}
