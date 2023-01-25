Ext.define('Ext.Praxis.view.sales.DeterminationOfCommissionForm.Info', {
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
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    width: prototype.widthContenedor,
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-radiogroupSA',
                            margin: '10 0 10 0',
                            defaults: {
                                margin: '0 20 0 0'
                            },
                            items: [
                                { boxLabel: '<b style="color:#057ECB;">All</b>', inputValue: 'All', name: 'rbSA', checked: true },
                                { boxLabel: '<b style="color:#057ECB;">ARC</b>', inputValue: 'ARC', name: 'rbSA' },
                                { boxLabel: '<b style="color:#057ECB;">BSP</b>', inputValue: 'BSP', name: 'rbSA' },
                                { boxLabel: '<b style="color:#057ECB;">ASR</b>', inputValue: 'ASR', name: 'rbSA' }
                            ],
                            listeners: {change: 'onSetChangeRouteChange' }
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="GridGroup">
                {
                    region: 'center',
                    id: prototype.id + '-GridGroup',
                    border: false,
                    width: prototype.widthContenedor,
//                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid_det_comm_GridGroup">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid_det_comm_GridGroup',
                            width: prototype.widthGrid,
                            height: 530,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Period', dataIndex: 'A2959FPERI', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#244066;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'IATA',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Sale', dataIndex: 'A2845AGENT', width: 90,
                                                listeners: {
                                                    click: 'onGetShowListByAgentClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-determination-of-commission-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Name', dataIndex: 'A003KEY3', width: 242,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;color:#244066;font-weight:bold;";
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'IATA',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Home', dataIndex: 'A2845IATAH', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#244066;font-weight:bold;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A2845FUENT', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#244066;font-weight:bold;";
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A2845PAIVT', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#244066;font-weight:bold;";
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'TAKEN',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency', dataIndex: 'A2845MDAFA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#244066;font-weight:bold;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Fare', dataIndex: 'A2845FARE', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_LOCAL_FARE, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Value Commission', dataIndex: 'A2845TTCOM', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_VALE_COMMISSION, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'GIVEN',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Value Commission', dataIndex: 'A2845VUPFR', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_GIVEN_COMMISSION_VALUE, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'DIFFERENCE ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Value', dataIndex: 'DIFERENCIA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_DIFFERENCE_VALUE, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Round ', dataIndex: 'ROUND', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_DIFFERENCE_ROUND, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'IVA Round', dataIndex: 'ROUND_IVA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_DIFFERENCE_IVA_ROUND, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total', dataIndex: 'DIFERENCIA_IVA_TOTAL', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background:#d5f4d5;color:#244066;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup').getStore().getData().items[0].data;
                                            metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                            return Ext.util.Format.number(data.TOT_TOTAL, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Apply', dataIndex: 'APPLY_ADM', width: 70, sortable: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;color:#2D486C;font-weight:bold;";
                                            if (value==='YES') value = data.A2959TRNCO;
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A2959TRNCO', width: 118, sortable: false,
                                        listeners: {
                                            click: 'onSearchInfoADMClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            if (data.APPLY_ADM==='YES') {
                                                if(data.STATUS==="P")value ="Pending";
                                                if(data.STATUS==="D")value ="IATA Disabled";
                                                if(data.STATUS==="C")value ="Not Client Register";
                                                if(data.STATUS==="Y")value ="processed "+value;
                                            } else value = 'Not Aply';
                                            metaData.style = "text-align:left;color:#057ECB;text-decoration:none;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#sales-determination-of-commission-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Assign<br>ADM/ACM',
                                        id:prototype.id+'-ID_Assign_ADM_ACM',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 80,
                                        align: 'center',
                                        items: [
                                            {
                                                icon: 'resources/img/botones/16x16/Processing_1.png',
//                                                tooltip: '',
                                                handler: 'onSetAsignADMACMClick'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Reprocessing', dataIndex: 'A2959REPRO', width: 90, sortable: false, id:prototype.id+'-ID_Reprocessing',
                                        listeners: {
                                            click: 'onSearchInfoREPROClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="Y")value ="YES";
                                            if(value==="N")value ="NO";
                                            metaData.style = "text-align:left;color:#057ECB;text-decoration:none;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#sales-determination-of-commission-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
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
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="GridTMtotalperMonth">
                {
                    region: 'center',
                    id: prototype.id + '-GridTMtotalperMonth',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid_det_comm_ticket">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid_det_comm_ticket',
                            width: prototype.widthGrid2,
                            height: 520,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Date',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Sale', dataIndex: 'A2845FECVT', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.A2845FECVT+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'A2845CIAI', width: 120,
                                        listeners: {
                                            click: 'onGetShowViewTicketClick',
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;";
                                            value = '<b>' + data.A2845CIAI + '' +data.A2845FORMI+ '' +data.A2845SERII + '</b>';
                                            return '<a href="#sales-determination-of-commission-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Cupon', dataIndex: 'A2845CUPON', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.A2845CUPON+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Type Trans.', dataIndex: 'A2845TRNCU', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.A2845TRNCU+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'IATA', dataIndex: 'A2845AGENT', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.A2845AGENT+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'IATA',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Home', dataIndex: 'A2845IATAH', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.A2845IATAH+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A2845FUENT', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.A2845FUENT+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Country', dataIndex: 'A2845PAIVT', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.A2845PAIVT+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'SCHEMA',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'A2845CODAC', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Vrs', dataIndex: 'A2845VRSAC', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'TAKEN',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Fare', dataIndex: 'A2845VALOL', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_ticket').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_FARE_TAKEN, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'A2845MDAFA', width: 70
                                            },
                                            {
                                                text: 'Apply %', dataIndex: 'A2845PORCO', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_ticket').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_APPLY_COMMISSION_TAKE, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Value Commission', dataIndex: 'A2845TTCOM', width: 130,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_ticket').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_VALUE_COMMISSION_TAKE, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'UPFRONT COMMISSION',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Apply %', dataIndex: 'A2845POUPF', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_ticket').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_APPLY_UP, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A2845VUPFR', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_ticket').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                    return Ext.util.Format.number(data.TOT_VALUE_UP, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Label', dataIndex: 'A2845TAGRF', width: 120,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A2845TAGRF+'"';
                                            return value;
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie2">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie2',
                            width: prototype.widthGrid2,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid2,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage2',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount2',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total2',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="GridGroupView">
                {
                    region: 'center',
                    id: prototype.id + '-GridGroupView',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid_det_comm_GroupView">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid_det_comm_GroupView',
                            width: prototype.widthGrid3,
                            height: 520,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Report Date', dataIndex: 'A2650FPROC', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'TICKET',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'CIA', dataIndex: 'A720CIAI', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'FORM', dataIndex: 'A720FORMAI', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'SERIE', dataIndex: 'A720SERIEI', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Number',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Group', dataIndex: 'A2650GRUPO', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Code',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Agent', dataIndex: 'A720AGENTE', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A2650FUENT', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Ctry', dataIndex: 'A720PAIVTA', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'LOCAL',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Mda', dataIndex: 'A720MDAFA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Fare', dataIndex: 'A720FARE', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'REVENUE',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Mda', dataIndex: 'A720MDARV', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Fare', dataIndex: 'A720FARERV', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'COMMISSION LOCAL',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Mda', dataIndex: 'A720MDACOM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', dataIndex: 'A720TTCOMM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Perc', dataIndex: 'A720PORCOM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'OVER COMMISSION',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Mda', dataIndex: 'A720MDACM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', dataIndex: 'A720TTSCMM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Perc', dataIndex: 'A720PORSCM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'AGREEMENT',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'A2650CODAC', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Vrs', dataIndex: 'A2650VRSAC', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'UPFRONT COMMISSION %',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Apply', dataIndex: 'A2650PUPFR', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A2650VUPFR', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'OVER COMMISSION %',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Apply', dataIndex: 'A2650POVCO', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A2650VOVCO', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'TAX ON COMMISSION',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Perc', dataIndex: 'A2650PTOCO', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A2650VTOCO', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'DIFFERENCE ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Value', dataIndex: 'DIFFA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Round ', dataIndex: 'DIFFB', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'IVA Round', dataIndex: 'DIFFB', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total', dataIndex: 'A2650PUPFR', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Error', dataIndex: 'A2650CDERR', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Label', dataIndex: 'A2650TAGRF', width: 120,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});