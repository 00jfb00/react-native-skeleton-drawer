import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Button, Icon, Footer, FooterTab } from 'native-base';

import * as Screens from '../screens';

const datas = [
	...Object.entries(Screens)
		.filter((screen) => {
			return screen[1].Footer.show;
		})
		.sort((a, b) => {
			if (a[1].Footer.sort > b[1].Footer.sort) return 1;
			if (a[1].Footer.sort < b[1].Footer.sort) return -1;
			return 0;
		})
		.map((screen) => {
			return {
				name: screen[1].Footer.name,
				route: screen[0],
				icon: screen[1].Footer.icon,
				active: screen[1].Footer.active
			};
		})
];

class APPFooter extends Component {
	constructor(props) {
		super(props);
		this.state = { datas };
	}

	toggleTab(route) {
		let newDatas = this.state.datas.map((tab) => {
			if (tab.route === route) tab.active = true;
			else tab.active = false;
			return tab;
		});
		this.setState({ datas: newDatas });
		DeviceEventEmitter.emit('reset', route);
	}
	render() {
		return (
			<Footer>
				<FooterTab>
					{this.state.datas.map((tab) => {
						return (
							<Button key={tab.name} active={tab.active} onPress={() => this.toggleTab(tab.route)}>
								<Icon active={tab.active} name={tab.icon} />
							</Button>
						);
					})}
				</FooterTab>
			</Footer>
		);
	}
}

export default APPFooter;
