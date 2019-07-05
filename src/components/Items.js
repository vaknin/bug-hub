import React, { Component } from 'react';
import Item from './Item';
import EditItemDialog from './EditItemDialog';

export class Items extends Component {

    state = {};

    listItems(){

        return this.props.items.map(item => 
            {
                return(
                item.tab === this.props.tab // Is the item in the curretly viewed tab?
                ? 
                <Item getItem={item => this.setState({activeItem: Object.assign({}, item), temp: Object.assign({}, item)})} key={item.key} item={item}/> // Yes -> Display the item
                : 
                null) // No -> Don't display the item
            });
    }

    updateTemp = (key, value) => {
        let temp = this.state.temp;
        temp[key] = value;
        this.setState(temp);
    }

    editItem = e => {
        this.props.editItem(e, this.state.temp);
    }

    render() {

        return (
            <div className="row d-flex justify-content-center">
                {/* List all Items */}
                {this.listItems()}

                {/* This dialog opens when editing/deleting an Item */}
                <EditItemDialog updateTemp={this.updateTemp} temp={this.state.temp} item={this.state.activeItem} editItem={this.editItem} removeItem={this.props.removeItem}/>
            </div>
        )
    }
}

export default Items;