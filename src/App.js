//#region Import

//React
import React from 'react';

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from '../node_modules/jquery/dist/jquery';
import '../node_modules/popper.js/dist/popper';
import '../node_modules/bootstrap/dist/js/bootstrap';

//Firebase
import * as firebase from '../node_modules/firebase/app';
import "firebase/database"

//Stylesheet
import './App.css';

//Components
import Items from './components/Items';
import Nav from './components/Nav';

//#endregion

//#region Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8DcDLA9ksP2GsAUEfnu0gZm48R5mps9s",
  authDomain: "bugsmanager-8f66d.firebaseapp.com",
  databaseURL: "https://bugsmanager-8f66d.firebaseio.com",
  projectId: "bugsmanager-8f66d",
  storageBucket: "",
  messagingSenderId: "345845082304",
  appId: "1:345845082304:web:3280019aa7596de0"
};

//Initialize database
firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref('items');

//#endregion

class App extends React.Component{

  // Get initial items from Firebase and listen for db changes
  constructor(props){
    super(props);

    // Make an array of items
    database.on('value', snapshot => {
      
      let itemsObj = snapshot.val();

      if(itemsObj === null){
        this.setState({items: []});
        return;
      }

      let items = [];
      let keys = Object.keys(itemsObj);

      //Make the array, add the key as a property to every item
      for (let key of keys){
        let item = itemsObj[key];
        item.key = key;
        items.push(item);
      }

      this.setState({items});
    });
  }

  // Initial state
  state = {
    tab: 'pending',
    searching: false,
    results: [],
    items: []
  };

  itemsArray(){
    return Object.values(this.state.items);
  }

  // Search for an item according to a keyword
  searchItem = e => {

    let keyword = e.target.value.toString().toLowerCase();

    // No input entered, clear results
    if (keyword === ""){
      this.setState({ searching: false, results: [] });
      return;
    }

    // Save all search results to an array
    const results = [];
    const items = this.itemsArray();

    // Loop through all items
    for (let item of items){

      // Item matches the specified keyword
      if (item.tfs.toString().toLowerCase().includes(keyword) || item.title.toString().toLowerCase().includes(keyword) || item.description.toString().toLowerCase().includes(keyword)){
        results.push(item);
      }
    }

    // Update the original items array
    this.setState({ searching: true, results });
  }

  newItem = (e, title, description, tfs) => {
    e.preventDefault(); // Prevent form from refreshing the page
    e.target.reset(); // Reset form
    $('#newItemDialog').modal('hide'); // Hide modal

    //Add the new item to the database
    const ref = database.push();
    ref.set({
      tab: 'pending',
      title, description, tfs
    });
  }

  //Update an item
  editItem = item => {

  }

  //Delete the selected item from the database
  removeItem = key => {
    database.child(key).remove();
  }

  render(){
    return (
      <div className="container">
  
        {/* Nav Bar */}
        <Nav 
        newItem={this.newItem} 
        search={this.searchItem} 
        changeTab={tab => this.setState({tab})}>
        </Nav>
  
        {/* Items */}
        <Items 
        editItem={this.editItem} 
        removeItem={this.removeItem} 
        tab={this.state.tab} 
        items={this.state.searching ? this.state.results : this.state.items}>
        </Items>
      </div>
    );
  }
}

export default App;