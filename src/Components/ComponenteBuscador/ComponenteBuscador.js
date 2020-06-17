import React ,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './ComponenteBuscador.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

function ComponenteBuscador(props){

    const [textoBuscador, setTextoBuscador] = useState('');

    //evento del campo buscador
    const handleSubmit = (event) => {
        event.preventDefault();
        // //llamamos a la funcion que esta en app que nos buscara las videos
        // const funcionGetYoutubeVideo = props.funcionGetYoutubeVideo;
        // funcionGetYoutubeVideo(textoBuscador);
        props.history.push(`/buscador/${textoBuscador}`)
        //limpiamos el campo
        setTextoBuscador('');
    };

    return(
        <form onSubmit={handleSubmit} action='' method=''>
            <input type='text' name='buscador' value={textoBuscador} onChange={params => setTextoBuscador(params.target.value)} placeholder='Buscar'></input>
            <button type='submit'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
        </form>
    )
}

export default withRouter(ComponenteBuscador);