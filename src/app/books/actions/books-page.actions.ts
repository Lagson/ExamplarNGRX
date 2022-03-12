import { createAction, props } from "@ngrx/store";
import { BookRequiredProps } from "src/app/shared/models";


export const enter = createAction(`[Books Page] Enter`);

export const selectBook = createAction(
    `[Book Page] Select Book`,
    props<{ bookId: string}>()
)

export const clearSelectedBook = createAction(
    `[Book Page] Clear Selected Book`
)
//[Books Page] Create a book
//  -BookRequiredProps
export const createBook = createAction(
    `[Books Page] Create a book`,
    props<{ book: BookRequiredProps}>()
)

//[Books Page] Update a book
//  -BookRequiredProps
//  - ID of the book being edited
export const updateBook = createAction(
    `[Books Page] Update a book`,
    props<{ bookId: string, changes: BookRequiredProps }>()
)


//[Books Page] Delete a book
//  - ID of the book being deleted
export const deleteBook = createAction(
    `[Books Page] Delete a book`,
    props<{ bookId: string }>()
)
