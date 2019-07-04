//#region Import

//React
import React from 'react';

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery';
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
    super(props)
    database.on('value', snapshot => { 
      this.setState({items: snapshot.val()});
    });
  }

  // Initial state
  state = {
    tab: 'pending',
    results: []
  };

  // Search for an item according to a keyword
  searchItem = e => {

    let keyword = e.target.value.toString().toLowerCase();

    // No input entered, clear results
    if (keyword === ""){
      this.setState({ results: [] });
      return;
    }

    // Save all search results to an array
    const results = [];
    const items = Object.values(this.state.items);

    // Loop through all items
    for (let item of items){

      // Item matches the specified keyword
      if (item.tfs.toString().toLowerCase().includes(keyword) || item.title.toString().toLowerCase().includes(keyword) || item.description.toString().toLowerCase().includes(keyword)){
        results.push(item);
      }
    }

    // Update the original items array
    this.setState({results});
  }

  newItem = (title, description, tfs) => {
    const ref = database.push();
    ref.set({
      id: this.state.items.length,
      tab: 'pending',
      title, description, tfs
    });
  }

  //Update an item
  editItem = item => {

  }


  //Delete the selected item from the database
  removeItem = id => {
    database.child(id).remove();
  }

  render(){
    return (
      <div className="container">
  
        {/* Nav Bar */}
        <Nav newItem={this.newItem} search={this.searchItem} changeTab={tab => this.setState({tab})}/>
  
        {/* Items */}
        {this.state.items ? <Items editItem={this.editItem} removeItem={this.removeItem} tab={this.state.tab} results={this.state.results} items={this.state.items}/> : null}
      </div>
    );
  }
}

export default App;