import React, {useState} from 'react';
import {Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneWashhouse} from "../../http/washhouseAPI";
import Image from "react-bootstrap/Image";
import {COLORS, LOGIN_ROUTE} from "../../utils/consts";
import ServiceItem from "../../components/ServiceItem";
import {useRouter} from "next/router";
import {createOrder, fetchUser} from "../../http/userAPI";
import {clearSelectedAction} from "../../store/washhouseReducer";
import {setUserAction} from "../../store/userReducer";

const buttonStyle = {
    cursor: 'pointer',
    color: 'white',
    backgroundColor: COLORS.black,
    borderRadius: 5,
}

const Washhouse = ({washhouse, services}) => {

    const dispatch = useDispatch()
    const router = useRouter()
    const selected = useSelector(state => state.washhouse.selectedServices)
    const total = useSelector(state => state.washhouse.total)
    const user = useSelector(state => state.user.user)
    const isAuth = useSelector(state => state.user.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const [img, setImg] = useState(0)

    const click = () => {
        const order = {washhouse_id: washhouse.id, services: selected}
        createOrder(order).then(() => {
            fetchUser().then((data) => {
                dispatch(setUserAction(data))
                dispatch(clearSelectedAction())
            })
        })
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={{span: 4, offset: 2}}>
                    <Card style={{
                        height: '400px', backgroundColor: COLORS.black,
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }} className='d-flex justify-content-center align-items-center'>
                        <div className='d-flex justify-content-center'
                             style={{
                                 height: 350,
                                 width: 350
                             }}>
                            <Image style={{borderRadius: 5, width: "100%"}}
                                   src={washhouse?.images[img] || "https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-hand-painted-washing-machine-white-washing-machine-illustration-washing-machine-illustration-png-image_456282.jpg"}/>
                        </div>
                    </Card>

                    <div className='d-flex mt-2 gap-2'>
                        {washhouse.images.map(image =>
                            <Card style={{
                                height: 100, width: 100, backgroundColor: COLORS.black, padding: 10
                            }} onClick={() => setImg(washhouse.images.indexOf(image))}>
                                <Image src={image} style={{maxHeight: '100%', width: "auto"}}/>
                            </Card>
                        )}
                    </div>
                </Col>

                <Col md={3}>
                    <Card className='px-4 py-2 mb-3 text-center' style={{color: 'white', backgroundColor: COLORS.black}}>
                        {washhouse.address}
                    </Card>
                    <ListGroup>
                        {services.map(service =>
                            <ServiceItem service={service} interactive={!isAdmin}/>
                        )}
                    </ListGroup>
                    {services[0]
                        ? selected[0] ?
                            <div className='d-flex px-4 py-2 mt-3 justify-content-between'
                                 style={user?.balance < total ? {...buttonStyle, backgroundColor: 'firebrick'} :buttonStyle}
                                 onClick={isAuth ? click : () => router.push(LOGIN_ROUTE)}
                            >
                                {selected[1] ?
                                    <div>Заказать услуги</div>
                                    :
                                    <div>Заказать услугу</div>
                                }
                                <div>{total}</div>
                            </div>
                            :
                            <Card className='px-4 py-2 mt-3 text-center'>
                                Выберите услугу
                            </Card>
                        : ''
                    }

                    {washhouse.description &&
                        <div className='mt-5' style={{backgroundColor: "white", borderRadius: 5}}>
                            <div style={{color: 'white', backgroundColor: COLORS.black, width: '100%', borderRadius: '5px 5px 0 0', padding: '10px 16px'}}>
                                Описание:
                            </div>
                            <p className='px-3 py-2'>
                                {washhouse.description}
                            </p>
                        </div>

                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Washhouse;

export async function getServerSideProps({params}) {
    const {washhouse, services} = await fetchOneWashhouse(params.id)
    return {
        props: {washhouse, services}
    }
}