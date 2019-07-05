import React, { Component } from 'react';
import $ from '../../node_modules/jquery/dist/jquery';

export class Item extends Component {

    render() {
        return (
            <div className="card col-7 mb-4" onClick={() => this.props.getItem(this.props.item)} data-toggle="modal" data-target="#editItemDialog">
                <div className="card-body text-center">
                    <div className="d-flex">
                        <h5 className="card-title mr-auto">{this.props.item.title}</h5>
                        <p className="text-right ml-auto" >{this.props.item.date}</p>
                    </div>
                    <p className="card-text">{this.props.item.description}</p>
                    <a href={`https://gimmonix.visualstudio.com/Versions%20list%20-%20Waterfall/_workitems/edit/${this.props.item.tfs}`} className="card-link badge badge-primary p-2" rel="noopener noreferrer" target="_blank">TFS Link</a>
                    <a href={`https://carsolize.zendesk.com/agent/tickets/${this.props.item.ticket}`} className="card-link badge badge-primary p-2" rel="noopener noreferrer" target="_blank">Ticket Link</a>
                </div>
            </div>
         )
    }
}

export default Item;