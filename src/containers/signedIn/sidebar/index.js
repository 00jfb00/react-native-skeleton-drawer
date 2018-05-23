import React, { Component } from 'react';
import { Image, DeviceEventEmitter } from 'react-native';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import styles from './style';

import * as Screens from '../screens';

const drawerCover = require('../../../../assets/drawer-cover.png');
const drawerImage = require('../../../../assets/logo-kitchen-sink.png');

const datas = [
	...Object.entries(Screens)
		.filter((screen) => {
			return screen[1].SideBar.show;
		})
		.sort((a, b) => {
			if (a[1].SideBar.sort > b[1].SideBar.sort) return 1;
			if (a[1].SideBar.sort < b[1].SideBar.sort) return -1;
			return 0;
		})
		.map((screen) => {
			return {
				name: screen[1].SideBar.name,
				route: screen[0],
				icon: screen[1].SideBar.icon,
				bg: screen[1].SideBar.bg
			};
		}),
	{
		name: 'Logout',
		route: 'SignedOut',
		icon: 'easel',
		bg: '#C5F442'
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4
		};
	}

	navigate(route) {
		DeviceEventEmitter.emit('navigation', {
			name: route,
			params: {}
		});
	}

	render() {
		return (
			<Container>
				<Content
					bounces={true}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						top: -1
					}}
				>
					<Image source={drawerCover} style={styles.drawerCover} />
					<Image square style={styles.drawerImage} source={drawerImage} />

					<List
						dataArray={datas}
						renderRow={(data) => (
							<ListItem button noBorder onPress={() => this.navigate(data.route)}>
								<Left>
									<Icon
										active
										name={data.icon}
										style={{
											color: '#777',
											fontSize: 26,
											width: 30
										}}
									/>
									<Text style={styles.text}>{data.name}</Text>
								</Left>
								{data.types && (
									<Right
										style={{
											flex: 1
										}}
									>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg
											}}
										>
											<Text style={styles.badgeText}>{`${data.types}`}</Text>
										</Badge>
									</Right>
								)}
							</ListItem>
						)}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
