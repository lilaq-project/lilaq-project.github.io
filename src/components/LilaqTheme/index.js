import styles from './styles.module.css';
import { Signature, SignatureName, SourceLink } from '../Docs/FunctionDocumentation';

export const LilaqTheme = ({ children, name }) => {
	let name_tag
	if (name != undefined) {
		const href = "https://github.com/lilaq-project/lilaq/tree/main/src/theme/" + name + ".typ"
		name_tag = (
		<div>
			<Signature>
				<code>
					lq.theme.<SignatureName>{name}</SignatureName>
					<SourceLink href={href} />
				</code>
			</Signature>
		</div>)
	}
	return (
		<div className={styles.lilaqTheme}>
			{name_tag}
			{children}
		</div>
	)
};