import React from 'react';
import cn from 'classnames';
import Histogram from './Histogram';
import List from './List';

export default class MainField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'list',
    };
  }

  handleSongsButton = () => {
    this.setState({ show: 'list' });
  };

  handleHistogramButton = () => {
    this.setState({ show: 'histogram' });
  };

  render() {
    const { show } = this.state;
    const { histogramInfo, listInfo } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button className="btn btn-link" onClick={this.handleSongsButton} type="button">
                    <span className={cn({ 'text-dark': show === 'list' })}>Songs List</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link" type="button" onClick={this.handleHistogramButton}>
                    <span className={cn({ 'text-dark': show === 'histogram' })}>Histogram</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          {show === 'list' ? <List listInfo={listInfo} /> : <Histogram histogramInfo={histogramInfo} />}
        </div>
      </div>
    );
  }
}
