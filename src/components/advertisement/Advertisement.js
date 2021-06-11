import React from 'react';
import AdvertisementService from "../../services/AdvertisementService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import ImagesService from "../../services/ImageService";
import {API_ADVERTISEMENT} from "../../CommonData";
import ImagesPNG from "../../image/images.png";
import {Carousel, CarouselItem, Col, Container, Form, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MapContainer, TileLayer} from 'react-leaflet';
import {MyMarker} from "../marker/MyMarker";
import {Link} from "react-router-dom";
import "./Advertisement.css";


class Advertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advertisementId: parseInt(this.props.match.params.id),
            error: null,
            isLoaded: false,
            advertisement: null,
            imagesIdsList: [],
            additionalServices: [],
            coordinates: null,
            orderable: false
        };
    }

    componentDidMount() {
        AdvertisementService.getAdvertisementById(this.state.advertisementId)
            .then(res => res.json())
            .then(
                (resultAdvertisement) => {
                    this.setState({
                        isLoaded: true,
                        advertisement: resultAdvertisement,
                    });
                    if (resultAdvertisement.latitude && resultAdvertisement.longitude) {
                        this.setState({
                            coordinates: {lat: resultAdvertisement.latitude, lng: resultAdvertisement.longitude}
                        })
                    }
                    if (resultAdvertisement.status === "ACTIVE" && resultAdvertisement.type.orderable) {
                        this.setState({
                            orderable: true
                        })
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

        ImagesService.getImagesList(this.state.advertisementId)
            .then(res => res.json())
            .then(
                (imagesList) => {
                    this.setState({
                        imagesIdsList: imagesList
                    })
                }
            );

        AdditionalServiceService.getAdditionalServicesByAdvertisementId(this.state.advertisementId)
            .then(res => res.json())
            .then((additionalServicesList) => {
                    this.setState({
                        additionalServices: additionalServicesList
                    })
                }
            );
    }

    render() {
        const {error, isLoaded, advertisement, imagesIdsList, additionalServices, coordinates, orderable} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <Spinner animation="border" className="justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>)
        } else {
            console.log(advertisement);

            return (
                <Container>
                    <Row>
                        <Col id="title-info" className="text-lg-center"><h3> {advertisement.title} </h3></Col>
                        <Col className="price ">{advertisement.type.name === "WORK" ? <h4>Salary: {advertisement.price} $</h4> : <h4> Price: {advertisement.price} $ </h4>}</Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            {!imagesIdsList.length
                                ? <div id="images" className="advertisement">
                                    <div><img src={ImagesPNG} alt="Loading..."/></div>
                                </div>
                                :
                                <Carousel className="w-100 row justify-content-center align-items-center">
                                    {imagesIdsList.map(image => (
                                        <CarouselItem>
                                            <Image className="d-block w-100 h-25"
                                                   src={API_ADVERTISEMENT + "/image/" + image}
                                                   alt="Loading..."/>
                                        </CarouselItem>
                                    ))}
                                </Carousel>}
                        </Col>

                        <Col sm={4}>
                            <ListGroup className="w-75 justify-content-lg-start">
                                <ListGroup.Item variant="primary">Owner</ListGroup.Item>
                                <ListGroup.Item>Name: {advertisement.owner.firstName} {advertisement.owner.secondName}</ListGroup.Item>
                                <ListGroup.Item>Phone: {advertisement.owner.phone}</ListGroup.Item>
                                <ListGroup.Item>Email: {advertisement.owner.email}</ListGroup.Item>
                            </ListGroup>

                            {orderable === false
                                ? <div/>
                                : <Link to={"/advertisement/order/" + this.state.advertisementId}
                                        className="btn btn-primary">ORDER</Link>}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <div id="type">Type: {advertisement.type.name}</div>
                            <div id="category">Category: {advertisement.category.name}</div>

                            {!additionalServices.length
                                ? <div/>
                                :
                                <div>
                                    <label>Additional services: </label>
                                    <ListGroup className="w-75">
                                        {additionalServices.map(additionalService => (
                                                <ListGroup.Item key={additionalService.id}> {additionalService.name},
                                                    price: {additionalService.price} $</ListGroup.Item>
                                            )
                                        )}
                                    </ListGroup>
                                </div>}

                            <Form className="w-50 ">
                                <Form.Group>
                                    <Form.Label className="align-content-center">Description: </Form.Label>
                                    <Form.Control as="textarea" readOnly
                                                  className="textarea">{advertisement.text}</Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col sm={4}>
                            {coordinates
                                ? <MapContainer style={{height: "400px"}} className="w-100" center={coordinates}
                                                zoom={14}>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MyMarker lat={coordinates.lat} lng={coordinates.lng} position={coordinates}/>
                                </MapContainer>
                                :
                                <div/>
                            }

                        </Col>
                    </Row>



                </Container>
            )
        }
    }
}

export default Advertisement;
