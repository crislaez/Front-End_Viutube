//agregar usuario
const addUser = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addUser',{method:'POST',body:data}).then(data => data.json())
};

//login
const login = (data) => {
    return fetch(process.env.REACT_APP_URL+'/login',{method:'POST', body:data}).then(data => data.json())
};

//usuario por id
const getUserById = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getUserById/'+data,{method:'GET'}).then(data => data.json())
};

//agregar videos //le pasamos el token para verificar el usuario
const addVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addVideo',{method:'POST',body:data, headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
};

//videos por id usuario
const getVideosByIdUser = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getVideosByIdUser/'+data, {method:'GET'}).then(data => data.json())
};

//video por id video
const getVideoByIdVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getVideoByIdVideo/'+data,{method:'GET'}).then(data => data.json())
};

//agregar comentario
const addComent = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addComent',{method:'POST',body:data, headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
};

//mostrar comentarios por video
const getAllComentByIdVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getAllComentByIdVideo/'+data,{method:'GET'}).then(data => data.json())
};

//todos los videos
const getAllVideo = () => {
    return fetch(process.env.REACT_APP_URL+'/getAllVideo',{method:'GET'}).then(data => data.json())
}

//mostrar 10 videos
const get10Video = () => {
     return fetch(process.env.REACT_APP_URL+'/get10Video', {method:'GET'}).then(data => data.json())
}

//seguis a usuarios
const addFollow = (data) => {
    return fetch('/addFollow',{method:'GET',body:data, headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}})
}

export default 
    {
        addUser,
        login,
        getUserById,
        addVideo,
        getVideosByIdUser,
        getVideoByIdVideo,
        addComent,
        getAllComentByIdVideo,
        getAllVideo,
        get10Video,
        addFollow
    }