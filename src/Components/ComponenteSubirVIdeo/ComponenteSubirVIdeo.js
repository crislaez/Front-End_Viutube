import React, {useState, useEffect} from 'react';
//css
import './ComponenteSubirVIdeo.css';

function ComponenteSubirVIdeo(props){

    const [idUsuario, setIdeUsuario] = useState('');
    const [tituloVIdeo, setTituloVideo] = useState('');
    const [descripcionVideo, setDescripcionVIdeo] = useState('');
    const [video, setVideo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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