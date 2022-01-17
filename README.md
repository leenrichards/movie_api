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
        <thead>
            <tr>
                <th>Action</th>
                <th>Method</th>
                <th>Query Parameters</th>
                <th>Endpoint URL</th>
                <th>Response</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Return a list of all movies in the database</td>
                <td>GET</td>
                <td>None passed (retrieve all)</td>
                <td>'/movies'</td>
                <td>Returns a JSON array of all movies in the database:<div class="parameterDesc">
                        <p> MovieID: Integer,</p>
                        <p> Title: String,</p>
                        <p> Genre: String,</p>
                        <p> Description: String</p>
                        <p> Actors: String Array </p>
                    </div>
                </td>

            </tr>
   </table>       

- Return a list of ALL movies to the user;
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user;
- Return data about a genre (description) by name/title (e.g., “Thriller”);
- Return data about a director (bio, birth year, death year) by name;
- Allow new users to register;
- Allow users to update their user info (username, password, email, date of birth);
- Allow users to add a movie to their list of favorites;
- Allow users to remove a movie from their list of favorites;
- Allow existing users to deregister.

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- CareerFoundry tutors, mentors and fellow students.

## 📝 License

This project is [MIT](./LICENSE) licensed.
