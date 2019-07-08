import React, { Component } from 'react';
import $ from '../../node_modules/jquery/dist/jquery';

export class EditItemDialog extends Component {    

    // Once the component has loaded, configure modal to reset form on dismiss (this is called only once in the entire lifycycle)
    componentDidMount() {
        
        let modal = document.querySelector('#editItemDialog');
        let form = document.querySelector('#editItemForm');
        $(modal).on('hide.bs.modal', () => {
            form.reset();
        });
    }

    // Dynamically create inputs
    createInputs = () => {

        // Check if there is no item to return
        if (!this.props.item){
            return null;
        }

        const createInput = (type, name, display, placeholder, value, required) => {
            return(
                <div className="form-group">
                    <label htmlFor={name} className="col-form-label">{display}</label>
                    <input type={type} maxLength={name === 'supplier' ? 3 : undefined} defaultValue={value} onInput={e => this.props.updateTemp(name, e.target.value)} className="form-control" id={name}  placeholder={placeholder} required={required}/>
                </div>
            );
        }

        const typeDropdown = () => {

            return(
                <div>
                    <label htmlFor="selectType" className="col-form-label">Type</label>
                    <select value={this.props.temp.type} onChange={e => this.props.updateTemp('type', e.target.value)} className="form-control mb-2" id="selectType">
                        <option>Supplier</option>
                        <option>Affiliate</option>
                        <option>Room Mapping</option>
                    </select>
                </div>);
        }

        const priorityDropdown = () => {

            return(
                <div>
                    <label htmlFor="select_priority2" className="col-form-label">Priority</label>
                    <select value={this.props.temp.priority} onChange={e => this.props.updateTemp('priority', e.target.value)} className="form-control" id="select_priority2" required>
                        <option>Unknown</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            );
        }

        return(
            <div>
                {typeDropdown()}
                {this.props.item.tab === 'active' ? priorityDropdown() : null}
                {this.props.item.tab === 'rejected' ? createInput('text', 'reason', '* Rejection Reason', 'The main reason the bug was rejected for', this.props.item.reason, true): null}
                {createInput('text', 'supplier', '* Supplier', 'The supplier the bug deals with, e.g. TRC, EXP', this.props.item.supplier, true)}
                {createInput('text', 'title', '* Title', 'A descriptive title for the bug', this.props.item.title, true)}
                {createInput('text', 'description', 'Description', 'A short description of the bug', this.props.item.description, null)}
                {createInput('text', 'client', 'Impcated Client', 'Who is suffering from this bug?', this.props.item.client, null)}
                {createInput('number', 'tfs', '* TFS #', 'The TFS number, e.g. 23580', this.props.item.tfs, true)}
                {createInput('number', 'ticket', 'Ticket #', 'The Ticket\'s number, if exists, e.g. 23580', this.props.item.ticket, null)}
            </div>
        );

    }

    // Submits the form and sends its data to App.js
    submitForm = e => {
        this.props.editItem(e);
    }

    // Creates the dropdown button that changes an Item's tab
    createSetAsBtn = () => {

        // Check if there is no item to return
        if (!this.props.item){
            return null;
        }

        // 'Set as' Button onClick
        const setItemAs = e => {
            let newTab = e.target.textContent.toLowerCase();
            this.props.updateTemp('tab', newTab);
            this.props.openTabDialog(newTab);
        }

        // Dynamically create the dropdown buttons
        const createButtons = tab => {
            let currentTab = this.props.item.tab;

            // Don't display 'Set as Pending' if the item is already set to Pending
            if (currentTab === tab.toLowerCase()){
                return null;
            }
            
            return <button onClick={setItemAs} type="button" className="dropdown-item btn">{tab}</button>
        }

        // Render
        return(
        <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-warning dropdown-toggle mr-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Set as</button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                {createButtons('Pending')}
                {createButtons('Active')}
                {createButtons('Completed')}
                {createButtons('Rejected')}
            </div>
        </div>);
    }

    // Render
    render() {            

        return (
            <div className="modal fade" id="editItemDialog" tabIndex="-1" role="dialog" aria-labelledby="editItemDialogLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content px-2">
                        <form id="editItemForm" onSubmit={this.submitForm} autoComplete="off">

                            {/* Header */}
                            <div className="modal-header">
                                <h5 className="modal-title" id="editItemDialogLabel">Edit Item</h5>

                                {/* Buttons */}
                                <div>
                                    {this.createSetAsBtn()}
                                    <button type="submit" className="btn btn-success mx-1">Save</button>
                                    <button type="button" className="btn btn-secondary mx-1" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-danger mx-1" onClick={() => this.props.removeItem(this.props.item.key)} data-dismiss="modal">Delete</button>
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

export default EditItemDialog;