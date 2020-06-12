import React, {useState, useEffect} from 'react';
//css
import './ComponenteSubirVIdeo.css';
//alerta
import swal from 'sweetalert';
//services
import Services from '../../Services/Services';
import moment from 'moment';

function ComponenteSubirVIdeo(props){

    const [idUsuario, setIdeUsuario] = useState('');
    const [tituloVIdeo, setTituloVideo] = useState('');
    const [descripcionVideo, setDescripcionVIdeo] = useState('');
    const [video, setVideo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!tituloVIdeo){
            swal ( "Oops" ,  "Rellene el titulo del video correctamente" ,  "error" );
        }else if(!descripcionVideo){
            swal ( "Oops" ,  "Rellene la descripcion del video correctamente" ,  "error" );
        }else if(!video){
            swal ( "Oops" ,  "Seleccione un video" ,  "error" );
        }else{
            let now = moment().format("DD-MM-YYYY") 
            
            let formData = new FormData();
            formData.append("id_video", '');
            formData.append("id_usuario", localStorage.getItem('viewinindice'));
            formData.append("titulo_video", tituloVIdeo);
            formData.append("descripcion_video", descripcionVideo);
            formData.append("video", video);
            formData.append("fecha_video", now);
   
            Services.addVideo(formData)
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err));
            // llamamos a la funcion que esta en perfil para cerrar este componente
            const handleClick = props.handleClick;
            handleClick();
        }
    };

    return(
        <div className='divSubirVideos' style={{marginLeft:`-${props.modificarAsideContenedor}`}}>
            <div className='contenedorSubirVideos'>
                <div className='divTituloSubirVideo'>
                    <h2>Subir Videos</h2>
                    <input type='button' value='X' onClick={props.handleClick}></input>
                </div>
                
                <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data'>
                    <input type='text' name='titulo' value={tituloVIdeo} onChange={params => setTituloVideo(params.target.value)} placeholder='titulo del video...'></input>
                    <br></br>
                    <input type='text' name='descripcion' value={descripcionVideo} onChange={params => setDescripcionVIdeo(params.target.value)} placeholder='descripcion del video...'></input>
                    <br></br>
                    <input type='file' name='video'  onChange={params => setVideo(params.target.files[0])} ></input>
                    <br></br>
                    <input type='submit' value='Subir'></input>
                </form>

            </div>
        </div>
    )
}

export default ComponenteSubirVIdeo