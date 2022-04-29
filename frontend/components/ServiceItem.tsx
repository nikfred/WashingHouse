import React, {useEffect, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {COLORS} from "../utils/consts";
import {useActions} from "../hooks/useActions";

const style = {
    color: 'white',
    backgroundColor: COLORS.black
}

const ServiceItem = ({service, interactive = false}) => {
    const {clearSelected, removeService, selectService} = useActions()
    const [select, setSelect] = useState(false)

    useEffect(() => {
        clearSelected()
    }, [])

    const onClick = () => {
        if (interactive) {
            if (select) {
                removeService(service)
            } else {
                selectService(service)
            }
            setSelect(!select)
        }
    }

    return (
        <ListGroup.Item className="d-flex w-100 px-4 justify-content-between"
                        style={select ? style : {backgroundColor: COLORS.white}} action
                        key={service._id}
                        onClick={onClick}>
            <div>{service.name}</div>
            <div>{service.price}</div>
        </ListGroup.Item>
    );
};

export default ServiceItem;