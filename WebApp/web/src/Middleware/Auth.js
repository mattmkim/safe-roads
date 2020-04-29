import axios from 'axios'

class Auth {
    async login (obj, callback) {
        const res = await axios.post('/api/checklogin', obj);
        const value = res.data;

        localStorage.setItem("email", obj.email);

        callback(value);
    }

    async signup (obj, callback) {
        const res = await axios.post('/api/signup', obj);
        const value = res.data;

        localStorage.setItem("email", obj.email);

        callback(value);
    }

    async delete (obj, callback) {
        const res = await axios.post('/api/deleteprofile', obj)
        const value = res.data;

        localStorage.removeItem("email");

        callback(value);
    }
}

export default new Auth();