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
import Registro from '../Pages/Registro/Registro';
import Perfil from '../Pages/Perfil/Perfil';
//servicios
import Services from '../Services/Services';

function App(props){

    const [verLoginRegistro, setVerLoginRegistro] = useState(false);
    const [tamanoMenu, setTamanoMenu] = useState(false);
    
    const [modificarAsideContenedor, setModificarAsideContenedor] = useState('16%');
    const [tamanoContenedor, setTamanoContenedor] = useState('84%');
    const [desaparecerParrafosAside, setDesaparecerParrafosAside] = useState('block')
    
    const [logueado, seLogueado] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosUsuarioPerfil, setDatosUsuarioPerfil] = useState([]);

    useEffect( () => {
        if(localStorage.getItem('viewinindice')){
            seLogueado(true);
            funcionDatosUsuarioLogueado(localStorage.getItem('viewinindice'),true);
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
            setDesaparecerParrafosAside('none');
        }else{
            setModificarAsideContenedor('16%');
            setTamanoContenedor('84%');
            setDesaparecerParrafosAside('block');
        }
        setTamanoMenu(!tamanoMenu);
    };

    //funcion quie pasaremos al componente login poara cambiar el tamaño del contenedor
    const funcionModificarContenedorLogin = () => {
        setModificarAsideContenedor('0%');
        setTamanoContenedor('100%');
    };

    //funcion para conseguir los datos dle usuario logueao
    const funcionDatosUsuarioLogueado = (data,bool) => {
        console.log(data)
        Services.getUserById(data)
        .then(response => {
            // console.log(response.data[0])
            if(bool){
                setDatosUsuario(response.data[0])
            }else{
                setDatosUsuarioPerfil(response.data[0])
            }
            
        })
        .catch(err => console.log(err))
    };

    const getYoutubeVideo = (data) => {
        console.log(data)

        Services.getVideo(data)
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            {
                !verLoginRegistro           
                ?
                <div>
                    <Header 
                    funcionMenuAside={funcionMenuAside} 
                    logueado={logueado} 
                    datosUsuario={datosUsuario}
                    getYoutubeVideo={getYoutubeVideo}
                    funcionDatosUsuarioLogueado={funcionDatosUsuarioLogueado}
                    ></Header>
                    <Aside 
                    modificarAsideContenedor={modificarAsideContenedor}
                    desaparecerParrafosAside={desaparecerParrafosAside}
                    logueado={logueado}
                    ></Aside>
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

                        <Route exact path='/perfil/:id'>
                        <Perfil 
                        datosUsuarioPerfil={datosUsuarioPerfil}
                        modificarAsideContenedor={modificarAsideContenedor}
                        >
                        </Perfil></Route>
                        
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
