Ext.define('Ext.Praxis.view.payments.LoadSalesConciliationForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadSalesConciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.LoadSalesConciliation.DataEntryLoadSalesConciliationController'
    ],
    controller: 'DataEntryLoadSalesConciliationController',
    title: 'Load Debits Conciliation Form',
    header: true,
    height: 288,
    width: 750,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        
                        
                    ]
                },
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
//                {
//                    text: 'Update',
//                    id: prototype.id + '-btn-update',
//                    iconCls: 'prx-icon-update',
////                    hidden: true,
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);