import axios from 'axios';

const api = axios.create({
	baseURL: 'https://viacep.com.br/ws/01001000/json/',
});
// const api = axios.create({
// 	baseURL: 'http://200.18.141.94:3333/',
// });

export default api;
