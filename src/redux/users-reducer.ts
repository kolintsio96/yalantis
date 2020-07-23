import {usersAPI} from "../api";
import {updateObjInArray} from "../utils/helpers";
import {UserType, PaginationType} from "../types/types";

const FOLLOW = '/users/FOLLOW';
const UNFOLLOW = '/users/UNFOLLOW';
const SET_USER = '/users/SET_USER';
const SET_ACTIVE_PAGINATION = '/users/SET_ACTIVE_PAGINATION';
const SET_TOTAL_PAGINATION = '/users/SET_TOTAL_PAGINATION';
const TOGGLE_IS_FETCHING = '/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING = '/users/TOGGLE_FOLLOWING';


export type InitialStateType = typeof initialState;
type FollowType = {
    type: typeof FOLLOW,
    id: number
};
type UnfollowType = {
    type: typeof UNFOLLOW,
    id: number
};
type SetUsersType = {
    type: typeof SET_USER,
    users: Array<UserType>
};
type SetActivePaginationType = {
    type: typeof SET_ACTIVE_PAGINATION,
    page: number
};
type SetTotalPaginationType = {
    type: typeof SET_TOTAL_PAGINATION,
    total: number
};
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
};
type ToggleFollowingType = {
    type: typeof TOGGLE_FOLLOWING,
    isFetching: boolean
    id: number
};


export let follow = (userId: number): FollowType => ({type: FOLLOW, id:userId});
export let unfollow = (userId: number): UnfollowType => ({type: UNFOLLOW, id: userId});
export let setUsers = (users:Array<UserType>):SetUsersType  => ({type: SET_USER, users: users});
export let setActivePagination = (page: number): SetActivePaginationType => ({type: SET_ACTIVE_PAGINATION, page: page});
export let setTotalPagination = (total: number): SetTotalPaginationType => ({type: SET_TOTAL_PAGINATION, total: total});
export let toggleIsFetching = (isFetching: boolean):ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
export let toggleFollowing = (isFetching: boolean, id: number):ToggleFollowingType => ({type: TOGGLE_FOLLOWING, isFetching, id});

export let getUsers = (page:number, limit: number) => {
    return async (dispatch: any) => {
        dispatch(setActivePagination(page));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsersData(page, limit);
        dispatch(setUsers(data.items));
        dispatch(setTotalPagination(data.totalCount));
        dispatch(toggleIsFetching(false));
    }
};
export let followingUser = (userId: number, followed: boolean) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowing(true, userId));
        let promise = !followed ? usersAPI.followUser(userId) : usersAPI.unfollowUser(userId)
        let response = await promise;
        dispatch(toggleFollowing(false, userId));
        response.resultCode === 0 && !followed ? dispatch(follow(userId)) : dispatch(unfollow(userId));
    }
};

let initialState = {
    users: [] as Array<UserType>,
    pagination:{
        total:0,
        current:1,
        limit: 10
    } as PaginationType,
    isFetching: false,
    inProgressFollowing: [] as Array<number>, // array if user id
};

let usersReducer = (state = initialState, action: any): InitialStateType  => {
    switch (action.type) {
        case FOLLOW : {
            return {
                ...state,
                users: updateObjInArray(state.users, action.id, 'id', {followed: true}),
            };
        }
        case UNFOLLOW : {
            return {
                ...state,
                users: updateObjInArray(state.users, action.id, 'id', {followed: false}),
            };
        }
        case SET_USER: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_ACTIVE_PAGINATION: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: action.page
                }
            }
        }
        case SET_TOTAL_PAGINATION: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    total: action.total
                }
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_FOLLOWING:{
            return {
                ...state,
                inProgressFollowing: action.isFetching
                    ? [...state.inProgressFollowing, action.id]
                    : [state.inProgressFollowing.filter(id => {return id !== action.id})]
            }
        }
        default: {
            return {...state}
        }
    }
}

export default usersReducer;