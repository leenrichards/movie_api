# movie_api

This is a web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## Built With

This REST API is built with: 

- HTML;
- CSS;
- JavaScript;
- Node.js;
- MongoDB.

## Link to hosted version of the app
<a href="https://lynnflix.herokuapp.com/" target="_blank"> Check it out!</a>

## Essential Features/Technical Requirements
<a href="https://lynnflix.herokuapp.com/" target="_blank"> Check it out!</a>


## User Goals
Users should be able to :
- receive information on movies, directors, actors and genres so they can learn more about movies they’ve watched or are interested in,
- create a profile so they can save data about their favorite movies.


## Essential Features

 <table>
   <tr>
       <th>Action</th>
       <th>Method</th>
       <th>Query Parameters</th>
       <th>Endpoint URL</th>
       <th>Response</th>
   </tr>
      <tr>
          <td>Return a list of all movies in the database</td>
          <td>GET</td>
          <td>None passed (retrieve all)</td>
          <td>'/movies'</td>
       <td>Returns a JSON array of all movies in the database</td>
      </tr>
    </tr>
            <tr>
                <td>Return data about a single movie <b>BY TITLE</b></td>
                <td>GET</td>
                <td>Title</td>
                <td>'/movies/:title'</td>
                <td>Returns a JSON object with data on a single movie based on the <b>title</b> passed in the url.               
              </td>
            </tr>
            <tr>
                <td>Return a list of movies <b>BY GENRE</b> (e.g., "Drama")</td>
                <td>GET</td>
                <td>Genre</td>
                <td>/genres/:genre/movies</td>
                <td>Returns a JSON array of all movies in the database based on the <b>genre</b> passed in the url. </td>
            </tr>
   </table>       



## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- CareerFoundry tutors, mentors and fellow students.

## 📝 License

This project is [MIT](./LICENSE) licensed.
