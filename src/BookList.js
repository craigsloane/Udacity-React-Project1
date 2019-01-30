import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }
  render() {
    const {books, changeBookShelf} = this.props;
    const bookShelves = [
      { value: 'currentlyReading', name: 'Currently Reading' },
      { value: 'wantToRead',  name: 'Want to Read' },
      { value: 'read', name: 'Read'}
    ]
    return (
      <div className="list-books-content">
        {bookShelves.map((shelf,k) => {
          const booksOnShelf = books.filter( book => book.shelf === shelf.value)
          return (
            <div className="bookshelf" key={k}>
              <h2 className="bookshelf-title">{shelf.name}</h2>
              <div className="bookshelf-books">
              <BookShelf
                books={booksOnShelf}
                changeBookShelf={changeBookShelf}
              />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BookList;
