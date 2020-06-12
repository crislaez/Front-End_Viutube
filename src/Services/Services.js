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

// //buscar videos en youtube
// const getVideo = (data) => {
//     return fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_APY_KEY_YOUTUBE}&type=video&maxResults=20&part=snippet&q=${data}`,{method:'GET'}).then(data => data.json());
// };

// //videos para la pagina principal
// const getVideoInicio = (data) => {
//     return fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_APY_KEY_YOUTUBE}&type=video&maxResults=8&part=snippet&q=${data}`,{method:'GET'}).then(data => data.json());
// };

export default 
    {
        addUser,
        login,
        getUserById,
        addVideo
    }