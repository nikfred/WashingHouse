import React, {useEffect, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {COLORS} from "../utils/consts";
import {useDispatch} from "react-redux";
import {
    clearSelectedAction,
    removeServiceAction,
    selectServiceAction,
} from "../store/washhouseReducer";

const style = {
    color: 'white',
    backgroundColor: COLORS.black
}

const ServiceItem = ({service, interactive = false}) => {
    const [select, setSelect] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearSelectedAction())
    }, [])

    const onClick = () => {
        if (interactive) {
            if (select) {
                dispatch(removeServiceAction(service))
            } else {
                dispatch(selectServiceAction(service))
            }
            setSelect(!select)
        }
    }

    return (
        <ListGroup.Item className="d-flex w-100 px-4 justify-content-between"
                        style={select ? style : {}} action
                        key={service._id}
                        onClick={onClick}>
            <div>{service.name}</div>
            <div>{service.price}</div>
        </ListGroup.Item>
    );
};

export default ServiceItem;