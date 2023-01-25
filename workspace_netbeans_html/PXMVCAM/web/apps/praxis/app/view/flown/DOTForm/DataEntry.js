Ext.define('Ext.Praxis.view.flown.DOTForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDOTForm',
    controller: 'DataEntryDOTController',
    requires: [
        'Ext.Praxis.controller.flown.DOT.DataEntryDOTController'
    ],
    title: 'Export Information DOT',
    header: true,
    height: 200,
    width: 450,
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
            id: prototype.id + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'File Type:',
                            width: 60
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'label',
                            text: 'CSV',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 60},
                        {
                            xtype: 'label',
                            text: 'Year - Quarter:',
                            width: 110
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtDate',
                            fieldStyle: 'text-align:left',
                            readOnly: true,
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtPernum',
                            fieldStyle: 'text-align:left',
                            readOnly: true,
                            width: 30
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="gridFileNames">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridFileNames',
                    border: true,
                    width: 400,
                    height: 90,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Names', dataIndex: 'strFormatDate', width: 400,
                                listeners: {
                                    click: 'onBtnExport_Click'
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#flown-dot-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
            margin: '10 0 10 0',
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
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 5},
                {
                    id: prototype.id + '-btnDownload',
                    hidden: true,
                    style: 'font-weight:bold;background:#27CF10;',
                    html: '<strong style="background:#27CF10;color:white;">Download</strong>',
                    listeners: {
                        click: 'onDownloadClick'
                    }
                }
            ]
        }
    ]
});