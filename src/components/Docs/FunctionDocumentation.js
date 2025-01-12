import styles from './docs.module.css';

export const Signature = ({ children }) => (
	<div className={styles.signature}>
		{children}
	</div>
);

export const SignatureName = ({ children }) => (
	<span className={styles.signatureName}>
		{children}
	</span>
);

export const Parameters = ({ children }) => (
	<div>
		<div className={styles.parametersHeader}>
			Parameters
		</div>
		<div className={styles.parameters}>
			{children}
		</div>
	</div>
);

export const Param = ({ children }) => (
	<div className={styles.param}>
		{children}
	</div>
);

export const Default = ({ children }) => (
	<span className={styles.default}>
		&nbsp;&nbsp;&nbsp;<i>default:</i> {children}
	</span>
);
