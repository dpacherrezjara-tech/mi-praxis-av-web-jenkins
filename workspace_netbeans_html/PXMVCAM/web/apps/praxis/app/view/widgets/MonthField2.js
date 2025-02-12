Ext.define('Ext.Praxis.view.widgets.MonthField2', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.monthfield2',
    requires: [
        'Ext.form.field.Text'
    ],
    editable: false,

    initComponent: function () {
        let me = this;
        me.callParent(arguments);

        me.on('afterrender', function () {
            me.initMonthPicker();
        });
    },

    initMonthPicker: function () {
        let me = this;
        $(me.inputEl.dom).MonthPicker({
            ShowIcon: false,
            StartYear: new Date().getFullYear(),
            MonthFormat: 'yymm',
            SelectedMonth: 0,
            HideAnim: 'slideUp',
            IsRTL: true
        });
    }
});

