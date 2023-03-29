import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import RestaurantItem from './RestaurantItem';
import {useQuery, useMutation} from '@apollo/client';
import { RESTAURANTS, CITIES_SELECT, MANAGERS_SELECT, CREATE_RESTAURANT } from '../../graphql/queries';
import ErrorBox from '../common/ErrorBox';
import Loader from '../common/Loader';
import Button from '../common/Button';
import Form from '../common/Form';
import useRefetch from '../../hooks/useRefetch';

const Restaurants = () => {

    const navigate = useNavigate();

    const [add, setAdd] = useState(false);
    const [formError, setFormError] = useState(null);

    const formRef = useRef();

    const {data: cities} = useQuery(CITIES_SELECT);
    const {data: managers} = useQuery(MANAGERS_SELECT);

    const {loading, error, data, refetch} = useQuery(RESTAURANTS, {
        pollInterval: 5000
    });
    useRefetch(refetch);


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

    return <>
        <div className="buttons sticky">
            <Button text="Ajouter" action={() => setAdd(true)} />
        </div>
        {add && <div className="form">
            <h1>Ajouter un Restaurant</h1>
            {mutLoading ? <Loader /> :
            <Form
                fields={{
                    name: {label: 'Nom', type: 'text'},
                    description: {label: 'Description', type: 'text'},
                    telephone: {label: 'Téléphone', type: 'number'},
                    terrace: {label : 'Avec terrasse', type: 'checkbox'},
                    manager_id: {label: 'Manager', tag: 'select', options: managers.getAllManagers.map(manager => ({id: manager.id, text: `${manager.firstname} ${manager.lastname}`}))},
                    city_id: {label: 'Ville', tag: 'select', options: cities.getAllCities.map(city => ({id: city.id, text: city.name}))},

                }}
                action={submitHandler}
                formError={formError}
                mutError={mutError}
                setAdd={setAdd}
                ref={formRef}
            />
            }
        </div>}
        {data.getAllRestaurants.map(resto => <RestaurantItem key={`resto${resto.id}`} resto={resto} />)}
    </>
};

export default Restaurants;
