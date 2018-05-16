This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Project Structure

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      autocompletes/
        AutocompleteDescriptionTags.js
        AutocompleteNotices.js
        AutocompleteTags.js
      modals/
        index.js
        ModalAddDirectory.js
        ModalAddNotice.js
        ModalConfirmation.js
      App.js
      Directories.js
      Error404.js
      ItemTypes.js
      Notice.js
      NoticePage.js
      NoticesInDirectory.js
      SearchPage.js
      TreeNode.js
    css/
      index.css
    reducers/
      directories.js
      index.js
      notices.js
    redux/
      actions/
        apiService.js
        directories.js
        notices.js
    utils/
      utils.js
    constants.js
    index.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Routing

Based on 'react-router'

App includes list of pages:

```
<Route path="/" component={App}>
  <Route path="/directories/:id" component={Directories}/>
</Route>
<Route path="/notices/:id" component={NoticePage}/>
<Route path="/search/:id" component={SearchPage}/>
<Route path="*" component={Error404}/>
```




