import axiosClient from './axiosClient';

class ArticleApi {
    add(formData) {
        let url = '/articles/add';

        return axiosClient.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    getIndex() {
        let url = '/articles';

        return axiosClient.get(url);
    }

    getCurrentUser(_userId) {
        let url = `/articles/${_userId}/currentUser`;

        return axiosClient.get(url);
    }

    // Lấy tất cả bài viết của một user cụ thể
    getArticleByUser(_userId) {
        let url = `/articles/${_userId}`;

        return axiosClient.get(url);
    }

    addLike(_articleId) {
        let url = `/articles/${_articleId}/addLike`;

        return axiosClient.get(url);
    }
}

const articleApi = new ArticleApi();
export default articleApi;