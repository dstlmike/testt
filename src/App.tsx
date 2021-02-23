import React, { PureComponent } from 'react';
import '../src/App.scss';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import UploadPage from '../src/components/UploadPage';
import ListPage from '../src/components/ListPage';
import Upload from '../src/assets/images/upload.png';
import List from '../src/assets/images/list.png';

class App extends PureComponent<{}> {
  render() {
    return (
      <div className="Main">
        <div className="Header">
          <p className="Header__Title">GridFS - Upload and List Files</p>

          <div className="Menu">
            <Link to='/'>
              <img
                src={Upload}
                alt="upload"
                className="Menu__Item"
              />
            </Link>
            <Link to='/list'>
              <img
                src={List}
                alt="list"
                className="Menu__Item"
              />
            </Link>
          </div>
        </div>

        <div className="Routes">
          <Switch>
            <Route exact path='/' component={UploadPage} />
            <Route exact path='/list' component={ListPage} />
            <Redirect from='/**' to='/' /> -->
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
