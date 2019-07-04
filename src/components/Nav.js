import React, { Component } from 'react'
import NewItemDialog from './NewItemDialog';

export class Nav extends Component {

   state = {
      tab: 'pending',
   };

   switch = tab => {

      //Switch a tab
      if (tab !== this.state.tab){

         //Update state with the new tab
         this.setState({tab});

         //Change tab in the App
         this.props.changeTab(tab);
      }
   }

   render() {
      return (
         <div className="navbar flex-nowrap mb-5 mt-2 d-flex justify-content-center">

            {/* New Item Button - Opens the dialog*/}
            <button type="button" data-toggle="modal" data-target="#newItemDialog" className="btn btn-outline-secondary mr-5 px-3">New Item</button>
            <NewItemDialog newItem={this.props.newItem} />

            {/* Navigation */}
            <ul className="nav nav-tabs flex-nowrap d-flex">
               <li className="nav-item">
               <button onClick={e => {this.switch('pending', e)}} className={"nav-link " + (this.state.tab === 'pending' ? 'active' : undefined)}>Pending</button>
               </li>
               <li className="nav-item">
               <button onClick={e => {this.switch('active', e)}} className={"nav-link " + (this.state.tab === 'active' ? 'active' : undefined)}>Active</button>
               </li>
               <li className="nav-item">
               <button onClick={e => {this.switch('completed', e)}} className={"nav-link " + (this.state.tab === 'completed' ? 'active' : undefined)}>Completed</button>
               </li>
               <li className="nav-item">
                  <button onClick={e => {this.switch('rejected', e)}} className={"nav-link " + (this.state.tab === 'rejected' ? 'active' : undefined)}>Rejected</button>
               </li>
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