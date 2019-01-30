import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }
  state = {
    query: '',
    newBooks: [],
    searchError: false
  }

  getBooks = (event) => {
    const query = event.target.value
    this.setState({query})

    if (query){
      BooksAPI.search(query).then((results)=>{
      if (results.length >0){
        for (let result of results){
          for (let book of this.props.books){
            if (result.id == book.id){
              result.shelf = book.shelf
              break
            }else{
              result.shelf = 'none'
            }
          }
        }
        this.setState({newBooks:results, searchError:false})
      } else{
        this.setState({ newBooks: [], searchError: true })
      }
      })
    } else this.setState({newBooks: [], searchError:false})
  }

  render(){
    const {query,newBooks,searchError} = this.state
    const {books,changeBookShelf} = this.props

    return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value = {query}
                  onChange={this.getBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
            {newBooks.length>0 && (
              <div>
                <div className ="">
                  <p> {newBooks.length} books were found: </p>
                </div>
                <ol className="books-grid">
                {newBooks.map((book)=>(
                  <Book
                    book={book}
                    books={newBooks}
                    key={book.id}
                    changeBookShelf={changeBookShelf}
                  />
                ))}
                </ol>
              </div>
            )}
            {searchError && (
            <div>
              <div>
                <p>Search returned 0 results, please try again </p>
              </div>
            </div>
            )}
          </div>
        </div>
    )}
}

export default Search
