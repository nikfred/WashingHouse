import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import AddService from "../components/AddService";
import {COLORS} from "../utils/consts";
import AddWashhouse from "../components/AddWashhouse";
import ManageOrders from "../components/ManageOrders";

const Admin = () => {
    const [page, setPage] = useState('Add Service')

    return (
        <Container>
            <Row>
                <Col md={{span: 2, offset: 1}}>
                    <Container className="d-flex flex-column mt-3">
                        <Button className="mt-2" variant="dark" onClick={() => setPage('Add Service')}>
                            Add Service</Button>
                        <Button className="mt-2" variant="dark" onClick={() => setPage('Add Washhouse')}>
                            Add Washhouse</Button>
                        <Button className="mt-2" variant="dark" onClick={() => setPage('Manage Orders')}>
                            Manage Orders</Button>
                    </Container>
                </Col>

                <Col md={9} className="d-flex justify-content-center mt-3">
                    <Container>
                        <div className="mt-2 align-items-center"
                             style={{
                                 height: '100 %',
                                 backgroundColor: 'white',
                                 borderRadius: '10px',
                             }}>
                            <div style={{
                                width: "100%",
                                fontSize: '30px',
                                backgroundColor: COLORS.black,
                                borderRadius: "10px 10px 0 0",
                                color: "white",
                                textAlign: "center",
                                fontFamily: 'Bebas Neue'
                            }}>
                                {page}
                            </div>

                            {page === 'Add Service' ?
                                <AddService/>
                                : page === 'Add Washhouse' ?
                                    <AddWashhouse/>
                                    : page === 'Manage Orders' ?
                                        <ManageOrders/>
                                            : ''
                            }
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;