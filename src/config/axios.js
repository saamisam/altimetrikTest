import axios from 'axios';
import config from './config.js';

const instance = axios.create({
	baseURL: config.BASE_API_URL,
	// withCredentials: true,
});

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
// instance.defaults.headers.common['Authorization'] = localStorage.getItem('session');

// instance.interceptors.request...

export default instance;