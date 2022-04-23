import API from './api'


const NotesService = {
    index: () => {
        return API.get('/notes', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
    },
    create: () => {
        return API.post('/notes', {
            title: 'Nova Nota',
            body: 'Nota nova ....',
        },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
    },
    delete: (id) => {
        return API.delete(`/notes/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
    },
    update: (id, params) => {
        console.log(id)
        return API.put(`/notes/${id}`, params, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
    },

    search: (query) => {
        return API.get(`/notes/search?query=${query}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
    }
}

export default NotesService