import classes from './CookingStyleItem.module.css';
import InnerLink from '../common/InnerLink';

const CookingStyleItem = ({style}) => {

    return <article className={`item ${classes.style}`}>
        <InnerLink route={`/cookingStyles/${style.id}`}><h1>{style.label}</h1></InnerLink>
    </article>
}

export default CookingStyleItem;
