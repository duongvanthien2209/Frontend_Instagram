import React, { useState, useEffect, useContext } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Apis
import articleApi from '../../../../api/articleApi';

export default function AddArticle(props) {
    let [state, setState] = useState({ description: '', file: null });

    const onChangeDescription = (evt) => {
        let value = evt.target.value;

        setState(currentState => {
            return { ...state, description: value }
        });
    }

    const onChangeFile = (evt) => {
        let file = evt.target.files[0];

        // console.log(file);
        setState(currentState => {
            return { ...state, file }
        });
    }

    const onClick = async () => {
        let formdata = new FormData();

        formdata.append('image', state.file);
        formdata.append('description', state.description);

        try {
            let { success } = await articleApi.add(formdata);   
            
            if(!success) {
                throw new Error();
            }

            setState(currentState => {
                return { description: '', file: null }
            });
        } catch (error) {
            console.log('Có lỗi xảy ra');
            return;
        }
    }

    return (
        <Form className="p-2 border">
            <h1>Thêm bài viết</h1>
            <FormGroup>
                <Label for="description">Bài viết</Label>
                <Input type="textarea" name="description" id="description" value={state.description} onChange={onChangeDescription} />
            </FormGroup>
            <FormGroup>
                <Label for="image">Chọn ảnh</Label>
                <Input type="file" name="image" id="image" onChange={onChangeFile} />
            </FormGroup>
            <Button color="success" onClick={onClick}>Đăng</Button>
        </Form>
    );
}