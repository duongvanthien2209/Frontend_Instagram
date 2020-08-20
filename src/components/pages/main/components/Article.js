import React, { useState, useEffect, useContext } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Input
} from 'reactstrap';

import { Link } from 'react-router-dom';

// Style
import '../styles/style.css';

// Contexts
import { UserContext } from '../../../contexts/UserContext';

// Apis
import articleApi from '../../../../api/articleApi';
import commentApi from '../../../../api/commentApi';

// Images
import heart from '../../../../images/heart.svg';
import heart1 from '../../../../images/heart1.svg';

export default function Article(props) {
    let { user } = useContext(UserContext);
    let { article } = props;
    let [state, setState] = useState({
        currentUser: null,
        isLike: !!(article.likes.find(item => item === user._id)),
        countLike: article.likes.length,
        comments: [],
        currentComment: ''
    });

    useEffect(() => {
        // Lấy chủ bài viết
        articleApi.getCurrentUser(article._userId).then(({ success, currentUser }) => {
            // debugger;
            if (!success || !currentUser) {
                throw new Error();
            }

            // Lấy các comment của bài viết cùng với tên người comment
            commentApi.getComment(article._id).then(({ success, comments }) => {
                // Viết Route comment - với userId thành tên của người viết comment
                // debugger;
                if (!success || !comments) {
                    throw new Error();
                }

                setState(currentState => {
                    return { ...state, comments, currentUser };
                });
            }).catch(error => {
                // throw new Error();
                console.log('Có lỗi xảy ra');
                return;
            });
            // setState(curentState => {
            //     return { ...state, currentUser }
            // });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }, []);

    const onChangeComment = (evt) => {
        let value = evt.target.value;

        setState(currentState => {
            return { ...state, currentComment: value }
        });
    }

    const addComment = () => {
        // let formData = new FormData();
        // formData.append('text', state.currentComment);

        commentApi.addComment(article._id, state.currentComment).then(({ success, comment }) => {
            // debugger;
            if(!success || !comment) {
                throw new Error();
            }

            setState(currentState => {
                return { ...state, comments: [...state.comments, comment] }
            });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        });
    }

    const addLike = (evt) => {
        evt.preventDefault();

        articleApi.addLike(article._id).then(({ success }) => {
            // debugger;
            if(!success) {
                throw new Error();
            }

            setState(currentState => {
                return { ...state, isLike: !state.isLike, countLike: state.countLike + (state.isLike?-1:1) }
            });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }

    if (!state.currentUser) {
        return (<div></div>);
    } else {
        return (
            <div>
                <Card className="my-2">
                    <CardHeader>
                        <div className="article__header">
                            <img src={state.currentUser.avatar} className="rounded-circle mr-2" style={{ height: 40 + 'px', width: 40 + 'px' }} />
                            {/* <p>{state.currentUser.name}</p> */}
                            <Link to={`/person/${state.currentUser._id}`}>{state.currentUser.name}</Link>
                        </div>
                    </CardHeader>
                    <img width="100%" src={"http://localhost:5000/" + article.image} />
                    <CardBody>
                        <div className="article__body">
                            <div className="article__body__likes">
                                <a href="#" onClick={addLike}><img src={state.isLike?heart1:heart} style={{height: 30 + 'px', width: 30 + 'px'}} /></a>
                            </div>
                            <p className="font-weight-bold">{`${state.countLike} lượt thích`}</p>
                            <ul>
                                {
                                    state.comments.map(item => {
                                    return (<li>
                                        <p><span className="font-weight-bold mr-1">{item.userName}</span>{item._doc.text}</p>
                                    </li>)})
                                }
                            </ul>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="article__footer">
                            <Input type="text" name="comment" placeholder="Thêm bình luận" onChange={onChangeComment} value={state.currentComment} />
                            <Button outline color="success" onClick={addComment}>Đăng</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}