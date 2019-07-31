import history from '../history';

export const navigatePage = (page) => {
    history.push(`/${page !== 'home' ? page : ''}`)
    return {
        type: 'CURRENT_PAGE',
        payload: page
    };
};