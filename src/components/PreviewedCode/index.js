import React from "react";

import classes from "./PreviewedCode.module.css";

export default function PreviewedCode({ children }) {
    if (children.length == 2) {

        let reversed_order = children[1].type.name == "MDXPre"

        let cls = [classes.code, classes.preview]
        if (reversed_order) {
            cls.reverse()
        }

        return (
            <div className={classes.wrapper}>
                <div className={cls[0]}>
                    {children[0]}
                </div>
                <div className={cls[1]}>
                    {children[1]}
                </div>
            </div>
        );
    }
    return (
        <div className={clsx(classes.wrapper)}>
            {children}
        </div>
    );
}
