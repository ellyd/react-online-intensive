//Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments 
import Styles from './styles.m.css';

@withProfile
export default class News extends Component {

    render() { 

        return (
          <section className = { Styles.news }>
              <button>News</button>
          </section>
        );
    }
}