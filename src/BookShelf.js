import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {books, changeBookShelf} = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            book={book}
            books={books}
            key={book.id}
            changeBookShelf={changeBookShelf}
          />
        ))}
      </ol>
    )
  }
}

export default BookShelf;
