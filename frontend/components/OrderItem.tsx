import React, {useEffect, useState} from 'react';
import {Accordion, Button, FormControl, FormGroup, ListGroup} from "react-bootstrap";
import {
    cancelOrderAdmin,
    completeOrder,
    completeOrderAdmin,
    fetchOrder,
    fetchOrderAdmin,
    readyOrderAdmin, removeServiceInOrderAdmin, updateOrderInfo
} from "../http/userAPI";
import ServiceItem from "./ServiceItem";
import {COLORS} from "../utils/consts";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const statuses = {
    'В обработке': COLORS.yellow,
    'Выполнен': COLORS.green,
    'Завершен': COLORS.gray,
    'Возврат': COLORS.red,
}

const buttonStyle = {
    width: '20%'
}

const OrderItem = (props) => {
    const {clearSelected} = useActions()
    const selected = useTypedSelector(state => state.washhouse.selectedServices)

    const [date, time] = props.order?.date.split('T')
    const [services, setServices] = useState([])
    const [order, setOrder] = useState(props.order)

    const [newDate, setNewDate] = useState(order.date)
    const [newTotal, setNewTotal] = useState(order.total)

    const admin = !!props.order.adminStatus

    useEffect(() => {
        if (admin) {
            fetchOrderAdmin(order.id).then(data => setServices(data.services))
        } else {
            fetchOrder(order.id).then(data => setServices(data.services))
        }
    }, [])

    const ready = () => {
        if (admin) {
            readyOrderAdmin(order.id).then(() => {
                fetchOrderAdmin(order.id).then(data => {
                    setOrder(data.order)
                    setServices(data.services)
                })
            })
        }
    }

    const complete = () => {
        if (admin) {
            completeOrderAdmin(order.id).then(() => {
                fetchOrderAdmin(order.id).then(data => {
                    setOrder(data.order)
                    setServices(data.services)
                })
            })
        } else {
            completeOrder(order.id).then(() => {
                fetchOrder(order.id).then(data => {
                    setOrder(data.order)
                    setServices(data.services)
                })
            })
        }
    }

    const cancel = () => {
        if (admin) {
            const reason = prompt('Причина отмены заказа')
            reason && cancelOrderAdmin(order.id, reason).then(() => {
                fetchOrderAdmin(order.id).then(data => {
                    setOrder(data.order)
                    setServices(data.services)
                })
            })
        }
    }

    const remove = () => {
        if (admin) {
            removeServiceInOrderAdmin(order.id, selected).then(() => {
                fetchOrderAdmin(order.id).then(data => {
                    setOrder(data.order)
                    setServices(data.services)
                })
            })
        }
    }

    const updateInfo = () => {
        updateOrderInfo(order.id, newTotal, newDate).then(() =>
            fetchOrderAdmin(order.id).then(data => {
                setOrder(data.order)
                setServices(data.services)
            }))
            .catch(e => console.log())
    }

    const activeOrder = () => {
        return order.status !== 'Завершен' && order.status !== 'Возврат'
    }

    return (
        <Accordion.Item eventKey={order.id}>
            <Accordion.Header onClick={() => admin && clearSelected()}>
                <div style={{
                    borderRadius: 5,
                    color: statuses[order.status],
                    padding: 10,
                    marginRight: 10,
                    fontWeight: 'bold',
                    fontSize: 20
                }}>{admin ? order.adminStatus : order.status}</div>

                <div>
                    {date} {time.split('.')[0]} {admin && `- ${order.firstname} ${order.lastname} ${order.email}`}
                </div>

                <div style={{
                    backgroundColor: COLORS.black,
                    color: 'white',
                    borderRadius: 5,
                    padding: '5px 10px',
                    marginLeft: 10
                }}>{order.total} ₴</div>
            </Accordion.Header>

            <Accordion.Body>

                {admin &&
                    <div className='d-flex my-3 justify-content-around'>
                        <Button variant="success" style={buttonStyle} onClick={ready}
                                disabled={order.status !== 'В обработке'}>
                            Готов к выдаче</Button>
                        <Button variant="secondary" style={buttonStyle} onClick={complete} disabled={!activeOrder()}>
                            Завершить заказ</Button>
                        <Button variant="danger" style={buttonStyle} onClick={cancel} disabled={!activeOrder()}>
                            Отменить</Button>
                        <Button variant="dark" style={buttonStyle} onClick={remove}
                                disabled={!selected[0] || !activeOrder()}>
                            Удалить услуги</Button>
                    </div>
                }

                <ListGroup>
                    {services.map(service =>
                        <ServiceItem service={service} interactive={admin && activeOrder()}/>
                    )}
                </ListGroup>

                {order.status === 'Выполнен' && !admin &&
                    <Button variant="success" className='mt-2' onClick={complete}>Завершить заказ</Button>
                }
                {order.cancelReason &&
                    <div className='m-2'>Причина отказа: {order.cancelReason}</div>
                }

                {admin &&
                    <FormGroup className="mt-3 d-flex justify-content-around align-items-center">
                        <FormControl
                            value={newTotal}
                            onChange={e => setNewTotal(e.target.value)}
                            className="w-25"
                            placeholder={newTotal}
                            type="number"
                        />
                        <FormControl
                            value={newDate}
                            onChange={e => setNewDate(e.target.value)}
                            className="w-25"
                            placeholder={date}
                            type="date"
                        />
                        <Button variant="dark" onClick={updateInfo}>Обновить информацию</Button>
                    </FormGroup>
                }

            </Accordion.Body>
        </Accordion.Item>
    );
};

export default OrderItem;