import {Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {fetchAllWashhouses} from "../http/washhouseAPI";
import {useDispatch} from "react-redux";
import {setWashhousesAction} from "../store/washhouseReducer";
import WashhouseList from "../components/WashhouseList";
import {COLORS} from "../utils/consts";
import {check, fetchUser} from "../http/userAPI";
import {setUserAction} from "../store/userReducer";

export default function Home({washhouses}) {

    const dispatch = useDispatch()
    dispatch(setWashhousesAction(washhouses))

    useEffect(() => {
        check().then(() => {
            fetchUser().then(data => dispatch(setUserAction(data)))
        }).catch(e => console.log(e))
    }, [])

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8} style={{backgroundColor: COLORS.gray}}>
                    <WashhouseList/>
                </Col>
            </Row>
        </Container>
    )
}

export async function getStaticProps(context) {
    const washhouses = await fetchAllWashhouses()
    return {
        props: {washhouses}
    }
}
