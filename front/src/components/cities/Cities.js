import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import CityItem from './CityItem';
import {useQuery, useMutation} from '@apollo/client';
import { CITIES, CREATE_CITY } from '../../graphql/queries';
import ErrorBox from '../common/ErrorBox';
import Loader from '../common/Loader';
import Button from '../common/Button';
import Form from '../common/Form';
import useRefetch from '../../hooks/useRefetch';

const Cities = () => {

    const navigate = useNavigate();

    const [add, setAdd] = useState(false);
    const [formError, setFormError] = useState(null);

    const formRef = useRef();

    const {loading, error, data, refetch} = useQuery(CITIES, {
        pollInterval: 5000
    });
    useRefetch(refetch);

    const [createCity, { data: mutData, loading: mutLoading, error: mutError }] = useMutation(CREATE_CITY);

    useEffect(() => {
        if(mutData) {
            navigate(`/cities/${mutData.createCity.id}`, {replace: true});
        }
    })

    const submitHandler = event => {
        event.preventDefault();
        const [name, postal_code, lng, lat] = event.target;
        if (!name.value) {
            return setFormError('Veuillez indiquer le nom de la ville')
        }
        if (!postal_code.value) {
            return setFormError('Veuillez indiquer le code postal')
        }
        if (!/\d{5}/.test(postal_code.value)) {
            return setFormError('Le code postal est incorrect (5 chiffres)')
        }
        if (!lng.value) {
            return setFormError('Veuillez indiquer la longitude')
        }
        if (lng.value < -180 || lng.value > 180) {
            return setFormError('La longitude est incorrecte (-180 | 180)')
        }
        if (!lat.value) {
            return setFormError('Veuillez indiquer la latitude')
        }
        if (lat.value < -90 || lat.value > 90) {
            return setFormError('La latitude est incorrecte (-90 | 90)')
        }
        createCity({
            variables: {
                input: {
                    name: name.value,
                    postal_code: postal_code.value,
                    geopos: `(${lng.value}, ${lat.value})`
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
            <h1>Ajouter une ville</h1>
            {mutLoading ? <Loader /> :
            <Form
                fields={{
                    name: {label: 'Nom', type: 'text'},
                    postal_code: {label: 'Code postal', type: 'number'},
                    lng: {label: 'Longitude', type: 'number', step: '0.000001'},
                    lat: {label: 'Latitude', type: 'number', step: '0.000001'},
                }}
                action={submitHandler}
                formError={formError}
                mutError={mutError}
                setAdd={setAdd}
                ref={formRef}
            />
            }
        </div>}
        {data.getAllCities.map(city => <CityItem key={`city${city.id}`} city={city} />)}
    </>
};

export default Cities;
