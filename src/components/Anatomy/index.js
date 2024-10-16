import clsx from 'clsx';
import styles from './anatomy.module.css';

function Label({ title, href }) {
  return (
    <div className={clsx(styles.annotation, styles[title.replace(".", "-")])}><a href={href}><code><span>lc.</span>{title}</code></a></div>
  );
}

export default function HomepageFeatures() {
  return (
    <div className={styles.anatomyWrapper}>
      <div className={styles.anatomy}>
        <img src={require("@site/static/img/anatomy.png").default} />
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
