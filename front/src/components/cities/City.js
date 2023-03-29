import {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {CITY, CITIES_SELECT, MANAGERS_SELECT, CREATE_RESTAURANT} from '../../graphql/queries';
import ErrorBox from '../common/ErrorBox';
import Loader from '../common/Loader';
import InnerLink from '../common/InnerLink';
import Button from '../common/Button';
import Form from '../common/Form';
import classes from './City.module.css';

const City = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [add, setAdd] = useState(false);
    const [formError, setFormError] = useState(null);

    const formRef = useRef();

    const {data: cities} = useQuery(CITIES_SELECT);
    const {data: managers} = useQuery(MANAGERS_SELECT);

    const {loading, error, data} = useQuery(CITY, {
        variables: {id: +id},
        pollInterval: 5000
    });

    const [createRestaurant, { data: mutData, loading: mutLoading, error: mutError }] = useMutation(CREATE_RESTAURANT);

    useEffect(() => {
        if(mutData) {
            navigate(`/restaurants/${mutData.createRestaurant.id}`, {replace: true});
        }
    });

    const submitHandler = event => {
        event.preventDefault();
        const [name, description, telephone, terrace, manager_id, city_id] = event.target;
        if (!name.value) {
            return setFormError('Veuillez indiquer le nom du restaurant')
        }
        if (!description.value) {
            return setFormError('Veuillez indiquer une description')
        }
        if (!telephone.value) {
            return setFormError('Veuillez indiquer le numéro de téléphone')
        }
        if (!manager_id.value) {
            return setFormError('Veuillez indiquer le manager')
        }
        if (!city_id.value) {
            return setFormError('Veuillez indiquer la ville')
        }

        createRestaurant({
            variables: {
                input: {
                    name: name.value,
                    description: description.value,
                    telephone: telephone.value,
                    terrace: terrace.checked,
                    manager_id: +manager_id.value,
                    city_id: +city_id.value
                }
            }
        });
        window.history.mustRefetch = true;
    };


    if (loading) return <Loader />;
    if (error) return <ErrorBox error={error} />;

    const city = data.getCity;
    const cookingStyles = new Set();
    city.restaurants.forEach(resto => resto.cookingStyles.forEach(style => cookingStyles.add(style)));

    return (<>
    <article className={`item ${classes.city}`}>
        <h1>{city.name}</h1>
        <h2>Code postal : {city.postal_code}</h2>
        <div>
            <h3>Restaurants :</h3>
            {city.restaurants.map(resto => (
                <InnerLink key={`resto${resto.id}`} route={`/restaurants/${resto.id}`} text={resto.name} />
            ))}
            <h3>Styles de cuisine :</h3>
            <div>
                {Array.from(cookingStyles).map(style => (
                    <InnerLink key={`style${style.id}`} route={`/cookingStyles/${style.id}`} text={style.label} />
                ))}
            </div>
        </div>
        {city.weather &&
        <div className={classes.weather}>
            <img src={` http://openweathermap.org/img/wn/${city.weather.daily[0].icon}@2x.png`} alt="" />
            <h4>{city.weather.daily[0].temperature} °C</h4>
        </div>
        }
    </article>
    <div className="buttons">
        <Button text="Ajouter un restaurant"  action={() => setAdd(true)} />
    </div>
    {add && <div className="form">
        <h1>Ajouter un Restaurant</h1>
        {mutLoading ? <Loader /> :
        <Form
            fields={{
                name: {label: 'Nom', type: 'text'},
                description: {label: 'Description', type: 'text'},
                telephone: {label: 'Téléphone', type: 'number'},
                terrace: {label : 'Avec terrasse', type: 'checkbox', buttons: [{text: 'Oui', value: true}, {text: 'Non', value: false}]},
                manager_id: {label: 'Manager', tag: 'select', options: managers.getAllManagers.map(manager => ({id: manager.id, text: `${manager.firstname} ${manager.lastname}`}))},
                city_id: {label: 'Ville', tag: 'select', value: id, options: cities.getAllCities.map(city => ({id: city.id, text: city.name}))},

            }}
            action={submitHandler}
            formError={formError}
            mutError={mutError}
            setAdd={setAdd}
            ref={formRef}
        />
        }
        </div>}
    </>);

}

export default City;
