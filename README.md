[![Build Status](https://travis-ci.org/sailajaVelampati/Shows.svg?branch=master)](https://travis-ci.org/github/sailajaVelampati/Shows)

# TV-Buzz

### Project Description

```
A simple Tv Shows Application dis[lays shows of all generes and user can search and view the details of show like summary, episodes, and other details. This project is developed in React js .
```

### Technologies

```
React JS
```

### pre-reqisites

```
- NodeJs - 14.15.0
- Java
```

### Main Stack

```
- HTML5
- CSS
- ECMAScript 6 (ES6)
- Javascript
- Jest
- Material UI
- react-multi-carousel
- react-router-dom
```

### React

React help in building single page application using matile reuseable components compatable with all major browsers,

Below I show you the packages I developed the application with:

- React (v17.0.1)
- HTTP client: Fetch
- Unit testing: Jest
- Routes management: react-router-dom
- Components design: react-dom
- Code formatters: ES-Linter
- CSS framework: Material UI

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```

### Compiles and minifies for production

```
npm run build
```

### Unit test

```
npm test
```

### Full Coverage

```
npm test -- --coverage --watchAll
```

### Application functionality.

Home page has full carousel of shows best rated show in each genre, with no duplicate shows. It also has mutli element carousel for each genre with all the shows sorted with rating. user can click on any show to navigate to the details page

Auto-complete Search field dispaly all the available shows in dropdown list. user can click on the show to navegate to the details page.

Search field has search by reference feature. user can type the text, onblur of the search field text related show are displayed in the search list page. user can click on the shows to navigate to details page.

Each page other than home page is enabled with navigation to home page when clicked on title.

Details page displays data of show rating, run-time, show discription, episode details of each season.

Page Not Found: all illegal urls are navigated to NotFound page
details page url params are restricted to number, any string values will be navigated to NotFound page

### Things I am still working on

With the give time and vacation on place I could bring unit testing line ocverage to 88 % there are few functional test case and user event drive test cases to be covered.

I have used material UI for the basic css components. The text for the Mobile and tablel us yet to be worked on.

I have set up CI eneviroment using travis. Working on build pass.

I have run sonarQube localy. It has passed with A rating in all fields.
