import React from "react";
import TypeService from "../../services/TypeService";
import CategoryService from "../../services/CategoryService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import AdvertisementService from "../../services/AdvertisementService";
import RedirectTo from "../route/RedirectTo";
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../advertisement/Advertisement.css";
import {Label} from "reactstrap";
import {DraggableMarker} from "../marker/DraggableMarker";
import {MapContainer, TileLayer} from 'react-leaflet';


class NewAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            title: "",
            text: "",
            price: null,
            selectedType: null,
            selectedCategory: null,
            selectedAdditionalServices: [],
            types: [],
            categories: [],
            additionalServices: [],
            images: [],
            position: {lat: 51.65635088095043, lng: 39.19295310974122},
            checkedCoordinates: false,
            btnDisable: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeTypes = this.changeTypes.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeImages = this.changeImages.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.setLocation = this.setLocation.bind(this)
        this.collectAndSendAdvertisement = this.collectAndSendAdvertisement.bind(this);
    }

    componentDidMount() {
        TypeService.getTypes()
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    types: result
                })
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    changeAdditionalServices(event) {
        const target = event.target;
        let services = this.state.selectedAdditionalServices;
        if (target.checked) {
            services.push(target.value);
        } else {
            services = services.filter(service => service !== target.value)
        }
        const name = target.name;

        this.setState({
            [name]: services
        });
    }

    changeTypes(event) {
        this.handleChange(event);
        CategoryService.getCategories(event.target.value)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    categories: result,
                    additionalServices: [],
                    selectedCategory: null,
                    selectedAdditionalServices: []
                })
            })
    }

    changeCategory(event) {
        this.handleChange(event);
        AdditionalServiceService.getAdditionalServicesByCategoryId(event.target.value)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    additionalServices: result,
                    selectedAdditionalServices: []
                })
            })
    }

    changeImages(event) {
        this.setState({
            images: event.target.files
        });
    }

    changePosition(event) {
        const {lat, lng} = event;
        this.setState({
            position: {
                lat: lat,
                lng: lng
            }
        })
    }

    setLocation() {
        this.setState({
            checkedCoordinates: !this.state.checkedCoordinates
        })
    }

    collectAndSendAdvertisement() {
        this.setState({
            btnDisable: true
        })
        const advertisement = {
            title: this.state.title,
            text: this.state.text,
            price: this.state.price,
            type: this.state.selectedType,
            categoryId: this.state.selectedCategory,
            additionalServicesId: this.state.selectedAdditionalServices,
        }
        let coordinates;
        if (this.state.checkedCoordinates) {
            coordinates = {
                latitude: this.state.position.lat,
                longitude: this.state.position.lng
            }
        }
        AdvertisementService.createAdvertisement(advertisement, this.state.images, coordinates)
            .then(result => {
                RedirectTo.redirectToHome();
            })
            .catch(r => {
                this.setState({
                    btnDisable: false
                })
            });
    }


    render() {
        const {isLoaded, types, categories, additionalServices, checkedCoordinates, position, btnDisable} = this.state;

        if (!isLoaded) {
            return (
                <Spinner animation="border" className="justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>)
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Label className="required-field">Title</Form.Label>
                                <Form.Control
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    type="text"/>
                            </Form>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control as="textarea"
                                                  name="text"
                                                  placeholder="Write a description"
                                                  className="textarea"
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                            </Form>

                            <div>Images <input id="image" name="images" accept="image/jpeg, image/png, image/jpg"
                                               formEncType="multipart/form-data" type="file" multiple
                                               onChange={event => this.changeImages(event)}/>
                            </div>

                            <label htmlFor="location-checkbox"> Set a location </label> <input key="location-checkbox"
                                                                                               type="checkbox"
                                                                                               onChange={this.setLocation}/>
                            {checkedCoordinates
                                ? <MapContainer style={{height: "350px", width: "600px"}} center={position}
                                                zoom={14} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                    <DraggableMarker lat={position.lat} lng={position.lng}
                                                     onChange={this.changePosition}/>
                                </MapContainer>
                                : <div/>}

                        </Col>

                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label className="required-field">Price </Form.Label>
                                    <Form.Control name="price"
                                                  value={this.state.price}
                                                  onChange={this.handleChange}
                                                  type="text"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="required-field">Type </Form.Label>
                                    <Form.Control as="select" id="select-type" name="selectedType"
                                                  onChange={event => this.changeTypes(event)}>

                                        <option disabled selected value={null}>Please, choose the type</option>
                                        {types.map(type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="required-field">Category </Form.Label>
                                    <Form.Control as="select" id="select-category" disabled={!this.state.selectedType}
                                                  name="selectedCategory"
                                                  onChange={event => this.changeCategory(event)}>
                                        {!this.state.selectedType || !this.state.selectedCategory ?
                                            <option value={null} selected disabled>Please, choose the
                                                category</option> : <div/>}

                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}</Form.Control>
                                </Form.Group>


                                {additionalServices.length === 0
                                    ? <div/>
                                    : <Form.Group className="border">
                                        <Label>Additional services:</Label>
                                        {additionalServices.map(service => (
                                            <Form.Check key={service.id} name="selectedAdditionalServices"
                                                        onChange={event => this.changeAdditionalServices(event)}
                                                        type="checkbox"
                                                        value={service.id}
                                                        label={service.name + ", price: " + service.price + "$"}/>
                                        ))}
                                    </Form.Group>
                                }
                            </Form>
                        </Col>
                    </Row>
                    <Row className=" justify-content-center align-items-center">
                        <Button id="button-submit" disabled={btnDisable} type="button"
                                variant={!btnDisable ? "success" : "secondary"}
                                onClick={this.collectAndSendAdvertisement}>Add advertisement</Button>
                    </Row>
                </Container>
            )
        }
    }
}

export default NewAdvertisement;
