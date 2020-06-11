import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
//css
import './App.css';

//components
import Header from '../Components/Header/Header';
import Aside from '../Components/Aside/Aside';
import Footer from '../Components/Footer/Footer';
//pages
import Inicio from '../Pages/Inicio/Inicio';
import Login from '../Pages/Login/Login';
import Registro from '../Pages/Registro/Registro'
//servicios
import Services from '../Services/Services';

function App(props){

    const [verLoginRegistro, setVerLoginRegistro] = useState(false);
    const [tamanoMenu, setTamanoMenu] = useState(false);
    const [modificarAsideContenedor, setModificarAsideContenedor] = useState('15%');
    const [tamanoContenedor, setTamanoContenedor] = useState('85%');
    const [logueado, seLogueado] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState([])

    useEffect( () => {
        if(localStorage.getItem('viewinindice')){
            seLogueado(true);
            datosUsuarioLogueado(localStorage.getItem('viewinindice'));
        }else{
            seLogueado(false)   
        }
    },[localStorage.getItem('viewinindice')])

    //funcion para que desaparezca los componentes header aside footer
    const funcionOcultarHAF = () => {
        setVerLoginRegistro(true);
    };

    //funcion para que aparezcan los componentes header aside footer
    const funcionMostrarHAF = () => {
        setVerLoginRegistro(false);
    }
    
    //funcion que agrandara o disminuira el tamaño dekl aside y de div contenedor que envuelve a las rutas
    const funcionMenuAside = () => {
        if(!tamanoMenu){
            setModificarAsideContenedor('5%');
            setTamanoContenedor('95%');
        }else{
            setModificarAsideContenedor('15%');
            setTamanoContenedor('85%');
        }
        setTamanoMenu(!tamanoMenu);
    };

    //funcion quie pasaremos al componente login poara cambiar el tamaño del contenedor
    const funcionModificarContenedorLogin = () => {
        setModificarAsideContenedor('0%');
        setTamanoContenedor('100%');
    };

    //funcion para conseguir los datos dle usuario logueao
    const datosUsuarioLogueado = (data) => {
        console.log(data)

        Services.getUserById(data)
        .then(response => {
            // console.log(response.data[0])
            setDatosUsuario(response.data[0])
        })
        .catch(err => console.log(err))
    }

    // console.log(datosUsuario);

    return(
        <div>
            {
                !verLoginRegistro           
                ?
                <div>
                    <Header funcionMenuAside={funcionMenuAside} logueado={logueado} datosUsuario={datosUsuario}></Header>
                    <Aside modificarAsideContenedor={modificarAsideContenedor}></Aside>
                </div>
                :
                <div style={{display:'none'}}></div>
            }
                <div className='contenedor' style={{marginLeft:`${modificarAsideContenedor}`, width:`${tamanoContenedor}`}}>
                    <Switch>
                        <Route exact path='/'><Inicio></Inicio></Route>

                        <Route exact path='/login'>
                        <Login 
                        funcionOcultarHAF={funcionOcultarHAF} 
                        funcionModificarContenedorLogin={funcionModificarContenedorLogin} 
                        funcionMenuAside={funcionMenuAside} 
                        funcionMostrarHAF={funcionMostrarHAF}
                        ></Login>
                        </Route>

                        <Route exact path='/registro'>
                        <Registro 
                        funcionOcultarHAF={funcionOcultarHAF} 
                        funcionModificarContenedorLogin={funcionModificarContenedorLogin}
                        ></Registro>
                        </Route>
                        
                        <Route path='*'><div>ERROR 404</div></Route>
                    </Switch>
                </div>
            {
                !verLoginRegistro  
                ?
                <Footer></Footer>
                :
                <div style={{display:'none'}}></div>
            }           
        </div>
    )
}

export default App;
