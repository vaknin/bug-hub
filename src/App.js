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
import config from './components/firebase';

//Stylesheet
import './App.css';

//Components
import Items from './components/Items';
import Nav from './components/Nav';

//#endregion

//Initialize database
firebase.initializeApp(config);
let database = firebase.database().ref('items');

//#endregion

class App extends React.Component {
    
    // Get initial items from Firebase and listen for db changes
    constructor(props) {
        super(props);
        
        // Make an array of items
        database.on('value', snapshot => {
            
            let itemsObj = snapshot.val();
            
            if (itemsObj === null) {
                this.setState({
                    items: []
                });
                return;
            }
            
            let items = [];
            let keys = Object.keys(itemsObj);
            
            //Make the array, add the key as a property to every item
            for (let key of keys) {
                let item = itemsObj[key];
                item.key = key;
                items.push(item);
            }
            
            this.setState({
                items
            });
        });
    }
    
    // Initial state
    state = {
        tab: 'pending',
        searching: false,
        results: [],
        items: []
    };
    
    itemsArray() {
        return Object.values(this.state.items);
    }
    
    // Search for an item according to a keyword
    searchItem = e => {
        
        let keyword = e.target.value.toString().toLowerCase();
        
        // No input entered, clear results
        if (keyword === "") {
            this.setState({
                searching: false,
                results: []
            });
            return;
        }
        
        // Save all search results to an array
        const results = [];
        const items = this.itemsArray();
        
        // Loop through all items
        for (let item of items) {
            
            // Item matches the specified keyword
            if (item.tfs.toString().toLowerCase().includes(keyword) || item.title.toString().toLowerCase().includes(keyword) || item.description.toString().toLowerCase().includes(keyword)) {
                results.push(item);
            }
        }
        
        // Update the original items array
        this.setState({
            searching: true,
            results
        });
    }
    
    newItem = (e, state) => {
        
        //Get current date
        const getDate = () => {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            return `${dd}/${mm}/${yyyy}`
        }
        
        e.preventDefault(); // Prevent form from refreshing the page
        e.target.reset(); // Reset form
        $('#newItemDialog').modal('hide'); // Hide modal
        
        // Initialize an item object, to contain all fields acquired from inputs
        let item = {
            tab: 'pending',
            date: getDate()
        };
        let keys = Object.keys(state);

        //Return non-empty fields only
        for(let key of keys){
            if (state[key] !== undefined){
                item[key] = state[key];
            }
        }
        
        //Add the new item to the database
        database.push().set(item);
    }
    
    //Update an item
    editItem = (e, item, data) => {
        
        e.preventDefault(); // Prevent form from refreshing the page
        e.target.reset(); // Reset form
        $('#editItemDialog').modal('hide'); // Hide modal

        if (data){

            // Update the item object with new values
            for (let key of Object.keys(data)){
                item[key] = data[key];
            }
    
            // Apply changes to database
            database.child(item.key).update(item);
        }
    }
    
    //Delete the selected item from the database
    removeItem = key => {
        database.child(key).remove();
    }
    
    render() {
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
