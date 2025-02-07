import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './example-cards.module.css';
import ImagePlot from '@site/static/img/typst/plot-types/plot.svg'
import ImageScatter from '@site/static/img/typst/plot-types/scatter.svg'
import ImageFillbetween from '@site/static/img/typst/plot-types/fill-between.svg'
import ImageBar from '@site/static/img/typst/plot-types/bar.svg'
import ImageStem from '@site/static/img/typst/plot-types/stem.svg'
import ImageBoxplot from '@site/static/img/typst/plot-types/boxplot.svg'
import ImageColormesh from '@site/static/img/typst/plot-types/colormesh.svg'
import ImageContour from '@site/static/img/typst/plot-types/contour.svg'
import ImageQuiver from '@site/static/img/typst/plot-types/quiver.svg'

const PlotList = [
  {
    title: 'plot',
    href: "/docs/plot-types/plot",
    description: (
      <>
      </>
    ),
    Svg: ImagePlot,
  },
  {
    title: 'scatter',
    href: "/docs/plot-types/scatter",
    description: (
      <>
      </>
    ),
    Svg: ImageScatter,
  },
  {
    title: 'fill-between',
    description: (
      <>
      </>
    ),
    Svg: ImageFillbetween,
  },
  {
    title: 'bar',
    description: (
      <>
      </>
    ),
    Svg: ImageBar,
  },
  {
    title: 'stem',
    description: (
      <>
      </>
    ),
    Svg: ImageStem,
  },
  {
    title: 'boxplot',
    description: (
      <>
      </>
    ),
    Svg: ImageBoxplot,
  },
  {
    title: 'colormesh',
    description: (
      <>
      </>
    ),
    Svg: ImageColormesh,
  },
  {
    title: 'contour',
    description: (
      <>
      </>
    ),
    Svg: ImageContour,
  },
  {
    title: 'quiver',
    description: (
      <>
      </>
    ),
    Svg: ImageQuiver,
  },
];

function Feature({Svg, title, description, href}) {
  return (
    <a href={href} className={styles.plotTypeLink}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
