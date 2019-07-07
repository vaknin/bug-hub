import React, { Component } from 'react'
import NewItemDialog from './NewItemDialog';

export class Nav extends Component {

   state = {
      tab: 'pending'
   };

   //Move between tabs, e.g. Pending to Rejected
   switch = tab => {

      if (tab !== this.state.tab){

         //Update state with the new tab
         this.setState({tab});

         //Change tab in the App
         this.props.changeTab(tab);
      }
   }

   render() {

      //Create tabs dynamically
      const createTab = name => {

         let capitalized = name[0].toUpperCase() + name.slice(1);

         return(
         <li className="nav-item">
                  <button onClick= {() => this.switch(name) } className={"nav-link " + (this.state.tab === name ? 'active' : undefined)}>{capitalized}</button>
         </li>);
      }

      return (
         <div className="navbar flex-nowrap mb-5 mt-2 d-flex justify-content-center">

            {/* New Item Button - Opens the dialog*/}
            <button type="button" data-toggle="modal" data-target="#newItemDialog" className="btn btn-outline-primary mr-5 px-3">New Item</button>
            <NewItemDialog 
               newItem= {(e, data) => {
                  this.props.newItem(e, data); // Create the item
                  this.switch('pending'); // Switch tab to 'Pending'
            }}/>

            {/* Navigation */}
            <ul className="nav nav-tabs flex-nowrap d-flex">
               {createTab('pending')}
               {createTab('active')}
               {createTab('completed')}
               {createTab('rejected')}
            </ul>

            {/* Search */}
            <div className="form-inline">
               <input className="form-control ml-5" onInput={this.props.search} type="search" placeholder="Search"/>
            </div>
         </div>
      )
   }
}

export default Nav;