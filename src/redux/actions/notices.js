import {
	DND_NOTICES,
	TAGS_IN_NOTICE,
	CLEAR_TAGS_IN_NOTICE,
	ADVANCED_SEARCH,
	SIMPLE_SEARCH
} from '../../constants';

// DnD local
export const dndNoticesActionLocal = (props) => {
	let from, to;
	let arr = [];

	if (props.dragIndex > props.hoverIndex) {
		from = props.hoverIndex;
		to = props.dragIndex;

		arr = props.noticesFiltered.slice(from, to + 1);

		arr.map(item => {
			if (item.position === to) {
				item.position = from;
			} else {
				item.position = ++item.position;
			}
	
			return item;
		})
	}

	if (props.dragIndex < props.hoverIndex) {
		to = props.hoverIndex;
		from = props.dragIndex;

		arr = props.noticesFiltered.slice(from, to + 1);

		arr.map(item => {
			if (item.position === from) {
				item.position = to;
			} else {
				item.position = --item.position;
			}
			
			return item;
		})
	}

	return {
		type: DND_NOTICES
	}
}

// list of tags in notice
export const listOfTagsInNoticeAction = (valueInput) => {
	return {
		type: TAGS_IN_NOTICE,
		payload: valueInput
	}
}

// clear tags in notice
export const clearTagsInNoticeAction = () => {
	return {
		type: CLEAR_TAGS_IN_NOTICE
	}
}

export const advancedSearchAction = () => {
	return {
		type: ADVANCED_SEARCH
	}
};

export const simpleSearchAction = () => {
	return {
		type: SIMPLE_SEARCH
	}
};