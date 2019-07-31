import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigatePage } from '../../actions';
import HeaderItem from './HeaderItem';

class Header extends Component {

    pageItem(page, pageTitle, onClick) {
        return (
            <HeaderItem
                page={page}
                pageTitle={pageTitle}
                onClick={onClick ? onClick : null}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="ui secondary pointing menu">
                    <div className="item" onClick={() => this.props.navigatePage("home")} style={{ cursor: 'pointer' }}>
                        STOCK PREV
                    </div>
                    <div className="right menu">
                    </div>
                    {this.pageItem("users/create", "Cadastrar Participante")}
                </div>
            </div>
        );
    }
}

export default connect(null, {
    navigatePage
})(Header);