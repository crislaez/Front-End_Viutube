import React, {useState, useEffect} from 'react';
//css
import './ContenedorComentario.css';

function ContenedorComentario(props){

    return(
        <div className='divContenedorComentario' data-codigomensaje={props.id_comentario} data-codigousuario={props.id_usuario}>
            <div className='divLogoCanalVideo'>
                <img src={props.avatar}></img>
            </div>
            <div className='divComentario'>
                <p><strong>{props.nombre_usuario}</strong></p>
                <label>Escrito el {props.fecha_comentario}</label>
                <p className='pMensaje'>{props.texto_comentario}</p>
            </div>
        </div>
    )
}

export default ContenedorComentario;