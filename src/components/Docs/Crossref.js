
export const Crossref = ({ target }) => {
    let display = target
    if (target.includes("#")) {
        const components = target.split("#")
        display = [(<span key="1">{components[0]}</span>), "#" + components[1]]
    }
    return (
        <code><a href={"./" + target} className={"cross-ref"}>
            {display}
        </a></code>
)};