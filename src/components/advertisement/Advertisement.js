import React from 'react';
import AdvertisementService from "../../services/AdvertisementService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import ImagesService from "../../services/ImageService";
import {API_ADVERTISEMENT} from "../../CommonData";
import ImagesPNG from "../../image/images.png";


class Advertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advertisementId: parseInt(this.props.match.params.id),
            error: null,
            isLoaded: false,
            advertisement: null,
            imagesIdsList: [],
            additionalServices: []
        };
        this.redirectToOrderForm = this.redirectToOrderForm.bind(this);
    }

    componentDidMount() {
        // const advertisementId = parseInt(this.props.match.params.id);
        AdvertisementService.getAdvertisementById(this.state.advertisementId)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        advertisement: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

        ImagesService.getImagesList(this.state.advertisementId)
            .then(
                (imagesList) => {
                    this.setState({
                        imagesIdsList: imagesList
                    })
                }
            );

        AdditionalServiceService.getAdditionalServicesByAdvertisementId(this.state.advertisementId)
            .then(
                (additionalServicesList) => {
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
        const {error, isLoaded, advertisement, imagesIdsList, additionalServices} = this.state;
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
                        : <div id="images">
                            {imagesIdsList.map(image => (
                                <div key={image}><img src={API_ADVERTISEMENT + "/image/" + image} alt="Loading..."/>
                                </div>
                            ))}
                        </div>
                    }

                    <div id="text">
                        <textarea className="text-area" id="textArea" readOnly>{advertisement.text}</textarea>
                    </div>
                    <div id="price" className="price">Price: {advertisement.price}</div>

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

                    <div id="type">Type: {advertisement.type.name}</div>
                    <div id="category">Category: {advertisement.category.name}</div>
                    <div id="owner">Owner: {advertisement.owner.firstName} {advertisement.owner.secondName}</div>
                    <div id="order"><input type="button" value="ORDER"
                                           onClick={this.redirectToOrderForm}/></div>

                </div>
            )
        }
    }
}

export default Advertisement;
