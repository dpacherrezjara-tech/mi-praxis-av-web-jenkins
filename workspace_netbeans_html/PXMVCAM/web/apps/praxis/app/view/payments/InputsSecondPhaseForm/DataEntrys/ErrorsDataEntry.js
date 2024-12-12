prototype.idDE2 = prototype.id + '-ErrorsDataEntry';

Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.DataEntrys.ErrorsDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ErrorsDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.InputsSecondPhase.ErrorsDataEntryController'
    ],
    controller: 'ErrorsDataEntryController',
    title: 'Error Log - Form',
    header: true,
    width: 1200,
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
            title: 'Error Log',
            id: prototype.idDE2 + '-errorLogger',
            width: '100%',
            maxHeight: 450,
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            },
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
                    {text: 'Client', dataIndex: 'PF122CCUST', width: 70},
                    {text: 'Processing<br>Date', dataIndex: 'PF122FPROC', width: 80},
                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 180},
                    {text: 'Settlement ID', dataIndex: 'PF122LIQUI', width: 180},
                    {text: 'Settlement<br>Date', dataIndex: 'PF122FLIQU', width: 80},
                    {text: 'Merchant', dataIndex: 'PF122CMERC', width: 100},
                    {text: 'Sub-Merchant', dataIndex: 'PF122SCMER', width: 100},
                    {text: 'Card Number', dataIndex: 'PF122CARDN', width: 160},
                    {text: 'Auth', dataIndex: 'PF122SAUTH', width: 80},
                    {text: 'Sale<br>Date', dataIndex: 'PF122SDATE', width: 80},
                    {text: 'Doc.<br>Type', dataIndex: 'PF122STDOC', width: 50},
                    {text: 'File', dataIndex: 'PF122ARCH', width: 100},
                    {text: 'Column', dataIndex: 'PF122CAMPO', width: 100},
                    {text: 'Line', dataIndex: 'PF122LINE', width: 80},
                    {text: 'Error<br>Type', dataIndex: 'PF122TIPO', width: 70},
                    {text: 'Error<br>Code', dataIndex: 'PF122CODER', width: 90},
                    {text: 'Error<br>Name', dataIndex: 'PF122DATA', width: 150}
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