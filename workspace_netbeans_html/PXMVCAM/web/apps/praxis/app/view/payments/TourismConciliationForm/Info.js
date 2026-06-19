//valor = '0';
Ext.define('Ext.Praxis.view.payments.TourismConciliationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1350,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1000,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 965,
                                    columnLines: true,
                                    menuDisabled: true,
                                    viewConfig: {
                                        forceFit: false
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Sales Date',
                                                dataIndex: 'SDATE',
                                                width: 105,
                                                menudisabled: false,
                                                listeners: {
                                                    click: 'detailMPF100'
                                                },
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 105,
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: 'Status',
                                                dataIndex: 'STVAL',
                                                width: 105,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    if (record.data.TDOC === 'A') {
                                                        metaData.style += "background-color:#bff5bf;";
                                                    }
                                                    if (record.data.STVAL === '1') {
                                                        value = 'Match';
                                                    } else if (record.data.STVAL === '5') {
                                                        value = 'Match manual.';
                                                    } else {
                                                        value = 'Pending';
                                                    }
                                                    return value;
                                                }
                                            },

//                                            {text: 'Refer', dataIndex: 'REFER', width: 105,
//                                                renderer: function (value, metaData, record) {
//                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                    return  value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Status',
//                                                dataIndex: 'STVAL',
//                                                width: 105,
//                                                editor: { xtype: 'textfield', editable: false },
//                                                renderer: function (value, metaData, record) {
//                                                    metaData.style = "text-align:center;";
//                                                    if (record.data.TDOC === 'A') {
//                                                        metaData.style += "background-color:#bff5bf;";
//                                                    }
//                                                    if (record.data.STVAL === '1') {
//                                                        value = 'Match';
//                                                    } else if (record.data.STVAL === '5') {
//                                                        value = 'Match manual.';
//                                                    } else {
//                                                        value = 'Open';
//                                                    }
//                                                    return value;
//                                                }
//                                            },






                                            {
                                                text: 'Amount',
                                                dataIndex: 'SVFOPS',
                                                width: 132,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";

                                                    if (record.data.TDOC === 'A') {
                                                        metaData.style += "background-color:#bff5bf;";
                                                    }
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Document', dataIndex: 'QTYTRAN1', width: 105},
                                            {
                                                text: 'Invoice',
                                                dataIndex: 'REFER',
                                                width: 135,
                                                menudisabled: true,
                                                listeners: {
                                                    click: 'detailMPF100'
                                                },
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {text: 'Coment', dataIndex: 'CERROR', width: 175},
                                            {
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-detailTourism',
                                                width: 100,
                                                text: 'View',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary',
                                    width: 965,
                                    align: 'center',
                                    margin: '0 0 0 40',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '&nbsp;',
                                        height: 25,
//                                        padding: '5 5 5 0',
                                        padding: '5 5 5 40',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 105}, // Sales Date
                                        {width: 105}, // Agent
                                        
                                        {width: 105}, // Status
                                        {
                                            width: 132,
                                            id: prototype.id + '-TOTdblAmount'
                                        },
                                        {width: 105}, // Document
                                        {width: 135}, // Invoice
                                        {width: 175}, // CERROR
                                        {width: 100}   // View column
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxReportData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1350,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridReportData',
                                    width: 1350,
                                    columnLines: true,
                                    menuDisabled: true,
                                    viewConfig: {
                                        forceFit: false
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 105,
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: 'Sales Date',
                                                dataIndex: 'SDATE',
                                                width: 105,
                                                menudisabled: false,
                                                listeners: {
                                                    click: 'detailMPF100'
                                                },
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {text: 'Bandoc', dataIndex: 'BANDOC', width: 105,
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {text: 'id Contab.', dataIndex: 'IDCONT', width: 200,
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {text: 'Value Date', dataIndex: 'VALDATE', width: 105,
                                                renderer: function (value, metaData, record) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: 'Amount Sett.',
                                                dataIndex: 'SVFOPS',
                                                width: 132,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";

                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Amount Sales',
                                                dataIndex: 'SVFOPV',
                                                width: 132,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";

                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Sale status',
                                                dataIndex: 'STVALSALE',
                                                width: 105,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    
                                                    if (record.data.STVALSALE === '1') {
                                                        value = 'Match';
                                                    } else if (record.data.STVALSALE === '5') {
                                                        value = 'Match manual.';
                                                    } else {
                                                        value = 'Pendiente';
                                                    }
                                                    return value;
                                                }
                                            },
                                             {
                                                text: 'SAP status',
                                                dataIndex: 'STVALSAP',
                                                width: 105,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    
                                                    if (record.data.STVALSAP === 'L') {
                                                        value = 'Cargado';
                                                    } else if (record.data.STVALSAP === 'P') {
                                                        value = 'Generado/Pendiente de enviar';
                                                    } else if (record.data.STVALSAP === 'S') {
                                                        value = 'Enviado';
                                                    } else{
                                                        value = record.data.STVALSAP;
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Error descrip.', dataIndex: 'DESCERR', width: 250}
                                        ]
                                    }
                                },
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary2',
//                                    width: 965,
//                                    align: 'center',
//                                    margin: '0 0 0 40',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '&nbsp;',
//                                        height: 25,
////                                        padding: '5 5 5 0',
//                                        padding: '5 5 5 40',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//                                        {width: 105}, // Sales Date
//                                        {width: 105}, // Agent
//                                        
//                                        {width: 105}, // Status
//                                        {
//                                            width: 132,
//                                            id: prototype.id + '-TOTdblAmount'
//                                        },
//                                        {width: 105}, // Document
//                                        {width: 135}, // Invoice
//                                        {width: 175}, // CERROR
//                                        {width: 100}   // View column
//                                    ]
//                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 965,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 965,
                                    height: 25,
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
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
});
