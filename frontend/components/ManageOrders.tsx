import React, {useEffect, useState} from 'react';
import {Accordion, Col, Spinner} from "react-bootstrap";
import {fetchAllOrdersAdmin} from "../http/userAPI";
import OrderItem from "./OrderItem";

const ManageOrders = () => {

    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchAllOrdersAdmin()
            .then(data => setOrders(data))
            .finally(() => setLoading(false))

    }, [])

    if (loading) {
        return <div className="m-5 text-center">
            <Spinner animation="border" variant="dark"/>
        </div>
    }

    return (
        <Col className='p-4'>
            <Accordion>
                {orders.map(order =>
                    <OrderItem order={order}/>
                )}
            </Accordion>
        </Col>
    );
};

export default ManageOrders;