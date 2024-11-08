prototype.idDE2 = prototype.id + '-LoggerDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.LoggerDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.LoggerDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.LoggerDataEntryController'
    ],
    controller: 'LoggerDataEntryController',
    title: 'Logger - Form',
    header: true,
    width: 700,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'grid',
            titleAlign: 'center',
            minHeight: 100,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            title: 'Process Log',
            id: prototype.idDE2 + '-gridLogger',
            width: '100%',
            maxHeight:600,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'RN',
                        locked: true,
                        xtype: 'rownumberer', // Columna de número de fila
                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                    },
                    {text: 'Type', dataIndex: 'TIPO', width: 50},
                    {text: 'Message', dataIndex: 'MENSAJE', flex: 1},
                    {text: 'User', dataIndex: 'USUP', width: 100},
                    {text: 'DateTime', dataIndex: 'TSUP', width: 130}
                ]
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.idDE2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});