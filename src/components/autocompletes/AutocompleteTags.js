import React, { Component } from 'react';
import { Button, Tooltip, OverlayTrigger} from 'react-bootstrap';

import { connect } from 'react-redux';

import ReactAutocomplete from 'react-autocomplete';

const tooltipTag = (
    <Tooltip id="tooltip">Tag</Tooltip>
);
const tooltipAdd = (
    <Tooltip id="tooltip">Add new tag</Tooltip>
);

class AutocompleteTags extends Component {
	constructor (props) {
        super(props)
        
        this.state = {
            value: '',
            listOfTagsInNotice: [],
            tagExists: false,
            allTags: [],
        };
    }

    componentDidMount = () => {
        const { notices } = this.props;
        
        let tagsArr = [];

        notices.data.map(notice => {
            return notice.tags.map(tag => {
                if (!tagsArr.includes(tag)) {
                    tagsArr.push(tag);
                }

                return tagsArr;
            })
        });

        this.setState({
            allTags: [...this.state.allTags, ...tagsArr],
        });
	}

    addNewTag = (valueInput) => {
        const { NoticesActionCreators: {
                    listOfTagsInNoticeAction
                }
              } = this.props;

        let index = this.state.allTags.indexOf(valueInput);

        this.setState({
            allTags: [...this.state.allTags.slice(0, index), ...this.state.allTags.slice(index + 1)],
            value: ''
        });

        listOfTagsInNoticeAction(valueInput);
    }

    isTag = () => {
        let disabled;
        ((this.state.value === '') || (this.state.tagExists)) 
            ? disabled = true 
            : disabled = false;
        return disabled;
    }

    render() {
        const { notices: {listOfTagsInNotice} } = this.props;

        let tagsList = listOfTagsInNotice.map((tag, index) => {
            return (
                <li key={index}>
                    <OverlayTrigger placement="bottom" 
                                    overlay={tooltipTag}>
                        <span className="btn btn-warning">{tag}</span>
                    </OverlayTrigger>
                </li>
            )
         });

        return (
            <div>
                <div className="autocomplete form-control form-group">
                    <ReactAutocomplete
                        items={this.state.allTags}
                        shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item}
                        renderItem={(item, highlighted) => 
                            <div style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                                {item}
                            </div>
                        }
                        value={this.state.value}
                        onChange={e => {
                            this.setState({ 
                                value: e.target.value,
                                tagExists: listOfTagsInNotice.includes(e.target.value)
                            });
                        }}
                        onSelect={
                            (value) => {
                                this.addNewTag(value);
                            }
                        }
                        inputProps={{ placeholder: 'Tags of notice' }}
                    />
                </div>
                <div className="clearfix">
                    <OverlayTrigger placement="bottom" 
                                    overlay={tooltipAdd}>
                        <Button bsStyle="primary"
                                disabled={this.isTag()}
                                onClick={() => this.addNewTag(this.state.value)}>
                            Add New Tag
                        </Button>
                    </OverlayTrigger>
                    <ul className="list-unstyled tags-list">
                        {tagsList}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
	return {
		notices: state.noticesState
	};
}

export default connect(mapStateToProps)(AutocompleteTags);