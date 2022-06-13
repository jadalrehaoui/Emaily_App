import React, {Component} from 'react';
import { connect } from 'react-redux'; // to connect the component with the action creator
import { Link } from 'react-router-dom';
import StripeWrapper from './StripeWrapper';
class Header extends Component {

  renderContent(){
    switch(this.props.auth){
      case null:
        return 'Loading...'
      case false:
        return <li><a href="/api/auth/google">Login with Google</a></li>
      default:
        return <>
          <li><StripeWrapper/></li>
          <li><a>Credits: {this.props.auth.credits}</a></li>
          <li><a>{this.props.auth.name}</a></li>
          <li><a href="/api/auth/logout">Logout</a></li>
        </>;

    }
  }
  render(){
    return (
      <nav>
        <div className="nav-wrapper container">
          <Link to={this.props.auth ? "/dashboard" : "/"}
            className="brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}


function mapStateToProps(state) {
  return {auth: state.auth }
}

export default connect(mapStateToProps)(Header);
