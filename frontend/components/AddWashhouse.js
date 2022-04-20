import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Container, Form, FormControl, ListGroup, Row} from "react-bootstrap";
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiFillEdit, AiFillPlusCircle,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlinePlusCircle
} from "react-icons/ai";
import {
    createWashhouse,
    fetchAllServices,
    fetchAllWashhouses,
    fetchOneWashhouse,
    removeWashhouse,
    updateWashhouse, updateWashhouseServices
} from "../http/washhouseAPI";
import ServiceItem from "./ServiceItem";
import {useDispatch, useSelector} from "react-redux";
import {clearSelectedAction} from "../store/washhouseReducer";
import {COLORS} from "../utils/consts";
import Image from "react-bootstrap/Image";

const iconStyle = {
    fontSize: 36, margin: '4px 8px', cursor: 'pointer'
}

const AddWashhouse = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const [services, setServices] = useState([])
    const selected = useSelector(state => state.washhouse.selectedServices)

    const [washhouses, setWashhouses] = useState([])
    const [edit, setEdit] = useState(null)
    const [editServices, setEditServices] = useState(null)
    const [editImages, setEditImages] = useState([])
    const [addServices, setAddServices] = useState([])
    const [removeServices, setRemoveServices] = useState([])
    const [removeImg, setRemoveImg] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const add = () => {
        const formData = new FormData()
        formData.append('address', address)
        formData.append('description', description)
        selected.forEach(service => formData.append('services', service))
        formData.append('img', file)
        createWashhouse(formData)
            .then(() => fetchAllWashhouses()
                .then(data => {
                    setAddress('')
                    setDescription('')
                    setWashhouses(data)
                    dispatch(clearSelectedAction())
                }))
            .catch(e => console.log(e))
    }

    const remove = (id) => {
        removeWashhouse(id)
            .then(() => fetchAllWashhouses()
                .then(data => {
                    setWashhouses(data)
                }))
            .catch(e => console.log(e))
    }

    const update = () => {
        const formData = new FormData()
        formData.append('address', address)
        formData.append('description', description)
        file && formData.append('img', file)
        updateWashhouse(edit, formData)
            .then(() => updateWashhouseServices(edit, {add: addServices, remove: removeServices})
                .then(() => fetchAllWashhouses()
                    .then(data => {
                        clear()
                        setWashhouses(data)
                    })))
            .catch(e => console.log(e))
    }

    const addImage = (e) => {
        const formData = new FormData()
        e.target.files[0] && formData.append('img', e.target.files[0])
        updateWashhouse(edit, formData)
            .then(() => {
                startEdit(edit)
            })
            .catch(e => console.log(e))
    }

    const removeImage = (removeImg) => {
        removeImg = 'washhouse' + removeImg.split('washhouse')[1]
        updateWashhouse(edit, {removeImg})
            .then(() => {
                startEdit(edit)
            })
            .catch(e => console.log(e))
    }

    const startEdit = (id) => {
        fetchOneWashhouse(id).then((data) => {
            setEdit(data.washhouse.id)
            setAddress(data.washhouse.address)
            setDescription(data.washhouse.description)
            setEditServices(data.services.map(i => i._id))
            setEditImages(data.washhouse.images)
            setAddServices([])
            setRemoveServices([])
        })
    }

    const clear = () => {
        setAddress('')
        setDescription('')
        setEdit(null)
        setEditServices(null)
        setAddServices([])
        setRemoveServices([])
    }

    useEffect(() => {
        dispatch(clearSelectedAction())
        fetchAllWashhouses().then(data => setWashhouses(data))
        fetchAllServices().then(data => setServices(data))
    }, [])

    return (<Container>
            <Row className='mx-4 my-3'>
                <Col md={6}>
                    <Form>
                        <FormControl
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="mb-3"
                            placeholder="Enter address washhouse..."
                        />
                        <FormControl
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="mb-3"
                            placeholder="Enter description washhouse..."
                        />
                        <Form.Control
                            className="mb-3"
                            type="file"
                            onChange={selectFile}
                        />
                    </Form>
                    {edit ? <div className='d-flex gap-2'>
                        <Button className='w-50' variant="dark" onClick={update}>Update</Button>
                        <Button className='w-50' variant="dark" onClick={clear}>Cancel</Button>
                    </div> : <Button className='w-100' variant="dark" onClick={add}>Add</Button>}
                </Col>
                {/*===================================================*/}
                <Col md={6}>
                    <ListGroup>
                        {services.map(service =>
                            <div className='d-flex justify-content-between align-items-center'>
                                <ServiceItem key={service._id} service={service} interactive={!edit && address[0]}/>
                                {edit
                                    ? editServices.indexOf(service._id) !== -1
                                        ? removeServices.indexOf(service._id) !== -1
                                            ? <AiFillCloseCircle style={iconStyle}
                                                                 onClick={() => setRemoveServices(removeServices.filter(i => i !== service._id))}/>
                                            : <AiOutlineCheckCircle style={iconStyle}
                                                                    onClick={() => setRemoveServices([...removeServices, service._id])}/>
                                        : addServices.indexOf(service._id) !== -1
                                            ? <AiFillCheckCircle style={iconStyle}
                                                                 onClick={() => setAddServices(addServices.filter(i => i !== service._id))}/>
                                            : <AiOutlinePlusCircle style={iconStyle}
                                                                   onClick={() => setAddServices([...addServices, service._id])}/>
                                    : ''}
                            </div>
                        )}
                    </ListGroup>
                </Col>

            </Row>

            {edit &&
                <Row className='mx-4 my-3'>
                    <hr/>
                    <Col md={12}>
                        <div className='d-flex mt-3 gap-2'>
                            {editImages.map(image =>
                                <Card style={{
                                    height: 100, width: 100, backgroundColor: COLORS.black, padding: 10
                                }}>
                                    <AiFillCloseCircle style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        fontSize: 20,
                                        cursor: 'pointer'

                                    }} onClick={() => removeImage(image)}/>
                                    <Image src={image} style={{maxHeight: '100%', width: "auto"}}/>
                                </Card>
                            )}

                            <Card style={{
                                height: 100, width: 100, backgroundColor: COLORS.black, padding: 10
                            }}>
                                <input type="file" id="add" className='visually-hidden' onChange={addImage}/>
                                <label htmlFor="add" style={{
                                    color: 'white',
                                    fontSize: 60,
                                    margin: "auto",
                                    lineHeight: 0,
                                    padding: 10,
                                    cursor: 'pointer'
                                }}><AiFillPlusCircle/></label>
                            </Card>

                        </div>
                    </Col>
                </Row>
            }


            <Row className='mx-4 py-3'>
                <hr/>
                <Col md={12}>
                    <ListGroup>
                        {washhouses.map(washhouse =>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div onClick={() => startEdit(washhouse.id)}>
                                    <AiFillEdit style={{fontSize: 30, margin: '4px 8px', cursor: 'pointer'}}/>
                                </div>

                                <ListGroup.Item className="d-flex w-100 justify-content-between"
                                                key={washhouse.id}>
                                    {washhouse.address}
                                </ListGroup.Item>

                                <div onClick={() => remove(washhouse.id)}>
                                    <AiOutlineCloseCircle style={iconStyle}/>
                                </div>
                            </div>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>

    );
};

export default AddWashhouse;