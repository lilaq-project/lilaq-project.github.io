
export const Crossref = ({ children, target }) => (
    <code><a href={"./" + target}>
        {children}
    </a></code>
);