import React from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
//IMPORT COOKBOOK DISPLAY
import Display from "./Display";
//IMPORT FORM
import Form from "./Form";

function App() {

  // ============= DEDINING SOME VARIABLES... =============
  const url = "http://localhost:4000/api"

  const emptyBook = {
    title: "Enter Book",
    yearPublished: 0
  }

    //=============== MAKING SOME STATES... =============

  //MAKE A STATE TO HOLD THE BOOKS. Our API was 1 object with status and an array of cookbooks. 
  // So set the begining state to empty object
  const [cookbooks, setCookbooks] = React.useState({})

  //MAKE A STATE TO HOLD THE CURRENT SELECTED BOOK -- useful for editing a book.
  const [selectedBook, setSelectedBook] = React.useState({})


  //=============== CRUD FUNCTIONS =============
  //create a book
  const handleCreate = (newBook) => {
    //to use the POST method, the fetch function must take in a 2nd parameter
    // ... which is an object with a 'method' key and a 'headers' key
    
    fetch(`${url}/cookbooks`, {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newBook)
    })
    .then( () => {
      getBooks()
    })

    console.log(JSON.stringify(newBook))
  }

  // Function to get the current book selected for update.
  const selectBook = (book) => {
    setSelectedBook(book)
  }

  //handleUpdate function for updating books
const handleUpdate = (book) => {
  console.log("App.js - you are editing: ", book)

  fetch(`${url}/cookbooks/${book._id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }).then(() => {
    // don't need the response from the post but will be using the .then() to update the list of dogs
    getBooks();
  });

};

  // Deletes a cookbook by ID. I have 2 delete methods...one for title, one for ID.
  // The ID url is http://localhost:4000/api/cookbooks/id/6018ac91891db01e63678109
  // ++++ It seems even though i changed the path of one of the delete routes...we can't have 2 delete routes in contorllers.
  // Only the first delete route will work. 
  const deleteBook = (book) => {
    fetch(url + "/cookbooks/id/" + book._id, {
      method: "delete"
    })
    .then(() => {
      getBooks()
    })
  }

  
  // ============= USEEFFECT FUNCTION TO GET COOKBOOKS DATA =============
  const getBooks = async () => {
    const response = await fetch(`${url}/cookbooks`);
    const data = await response.json();
    setCookbooks(data);
  };
  
  // fetch dogs when page loads
  React.useEffect(() => {
    getBooks()
  }, [])

  console.log("cookbooks state: ", cookbooks)

  return (
    <div className="App">
      <h1>COOKBOOK API</h1>

      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/create">
        <button>Create a Book</button>
      </Link>

      <hr />

      <main>
        <Switch>
          <Route 
            exact path="/" 
            render={(rp) => <Display {...rp} books={cookbooks.cookbooks} selectBook={selectBook} deleteBook={deleteBook} />} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" books={emptyBook} handleSubmit={ handleCreate }/>
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" books={selectedBook} handleSubmit={ handleUpdate } />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
