import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

class Blank extends Component {
	static navigationOptions = {
		title: 'Blank'
	};

	constructor(props) {
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
	};

	render() {
		return <View style={styles.container} />;
	}
}

export default {
	Component: Blank,
	Footer: { show: true, name: 'Blank', icon: 'compass', sort: 0, active: false },
	SideBar: { show: true, name: 'Blank', icon: 'compass', sort: 1, bg: '#C5F442' }
};
