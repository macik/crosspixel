/** @include "namespace.js" */
Crosspixel.Resizer = {

	params: null,

	sizes: null,
	currentSizeIndex: null,

	title: null,

	/** @type {Crosspixel.Utils.EventSender} */
	eventSender: null,

	detectDefaultSize: function () {
		var result = null;

		if ( typeof( window.innerWidth ) == 'number' && typeof( window.innerHeight ) == 'number' ) {
			result =
 				{
					width: window.innerWidth,
					height: window.innerHeight
				};
		}
		else
			if ( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
				result =
					{
						width: document.documentElement.clientWidth,
						height: document.documentElement.clientHeight
					};
			}
			else
				if ( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					result =
						{
							width: document.body.clientWidth,
							height: document.body.clientHeight
						};
				}

		return result;
	},

	getDefaultSize: function () {
		return this.sizes[0];
	},

	getCurrentSize: function () {
		return this.sizes[this.currentSizeIndex];
	},

	init: function (image_params) {
		this.params = Crosspixel.Utils.createParams(this.defaults, {});
		this.eventSender = new Crosspixel.Utils.EventSender();

		var defaultSize = this.detectDefaultSize();
		if ( defaultSize ) {
			var sizes = [ defaultSize ];
			sizes[sizes.length] = {
				width: image_params.width,
				height: image_params.height
			};

			this.title = document.title;

			this.sizes = sizes;
			this.currentSizeIndex = 0;
		}
	},

	sizeTitle: function(index) {
		var result, current_size = this.sizes[index], default_size = this.sizes[0];
		if ( current_size.title ) {
			result = current_size.title;
		}
		else {
			var width = ( current_size.width ? current_size.width : default_size.width );
			var height = ( current_size.height ? current_size.height : default_size.height );

			result = width + '×' + height;
		}

		return result;
	},

	selectSize: function(index) {
		this.currentSizeIndex = index;

		this.applySize();
	},

	toggleSize: function () {
		if ( this.currentSizeIndex != null ) {
			this.currentSizeIndex++;
			this.currentSizeIndex = ( this.currentSizeIndex == this.sizes.length ? 0 : this.currentSizeIndex );

			this.applySize();
		}
	},

	applySize: function () {
		var width = ( this.getCurrentSize().width ? this.getCurrentSize().width : this.getDefaultSize().width );
		var height = ( this.getCurrentSize().height ? this.getCurrentSize().height : this.getDefaultSize().height );

		window.resizeTo(width, height);

		var titleText = ( this.currentSizeIndex ? this.title + ' (' + width + '×' + height + ')' : this.title );
		if ( this.getCurrentSize().title )
			titleText = this.getCurrentSize().title;

		document.title = titleText;

		this.eventSender.occurEvent('sizeChanged', this.currentSizeIndex);
	}

};