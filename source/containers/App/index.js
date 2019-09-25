// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';

//Instruments 
import avatar from 'theme/assets/Lisa';
import { socket } from 'socket/init';

const options = {
    avatar,
    currentUserFirstName: 'Елизавета',
    currentUserLastName: 'Дмитракова',
    loggedIn: false,
  }
  
@hot(module)
export default class App extends Component {
    state = {
        access: false,
    }

    componentDidMount () {
        socket.on('login', () => {
            this.setState({
                loggedIn: true,
            });
        });   
        
        socket.on('logout', () => {
            this.setState({
                loggedIn: false,
            });
        });   

    }

    componentWillUnmount () {
        socket.removeListener('login');
        socket.removeListener('logout');
    }

    render() {
        const { authenticated } = this.props;

        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path='/profile' />
                        <Route component = { Login } path = '/login' render = {(props) => (
                            authenticated ? <App/> : <Redirect to = '/login' />
                        )}/>
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
        
    }
}
