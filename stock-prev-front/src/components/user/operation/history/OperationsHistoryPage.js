import React, { Component } from 'react';
import _ from 'lodash';
import stockPrevApi from '../../../../api/stock-prev-api';

class OperationsHistoryPage extends Component {

  state = {
    operations: []
  }

  async componentDidMount() {
    let cpf = this.props.match.params.id;
    let data = (await stockPrevApi.get(`operations/${cpf}`)).data;

    // format the date
    data.map((op) => {
      op.date = _.join(_.reverse(op.date.split("-")), "/");
      return op;
    });
    // ---------------

    await this.setState({
      operations: data
    });
  }

  renderOperation(op) {
    return (
      <tr style={{background: op.value < 0 ? "rgba(255, 120, 120, 0.1)" : "rgba(159, 255, 133, 0.3)"}} key={op.id}>
        <td>{op.date}</td>
        <td className="center aligned">{op.type}</td>
        <td className="right aligned">{op.value}</td>
      </tr>
    );
  }

  render() {
    return (
      <div style={{ padding: 10 }}>
        <table className="ui unstackable black table">
          <thead>
            <tr>
              <th>Data</th>
              <th className="center aligned">Conta</th>
              <th className="right aligned">Valor</th>
            </tr>
          </thead>
          <tbody>
            {this.state.operations.map((op) => this.renderOperation(op))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OperationsHistoryPage;