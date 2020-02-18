const { Extension, log, PLATFORMS } = require('deckboard-kit');
const { INPUTS } = require('./constants');
const Voicemeeter = require('voicemeeter-connector');

class VoicemeeterControl extends Extension {
	constructor() {
		super();
		this.name = 'Voicemeeter Control';
		this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
		this.inputs = INPUTS;
		this.initExtension();
	}

	initExtension() {
		Voicemeeter.default
			.init()
			.then(vm => {
				this.vm = vm;
				this.vm.connect();
			})
			.catch(err => console.log('error', err));
	}

	execute(action, { number, param, value }) {
		if (!this.vm || !this.vm.isConnected) return;

		switch (action) {
			case 'vm-set-strip':
				this.vm.setStripParameter(number, param, value);
				break;
			case 'vm-set-bus':
				this.vm.setBusParameter(number, param, value);
				break;
			default:
				break;
		}
	}
}

module.exports = new VoicemeeterControl();
