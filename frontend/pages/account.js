import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, logout, updateUser} from "../http/userAPI";
import {logoutAction, setUserAction} from "../store/userReducer";
import {useRouter} from "next/router";
import {MAIN_ROUTE} from "../utils/consts";

const Account = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const router = useRouter()
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)

    const exit = () => {
        dispatch(logoutAction())
        router.push(MAIN_ROUTE)
        logout().then(() => {
        })
    }

    const update = () => {
        updateUser({firstname, lastname})
            .then(() => fetchUser()
                .then(data => dispatch(setUserAction(data))))
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-3">
                <Col md={4}>
                    <Form>
                        <FormControl
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            className="mb-3"
                            placeholder={firstname}
                        />
                        <FormControl
                            value={lastname}
                            onChange={e => setLastname(+e.target.value)}
                            className="mb-3"
                            placeholder={lastname}
                        />
                    </Form>
                    <div className='d-flex gap-2'>
                        <Button variant='danger' className='w-50' onClick={exit}>
                            Выйти
                        </Button>
                        <Button variant='dark' className='w-50' onClick={update}
                                disabled={firstname === user.firstname && lastname === user.lastname}>
                            Обновить
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Account;