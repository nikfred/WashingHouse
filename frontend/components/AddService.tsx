import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormControl, ListGroup, Row} from "react-bootstrap";
import {createService, fetchAllServices, removeService, updateService} from "../http/washhouseAPI";
import ServiceItem from "./ServiceItem";
import {AiFillEdit, AiOutlineCloseCircle} from 'react-icons/ai';

const AddService = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [services, setServices] = useState([])
    const [edit, setEdit] = useState(null)

    const add = () => {
        createService({name, price})
            .then(() => fetchAllServices()
                .then(data => {
                    clear()
                    setServices(data)
                }))
            .catch(e => console.log(e))
    }

    const remove = (id) => {
        removeService(id)
            .then(() => fetchAllServices()
                .then(data => {
                    setServices(data)
                }))
            .catch(e => console.log(e))
    }

    const update = () => {
        updateService(edit, {name, price})
            .then(() => fetchAllServices()
                .then(data => {
                    clear()
                    setServices(data)
                }))
            .catch(e => console.log(e))
    }

    const clear = () => {
        setEdit(null)
        setName('')
        setPrice(0)
    }

    useEffect(() => {
        fetchAllServices().then(data => setServices(data))
    }, [])


    return (
        <Row className='p-4'>
            <Col md={6}>
                <Form>
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mb-3"
                        placeholder="Enter name service..."
                    />
                    <FormControl
                        value={price}
                        onChange={e => setPrice(+e.target.value)}
                        className="mb-3"
                        placeholder="Enter price service..."
                        type="number"
                    />
                </Form>
                {edit ?
                    <div className='d-flex gap-2'>
                        <Button className='w-50' variant="dark" onClick={update}>Update</Button>
                        <Button className='w-50' variant="dark" onClick={clear}>Cancel</Button>
                    </div>
                    :
                    <Button className='w-100' variant="dark" onClick={add}>Add</Button>
                }
            </Col>

            <Col md={6}>
                <ListGroup>
                    {services.map(service =>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div onClick={() => {
                                setEdit(service._id)
                                setName(service.name)
                                setPrice(service.price)
                            }}>
                                <AiFillEdit style={{fontSize: 30, margin: '4px 8px', cursor: 'pointer'}}/>
                            </div>
                            <ServiceItem key={service._id} service={service}/>
                            <div onClick={() => remove(service._id)}>
                                <AiOutlineCloseCircle style={{fontSize: 36, margin: '4px 8px', cursor: 'pointer'}}/>
                            </div>
                        </div>
                    )}
                </ListGroup>
            </Col>
        </Row>
    );
};

export default AddService;

