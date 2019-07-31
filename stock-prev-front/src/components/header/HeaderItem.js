import React from 'react';
import { connect } from 'react-redux';
import { navigatePage } from '../../actions';

const HeaderItem = (props) => {
    // console.log(props);

    const onClick = () => {
        if (props.onClick){
            props.onClick();
            return;
        }
        props.navigatePage(props.page);
    }

    return (
        <div
            className={`item ${props.currentPage === props.page ? 'active' : ''}`}
            style={{cursor: 'pointer'}}
            onClick={onClick}
        >
            {props.pageTitle}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage
    };
};

export default connect(mapStateToProps, {
    navigatePage
})(HeaderItem);