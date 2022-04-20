import React, {useState} from 'react';
import {fetchUser, login} from "../http/userAPI";
import {setUserAction} from "../store/userReducer";
import {COLORS, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import Link from "next/link";

const Login = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            await login(email, password);
            const data = await fetchUser();
            dispatch(setUserAction(data))
            await router.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-lg-5"
        >
            <Card style={{
                width: '600px', borderRadius: '20px', backgroundColor: COLORS.black,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', color: 'white'
            }} className="p-5">
                <h2 className="m-auto" style={{color: "white"}}>Login</h2>
                <Form className="d-flex flex-column">
                    <FormControl
                        className="mt-3"
                        placeholder="Enter e-mail..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter password..."
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex mt-3 px-2">
                        <div className="d-flex justify-content-between">
                            <div>Don't have an account?</div> <Link href={REGISTRATION_ROUTE}>Register...</Link>
                        </div>
                        <Button variant="outline-light" className="mt-3" onClick={click}>
                            Log in
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;