import React from "react";
import TypeService from "../../services/TypeService";
import CategoryService from "../../services/CategoryService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import AdvertisementService from "../../services/AdvertisementService";
import { MapContainer, TileLayer } from 'react-leaflet';
import "./NewAdvertisement.css";
import "./leaflet.css";
import "./layers.png";
import "./layers-2x.png";
import "./marker-shadow.png"
import {DraggableMarker} from "../DraggableMarker";

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
            position: [51.65635088095043, 39.19295310974122],
            lat: null,
            lng: null,
            btnDisable: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeTypes = this.changeTypes.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeImages = this.changeImages.bind(this);
        this.changePosition = this.changePosition.bind(this);
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
                    categories: result
                })
            })
    }

    changeCategory(event) {
        this.handleChange(event);
        AdditionalServiceService.getAdditionalServicesByCategoryId(event.target.value)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    additionalServices: result
                })
            })
    }

    changeImages(event) {
       this.setState({
           images: event.target.files
       });
    }

    changePosition(event){
        const { lat, lng } = event;
        this.setState({
            lat: lat,
            lng: lng
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
            latitude: this.lat,
            longitude: this.lng
        }
        AdvertisementService.createAdvertisement(advertisement, this.state.images)
            .then(result => {
                window.location.href = "/advertisement";
            })
            .catch(r => {
                this.setState({
                    btnDisable: false
                })
            });
    }


    render() {
        const {isLoaded, types, categories, additionalServices, position} = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>Title <span className="required-field"/> <label htmlFor="title"/> <input id="title"
                                                                                                  name="title"
                                                                                                  value={this.state.title}
                                                                                                  onChange={this.handleChange}
                                                                                                  type="text"/>
                    </div>

                    <div>Text <label htmlFor="text"/><textarea id="text" name="text" onChange={this.handleChange}
                                                               placeholder="Write a description"/>
                    </div>

                    <div>Price <span className="required-field"/> <label htmlFor="price"/><input id="price" name="price"
                                                                                                 value={this.state.price}
                                                                                                 onChange={this.handleChange}
                                                                                                 type="text"/>
                    </div>

                    <div>Type <span className="required-field"/> <label htmlFor="select-type"/>
                        <select id="select-type" name="selectedType"
                                onChange={event => this.changeTypes(event)}>
                            <option disabled selected value={null}>Please, choose the type</option>
                            {types.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select></div>

                    <div>Category <span className="required-field"/> <label htmlFor="select-category"/>
                        <select id="select-category" disabled={!this.state.selectedType} name="selectedCategory"
                                onChange={event => this.changeCategory(event)}>
                            {!this.state.selectedType ? <option value={null} selected disabled>- - -</option> : ''}
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select></div>

                    {additionalServices.length === 0
                        ? <div/>
                        : <div id="additionalServices">
                            {additionalServices.map(service => (
                                <div>
                                    <input key={service.id} name="selectedAdditionalServices"
                                           onChange={event => this.changeAdditionalServices(event)} type="checkbox"
                                           value={service.id}/>
                                    <label htmlFor={service.id}>{service.name}, price: {service.price}</label>
                                </div>
                            ))}
                        </div>
                    }

                    <div>Images <input id="image" name="images" accept="image/jpeg, image/png, image/jpg"
                                       formEncType="multipart/form-data" type="file" multiple
                                       onChange={event => this.changeImages(event)}/>
                    </div>

                    <MapContainer style={{ height: "400px" }}  className="map" center={[51.65635088095043, 39.19295310974122]}
                                  zoom={14} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <DraggableMarker lat={this.lat} lng={this.lng} onChange={this.changePosition}/>
                    </MapContainer>,


                    <div><input id="button-submit" disabled={this.state.btnDisable} type="button" onClick={this.collectAndSendAdvertisement}
                                value="Add advertisement"/>
                    </div>
                </div>
            )
        }
    }
}

export default NewAdvertisement;