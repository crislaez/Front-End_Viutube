//agregar usuario
const addUser = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addUser',{method:'POST',body:data}).then(data => data.json())
};

//login
const login = (data) => {
    return fetch(process.env.REACT_APP_URL+'/login',{method:'POST', body:data}).then(data => data.json())
}

//usuario por id
const getUserById = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getUserById/'+data,{method:'GET'}).then(data => data.json())
}

//agregar videos
const addVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addVideo',{method:'POST',body:data}).then(data => data.json())
}

//videos por id usuario
const getVideosByIdUser = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getVideosByIdUser/'+data, {method:'GET'}).then(data => data.json())
} 

//video por id video
const getVideoByIdVideo = (data) => {
    return fetch(process.env.REACT_APP_URL+'/getVideoByIdVideo/'+data,{method:'GET'}).then(data => data.json())
}

export default 
    {
        addUser,
        login,
        getUserById,
        addVideo,
        getVideosByIdUser,
        getVideoByIdVideo
    }