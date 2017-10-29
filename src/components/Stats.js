import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import Box from '../components/Box';

import './Stats.css';

class Stats extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    fetch('http://localhost:3005/api/stats')
      .then( (data) => {
        return data.json();
      } )
      .then( (data) => {
        this.setState( () => { return data } );
        console.log(this.state);
      })
      .catch( (err) => {
        console.log(err);
      } );
  }

  render() {
    if(!this.state) {
      return <div>Loading</div>
    }
    return (
      <Box variant="Stats large">
        <h2>With yours help we founded <span className="count">{this.state.first}</span> meals</h2>
        <div>
          <img src="/images/food.png" alt=""/>
          <p>
            <span className="count">{this.state.first}</span> meals</p>
        </div>

        <div>
          <img src="/images/earth.png" alt=""/>
          <p><span className="count">2500</span> fed people</p>
        </div>

        <div>
          <img src="/images/clothes.png" alt=""/>
          <p><span className="count">6000</span> relayed clothes</p>
        </div>
        <footer>Thank you very much</footer>
      </Box>
    );
  }

  componentDidMount() {
    $('.count').each(function () {
      $(this).prop('Counter',0).animate({
        Counter: $(this).text()
      }, {
        duration: 8000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
     });
  }
}

export default Stats;
