import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
	typography: {
	  	// Tell Material-UI what the font-size on the html element is.
		fontSize: 16,
	},
	// palette: {
	// 	primary: { main: $white }, // Purple and green play nicely together.
	// 	secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
	// },
	overrides: {
		// Name of the component ⚛️ / style shee
		// MuiButton: {
		//   // Name of the rule
		//   root: {
		// 	// Some CSS
		// 	// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		// 	// borderRadius: 3,
		// 	// border: 0,
		// 	// color: 'white',
		// 	// height: 48,
		// 	// padding: '0 30px',
		// 	// boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
		//   },
		// },
		MuiAppBar: {
			root: {
				boxShadow: "none"
			}
		},
		MuiSelect: {
			select: {
				"&:focus": {
					background: "none"
				}
			}
		},
		MuiToolbar: {
			gutters: {
				paddingLeft: 12,
				paddingRight: 12
			}
		},
		MuiDialogActions: {
			root: {
				margin: "8px 20px"
			},
			action: {
				minWidth: 0
			}
		}
	},
});

export default customTheme;