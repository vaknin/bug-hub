import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Item from './components/Item';
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

  changeTab = tab => {
    this.setState({tab});
  }

  searchItem = e => {

    let keyword = e.target.value.toString().toLowerCase();

    //No input entered, clear results
    if (keyword === ""){
      this.setState({searching: false, results: []});
      return;
    }

    //A copy of the items array
    const results = [];

    //Loop through all items
    for (let item of this.state.items){

      //Item is in the currently selected tab
      if (item.tab === this.state.tab){

        //Item matches the specified keyword
        if (item.tfs.toString().toLowerCase().includes(keyword) || item.title.toString().toLowerCase().includes(keyword) || item.description.toString().toLowerCase().includes(keyword)){
          results.push(item);
        }
      }
    }

    //Update the original items array
    
    this.setState({searching: true, results});
  }

  render(){
    return (
      <div className="container">
  
        {/* Navigation Row */}
        <div className="mb-5 d-flex justify-content-center">
            <Nav search={this.searchItem} changeTab={this.changeTab}/>
        </div>
  
        {/* Items Row */}
        <div className="row d-flex justify-content-center">
          {this.state.searching
          ?
          this.state.results.map(item => <Item key={item.id} data={item}/>)
          :
          this.state.items.map(item => {return item.tab === this.state.tab ? <Item key={item.id} data={item}/>:null})}
        </div>
        
      </div>
    );
  }
}

export default App;
