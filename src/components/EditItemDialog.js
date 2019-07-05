import React, { Component } from 'react'

export class EditItemDialog extends Component {

    //Dynamically create the dialog, depending on the the item's tab property
    createInputs = () => {

        if (!this.props.item){
            return;
        }

        const createInput = (type, name, display, placeholder, value, required) => {
            return(
                <div className="form-group">
                    <label htmlFor={name} className="col-form-label">{display}</label>
                    <input type={type} defaultValue={value} className="form-control" id={name} onInput={e => this.setState({ [name]: e.target.value })} placeholder={placeholder} required={required}/>
                </div>
            );
        }

        const typeDropdown = () => {
            return(
                <div>
                    <label htmlFor="selectType" className="col-form-label">Type</label>
                    <select defaultValue={this.props.item.type} className="form-control mb-3" onInput={e => this.setState({ type: e.target.value })} id="selectType" required>
                        <option>Supplier</option>
                        <option>Affiliate</option>
                        <option>Room Mapping</option>
                    </select>
                </div>);
        }

        return(
            <div>
                {createInput('text', 'title', 'Title', 'A descriptive title for the bug', this.props.item.title, /*true*/null)}
                {typeDropdown()}
                {createInput('text', 'description', 'Description', 'A short description of the bug', this.props.item.description, null)}
                {createInput('text', 'supplier', 'Supplier', 'The supplier causing the bug or affected by it', this.props.item.supplier, /*true*/null)}
                {createInput('text', 'client', 'Impcated Client', 'Who is suffering from this bug?', this.props.item.client, null)}
                {createInput('number', 'tfs', 'TFS #', 'The TFS number, e.g. 23580', this.props.item.tfs, /*true*/null)}
                {createInput('number', 'ticket', 'Ticket #', 'The Ticket\'s number, if exists, e.g. 23580', this.props.item.ticket, null)}
            </div>
        );

    }

    //Dynamically create drop down items, depending on item's tab
    dropdownButton(){
        return(
        <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Set as</button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <button type="button" className="dropdown-item btn">Active</button>
                <button type="button" className="dropdown-item btn">Rejected</button>
            </div>
        </div>);
    }

    render() {
        return (
            <div className="modal fade" id="editItemDialog" tabIndex="-1" role="dialog" aria-labelledby="editItemDialogLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form id="editItemForm" onSubmit={e => this.props.editItem(e, this.props.item, this.state)}>
                            {/* Title */}
                            <div className="modal-header">
                            <h5 className="modal-title" id="editItemDialogLabel">Edit Item</h5>

                            {/* Buttons */}
                            <div>
                                {this.dropdownButton()}
                                <button type="submit" className="btn btn-success mx-1">Save</button>
                                <button type="button" className="btn btn-secondary mx-1" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger mx-1" onClick={() => this.props.removeItem(this.props.item.key)} data-dismiss="modal">Delete</button>
                            </div>
                            </div>
                            <div className="modal-body">
                            {/* Inputs */}
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