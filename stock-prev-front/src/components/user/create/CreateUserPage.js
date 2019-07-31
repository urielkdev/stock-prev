import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { navigatePage } from '../../../actions';
import CreateUserForm from './CreateUserForm';
import stockPrevApi from '../../../api/stock-prev-api';

const CreateUserPage = (props) => {
    const [showError, setShowError] = useState(false);

    const onSubmit = async (form) => {
        // select the fields
        let address = _.pick(form, 'addressCep', 'addressState', 'addressCity', 'addressDistrict', 'addressStreet', 'addressNumber', 'addressComplement');
        let user = _.pick(form, 'cpf', 'name', 'gender', 'birthDate', 'email', 'phone');
        // format the date
        user.birthDate = _.join(_.reverse(user.birthDate.split("/")), "-");
        // create address and user
        stockPrevApi.post('/addresses', address).then((addressId) => {
            stockPrevApi.post(`/users/${addressId.data}`, user).then(() => {
                // without toast, because of navigatePage
                // toast(`${user.name} cadastrado com sucesso`);
                props.navigatePage('home');
            }).catch((err) => {
                console.log(err);
                setShowError(true);
            });
        }).catch((err) => {
            console.log(err);
            setShowError(true);
        });

    }

    return (
        <div style={{ height: '100%' }}>
            <CreateUserForm onSubmit={onSubmit} showError={showError} />
        </div>
    );
};

export default connect(null, {
    navigatePage
})(CreateUserPage);