import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup"
import { Formik, Form, ErrorMessage as FormikErrorMessage, Field } from "formik";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null); 
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name).then(char => setChar(char));
    }

    const errorMes = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null;
    const spinner = loading ? <Spinner/> : null;
    const res = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> : 
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

    return (
        <div className="char__search-form">
            <Formik 
                initialValues={{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = {({charName}) => updateChar(charName)}
            >
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
                            disabled={loading}>
                            <div className="inner">Search</div>
                        </button>
                    </div>
                    <FormikErrorMessage className="char__search-error" name="charName" component="div"/>
                </Form>
            </Formik>
            {errorMes}
            {spinner}
            {res}
        </div>
    )
}

export default CharSearchForm;