import React, {
    Component
} from 'react';

export class NewItemDialog extends Component {
    
    // Store form data here
    state = {
        type: 'Supplier'
    };
    
    createInput = (type, name, display, placeholder, required) => {
        
        return (
            <div className="form-group">
              <label htmlFor={name} className="col-form-label">{display}</label>
              <input type={type} className="form-control" id={name} onInput={e => this.setState({ [name]: e.target.value })} placeholder={placeholder} required={required}/>
          </div>
        );
    }
    
    typeDropdown() {
        return (
            <div>
                <label htmlFor="selectType" className="col-form-label">Type</label>
                <select className="form-control mb-3" onInput={e => this.setState({ type: e.target.value })} id="selectType" required>
                    <option>Supplier</option>
                    <option>Affiliate</option>
                    <option>Room Mapping</option>
                </select>
            </div>);
    }
    
    clearState = () => {
        this.setState({
            title: undefined,
            type: 'Supplier',
            description: undefined,
            supplier: undefined,
            client: undefined,
            tfs: undefined,
            ticket: undefined,
        });
    }

    submitForm = e => {
        this.props.newItem(e, this.state); // Create the item
        this.clearState(); // Clear the state after form submit
    }
    
    render() {
        
        return (
            <div className="modal fade" id="newItemDialog" tabIndex="-1" role="dialog" aria-labelledby="newItemDialogLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content px-2">


                    <form id="newItemForm" onSubmit={this.submitForm} autoComplete="off">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title" id="editItemDialogLabel">New Item</h5>

                            {/* Buttons */}
                            <div>
                                <button type="submit" className="btn btn-primary mx-1">Add Item</button>
                                <button type="button" className="btn btn-secondary mx-1" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>


                        {/* Body */}
                        <div className="modal-body">
                            {this.typeDropdown()}
                            {this.createInput('text', 'title', 'Title', 'A descriptive title for the bug', /*true*/null)}
                            {this.createInput('text', 'description', 'Description', 'A short description of the bug', null)}
                            {this.createInput('text', 'supplier', 'Supplier', 'The supplier causing the bug or affected by it', /*true*/null)}
                            {this.createInput('text', 'client', 'Impcated Client', 'Who is suffering from this bug?', null)}
                            {this.createInput('number', 'tfs', 'TFS #', 'The TFS number, e.g. 23580', /*true*/null)}
                            {this.createInput('number', 'ticket', 'Ticket #', 'The Ticket\'s number, if exists, e.g. 23580', null)}                                                                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default NewItemDialog;
