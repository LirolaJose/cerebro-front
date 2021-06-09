import React from 'react';
import AdvertisementService from "../../services/AdvertisementService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import ImagesService from "../../services/ImageService";
import {API_ADVERTISEMENT} from "../../CommonData";
import ImagesPNG from "../../image/images.png";
import {Carousel, CarouselItem, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MapContainer, TileLayer} from 'react-leaflet';
import {MyMarker} from "../marker/MyMarker";


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
            coordinates: null
        };
        this.redirectToOrderForm = this.redirectToOrderForm.bind(this);
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

    redirectToOrderForm() {
        const path = "/advertisement/order/" + this.state.advertisementId;
        this.props.history.push(path);
    }

    render() {
        const {error, isLoaded, advertisement, imagesIdsList, additionalServices, coordinates} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(advertisement);

            return (
                <div>
                    <h2 id="title-info"> {advertisement.title}</h2>

                    {imagesIdsList.length === 0
                        ? <div id="images">
                            <div><img src={ImagesPNG} alt="Loading..."/></div>
                        </div>
                        :
                        <Carousel className="w-25">
                            {imagesIdsList.map(image => (
                                <CarouselItem>
                                    <Image className="d-block w-100 h-25" src={API_ADVERTISEMENT + "/image/" + image}
                                           alt="Loading..."/>
                                </CarouselItem>
                            ))}
                        </Carousel>
                    }

                    <div id="text">
                        <textarea className="text-area" id="textArea" readOnly>{advertisement.text}</textarea>
                    </div>
                    <div id="price" className="price">Price: {advertisement.price} $</div>

                    {additionalServices.length === 0
                        ? <div/>
                        : <div id="additional-service" className="additional-service">
                            <label>Additional services: </label>
                            <ol id="additional-services-list">
                                {additionalServices.map(additionalService => (
                                        <li key={additionalService.id}> {additionalService.name} ,price: {additionalService.price}</li>
                                    )
                                )}
                            </ol>
                        </div>
                    }
                    {coordinates
                        ? <MapContainer style={{ height: "400px" }}  className="w-25" center={coordinates}
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

                    <div id="type">Type: {advertisement.type.name}</div>
                    <div id="category">Category: {advertisement.category.name}</div>
                    <div id="owner">Owner: {advertisement.owner.firstName} {advertisement.owner.secondName}</div>
                    {/*fixme https://stackoverflow.com/a/58198328 <Link to="/page/+state.id"*/}
                    <div id="order"><input type="button" value="ORDER"
                                           onClick={this.redirectToOrderForm}/></div>

                </div>
            )
        }
    }
}

export default Advertisement;
