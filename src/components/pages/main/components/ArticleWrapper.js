import React, { useState, useEffect } from 'react';

// Apis
import articleApi from '../../../../api/articleApi';

export default function ArticleWrapper(props) {
    let [state, setState] = useState({ articles: [] });

    useEffect(() => {
        // Lấy tất cả bài viết liên quan về
        articleApi.getIndex().then(({ success, articles }) => {
            if(!success || !articles) {
                throw new Error();
            }

            setState(currentState => {
                return { articles };
            });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        });
    },[]);

    return (
        <div>
            {
                state.articles.map(props.children)
            }
        </div>
    )
}