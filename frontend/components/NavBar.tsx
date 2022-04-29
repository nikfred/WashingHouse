import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, ORDER_ROUTE} from "../utils/consts";
import Link from "next/link";
import {useTypedSelector} from "../hooks/useTypedSelector";

const style = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 auto',
    fontSize: '28px',
    width: '70%'
};

const NavBar = () => {
    const {user, isAdmin, isAuth} = useTypedSelector(state => state.user)

    return (
        <Navbar bg="dark" variant="dark" className="px-md-5">
            <Container style={style}>
                <Link href="/">Washing House</Link>
                {isAuth ?
                    isAdmin ?
                        <Nav className="ml-auto" style={{display: "flex", gap: 20}}>
                            <Link href={ADMIN_ROUTE}>Admin</Link>
                            <Link href={ACCOUNT_ROUTE}>Account</Link>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{display: "flex", gap: 20}}>
                            <Link href={ORDER_ROUTE}>Orders</Link>
                            <Link href={ACCOUNT_ROUTE}>{'Account ' + user.balance + '₴'}</Link>
                        </Nav>
                    :
                    <Nav className="ml-auto">
                        <Link href={LOGIN_ROUTE}>Auth</Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;