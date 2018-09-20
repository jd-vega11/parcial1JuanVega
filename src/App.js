import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';



class App extends Component {

  constructor(props){
      super(props);

      this.state = {
          json:{} 
      };   
      this.graficar = this.graficar.bind(this);
    }

  graficar( )
  {
    var myData = [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ];
    
    const embed_opt = {"mode": "vega-lite"};    
    const el = this.div;
    const view = vegaEmbed(el, JSON.stringify(this.refs.json.value), embed_opt)
          .catch(error => console.log(error))
          .then((res) =>  res.view.insert("myData", myData).run());
  }

  render() {
    return (
      <div className="App">
      <form onSubmit={this.graficar}>
        <div className="form-group">
          <label>Ingresa aquí tu JSON</label>
          <textarea className="form-control" ref="json" cols="40" rows="20" required="required"/>
        </div>
        <button type="submit" className="btn btn-submit">Graficar</button>
      </form>
        <div ref={(div) => this.div=div}> </div>
      </div>
    );
  }
}

export default App;
