import Book from '../models/Book.js';
import {bookUpdateSchema, bookValidationSchema} from '../validators/bookValidator.js';

const addBook = async (data) => {
  const {error, value} = bookValidationSchema.validate(data);
  console.log(value);
  if (error) {
    throw new Error(error.message);
  }
  const addedBook = await Book.create(value);
  return addedBook;
};

const getFilteredBooks = async (filters) => {
  const books = await Book.find(filters)
    .select('-_id book_id title author price description stock image')
    .exec();

  return books;
};
const deleteBook = async (id) => {
  await Book.deleteOne({book_id: id});
};

const editBook = async (id, data) => {
  const {error, value} = bookUpdateSchema.validate(data);
  if (error) {
    throw new Error(error.message);
  }
  const updatedBook = await Book.findOneAndUpdate(
    {book_id: id},
    value,
    {new: true, runValidators: true}
  ); if (!updatedBook) {
    throw new Error('Employee not found');
  }
  return updatedBook;
};

export {
  addBook,
  deleteBook,
  editBook,
  getFilteredBooks
};
