# react-star-wars

Simple React-Redux-Firebase application that demonstrates best practices in terms of componentisation, robustness, accessibility and performance.

The application uses a public [Star Wars API](https://swapi.co/api/).

**Functionality**

* data (Star Wars characters) are fetched on-demand from public API
* users are able to upvote and downvote the characters
* these votes are stored in firebase database
* users can see a score of each character together with an overall score of the character
* application displays the characters ordered based on popularity of their votes
* users an search for characters based on their name
* users are able to see full details of the character together with the planet of their origin by clicking on the characters picture
* users are able to write a simple comment in the character's detail page
* responsive design


**Pictures**

![Grid](/.github/1.jpg)

![Detail](/.github/2.jpg)


**How to**

```javascript
git clone https://github.com/martinerko/react-star-wars.git

npm install

npm start
```

**Todos**

* more tests
* Service workers
