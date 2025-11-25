import styles from './docs.module.css';

// Cross-reference to a definition in the Lilaq framework
export const Crossref = ({ target }) => {
    let display = target
    if (target.includes("#")) {
        const components = target.split("#")
        display = [(<span key="1">{components[0]}</span>), "." + components[1]]
    }
    if (target.startsWith("lq.")) {
        target = target.substring(3)
    }
    return (
        <code><a href={"/docs/reference/" + target} className={styles.crossRef}>
            {display}
        </a></code>
    )
};