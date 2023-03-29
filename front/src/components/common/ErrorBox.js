import classes from './ErrorBox.module.css';

const Error = ({error}) => {
    console.log(JSON.stringify(error));
    return (
    <div className={classes.error}>
        <h1>Une erreur est survenue</h1>
        <div>{error.message}</div>
    </div>
    )
};

export default Error;
