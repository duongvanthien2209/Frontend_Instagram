import React, { useState } from 'react';

import { Container, Form, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import userApi from '../../../../api/userApi';

import '../../login/styles/style.css';

export default function Register(props) {
    let [state, setState] = useState({ email: '', name: '', password: '', isComplete: false });

    const onClick = async () => {
        let { email, name, password } = state;

        let { success } = await userApi.create({ email, name, password });

        if(!success) {
            console.log('Có lỗi xảy ra');
            return;
        }

        setState(state => {
            return { isComplete: !state.isComplete };
        });
    }

    const onChangeEmail = (evt) => {
        let email = evt.target.value;

        setState(state => {
            return { ...state, email };
        });
    }

    const onChangeName = (evt) => {
        let name = evt.target.value;

        setState(state => {
            return { ...state, name };
        });
    }

    const onChangePassword = (evt) => {
        let password = evt.target.value;

        setState(state => {
            return { ...state, password };
        });
    }

    return (
        <Container>
            {
                state.isComplete && <Redirect to={{
                    pathname: '/login'
                }} />
            }
            <Form className="form-login">
                <h1>Instagram</h1>
                <Input className="my-1" type="text" name="email" onChange={onChangeEmail} placeholder="Số điện thoại, tên người dùng hoặc email" value={state.email} />
                <Input className="my-1" type="text" name="name" onChange={onChangeName} placeholder="Tên đầy đủ" value={state.name} />
                <Input className="my-1" type="password" name="password" onChange={onChangePassword} placeholder="Mật khẩu" value={state.password} />
                <Button className="my-2" color="primary" block onClick={onClick}>Đăng ký</Button>
            </Form>
            <div className="register">
                <p>Bạn có tài khoản? <a className="font-weight-bold text-primary" href="/login">Đăng nhập</a></p>
            </div>
        </Container>
    );
}