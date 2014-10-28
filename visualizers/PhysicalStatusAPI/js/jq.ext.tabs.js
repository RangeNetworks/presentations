/* Extension of jQuery tabs widget
 *
 * @class ui.tabs
 * @param {String} align Alignment of text in the tab
 *   Available values: { 'left', 'right', 'center' }
 * @param {String} orientation Tabs orientation
 *   Available values: { 'vertical', 'horizontal', null }
 * @param {Boolean} corners Rounded corners, default == true
 *
 * @method _init Apply jqext-specific parameters
 * @method
 * @method
 */

$.widget("ui.tabs", jQuery.ui.tabs, {
	jqext_version: "0.0.1",
	options: {
		align: null,
		orientation: null,
		corners: true
	},

	_init: function() {
		var nav_w_outer,
			nav_h_outer,
			panel_h_outer, 
			panel_h;

		if (this.options.orientation === 'vertical') {
			this.element.addClass('jqext jqext-tabs-v');
			this.element.find('li')
				.removeClass('ui-corner-top')
				.addClass('ui-corner-left');

			nav_w_outer = this.element.find('.ui-tabs-nav').outerWidth();
			nav_h_outer = this.element.find('.ui-tabs-nav').outerHeight();
			this.element.find('.ui-tabs-panel')
				.each(function() {
					// shift the panel content to the right
					$(this).css('margin-left', 
						parseInt($(this).css('margin-left')) + nav_w_outer);

					// adjust the height
					panel_h_outer = $(this).outerHeight();
					panel_h = $(this).height();

					if (panel_h_outer < nav_h_outer) {
						$(this).css('min-height', 
							nav_h_outer - (panel_h_outer - panel_h));
					}
				})
				.end();
		}

		if (this.options.align) {
			this.element.find('.ui-tabs-nav')
				.css('text-align', this.options.align)
				.end();
		}

		if (!this.options.corners) {
			jqext_drop_corners(this.element);
		}
	}
});

