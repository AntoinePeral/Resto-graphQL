import {forwardRef} from 'react';
import Button from './Button';

const Form = forwardRef(({fields, action, formError, mutError, setAdd}, ref) => {

    const resetHandler = () => {
        ref.current.reset();
        setAdd(false);
    }

    return (<form ref={ref} onSubmit={action}>
        {Object.keys(fields).map(key => (
            <div key={key} className="formElement">
                <label htmlFor={key}>{fields[key].label} :</label>
                {
                fields[key].tag && fields[key].tag === 'select' ?
                <select id={key} defaultValue={fields[key].value ?? ''}>
                    <option value="">Choisir...</option>
                    {fields[key].options.map(option => <option key={option.text} value={option.id}>{option.text}</option>)}
                </select>
                :
                fields[key].step ?
                <input type={fields[key].type} step={fields[key].step } id={key} defaultValue={fields[key].value ?? ''} />
                :
                fields[key].checked ?
                <input type={fields[key].type} id={key} defaultChecked={fields[key].checked} />
                :
                <input type={fields[key].type} id={key} defaultValue={fields[key].value ?? ''} />
                }
            </div>
        ))}
        {(formError || mutError) && <div className="formError">{formError || mutError.message}</div>}
        <div className="buttons">
            <Button text="Annuler" action={resetHandler}/>
            <Button text="Valider" />
        </div>
    </form>)
});

export default Form;
