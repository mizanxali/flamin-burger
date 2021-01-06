import axios from 'axios'

const router = axios.create({
    baseURL: 'https://burger-king-ed0a0-default-rtdb.firebaseio.com/'
});

export default router