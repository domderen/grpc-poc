import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thesis: '',
      serverOutput: [],
    }
  }

  componentDidMount = () => {
    this.client = new WebSocket(`wss://poc-${process.env.REACT_APP_ENV}.opsy.site/api/v1/ws`);

    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    this.client.onmessage = (message) => {
      if(message.data.startsWith('{')) {
        this.setState({
          serverOutput: [...this.state.serverOutput, JSON.parse(message.data)],
        });
      }
    };
  }

  handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        thesis: e.target.value,
        serverOutput: []
      });
      this.client.send(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Provide a thesis for validation
          </p>
          <input className="Theis-input" type="text" onKeyDown={this.handlePressEnter} />
          <div className="Theis-output">
            {this.state.thesis ? <p>Testing thesis: {this.state.thesis}</p> : null}
          {this.state.serverOutput.map((output, index) => {
            return (
              <div key={index}>
                <p>{output.validationType}: {output.isValid ? 'Valid' : 'Not valid'}</p>
                <span className="Error-msg">{output.errorMessage}</span>
              </div>
            );
          })}
        </div>
        </header>
      </div>
    );
  }
}

export default App;
