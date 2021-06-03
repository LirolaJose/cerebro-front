import React from "react";
import {Link} from "react-router-dom";
import {API_IMAGE} from "../../CommonData";
import OrderService from "../../services/OrderService";
import AdditionalServiceService from "../../services/AdditionalServiceService";

class OrderAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            advertisement: null,
            orderable: false,
            additionalServices: [],
            selectedAdditionalServices: [],
            totalPrice: 0,
            btnDisable: false
        }
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.collectAndSendOrder = this.collectAndSendOrder.bind(this);
    }

    componentDidMount() {
        const advertisementId = parseInt(this.props.match.params.id);
        OrderService.getAdvertisementById(advertisementId)
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    advertisement: result,
                    totalPrice: result.price
                })
                if (result.status === "ACTIVE" && result.type.orderable) {
                    this.setState({
                        orderable: true
                    })
                }
            })
        AdditionalServiceService.getAdditionalServicesByAdvertisementId(advertisementId)
            .then((result) => {
                this.setState({
                    additionalServices: result
                })
            })
    }
    getTotalPrice(event, servicePrice) {
        const target = event.target;
        let totalPrice = this.state.totalPrice;
        let services = this.state.selectedAdditionalServices;

        if(target.checked){
            totalPrice += servicePrice;
            services.push(target.value);
            this.setState({
                totalPrice: totalPrice,
                selectedAdditionalServices: services
            })

        }else {
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
        OrderService.createOrder(advertisementOrderDTO);
    }


    render() {
        const {isLoaded, advertisement, orderable, additionalServices, totalPrice, btnDisable} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div><Link to={"/advertisement/" + advertisement.id}> {advertisement.title} </Link></div>
                    <div>Price: {advertisement.price} $</div>
                    <div><img src={API_IMAGE + "/" + advertisement.id} alt="Loading..."/></div>

                    {additionalServices.length === 0
                        ? <div/>
                        : <div id="additionalServices">
                            {additionalServices.map(service => (
                                <div>
                                    <input key={service.id} name="selectedAdditionalServices"
                                           onChange={event => this.getTotalPrice(event, service.price)}
                                           type="checkbox"
                                           value={service.id}/>
                                    <label htmlFor={service.id}>{service.name}, price: {service.price}</label>
                                </div>
                            ))}
                        </div>
                    }
                    <div>Total price: <input id="total-price" type="text" value={totalPrice} readOnly/> </div>

                    {orderable === false
                        ? <div/>
                        : <div><input id="order-button" disabled={this.state.btnDisable} type="button" onClick={this.collectAndSendOrder}
                                      value="CONFIRM THE ORDER"/>
                        </div>}
                </div>
            )
        }
    }

}

export default OrderAdvertisement;