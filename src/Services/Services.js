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
    return fetch(process.env.REACT_APP_URL+'/addFollow',{method:'POST',body:data, headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
}

//dejar de seguir
const removeFollow = (data, data2) => {
    return fetch(process.env.REACT_APP_URL+'/removeFollow/'+data+'/'+data2,{method:'DELETE',headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
}

//comprobar si un usuario suigue al otro
const checkFollow = (data,data2) => {
    return fetch(process.env.REACT_APP_URL+'/checkFollow/'+data+'/'+data2,{method:'GET'}).then(data => data.json())
}

//conseguir todos los usuarios qeu se sigue
const getFollowByIdUser = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getFollowByIdUser/'+data, {method:'GET'}).then(data => data.json())
}

//dar like
const addLike = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addLike',{method:'POST', body:data, headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
}

//quitar like
const removeLike = (data, data2) => {
    return fetch(process.env.REACT_APP_URL+'/removeLike/'+data+'/'+data2,{method:'DELETE', headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
}

//dar dislike
const addDislike = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addDislike', {method:'POST',body:data, headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
}

//quitar dislike
const removeDislike = (data, data2) => {
    return fetch(process.env.REACT_APP_URL+'/removeDislike/'+data+'/'+data2, {method:'DELETE',headers:{authorization: `BEARER ${localStorage.getItem('viutubeToken')}`}}).then(data => data.json())
}

//comprobar like
const checkLike = (data, data2) => {
    return fetch(process.env.REACT_APP_URL+'/checkLike/'+data+'/'+data2,{method:'GET'}).then(data => data.json())
}

//comprobar dislike
const checkDislike = (data, data2) => {
    return fetch(process.env.REACT_APP_URL+'/checkDislike/'+data+'/'+data2,{method:'GET'}).then(data => data.json())
}

//cantidad de likes
const countLikeByIdVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/countLikeByIdVideo/'+data,{method:'GET'}).then(data => data.json())
}

//cantidad de dislikes
const countDislikeByIdVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/countDislikeByIdVideo/'+data, {method:'GET'}).then(data => data.json())
}

//buscar videos por titulo
const getUserByUserName = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getUserByUserName/'+data,{method:'GET'}).then(data => data.json())
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
        addFollow,
        removeFollow,
        checkFollow,
        getFollowByIdUser,
        addLike,
        removeLike,
        addDislike,
        removeDislike,
        checkLike,
        checkDislike,
        countLikeByIdVideo,
        countDislikeByIdVideo,
        getUserByUserName
    }