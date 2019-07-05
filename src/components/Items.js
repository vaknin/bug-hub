import React, { Component } from 'react';
import Item from './Item';
import EditItemDialog from './EditItemDialog';

export class Items extends Component {

    state = {
        activeItem: undefined
    };

    listItems(){

        return this.props.items.map(item => 
            {
                return(
                item.tab === this.props.tab // Is the item in the curretly viewed tab?
                ? 
                <Item getItem={item => this.setState({activeItem: item})} key={item.key} item={item}/> // Yes -> Display the item
                : 
                null) // No -> Don't display the item
            });
    }

    render() {

        return (
            <div className="row d-flex justify-content-center">
                {/* List all Items */}
                {this.listItems()}

                {/* This dialog opens when editing/deleting an Item */}
                <EditItemDialog item={this.state.activeItem} editItem={this.props.editItem} removeItem={this.props.removeItem}/>
            </div>
        )
    }
}

export default Items;