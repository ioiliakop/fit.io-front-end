import React, { Component } from 'react';

function Previous(props) {
    if (props.activePage === 1) return (
        <li className="page-item active" aria-current="page">
            <span className="page-link">
                <span aria-hidden="true">&laquo;</span>
                {/* <span className="sr-only">(current)</span> */}
            </span>
        </li>);
    else return (
        <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous" onClick={() => props.setActivePage(props.activePage - 1)}>
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    );
}

function Next(props) {
    if (props.activePage === props.lastPage) return (
        <li className="page-item active" aria-current="page">
            <span className="page-link">
                <span aria-hidden="true">&raquo;</span>
                {/* <span className="sr-only">(current)</span> */}
            </span>
        </li>);
    else return (
        <li className="page-item">
            <a className="page-link" href="#" aria-label="Next" onClick={() => props.setActivePage(props.activePage + 1)}>
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    );
}

function PageNumberIcon(props) {
    if (props.activePage !== props.pageNumber)
        return (
            <li className="page-item" onClick={() => props.setActivePage(props.pageNumber)}><a className="page-link" href="#">{props.pageNumber}</a></li>
        ); else return (
            <li className="page-item active" aria-current="page">
                <span className="page-link">
                    {props.pageNumber}
                    <span className="sr-only">(current)</span>
                </span>
            </li>);
}

class PaginationFooter extends Component {
    render() {
        if (this.props.totalPages === 1) return null;
        return (
            <div className="container">
                <nav aria-label="...">
                    <ul className="pagination">
                        <Previous activePage={this.props.activePage} setActivePage={this.props.handle} />
                        {Array.from({ length: this.props.totalPages }, (v, i) => {
                            return <PageNumberIcon key={i} activePage={this.props.activePage} pageNumber={i + 1} setActivePage={this.props.handle} />
                        })}
                        <Next activePage={this.props.activePage} setActivePage={this.props.handle} lastPage={this.props.totalPages} />
                    </ul>
                </nav>
            </div>
        );
    }
}

export default PaginationFooter;