import React from 'react';
import {Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import WashhouseItem from "./WashhouseItem";

const WashhouseList = () => {

    const washhouses = useSelector(state => state.washhouse.washhouses)

    return (
        <Row className="d-flex">
            {washhouses.map(washhouse =>
                <WashhouseItem key={washhouse.id} washhouse={washhouse}/>
            )}
        </Row>
    );
};

export default WashhouseList;