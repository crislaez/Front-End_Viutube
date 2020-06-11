import React,{useState, useEffect} from 'react';
//css
import './ComponenteRecomendado.css';

function ComponenteRecomendado(props){

    //funcion cuando se ahce click a un video
    const handleClick = (event) => {
        console.log(event.target.dataset.codigovideo)
        fetch('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=OneDirectionVEVO&key=AIzaSyB6lt4F1kCLbwL8ZzNMX3Ms-x9FhuaG7Oc', {method:'GET'})
        .then(data => data.json())
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='divRecomendados'>
            <div className='tituloRecomendados'>
                <h3>{props.titulo}</h3>
            </div> 

            {
                props.arrayRecomendados.toString()
                ?
                props.arrayRecomendados.map( (dato, key) => {
                    return(
                        <div key={key} className='divVideo' data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId} onClick={handleClick}>
                            <div className='divSuperponer' data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>
                            </div>
                            <div className='cajaVideo' data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>
                                <iframe src={'http://www.youtube.com/embed/'+dato.id.videoId} data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}></iframe>
                            </div>

                            <div className='divLogoCanal' data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>
                                <img src={dato.snippet.thumbnails.default.url} alt='logoCanal' data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}></img>
                            </div>

                            <div className='datosCanal' data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>
                                <p className='pTitulo' data-codigovideo={dato.id.videoId}><strong data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>{dato.snippet.title}</strong></p>
                                <p data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>{dato.snippet.channelTitle}</p>                                   
                                <p data-codigovideo={'http://www.youtube.com/embed/'+dato.id.videoId}>{dato.snippet.publishTime}</p>
                                
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

export default ComponenteRecomendado;