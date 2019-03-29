import React, { Component } from 'react';

// The Button of our pagination bar that redirects to the previous page
function Previous(props) {
    if (props.activePage === 1) return (
        <li className="page-item active" aria-current="page">
            <span className="page-link">
                <span aria-hidden="true"><i class="fas fa-angle-left"></i></span>
                {/* <span aria-hidden="true">&laquo;</span> */}
                <span className="sr-only">(current)</span>
            </span>
        </li>);
    else return (
        <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous" onClick={() => props.setActivePage(props.activePage - 1)}>
                <span aria-hidden="true"><i class="fas fa-angle-left"></i></span>
            </a>
        </li>
    );
}

// The Button of our pagination bar that redirects to the next page
function Next(props) {
    if (props.activePage === props.lastPage) return (
        <li className="page-item active" aria-current="page">
            <span className="page-link">
                <span aria-hidden="true"><i class="fas fa-angle-right"></i></span>
                {/* <span aria-hidden="true">&raquo;</span> */}
                <span className="sr-only">(current)</span>
            </span>
        </li>);
    else return (
        <li className="page-item">
            <a className="page-link" href="#" aria-label="Next" onClick={() => props.setActivePage(props.activePage + 1)}>
                <span aria-hidden="true"><i class="fas fa-angle-right"></i></span>
            </a>
        </li>
    );
}

// This Component 
function PageNumberIcon(props) {
    let numberOfSideButtons = 3; // We can adjust this. Number of buttons on either side of active one
    let leftBreakPoint = props.activePage - (numberOfSideButtons + 1);
    let rightBreakPoint = props.activePage + (numberOfSideButtons + 1);

    // We want to show as number buttons these cases
    if (props.pageNumber === 1 || props.pageNumber === props.lastPage || (props.pageNumber > leftBreakPoint && props.pageNumber < rightBreakPoint)) {
        // We distinguish if it will be an active button with the corresponding page link or the current page button
        if (props.activePage !== props.pageNumber)
            return (
                <li className="page-item" onClick={() => props.setActivePage(props.pageNumber)}><a className="page-link" href="#">{props.pageNumber}</a></li>
            ); else return (
                <li className="page-item active" aria-current="page">
                    <span className="page-link">
                        {props.pageNumber}
                        <span className="sr-only">(current)</span>
                    </span>
                </li>
            );
    } // otherwise we will render only one button with 3 dots where it is needed, left or right side
    else if (props.pageNumber === leftBreakPoint || props.pageNumber === rightBreakPoint) {
        return (
            <li className="page-item disabled" aria-current="page">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">...</a>
            </li>
        );
    }
    // we don't want to render anything for all the other pages
    return null;

    // Legacy Pagination without dots
    // if (props.activePage !== props.pageNumber)
    //     return (
    //         <li className="page-item" onClick={() => props.setActivePage(props.pageNumber)}><a className="page-link" href="#">{props.pageNumber}</a></li>
    //     ); else return (
    //         <li className="page-item active" aria-current="page">
    //             <span className="page-link">
    //                 {props.pageNumber}
    //                 <span className="sr-only">(current)</span>
    //             </span>
    //         </li>);
}

class PaginationFooter extends Component {
    render() {
        // we don't render anything for pagination bar if there is only one page
        if (this.props.totalPages === 1) return null;
        return (
            <div className="container">
                <nav aria-label="Pagination">
                    <ul className="pagination">
                        <Previous activePage={this.props.activePage} setActivePage={this.props.handle} />
                        {Array.from({ length: this.props.totalPages }, (v, i) => {
                            return <PageNumberIcon key={i} activePage={this.props.activePage} pageNumber={i + 1} lastPage={this.props.totalPages} setActivePage={this.props.handle} />
                        })}
                        <Next activePage={this.props.activePage} setActivePage={this.props.handle} lastPage={this.props.totalPages} />
                    </ul>
                </nav>
            </div>
        );
    }
}

export default PaginationFooter;