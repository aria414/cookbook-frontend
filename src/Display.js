import React from "react";

const Display = (props) => {
    // The books propety of props has {status and cookbooks as key}. We only need cookbooks
    const data = props.books

    const loaded = () => {
        console.log ("cookbooks props - ", data)
        console.log ("cookbooks length - ",data.length)
    
        const allbooks = data.map( (book) => {
            return (
                <article key={book._id}>
                    <h2>{book.title}</h2>
                    <h3>{book.yearPublished}</h3>

                    <button onClick={ () => {
                        props.selectBook(book)
                        {/* push() takes you to the Form component to edit */}
                        props.history.push('/edit')
                        // console.log("Display.js selectBook prop: ", props.selectBook)
                        // console.log("In Disaplay, you edited: ", book)
                      }}>
                      Edit Book
                    </button>

                    <button onClick={ () => {
                        props.deleteBook(book)
                        {/*  No need to push since you are staying on same page */}
                      }}>
                      Delete Book
                      </button>
                </article>
            )
        })
        return (
            <div>
                <h2>I am the Cookbook</h2>
                {allbooks}
            </div>
        )
    }

    const loading = () => {
        return <h1>Page loading...</h1>;
    }
    
    return data ? loaded() : loading()
   
};

export default Display;
