/*
 * @Dvicente
 * Nota: Revisar documentacion de codigo fuente
 * https://stackoverflow.com/questions/28167452/extjs-5-date-picker-year-and-month-only
 * https://fiddle.sencha.com/#fiddle/3fri&view/editor
 */
Ext.define('Ext.Praxis.view.widgets.MonthField', {
	extend: 'Ext.form.field.Date'

	, alias: 'widget.monthfield'

	, requires: ['Ext.picker.Month']

	, selectDate: 1

	, selectMonth: null

	, createPicker: function () {
		var me = this
			, format = Ext.String.format;

		return Ext.create('Ext.picker.Month', {
			pickerField: me
			, ownerCt: me.ownerCt
			, renderTo: document.body
			, floating: true
			, hidden: true
			, focusOnShow: true
			, minDate: me.minValue
			, maxDate: me.maxValue
			, disabledDatesRE: me.disabledDatesRE
			, disabledDatesText: me.disabledDatesText
			, disabledDays: me.disabledDays
			, disabledDaysText: me.disabledDaysText
			, format: me.format
			, showToday: me.showToday
			, startDay: me.startDay
			, minText: format(me.minText, me.formatDate(me.minValue))
			, maxText: format(me.maxText, me.formatDate(me.maxValue))
			, listeners: {
				select: {
					scope: me
					, fn: me.onSelect
				}
				, monthdblclick: {
					scope: me
					, fn: me.onOKClick
				}
				, yeardblclick: {
					scope: me
					, fn: me.onOKClick
				}
				, OkClick: {
					scope: me
					, fn: me.onOKClick
				}
				, CancelClick: {
					scope: me
					, fn: me.onCancelClick
				}
			}
			, keyNavConfig: {
				esc: function () {
					me.collapse();
				}
			}
		});
	}

	, onCancelClick: function () {
		this.selectMonth = null;
		this.collapse();
	}
	
	, onOKClick: function () {
		if (this.selectMonth) {
			this.setValue(this.selectMonth);
			this.fireEvent('select', this, this.selectMonth);
		}
		this.collapse();
	}
	
	, onSelect: function (m, d) {
		var date, month = d[0] + 1
			, year = d[1];

		if (this.lastDay) {
			date = Ext.Date.getLastDateOfMonth(new Date(month + '/01/' + year));
			var checkMonth = date.getMonth() + 1;
			if (month < checkMonth) {
				var prevMonth = month - 1;
				date = Ext.Date.getLastDateOfMonth(new Date(prevMonth + '/01/' + year));
			}
		} else {
			date = new Date(month + '/01/' + year);
		}

		this.selectMonth = date;
	}
});