import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
//css
import './ComponenteVideo.css'

function ComponenteVideo(props){

    const [usuarioLogueado, setUsuarioLogueado] = useState(true);//si el usuario es el logueado, no se cargara el circulito dle logo del canal
    
    
    useEffect( () => {
        if(props.id_usuario == localStorage.getItem('viewinindice')){
            setUsuarioLogueado(true)
        }else{
            setUsuarioLogueado(false)
        }
        return() => {

        }
    },[]);


    const handleClick = (event) => {
        if(event.target.tagName === 'VIDEO'){
            console.log(event.target.dataset.codigo)
            let id = event.target.dataset.codigo
            props.history.push('/video/'+id);
        }        
    };
    

    return(
        <div className='divVideo' data-codigo={props.id_video} onClick={handleClick}>
            <div className='cajaVideo'data-codigo={props.id_video} >
                <video src={props.video} data-codigo={props.id_video}></video>
            </div>

            {
                !props.avatar
                ?
                <div style={{display:'none'}}></div>
                :
                <div className='divLogoCanal' data-codigousuario={props.id_usuario}>
                    <img src={props.avatar} alt='logoCanal'></img>
                </div>
            }           

            <div className='datosCanal' data-codigo={props.id_video}>
                <p className='pTitulo' data-codigo={props.id_video}><strong>{props.titulo_video}</strong></p>
                <p className='parrafoVideo' data-codigo={props.id_video}>{props.descripcion_video}</p>                                   
                <p className='parrafoVideo' data-codigo={props.id_video}>{props.fecha_video}</p>                                    
            </div>
        </div>
    )
}

export default withRouter(ComponenteVideo);