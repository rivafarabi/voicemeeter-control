const { INPUT_METHOD } = require('deckboard-kit');
const { BusProperties, StripProperties } = require('voicemeeter-connector');

const mapPropsToSelection = props =>
	Object.keys(props).map(x => ({
		value: props[x],
		label: x
	}))

const OUTPUT_TYPES = {
	1: 'MME',
	3: 'WDM',
	4: 'KS'
}

const additionalStripProps = [
	'Reverb',
	'Delay',
	'Fx1',
	'Fx2',
	'PostReverb',
	'PostDelay',
	'PostFx1',
	'PostFx2'
].map(x => ({ value: x, label: x }))

const additionalBusProps = [
	'Sel',
	'ReturnReverb',
	'ReturnDelay',
	'ReturnFx1',
	'ReturnFx2'
].map(x => ({ value: x, label: x }))

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
				items: [
					...mapPropsToSelection(StripProperties),
					...additionalStripProps
				]
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
				items: [
					...mapPropsToSelection(BusProperties),
					...additionalBusProps
				]
			},
			...stripBusInput
		]
	}
];

module.exports = {
	INPUTS,
	OUTPUT_TYPES
};
