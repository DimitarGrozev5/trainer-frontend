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

The *User Slice* contains data about the logged in user. If no user is logged in, the data is **null**.

## Routing

Routing is achieved through *React Router v6*.

### Routes structure

The App has two sets of **Routes**. One for logged in users and one for guests. The *App.tsx* file renders one of the two sets, based on wheter a user is logged in.

### Templates

The App uses a *BaseTemplate* Component, that provides an html structure for rendering all other content. The *BaseTemplate* has a **header** element for displaying the App name, and a **main** element, that contains an `Outlet` Component, for hosting all other page content.

## Specific Components and custom hooks

### BaseTemplate Component

The *BaseTemplate* Component provides an experience, similar to a native Android app. The **header** takes up 1/3 of the screen, to allow the user to reach with his thumb the top of the **main** content. When the page is scrolled the **header** shrinks to a small text at the top of the page. This transition is achieved through a library - *framer-motion*.

The Component uses the *framer-motion* hook `useScroll`, to keep track of the vertical scrolling position. The hook is configured to return the scrolling position, not relative to the **body**, but relative to the *header* **h1** element, that contains the page title. The hook returns `0` when the page is scrolled to the top and `1` when the *h1* element is about to go out of view.

The `useTransform` hook is used to animate a change in opacity of the page title, and to link the animation to the scroll position.

When the *h1* title element drops out of view, the *h3* title changes it's `position` to `fixed`, in order to stay on the top of the viewport. This happens through the `onChange` handler that the `useScroll` hook returns.

The *BaseTemplate* header is designed to display either the *h1* title, or the *h3* title. The transition between them is made to look nice, but when the user stops scrolling, the page has to snap to one of the two positions. This is achieved using the *header* element's `scrollTop` property. An event handler is added to the `touchEnd` Event, so when the user stops scrolling the page will autoscroll to one of the two positions.

