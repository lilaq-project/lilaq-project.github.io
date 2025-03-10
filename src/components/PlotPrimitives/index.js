import clsx from 'clsx';
import styles from '../PlotTypes/plot-types.module.css';
import ImageLine from '@site/static/img/typst-generated/plot-types/line.svg'
import ImageRect from '@site/static/img/typst-generated/plot-types/rect.svg'
import ImageEllipse from '@site/static/img/typst-generated/plot-types/ellipse.svg'
import ImagePath from '@site/static/img/typst-generated/plot-types/path.svg'
import ImagePlace from '@site/static/img/typst-generated/plot-types/place.svg'

const PlotList = [
  {
    title: 'line',
    href: "/docs/plot-types/line",
    description: (
      <>
      </>
    ),
    Svg: ImageLine,
  },
  {
    title: 'rect',
    href: "/docs/plot-types/rect",
    description: (
      <>
      </>
    ),
    Svg: ImageRect,
  },
  {
    title: 'ellipse',
    href: "/docs/plot-types/ellipse",
    description: (
      <>
      </>
    ),
    Svg: ImageEllipse,
  },
  {
    title: 'path',
    description: (
      <>
      </>
    ),
    Svg: ImagePath,
  },
  {
    title: 'place',
    description: (
      <>
      </>
    ),
    Svg: ImagePlace,
  }
];

function Feature({Svg, title, description, href}) {
  return (
    <a href={"/docs/reference/" + title} className={styles.plotTypeLink}>
      <div className="text--center">
        <Svg className={styles.plotTypeImage} role="img" />
      </div>
      <div className="text--center">
        <code>{title}</code>
        {/* <p>{description}</p> */}
      </div>
    </a>
  );
}

export default function HomepageFeatures() {
  return (
    <section>
      <div className="container">
        <div className={styles.container}>
          {PlotList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
