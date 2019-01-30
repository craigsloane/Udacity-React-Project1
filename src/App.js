import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route, Link} from 'react-router-dom';
import BookList from './BookList';
import Search from './Search';

class BooksApp extends React.Component {
  state = {books: []}

  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState({books})
    });
  }

  changeBookShelf = ( newBook, newBookShelf ) => {
    BooksAPI.update(newBook, newBookShelf).then(response =>{
      newBook.shelf = newBookShelf;
      var currentBookList = this.state.books;
      var updatedBookList = currentBookList.filter( book => book.id !== newBook.id );
      updatedBookList.push(newBook);
      this.setState({ books: updatedBookList });
    });
  }

  render() {
    const {books} = this.state
    return (
      <div className="app">
        <Route
          path="/search"
          render={({history})=>(
            <Search
              books={books}
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
      <Route
        exact path="/"
        render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <BookList
                  books={books}
                  changeBookShelf={this.changeBookShelf}
            />
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp;
