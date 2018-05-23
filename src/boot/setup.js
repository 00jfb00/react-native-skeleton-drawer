import React, {Component} from "react";
import {StyleProvider} from "native-base";

import {AppNavigator} from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import { isSignedIn } from "./auth";

export default class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {

    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const App = AppNavigator(signedIn);
    return (
      <StyleProvider style={getTheme(variables)}>
          <App />
      </StyleProvider>
    );
  }
}
