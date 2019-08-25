//Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';

//Instruments 
import Styles from './styles.m.css';

export default class Like extends Component {
    static propTypes = {
        _likePost:  func.isRequired,
        id:         string.isRequired,
        likes:      arrayOf(
            shape({
                id:         string.isRequired,
                firstName:  string.isRequired,
                lastName:   string.isRequired,
            }),
        ).isRequired,
    };

    constructor () {
        super();

        
      this._getLikedByMe = this._getLikedByMe.bind(this);
      this._getLikeStyles = this._getLikeStyles.bind(this);
    }

    _getLikedByMe () {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;
        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` ===
                `${currentUserFirstName} ${currentUserLastName}`
            );
        });

    }

    _getLikeStyles () {

    }

    render () {
        return (
            <section className = { Styles.like }>
                <span>Like</span>
            </section>
        );
    }
}