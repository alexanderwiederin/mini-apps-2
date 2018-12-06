import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bpi: {},
      labels: [],
      data: [],
    };
    this.getData = this.getData.bind(this);
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
        this.setState({ bpi, labels, data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>test</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

