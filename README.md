# Project overview

## User experience

- A user would create an account and be able to log in.
- After a login he would add different workouts, that the App provides.
- The App should feature a calendar to help schedule the workouts.
- The App should be able to guide the user trough every workout.
- The App should keep a history of the performed workouts.

## Development goals

- The App aims to provide calendar and scheduling functionalities, that are flexible enough to work with different workouts and training programs.
- The App should use PWA functionalities in order to provide a rich experience and offline capabilities.

## Learning oportunities

- This is my first React project that uses Typescript. It will be a great opportunity to learn how to use Typscript with React components, hooks and Redux.
- The App needs to implement a Service Worker and work with the browser cache, Background Syncronization API and other PWA features. I've worked with these features before, but not much.
- The App needs to implement user Authentication, Routing, comunication with a backend API, CRUD operations and Error handling. I've implemented all of these features before, but will take the opportuinity to improve on my previous designs.

# Basic Structure

## Global state

The App global state will be handled with Redux Toolkit. A *Slice* is created for each feature.

### User Slice

The **User Slice** contains data about the logged in user. If no user is logged in, the data is *null*.

## Routing

Routing is achieved through **React Router v6**.

### Routes structure

The App has two sets of **Routes**. One for logged in users and one for guests. The *App.tsx* file renders one of the two sets, based on wheter a user is logged in.

### Templates

The App uses a **BaseTemplate** Component, that provides an html structure for rendering all other content. The **BaseTemplate** has a *header* element for displaying the App name, and a *main* element, that contains an `Outlet` Component, for hosting all other page content.

## Components

### BaseTemplate Component

The **BaseTemplate** Component provides an experience, similar to a native Android app. The *header* takes up 1/3 of the screen, to allow the user to reach with his thumb the top of the *main* content. When the page is scrolled the *header* shrinks to a small text at the top of the page. This transition is achieved through a library - *framer-motion*.

The Component uses the **framer-motion** hook `useScroll`, to keep track of the vertical scrolling position. The hook is configured to return the scrolling position, not relative to the **body**, but relative to the *header* **h1** element, that contains the page title. The hook returns `0` when the page is scrolled to the top and `1` when the *h1* element is about to go out of view.

The `useTransform` hook is used to animate a change in opacity of the page title, and to link the animation to the scroll position.

When the **h1** title element drops out of view, the **h3** title changes it's `position` to `fixed`, in order to stay on the top of the viewport. This happens through the `onChange` handler that the `useScroll` hook returns.

The **BaseTemplate** header is designed to display either the **h1** title, or the **h3** title. The transition between them is made to look nice, but when the user stops scrolling, the page has to snap to one of the two positions. This is achieved using the *header* element's `scrollTop` property. An event handler is added to the `touchEnd` Event, so when the user stops scrolling the page will autoscroll to one of the two positions.

### HomePage Component

The **HomePage** Component renders a form for Loging or Registering a user. The user can switch between the two forms, by clicking a button. The **Register** form uses a custom hook - **useForm**, to handle user input and validation. The Component also handles sending Login or Register data to the backend.

## UI Components

### Button Component

The **Button** Component is used to abstract away common Button functionality and to provide an uniform style for all page buttons and links.  
The Component has a couple of key properties:

- `type` - if no type is provided, the Button defaults to `button`
- `accent`, `plain`, `disabled` - props that modify the Button style. The `disabled` prop disables buttons, but doesn't disable Links
- `to` - if the `to` prop is porvided, the Button Component renders a React Router `Link` element

### Input Component

The **Input** Component is used to abastract awat common Controlled Input functionality and to provide uniform style for all inputs. It Renders a *label*, an *input* and if provided an *error message*.  
The Component has a couple of properties:

- `label` - text for the *label* element
- `type` - type for the *input* element
- `error` - error message. If an empty string is provided, no error message is shown.
- `value` and `onChange` - props for creating a controlled component

The **Input** Component has some special behaviours:

- If the provided `type` is `password`, a *show password* button is added to the input component

### LoadingSpinner Component

The **LoadingSpinner** Component is taken almost entirely from the Udemy Course **Progressive Web Apps (PWA) - The Complete Guide**. I have added some extra properties and have changed the styling a bit.  
The Component has the following properties:

- `asOverlay` - displays the spinner in the center of the viewport and shows an overlay over other content
- `centerPage` - displays the spinner in the center of the viewport but doesn't render an overlay

If no props are provided, the Component renders normaly, followind the DOM flow.

### Modal Component

The **Modal** Component displays a floating Modal over other page content. This Modal can be used to display messages, ask for user prompt and confirmation, etc.  
The Component expects the following props:

- `show` - Boolean that controlls the Modal visibility. It's necessery to use it because of the library `react-transition-group`
- `title` - The title of the Modal
- `children` - The content of the modal
- `buttons` - A ReactNode, containg the Controll Buttons for the Modal
- `onClose` - A function that change the `show` state to false

The **Modal** utilizes a library `react-transition-group`, used for animating it. The library is used here for it's simplicity over `framer-motion`.

### ErrorModal Component

The **ErrorModal** Component internaly uses a **Modal**, but abstracts away the common props, used in all Error messages - the title and the buttons.

## Custom Hooks

### useForm

The **useForm** hook creates *state* and *handlers* for handling form data. The hook accepts and array of *InputInit* objects. Each containing a name, an initial value, an error message and a validator function. It then returns:

- An array of *Input* objects, each contianing a *value* prop, that can be passed to *input elements*
- A *formIsValid* flag that changes to *true* only if all of the form input fields are valid
- An *onChange* and *onBlur* functions that can be passed to an *input element*
- *touchForm* function to signal to the hook, that the user has tried to submit the form
- *resetForm* function that resets the form to it's initial state

The returned values can be used to create *Controlled Components*

### useHttpClient

The **useHttpClient** hook is used for making fetch requests to the backend and for handling the loading and error state. The hook is based on the **React, NodeJS, Express & MongoDB - The MERN Fullstack Guide** course on Udemy, but with added functionality to tailor it for this specific use case.  
The hook returns the following values:

- isLoading - state that shows if a fetch request is being performed
- error - state that holds an error message if there is an Error when fetching data
- clearError - function that clears the error state
- setError - function that can set the error message
- sendRequest - function that is used for creating http fetch requests. It's rather complex so it will be viewed separetly

### sendRequest

The **sendRequest** function is being provided by the **useHttpClient** custom hook.  
The function expects the following parameters

- `url` - an API endpoint, relative to the API root URL. e.g.: `url = /users/login` if you want to make a request to `https://backend.com/api/users/login`
- `config object` - a configuration object that can have the following props:

- `body` - a *JS object*, to be send with the request. It will be authomatically passed through `JSON.stringify`
- `method` - an *HTTP method* to override the default **sendRequest** function behaviour. the Function sets the *method* to **GET** by default. If a `body` is provided, it sets the *method* to **POST**
- `headers` - an *HTTP headers* object for specifying headers. The Function sends `"Content-Type": "application/json"` by default, when a `body` is provided.
- `auth` - flag that instructs the Function to attach the authorization token to the *headers*. It's *true* by default.
