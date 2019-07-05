import React, { Component } from 'react'

export class NewItemDialog extends Component {

    //Dynamically create the dialog, depending on the t
    createInputs = () => {

    }

    createInput = (type, name, display, placeholder, required) => {

        return(
            <div className="form-group">
                <label htmlFor={name} className="col-form-label">{display}</label>
                <input type={type} className="form-control" id={name} onInput={e => this.setState({ [name]: e.target.value })} placeholder={placeholder} required={required}/>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                  <div className="modal fade" id="editItemDialog" tabIndex="-1" role="dialog" aria-labelledby="editItemDialogLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                          <div className="modal-content">

                                {/* Title */}
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editItemDialogLabel">Edit Item</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="modal-body">
                                    <form id="editItemForm" onSubmit={e => this.props.editItem(e, /*this.state.title, this.state.description, this.state.tfs*/this.props.item, this.state)}>

                                        {this.createInput('text', 'title', 'Title', 'A descriptive title for the bug', /*true*/null)}
                                        {this.createInput('text', 'description', 'Description', 'A short description of the bug', null)}
                                        {this.createInput('number', 'tfs', 'TFS #', 'The TFS number, e.g. 23580', /*true*/null)}

                                        {/* Buttons */}
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.props.removeItem(this.props.item.key)} data-dismiss="modal">Delete</button>
                                        </div>
                                    </form>
                                </div>                                
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        )
    }
}

export default NewItemDialog