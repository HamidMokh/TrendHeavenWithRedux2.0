import './form-iput.styles.scss'
const FormInput = ({label, ...otherProps})=> {
return(


<div className="group">
<input className="form-input" {...otherProps}/>
{// this is wrapped like that in order to check if the label exists in otherPropos or not, if it doesnn't 
//no need to check, if it does, the label code will be executed and the scss will be applied into the label.
   label && 
    <label
     className={`${
        otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
        >
            {label}
    </label>}

    

    </div>
)

};

export default FormInput;