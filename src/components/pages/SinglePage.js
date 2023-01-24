import { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComics, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        if (!id) {
            return;
        }
        clearError();
        switch (dataType) {
            case 'comic':
                getComics(id).then((data) => setData(data)).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then((data) => setData(data)).then(() => setProcess('confirmed'));
                break;
        }
    };

    return (
        <>
           <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}  

export default SinglePage;