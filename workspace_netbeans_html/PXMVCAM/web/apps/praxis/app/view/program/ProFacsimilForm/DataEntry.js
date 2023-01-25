Ext.define('Ext.Praxis.view.program.ProFacsimilForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryProFacsimilForm',
    requires: [
        'Ext.Praxis.controller.program.ProFacsimil.DataEntryProFacsimilController'
    ],
    controller: 'DataEntryProFacsimilController',
    title: 'Master Index',
    header: true,
    height: 610,
    width: 1102,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.Facsimil.id+'-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                
            ]
        }
    ]
});