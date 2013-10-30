;(function ( $, window, document, undefined ) {

	var pluginName = "fluidPopin",
		defaults = {
			fogSelector: ".fp-fog",
			modalWrapperSelector: ".fp-modal",
			closerSelector: ".fp-close",
			hashControl: false,
			fogTemplate: '<div class="fp-fog"></div>'
		},
		elements = $(),
		errors = {
			noFog: pluginName + ': You need a fog to use this script'
		},
		onLoad = function(){
			if(window.location.hash){
				openFromHash(window.location.hash);
			}
		},
		openFromHash = function(hash){
			var inst = window[pluginName].getInstanceByHash(hash);
			if(inst && typeof inst.open == 'function' && inst.options.hashControl){
				inst.open();
			}
		},
		onHashChange = function(){
			if(window.location.hash){
				openFromHash(window.location.hash);
			}else{
				window[pluginName].closeAll();
			}
		};


	window[pluginName] = {};

	function Plugin ( element, options ) {
		this.element = $(element);
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.elementHref = this.element.attr('href');

			this._setElements();
			this._setEvents();
			this.isOpen = false;
		},
		_setElements: function(){
			//TODO make it flexible
			this.modalWrapper = $(this.elementHref);
			this.modal = this.modalWrapper.find(this.options.modalWrapperSelector);
			this.closer = this.modal.find(this.options.closerSelector);

			this.fog = this.modalWrapper.closest(this.options.fogSelector);
			if(!this.fog.length){
				this.fogParent = $(document.body);
				var existentFog = this.fogParent.find('> '+this.options.fogSelector);
				if(existentFog.length){
					this.fog = existentFog.eq(0);
				}else{
					this.fog = $(this.options.fogTemplate);
					this.fog.appendTo('body');
				}

				this.fog.append(this.modalWrapper);
			}else{
				this.fogParent = this.fog.parent();
			}

			var attachedInstances = this.fog.data("plugin_" + pluginName + "_attachedInstances");
			if(!attachedInstances) attachedInstances = [];
			$.data( this.fog[0], "plugin_" + pluginName + "_attachedInstances", attachedInstances.concat(this) );

		},
		_setEvents: function () {
			this.element.on('click.'+pluginName, $.proxy(this._linkClickEvent, this));
			this.modalWrapper.on('click.'+pluginName, $.proxy(this._fogClickEvent, this));
			this.modal.on('click.'+pluginName, $.proxy(this._modalClickEvent, this));
			this.closer.on('click.'+pluginName, $.proxy(this._closerClickEvent, this));

			var events = $._data( this.fog[0], "events");
			if(!events || events.click === undefined){
				this.fog.on('click.'+pluginName, $.proxy(this._fogClickEvent, this));
			}
		},
		_linkClickEvent: function(e){
			e.preventDefault();
			this.open();
		},
		_fogClickEvent: function(e){
			e.preventDefault();
			var inst = this.fog.data("plugin_" + pluginName + "_attachedInstances");
			for (var i = 0, l = inst.length; i < l; i++) {
				if(inst[i] && inst[i].isOpen && typeof inst[i].close == 'function'){
					inst[i].close();
				}
			}
		},
		_closerClickEvent: function(e){
			e.preventDefault();
			this.close();
		},
		_modalClickEvent: function(e){
			e.stopPropagation();
		},
		_setHash: function(){
			window.location.hash = this.elementHref;
		},
		_removeHash: function(){
			window.location.hash = '';
		},
		_cancelScroll: function(e){
			e.preventDefault();
		},
		open: function(){
			this.fog.addClass('show');
			this.modalWrapper.addClass('show');
			setTimeout($.proxy(function(){
				this.modalWrapper.addClass('in');
			}, this), 100);

			if(this.options.hashControl){
				this._setHash();
			}

			this.fogParent.addClass('cancel-scroll');
			this.isOpen = true;
		},
		close: function(){
			this.modalWrapper.removeClass('in');
			setTimeout($.proxy(function(){
				this.fog.removeClass('show');
				this.modalWrapper.removeClass('show');
			}, this), 100);

			if(this.options.hashControl){
				this._removeHash();
			}

			this.fogParent.removeClass('cancel-scroll');
			this.isOpen = false;
		}
	};

	/**
	 * Get instance of popin by hash, when it used with anchor
	 * @param hash
	 * @return {Object}
	 */
	window[pluginName].getInstanceByHash = function(hash){
		if(!hash || typeof hash != 'string') return true;

		if(hash[0] != '#'){
			hash = '#' + hash;
		}

		return elements.filter('[href="' + hash + '"]').data('plugin_'+pluginName);
	};

	/**
	 * Close All instance
	 */
	window[pluginName].closeAll = function(){
		for (var i = 0, l = elements.length; i < l; i++) {
			var inst = elements.eq(i).data('plugin_'+pluginName);
			if(inst.isOpen){
				inst.close();
			}
		}
	};

	$(window).bind({
		'load': onLoad,
		'hashchange': onHashChange
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				elements.push(this);
			}
		});
	};

})( jQuery, window, document );
