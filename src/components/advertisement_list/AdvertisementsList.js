import React from 'react';
import AdvertisementService from '../../services/AdvertisementService';
import './AdvertisementsList.css';
import {Link} from "react-router-dom";
import {API_IMAGE} from "../../CommonData";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyPagination} from "../pagination/Pagination";

class AdvertisementsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            advertisements: [],
            activePage: 1,
            totalPages: 0,

        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.getAdvertisementsList = this.getAdvertisementsList.bind(this)
    }

    componentDidMount() {
        this.getAdvertisementsList(this.state.activePage);
    }

    getAdvertisementsList(pageNumber) {
        AdvertisementService.getAdvertisementsList(pageNumber - 1)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        advertisements: result.content,
                        totalPages: result.totalPages
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

    handlePageChange(event, pageNumber) {
        this.setState(
            {
                activePage: pageNumber
            }
        );
        this.getAdvertisementsList(pageNumber)
    }


    render() {
        const {error, isLoaded, advertisements, activePage, totalPages} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(advertisements);
        }
        return (
            <div>
                <MyPagination onClick={this.handlePageChange} activePage={activePage} totalPages={totalPages}/>

                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Title</th>
                        <th className="text">Text</th>
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
                            <td className="justify-content-center">{ad.id}</td>
                            <td><Link to={"/advertisement/" + ad.id}> {ad.title} </Link></td>
                            <td>{ad.text}</td>
                            <td>{ad.price} $</td>
                            <td><img src={API_IMAGE + "/" + ad.id} alt="Loading..."/></td>
                            <td>{ad.type.name}</td>
                            <td>{ad.category.name}</td>
                            <td>{ad.owner.firstName} {ad.owner.secondName}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <MyPagination onClick={this.handlePageChange} activePage={activePage} totalPages={totalPages}/>
            </div>
        );
    }
}
export default AdvertisementsList;