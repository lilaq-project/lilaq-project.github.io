import React from "react";
import clsx from "clsx";

import classes from "./PreviewedCode.module.css";

export default function PreviewedCode({ children }) {
    if (children.length == 2) {
        return (
            <div className={clsx(classes.wrapper)}>
                {children[0]}
                <div className={clsx(classes.preview)}>
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
