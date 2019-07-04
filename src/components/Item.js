import React, { Component } from 'react';

export class Item extends Component {
    render() {
        return (
            <div className="card col-7 mb-4" onClick={() => this.props.getItem(this.props.item)} data-toggle="modal" data-target="#editItemDialog">
                <div className="card-body text-center">
                    <h5 className="card-title">{`#${this.props.item.tfs} - ${this.props.item.title}`}</h5>
                    <p className="card-text">{this.props.item.description}</p>
                    <a href="https://www.google.com" className="card-link badge badge-primary p-2">TFS Link</a>
                    <a href="https://www.google.com" className="card-link badge badge-primary p-2">Ticket Link</a>
                </div>
            </div>
         )
    }
}

export default Item;