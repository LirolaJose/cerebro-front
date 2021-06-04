import React from 'react';
import AdvertisementService from '../../services/AdvertisementService';
import './AdvertisementsList.css';
import {Link} from "react-router-dom";
import {API_IMAGE} from "../../CommonData";
// import 'bootstrap/dist/css/bootstrap.css';

class AdvertisementsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            advertisements: []
        };
    }

    componentDidMount() {
        AdvertisementService.getAdvertisementsList()
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        advertisements: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, advertisements } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(advertisements);
            return (
                <div>
                <table className="table" id="table" align="center">
                    <caption>ADVERTISEMENTS</caption>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Title</th>
                        <th width="200px">Text</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Owner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {advertisements.map(ad => (
                        <tr key={ad.id}>
                            <td>{ad.id}</td>
                            <td> <Link to={"/advertisement/" + ad.id}> {ad.title} </Link> </td>
                            <td>{ad.text}</td>
                            <td>{ad.price}</td>
                            <td> <img src={API_IMAGE + "/" + ad.id} alt="Loading..."/> </td>
                            <td>{ad.type.name}</td>
                            <td>{ad.category.name}</td>
                            <td>{ad.owner.firstName} {ad.owner.secondName}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>

            );
        }
    }
}

export default AdvertisementsList;