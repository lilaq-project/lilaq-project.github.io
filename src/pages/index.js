import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PlotTypes from '@site/src/components/PlotTypes';
import Anatomy from '@site/src/components/Anatomy';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Description from './_home/description.mdx';
import Showoff from './_home/showoff.mdx';
import Showoff1 from './_home/showoff1.mdx';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
      <div style={{zoom: 1.2}}>
        <Showoff1 />
        {/* <img src={require('@site/static/img/scatter-plot.png').default} /> */}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        
        <Description />

        <h2>Plot types</h2>
        <PlotTypes />
        
        <h2>Anatomy of a diagram</h2>
        <Anatomy />
      </main>
    </Layout>
  );
}
