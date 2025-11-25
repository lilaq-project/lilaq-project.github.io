import styles from './docs.module.css';

// Reference to a built-in definition of Typst
export const Typstref = ({ target }) => {

    console.log(target)
    const display = target.split("/").slice(-1)
    return (
        <code><a href={target} className={styles.typstRef} target="_blank">
            {display}
        </a></code>
    )
};