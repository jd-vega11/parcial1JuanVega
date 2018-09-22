import React, {Component} from "react";

class Footer extends Component {
  render() {
    return (
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">Made with <i className="fa fa-heart" aria-hidden="true"> </i> by Juan D. Vega — Copyright ©
                            2018 <a href="/">1st Midterm - WebDev Course - Uniandes (CO)</a>. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
