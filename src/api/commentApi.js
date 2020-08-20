import axiosClient from './axiosClient';

class CommentApi {
    getComment(_articleId) {
        let url = `/comments/${_articleId}`;

        return axiosClient.get(url);
    }

    addComment(_articleId, text) {
        let url = `/comments/${_articleId}/add`;

        return axiosClient.post(url, { text });
    }
}

const commentApi = new CommentApi();
export default commentApi;