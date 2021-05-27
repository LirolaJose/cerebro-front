import React from 'react';
import AdvertisementService from './AdvertisementService';
import './AdvertisementsList.css'

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
        AdvertisementService()
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
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
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
                            <td>{ad.title}</td>
                            <td>{ad.text}</td>
                            <td>{ad.price}</td>
                            <td>{"There will be an image"}</td>
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