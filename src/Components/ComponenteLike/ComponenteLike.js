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

    const [cantidadLike, setCantidadLike] = useState(''); //contador de likes
    const [cantidadDislikes, setCantidadDislikes] = useState(''); //contador dislikes


    useEffect( () => {

        funcionComprobarLike(localStorage.getItem('viewinindice'),props.arrayDatosVideo.id_video);
        funcionComprobarDislike(localStorage.getItem('viewinindice'),props.arrayDatosVideo.id_video);

        functionContarLikes(props.arrayDatosVideo.id_video);
        funcionContarDislikes(props.arrayDatosVideo.id_video);
        
        return() => {

        }
    },[props.arrayDatosVideo]);


    //funcion like
    const funcionLike = () => {       
        if(localStorage.getItem('viewinindice')){        
            if(colorLike == 'grey'){
                setColorLike('blue');
                setColorDislike('grey');  
                setHabilitarLike(true);
                setHabilitarDislike(false);

                let data = new URLSearchParams(`id_megusta=${''}&id_usuario=${localStorage.getItem('viewinindice')}&id_video=${props.arrayDatosVideo.id_video}`);
                //llamamos a la funcion para dar like
                funcionDarLike(data);
                //llamamos a la funcion dquitar dislike
                funcionQuitarDislike(localStorage.getItem('viewinindice'),props.arrayDatosVideo.id_video);      
            }else{
                setColorLike('grey');         
                
            }    
        }    
    };

    //funciion dislike
    const funcionDislike = () => {
        if(localStorage.getItem('viewinindice')){   
            if(colorDisLike == 'grey'){
                setColorLike('grey');
                setColorDislike('blue');            
                setHabilitarLike(false);
                setHabilitarDislike(true);

                let data = new URLSearchParams(`id_nomegusta=${''}&id_usuario=${localStorage.getItem('viewinindice')}&id_video=${props.arrayDatosVideo.id_video}`);
                //llamamos a la funcion dar dislike
                funcionDarDislike(data)
                //llamamos a la funcion quitar like   
                funcionQuitarLike(localStorage.getItem('viewinindice'),props.arrayDatosVideo.id_video);                
            }else{
                setColorDislike('grey');
            }
        }
    };
    
    //funcion para dar like
    const funcionDarLike = (data) => {
        Services.addLike(data)
        .then(response => {
            functionContarLikes(props.arrayDatosVideo.id_video);
            funcionContarDislikes(props.arrayDatosVideo.id_video);
            // console.log(response)
        })
        .catch(err => console.log(err))
    };

    //funcion para quitar el like
    const funcionQuitarLike = (data, data2) => {
        Services.removeLike(data, data2)
        .then(response => {
            // console.log(response)
        })
        .catch(err => console.log(err))
    };
    
    //funcion dar dislike
    const funcionDarDislike = (data) => {
        Services.addDislike(data)
        .then(response => {
            functionContarLikes(props.arrayDatosVideo.id_video);
            funcionContarDislikes(props.arrayDatosVideo.id_video);
            // console.log(response)
        })
        .catch(err => console.log(err))
    }

    //funcion quitar dislike
    const funcionQuitarDislike = (data, data2) => {
        Services.removeDislike(data, data2)
        .then(response => {
            // console.log(response)
        })
        .catch(err => console.log(err))
    }
    
    //funcion comprobar like
    const funcionComprobarLike = (data, data2) => {
        Services.checkLike(data, data2)
        .then(response => {
            if(response.data.toString()){
                // console.log(response);
                setColorLike('blue')
                setHabilitarLike(true);
                setHabilitarDislike(false);
            }            
        })
        .catch(err => console.log(err))
    };

    //funcion comprobar dislike
    const funcionComprobarDislike = (data, data2) => {
        Services.checkDislike(data, data2)
        .then(response => {
            if(response.data.toString()){
                // console.log(response)
                setColorDislike('blue');
                setHabilitarDislike(true);
                setHabilitarLike(false);            
            }            
        })
    }
    
    //funcion contar likes
    const functionContarLikes = (data) => {
        Services.countLikeByIdVideo(data)
        .then(response => {
            console.log(response.data[0].files);
            setCantidadLike(response.data[0].files);
        })
    };

    //funcion contar dislikes
    const funcionContarDislikes = (data) => {
        Services.countDislikeByIdVideo(data)
        .then(response => {
            console.log(response.data[0].files);
            setCantidadDislikes(response.data[0].files);
        })
    }

    // console.log(props.arrayDatosVideo.id_video);

    return(
        <div className='divDatosVideo'>
            <label>0 visualizaciones</label>
            <label style={{marginLeft:'5%'}}>publicado: {props.arrayDatosVideo.fecha_video}</label>
            <button id='bLike' disabled={habilitarLike} onClick={funcionLike} className='likeDIslike' style={{marginLeft:'25%'}}><FontAwesomeIcon id='bLike' style={{marginRight:'1%', color:`${colorLike}`}} icon={faThumbsUp}></FontAwesomeIcon>{cantidadLike}</button>
            <button id='bDislike' disabled={habilitarDislike} onClick={funcionDislike} className='likeDIslike' style={{marginLeft:'5%'}}><FontAwesomeIcon id='bDislike' style={{marginRight:'1%', color:`${colorDisLike}`}} icon={faThumbsDown}></FontAwesomeIcon>{cantidadDislikes}</button>
        </div>
    )
}

export default ComponenteLike;