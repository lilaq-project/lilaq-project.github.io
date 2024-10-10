
export const Crossref = ({ children, target }) => (
    <code><a href={"./" + target} className={"cross-ref"}>
        {children}
    </a></code>
);