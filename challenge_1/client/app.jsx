import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// 'http://localhost:3000/events?description_like=pilgrims';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: {},
      pageCount: 0,
    };
    this.getResults = this.getResults.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getResults(e) {
    e.preventDefault();
    const { search } = this.state;
    axios.get(`/events?description_like=${search}`)
      .then((results) => {
        const pageCount = Math.ceil(results.data.length / 10);
        this.setState({ results, pageCount });
      })
      .catch(error => console.log(error));
  }

  handleInput(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { search, results, pageCount } = this.state;
    return (
      <div>
        <form>
          <input type="text" value={search} onChange={e => this.handleInput(e)} />
          <button type="submit" onClick={e => this.getResults(e)}>submit</button>
        </form>
        <div>
          <div>
            {results.data
              ? results.data.map((resultObject, index) => (
                <div key={index}>
                  {index}
                  {resultObject.description.toString()}
                </div>))
              : null}
          </div>
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
