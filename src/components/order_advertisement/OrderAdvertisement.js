import React from "react";
import {Link} from "react-router-dom";
import {API_ADVERTISEMENT} from "../../CommonData";
import OrderService from "../../services/OrderService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import AdvertisementService from "../../services/AdvertisementService";
import RedirectTo from "../route/RedirectTo";
import {Carousel, CarouselItem, Col, Container, Form, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagesService from "../../services/ImageService";

class OrderAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            advertisement: null,
            advertisementId: parseInt(this.props.match.params.id),
            orderable: false,
            additionalServices: [],
            selectedAdditionalServices: [],
            totalPrice: 0,
            btnDisable: false,
            imagesIdsList: [],
        }
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.collectAndSendOrder = this.collectAndSendOrder.bind(this);
    }

    componentDidMount() {
        const advertisementId = this.state.advertisementId;
        AdvertisementService.getAdvertisementById(advertisementId)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    advertisement: result,
                    totalPrice: result.price,
                })
                if (result.status === "ACTIVE" && result.type.orderable) {
                    this.setState({
                        orderable: true
                    })
                }
            })

        AdditionalServiceService.getAdditionalServicesByAdvertisementId(advertisementId)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    additionalServices: result
                })
            })

        ImagesService.getImagesList(this.state.advertisementId)
            .then(res => res.json())
            .then(
                (imagesList) => {
                    this.setState({
                        imagesIdsList: imagesList
                    })
                }
            );
    }

    getTotalPrice(event, servicePrice) {
        const target = event.target;
        let totalPrice = this.state.totalPrice;
        let services = this.state.selectedAdditionalServices;

        if (target.checked) {
            totalPrice += servicePrice;
            services.push(target.value);
            this.setState({
                totalPrice: totalPrice,
                selectedAdditionalServices: services
            })

        } else {
            totalPrice -= servicePrice;
            services = services.filter(service => service !== target.value)
            this.setState({
                totalPrice: totalPrice,
                selectedAdditionalServices: services

            })
        }
    }

    collectAndSendOrder() {
        this.setState({
            btnDisable: true
        })
        const advertisementOrderDTO = {
            advertisementId: this.state.advertisement.id,
            additionalServicesId: this.state.selectedAdditionalServices
        }
        OrderService.createOrder(advertisementOrderDTO)
            .then(result => {
                RedirectTo.redirectToHome();
            });
    }


    render() {
        const {isLoaded, advertisement, orderable, additionalServices, totalPrice, imagesIdsList, btnDisable} = this.state;
        if (!isLoaded) {
            return (
                <Spinner animation="border" className="justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>)
        } else {
            return (
                <Container>
                    <Row className="row justify-content-center align-items-center">
                        <Link to={"/advertisement/" + advertisement.id}><h4>{advertisement.title}</h4></Link>
                    </Row>

                    <Row>
                        <Col>
                            <h4> Price: {advertisement.price} $ </h4>

                            {additionalServices.length === 0
                                ? <div/>
                                : <Form className="border">
                                    <Form.Label as="legend" column sm={4}>
                                        Additional Services:
                                    </Form.Label>

                                    {additionalServices.map(service => (
                                        <Col>
                                            <Form.Check key={service.id} name="selectedAdditionalServices"
                                                        onChange={event => this.getTotalPrice(event, service.price)}
                                                        type="checkbox"
                                                        value={service.id}
                                                        label={service.name + ", price: " + service.price + "$"}/>
                                        </Col>
                                    ))}


                                </Form>
                            }
                            <div><h4>Total price: <input id="total-price" type="text" value={totalPrice + " $"}
                                                         readOnly/> </h4></div>


                            {orderable === false
                                ? <div/>
                                : <div><input id="order-button" disabled={btnDisable} type="button" className={!btnDisable ? "btn-success" : "btn-secondary"}
                                              onClick={() => { if(window.confirm("Confirm the order?")){ this.collectAndSendOrder()}}}
                                              value="CONFIRM THE ORDER"/>
                                </div>}
                        </Col>

                        <Col>
                            <ListGroup className="w-75">
                                <ListGroup.Item variant="primary">Owner</ListGroup.Item>
                                <ListGroup.Item>Name: {advertisement.owner.firstName} {advertisement.owner.secondName}</ListGroup.Item>
                                <ListGroup.Item>Phone: {advertisement.owner.phone}</ListGroup.Item>
                                <ListGroup.Item>Email: {advertisement.owner.email}</ListGroup.Item>
                            </ListGroup>

                            {!imagesIdsList.length
                                ? <div/>
                                : <Carousel className="w-75 ">
                                    {imagesIdsList.map(image => (
                                        <CarouselItem>
                                            <Image className="d-block w-100 h-25"
                                                   src={API_ADVERTISEMENT + "/image/" + image}
                                                   alt="Loading..."/>
                                        </CarouselItem>
                                    ))}
                                </Carousel>}
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

}

export default OrderAdvertisement;
