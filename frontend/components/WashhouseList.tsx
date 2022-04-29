import React from 'react';
import {Row} from "react-bootstrap";
import WashhouseItem from "./WashhouseItem";
import {useTypedSelector} from "../hooks/useTypedSelector";

const WashhouseList = () => {

    const {washhouses} = useTypedSelector(state => state.washhouse)

    return (
        <Row className="d-flex">
            {washhouses?.map(washhouse =>
                <WashhouseItem key={washhouse.id} washhouse={washhouse}/>
            )}
        </Row>
    );
};

export default WashhouseList;