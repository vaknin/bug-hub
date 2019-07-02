import React, { Component } from 'react';
import Item from './Item';
import EditItemDialog from './EditItemDialog';

export class Items extends Component {
    render() {
        return (
            <div className="row d-flex justify-content-center">
                {/* List all Items */}
                {this.props[this.props.searching ? 'results' : 'items'].map(item => {return item.tab === this.props.tab ? <Item key={item.id} data={item}/> : null})}

                {/* This dialog opens when editing/deleting an Item */}
                <EditItemDialog/>
            </div>
        )
    }
}

export default Items
