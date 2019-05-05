import React from 'react';
import { uniqueId, chunk, isEqual } from 'lodash';
import { getISOYear } from 'date-fns';
import cn from 'classnames';

const buildRow = (el) => {
  const {
    artistName, trackName, primaryGenreName, collectionName, releaseDate,
  } = el;
  return (
    <tr key={uniqueId('tr_')}>
      <td>{trackName}</td>
      <td>{artistName}</td>
      <td>{collectionName}</td>
      <td>{primaryGenreName}</td>
      <td>{getISOYear(releaseDate)}</td>
    </tr>
  );
};


export default class List extends React.Component {
  constructor(props) {
    super(props);
    const { listInfo } = this.props;
    this.state = {
      page: 0,
      prevListInfo: listInfo,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { listInfo } = props;
    const { prevListInfo } = state;
    if (!isEqual(listInfo, prevListInfo)) {
      return {
        page: 0,
        prevListInfo: listInfo,
      };
    }
    return null;
  }

  handleButton = page => () => {
    this.setState({ page });
  };

  getLiClassName = (index) => {
    const { page } = this.state;
    return cn({
      'page-item': true,
      active: index === page,
    });
  }

  render() {
    const { page } = this.state;
    const { listInfo } = this.props;
    const chunkedList = chunk(listInfo, 20);
    const listPart = chunkedList[page] || [];
    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Song name</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                <th>Release Year</th>
              </tr>
            </thead>
            <tbody>
              {listPart.map(buildRow)}
            </tbody>
          </table>
        </div>
        {listInfo.length > 0
          && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {
                  chunkedList.map((el, index) => (
                    <li className={this.getLiClassName(index)} key={uniqueId('li_')}>
                      <button className="page-link" type="button" onClick={this.handleButton(index)}>{index + 1}</button>
                    </li>
                  ))
                }
              </ul>
            </nav>
          )
        }
      </main>
    );
  }
}
