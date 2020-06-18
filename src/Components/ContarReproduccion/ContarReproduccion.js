import React, {useState, useEffect} from 'react';
//css
import './ContarReproduccion.css';
//servicios
import Services from '../../Services/Services';

function ContarReproduccion(props){
    const [contador, setContador] = useState(0);

    useEffect(() => {

        funcionContarReproduccion(props.id_video)
    },[props.id_video]);

    const funcionContarReproduccion = (data) => {
        // getReproductionByIdVideo
        Services.getReproductionByIdVideo(data)
        .then(response => {
            // console.log(response.data[0].files);
            setContador(response.data[0].files)
        })
        .catch(err => {console.log(err)})
    }


    // console.log(props.id)
    return(
        <label>{contador} visualizaciones</label>
        )
}

export default ContarReproduccion;