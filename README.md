# CI&T Frontend challenge

The challenge description is provided in the [CI&T Tech Challenge](https://github.com/giovanniKleinCampigoto/ciandt-tech-challenge) repository.

## Requirements summary

#### ✅ The user should be able to search and filter the pokemon

The filter was implemented by pokemon name.

#### ✅ The user should be able to see pokemon details

The pokemon details was implemented by a dialog instead of a independent page.

### Optional

#### ✅ Visualice some pokemon data with a chart

The [suggested library](https://www.amcharts.com) was used to show the pokemon stats correctly in a chart. But I had some issues with the library in the testing pase (See **Extra suggestions**).

#### ✅ Be able to add Pokemon to a “favorites” list and filter by only favorite Pokemons

Favorites management implemented correctly.

It could had have persisted in the session or local storage but some kind of persistency was not mentioned in description.

### Extra suggestions

#### ⚠️ Unit tests

Unit tests was implemented in the list and filter functionality (See **Available Scripts** -> `npm test`), but I had issues with the [amcharts library](https://www.amcharts.com).

I have needed to use the library by it's [script files](https://www.amcharts.com/docs/v5/getting-started/#Loading_script_files) instead of [ES6 imports](https://www.amcharts.com/docs/v5/getting-started/#Importing_in_TypeScript_ES6_apps), and create some global variables for typescript (`src/am5.d.ts`).

Approaches to manage the chart library:

* Explore other chart libraries.
* Eject the application for custom tooling (See **Available Scripts** -> `npm run eject`).

## Environment dependencies

- Node JS: v16.x
- npm: v8.x

## Local execution

Install dependencies:

```
  npm i
```

Start development mode (see the **Available Scripts** section):

```
  npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Executes the app linter to verify issues with the code style or code conventions. Also it verify possibly code errors.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
