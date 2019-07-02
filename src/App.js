import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/popper.js/dist/popper';
import '../node_modules/bootstrap/dist/js/bootstrap';
import './App.css';
import Items from './components/Items';
import Nav from './components/Nav';

class App extends React.Component{

  state = {
    tab: 'pending',
    searching: false,
    items: [
      {
        id:1,
        tab: 'pending',
        title: 'title1',
        description: 'Rebooker issue with the latest data entered by RCA.',
        tfs: 532
      },
      {
        id:2,
        tab: 'pending',
        title: 'title2',
        description: 'Almostfaer is down, fix that.',
        tfs: 3
      },
      {
        id:3,
        tab: 'active',
        title: 'title3',
        description: 'Need to implemment new guildlines for new clients asap',
        tfs: 5137,
      }
    ],
    results: [],
  };

  //Search for an item according to a keyword
  searchItem = e => {

    let keyword = e.target.value.toString().toLowerCase();

    //No input entered, clear results
    if (keyword === ""){
      this.setState({searching: false});
      return;
    }

    //A copy of the items array
    const results = [];

    //Loop through all items
    for (let item of this.state.items){

      //Item matches the specified keyword
      if (item.tfs.toString().toLowerCase().includes(keyword) || item.title.toString().toLowerCase().includes(keyword) || item.description.toString().toLowerCase().includes(keyword)){
        results.push(item);
      }
    }

    //Update the original items array
    
    this.setState({searching: true, results});
  }

  render(){
    return (
      <div className="container">
  
        {/* Nav Bar */}
        <Nav search={this.searchItem} changeTab={tab => this.setState({tab})}/>
  
        {/* Items */}
        <Items tab={this.state.tab} searching={this.state.searching} results={this.state.results} items={this.state.items}/>
      </div>
    );
  }
}

export default App;