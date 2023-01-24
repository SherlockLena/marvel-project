import "./charList.scss";
import { useState, useEffect, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {
    
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [isEnded, setIsEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) ended = true;

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setIsEnded(ended);
    };

    const itemRefs = useRef([]);

    const itemIsSelected = (i) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        itemRefs.current[i].classList.add("char__item_selected");
        itemRefs.current[i].focus();
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': "cover" };
            if (
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                imgStyle = { 'objectFit': "unset" };
            }

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li
                        className="char__item"
                        key={item.id}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            itemIsSelected(i);
                        }}
                        ref={(el) => (itemRefs.current[i] = el)}
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.name}
                            style={imgStyle}
                        />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>);
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
        // eslint-disable-next-line
    }, [process]);

    return (
        <div className="char__list">
            {elements}
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: isEnded ? "none" : "block" }}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
