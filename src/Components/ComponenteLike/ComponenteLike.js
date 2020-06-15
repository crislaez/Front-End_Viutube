import React,{useState, useEffect} from 'react';
//css
import './ComponenteLike.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown}
from '@fortawesome/free-solid-svg-icons';
import Services from '../../Services/Services';

function ComponenteLike(props){

    const [colorLike, setColorLike] = useState('grey');//color para el like
    const [colorDisLike, setColorDislike] = useState('grey');//color para el dislike
    
    const [habilitarLike, setHabilitarLike] = useState(false); //desabilitar el boton like
    const [habilitarDislike, setHabilitarDislike] = useState(false); //desabilitarr boton dislike

    //funcion like
    const funcionLike = () => {       
        if(colorLike == 'grey'){
            setColorLike('blue');
            setColorDislike('grey');  
            setHabilitarLike(true);
            setHabilitarDislike(false);

            let data = new URLSearchParams(`id_megusta=${''}&id_usuario=${localStorage.getItem('viewinindice')}&id_video=${props.arrayDatosVideo.id_video}`)
            //llamamos a la funcion para dar like
            funcionDarLike(data);

        }else{
            setColorLike('grey');         
            
        }        
    };

    //funciion dislike
    const funcionDislike = () => {
        if(colorDisLike == 'grey'){
            setColorLike('grey');
            setColorDislike('blue');            
            setHabilitarLike(false);
            setHabilitarDislike(true);
            //llamamos a la funcion quitar like   
            funcionQuitarLike(localStorage.getItem('viewinindice'),props.arrayDatosVideo.id_video )
        }else{
            setColorDislike('grey');
        }
    };
    
    //funcion para dar like
    const funcionDarLike = (data) => {
        Services.addLike(data)
        .then(response => {
            console.log(response)
        })
    }

    //funcion para quitar el like
    const funcionQuitarLike = (data, data2) => {
        Services.removeLike(data, data2)
        .then(response => {
            console.log(response)
        })
    }

    // console.log(props.arrayDatosVideo.id_video);

    return(
        <div className='divDatosVideo'>
            <label>0 visualizaciones</label>
            <label style={{marginLeft:'5%'}}>publicado: {props.arrayDatosVideo.fecha_video}</label>
            <button id='bLike' disabled={habilitarLike} onClick={funcionLike} className='likeDIslike' style={{marginLeft:'25%'}}><FontAwesomeIcon id='bLike' style={{marginRight:'1%', color:`${colorLike}`}} icon={faThumbsUp}></FontAwesomeIcon>0</button>
            <button id='bDislike' disabled={habilitarDislike} onClick={funcionDislike} className='likeDIslike' style={{marginLeft:'5%'}}><FontAwesomeIcon id='bDislike' style={{marginRight:'1%', color:`${colorDisLike}`}} icon={faThumbsDown}></FontAwesomeIcon>0</button>
        </div>
    )
}

export default ComponenteLike;