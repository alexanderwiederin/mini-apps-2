import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// 'http://localhost:3000/events?description_like=pilgrims';
// 'http://localhost:3000/events?q=death&_page=4&_limit=3'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: {},
      pageCount: 0,
      currentPage: 1,
    };
    this.getResults = this.getResults.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  getResults(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    const { search, currentPage } = this.state;
    axios.get(`/events?q=${search}&_page=${currentPage}`)
      .then((results) => {
        const pageCount = Math.ceil(results.headers['x-total-count'] / 10);
        this.setState({ results, pageCount });
      })
      .catch(error => console.log(error));
  }

  handleInput(e) {
    this.setState({ search: e.target.value });
  }

  changeCurrentPage(page) {
    new Promise((resolve) => {
      this.setState({ currentPage: page.selected });
      resolve();
    })
      .then(() => this.getResults());
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
            onPageChange={page => this.changeCurrentPage(page)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
