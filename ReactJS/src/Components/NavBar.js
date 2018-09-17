import React, {Component} from 'react';

import SearchResult from '../Components/SearchResult';

import {FormInline, Fa} from 'mdbreact'
import {Row, Col} from 'reactstrap';

import { NavLink } from 'react-router-dom';

import axios from 'axios'

import '../Static/CSS/NavBar.css';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tickers: [],
      tickersShowing: [],
    }
  }

  componentWillMount() {
    let self = this
    axios.get(`http://localhost:8080/Portfol.io/GetTickers`)
      .then(function (response) {
        // handle success
        self.setState({tickers: response.data.tickers});
      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our Ticker API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)
        console.log(error);
    })
  }

  findTickers = (ev) => {
    let search = ev.target.value;
    if (search === '') { this.setState({tickersShowing: []}); return;}
    let ans = [];
    let counter = 0;

    for (let stock in this.state.tickers) {
      let ticker = this.state.tickers[stock]['symbol'];
      let company = this.state.tickers[stock]['company'];
      if (ticker.includes(search.toUpperCase())) { ans.push({ticker: ticker, company: company}); counter++; }
      if (counter > 5) break;
    }

    this.setState({tickersShowing: ans})
    // console.log(ans)
  }

  render() {

    const stocks = this.state.tickersShowing.map((stock) =>
      <SearchResult key={stock.ticker} symbol={stock.ticker} company={stock.company}/>
    );

    return (
      <Row style={{backgroundColor: '#1B1B1D'}}>
        <Col className='title' sm='2'>
          <NavLink to={'/Portfol.io/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Portfol.io</b>
          </NavLink>        
        </Col>
        <Col style={{marginTop: '0.6em'}} className='blackBack' sm='4'>
          <div className='z-depth-5 blackBack'>
            <FormInline className="md-form">
              <Fa style={{color: 'whitesmoke'}} icon="search" />
              <input onChange={this.findTickers} style={{zoom: '80%', color: 'whitesmoke'}} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
            </FormInline>

          {stocks}          

          </div>
        </Col>
        <Col sm='3' />
        <Col className='navText' sm='1'>
        <NavLink to={'/Portfol.io/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Home</b>
          </NavLink>        
        </Col>
        <Col className='navText' sm='1'>
          <NavLink to={'/Portfol.io/Games'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Games</b>
          </NavLink>
        </Col>
        <Col className='blackBack' sm='1' />
      </Row>
    );
  }
}

export default NavBar;