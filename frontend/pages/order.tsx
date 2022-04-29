import React, {useEffect, useState} from 'react';
import {Accordion, Col, Container, Row, Spinner} from "react-bootstrap";
import {fetchAllOrders} from "../http/userAPI";
import OrderItem from "../components/OrderItem";
import {useRouter} from "next/router";
import {MAIN_ROUTE} from "../utils/consts";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Order = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const {isAuth} = useTypedSelector(state => state.user)
    const router = useRouter()

    useEffect(() => {
        if (!isAuth) {
            router.push(MAIN_ROUTE)
        }
        fetchAllOrders()
            .then(data => setOrders(data))
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return <div className="mt-5 text-center">
            <Spinner animation="border" variant="dark"/>
        </div>

    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-3">
                <Col md={6}>
                    <Accordion>
                        {orders.map(order =>
                            <OrderItem order={order}/>
                        )}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
};

export default Order;