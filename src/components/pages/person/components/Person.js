import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';

// Apis
import userApi from '../../../../api/userApi';
import articleApi from '../../../../api/articleApi';

// images
import location from '../../../../images/location.svg';
import heart from '../../../../images/heart.svg';
import comment from '../../../../images/comment.svg';

// CSS
import '../styles/style.css';

export default function Person(props) {
    let { _userId } = useParams();
    let [state, setState] = useState({ user: null, articles: [] });

    // Lấy thông tin user và bài viết của người đó
    useEffect(() => {
        articleApi.getCurrentUser(_userId).then(({ success, currentUser }) => {
            if (!success || !currentUser) {
                throw new Error();
            }

            articleApi.getArticleByUser(_userId).then(({ success, articles }) => {
                // debugger;
                if (!success || !articles) {
                    throw new Error();
                }

                setState(currentState => {
                    return { user: currentUser, articles };
                });
            }).catch(error => {
                console.log('Có lỗi xảy ra');
                return;
            })
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }, []);

    if (!state.user) {
        return <div></div>
    } else {
        // console.log(state.user.friends.length);
        return (
            <Container>
                <Row className="border-bottom py-3">
                    <Col className="d-none d-md-block" md="4">
                        <img src={state.user.avatar} className="rounded-circle" style={{ height: 100 + 'px', width: 100 + 'px' }} />
                    </Col>
                    <Col sm="12" md="8">
                        <h1>{state.user.name}</h1>
                        <ul>
                            <li><p><span className="font-weight-bold">{state.articles.length}</span> bài viết</p></li>
                            <li><p><span className="font-weight-bold">{state.user.friends.length}</span> bạn</p></li>
                        </ul>
                    </Col>
                </Row>
                <Row className="py-3">
                    {
                        state.articles.map(item => {
                            return <Col sm="6" md="4">
                                <div className="article-wrapper">
                                    <img width="100%" src={`http://localhost:5000/${item._doc.image}`} />
                                    <div className="article-wrapper__content">
                                        <p className="font-weight-bold text-white"><span className="mr-2"><img src={heart} style={{height: 30 + 'px', width: 30 + 'px'}} /></span>{item._doc.likes.length}</p>
                                        <p className="font-weight-bold text-white"><span className="mr-2"><img src={comment} style={{height: 30 + 'px', width: 30 + 'px'}} /></span>{item.countComment}</p>
                                    </div>
                                </div>
                            </Col>
                        })
                    }
                </Row>
            </Container>
        );
    }
}