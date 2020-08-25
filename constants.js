const { INPUT_METHOD } = require('deckboard-kit');
const { BusProperties, StripProperties } = require('voicemeeter-connector');

const stripBusInput = [
	{
		label: 'Number',
		ref: 'number',
		type: INPUT_METHOD.INPUT_SELECT,
		items: [
			{ value: 0, label: '0' },
			{ value: 1, label: '1' },
			{ value: 2, label: '2' },
			{ value: 3, label: '3' },
			{ value: 4, label: '4' },
			{ value: 5, label: '5' },
			{ value: 6, label: '6' },
			{ value: 7, label: '7' }
		]
	},
	{
		label: 'Value',
		ref: 'value',
		type: INPUT_METHOD.INPUT_TEXT
	}
];

const INPUTS = [
	{
		label: 'Set Strip Parameter',
		value: 'vm-set-strip',
		icon: 'headphones',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			{
				label: 'Parameter',
				ref: 'param',
				type: INPUT_METHOD.INPUT_SELECT,
				items: Object.keys(StripProperties).map(x => ({
					value: StripProperties[x],
					label: x
				}))
			},
			...stripBusInput
		]
	},
	{
		label: 'Set Bus Parameter',
		value: 'vm-set-bus',
		icon: 'headphones',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			{
				label: 'Parameter',
				ref: 'param',
				type: INPUT_METHOD.INPUT_SELECT,
				items: Object.keys(BusProperties).map(x => ({
					value: BusProperties[x],
					label: x
				}))
			},
			...stripBusInput
		]
	}
];

module.exports = {
	INPUTS
};
