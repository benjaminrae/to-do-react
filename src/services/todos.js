import axios from "axios";
const baseUrl =
    "https://wonderfulcorsproxy.herokuapp.com/https://do-doing-done.herokuapp.com/api/todos";

const localBaseUrl = "http://localhost:3001/api/todos";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
