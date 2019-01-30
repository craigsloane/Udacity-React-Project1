import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }
  render(){
    const {book,books,changeBookShelf} = this.props
    let currentBookShelf = "none"
    for (let current of books){
      if (current.id === book.id){
        currentBookShelf = current.shelf
        break
      }
    }
    return(
      <div className="book-shelf-changer">
        <select
          onChange={(e) => changeBookShelf(book, e.target.value)}
          defaultValue={currentBookShelf}
        >
          <option value="" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
