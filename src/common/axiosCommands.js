import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response && (error.response >= 400) & (error.response < 500);
    if (expectedError)
        if (error.response === 404) toast.error("Not found");
        else if (error.response === 405) toast.error("email already on database, please register with diferent email");
    else if (!error.response) {
        toast.error(`Unexpected Error, please try again`);
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};