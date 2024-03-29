//Core 
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';
import { withProfile } from '../HOC/withProfile';

const Postman = (props) => {
    return (
        <section className = { Styles.postman }>
            <img src = { props.avatar } />
            <span>Welcome online, { props.currentUserFirstName}</span>
        </section>
    );
};

export default withProfile(Postman);