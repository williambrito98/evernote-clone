import API from './api'

const UserService = {
    regsiter: (params) => API.post('/users/register', params),
    login: async (params) => {
        const response = await API.post('/users/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
    },
    logout: () => {
        localStorage.removeItem('user', null)
        localStorage.removeItem('token', null)
    },

    isLoged: () => {
        return localStorage.getItem('user') ? true : false
    }

}

export default UserService