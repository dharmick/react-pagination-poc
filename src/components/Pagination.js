import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './Pagination.scss'

export class Pagination extends Component {


    constructor(props) {
        super(props);
        const currentPageNumber = this.props.currentPageNumber;
        const lastPageNumber = this.props.lastPageNumber;
        const windowSize = 5 // constant as per design

        const { windowStart, windowEnd } = this.calculateWindowStartEnd(currentPageNumber, lastPageNumber, windowSize);

        this.state = {
            currentPageNumber,
            lastPageNumber,
            windowSize,
            windowStart,
            windowEnd,
            calculateWindowStartEnd: this.calculateWindowStartEnd
        }
    }



    calculateWindowStartEnd = (currentPageNumber, lastPageNumber, windowSize) => {

        let windowStart, windowEnd;

        if (currentPageNumber < windowSize) {
            // the very first window
            windowStart = 1;
            windowEnd = windowSize;
        } else if (currentPageNumber > lastPageNumber - windowSize + 1) {
            // last window
            windowStart = lastPageNumber - windowSize + 1;
            windowEnd = lastPageNumber;
        } else {
            // middle windows
            windowStart = currentPageNumber - Math.floor(windowSize / 2);
            windowEnd = currentPageNumber + Math.floor(windowSize / 2);
        }

        return {
            windowStart,
            windowEnd,
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        const { windowStart, windowEnd } =
            prevState.calculateWindowStartEnd(
                nextProps.currentPageNumber, nextProps.lastPageNumber, prevState.windowSize);

        return {
            lastPageNumber: nextProps.lastPageNumber,
            currentPageNumber: nextProps.currentPageNumber,
            windowStart,
            windowEnd,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            // on pressing back and forward buttons in browser
            this.props.onClick(parseInt(new URLSearchParams(this.props.location.search).get('page')));
        }
    }


    clickHandle = (pageNumber) => {

        this.props.history.push({
            search: `page=${pageNumber}`
        })

    }


    render() {
        const { windowStart, windowEnd, currentPageNumber } = this.state;
        return (
            <div className="pagination">
                {
                    this.state.currentPageNumber != 1 &&
                    <span className="wide-length"
                        onClick={() => this.clickHandle(this.state.currentPageNumber - 1)}>
                        Prev
                    </span>
                }

                {
                    this.state.currentPageNumber >= this.state.windowSize &&
                    <>
                        <span onClick={() => this.clickHandle(1)}>
                            1
                        </span>
                        <span className="separator">...</span>
                    </>
                }

                {
                    [...Array(windowEnd - windowStart + 1).keys()].map(num => {

                        const pageNum = num + windowStart

                        return (
                            < span className={pageNum === currentPageNumber && "active"}
                                onClick={() => this.clickHandle(pageNum)}>
                                {pageNum}
                            </span>
                        )

                    })
                }

                {
                    this.state.currentPageNumber != this.state.lastPageNumber &&
                    <span className="wide-length"
                        onClick={() => this.clickHandle(this.state.currentPageNumber + 1)}>
                        Next
                    </span>
                }

            </div >
        )
    }
}

export default withRouter(Pagination)
