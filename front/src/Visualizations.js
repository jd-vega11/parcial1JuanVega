import React, {Component} from "react";

class Visualizations extends Component {


  componentDidMount() {
    this.props.get();
  }

  renderVis( )
  {
    if(this.props.vis)
    {
      console.log(this.props.vis);
      return this.props.vis.map((vis) => {
        return(
        <div key={vis._id}>
          <div className="col-sm mr-sm-0 pr-sm-0 ml-md-3">
                <div className="card border-primary mb-3">
                  <div className="card-header">Visualization Name: {vis.nameVisualization}</div>                             
                  <div className="card-body text-primary">
                    <h5 className="card-title">Usuario: {vis.user}</h5>
                    <p className="card-text"> Type:{vis.spec.mark} </p>
                    <button onClick={() => this.props.onClick(vis.spec, vis.data)}> Show Visualization </button>                    
                  </div>
                </div>                       
            </div>
        </div>);
      });

    }
    
  }

render() { 
  return (
    <div className="container-fuid">
      <div className="row">
        <div className="col offset-md-4">
           <h4 className="myFont">Visualizations!</h4>         
        </div>   
      </div>
      <div className="row mr-sm-0 align-items-center">    
        <div className="row mr-sm-0 align-items-center">
          {this.renderVis()}              
        </div>        
      </div> 
    </div>
    );
  }
}
export default Visualizations;
