# TalWebPortal: TalTech Employee Data Management Portal

### Project info

This project is aimed at developing digital services for Tallinn University of Technology (TalTech) staff and students. The primary objectives of the project include:

- Creating a secure web form to collect personal data from new university staff members, thereby eliminating the need for data rewriting.
- Integrating the collected data into the university's human resources software NAV.
- Providing an intuitive user interface through a Single Page Application (SPA) developed using ReactJS and the TalTech component library.
- Implementing a backend using PHP (Laravel) and exposing a REST API.
- Simulating databases for the sample solution using MariaDB.

## Installation and Usage

1. Clone the project repository to your local machine.
2. Navigate to the root directory in your terminal and run `npm install` to install the required dependencies.
3. Launch the project by using the command `npm start`. This will automatically open your default browser and display the project preview.

#### Project Structure

- ## `src`: This folder is the main container of all the code.
  - `api`: This folder contains all services and base request function.
  - `redux`: This folder contains all actions, reducers, thunks and store which is provided by redux.
  - `assets`: Asset folder to store all images and icons.
  - `components`: Folder to store any component that use through app
  - `localization`: Folder to store the languages files.
  - `navigation`: This module handles the navigation logic within the application.
  - `helpers`: This folder contains utility functions and helper modules that are used across the application..
  - `constants`: Folder to store any kind of constants and enums.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
