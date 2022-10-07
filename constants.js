const { INPUT_METHOD } = require('deckboard-kit');
const { BusProperties, StripProperties } = require('voicemeeter-connector');

/**
 * Parameter input
 *
 * @return {ButtonInput}
 */
const ParameterInput = {
    label: 'Parameter',
    ref: 'param',
    type: INPUT_METHOD.INPUT_SELECT,
    items: []
}

/**
 * Index input
 *
 * @type {ButtonInput}
 */
const IndexInput = {
    label: 'Index',
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
}

/**
 * Value input
 *
 * @type {ButtonInput}
 */
const ValueInput = {
    label: 'Value',
    ref: 'value',
    type: INPUT_METHOD.INPUT_TEXT
}

const OUTPUT_TYPES = {
	1: 'MME',
	3: 'WDM',
	4: 'KS'
}

const AdditionalStripProperties = [
	'Reverb',
	'Delay',
	'Fx1',
	'Fx2',
	'PostReverb',
	'PostDelay',
	'PostFx1',
	'PostFx2'
]

const AdditionalBusProperties = [
	'Sel',
	'ReturnReverb',
	'ReturnDelay',
	'ReturnFx1',
	'ReturnFx2'
]

/**
 * Strip props which can be toggled
 *
 * @type {string[]}
 */
const ToggleStripProperties = [
    'Mono',
    'Mute',
    'Solo',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'B1',
    'B2',
    'B3'
];

/**
 * Strip props which can be increased or decreased
 *
 * @type {string[]}
 */
const SliderStripProperties = [
    'Gain',
    'Comp',
    'Gate'
];

/**
 * Bus props which can be increased or decreased
 *
 * @type {string[]}
 */
const SliderBusProperties = [
    'Gain'
]

/**
 * Bus props which can be toggled
 *
 * @type {string[]}
 */
const ToggleBusProperties = [
    'Mono',
    'Mute',
    'EQ'
];

const INPUTS = [
	{
		label: 'Set Strip Parameter',
		value: 'vm-set-strip',
		icon: 'headphones',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: [
					...mapObjectToSelection(StripProperties),
					...mapArrayToSelection(AdditionalStripProperties)
				]
			}),
			IndexInput,
			ValueInput
		]
	},
	{
		label: 'Toggle Strip Parameter',
		value: 'vm-toggle-strip',
		icon: 'microphone-slash',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: mapArrayToSelection(ToggleStripProperties)
			}),
			IndexInput
		]
	},
	{
		label: 'Increase Strip Parameter',
		value: 'vm-increase-strip',
		icon: 'volume-up',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: mapArrayToSelection(SliderStripProperties)
			}),
			IndexInput,
			ValueInput
		]
	},
	{
		label: 'Decrease Strip Parameter',
		value: 'vm-decrease-strip',
		icon: 'volume-down',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: mapArrayToSelection(SliderStripProperties)
			}),
			IndexInput,
			ValueInput
		]
	},
	{
		label: 'Set Bus Parameter',
		value: 'vm-set-bus',
		icon: 'headphones',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: [
					...mapObjectToSelection(BusProperties),
					...mapArrayToSelection(AdditionalBusProperties)
				]
			}),
			IndexInput,
			ValueInput
		]
	},
	{
		label: 'Toggle Bus Parameter',
		value: 'vm-toggle-bus',
		icon: 'volume-mute',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: mapArrayToSelection(ToggleBusProperties)
			}),
			IndexInput
		]
	},
	{
		label: 'Increase Bus Parameter',
		value: 'vm-increase-bus',
		icon: 'volume-up',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: mapArrayToSelection(SliderBusProperties)
			}),
			IndexInput,
			ValueInput
		]
	},
	{
		label: 'Decrease Bus Parameter',
		value: 'vm-decrease-bus',
		icon: 'volume-down',
		fontIcon: 'fas',
		color: '#171A21',
		input: [
			Object.assign({}, ParameterInput, {
				items: mapArrayToSelection(SliderBusProperties)
			}),
			IndexInput,
			ValueInput
		]
	}
];

/**
 *
 * @param {array<String>} props
 *
 * @return {array<object>}
 */
function mapArrayToSelection(props) {
	return props.map(function (x) {
		return {
			value: x,
			label: x
		}
	});
}

/**
 *
 * @param {Object<String, String>} props
 *
 * @return {array<object>}
 */
function mapObjectToSelection(props) {
	return Object.keys(props).map(x => ({
		value: props[x],
		label: x
	}))
}

module.exports = {
	INPUTS,
	OUTPUT_TYPES
};
