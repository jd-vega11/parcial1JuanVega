import React, {Component} from "react";

class ComponenteCreativo extends Component {



render() { 
  return (
    <div className="search">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <h4>Browse Visualizations</h4>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Choose graph mark-type</label>
                  <select className="form-control js-search-category" name="category" ref="category" required data-placeholder="Choose Category" aria-hidden="true">
                    <option value="circle">Circle</option>
                    <option value="area">Area</option>
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="rect">Rect</option>
                    <option value="rule">Rule</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">         
                <button type="submit" className="btn" className="btn" onClick={()=>{
                    this.props.get(this.refs.category.value)}}>Search</button>
              </div>
              <div className="col-md-3">         
                <button type="submit" className="btn" className="btn" onClick={()=>{
                    this.props.get()}}>Delete filter</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ComponenteCreativo;
