import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { navigatePage } from '../../../actions';
import stockPrevApi from '../../../api/stock-prev-api';
import viaCepApi from '../../../api/via-cep-api';

class EditUserPage extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        let cpf = this.props.match.params.id;
        stockPrevApi.get(`users/${cpf}`).then(({ data }) => {
            this.setState({ user: data });
            this.props.initialize(_.assign({}, data, data.address));
        });
    }

    onSubmit = (form) => {
        // select the fields
        let address = _.pick(form, 'addressCep', 'addressState', 'addressCity', 'addressDistrict', 'addressStreet', 'addressNumber', 'addressComplement');
        let user = _.pick(form, 'email', 'password', 'phone');

        let { cpf, name, gender, birthDate } = this.state.user;

        let newAddress = { ...address, addressId: this.state.user.address.addressId };
        let newUser = { ...user, cpf, name, gender, birthDate };
        // create address and user
        stockPrevApi.put('/addresses', newAddress).then(() => {
            stockPrevApi.put(`/users`, newUser).then(() => {
                toast(`${newUser.name} editado com sucesso`);
                setTimeout(() => {
                    this.props.navigatePage('home');
                }, 3000);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    fetchAddressByCep(cep) {
        viaCepApi.get(`/${cep}/json`).then(({data}) => {
            if (data.erro) {
                this.props.change('addressState', "");
                this.props.change('addressCity', "");
                this.props.change('addressDistrict', "");
                this.props.change('addressStreet', "");
                return
            }
            this.props.change('addressState', data.uf);
            this.props.change('addressCity', data.localidade);
            this.props.change('addressDistrict', data.bairro);
            this.props.change('addressStreet', data.logradouro);
        });
    }

    renderInput = ({ input, label, type, meta }) => {
        // parsing the props to input, like the onChange and value
        const divClassName = `field ${meta.error && meta.touched ? 'error' : null}`;
        // verify cep and fetch de address values
        if (input.name === "addressCep") {
            console.log(this.props);
            let { cep = "" } = this.props;
            if (cep.length === 8 && !isNaN(cep)) {
                this.fetchAddressByCep(cep);
            }
        }
        return (
            <div className={divClassName}>
                <label>{label}</label>
                <input {...input} type={type} autoComplete="off" />
            </div>
        );
    }

    renderError() {
        if (this.props.showError)
            return (
                <div className="ui error message" style={{ marginTop: 20 }}>
                    <p>Você deve ter esquecido de preencher algum campo ou preenchido em um formato errado</p>
                </div>
            );
    }

    render() {
        if (!this.state.user) return "Carregando ...";

        return (
            <div style={{marginTop: 40}}>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" style={{ padding: 20 }}>
                    <div className="ui grid">
                        <div className="ui stackable two column row">
                            <div className="column nine wide">
                                <Field name="email" component={this.renderInput} type="email" label="Email:" />
                            </div>
                            <div className="column seven wide">
                                <Field name="phone" component={this.renderInput} type="text" label="Telefone:" />
                            </div>
                        </div>
                        <div className="ui stackable two column row">
                            <div className="column nine wide">
                                <Field name="addressCep" component={this.renderInput} type="text" label="CEP (apenas numeros):" />
                            </div>
                            <div className="column seven wide">
                                <Field name="addressState" component={this.renderInput} type="text" label="Estado:" />
                            </div>
                        </div>
                        <div className="ui stackable two column row">
                            <div className="column nine wide">
                                <Field name="addressCity" component={this.renderInput} type="text" label="Cidade:" />
                            </div>
                            <div className="column seven wide">
                                <Field name="addressDistrict" component={this.renderInput} type="text" label="Bairro:" />
                            </div>
                        </div>
                        <div className="ui stackable three column row">
                            <div className="column seven wide ">
                                <Field name="addressStreet" component={this.renderInput} type="text" label="Logradouro:" />
                            </div>
                            <div className="column two wide">
                                <Field name="addressNumber" component={this.renderInput} type="number" label="Número:" />
                            </div>
                            <div className="column seven wide">
                                <Field name="addressComplement" component={this.renderInput} type="text" label="Complemento:" />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', marginTop: 20, display: "flex", alignContent: "center", justifyContent: "center" }}>
                        <button className="ui button primary" style={{ width: '20%' }}>Salvar</button>
                    </div>
                </form>
            </div>
        );
    }
};

const validate = ({ email, phone, addressCep, addressState, addressCity, addressDistrict, addressStreet, addressNumber }) => {
    let errors = {};
    if (!email) {
        errors.email = 'Você precisa preencher o email';
    }
    if (!phone) {
        errors.phone = 'Você precisa preencher o phone';
    }
    if (!addressCep) {
        errors.addressCep = 'Você precisa preencher o CEP';
    } else if (addressCep.length !== 8 || isNaN(addressCep)) {
        errors.addressCep = 'Você precisa preencher o CEP com 8 números';
    }
    if (!addressState) {
        errors.addressState = 'Você precisa preencher o estado';
    }
    if (!addressCity) {
        errors.addressCity = 'Você precisa preencher a cidade';
    }
    if (!addressDistrict) {
        errors.addressDistrict = 'Você precisa preencher o bairro';
    }
    if (!addressStreet) {
        errors.addressStreet = 'Você precisa preencher o logradouro';
    }
    if (!addressNumber) {
        errors.addressNumber = 'Você precisa preencher o número';
    }
    return errors;
}

EditUserPage = reduxForm({
    form: 'editUserForm',
    validate
})(EditUserPage)

const selector = formValueSelector('editUserForm')

EditUserPage = connect(state => {
    const cep = selector(state, 'addressCep')
    return {
        cep,
        navigatePage
    }
})(EditUserPage)

export default EditUserPage;