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

    //#region Initialization
    
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

    //#endregion
    
    //#region Item Actions

    // Search for an item according to a keyword
    searchItem = e => {
        
        let keyword = e.target.value.toString().toLowerCase(); // Set to lowercase to disable case-sensitivity
        
        // No input entered, clear results and return
        if (keyword === "") {
            this.setState({
                searching: false,
                results: []
            });
            return;
        }
        
        // Save all search results to an array
        const results = [];

        itemsloop: // Loop through all items
        for (let item of this.state.items) {

            // Loop through all fields of the item
            for (let field of Object.values(item)) {

                // If the field has the keyword inside of it, return the item in the results
                if (field.toLowerCase().includes(keyword)){
                    results.push(item);
                    continue itemsloop;
                }
            }
        }
        
        // Update the original items array
        this.setState({
            searching: true,
            results
        });
    }

    //Get today's current date
    getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`
    }
    
    // Creates a new item in the database
    newItem = (e, state) => {
        
        e.preventDefault(); // Prevent form from refreshing the page
        e.target.reset(); // Reset form
        $('#newItemDialog').modal('hide'); // Hide modal
        
        // Initialize an item object, to contain all fields acquired from inputs
        let item = {
            tab: 'pending',
            date: this.getDate(),
            type: 'Supplier'
        };
        
        //Return non-empty fields only
        let keys = Object.keys(state);
        for(let key of keys){
            let value = state[key];
            if (value !== undefined){
                item[key] = value;
            }
        }
        
        //Add the new item to the database
        database.push().set(item);
    }
    
    //Delete the selected item from the database
    removeItem = key => {
        database.child(key).remove();
    }

    //Update an item
    editItem = (e, item) => {

        e.preventDefault(); // Prevent form from refreshing the page
        e.target.reset(); // Reset form
        $('#editItemDialog').modal('hide'); // Hide modal

        // Apply changes to database
        database.child(item.key).update(item);
    }

    // Move an item between tabs
    changeItemTab = item => {
        $('#changeTabDialog').modal('hide'); // Hide modal

        console.log(item);

        // Add 'Closed date' field if set as completed/rejected
        let tab = item.tab;
        if (tab === 'completed' || tab === 'rejected'){
            item.closedate = this.getDate();
        }

        //console.log(item);

        database.child(item.key).update(item);
    }

    //#endregion
    
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
                items={this.state.searching ? this.state.results : this.state.items}
                changeItemTab={this.changeItemTab}>
                </Items>
            </div>
        );
    }
}

export default App;
