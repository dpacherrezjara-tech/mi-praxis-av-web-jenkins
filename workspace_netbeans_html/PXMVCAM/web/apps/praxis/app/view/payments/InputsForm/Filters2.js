


Ext.define('Ext.Praxis.view.payments.InputsForm.Filters2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters2',
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '1px 0px 1px 0px',
    border: true,
    layout: {
        type: 'hbox'
        //pack: 'end'
    },
    defaults: {
        padding: '3px 10px 3px 30px'
//        labelStyle: 'font-weight:bold;'
    },
    items: [
        {
            xtype: 'label',
            html: '<strong style="color:#000;">Generation Date </strong>',
            labelStyle: 'font-weight:bold;',
            align: 'left',
            fieldStyle: 'text-align: left;',
            padding: '8px 7px 0px 10px',
            hidden: false
        },
        {
            xtype: 'combo',
            id: prototype.id + '-cmbYear',
            fieldLabel: 'Year',
            labelAlign: 'left',
            queryMode: 'local',
            editable: false,
            triggerAction: 'all',
            autoSelect: false,
            enableKeyEvents: true,
            caseSensitive: true,
            valueField: 'code',
            displayField: 'name',
            emptyText: 'All',
            labelWidth: 40,
            width: 110,
            anchor: '100%'
        }
    ]

});

