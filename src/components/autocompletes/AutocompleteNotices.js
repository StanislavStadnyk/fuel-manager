import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';

import ReactAutocomplete from 'react-autocomplete';

class AutocompleteNotices extends Component {
	constructor (props) {
        super(props)
        
        this.state = {
            value: '',
        }
    }

    redirect = (to) => {
		browserHistory.push({pathname: to})
	}

    render() {
        const { notices } = this.props;

        return (
            <div className="autocomplete form-control">
                <ReactAutocomplete
                    items={notices.data}
                    shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.title}
                    renderItem={(item, highlighted) =>
                        this.state.value.length >= 2 
                            ? <div key={item.id}
                                   style={{ backgroundColor: highlighted ? '#bbb' : 'transparent'}}>
                                    {item.title}
                              </div>
                            : <div style={{padding: 0}}></div>
                    }
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={
                        (value, item) => this.redirect(`/search/${this.state.value}`)
                    }
                    inputProps={{ placeholder: 'Notices' }}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
	return {
		notices: state.noticesState
	};
}

export default connect(mapStateToProps)(AutocompleteNotices);