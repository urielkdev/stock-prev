import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import viaCepApi from '../../../api/via-cep-api'

class CreateUserForm extends Component {

    state = { gender: "masculino" }

    onSubmit = (formValues) => {
        this.props.onSubmit({ ...formValues, gender: this.state.gender });
    }

    fetchAddressByCep(cep) {
        viaCepApi.get(`/${cep}/json`).then(({data}) => {
            console.log(data);
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

    handleGenderChange = (e) => {
        this.setState({ gender: e.target.value })
    }

    renderGenderInput = () => {
        return (
            <div className="field">
                <label>Sexo</label>
                <select className="ui dropdown" onChange={this.handleGenderChange}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>
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
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" style={{ padding: 20 }}>
                <div className="ui grid">
                    <div className="ui stackable two column row">
                        <div className="column ten wide">
                            <Field name="name" component={this.renderInput} type="text" label="Nome Completo:" />
                        </div>
                        <div className="column six wide">
                            <Field name="cpf" component={this.renderInput} type="text" label="CPF (apenas numeros):" />
                        </div>
                    </div>
                    <div className="ui stackable two column row">
                        <div className="column nine wide">
                            <Field name="gender" component={this.renderGenderInput} />
                        </div>
                        <div className="column seven wide">
                            <Field name="birthDate" component={this.renderInput} type="text" label="Data de Nascimento (DD/MM/AAAA):" />
                        </div>
                    </div>
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
                        <div className="column seven wide">
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
                {this.renderError()}
                <div style={{ width: '100%', marginTop: 20, display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <button className="ui button primary" style={{ width: '20%' }}>Criar</button>
                </div>
            </form>
        );
    }
}

const validate = ({ cpf, name, birthDate, email, phone, addressCep, addressState, addressCity, addressDistrict, addressStreet, addressNumber }) => {
    let errors = {};
    if (!cpf) {
        errors.cpf = 'Você precisa preencher o cpf';
    } else if (cpf.length !== 11) {
        errors.cpf = 'Você precisa preencher o cpf com 11 números';
    }
    if (!name) {
        errors.name = 'Você precisa preencher o nome';
    }
    let birthDateSplitted = _.split(birthDate, "/");
    if (!birthDate) {
        errors.birthDate = 'Você precisa preencher a data de nascimento';
    } else if (birthDate.length !== 10 || birthDate.split("/").length !== 3 ||
               birthDate.indexOf("/") !== 2 || birthDate.indexOf("/", 3) !== 5 ||
               (birthDateSplitted[0] > 31) || (birthDateSplitted[1] > 12) || (birthDateSplitted[2] > 2019)) {
        errors.birthDate = 'Você precisa preencher a data de nascimento no formato pedido';
    }
    if (!email) {
        errors.email = 'Você precisa preencher o email';
    }
    if (!phone) {
        errors.phone = 'Você precisa preencher o telefone';
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

CreateUserForm = reduxForm({
    form: 'createUserForm',
    validate
})(CreateUserForm)

const selector = formValueSelector('createUserForm')

CreateUserForm = connect(state => {
    const cep = selector(state, 'addressCep')
    return {
        cep,
    }
})(CreateUserForm)

export default CreateUserForm;