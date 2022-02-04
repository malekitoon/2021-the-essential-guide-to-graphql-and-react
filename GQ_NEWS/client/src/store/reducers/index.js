import { combineReducers } from 'redux';
import user from './user';
import posts from './posts';

const rooReducer = combineReducers({
    user,
    posts,
})

export default rooReducer;