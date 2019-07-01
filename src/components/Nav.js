import React, { Component } from 'react'

export class Nav extends Component {

   state = {
      tab: 'pending',
   };

   switch = (tab, e) => {

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
         <div className="navbar">
            {/* Navigation */}
            <ul className="nav nav-tabs mt-2">
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
               <input className="form-control mt-2 ml-3" onInput={this.props.search} type="search" placeholder="Search"/>
            </div>

         </div>
      )
   }
}

export default Nav;