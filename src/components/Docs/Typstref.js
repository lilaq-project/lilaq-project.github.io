import styles from './docs.module.css';

// Reference to a built-in definition of Typst
export const Typstref = ({ children, target }) => {

    console.log(target)
    // const display = target.split("/").slice(-1)
    return (
        <a href={target} className={styles.typstRef} target="_blank">
            {children}
        </a>
    )
};