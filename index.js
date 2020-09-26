const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
const { INPUTS, OUTPUT_TYPES } = require('./constants');
const Voicemeeter = require('voicemeeter-connector');

class VoicemeeterControl extends Extension {
	constructor() {
		super();
		this.name = 'Voicemeeter Control';
		this.platforms = [PLATFORMS.WINDOWS];
		this.configs = null;
		console.log('TEEEEEEASDASDASD')

	}

	async initExtension() {
		console.log('TEEEEEEASDASDASD initExtension')
		try {
			this.vm = await Voicemeeter.default.init();
			this.vm.connect();
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
									label: `${OUTPUT_TYPES[type]}: ${name}`
								})
							)
						}
					]
				}
			];
		} catch (err) {
			console.log('error', err);
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
							items: []
						}
					]
				}
			];
		}
	}

	execute(action, { number, param, value, device }) {
		if (!this.vm || !this.vm.isConnected) return;

		switch (action) {
			case 'vm-set-strip':
				this.vm.setStripParameter(number, param, value);
				break;
			case 'vm-set-bus':
				this.vm.setBusParameter(number, param, value);
				break;
			case 'vm-set-output':
				const [a, b] = device.split(': ');
				console.log(b);
				console.log('Device.' + a.toLowerCase());
				this.vm.setBusParameter(
					0,
					'Device.' + a.toLowerCase(),
					`"${b}"`
				);
			default:
				break;
		}
	}
}

module.exports = new VoicemeeterControl();
