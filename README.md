# Project overview

## User experience

- A user would create an account and be able to log in.
- After a login he would add different workouts, that the App provides.
- The App should feature a calendar to help schedule the workouts.
- The App should be able to guide the user trough every workout.
- The App should keep a history of the performed workouts.

## Development goals

- Implementing authorization that works with the Backend and has a good balance between security and usability
- Implementing calendar and scheduling functionalities
- Implementing a _Training program_ Class, that would allow wildly different programs to be added to the App, without the need for refactoring
- Providing bonus functionalities, like offline capabilities and notifications

## Learning oportunities

- This is my first React project that uses Typescript. It will be a great opportunity to learn how to use Typscript with React components, hooks and Redux.
- The App will probably implement a Service Worker and work with the browser cache, Background Syncronization API etc. I've worked with these features before, but not much.
- The App needs to implement user Authentication, Routing, comunication with a backend API, CRUD operations and Error handling. I've implemented all of these features before, but will take the opportuinity to improve on my previous designs.

# Basic Structure

## Global state

The App global state will be handled with Redux Toolkit. A _Slice_ is created for each feature.

### User Slice

The **User Slice** contains data about the logged in user. If no user is logged in, the data is _null_.  
A _user middleware_ is added to the Redux Store. The middleware handles storing and removing the passed user data to localStorage.

### Programs Slice

The **Programs Slice** contains data about all of the supported programs. Each program has an _id_, an _active_ status and a _data_ property. The `ProgramId` data type contains all valid ids of training programs. If a training program is active, it must have a _data_ property, that is an Object.

## Routing

Routing is achieved through **React Router v6**.

### Routes structure

The App has two sets of **Routes**. One for logged in users and one for guests. The _App.tsx_ file renders one of the two sets, based on wheter a user is logged in.

### Templates

The App uses a **BaseTemplate** Component, that provides an html structure for rendering all other content. The **BaseTemplate** has a _header_ element for displaying the App name, and a _main_ element, that contains an `Outlet` Component, for hosting all other page content.

## Components

### BaseTemplate Component

The **BaseTemplate** Component provides an experience, similar to a native Android app. The _header_ takes up 1/3 of the screen, to allow the user to reach with his thumb the top of the _main_ content. When the page is scrolled the _header_ shrinks to a small text at the top of the page. This transition is achieved through a library - _framer-motion_.

The Component uses the **framer-motion** hook `useScroll`, to keep track of the vertical scrolling position. The hook is configured to return the scrolling position, not relative to the **body**, but relative to the _header_ **h1** element, that contains the page title. The hook returns `0` when the page is scrolled to the top and `1` when the _h1_ element is about to go out of view.

The `useTransform` hook is used to animate a change in opacity of the page title, and to link the animation to the scroll position.

When the **h1** title element drops out of view, the **h3** title changes it's `position` to `fixed`, in order to stay on the top of the viewport. This happens through the `onChange` handler that the `useScroll` hook returns.

The **BaseTemplate** header is designed to display either the **h1** title, or the **h3** title. The transition between them is made to look nice, but when the user stops scrolling, the page has to snap to one of the two positions. This is achieved using the _header_ element's `scrollTop` property. An event handler is added to the `touchEnd` Event, so when the user stops scrolling the page will autoscroll to one of the two positions.

The Template looks at the current _url path_ and changes the _h1_ and _h3_ title text to corespond to the _path_. Ther is a map that maps the current _path_ to a _title text_.

### HomePage Component

The **HomePage** Component renders a form for Loging or Registering a user. The user can switch between the two forms, by clicking a button. The **Register** form uses a custom hook - **useForm**, to handle user input and validation. The Component also handles sending Login or Register data to the backend.

### Calendar Component

The **Calendar** Component renders a _calendar_. The calendar displays by default one month. The Component has three view modes - month view, year view and decade view. The contents of the component are rendered conditionaly based on the current view.

The Calendar itself is structured with a _header_ and a _body_. The header has the label of the current month/year/decade and buttons to navigate forwards or backwards in time. The calendar body depends on the current view. There are three Components that render a different calendar body, depending on the current view.

## UI Components

### Button Component

The **Button** Component is used to abstract away common Button functionality and to provide an uniform style for all page buttons and links.  
The Component has a couple of key properties:

- `type` - if no type is provided, the Button defaults to `button`
- `accent`, `plain`, `disabled` - props that modify the Button style. The `disabled` prop disables buttons, but doesn't disable Links
- `to` - if the `to` prop is porvided, the Button Component renders a React Router `Link` element

### Input Component

The **Input** Component is used to abastract awat common Controlled Input functionality and to provide uniform style for all inputs. It Renders a _label_, an _input_ and if provided an _error message_. The Component displays _polymorphic_ behavior. It renders different components, depending on the **_type_** prop.  
The Component has a couple of common props:

- `label` - text for the _label_ element
- `type` - type for the _input_ element
- `error` - error message. If an empty string is provided, no error message is shown.
- `value` and `onChange` - props for creating a controlled component

The **Input** Component has some special behaviours, depending on the provided **_type_**:

- `type= text` & `type= email` - render a _text_ or _email_ input, and optionaly render a `Clear` button, to clear the input value
- `type= password`, render a password field with a _Show/Hide_ field on the end, to change the field type between `password` and `text`
- `type= checkbox`, render a checkbox
- `type= date`, render a build in date picker
- `type= radio`, render radio buttons

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

### ContextMenu Component

The **ContextMenu** Component renders a floating modal, that is attached to it's parent component, by using `position: absolute`. The Component also renders a transperant Overlay, that has an onClick event handler, trigering the closing of the Context Menu.

The Component expects to receive a list of links, that will be rendered as Link components.

## Custom Hooks

### useForm

The **useForm** hook creates _state_ and _handlers_ for handling form data. The hook accepts and array of _InputInit_ objects. Each containing a name, an initial value, an error message and a validator function. It then returns:

- An array of _Input_ objects, each contianing a _value_ prop, that can be passed to _input elements_
- A _formIsValid_ flag that changes to _true_ only if all of the form input fields are valid
- An _onChange_ and _onBlur_ functions that can be passed to an _input element_
- _touchForm_ function to signal to the hook, that the user has tried to submit the form
- _resetForm_ function that resets the form to it's initial state

The returned values can be used to create _Controlled Components_

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

- `body` - a _JS object_, to be send with the request. It will be authomatically passed through `JSON.stringify`
- `method` - an _HTTP method_ to override the default **sendRequest** function behaviour. the Function sets the _method_ to **GET** by default. If a `body` is provided, it sets the _method_ to **POST**
- `headers` - an _HTTP headers_ object for specifying headers. The Function sends `"Content-Type": "application/json"` by default, when a `body` is provided.
- `auth` - flag that instructs the Function to attach the authorization token to the _headers_. It's _true_ by default.

### useAuth

The **useAuth** hook check _localStorage_ for user authentication data. It then tries to decode the token, update the global state and if the token is close to expiring it tries to refresh it by sending a refresh request to the backend. The hook uses the `headers` option of `sendRequest`, to manualy set the _Authorization_ header of the request for refresh.

## Special data

### Training Programs

The training programs are a special _data type_ - `TrainingProgram`. Every program has to have a specific set of properties and methods, in order to be able to be called from other parts of the program.

- `id`, `active` - properties needed for the Redux store
- `name`, `shortDesc`, `longDesc` - properties that describe the training program
- `InitComponent` - component used to gather data for initializing the training program