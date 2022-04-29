import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import {COLORS, WASHHOUSE_ROUTE} from "../utils/consts";

const WashhouseItem = ({washhouse}) => {

    return (
        <Col md={3}>
            <Link href={`${WASHHOUSE_ROUTE}/${washhouse.id}`}>
                <Card style={{
                    cursor: 'pointer',
                    borderWidth: 5,
                    borderColor: COLORS.black
                }} className='mt-3'>
                    <div className="d-flex justify-content-center" style={{height: "180px"}}>
                        <Image
                               style={{borderRadius: "0px", width: "100%", height: "auto"}}
                               src={washhouse.images[0] || "https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-hand-painted-washing-machine-white-washing-machine-illustration-washing-machine-illustration-png-image_456282.jpg"}/>
                    </div>
                    <p className="mb-auto" style={{
                        color: 'white', backgroundColor: COLORS.black, fontSize: '18px',
                        height: "70px", padding: "10px",
                        fontFamily: 'Montserrat Alternates',
                        textAlign: "center"
                    }}>{washhouse.address}</p>
                </Card>
            </Link>
        </Col>
    );
};

export default WashhouseItem;