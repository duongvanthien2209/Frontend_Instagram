import axiosClient from './axiosClient';

class AuthApi {
    getToken(data) {
        let url = '/auth';
        return axiosClient.post(url, data);
    }
}

const authApi = new AuthApi();
export default authApi;