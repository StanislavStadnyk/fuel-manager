import React, { Component } from 'react';

// Mui items
import CircularProgress from '@material-ui/core/CircularProgress';

class Spinner extends Component {
    render() {
        return (
            <div className="spinner-full-page">
                <CircularProgress color="secondary" 
                                  size={100} />
            </div>
        )
    }
}

export default Spinner;