import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Button } from 'reactstrap';

// CSS
import '../styles/style.css';

// Contexts
import { UserContext } from '../../../contexts/UserContext';

// Api
import userApi from '../../../../api/userApi';

export default function Person_Friends(props) {
    let [state, setState] = useState({ recommentFriends: [] });
    let { user } = useContext(UserContext);

    useEffect(() => {
        // Lấy danh sách những người chưa kết bạn
        userApi.getNoFriends().then(({ success, friends }) => {
            if (!success || !friends) {
                throw new Error();
            }

            setState(state => {
                return {
                    recommentFriends: friends
                };
            });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }, []);

    const onclick = (item) => {
        // -  Thêm bạn vào database -> Thêm friends thay đổi state
        userApi.addFriend(item._id).then(({ success }) => {
            if (!success) {
                throw new Error();
            }

            let index = state.recommentFriends.indexOf(item);

            setState(currentState => {
                return {
                    recommentFriends: [...state.recommentFriends.splice(index, 1)]
                };
            });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        });
    }

    if (!user) {
        return (<div></div>);
    } else {
        return (
            <div>
                <div className="person-friends__top">
                    <img className="rounded-circle mr-2" src={user.avatar} style={{ height: 50 + 'px', width: 50 + 'px' }} />
                    <div className="person-friends__top__content">
                        <p className="font-weight-bold">{user.email}</p>
                        <p className="text-muted">{user.name}</p>
                    </div>
                </div>
                <div className="person-friends__bottom">
                    <p>Gợi ý cho bạn</p>
                    <ul>
                        {
                            // item - { isFriend: true/false }
                            state.recommentFriends.map(item => <li className="person-friends__item">
                                <img className="rounded-circle mr-2" src={item.avatar} style={{ height: 30 + 'px', width: 30 + 'px' }} />
                                <div className="person-friends__item__content">
                                    <p className="font-weight-bold">{item.name}</p>
                                    <p className="text-muted">{item.email}</p>
                                </div>
                                <Button size="sm" color="primary" onClick={() => onclick(item)}>Kết bạn</Button>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}