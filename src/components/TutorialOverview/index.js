import clsx from 'clsx';
import styles from './tutorial_overview.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

function Label({ title, href }) {
  if (href == undefined) {
    href = "/docs/reference/" + title
  }
  return (
    <div className={clsx(styles.annotation, styles[title.replaceAll(".", "-")])}><a href={href}><code><span>lq.</span>{title}</code></a></div>
  );
}

export default function TutorialOverview() {
  return (
    <div className={styles.grid1}>
        <div>
            <i>Essential</i>
            <Link to="docs/tutorials/styling">Styling</Link>
            <Link to="docs/tutorials/cycles">Plot Cycles</Link>
            <Link to="docs/tutorials/plot-grids">Plot Grids</Link>
        </div>
        <div>
            <i>Configuration</i>
            <Link to="docs/tutorials/axis">Axis</Link>
            <Link to="docs/tutorials/ticks">Ticks</Link>
            <Link to="docs/tutorials/legend">Legend</Link>
        </div>
        <div>
            <i>Other</i>
            <Link to="docs/tutorials/datetime">Datetime support</Link>
            <Link to="docs/tutorials/data-loading">Data loading</Link>
        </div>
    </div>
  );
}
