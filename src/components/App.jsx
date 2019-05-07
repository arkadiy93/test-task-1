import React from 'react';
import { getJSON } from 'jquery';
import { pick, fromPairs } from 'lodash';
import MainField from './MainField';

const extractInformation = (results) => {
  const newListInfo = results.map(el => pick(el, ['artistName', 'trackName', 'primaryGenreName', 'collectionName', 'releaseDate']));
  const histoInfoPairs = results.map(el => [el.trackId, Math.floor(el.trackTimeMillis / 1000)]);
  const newHistogramInfo = fromPairs(histoInfoPairs);
  return { newListInfo, newHistogramInfo };
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      listInfo: [],
      histogramInfo: {},
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { inputText, histogramInfo } = this.state;
    const requestedTerm = `term=${inputText}`;
    const requestUrl = ['https://itunes.apple.com/search?media=music', requestedTerm, 'callback=?'].join('&');
    const { results } = await getJSON(requestUrl);
    const { newListInfo, newHistogramInfo } = extractInformation(results);
    // console.log(Object.values(newHistogramInfo) + 'new');
    // console.log(Object.values(histogramInfo) + 'totall in memory');
    this.setState({
      inputText: '',
      listInfo: newListInfo,
      histogramInfo: { ...histogramInfo, ...newHistogramInfo },
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({ inputText: target.value });
  };


  render() {
    const { inputText, listInfo, histogramInfo } = this.state;
    const params = { listInfo, histogramInfo };
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0">iTunes music</div>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <input type="text" className="form-control mr-sm-2" placeholder="Search for music" value={inputText} onChange={this.handleInputChange} />
            <button className="btn btn-default text-white" type="submit">Search!</button>
          </form>
        </nav>
        <MainField {...params} />
      </div>
    );
  }
}
