import React, { Component } from 'react';
import '../css/app.css';
import logo from '../images/logo.png';
import Headerbar from '../components/headerbar';
import Footertext from '../components/footertext';
import Helper from '../components/helper';
import { Layout } from 'antd';
const { Content } = Layout;

class Help extends Component {
	constructor(props,context) {
        super(props,context);
          this.state = {
            id: this.props.match.params.id,
            current: '2'
        };
    }
  render() {
    return (
      <Layout className="App">
          < Headerbar className="headerbar" current = { this.state.current } id={this.state.id}/>
          < Helper />
        <Footertext />
      </Layout>
    );
  }
}

export default Help;