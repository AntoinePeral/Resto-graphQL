import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import CookingStyleItem from './CookingStyleItem';
import {useQuery, useMutation} from '@apollo/client';
import { COOKING_STYLES, CREATE_COOKING_STYLE } from '../../graphql/queries';
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

    const {loading, error, data, refetch} = useQuery(COOKING_STYLES, {
        pollInterval: 5000
    });
    useRefetch(refetch);

    const [createCookingStyle, { data: mutData, loading: mutLoading, error: mutError }] = useMutation(CREATE_COOKING_STYLE);

    useEffect(() => {
        if(mutData) {
            navigate(`/cookingStyles/${mutData.createCookingStyle.id}`, {replace: true});
        }
    })

    const submitHandler = event => {
        event.preventDefault();
        const [label] = event.target;
        if (!label.value) {
            return setFormError('Veuillez indiquer le label du style de cuisine')
        }
        createCookingStyle({
            variables: {
                input: {
                    label: label.value,
                }
            }
        });
        window.history.mustRefetch = true;
    };


    if (loading) return <Loader />;
    if (error) return <ErrorBox error={error} />;

    return <>
        <div className="buttons sticky">
            <Button text="Ajouter"  action={() => setAdd(true)} />
        </div>
        {add && <div className="form">
            <h1>Ajouter un style de cuisine</h1>
            {mutLoading ? <Loader /> :
            <Form
                fields={{
                    label: {label: 'Label', type: 'text'},
                }}
                action={submitHandler}
                formError={formError}
                mutError={mutError}
                setAdd={setAdd}
                ref={formRef}
            />
            }
        </div>}
        {data.getAllCookingStyles.map(style => <CookingStyleItem key={`style${style.id}`} style={style} />)}
    </>
};

export default Cities;
