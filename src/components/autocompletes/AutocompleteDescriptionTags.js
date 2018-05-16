import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';

import ReactAutocomplete from 'react-autocomplete';

class AutocompleteDescriptionTags extends Component {
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

        let arr = [];

        notices.data.map(notice => {
            if (!arr.includes(notice.description)) {
                arr.push(notice.description);
            }

            return notice.tags.map(tag => {
                if (!arr.includes(tag)) {
                    arr.push(tag);
                }

                return arr;
            })
        })

        return (
            <div className="autocomplete form-control">
                <ReactAutocomplete
                    items={arr}
                    shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item}
                    renderItem={(item, highlighted) =>
                        this.state.value.length >= 2 
                            ? <div key={item.id}
                                   style={{ backgroundColor: highlighted ? '#bbb' : 'transparent'}}>
                                    {item}
                              </div>
                            : <div style={{padding: 0}}></div>
                    }
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={
                        (value, item) => this.redirect(`/search/${this.state.value}`)
                    }
                    inputProps={{ placeholder: 'Tags or description' }}
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

export default connect(mapStateToProps)(AutocompleteDescriptionTags);