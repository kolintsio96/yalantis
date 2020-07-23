import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

const getUsersSelector = (state:AppStateType) => {
    return state.usersPage.users;
};
export const getUsersData = createSelector(getUsersSelector, (users) => {
    // https://www.npmjs.com/package/reselect
    // https://github.com/devSchacht/translations/blob/master/articles/reselect-selector-library-for-redux/readme.md
    // Library for difficult selectors
    return users;
});
export const paginationTotal = (state:AppStateType) => {
    return state.usersPage.pagination.total;
};
export const paginationCurrent = (state:AppStateType) => {
    return state.usersPage.pagination.current;
};
export const paginationLimit = (state:AppStateType) => {
    return state.usersPage.pagination.limit;
};
export const isFetching = (state:AppStateType) => {
    return state.usersPage.isFetching;
};
export const inProgressFollowing = (state:AppStateType) => {
    return state.usersPage.inProgressFollowing;
};