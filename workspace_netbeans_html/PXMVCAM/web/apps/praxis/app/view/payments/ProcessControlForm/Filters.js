Ext.define('Ext.Praxis.view.payments.ProcessControlForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-boxSearchFilter',
            margin: '0 7',
            border: false,
            width: 1600,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                
            ]
        }
    ]
});



