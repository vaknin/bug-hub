import React, { Component } from 'react';

export class changeTabDialog extends Component {

    //this.props.setItemAs(item);

    capitalTabName = () => {
        if (!this.props.tab){
            return null;
        }
        let tabName = this.props.tab;
        return tabName[0].toUpperCase() + tabName.slice(1);
    }

    render() {

        return (
            <div className="modal fade" id="changeTabDialog" tabIndex="-1" role="dialog" aria-labelledby="changeTabDialogLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content px-2">
                        <form id="changeTabForm" onSubmit={this.submitForm} autoComplete="off">

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

                            </div>                                
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default changeTabDialog;