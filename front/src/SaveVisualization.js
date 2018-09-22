import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import request from "superagent";


class SaveVisualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      nameVisualization: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.user.length > 0 && this.state.nameVisualization.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const body = JSON.stringify({
      user: this.state.user,
      nameVisualization: this.state.nameVisualization,
      spec: this.props.spec,
      data: this.props.data        
    });
    console.log(body);
    request
    .post("/visualizations/")
    .set("Content-Type", "application/json")
    .send(body)
    .end((err, res)=>{
      console.log(res);
      if(res.exists === "true")
      {
       alert('A visualization with that name already exists. Try again');
      }

      this.props.onSubmit();

   });
  }

  render() {
    return (
      <div className="container-fluid banner">
        <div className="row justify-content-around banner-content center-items">
          <form onSubmit={this.handleSubmit} className="col-6 center-items">
            <FormGroup controlId="user" bsSize="large">
              <ControlLabel className="auth-text">User name</ControlLabel>
                <FormControl
                  autoFocus
                  type="user"
                  value={this.state.user}
                  onChange={this.handleChange}
                  />
                </FormGroup>
            <FormGroup controlId="nameVisualization" bsSize="large">
              <ControlLabel className="auth-text">Visualization name</ControlLabel>
                <FormControl
                  autoFocus
                  type="nameVisualization"
                  value={this.state.nameVisualization}
                  onChange={this.handleChange}
                  /> 
            </FormGroup>                       
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
            Save!
            </Button>
          </form>
        </div>
      </div>
      );
  }
}

export default SaveVisualization;