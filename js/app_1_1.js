var App = {
	_modes: {},
	_mode: null,
	_oscope: null,

	init: function() {
		this._ctx = new AudioContext();

		// this._modes.math = new App.Math();
		// this._modes.signal = new App.Signal();
		this._modes.local = new App.Local();

		this._multiMode = "overlay";
		this._pps = 1;
		this._volume = 1;
		
		this._gain = this._ctx.createGain();
		this._gain.connect(this._ctx.destination);
		this._syncVolume();
		
		this._oscope = new O.Display({
			multiMode:"overlay", 
			pixelsPerSample:1
		});
		
		//document.body.insertBefore(this._oscope.getNode(), document.body.firstChild);
		document.getElementById("container_equalizer").insertBefore(this._oscope.getNode(), document.getElementById("container_equalizer").firstChild);
		//document.body.appendChild(this._oscope.getFPS());
		this._oscope.start();

		this._setMode("local");
	},
	
	createMultipleInputs: function(source, destination, options) {
		var ctx = source.context;

		var splitter = ctx.createChannelSplitter();
		source.connect(splitter);
		
		var merger = ctx.createChannelMerger();
		merger.connect(destination);

		var inputs = [];
		for (var i=0;i<source.channelCount;i++) {
			var input = new O.WebAudioInput(ctx, options);
			var node = input.getAudioNode();
			// source.connect(target, sourceOutput, targetInput
			splitter.connect(node, i, 0);
			node.connect(merger, 0, i);
			inputs.push(input);
		}

		return inputs;
	},
	
	handleEvent: function(e) {
		switch (e.target) {
			case this._multiMode:
				this._oscope.configure({multiMode:this._multiMode.value});
			break;
			
			case this._pps:
				this._oscope.configure({pixelsPerSample:Number(this._pps.value)});
			break;

			case this._volume:
				this._syncVolume();
			break;

			default:
				this._setMode("overlay");
			break;
		}
	},

	_setMode: function(mode) {
		document.querySelector("#mode-" + mode).checked = true;
		if (this._mode) { this._modes[this._mode].stop(this._oscope); }
		this._mode = mode;
		this._modes[this._mode].start(this._oscope, this._gain);
		return this;
	},
	
	_syncVolume: function() {
		this._gain.gain.value = 1;
		//this._gain.gain.value = Math.pow(this._volume.value/100, 2);
	}
}


App.Math = function() {
	this._oscope = null;

	this._inputs = Array.from(document.querySelectorAll("#math input"));
	this._inputs.forEach(function(input) {
		input.addEventListener("input", this);
	}, this);
}

Object.assign(App.Math.prototype, {
	start: function(oscope, destination) {
		this._oscope = oscope;
		this._connect();
	},
	
	stop: function(oscope) {
		oscope.clearInputs();
		this._oscope = null;
	},
	
	handleEvent: function(e) {
		this._connect();
	},
	
	_connect: function() {
		var funcs = [];

		for (var i=0;i<this._inputs.length;i++) {
			try {
				funcs.push(new Function("x", "t", this._inputs[i].value));
			} catch (e) {
				return;
			}
		}

		this._oscope.clearInputs();

		funcs.forEach(function(func) {
			var input = new O.MathInput(func);
			this._oscope.addInput(input);
		}, this);
	}
});

App.Signal = function() {

	this._oscillators = [];
	this._inputs = [];
	
	var input = document.querySelector("#signal [type=range]");
	var span = document.querySelector("#signal span");
	document.querySelector("#signal label:nth-child(4)").appendChild(input.cloneNode(true));
	document.querySelector("#signal label:nth-child(4)").appendChild(span.cloneNode(true));

	var select = document.querySelector("#signal select");
	document.querySelector("#signal label:nth-child(5)").appendChild(select.cloneNode(true));
	
	var all = document.querySelectorAll("#signal input, #signal select");
	Array.from(all).forEach(function(input) {
		input.addEventListener("change", this);
		input.addEventListener("input", this);
	}, this);
}

Object.assign(App.Signal.prototype, {
	start: function(oscope, destination) {
		for (var i=0;i<2;i++) {
			var o = destination.context.createOscillator();
			this._oscillators.push(o);
			o.start();

			var waInput = new O.WebAudioInput(destination.context, null, {scale:0.7});
			var node = waInput.getAudioNode();
			o.connect(node);
			node.connect(destination);
			oscope.addInput(waInput);
			this._inputs.push(waInput);
		}
		//this._updateParams(); /*******************************/
	},
	
	stop: function(oscope) {
		this._oscillators.forEach(function(o) { 
			o.stop();
			o.disconnect();
		});
		this._oscillators = [];
		this._inputs = [];

		oscope.clearInputs();
	},
	
	handleEvent: function(e) {
		this._updateParams();
	},
	
	_updateParams: function() {
		var freqs = document.querySelectorAll("#signal [type=range]");
		var types = document.querySelectorAll("#signal select");
		var spans = document.querySelectorAll("#signal span");
		
		this._oscillators.forEach(function(o, index) {
			o.frequency.value = freqs[index].value;
			o.type = types[index].value;
			spans[index].innerHTML = o.frequency.value + " Hz";
		});
		
		var stabilize = document.querySelector("#signal [type=checkbox]").checked;
		this._inputs.forEach(function(input) {
			input.configure({stabilize:stabilize});
		});
	}
});

App.File = function() {
	this._oscope = null;
	this._destination = null;
	this._audio = null;
}

Object.assign(App.File.prototype, {
	start: function(oscope, destination) {
		this._oscope = oscope;
		this._destination = destination;
		this._audio = null;
	},
	
	stop: function(oscope) {
		this._clear();
	},
	
	_play: function(url, parent) {
		this._audio = new Audio(url);
		this._audio.autoplay = true;
		this._audio.controls = true;
		parent.appendChild(this._audio);

		var ctx = this._destination.context;
		var source = ctx.createMediaElementSource(this._audio);
		
		var inputs = App.createMultipleInputs(source, this._destination, {lineWidth:1, scale:1.5});
		inputs.forEach(this._oscope.addInput, this._oscope);
	},
	
	_clear: function() {
		if (!this._audio) { return; }

		this._audio.pause();
		this._audio.parentNode.removeChild(this._audio);
		this._audio = null;
		
		this._oscope.clearInputs();
	}
});


App.Local = function() {
	App.File.call(this);
	// document.querySelector("#local").addEventListener("click", this);
	document.querySelector("#playlist_dynamique").addEventListener("click", this);

}

Object.assign(App.Local.prototype, App.File.prototype, {
	handleEvent: function(e) {
		this._clear();

		var url = e.target.href;
		if(url == undefined)url = e.target.parentNode.href;

		this._play(url, document.querySelector("#start_song"));
		// this.stop(url, document.querySelector("#start_song"));
		
	}
});

