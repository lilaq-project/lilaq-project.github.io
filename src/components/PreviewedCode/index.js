import React from "react";

import classes from "./PreviewedCode.module.css";


export function Code({ children }) {
    return (<div className={classes.code}>
        {children}
    </div>);
}

export function Preview({ children }) {
    return (<div className={classes.preview}>
        {children}
    </div>);
}


export function PreviewWrapper({ children }) {
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
}
