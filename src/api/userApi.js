import axiosClient from './axiosClient';

class UserApi {
    // Tạo mới người dùng
    create(data) {
        let url = '/users/create';

        return axiosClient.post(url, data);
    }

    // Lấy thông tin user
    getUser() {
        let url = '/users';

        return axiosClient.get(url);
    }

    // Lấy thông tin user bằng ID
    getUserById(_userId) {
        let url = `/users/${_userId}`;

        return axiosClient.get(url);
    }

    // Thêm bạn
    addFriend(_friendId) {
        let url = `/users/${_friendId}/addFriend`;

        return axiosClient.get(url);
    }

    // Lấy những người ko phải là bạn
    getNoFriends() {
        let url = '/users/noFriends';

        return axiosClient.get(url);
    }
}

const userApi = new UserApi();
export default userApi;