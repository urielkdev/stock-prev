import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { navigatePage } from '../../../actions';
import stockPrevApi from '../../../api/stock-prev-api';
import OperationModal from '../operation/OperationModal';

class ShowUserPage extends Component {

  state = {
    user: {},
    showOperationModal: false,
    operationTypeModal: "",
    accountType: ""
  }

  async componentDidMount() {
    let cpf = this.props.match.params.id;
    let data = (await stockPrevApi.get(`users/${cpf}`)).data;
    // format the date
    data.birthDate = _.join(_.reverse(data.birthDate.split("-")), "/");
    this.props.initialize(_.assign({}, data, data.address));
    await this.setState({
      user: data
    });
    this.fetchBalances();
  }

  async fetchBalances() {
    let normalBalance = (await stockPrevApi.get(`operations/${this.state.user.cpf}/balance/normal`)).data;
    normalBalance = (normalBalance === "nu" || !normalBalance) ? "0,00" : normalBalance;
    let eventualBalance = (await stockPrevApi.get(`operations/${this.state.user.cpf}/balance/eventual`)).data;
    eventualBalance = (eventualBalance === "nu" || !eventualBalance) ? "0,00" : eventualBalance;
    let balance = (parseFloat(normalBalance.replace(',', '.')) + parseFloat(eventualBalance.replace(',', '.'))).toFixed(2).replace('.', ',');
    this.setState({
      user: {
        ...this.state.user,
        balance,
        normalBalance: normalBalance,
        eventualBalance: eventualBalance
      }
    });
  }

  renderInput = ({ input, label, type }) => {
    // parsing the props to input, like the onChange and value
    const divClassName = "field"
    return (
      <div className={divClassName}>
        <label>{label}</label>
        <input {...input} type={type} readOnly />
      </div>
    );
  }

  onModalSubmit = async (form) => {
    let pureValue = form.value;
    let value = this.state.operationTypeModal === "saque" ? ("-" + form.value) : form.value;
    let operation = {
      value,
      type: this.state.accountTypeModal
    };
    await stockPrevApi.post(`/operations/${this.state.user.cpf}`, operation);
    await this.setState({ showOperationModal: false });
    this.fetchBalances();
    let toastText = `${this.state.operationTypeModal} de ${pureValue} reais na conta ${this.state.accountTypeModal} feito com sucesso !`;
    toast(toastText);
  }

  openOperationModal = (operationType, accountType) => {
    this.setState({
      showOperationModal: true,
      operationTypeModal: operationType,
      accountTypeModal: accountType
    });
  }

  render() {
    if (!this.state.user) return "Carregando ...";

    return (
      <div>
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
        
        <OperationModal
          show={this.state.showOperationModal}
          userCpf={this.state.user.cpf}
          operationType={this.state.operationTypeModal}
          accountType={this.state.accountTypeModal}
          onDismiss={() => this.setState({ showOperationModal: false })}
          onSubmit={this.onModalSubmit}
        />

        <form className="ui form" style={{ padding: 20 }}>
          <div className="ui grid">
            <div className="ui stackable two column row">
              <div className="column ten wide">
                <Field name="name" component={this.renderInput} type="text" label="Nome Completo:" />
              </div>
              <div className="column six wide">
                <Field name="cpf" component={this.renderInput} type="text" label="CPF:" />
              </div>
            </div>
            <div className="ui stackable three column row">
              <div className="column seven wide">
                <Field name="gender" component={this.renderInput} type="text" label="Sexo:" />
              </div>
              <div className="column seven wide">
                <Field name="birthDate" component={this.renderInput} type="text" label="Data de Nascimento:" />
              </div>
              <div className="column two wide">
                <Field name="age" component={this.renderInput} type="text" label="Idade" />
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
              <div className="column seven wide ">
                <Field name="addressStreet" component={this.renderInput} type="text" label="Logradouro:" />
              </div>
              <div className="column two wide">
                <Field name="addressNumber" component={this.renderInput} type="text" label="Número:" />
              </div>
              <div className="column seven wide">
                <Field name="addressComplement" component={this.renderInput} type="text" label="Complemento:" />
              </div>
            </div>
          </div>
        </form>


        <div className="ui grid" style={{ marginLeft: 10, marginRight: 16, marginTop: 16 }}>
          <div className="ui stackable three column row">
            <div className="column wide">
              <div className="ui card" style={{ width: "100%", textAlign: "center" }}>
                <div className="content">
                  <div className="header">Saldo Normal</div>
                  <div className="header" style={{ marginTop: 10, color: this.state.user.normalBalance < "0" ? "red" : "green" }}>
                    {this.state.user.normalBalance}
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <button className="ui basic green button fluid" onClick={() => this.openOperationModal("deposito", "normal")}>
                      Depósito
                    </button>
                    <button className="ui basic red button" onClick={() => this.openOperationModal("saque", "normal")}>
                      Saque
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="column wide">
              <div className="ui card" style={{ width: "100%", textAlign: "center" }}>
                <div className="content">
                  <div className="header">Saldo Eventual</div>
                  <div className="header" style={{ marginTop: 10, color: this.state.user.eventualBalance < "0" ? "red" : "green" }}>
                    {this.state.user.eventualBalance}
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <button className="ui basic green button fluid" onClick={() => this.openOperationModal("deposito", "eventual")}>
                      Depósito
                    </button>
                    <button className="ui basic red button" onClick={() => this.openOperationModal("saque", "eventual")}>
                      Saque
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="column wide">
              <div className="ui card" style={{ width: "100%", textAlign: "center" }}>
                <div className="content">
                  <div className="header">Saldo Total Geral</div>
                  <div className="header" style={{ marginTop: 10, color: this.state.user.balance < "0" ? "red" : "green" }}>
                    {this.state.user.balance}
                  </div>
                </div>
                <div className="extra content">
                  <button className="ui basic primary button fluid" onClick={() => this.props.navigatePage(`users/${this.state.user.cpf}/operations/history`)}>
                    Extrato
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ui grid" style={{ paddingLeft: 20, paddingRight: 20 }}>
          <div className="column">
            <button className="ui button primary basic fluid" onClick={() => this.props.navigatePage(`users/${this.state.user.cpf}/edit`)}>
              Editar Usuário
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default reduxForm({
  form: 'showUserForm' // a unique name for this form
})(connect(null, {
  navigatePage
})(ShowUserPage))