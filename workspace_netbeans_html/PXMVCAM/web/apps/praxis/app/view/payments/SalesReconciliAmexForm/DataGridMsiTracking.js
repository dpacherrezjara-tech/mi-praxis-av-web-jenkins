var storeComboMsi = Ext.create('Ext.data.SimpleStore', {
    fields: ['code', 'name'],
    data: [
        ["", "None"],
        ["1", "Match"],
        ["5", "Match Manual"]
    ]
});
Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataGridMsiTracking', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataGridMsiTrackingForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliAmex.DataGridMsiTrackingController'
    ],
    controller: 'DataGridMsiTrackingController',
    title: 'MSI Tracking - Grid Data',
    header: true,
    height: 480,
    width: 1570,
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
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    height: 400,
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                width: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridMsiTracking">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMsiTracking',
                                    height: 380,
                                    columnLines: true,
                                    plugins: [
                                        {
                                            ptype: 'cellediting',
                                            clicksToEdit: 1
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            /*{
                                             text: 'Passenger Name', dataIndex: 'A720PAX', width: 280,
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:left;";
                                             return value;
                                             },
                                             editor: {xtype: 'textfield', editable: false}
                                             },*/
                                            {
                                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 85,
                                            },
                                            {
                                                text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 85,
                                            },
                                            {
                                                text: 'Business<br>Date', dataIndex: 'BSUMDATE', width: 85,
                                            },
                                            {
                                                text: 'Installment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Plan', dataIndex: 'NBRINSTA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 80
                                            },
                                            {
                                                text: 'Document<br>Type', dataIndex: 'descTDOC', width: 80
                                            },
                                            {text: 'New Status<br>Settlement vs Sales', width: 130, dataIndex: 'NEWSTVAL', hidden: true,
                                                renderer: function (value, meta, record, row, col) {
                                                    meta.style = "background-color:#fae2a0;";
                                                    switch (value) {
                                                        case '':
                                                            return 'None';
                                                        case '1':
                                                            return 'Match';
                                                        case '5':
                                                            return 'Match Manual';
                                                        default:
                                                            return 'None';
                                                    }
                                                },
                                                editor: {
                                                    xtype: 'combo',
                                                    store: storeComboMsi,
                                                    editable: false,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    value: '',
                                                }
                                            },
                                            {
                                                text: 'Error Description', dataIndex: 'DES_CERROR', width: 210
                                            },
                                            {
                                                text: 'Status<br>Settlement vs Sales', dataIndex: 'descSTVAL', width: 135
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'PCURRENCY', width: 70,
                                            },
                                            {
                                                text: 'Transact<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'SCARDN', width: 120
                                            },
                                            {
                                                text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                            },
                                            {
                                                text: 'Submission<br>Merchant ID', dataIndex: 'SMERCHID', width: 100,
                                            },
                                            {
                                                text: 'Select',
                                                xtype: 'checkcolumn',
//                                                        id: prototype.id + '-id_checkIATA',
                                                width: 70,
                                                dataIndex: 'false',
                                                listeners: {
                                                    checkchange: 'checkPP'
                                                },
                                                        renderer: function (value, meta, record, row, col) {
                                                            var status_match = ['1', '5', '6', '7'];
                                                            if (status_match.indexOf(record.data.STVAL) >= 0) {
                                                                meta['tdCls'] = 'x-item-disabled';                                         
                                                            } else {
                                                                meta['tdCls'] = '';  
                                                            }
                                                            return new Ext.ux.CheckColumn().renderer(value);
                                                        }
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>

                            ]
                        }
                    ]
                }
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
                {
                    text: 'Update', //hidden: true,
                    id: prototype.id + '-btn-msi-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onMsiUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-msi-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onMsiCancelClick'
                    }
                }
            ]
        }
    ]
}
);