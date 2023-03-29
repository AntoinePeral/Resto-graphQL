import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {COOKING_STYLE} from '../../graphql/queries';
import ErrorBox from '../common/ErrorBox';
import Loader from '../common/Loader';
import InnerLink from '../common/InnerLink';

import classes from './CookingStyle.module.css';

const CookingStyle = () => {
    const {id} = useParams();

    const {loading, error, data} = useQuery(COOKING_STYLE, {
        variables: {id: +id},
        pollInterval: 5000
    });

    if (loading) return <Loader />;
    if (error) return <ErrorBox error={error} />;

    const style = data.getCookingStyle;
    const cities = new Set();
    style.restaurants.forEach(resto => cities.add(resto.city));

    return <article className={`item ${classes.style}`}>
        <h1>{style.label}</h1>
        <div>
            <h3>Restaurants :</h3>
            {style.restaurants && style.restaurants.map(resto => (
                <InnerLink key={`resto${resto.id}`} route={`/restaurants/${resto.id}`} text={resto.name} />
            ))}
            <h3>Villes :</h3>
            <div>
                {Array.from(cities).map(city => (
                    <InnerLink key={`city${city.id}`} route={`/cities/${city.id}`} text={city.name} />
                ))}
            </div>
        </div>
    </article>
}

export default CookingStyle;
