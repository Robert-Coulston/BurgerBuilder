import React from 'react';
import classes from './BuildControl.module.css'

const BuildControl = (props) => {
    console.log(props.label);
    
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button disabled={props.isDisabled} className={classes.Less} onClick={(t) => props.subtracted(t)}>Less</button>
            <button className={classes.More} onClick={(t) => props.added(t)}>More</button>
        </div>
    )
}

export default BuildControl
