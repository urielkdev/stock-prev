import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import history from '../history';

const CurrentPageReducer = (currentPage = getFirstRenderedPage(), action) => {
    if (action.type === 'CURRENT_PAGE') {
        return action.payload;
    }
    return currentPage;
}

const getFirstRenderedPage = () => {
    let path = history.location.pathname.slice(1);
    return path ? path : 'home';
}

export default combineReducers({
    form: formReducer,
    currentPage: CurrentPageReducer
});