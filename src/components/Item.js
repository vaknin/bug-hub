import React, { Component } from 'react';

export class Item extends Component {

    // Create the card's header, dynmically
    createCardHeader = () => {

        // Get the item's type, and dynamically set the its color
        let type = this.props.item.type;
        let color;

        // Dynmically fetch the appropriate type color
        switch(type){

            // Supplier - Gray
            case 'Supplier':
                    color = 'secondary';
                break;

            // Affiliate - Blue
            case 'Affiliate':
                color = 'primary';
                break;

            // Room Mapping - Black
            case 'Room Mapping':
                color = 'dark';
                break;
            
            // no default
        }

        return (
            <div className="d-flex card-title">
                <h3 className="mr-auto">{this.props.item.title}</h3>
                <div className="d-flex flex-column ml-auto text-center">
                    <h5><span class={`badge badge-${color}`}>{this.props.item.type}</span></h5>
                    <h5>{this.props.item.date}</h5>
                </div>
            </div>
        );
    }

    // Dynamically display the Item's properties
    createCardBody = () => {

        let item = this.props.item; // The Item to display
        let tab = item.tab; // Get the Item's tab location
        let key = item.key.substring(0,4);

        let fields = [
            <h5><span key={'supplier' + key} class="badge badge-warning card-text">{item.supplier}</span></h5>,
            <p key={'desc' + key} className="card-text mt-3">{item.description}</p>,
            <p key={'client' + key} className="card-text"><strong>Affected Clients: </strong>{item.client}</p>
        ];
        

        // Check which tab the item belongs to (different tabs display different fields)
        switch(tab){

            // Active 
            case 'active':

                    // Determine badge color based on priority
                    let color;
                    switch (item.priority) {

                        // Unknown - teal
                        case 'Unknown':
                            color = 'info';
                            break;

                        // Low - green
                        case 'Low':
                            color = 'success';
                            break;
                        
                        // Medium - Yellow
                        case 'Medium':
                            color = 'warning';
                            break;

                        // High - Red
                        case 'High':
                            color = 'danger';
                            break;
                        // no default
                    }

                    fields.push(
                        <h4><span key={'priority' + key} class={`badge badge-${color} card-text`}>{item.priority}</span></h4>
                    );
                break;
            
            // Completed
            case 'completed':
                    fields.push(
                        <p key={'closedate' + key} className="card-text">Completed at {item.closedate}</p>
                    );
                break;
            
            // Rejected
            case 'rejected':
                    fields.push(
                        <p key={'closedate' + key} className="card-text">Rejected at {item.closedate} due to {item.reason}</p>
                    );
                break;
            
            // no default
        }
        
        return fields;
    }

    // Create the TFS & Ticket links
    createLinks = () => {
        return (
            <div className="justify-content-center d-flex">
                <a href={`https://gimmonix.visualstudio.com/Versions%20list%20-%20Waterfall/_workitems/edit/${this.props.item.tfs}`} className="card-link badge badge-primary p-2" rel="noopener noreferrer" target="_blank">TFS Link</a>
                <a href={`https://carsolize.zendesk.com/agent/tickets/${this.props.item.ticket}`} className="card-link badge badge-primary p-2" rel="noopener noreferrer" target="_blank">Ticket Link</a>
            </div>
        );
    }

    render() {
        return (
            <div className="card col-5 mb-4 mx-2" onClick={() => this.props.getItem(this.props.item)} data-toggle="modal" data-target="#editItemDialog">
                <div className="card-body">
                    {this.createCardHeader()}
                    {this.createCardBody()}
                    {this.createLinks()}
                </div>
            </div>
         )
    }
}

export default Item;