import React, { Component } from 'react';
import Item from './Item';
import EditItemDialog from './EditItemDialog';

export class Items extends Component {

    state = {
        activeItem: undefined
    };

    listItems(){
        //console.log(this.props.results.length);
        
        let items = this.props.results.length === 0 ? this.props.items : this.props.results;
        items = Object.values(items);
        console.log(items);
    }

    render() {

        return (
            <div className="row d-flex justify-content-center">
                {/* List all Items */}
                {this.listItems()}

                {/* This dialog opens when editing/deleting an Item */}
                <EditItemDialog item={this.state.activeItem} removeItem={() => this.props.removeItem(this.state.activeItem.id)}/>
            </div>
        )
    }
}

export default Items;
//{this.props[this.props.searching ? 'results' : 'items'].map(item => {return item.tab === this.props.tab ? <Item getItem={item => this.setState({activeItem: item})} key={item.id} item={item}/> : null})}