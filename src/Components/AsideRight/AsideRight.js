import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './AsideRight.css';
//servicios
import Services from '../../Services/Services';

function AsideRight(props){

    const [isMount, setIsMount] = useState(false);
    const [array10Videos, setArray10Videos] = useState([]);

    useEffect( () => {
        funcionObtener10Videos();
        setIsMount(true);
        return() => {
            setIsMount(false)
        }
    },[]);

    const funcionObtener10Videos = () => {
        Services.get10Video()
        .then(response => {
            // console.log(response.data);
            setArray10Videos(response.data)
        })
        .catch(err => console.log(err));
    }

    //funcion que nos lelva a la pagina video
    const handleClick = (event) => {
        console.log(event.target.dataset.codigovideo)
        let id = event.target.dataset.codigovideo
        props.history.push(`/video/${id}`)
        window.location.reload(true);
    };


    return(
        <div className='contenedorVideoRight'>
            {
                isMount && array10Videos.toLocaleString()
                ?
                array10Videos.map( (dato, key) => {
                    return(
                        <div key={key} className='divAsideRightVIdeo'>

                            <div className='divVideoLeft'>
                                <video src={dato.video} data-codigovideo={dato.id_video} onClick={handleClick}></video>
                            </div>

                            <div className='divVideoRight'>
                                <p style={{fontSize:'15px', fontWeight:'bold'}}>{dato.titulo_video}</p>
                                <p style={{fontSize:'12px'}}>{dato.nombre_usuario}</p>
                                <p style={{fontSize:'12px'}}>visualizaciones</p>
                                <p style={{fontSize:'12px'}}>{dato.fecha_video}</p>
                            </div>

                        </div>
                    )
                })
                :
                <div>Cargando...</div>
            }
        </div>
    )
}

export default withRouter(AsideRight);