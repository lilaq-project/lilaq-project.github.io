import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PlotTypes from '@site/src/components/PlotTypes';
import Anatomy from '@site/src/components/Anatomy';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Description from './_description.mdx';

import useBaseUrl from '@docusaurus/useBaseUrl';

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
          <span className={styles.githubStars}>

            <iframe
              className={styles.indexCtasGitHubButton}
              src="https://ghbtns.com/github-btn.html?user=lilaq-project&amp;repo=lilaq&amp;type=star&amp;count=true&amp;size=large"
              width={130}
              height={30}
              title="GitHub Stars"
            />

          </span>
        </div>
      </div>
      <img src={useBaseUrl('/img/typst-generated/flower.svg')} alt="Lilaq flower plot" />
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
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
