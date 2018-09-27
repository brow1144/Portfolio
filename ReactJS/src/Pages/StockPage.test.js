import React from 'react';
import {shallow} from 'enzyme';
import StockPage from './StockPage';
import axios from 'axios';

// Full day of MSFT
const goodDayData = [{"x":1537882860000,"y":114.63},{"x":1537882920000,"y":114.52},{"x":1537882980000,"y":114.55},{"x":1537883040000,"y":114.58},{"x":1537883100000,"y":114.57},{"x":1537883160000,"y":114.52},{"x":1537883220000,"y":114.63},{"x":1537883280000,"y":114.56},{"x":1537883340000,"y":114.54},{"x":1537883400000,"y":114.71},{"x":1537883460000,"y":114.63},{"x":1537883520000,"y":114.67},{"x":1537883580000,"y":114.58},{"x":1537883640000,"y":114.54},{"x":1537883700000,"y":114.655},{"x":1537883760000,"y":114.61},{"x":1537883820000,"y":114.66},{"x":1537883880000,"y":114.62},{"x":1537883940000,"y":114.75},{"x":1537884000000,"y":114.735},{"x":1537884060000,"y":114.86},{"x":1537884120000,"y":114.82},{"x":1537884180000,"y":114.8},{"x":1537884240000,"y":114.79},{"x":1537884300000,"y":114.8},{"x":1537884360000,"y":114.8015},{"x":1537884420000,"y":114.64},{"x":1537884480000,"y":114.55},{"x":1537884540000,"y":114.54},{"x":1537884600000,"y":114.5907},{"x":1537884660000,"y":114.5325},{"x":1537884720000,"y":114.5925},{"x":1537884780000,"y":114.555},{"x":1537884840000,"y":114.62},{"x":1537884900000,"y":114.62},{"x":1537884960000,"y":114.71},{"x":1537885020000,"y":114.7},{"x":1537885080000,"y":114.66},{"x":1537885140000,"y":114.7},{"x":1537885200000,"y":114.62},{"x":1537885260000,"y":114.52},{"x":1537885320000,"y":114.525},{"x":1537885380000,"y":114.51},{"x":1537885440000,"y":114.52},{"x":1537885500000,"y":114.43},{"x":1537885560000,"y":114.47},{"x":1537885620000,"y":114.429},{"x":1537885680000,"y":114.39},{"x":1537885740000,"y":114.375},{"x":1537885800000,"y":114.37},{"x":1537885860000,"y":114.395},{"x":1537885920000,"y":114.4},{"x":1537885980000,"y":114.38},{"x":1537886040000,"y":114.42},{"x":1537886100000,"y":114.44},{"x":1537886160000,"y":114.42},{"x":1537886220000,"y":114.45},{"x":1537886280000,"y":114.43},{"x":1537886340000,"y":114.45},{"x":1537886400000,"y":114.47},{"x":1537886460000,"y":114.47},{"x":1537886520000,"y":114.48},{"x":1537886580000,"y":114.44},{"x":1537886640000,"y":114.38},{"x":1537886700000,"y":114.384},{"x":1537886760000,"y":114.38},{"x":1537886820000,"y":114.11},{"x":1537886880000,"y":114.105},{"x":1537886940000,"y":114.0632},{"x":1537887000000,"y":113.95},{"x":1537887060000,"y":114},{"x":1537887120000,"y":114.03},{"x":1537887180000,"y":113.98},{"x":1537887240000,"y":114.04},{"x":1537887300000,"y":114.02},{"x":1537887360000,"y":114.0599},{"x":1537887420000,"y":114.01},{"x":1537887480000,"y":113.86},{"x":1537887540000,"y":113.81},{"x":1537887600000,"y":113.93},{"x":1537887660000,"y":113.8899},{"x":1537887720000,"y":113.83},{"x":1537887780000,"y":113.951},{"x":1537887840000,"y":113.955},{"x":1537887900000,"y":113.99},{"x":1537887960000,"y":114},{"x":1537888020000,"y":114.0099},{"x":1537888080000,"y":114},{"x":1537888140000,"y":114.02},{"x":1537888200000,"y":114.01},{"x":1537888260000,"y":114.04},{"x":1537888320000,"y":114.09},{"x":1537888380000,"y":114.12},{"x":1537888440000,"y":114.13},{"x":1537888500000,"y":114.17},{"x":1537888560000,"y":114.18},{"x":1537888620000,"y":114.155},{"x":1537888680000,"y":114.15},{"x":1537888740000,"y":114.14},{"x":1537888800000,"y":114.14}];
// Zero Data
const zeroData = [{}];
// Only 3 data points
const smallData = [{"x":1537882860000,"y":114.63},{"x":1537882920000,"y":114.52},{"x":1537882980000,"y":114.55}];

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Positive Data Retreval', () => {
  test('Day stock data sends with no errors', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.instance().showDataFromAPI(goodDayData);
    expect(stockPage.state().visible).toBe(false);
  })
})

describe('Negative Data Retreval', () => {
  test('Stock Data is 0', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.instance().showDataFromAPI(zeroData);
    expect(stockPage.state().stockData.length).not.toBeGreaterThan(5);
  })

  test('Stock Data is < 5', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.instance().showDataFromAPI(smallData);
    expect(stockPage.state().stockData.length).not.toBeGreaterThan(5);
  })
})

describe('Testing Time Frames', () => {
  test('One Day works', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.find('#day').simulate('click');
    expect(stockPage.state().selected).toBe('Day');
  })
  test('One Month works', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.find('#month').simulate('click');
    expect(stockPage.state().selected).toBe('Month');
  })
  test('Three Months works', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.find('#triMonth').simulate('click');
    expect(stockPage.state().selected).toBe('TriMonth');
  })
  test('One year works', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.find('#year').simulate('click');
    expect(stockPage.state().selected).toBe('Year');
  })
  test('All time works', () => {
    const stockPage = shallow(<StockPage />);
    stockPage.find('#all').simulate('click');
    expect(stockPage.state().selected).toBe('All');
  })
})