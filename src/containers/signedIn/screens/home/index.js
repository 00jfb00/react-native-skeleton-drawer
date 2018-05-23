import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { View, Text } from 'native-base';

import styles from './styles';

class Home extends Component {
	static navigationOptions = {
        title: 'Home'
	};
	
	constructor(props){
		super(props);
	}

	componentWillMount() {
		DeviceEventEmitter.addListener('refresh', this.refresh);
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeListener('refresh', this.refresh);
	}

	refresh = (route) => {
		if (route === this.constructor.name) this.forceUpdate();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Content goes here</Text>
			</View>
		);
	}
}

export default {
	Component: Home,
	Footer: { show: true, name: 'Home', icon: 'home', sort: 1, active: true },
	SideBar: { show: false, name: 'Home', icon: 'home', sort: 0, bg: '#C5F442' }
};
