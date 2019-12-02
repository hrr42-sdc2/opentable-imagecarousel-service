import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/images',
      success: (data) => {
        this.setState({
          images: data
        });
        console.log('retrieve data successfully', data);
      }
    });
  }

  render() {
    return (
      <div>{this.state.images}</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));