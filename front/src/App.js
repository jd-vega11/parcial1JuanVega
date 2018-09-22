import React, { Component } from 'react';

//Other components created by me
import Footer from "./Footer.js";
import SaveVisualization from "./SaveVisualization.js";
import Visualizations from "./Visualizations.js";
import ComponenteCreativo from "./ComponenteCreativo.js";

//External components
import vegaEmbed from 'vega-embed';
import Papa from 'papaparse';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
         errorjson:"",
         errorvega:"",
         csvData:null,
         spec:null,
         vis:[]
      };
      this.handleJSONinput = this.handleJSONinput.bind(this);      
      this.papaparseTheCSV = this.papaparseTheCSV.bind(this);
      this.getVisualizations = this.getVisualizations.bind(this);      
      this.showVis = this.showVis.bind(this);
  }

  handleJSONinput( )
  {
    try {
      const spec = JSON.parse(this.textarea.value);
      this.setState({errorjson:""});
      console.log(spec);      
      this.graph(spec); 
      this.setState({spec:spec});     
    }
    catch(error) {
      console.log(error.message);
      this.setState({errorjson:error.message})      
    }
  }

  showErrorJSON()
  {
    if(this.state.errorjson !== "")
    {
      return(
      <div className="alert">      
        {this.state.errorjson}
      </div>
      );   
    }
  }

  showErrorVega()
  {
    //Se establece un TimeOut para esperar que el usuario complete sus cambios.
    //Lo anterior, para evitar el envio continuo de peticiones que afecta el desempenio por crear trafico innecesario. 
    if(this.state.errorvega !== "")
      {
        return(
        <div className="alert">      
          {this.state.errorvega}
        </div>
        );   
      }
  }
  
  graph(spec)
  {
   /* var myData = [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ];*/

    this.setState({errorvega:""})
    if(this.state.csvData)
    {
      const embed_opt = {"mode": "vega-lite"};    
      const view = vegaEmbed(this.div, spec, embed_opt)
            .catch(error => this.setState({errorvega:error.message}))
            .then((res) =>  res.view.insert(spec.data.name, this.state.csvData).run()); 

    } 
       
  }

  papaparseTheCSV() {
      const file = this.inputfile.files[0];
      console.log(file);
      try
      {
        Papa.parse(file, {
          header: true,
          complete: function(csvData) {
            console.log(csvData.data);
            this.setState({csvData: csvData.data});
          }.bind(this)
        });
      }
      catch(error) {
        console.log(error.message);
        
      }      
     
  }


  getVisualizations(filter)
  {
    if(filter)
    {
      console.log(filter);
      fetch("/visualizations?mark=" + filter)
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error getting data");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({vis: json});
      });

    }
    else
    {
      fetch("/visualizations")
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error getting data");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({vis: json});
      });
    }
    
  }

  showVis(spec, data)
  {
    this.setState({csvData:data, spec:spec}, ()=>{
      this.textarea.value = JSON.stringify(spec);
      this.graph(spec);
    });
    
    console.log("Visualizacion mostrada");
  }


  render() {
    
    return (
      <div className="App">
        <h1> Vega-Lite dynamic visualization</h1>
        <div className="row ml-5">
          <div className="col-md-5">
            <h3> Vega-Lite Visualization </h3>
            <div ref={(div) => this.div=div}></div>
            {this.showErrorVega()}
          </div>
          <div className="col-md-4">
            <h3> JSON spec input </h3>
            <textarea ref={(textarea) => this.textarea=textarea}
                      rows="11" 
                      cols="37" 
                      onChange={()=> this.handleJSONinput()}/>     
            {this.showErrorJSON()}        
          </div>
          <div className="col-md-3">
            <h3> Data to visualize </h3>
            <h6> Upload your data from .csv file: </h6>
            <input type="file" 
                   accept=".csv" 
                   ref={(inputfile) => this.inputfile=inputfile} 
                   name="data" 
                   onChange={() => this.papaparseTheCSV()}
                   /> 

            <p> You MUST upload your file. No .csv, no party! </p>     
          </div>                           
        </div>        
        <div className="row ml-5">
          <SaveVisualization onSubmit={this.getVisualizations} spec={this.state.spec} data={this.state.csvData} />
        </div>
        <div className="row ml-5">
          <ComponenteCreativo get={this.getVisualizations} />
        </div>
        <div className="row ml-5">
          <Visualizations get={this.getVisualizations} vis={this.state.vis} onClick={this.showVis}/>
        </div>        
        <Footer/>          
      </div>
    );
  }
}

export default App;
