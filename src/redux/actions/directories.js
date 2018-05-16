import {
	SELECTED_DIRECTORY,
	EDIT_DIR_MODE
} from '../../constants';

// selected directory on click
export const selectedDirectoryAction = (index) => {
	return {
		type: SELECTED_DIRECTORY,
		id: index
	}
}

// id of editing directory
export const editDirModeAction = (index) => {
	return {
		type: EDIT_DIR_MODE,
		id: index
	}
}