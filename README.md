# Welcome to Cointrip’s front-end built with React.js!
Cointrip is a peer-to-peer payment app develop by Cory Winfrey
I wrote additional documentation for the backend that this project uses, located here: https://github.com/Cawde/cointrip/blob/main/README.md
Please read!

Please visit Cointrip here at https://stupefied-johnson-3ffdcc.netlify.app/

To get started with opening Cointrip on your machine please:
1. Clone the repo
2. Typing “npm install” into the terminal
3. Typing “npm run start” into the terminal




There are many views the user will interact with upon navigating Cointrip. Such as the:

# Home page 
![home_page_view](https://user-images.githubusercontent.com/62577188/148220495-3e1c36fb-3bf6-4e16-8fdc-6ef3cd552152.png)

# Login page
![login_page_view](https://user-images.githubusercontent.com/62577188/148220753-0f167c77-6351-4647-a520-3acaf19caa68.png)

# Dashboard
![dashboard_view](https://user-images.githubusercontent.com/62577188/148220840-b18a2212-9b7a-4348-8c67-997b9959792d.png)

The dashboard page will be navigated to via either by logging in or by adding a bank source via the register view flow.



When the user enters the register view flow, they will visit the register user page, verify user page, and then the add bank page. These steps are required to send money to other users via the dashboard.

# Register page
![register_page_view](https://user-images.githubusercontent.com/62577188/148220795-740c75b5-7a70-4688-9c24-33b3c0594370.png)


# Verify user page
![verify_user_view](https://user-images.githubusercontent.com/62577188/148221177-67bf07e9-6c9c-46af-b3f3-a05813c536da.png)

# Add Bank page
![add_bank_view](https://user-images.githubusercontent.com/62577188/148221221-766fc952-cf1c-4338-9126-5f8dee9b879e.png)

In the image below, you will see how I decided to structure my files. In the src file I have included the follow:
assets - includes all images used for the site,
components - includes all react components for the site, which holds all the logic for rendering each view the user sees as they navigate through Cointrip,
css - includes all the css files for the corresponding components

I decided to organize my files this way because it is simple, similar files are grouped together for ease of browsing, and it is a convention for developing react apps.

![file_explorer](https://user-images.githubusercontent.com/62577188/148221336-97636984-1ab5-43e8-bf70-dfaa84bbffb9.png)

Some examples of reusable components that I have created include the "SearchBar" component and the "NavBar component".
The NavBar component is present on most pages and the SearchBar component, although only present on the dashboard page, can easily be used in another project and configured.

This project was also built using @material-ui/@core library.
Some UI components used from this particular library include: Button, Container, TextField, Various Icons, makeStyles, and Modal

# Important
Due to nature of the version of Dwolla.js this app uses, which is sandbox mode, no money will actually be sent to other users. Users can input their information into dwolla and add a bank source but no money will actually be withdrawn from the bank source. However, since the process works in sandbox mode it will work in live mode if I toggle it. I currently will not toggle it to live mode until I feel that the security of Cointrip is at the standard that any user who inputs sensitive information to a website would require.

#Additional React information below

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
