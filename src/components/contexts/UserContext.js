import React, { useEffect, useState, Component } from 'react';

import userApi from '../../api/userApi';

export const UserContext = React.createContext();

export default function UserProvider(props) {
    let [state, setState] = useState({ user: null });
    // ComponentdidMount 
    useEffect(() => {
        userApi.getUser().then(({ success, user }) => {
            if (!success || !user) {
                throw new Error();
            }

            setState(current => {
                return { user };
            });
        }).catch(error => {
            console.log('Có lỗi xảy ra');
            return;
        });
    }, []);

    return (
        <UserContext.Provider value={{ user: state.user }}>
            {props.children}
        </UserContext.Provider>
    );
}