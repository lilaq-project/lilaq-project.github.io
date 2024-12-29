import clsx from 'clsx';
import styles from './anatomy.module.css';
import Anatomy from '@site/src/pages/_home/anatomy.mdx';

function Label({ title }) {
  return (
    <div className={clsx(styles.annotation, styles[title.replace(".", "-")])}><a href={"/docs/reference/" + title}><code><span>lq.</span>{title}</code></a></div>
  );
}

export default function Annotations() {
  return (
    <div className={styles.anatomyWrapper}>
      <div className={styles.anatomy}>

        <Anatomy />
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
        <Label title="scatter" />
        <Label title="plot" />
      </div>
    </div>
  );
}
