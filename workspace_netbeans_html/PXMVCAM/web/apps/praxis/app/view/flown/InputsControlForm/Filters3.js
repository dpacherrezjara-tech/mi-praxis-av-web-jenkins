


Ext.define('Ext.Praxis.view.flown.InputsControlForm.Filters3', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters3',
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '1px 0px 1px 0px',
    border: true,
    layout: {
        type: 'hbox'
        //pack: 'end'
    },
    defaults: {
        padding: '3px 10px 3px 30px',
        labelStyle: 'font-weight:bold;'
    },
    items: [
        {
            xtype: 'combo',
            id: prototype.id + '-cmbYear',
            fieldLabel: 'Processing Date',
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
            labelWidth: 150,
            width: 250,
            anchor: '100%'
        }
       
    ]

});

