//agregar usuario
const addUser = (data) => {
    return fetch(process.env.REACT_APP_URL+'/addUser',{method:'POST',body:data}).then(data => data.json())
};

//login
const login = (data) => {
    return fetch(process.env.REACT_APP_URL+'/login',{method:'POST', body:data}).then(data => data.json())
}

export default 
    {
        addUser,
        login
    }