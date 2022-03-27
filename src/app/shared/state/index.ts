import { Action, ActionReducer, ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";
import { logoutMetareducer } from "./logout.metareducer";

export interface State {
  auth: fromAuth.State;
  books: fromBooks.State;
}
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  books: fromBooks.reducer
};

function logger(reducer: ActionReducer<any, any>){
  return (state: any, action: Action) => {
    console.log('previous state', state);
    console.log('action', action);

    const nextState = reducer(state, action);

    console.log('Next State', nextState);

    return nextState;
  }
}

export const metaReducers: MetaReducer<State>[] = [logger,logoutMetareducer];

/**
 * Auth Selectors
 */
//export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');
 export const selectAuthState = (state: State) => state.auth;
 export const selectGettingAuthStatus = createSelector(
   selectAuthState,
   fromAuth.selectGettingStatus
 );
 export const selectAuthUser = createSelector(
   selectAuthState,
   fromAuth.selectUser
 );
 export const selectAuthError = createSelector(
   selectAuthState,
   fromAuth.selectError
 );

/**
 * Books Selectors
 */
 export const selectBooksState = (state: State) => state.books;

 export const selectAllBooks = createSelector(
   selectBooksState,
   fromBooks.selectAll
 );
 export const selectActiveBook = createSelector(
   selectBooksState,
   fromBooks.selectActiveBook
 );
 export const selectBooksEarningsTotals = createSelector(
   selectBooksState,
   fromBooks.selectEarningsTotals
 );