


Ext.define('Ext.Praxis.view.flown.InputsControlForm.Filters2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters2',
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '1px 0px 1px 0px',
    border: true,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    defaults: {
        padding: '3px 10px 3px 1px',
        labelStyle: 'font-weight:bold;'
    },
    items: [
        {
            xtype: 'combo',
            id: prototype.id + '-cmbView',
            fieldLabel: 'Group By',
            labelAlign: 'right',
            queryMode: 'local',
            editable: false,
            triggerAction: 'all',
            autoSelect: false,
            enableKeyEvents: true,
            caseSensitive: true,
            valueField: 'code',
            displayField: 'name',
            emptyText: 'All',
            labelWidth: 60,
            width: 150,
            anchor: '100%'
        },
        {
            xtype: 'combo',
            id: prototype.id + '-cmbSource',
             fieldLabel: 'Source',
            labelAlign: 'right',
            queryMode: 'local',
            triggerAction: 'all',
            editable: false, autoSelect: false,
            enableKeyEvents: true,
            caseSensitive: true,
            valueField: 'code',
            displayField: 'name',
            emptyText: 'All',
            labelWidth: 90,
            width: 170,
            anchor: '100%'
        }
    ]

});

