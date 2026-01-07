Ext.define('Ext.Praxis.view.payments.DuplicateSettlementsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1200,
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    height: 490,
                                    width: 1140,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkcolumn',
                                                text: 'SEL',
                                                width: 50,
                                                dataIndex: 'checkActive',
                                                align: 'center',
                                                menuDisabled: true,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                listeners: {
                                                    checkchange: 'markSettlement'
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                    return '';
                                                }
                                            },
                                            {text: 'Customer', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === '133') {
                                                        return '<span>LACSA</span>';
                                                    } else if (value === '134') {
                                                        return '<span>AVIANCA</span>';
                                                    } else if (value === '202') {
                                                        return '<span>TACA</span>';
                                                    } else if (value === '547') {
                                                        return '<span>AEROGAL</span>';
                                                    } else {
                                                        return '<span>UNKNOW</span>';
                                                    }
                                                },
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value.replace(/\s/g, '') === '0') {
                                                        metaData.style = 'background: #c8e6c9';
                                                        return '<span style="font-weight: bold;">Pending</span>';
                                                    } else if (value.replace(/\s/g, '') === '1') {
                                                        metaData.style = 'background: #ffcccb';
                                                        return '<span style="font-weight: bold;">Match</span>';
                                                    } else if (value.replace(/\s/g, '') === '2') {
                                                        metaData.style = 'background: #ffd1b3';
                                                        return '<span style="font-weight: bold;">Sales Without Settlement</span>';
                                                    } else if (value.replace(/\s/g, '') === '3') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Settlement Without Sales</span>';
                                                    } else if (value.replace(/\s/g, '') === '4') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Diference</span>';
                                                    } else if (value.replace(/\s/g, '') === '5') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Manual</span>';
                                                    } else if (value.replace(/\s/g, '') === '6') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Forzado</span>';
                                                    } else {
                                                        metaData.style = 'background: #cfcfcf';
                                                        return '<span style="font-weight: bold;">Sin Estado</span>';
                                                    }
                                                }
                                            },
                                            {text: 'Fase 2', dataIndex: 'FSELEC', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    if (value && value.toString().trim() !== '') {
                                                        metaData.style = 'background:#C8E6C9; color:#1B5E20; font-weight:bold;';
                                                        return 'YES';
                                                    }
                                                    return 'NO';
                                                }
                                            },
                                            {text: 'Sale Date', dataIndex: 'SDATE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Document', dataIndex: 'TDOC', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === 'S') {
                                                        return '<span>Sales</span>';
                                                    } else if (value === 'R') {
                                                        return '<span>Refund</span>';
                                                    } else if (value === 'D') {
                                                        return '<span>Debito</span>';
                                                    } else {
                                                        return '<span>Unknow</span>';
                                                    }
                                                }
                                            },
                                            {text: 'Code Bank', dataIndex: 'CODEBANK', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'CC Type', dataIndex: 'SCARCOD', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Authorization', dataIndex: 'SAUTHOC', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Secuence', dataIndex: 'SEQ', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }},
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1200,
                            id: prototype.id + '-panelGridDataDeleteGroup',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDeleteGroup',
                                    height: 490,
                                    width: 870,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Customer', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === '133') {
                                                        return '<span>LACSA</span>';
                                                    } else if (value === '134') {
                                                        return '<span>AVIANCA</span>';
                                                    } else if (value === '202') {
                                                        return '<span>TACA</span>';
                                                    } else if (value === '547') {
                                                        return '<span>AEROGAL</span>';
                                                    } else {
                                                        return '<span>UNKNOW</span>';
                                                    }
                                                },
                                            },
                                            {text: 'Document', dataIndex: 'TDOC', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === 'S') {
                                                        return '<span>Sales</span>';
                                                    } else if (value === 'R') {
                                                        return '<span>Refund</span>';
                                                    } else if (value === 'D') {
                                                        return '<span>Debito</span>';
                                                    } else {
                                                        return '<span>Unknow</span>';
                                                    }
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Sale Date', dataIndex: 'SDATE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Code Bank', dataIndex: 'CODEBANK', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'User Creation', dataIndex: 'USUP', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'User Date', dataIndex: 'FEUP', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'User Hour', dataIndex: 'HOUP', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Quantity', dataIndex: 'QTY', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return value;
                                                },
                                                listeners: {
                                                    click: 'onClickDetailRemoved'
//                                                    args: ['IN_ERROR']
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload File</span>',
                                                width: 80,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {

                                                    return `<img src="resources/img/botones/attach.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'addFileDeleteJustification'
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">View</span>',
                                                width: 60,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');

                                                    return `<img src="resources/img/botones/search.png"
                                                                  style="cursor:pointer; width:14px; height:14px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onViewIMG'
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1327,
                            id: prototype.id + '-panelGridDataDeleted',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDelete',
                                    height: 490,
                                    width: 1080,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkcolumn',
                                                text: 'SEL',
                                                width: 50,
                                                dataIndex: 'checkActive',
                                                align: 'center',
                                                menuDisabled: true,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                listeners: {
                                                    checkchange: 'markSettlementReverse'
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                    return '';
                                                }
                                            },
                                            {text: 'Customer', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === '133') {
                                                        return '<span>LACSA</span>';
                                                    } else if (value === '134') {
                                                        return '<span>AVIANCA</span>';
                                                    } else if (value === '202') {
                                                        return '<span>TACA</span>';
                                                    } else if (value === '547') {
                                                        return '<span>AEROGAL</span>';
                                                    } else {
                                                        return '<span>DD7</span>';
                                                    }
                                                },
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value.replace(/\s/g, '') === '0') {
                                                        metaData.style = 'background: #c8e6c9';
                                                        return '<span style="font-weight: bold;">Pending</span>';
                                                    } else if (value.replace(/\s/g, '') === '1') {
                                                        metaData.style = 'background: #ffcccb';
                                                        return '<span style="font-weight: bold;">Match</span>';
                                                    } else if (value.replace(/\s/g, '') === '2') {
                                                        metaData.style = 'background: #ffd1b3';
                                                        return '<span style="font-weight: bold;">Sales Without Settlement</span>';
                                                    } else if (value.replace(/\s/g, '') === '3') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Settlement Without Sales</span>';
                                                    } else if (value.replace(/\s/g, '') === '4') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Diference</span>';
                                                    } else if (value.replace(/\s/g, '') === '5') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Manual</span>';
                                                    } else if (value.replace(/\s/g, '') === '6') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Forzado</span>';
                                                    } else {
                                                        metaData.style = 'background: #cfcfcf';
                                                        return '<span style="font-weight: bold;">Sin Estado</span>';
                                                    }
                                                }
                                            },
                                            {text: 'Sale Date', dataIndex: 'SDATE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Document', dataIndex: 'TDOC', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === 'S') {
                                                        return '<span>Sales</span>';
                                                    } else if (value === 'R') {
                                                        return '<span>Refund</span>';
                                                    } else if (value === 'D') {
                                                        return '<span>Debito</span>';
                                                    } else {
                                                        return '<span>Unknow</span>';
                                                    }
                                                }
                                            },
                                            {text: 'Code Bank', dataIndex: 'CODEBANK', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'CC Type', dataIndex: 'SCARCOD', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Authorization', dataIndex: 'SAUTHOC', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Secuence', dataIndex: 'SEQ', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }},
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region: 'south',
            xtype: 'panel',
            id: prototype.id + '-pie',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: false,
            height: 30,
            margin: '5 0 18 0',
            defaults: {
                border: false
            },
            items: [
                {
                    bodyStyle: 'background: #6C87A8; border-radius: 5px;',
                    xtype: 'panel',
                    width: '30%',
                    height: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'label'
                    },
                    items: [
                        {
                            text: 'Page',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        }
                    ]
                }
            ]
        }
    ]
}
);


