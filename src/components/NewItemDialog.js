import React, { Component } from 'react'

export class NewItemDialog extends Component {

    state = {
        title: undefined,
        description: undefined,
        tfs: undefined
    };

    render() {
        return (
            <div>
                <div>
                  <div className="modal fade" id="newItemDialog" tabIndex="-1" role="dialog" aria-labelledby="newItemDialogLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title" id="newItemDialogLabel">New Item</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <div className="modal-body">
                              <form>
                                <div className="form-group">
                                    <label htmlFor="title" className="col-form-label">Title</label>
                                    <input type="text" className="form-control" id="title" onInput={title => this.setState({title: title.target.value})} placeholder="TLC - Not fetching raw static data" required></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="col-form-label">Description</label>
                                    <textarea className="form-control" id="description" onInput={description => this.setState({description: description.target.value})} placeholder="This problem started in July 5th 1948..."></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tfs" className="col-form-label">TFS Number</label>
                                    <input type="text" className="form-control" id="tfs" placeholder="2831" onInput={tfs => this.setState({tfs: tfs.target.value})} required></input>
                                </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-primary" onClick={() => {this.props.newItem(this.state.title, this.state.description, this.state.tfs)}} data-dismiss="modal">Add Item</button>
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
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