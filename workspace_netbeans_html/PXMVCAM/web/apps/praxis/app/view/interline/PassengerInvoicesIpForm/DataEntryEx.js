Ext.define('Ext.Praxis.view.interline.PassengerInvoicesIpForm.DataEntryEx', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryExPassengerInvoicesIpForm',
    requires: [
        'Ext.Praxis.controller.interline.PassengerInvoicesIp.DataEntryExPassengerInvoicesIpController'
    ],
    controller: 'DataEntryExPassengerInvoicesIpController',
    title: 'Export Information Passenger Invoices Ip',
    header: true,
    height: 208,
    width: 425,
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
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            text: 'File Type:',
                            style: 'font-size:13px;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            text: 'ZIP',
                            style: 'font-size:13px;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 77},
                        {
                            xtype: 'label',
                            text: 'Date/Period:',
                            style: 'font-size:13px;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtDate',
                            fieldStyle: 'text-align:left;background:white;color:#2E486C;',
                            readOnly: true,
                            value: '',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtPernum',
                            fieldStyle: 'text-align:left;background:white;color:#2E486C;',
                            readOnly: true,
                            value: '',
                            width: 30
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="gridFileNames">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridFileNames',
                    border: true,
                    width: '100%',
                    height: 72,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Names', dataIndex: 'strFormatDate', flex: 1,//width: 400,
                                listeners: {
                                    click: 'btnExport_clickHandler'
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                }
                            }
                        ]
                    }
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            padding: '0',
            margin: '12 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center;',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    id: prototype.id + '-btnCancel',
                    html: '<strong style:"font-weight:bold;color:#000;">Cancel</strong>',
                    listeners: {
                        click: 'btnCancel_clickHandler'
                    }
                },
                {xtype: 'tbspacer', width: 5},
                {
                    id: prototype.id + '-btnDownload',
                    style: 'font-weight:bold;background:#27CF10;',
                    html: '<strong style="background:#27CF10;color:white;">Download</strong>',
                    hidden: true,
                    listeners: {
                        click: 'btnDownload_cliclHandler'
                    }
                }
            ]
        }
    ]
});