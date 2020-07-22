import React, { Component } from 'react'
import Pagination from '../components/Pagination'

export class Home extends Component {

    constructor(props) {
        super(props);
        const navigationParams = new URLSearchParams(this.props.location.search);

        this.state = {
            currentPageNumber: parseInt(navigationParams.get('page')) || 1,
            lastPageNumber: null,
        }
    }


    getPageDataApi = (pageNumber) => {

        // insert code for api call here

        this.setState({
            // dummy data
            data: `content for page ${pageNumber}`,
            lastPageNumber: 15,
            currentPageNumber: pageNumber
        })
    }



    componentDidMount() {
        this.getPageDataApi(this.state.currentPageNumber);
    }



    render() {
        return (
            <div>
                {this.state.data}
                <Pagination
                    onClick={this.getPageDataApi}
                    currentPageNumber={this.state.currentPageNumber}
                    lastPageNumber={this.state.lastPageNumber} />
            </div>
        )
    }
}

export default Home
