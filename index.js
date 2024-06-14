const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
const { INPUTS, OUTPUT_TYPES } = require('./constants');
const { Voicemeeter } = require('voicemeeter-connector');

class VoicemeeterControl extends Extension {
	/**
	 * @type {Voicemeeter}
	 */
	vm;

	constructor() {
		super();
		this.name = 'Voicemeeter Control';
		this.platforms = [PLATFORMS.WINDOWS];
		this.configs = null;
		this.inputs = INPUTS;
	}

	async initExtension() {
		try {
			if (!this.vm) {
				this.vm = await Voicemeeter.init();
				this.vm.connect();
			}
			this.vm.updateDeviceList();
			this.inputs = [
				...INPUTS,
				{
					label: 'Set Output Device',
					value: 'vm-set-output',
					icon: 'headphones',
					fontIcon: 'fas',
					color: '#171A21',
					input: [
						{
							label: 'Devices',
							ref: 'device',
							type: INPUT_METHOD.INPUT_SELECT,
							items: this.vm.outputDevices.map(
								({ name, type }) => ({
									value: `${OUTPUT_TYPES[type]}: ${name}`,
									label: `${OUTPUT_TYPES[type]}: ${name}`,
								})
							),
						},
					],
				},
			];

			this.vm.attachChangeEvent(() => {});
		} catch (err) {
			this.inputs = [
				...INPUTS,
				{
					label: 'Set Output Device',
					value: 'vm-set-output',
					icon: 'headphones',
					fontIcon: 'fas',
					color: '#171A21',
					input: [
						{
							label: 'Devices',
							ref: 'device',
							type: INPUT_METHOD.INPUT_SELECT,
							items: [],
						},
					],
				},
			];
		}
	}

	// Executes everytime the button creation modal pops up.
	async update() {
		if (!this.vm || !this.vm.isConnected) return this.initExtension();
	}

	async execute(action, { number, param, value, device }) {
		if (!this.vm || !this.vm.isConnected) await this.initExtension();

		try {
			switch (action) {
				case 'vm-set-strip':
					this.vm.setStripParameter(number, param, value);
					break;
				case 'vm-toggle-strip':
					this.vm.setStripParameter(
						number,
						param,
						this.vm.getStripParameter(number, param) === 0 ? 1 : 0
					);
					break;
				case 'vm-increase-strip':
					this.vm.setStripParameter(
						number,
						param,
						parseFloat(this.vm.getStripParameter(number, param)) +
							parseFloat(value)
					);
					break;
				case 'vm-decrease-strip':
					this.vm.setStripParameter(
						number,
						param,
						parseFloat(this.vm.getStripParameter(number, param)) -
							parseFloat(value)
					);
					break;
				case 'vm-set-bus':
					this.vm.setBusParameter(number, param, value);
					break;
				case 'vm-toggle-bus':
					this.vm.setBusParameter(
						number,
						param,
						this.vm.getBusParameter(number, param) === 0 ? 1 : 0
					);
					break;
				case 'vm-increase-bus':
					this.vm.setBusParameter(
						number,
						param,
						parseFloat(this.vm.getBusParameter(number, param)) +
							value
					);
					break;
				case 'vm-decrease-bus':
					this.vm.setBusParameter(
						number,
						param,
						parseFloat(this.vm.getBusParameter(number, param)) -
							value
					);
					break;
				case 'vm-set-output':
					const [a, b] = device.split(': ');

					this.vm.setBusParameter(
						0,
						'Device.' + a.toLowerCase(),
						`"${b}"`
					);
				default:
					break;
			}
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new VoicemeeterControl();
