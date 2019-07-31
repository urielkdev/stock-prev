import React, { Component } from 'react';
import { navigatePage } from '../../actions/index';
import { connect } from 'react-redux';
import faker from 'faker';
import stockPrevApi from '../../api/stock-prev-api';

class HomePage extends Component {

    state = {
        users: null,
        searchWord: "",
        easterEgg: false
    }

    componentDidMount() {
        stockPrevApi.get("users").then(({ data }) => {
            this.setState({ users: data });
        });
    }

    renderUserCard = ({ cpf, name, phone, gender }) => {
        return (
            <div className="ui card" key={cpf}>
                <div className="content" style={{ minHeight: "140px" }}>
                    <img className="right floated huge ui avatar image" src={gender === "feminino" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ53xhQQEUj7hgl-Z7iizTqEAOYucSmHVzO3i4861oLFd97KOWTdg" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvNfSCXR6Eu8hrP_NZHD34kmlfTrh5HV_q1bXEikhiGnMesYAO"} alt={`avatar`} />
                    <div className="header">{name}</div>
                    <div className="description">CPF: {cpf}</div>
                    <div className="description">Telefone: {phone}</div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic primary button" onClick={() => this.props.navigatePage(`users/${cpf}`)}>
                            Ver
                        </div>
                        <div className="ui basic green button" onClick={() => this.props.navigatePage(`users/${cpf}/edit`)}>
                            Editar
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    searchOnChange = (e) => {
        this.setState({ searchWord: e.target.value });
    }

    render() {
        if (!this.state.users) {
            return (
                <div style={{ height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="ui link red card" onClick={() => this.setState({ easterEgg: !this.state.easterEgg })} style={{ paddingTop: 20, paddingBottom: 20, textAlign: "center" }}>
                        <div className="content">
                            <div className="header">
                                Carregando ...
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        let searchWord = this.state.searchWord.toLocaleLowerCase();
        let users = this.state.users.filter((user) => {
            if (
                (user.name.toLocaleLowerCase().indexOf(searchWord) > -1) ||
                (user.cpf.indexOf(searchWord) > -1) ||
                (user.phone.indexOf(searchWord) > -1)
            )
                return true;
            return false;
        });

        if (users.length === 0) {
            return (
                <>
                    <div className="ui stackable column centered grid" style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <div className="four column centered row">
                            <div className="column">
                                <div className="ui icon input" style={{ width: "100%" }}>
                                    <input type="text" placeholder="Procurar ..." onChange={this.searchOnChange}>
                                    </input>
                                    <i className="search icon">
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="ui link red card" onClick={() => this.setState({ easterEgg: !this.state.easterEgg })} style={{ paddingTop: 20, paddingBottom: 20, textAlign: "center" }}>
                            <div className="content">
                                <div className="header">
                                    Nenhum cadastro encontrado
                                </div>
                                <div className="meta" style={{marginTop: 16}}>
                                    Cadastre no botão "Cadastrar Participante no menu"
                                </div>
                                <div className="description">
                                    <p>
                                        {this.state.easterEgg && "Espero fazer parte do time de vocês  ;p"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="ui stackable column centered grid" style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                    <div className="four column centered row">
                        <div className="column">
                            <div className="ui icon input" style={{ width: "100%" }}>
                                <input type="text" placeholder="Procurar ..." onChange={this.searchOnChange}>
                                </input>
                                <i className="search icon">
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui four stackable cards" style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                    {users.map(this.renderUserCard)}
                </div>
            </>
        );
    }
};

export default connect(null, {
    navigatePage
})(HomePage);