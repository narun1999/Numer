import React, { Component } from 'react';
import Header from './Header';
import Chart from './Chart';


class App extends Component{
  
  render(){
    return (
      
      <div className="App">
          <Header />
          <h1 style={{textAlign:"center"}}>This is Home page</h1>
          
      </div>
      
    );
  }
}
export default App;
