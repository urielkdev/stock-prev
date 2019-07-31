import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactDOM from 'react-dom';

class OperationModal extends Component {

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.reset();
  }

  renderInput = ({ input, label, type, meta }) => {
    // parsing the props to input, like the onChange and value
    const divClassName = `field ${meta.error && meta.touched ? 'error' : null}`
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
        <div className="ui error message">
          <p>You must enter a valid non-used email and a password longer than 6 characters</p>
        </div>
      );
  }

  colorCard() {
    return this.props.showError ? 'red' : 'blue';
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return ReactDOM.createPortal(
      <div onClick={() => { this.props.onDismiss(); this.props.reset(); }} className="ui dimmer page visible active">
          <div className={`ui centered ${this.colorCard()} card`} onClick={(e) => e.stopPropagation()} style={{padding: '4px' }}>
            <div className="content">
              <div className="header">{this.props.accountType === "normal" ? "Conta Normal" : "Conta Eventual"}</div>
            </div>
            <div className="content">
              <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="value" component={this.renderInput} type="text" label="Valor:" />
                {this.renderError()}
                <button className="ui button primary" style={{ width: '100%' }}>{this.props.operationType === "deposito" ? "Depositar" : "Sacar"}</button>
              </form>
            </div>
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

const validate = ({ value }) => {
  let errors = {};
  if (!value || value <= 0 || isNaN(value)) {
    errors.value = 'Você precisa preencher um valor maior do que 0 reais';
  }
  return errors;
}

export default reduxForm({
  form: 'operationForm',
  validate
})(OperationModal);