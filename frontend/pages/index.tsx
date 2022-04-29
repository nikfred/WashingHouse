import {Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import WashhouseList from "../components/WashhouseList";
import {COLORS} from "../utils/consts";
import {check, fetchUser} from "../http/userAPI";
import {useActions} from "../hooks/useActions";
import {wrapper} from "../store";
import {fetchWashhouses, setWashhouses} from "../store/actions-creators/washhouse";
import {END} from "redux-saga";

export default function Home({washhouses}) {
    const {setUser, setWashhouses} = useActions()
    setWashhouses(washhouses)

    useEffect(() => {
        check().then(() => {
            fetchUser().then(data => setUser(data))
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

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    if (!store.getState().washhouse.washhouses[0]) {
        store.dispatch(fetchWashhouses());
        store.dispatch(END);
    }

    await store.sagaTask?.toPromise();
});

// export async function getStaticProps(context) {
//     const washhouses = await fetchAllWashhouses()
//     return {
//         props: {washhouses}
//     }
// }
