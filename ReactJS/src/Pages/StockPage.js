import React, {Component} from 'react'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import BuySellCard from '../Components/BuySellCard'

import {Row, Col} from 'reactstrap'

import '../Static/CSS/StockPage.css';

import axios from 'axios'

class StockPage extends Component {
  constructor() {
    super();

    this.state = {
      stockData: [],
      currentPrice: 0,
      selected: 'Day',
    }
  }

  componentWillMount() {
    this._getData();
  }

  _getData() {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Stock/${this.props.stock}/${this.state.selected}`)
      .then((response) => {
        // handle success
        let stockData = response.data;
        // let data = response.data['Time Series (1min)']
        console.error(response.data);
        self.setState({
          stockData: stockData,
          currentPrice: stockData[stockData.length - 1]['y']
        })

      })
      .catch((error) => {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`);
        console.log(`Btw here is the error message\n\n`);
        console.log(error);
      })
  }

  handleTimeChange = (timeFrame) => {
    this.setState({
      selected: timeFrame,
    }, () => this._getData());

  };

  render() {

    const stockOptions = {
      chart: {
        color: 'whitesmoke',
        backgroundColor: '#1B1B1D',
        style: {
          color: 'whitesmoke',
        }
      },
      series: [{
        name: this.props.stock,
        data: this.state.stockData,
      }],
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%h:%M'
        },
      },
      tooltip: {
        valueDecimals: 2,
        valuePrefix: '$',
        valueSuffix: ' USD'
      },
      rangeSelector: {
        enabled: false
      },
    };

    return (
      <Row style={{marginBottom: '1000em'}} className='blackBackground body_div'>
        <Col md='1'/>
        <Col style={{paddingTop: '7em'}} md='6'>
          <h1 className='stockTitle'>{this.props.stock}</h1>
          <h2 className='stockPrice'>${this.state.currentPrice}</h2>

          <b onClick={() => this.handleTimeChange('Day')} className={`timeFrame ${this.state.selected === 'Day' ? 'selected' : ''}`}>1D</b>
          <b onClick={() => this.handleTimeChange('Week')} className={`timeFrame ${this.state.selected === 'Week' ? 'selected' : ''}`}>1W</b>
          <b onClick={() => this.handleTimeChange('Month')} className={`timeFrame ${this.state.selected === 'Month' ? 'selected' : ''}`}>1M</b>
          <b onClick={() => this.handleTimeChange('TriMonth')} className={`timeFrame ${this.state.selected === 'TriMonth' ? 'selected' : ''}`}>3M</b>
          <b onClick={() => this.handleTimeChange('Year')} className={`timeFrame ${this.state.selected === 'Year' ? 'selected' : ''}`}>1Y</b>
          <b onClick={() => this.handleTimeChange('All')} className={`timeFrame ${this.state.selected === 'All' ? 'selected' : ''}`}>All</b>

          <HighchartsReact
            className='highcharts-container'
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={stockOptions}
          />
        </Col>
        <Col md='1'/>
        <Col style={{paddingTop: '6em'}} md='2'>
          <BuySellCard stock={this.props.stock} currentPrice={this.state.currentPrice}/>
        </Col>

        <Col md='1'/>
      </Row>
    );
  }
}

export default StockPage;