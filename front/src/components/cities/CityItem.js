import classes from './CityItem.module.css';
import InnerLink from '../common/InnerLink';

const CityItem = ({city}) => {

    const cookingStyles = new Set();
    city.restaurants.forEach(resto => resto.cookingStyles.forEach(style => cookingStyles.add(style)));


    return <article className={`item ${classes.city}`}>
        <div className={classes.cityInfos}>
            <InnerLink route={`/cities/${city.id}`}><h1>{city.name}</h1></InnerLink>
        </div>
        <div>
            <h2>Restaurants :</h2>
            {city.restaurants.map(resto => (
                <InnerLink key={`resto${resto.id}`} route={`/restaurants/${resto.id}`} text={resto.name} />
            ))}
            <h2>Styles de cuisine :</h2>
            <div>
                {Array.from(cookingStyles).map(style => (
                    <InnerLink key={`style${style.id}`} route={`/cookingStyles/${style.id}`} text={style.label} />
                ))}
            </div>
        </div>
    </article>
}

export default CityItem;
