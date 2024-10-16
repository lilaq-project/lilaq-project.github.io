import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import ImagePlot from '@site/static/img/plot.svg'
import ImageErrorbars from '@site/static/img/errorbars.svg'
import ImageStep from '@site/static/img/step.svg'
import ImageScatter from '@site/static/img/scatter.svg'
import ImageFillbetween from '@site/static/img/fill-between.svg'
import ImageBar from '@site/static/img/bar.svg'
import ImageStem from '@site/static/img/stem.svg'
import ImageBoxplot from '@site/static/img/boxplot.svg'
import ImageColormesh from '@site/static/img/colormesh.svg'
import ImageContour from '@site/static/img/contour.svg'
import ImageFilledContour from '@site/static/img/filled-contour.svg'
import ImageQuiver from '@site/static/img/quiver.svg'

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
    title: 'errorbars',
    description: (
      <>
      </>
    ),
    Svg: ImageErrorbars,
  },
  {
    title: 'step',
    description: (
      <>
      </>
    ),
    Svg: ImageStep,
  },
  {
    title: 'scatter',
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
    title: 'filled-contour',
    description: (
      <>
      </>
    ),
    Svg: ImageFilledContour,
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
