import React, { useState } from 'react';
import '../styles/style.css';

import { Container, Form, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import authApi from '../../../../api/authApi';

export default function Login(props) {
    const [state, setState] = useState({ email: '', password: '', isLogin: false });

    const onClick = async () => {
        let { email, password } = state;
        try {
            let { success, token } = await authApi.getToken({ email, password });

            if(!success || !token) {
                console.log('Có lỗi xảy ra');
                return;
            }

            localStorage.setItem('token', token);
            setState(state => {
                return { isLogin: !state.isLogin };
            });
        } catch (error) {
            console.log('Có lỗi xảy ra');
        }
    };

    const onChangeEmail = (event) => {
        let email = event.target.value;

        setState(state => {
            return { ...state, email };
        });
    };

    const onChangePassword = (event) => {
        let password = event.target.value;

        setState(state => {
            return { ...state, password };
        });
    }

    return (
        <Container>
            {
                state.isLogin && <Redirect to={{
                    pathname: '/'
                }} />
            }
            <Form className="form-login">
                <h1>Instagram</h1>
                <Input className="my-1" type="text" name="email" placeholder="Số điện thoại, tên người dùng hoặc email" onChange={onChangeEmail} value={state.email} />
                <Input className="my-1" type="password" name="password" placeholder="Mật khẩu" onChange={onChangePassword} value={state.password} />
                <Button className="my-2" color="primary" block onClick={onClick}>Đăng nhập</Button>
                <p className="text-uppercase">HOẶC</p>
                <a href="#">Quên mật khẩu?</a>
            </Form>
            <div className="register">
                <p>Bạn không có tài khoản <a className="font-weight-bold text-primary" href="/register">Đăng ký</a></p>
            </div>
        </Container>
    );
}