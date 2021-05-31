import React from "react";
import TypeService from "../../services/TypeService";
import CategoryService from "../../services/CategoryService";
import AdditionalServiceService from "../../services/AdditionalServiceService";
import {API_ADVERTISEMENT} from "../../CommonData";


class NewAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            title: "",
            text: "",
            price: 0,
            selectedType: null,
            selectedCategory: null,
            selectedAdditionalServices: [],
            types: [],
            categories: [],
            additionalServices: [],
            images: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeTypes = this.changeTypes.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeImages = this.changeImages.bind(this);
        this.createAdvertisement = this.createAdvertisement.bind(this);
    }

    componentDidMount() {
        TypeService.getTypes()
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
            .then(result => {
                this.setState({
                    categories: result
                })
            })
    }

    changeCategory(event) {
        this.handleChange(event);
        AdditionalServiceService.getAdditionalServicesByCategoryId(event.target.value)
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

    createAdvertisement() {
        const advertisement = {
            title: this.state.title,
            text: this.state.text,
            price: this.state.price,
            type: this.state.selectedType,
            categoryId: this.state.selectedCategory,
            additionalServicesId: this.state.selectedAdditionalServices,
        }
        let data = new FormData();
        data.append("advertisementDTO", new Blob([JSON.stringify(advertisement)], {type: "application/json"}));

        const images = this.state.images;
        Object.keys(images).forEach( image => {
            data.append("images", images[image])
        })

        const requestOptions = {
            method: "POST",
            body: data
        }
        fetch(API_ADVERTISEMENT + "/", requestOptions).then(result => result.json());
    }


    render() {
        const {isLoaded, types, categories, additionalServices} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>Title <span className="required-field"/> <label htmlFor="title"/> <input id="title"
                                                                                                  name="title"
                                                                                                  onChange={this.handleChange}
                                                                                                  type="text"/>
                    </div>
                    <div>Text <label htmlFor="text"/><textarea id="text" name="text" onChange={this.handleChange}
                                                               placeholder="Write a description"/>
                    </div>
                    <div>Price <span className="required-field"/> <label htmlFor="price"/><input id="price" name="price"
                                                                                                 onChange={this.handleChange}
                                                                                                 type="text"/>
                    </div>

                    <div>Type <span className="required-field"/> <label htmlFor="select-type"/>
                        <select id="select-type" name="selectedType"
                                onChange={event => this.changeTypes(event)}>
                            <option disabled selected>Please, choose the type</option>
                            {types.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select></div>

                    <div>Category <span className="required-field"/> <label htmlFor="select-category"/>
                        <select id="select-category" name="selectedCategory"
                                onChange={event => this.changeCategory(event)}>
                            <option>- - -</option>
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
                                       onChange={event => this.changeImages(event)}/></div>

                    <div><input id="button-submit" type="button" onClick={this.createAdvertisement}
                                value="Add advertisement"/>
                    </div>
                </div>
            )
        }
    }


}

export default NewAdvertisement;