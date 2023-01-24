import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup"
import { Formik, Form, ErrorMessage as FormikErrorMessage, Field } from "formik";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charSearchForm.scss';

const setContent = (process, char) => {
    switch(process) {
        case 'waiting':
            return;
        case 'loading':
            return <Spinner/>;
        case 'error':
            return <div className="char__search-critical-error"><ErrorMessage/></div>;
        case 'confirmed':
            if(!char) {
                return null;
            } else if(char.length > 0) {
                return (
                    <div className="char__search-wrapper">
                        <div className="char__search-success">
                            There is! Visit {char[0].name} page?
                        </div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>
                );
            } else {
                return (
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>
                );
            }

        default: 
            console.log(process);
            throw new Error('Unexpected process state');
    }
}

const CharSearchForm = () => {
    const [char, setChar] = useState(null); 
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => {
                setProcess('confirmed')
            });
    }

    return (
        <div className="char__search-form">
            <Formik 
                initialValues={{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = {({charName}) => updateChar(charName)}>
                <Form onChange={e => !e.target.value ? setChar(null) : null}>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process === 'loading'}>
                            <div className="inner">Search</div>
                        </button>
                    </div>
                    <FormikErrorMessage className="char__search-error" name="charName" component="div"/>
                </Form>
            </Formik>
            {setContent(process, char)}
        </div>
    )
}

export default CharSearchForm;