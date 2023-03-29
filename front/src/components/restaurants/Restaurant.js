import {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {RESTAURANT, UPDATE_RESTAURANT, DELETE_RESTAURANT, CITIES_SELECT, MANAGERS_SELECT} from '../../graphql/queries';
import ErrorBox from '../common/ErrorBox';
import Loader from '../common/Loader';
import InnerLink from '../common/InnerLink';
import Button from '../common/Button';
import Form from '../common/Form';
import useRefetch from '../../hooks/useRefetch';

import terrace from '../../images/terrasse.png';
import noTerrace from '../../images/noTerrasse.png';
import classes from './Restaurant.module.css';

const Restaurant = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [add, setAdd] = useState(false);
    const [formError, setFormError] = useState(null);

    const formRef = useRef();

    const {data: cities} = useQuery(CITIES_SELECT);
    const {data: managers} = useQuery(MANAGERS_SELECT);

    const {loading, error, data, refetch} = useQuery(RESTAURANT, {
        variables: {id: +id},
        pollInterval: 5000
    });
    useRefetch(refetch, {id: +id})

    const [updateRestaurant, {data: updateData, error: updateError, loading: updateLoading}] = useMutation(UPDATE_RESTAURANT);
    const [deleteRestaurant, {data: delData}] = useMutation(DELETE_RESTAURANT);

    const deleteHandler = () => {
        if (window.confirm('Confirmez-vous la suppression ?')) {
            deleteRestaurant({
                variables: {
                    id: +id
                }
            });
            window.history.mustRefetch = true;
        }
    }

    useEffect(() => {
        if(updateData) {
            navigate(`/restaurants/${id}`, {replace: true});
        }
    });

    useEffect(() => {
        if(delData) {
            navigate(`/restaurants`, {replace: true});
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

        updateRestaurant({
            variables: {
                input: {
                    id: +id,
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
        setAdd(false);
    };


    if (loading) return <Loader />;
    if (error) return <ErrorBox error={error} />;

    const resto = data.getRestaurant;

    if (updateError) {
        console.log(JSON.stringify(updateError));

    }

    return (<>
    <article className={`item ${classes.resto}`}>
        <h1>{resto.name}</h1>
        <p>{resto.description}</p>
        <h2>Telephone : {resto.telephone}</h2>
        <h3>Manager : {resto.manager.firstname} {resto.manager.lastname}</h3>
        <img src={resto.terrace ? terrace : noTerrace} alt="Info terrasse" />
        <div>
            <h3>Ville :</h3>
            <InnerLink route={`/cities/${resto.city.id}`} text={resto.city.name} />
            <h3>Styles de cuisine :</h3>
            <div>
                {resto.cookingStyles.map(style => (
                    <InnerLink key={`style${style.id}`} route={`/cookingStyles/${style.id}`} text={style.label} />
                ))}
            </div>
        </div>
    </article>
    <div className="buttons">
        <Button text="Modifier" action={() => setAdd(true)} />
        <Button text="Supprimer" action={deleteHandler} />
    </div>
    {add && <div className="form">
            <h1>Ajouter un Restaurant</h1>
            {updateLoading ? <Loader /> :
            <Form
                fields={{
                    name: {label: 'Nom', type: 'text', value: resto.name},
                    description: {label: 'Description', type: 'text', value: resto.description},
                    telephone: {label: 'Téléphone', type: 'text', value: resto.telephone},
                    terrace: {label : 'Avec terrasse', type: 'checkbox', checked: resto.terrace},
                    manager_id: {label: 'Manager', tag: 'select', value: resto.manager.id, options: managers.getAllManagers.map(manager => ({id: manager.id, text: `${manager.firstname} ${manager.lastname}`}))},
                    city_id: {label: 'Ville', tag: 'select', value: resto.city.id, options: cities.getAllCities.map(city => ({id: city.id, text: city.name}))},

                }}
                action={submitHandler}
                formError={formError}
                mutError={updateError}
                setAdd={setAdd}
                ref={formRef}
            />
            }
        </div>}
    </>);
}

export default Restaurant;
