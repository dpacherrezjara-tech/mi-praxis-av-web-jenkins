Ext.define('Ext.Praxis.view.sales.BPOProductionForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            layout: 'vbox',
            defaults: {
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxConsultas',
                    layout: 'hbox',
                    defaults: {
                        height: 390,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="boxContenGrid">
                        {
                            region: 'center',
                            id: prototype.id + '-boxContenGrid',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background-color: #E3EAEF;',
                                border: true,
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridReport">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridReport',
                                    width: prototype.widthGrid,
                                    height: 390,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing<br>date', dataIndex: 'FECHA_PROC', width: 90
                                            },
                                            {
                                                text: 'Source', dataIndex: 'FUENTE', width: 80
                                            },
                                            {
                                                text: 'Total<br>Groups', dataIndex: 'QTY_GROUP', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total<br>Transactions', dataIndex: 'QTY_DOCUM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Qty<br>Sale', dataIndex: 'QTY_SALE', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Qty<br>Exchange', dataIndex: 'QTY_EXCH', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Qty<br>Refound', dataIndex: 'QTY_RFND', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Qty<br>Memo', dataIndex: 'QTY_MEMO', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'IC<br>Pending', dataIndex: 'QTY_ERR_IC', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'IC OK', dataIndex: 'QTY_OK_IC', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: '%IC<br>Pending', dataIndex: '', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Total<br>Errors', dataIndex: 'QTY_TOT_ER_SP', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'SP<br>Pending', dataIndex: 'QTY_ERR_SP', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'SP OK', dataIndex: 'QTY_OK_SP', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: '%SP<br>Pending', dataIndex: '', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Groups<br>Closed', dataIndex: 'QTY_GRUP_CER', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Groups<br>Open', dataIndex: 'QTY_GRUP_ABI', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Groups<br>Posted', dataIndex: 'QTY_CONT', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 15},
                        // <editor-fold defaultstate="collapsed" desc="Panel Derecha">
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 220,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'BPO Production Control',
                                    style: 'font-weight:bold;font-size:14px;',
                                    padding: '25 0 0 7'
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    layout: 'hbox',
                                    padding: '27 0 0 7',
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'FROM'
                                        },
                                        { xtype: 'tbspacer', width: 70},
                                        {
                                            text: 'TO'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 12 },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    layout: 'hbox',
                                    padding: '10 0 0 7',
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: '',
                                            id: prototype.id+'-lbl_fecha_from',
                                            style: 'font-weight:bold;'
                                        },
                                        { xtype: 'tbspacer', width: 39},
                                        {
                                            text: '',
                                            id: prototype.id+'-lbl_fecha_to',
                                            style: 'font-weight:bold;'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 12 },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    layout: 'hbox',
                                    padding: '10 0 0 7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'label',
                                                hidden: true
                                            },
                                            items: [
                                                {
                                                    text: 'Click in cell'
                                                },
                                                { xtype: 'tbspacer', height: 6 },
                                                {
                                                    text: 'processing date'
                                                },
                                                { xtype: 'tbspacer', height: 6 },
                                                {
                                                    text: 'for view list of'
                                                },
                                                { xtype: 'tbspacer', height: 6 },
                                                {
                                                    text: 'errors.'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 48 },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    width: 210,
                                    layout: 'hbox',
                                    padding: '10 0 0 7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                { xtype: 'tbspacer', height: 18 },
                                                {
                                                    text: 'IC=Input Control'
                                                },
                                                { xtype: 'tbspacer', height: 10 },
                                                {
                                                    text: 'SP=Sales Processing'
                                                },
                                                { xtype: 'tbspacer', height: 10 },
                                                {
                                                    text: 'KPI=Key Performance Indicator'
                                                },
                                                { xtype: 'tbspacer', height: 18 }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                { xtype: 'tbspacer', height: 20},
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'panel',
                        bodyStyle: 'background-color: #E3EAEF;',
                        layout: 'vbox',
                        border: true,
                        width: 238,
                        height: 220
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Panel 1">
                        {
                            items: [
                                { xtype: 'tbspacer', height: 12},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'image',
                                            src: 'resources/img/flag/mexico.png',
                                            width: 70,
                                            height: 54
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'ASR MEX',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '100%',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '(AUDITED)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TRANSACTIONS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor01A',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'GROUPS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor02A',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'IC PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor03A',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'SP PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor04A',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'OPEN/CLOSED',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor05A',
                                            text: '0'
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 8},
                        // <editor-fold defaultstate="collapsed" desc="Panel 2">
                        {
                            items: [
                                { xtype: 'tbspacer', height: 12},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'image',
                                            src: 'resources/img/flag/mapamundi.png',
                                            width: 70,
                                            height: 54
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'ASR OTHER',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '100%',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '(AUDITED)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TRANSACTIONS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor01B',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'GROUPS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor02B',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'IC PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor03B',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'SP PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor04B',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'OPEN/CLOSED',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor05B',
                                            text: '0'
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 8},
                        // <editor-fold defaultstate="collapsed" desc="Panel 3">
                        {
                            items: [
                                { xtype: 'tbspacer', height: 12},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'image',
                                            src: 'resources/img/flag/mexico.png',
                                            width: 70,
                                            height: 54
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'BSP MEX',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '100%',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '(AUDITED)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TRANSACTIONS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor01C',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'GROUPS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor02C',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'IC PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor03C',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'SP PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor04C',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'OPEN/CLOSED',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor05C',
                                            text: '0'
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 8},
                        // <editor-fold defaultstate="collapsed" desc="Panel 4">
                        {
                            items: [
                                { xtype: 'tbspacer', height: 12},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'image',
                                            src: 'resources/img/flag/mapamundi.png',
                                            width: 70,
                                            height: 54
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'BSP OTHER',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '100%',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '(AUDITED)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TRANSACTIONS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor01D',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'GROUPS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor02D',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'IC PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor03D',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'SP PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor04D',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'OPEN/CLOSED',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor05D',
                                            text: '0'
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 8},
                        // <editor-fold defaultstate="collapsed" desc="Panel 5">
                        {
                            items: [
                                { xtype: 'tbspacer', height: 12},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'image',
                                            src: 'resources/img/flag/usa.png',
                                            width: 70,
                                            height: 54
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'ARC',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '100%',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '(AUDITED)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TRANSACTIONS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor01E',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'GROUPS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor02E',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'IC PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor03E',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'SP PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor04E',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'OPEN/CLOSED',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor05E',
                                            text: '0'
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 8},
                        // <editor-fold defaultstate="collapsed" desc="Panel 6">
                        {
                            items: [
                                { xtype: 'tbspacer', height: 12},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'image',
                                            src: 'resources/img/flag/setting.png',
                                            width: 70,
                                            height: 54
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'MANUAL',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '100%',
                                                    style: 'font-weight:bold;'
                                                },
                                                { xtype: 'tbspacer', height: 4},
                                                {
                                                    text: '(AUDITED)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TRANSACTIONS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor01F',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'GROUPS',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor02F',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'IC PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor03F',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'SP PEND/OK',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor04F',
                                            text: '0'
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 13},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        { xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'OPEN/CLOSED',
                                            width: 107
                                        },
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblValor05F',
                                            text: '0'
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});