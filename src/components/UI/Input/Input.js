import React from 'react';

import classes from './Input.module.css';


const input = ( props ) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }


    switch ( props.elementType ){
        case ( 'input' ):
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value} 
            onChange={props.changed} />
            break;
        case ( 'textarea' ):
            inputElement = <textarea 
            className={inputClasses.join(' ')} 
            {...props} 
            value={props.value} 
            onChange={props.changed} />;
            break;
        case ( 'select' ):
            console.log("In the select tab");
            inputElement = <select
                // className={inputClasses.join(' ')}
                className={classes.Select}
                value={props.value}
                onChange={props.changed} >
                {props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value} >
                            {opt.displayValue}
                        </option>
                    ))}
                    
                </select>;
            break;
        default:
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props} 
            value={props.value} 
            onChange={props.changed} />;
    }
    if(props.elementConfig.type && props.elementConfig.type === "number"){
        inputElement = <div style={{width: '100%', display:'flex'}}>
        <div className={classes.inputGroupPrepend}><span className={classes.InputNumberStyleSpan}>KM</span></div>
        <input 
            className={classes.InputNumberStyleInput} 
            {...props.elementConfig} 
            value={props.value} 
        onChange={props.changed} />
        </div>;
    }
    return (
        <div className={classes.InputBackground}>
            <div className={classes.Input} >
    <label className={classes.Label} >{props.label} <span className={classes.required}>*</span></label>
                {inputElement}
            </div>
        </div>
    );
};

export default input;