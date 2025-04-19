import styles from './styles.module.css';

export const LilaqTheme = ({ children }) => {
	return (
		<div className={styles.lilaqTheme}>
			{children}
		</div>
	)
};