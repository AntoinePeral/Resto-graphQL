import classes from './RestaurantItem.module.css';
import InnerLink from '../common/InnerLink';

const RestaurantItem = ({resto}) => {
    return <article className={`item ${classes.resto}`}>
        <div className={classes.restoInfos}>
            <InnerLink route={`/restaurants/${resto.id}`}><h1>{resto.name}</h1></InnerLink>
        </div>
        <div>
            <h2>Ville :</h2>
            <InnerLink route={`/cities/${resto.city.id}`} text={resto.city.name} />
            <h2>Styles de cuisine :</h2>
            <div>
                {resto.cookingStyles.map(style => (
                    <InnerLink key={`style${style.id}`} route={`/cookingStyles/${style.id}`} text={style.label} />
                ))}
            </div>
        </div>
    </article>
}

export default RestaurantItem;
