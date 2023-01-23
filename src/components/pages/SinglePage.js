import { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        if (!id) {
            return;
        }
        switch (dataType) {
            case 'comic':
                getComics(id).then((data) => setData(data));
                break;
            case 'character':
                getCharacter(id).then((data) => setData(data));
                break;
        }
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}  

export default SinglePage;