import React, {Component} from "react";
import {
  View,
  Text,
  Form,
  Item,
  Input,
  Button,
  IconNB
} from "native-base";

import styles from "./styles";

import {onSignIn, onSignOut} from "../../../../boot/auth";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      success: false,
      errorUsername: false,
      errorPassword: false
    };
  }

  componentWillMount(){
    onSignOut().then().catch();
  }

  render() {
    return (
      <View style={styles.container}>
        <Form style={{marginRight: 15}}>
          <Item success={this.state.success} error={this.state.error || this.state.errorUsername}>
            <Input
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
              <IconNB name="ios-checkmark-circle" style={{display: this.state.success ? "flex" : "none"}}/>
              <IconNB name="ios-close-circle" style={{display: this.state.error ? "flex" : "none"}}/>
          </Item>
          <Item success={this.state.success} error={this.state.error || this.state.errorPassword}>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
              <IconNB name="ios-checkmark-circle" style={{display: this.state.success ? "flex" : "none"}}/>
              <IconNB name="ios-close-circle" style={{display: this.state.error ? "flex" : "none"}}/>
          </Item>
        </Form>
        <Button
          block
          style={{
          margin: 15,
          marginTop: 50
        }}
          onPress={() => {
            let errors = {user: this.state.username.length === 0, pass: this.state.password.length === 0};
            if (errors.user || errors.pass ){
              this.setState({errorUsername: errors.user, errorPassword: errors.pass});
              return;
            }
            this.setState({success: true});
            onSignIn({username: this.state.username}).then(() => this.props.navigation.navigate("SignedIn"));
        }}>
          <Text>Sign In</Text>
        </Button>
      </View>
    );
  }
}

export default Login;
