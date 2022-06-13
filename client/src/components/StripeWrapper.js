import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';
import { connect } from 'react-redux';
class StripeWrapper extends Component {
  render(){
    return (
      <StripeCheckout
        name="Emaily App"
        description="$5 for 5 email credits"
        amount={500} // amount is in cents
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

function mapStateToProps(state){
  return {auth: state.auth};
}

export default connect(null, actions)(StripeWrapper);
