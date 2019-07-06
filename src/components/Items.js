import React, { Component } from 'react';
import Item from './Item';
import EditItemDialog from './EditItemDialog';
import ChangeTabDialog from './ChangeTabDialog';
import $ from '../../node_modules/jquery/dist/jquery';

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

    // Close the edit modal and open the changeTab dialog
    openTabDialog = tab => {
        this.setState({newTab: tab}); // Save the new item's tab
        $('#editItemDialog').modal('hide'); // Close EditItemDialog
        $('#changeTabDialog').modal('show'); // Open ChangeTabDialog
    }

    // Save the changed item to database
    changeItemTab = data => {

        let item = this.props.temp;
        for (let key of Object.keys(data)){
            item[key] = data[key];
        }

        console.log(item);
        //this.props.changeItemTab(item);
    }


    render() {

        return (
            <div className="row d-flex justify-content-center">
                {/* List all Items */}
                {this.listItems()}

                {/* This dialog opens when editing/deleting an Item */}
                <EditItemDialog 
                updateTemp={this.updateTemp} 
                temp={this.state.temp} 
                item={this.state.activeItem} 
                editItem={e => this.props.editItem(e, this.state.temp)} 
                removeItem={this.props.removeItem} 
                changeItemTab={this.openTabDialog}/>

                {/* Change an Item's Tab, let the user fill the required fields */}
                <ChangeTabDialog 
                tab={this.state.newTab}
                changeItemTab={this.changeItemTab}/>
            </div>
        )
    }
}

export default Items;