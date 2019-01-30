import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import bookCoverNotAvailable from './images/bookCoverNotAvailable.jpg';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }

  render(){
    const {book,books,changeBookShelf} = this.props;
    const title = book.title ? book.title : "Title Unavaiable";
    const bookCover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : bookCoverNotAvailable;

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{ width: 128, height: 193, backgroundImage: `url(${bookCover})`, backgroundSize : 'contain' }}>
            </div>
              <BookShelfChanger
                book = {book}
                books = {books}
                changeBookShelf = {changeBookShelf}
              />
          </div>
          <div className="book-title">{title}</div>
          {book.authors && book.authors.map((author,k) => (
            <div
              className="book-authors"
              key={k}
            >
              {author}
            </div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book;
