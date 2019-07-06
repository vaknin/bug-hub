import React, { Component } from 'react';
import $ from '../../node_modules/jquery/dist/jquery';

export class changeTabDialog extends Component {

    //#region Initialization

    // Once the component has loaded, configure modal to reset form on dismiss (this is called only once in the entire lifycycle)
    componentDidMount() {
        
        let modal = document.querySelector('#changeTabDialog');
        let form = document.querySelector('#changeTabForm');
        $(modal).on('hide.bs.modal', () => {
            form.reset();
        });
    }

    //#endregion

    // Dynamically create inputs, depending on the target tab
    createInputs = () => {

        // If no tab is given, don't create anything
        if (!this.props.tab){
            return null;
        }

        let tab = this.props.tab; // The target tab

        // Moving the Item to 'Active' tab, ask user to set priority
        if (tab === 'active') { 
            return(
                <div>
                    <label htmlFor="select_priority" className="col-form-label">Priority</label>
                    <select defaultValue="Unknown" onChange={e => this.setState({priority: e.target.value})} className="form-control" id="select_priority" required>
                        <option>Unknown</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            );
        }

        // Moving the Item to 'Rejected' tab, ask user to rejection reason
        else if (tab === 'rejected') {
            return(
                <div className="form-group">
                    <label htmlFor="input_reason" className="col-form-label">Reason</label>
                    <input type="text" onInput={e => this.setState({reason: e.target.value})} className="form-control" id="input_reason"  placeholder="Why the bug has been rejected?" required/>
                </div>
            );
        }
    }

    // Display the tab's name with an uppercase first letter
    capitalTabName = () => {

        // If no tab is given, don't display anything
        if (!this.props.tab){
            return null;
        }
        let tabName = this.props.tab;
        return tabName[0].toUpperCase() + tabName.slice(1);
    }

    // Move the data along, Form --> Items.js --> App.js --> Database
    confirm = e => {

        const clearState = () => {
            this.setState({
                status: undefined,
                priority: undefined,
                reason: undefined,
            });
        }

        e.preventDefault();
        e.target.reset(); // Reset the form
        this.props.changeItemTab(this.state); // Send the Item to App.js
        clearState(); // Clear the state
    }

    render() {

        return (
            <div className="modal fade" id="changeTabDialog" tabIndex="-1" role="dialog" aria-labelledby="changeTabDialogLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content px-2">
                        <form id="changeTabForm" onSubmit={this.confirm} autoComplete="off">

                            {/* Header */}
                            <div className="modal-header">
                                <h5 className="modal-title" id="changeTabDialogLabel">Set as {this.capitalTabName()}</h5>

                                {/* Buttons */}
                                <div>
                                    <button type="submit" className="btn btn-success mx-1">Confirm</button>
                                    <button type="button" className="btn btn-secondary mx-1" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                {this.createInputs()}
                            </div>                                
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default changeTabDialog;