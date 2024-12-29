import styles from './docs.module.css';

export const Crossref = ({ target }) => {
    let display = target
    if (target.includes("#")) {
        const components = target.split("#")
        display = [(<span key="1">{components[0]}</span>), "#" + components[1]]
    }
    return (
        <code><a href={"/docs/reference/" + target} className={styles.crossRef}>
            {display}
        </a></code>
    )
};