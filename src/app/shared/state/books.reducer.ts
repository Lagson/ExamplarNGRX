import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";


// const createBook = (
//     books: BookModel[], 
//     book: BookModel
// ) => [...books, book];

// const updateBook = (
//     books: BookModel[], 
//     changes: BookModel
// ) =>
//   books.map(book => {
//     return book.id === changes.id 
//         ? Object.assign({}, book, changes) 
//         : book;
// });

// const deleteBook = (
//     books: BookModel[], 
//     bookId: string
// ) => books.filter(book => bookId !== book.id);

export interface State extends EntityState<BookModel> {
    activeBookId: string | null;
}

const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
    activeBookId: null
})

export const booksReducer = createReducer(
    initialState,
    on(
        BooksPageActions.enter,
        BooksPageActions.clearSelectedBook, 
        (state, action) => {
      return {
          ...state,
          activeBookId: null
      }  
    }),

    on(
        BooksPageActions.selectBook, 
        (state, action) => {
        return {
            ...state,
            activeBookId: action.bookId
        }
    }),

    on(BooksApiActions.booksLoaded,(state,action) =>{
        return adapter.addMany(action.books, {
            ...state,
            activeBookId: null
        })
    }),

    on(BooksApiActions.bookDeleted, (state, action) => {
        return adapter.removeOne(action.bookId, {
            ...state,
            activeBookId: null
        })
    }),

    on(BooksApiActions.bookUpdated, (state, action) => {
        return adapter.updateOne({id: action.book.id, changes: action.book}, {
            ...state,
            activeBookId: null
        })
    }),

    on(BooksApiActions.bookCreated, (state, action) => {
        return adapter.addOne(action.book, {
            ...state,
            activeBookId: null
        })
    }),
);

export function reducer(state: undefined | State, action: Action){
    return booksReducer(state,action);
}


export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
    selectEntities,
    selectActiveBookId,
    (booksEntities, activeBookId) => {
        return activeBookId ? booksEntities[activeBookId]! : null;
    }
);
export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);