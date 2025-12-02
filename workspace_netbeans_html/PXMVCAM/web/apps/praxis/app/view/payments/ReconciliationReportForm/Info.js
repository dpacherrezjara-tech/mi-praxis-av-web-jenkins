Ext.define('Ext.Praxis.view.payments.ReconciliationReportForm.Info', {
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
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1400,
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
                                    height: 530,
                                    width: 1400,
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
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45, style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CUSTOMER', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Document</span>', dataIndex: 'TDOC', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    if (value === 'S') {
                                                        return  'Sales';
                                                    } else if (value === 'D') {
                                                        return  'Debits';
                                                    } else {
                                                        return 'Pending';
                                                    }

                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    if (value === '1') {
                                                        return  'Match';
                                                    } else if (value === '3') {
                                                        return  'Settlement Without Sales';
                                                    } else if (value === '5') {
                                                        return  'Match Manual';
                                                    } else {
                                                        return 'Pending';
                                                    }

                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Processor</span>', dataIndex: 'CODPRO', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Payment Date</span>', dataIndex: 'ADATE', width: 95, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Account</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Account</span>', dataIndex: 'ACCOUNT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }},
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Provision</span>', dataIndex: 'ACCPROV', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }}
                                                ]
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Profit Center</span>', dataIndex: 'BENCENC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Society</span>', dataIndex: 'SOCIETY', width: 58, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFER', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Key 1</span>', dataIndex: 'CLAVE1', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Key 3</span>', dataIndex: 'CLAVE3', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Text</span>', dataIndex: 'TEXTO', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Local</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }},
                                                    {
                                                        text: '<span style="color:white;font-weight:bold;">Amount</span>',
                                                        dataIndex: 'NETO',
                                                        align: 'center',
                                                        width: 90,
                                                        style: 'padding:2px; background: #6C87A8; border-color:white',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;";
                                                            if (value == null || value === '')
                                                                return '';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">USD</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'LOCRENCY2', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Amount</span>', dataIndex: 'LOCAMOUNT2', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;";
                                                            if (value == null || value === '')
                                                                return '';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Phase 1</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Total</span>', dataIndex: 'FASE1_TOTAL', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:right;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center', text: '<span style="color:white;font-weight:bold;">Debits</span>', dataIndex: 'FASE1_DEBITOS', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:right;";
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Phase 2</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Total</span>', dataIndex: 'FASE2_TOTAL', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:right;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Debits</span>', dataIndex: 'FASE2_DEBITOS', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:right;";
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {align: 'center',text: '<span style="color:white;font-weight:bold;">Taxes</span>', dataIndex: 'TAXES', width: 50, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Regular Accounting Information</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Period</span>', dataIndex: 'PERIODO_REG', width: 65, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Header</span>', dataIndex: 'HEADER_REG', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Correlativo</span>', dataIndex: 'CORRELATIVO_REG', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Date SAP</span>', dataIndex: 'FECSAP_REG', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Status SAP</span>', dataIndex: 'STATUSSAP_REG', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            
                                                            if (value === 'L') {
                                                                return  'Load';
                                                            } else if (value === 'P') {
                                                                return  'Pending';
                                                            } else if (value === 'S') {
                                                                return  'Send';
                                                            } else {
                                                                return '';
                                                            }
                                                            
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                align: 'center',text: '<span style="color:white;font-weight:bold;">Debit Accounting Information</span>',
                                                style: 'background:#6C87A8; border-color:white;',
                                                columns: [
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Period</span>', dataIndex: 'PERIODO_DEB', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Type</span>', dataIndex: 'TIPO_DEB', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Sub Type</span>', dataIndex: 'SUB_TIPO_DEB', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Header</span>', dataIndex: 'HEADER_DEB', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Correlativo</span>', dataIndex: 'CORRELATIVO_DEB', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Name File</span>', dataIndex: 'FILENAME_DEB', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Date SAP</span>', dataIndex: 'FECSAP_DEB', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Status SAP</span>', dataIndex: 'STATUSSAP_DEB', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            
                                                            if (value === 'L') {
                                                                return  'Load';
                                                            } else if (value === 'P') {
                                                                return  'Pending';
                                                            } else if (value === 'S') {
                                                                return  'Send';
                                                            } else {
                                                                return '';
                                                            }
                                                            
                                                            return  value;
                                                        }
                                                    },
                                                    {align: 'center',text: '<span style="color:white;font-weight:bold;">Qty Rejects</span>', dataIndex: 'QTY_REJECTED', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
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
            height: 28,
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
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        }
                    ]
                }
            ]
        }
    ]
}
);
