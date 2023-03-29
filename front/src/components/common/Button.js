import classes from './Button.module.css'

const Button = ({text, action}) => {

    const pressedHandler = event => {
        event.target.style.transform = 'scale(0.8)';
    }

    const releasedHandler = event => {
        event.target.style.transform = 'scale(1)';
        if (action) {
            action(event);
        }
    }

    return <button className={classes.button} onMouseDown={pressedHandler} onMouseUp={releasedHandler}>{text}</button>
}

export default Button;
