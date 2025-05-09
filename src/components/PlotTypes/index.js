import clsx from 'clsx';
import styles from './plot-types.module.css';
import ImagePlot from '@site/static/img/typst-generated/plot-types/plot.svg'
import ImageScatter from '@site/static/img/typst-generated/plot-types/scatter.svg'
import ImageFillbetween from '@site/static/img/typst-generated/plot-types/fill-between.svg'
import ImageBar from '@site/static/img/typst-generated/plot-types/bar.svg'
import ImageHBar from '@site/static/img/typst-generated/plot-types/hbar.svg'
import ImageStem from '@site/static/img/typst-generated/plot-types/stem.svg'
import ImageHStem from '@site/static/img/typst-generated/plot-types/hstem.svg'
import ImageBoxplot from '@site/static/img/typst-generated/plot-types/boxplot.svg'
import ImageHBoxplot from '@site/static/img/typst-generated/plot-types/hboxplot.svg'
import ImageColormesh from '@site/static/img/typst-generated/plot-types/colormesh.svg'
import ImageContour from '@site/static/img/typst-generated/plot-types/contour.svg'
import ImageQuiver from '@site/static/img/typst-generated/plot-types/quiver.svg'

const PlotList = [
  {
    title: 'plot',
    description: (
      <>
      </>
    ),
    Svg: ImagePlot,
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
    title: 'hbar',
    description: (
      <>
      </>
    ),
    Svg: ImageHBar,
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
    title: 'hstem',
    description: (
      <>
      </>
    ),
    Svg: ImageHStem,
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
    title: 'hboxplot',
    description: (
      <>
      </>
    ),
    Svg: ImageHBoxplot,
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
