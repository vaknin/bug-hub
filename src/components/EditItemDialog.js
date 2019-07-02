import React, { Component } from 'react'

export class NewItemDialog extends Component {
    render() {
        return (
            <div>
                <div>
                  <div className="modal fade" id="editItemDialog" tabIndex="-1" role="dialog" aria-labelledby="editItemDialogLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title" id="editItemDialogLabel">Edit Item</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <div className="modal-body">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit.<br></br>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-primary">Add Item</button>
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