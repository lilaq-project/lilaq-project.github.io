export const Parameters = ({ children }) => (
	<div style={{ padding: "0 2em" }}>
		{children}
	</div>
);

export const Param = ({ children }) => (
	<div style={{ padding: "0 0 0 1em" }}>
		{children}
	</div>
);

export const Signature = ({ children }) => (
	<div className="docs-signature">
		{children}
	</div>
);
