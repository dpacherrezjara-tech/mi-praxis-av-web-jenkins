Ext.define('Ext.Praxis.view.widgets.MonthField2', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.monthfield2',
    requires: [
        'Ext.form.field.Text'
    ],
    editable: false,
    initComponent: function () {
        let me = this;
        //me.fieldStyle = 'font-weight:bold;background-color:transparent;';
        me.callParent(arguments);

        me.on('afterrender', function () {
            me.initMonthPicker();
        });
    },

    initMonthPicker: function () {
        let me = this;
        
        $(me.inputEl.dom).wrap(
            '<div class="monthpicker-container" style="display: flex; align-items: center;text-align:center; border-radius: 20px; padding: 5px;height:26px;width:95px;background: #EAEAEA; border: 1px solid #B5B8C8;"></div>');
        $(me.inputEl.dom).css({
            "border": "none !important",
            "outline": "none !important",
            "cursor": "pointer",
            "flex": "1",
            "background": "#EAEAEA !important",
            "box-shadow": "none !important",
            "text-align":"center",
            "font-weight": "bold",
            "background-color": "transparent"
        });
        
        $(me.el.dom).find('.x-form-text-wrap-default').css({
            "border": "none",
            "box-shadow": "none !important",
            "background": "transparent !important"
        });
        
        //$(me.el.dom).removeClass('x-form-text-wrap-default');
        
        let button = $('<button type="button" class="monthpicker-btn" style="border: none; background: transparent; cursor: pointer; padding: 3px;">📅</button>');
        $(me.inputEl.dom).parent().append(button);
        
        button.on('click', function() {
            $(me.inputEl.dom).click();
        });
        
        $(me.inputEl.dom).MonthPicker({
            ShowIcon: false,
            StartYear: new Date().getFullYear(),
            MonthFormat: 'yymm',
            SelectedMonth: 0,
            HideAnim: 'slideUp'
        });
    }
});

