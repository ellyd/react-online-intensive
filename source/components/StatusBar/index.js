//Core 
import React, { Component } from 'react';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';

//Components 
import { withProfile } from '../HOC/withProfile';

//Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });   
        
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });   

    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateStatusBarEnter = (statusBar) => {
        fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    };


    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]: online,
            [Styles.offline]: !online,
        });

        const statusMassage = online ? 'Online' : 'Offline';

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle  }>
                        <div>{statusMassage}</div>
                        <span />
                    </div>
                    <Link to = {'/profile'}>
                        <img src = { avatar } />
                        <span>{ currentUserFirstName }</span>
                    </Link>
                    <Link to = {'/feed'}>Feed</Link>
                    <button>Log Out</button>
                </section>
            </Transition>
        );
       
    }
}