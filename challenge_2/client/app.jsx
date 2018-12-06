import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chart from 'chart.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      labels: [],
      data: [],
    };
    this.getData = this.getData.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('/v1/bpi/historical/close.json')
      .then((results) => {
        const { bpi } = results.data;
        const labels = Object.keys(bpi);
        const data = Object.values(bpi);
        this.setState({ labels, data });
        this.renderChart();
      })
      .catch(error => console.log(error));
  }

  renderChart() {
    const { node } = this;
    const { labels, data } = this.state;
    console.log(labels, data)
    const myChart = new Chart(node, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '# of votes',
          data,
        }],
      },
    });
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
