Ext.define('Ext.Praxis.view.payments.SalesAgentControlForm.Info', {
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
                            width: 1650,
                            id: prototype.id + '-panelGridDataDetail',
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
                                    id: prototype.id + '-gridDataDetail',
                                    height: 522,
                                    width: 1650,
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
                                            
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Client</span>', dataIndex: 'CCUST', width: 60,style: 'padding:2px; background: #c9daf5;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;";
                                                
                                                if (value == 'TA01') {
                                                    return  '202';
                                                } else if (value == 'AV01') {
                                                    return  '134';
                                                } else if (value == 'LR01') {
                                                    return  '133';
                                                } else if (value == '2K01') {
                                                    return  '547';
                                                }
                                                
                                                return  value;
                                            }},
                                            {text: '<span style="color:black;font-weight:bold;">SRC</span>', dataIndex: 'CANAV', width: 50,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Name</span>', dataIndex: 'NAGENT', width: 226,style: 'padding:2px; background: #c9daf5;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:left;";

                                                return value;
                                            }},
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'TYPEAG', width: 50,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Accreditation Type</span>', menuDisabled: true,style:'background:#c9daf5;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                     {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'ASTATUS', width: 90,align: 'center',style: 'padding:2px; background: #c9daf5;border-color:white'},
                                                     {text: '<span style="color:black;font-weight:bold;">Risk</span>', dataIndex: 'RSTATUS', width: 50,align: 'center',style: 'padding:2px; background: #c9daf5;border-color:white'},
                                                ]
                                            },
                                           
                                            {text: '<span style="color:black;font-weight:bold;">CTR</span>', dataIndex: 'SAGECTR', width: 50,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                             {text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'CURRENCY', width: 70,style: 'padding:2px; background: #c9daf5;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var data = record.data;
                                                                metaData.style = "text-align:center;";

                                                                return  'USD';
                                                            }
                                                        },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Credit Card</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                        {text: '<span style="color:black;font-weight:bold;">Month</span>', dataIndex: 'MONTHCRE', align: 'center',width: 50,style: 'background: #FBD2D1;border-color:white',
                                                        renderer: function (value, metaData, record) {
                                                                            metaData.style = "text-align:center";
                                                                            return '<a style="color:#004080; font-weight:bold; text-decoration:underline; cursor:pointer;">' 
                                                                                   + Ext.String.htmlEncode(value) + 
                                                                                   '</a>';
                                                                        },
                                                                        listeners: {
                                                                            click: 'onClickDetailMonthIMF150',
                                                                            args: ['CC']
                                                                        }},
                                                        {text: '<span style="color:black;font-weight:bold;">QTY</span>', dataIndex: 'QTYTKCRE', align: 'center',width: 70,style: 'background: #FBD2D1;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "color:#2B2B2B;text-align:right;";
                                                                value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                return  value;
                                                            }
                                                        },
                                                        {text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'AMOUNCRE', align: 'center',width: 90,style: 'background: #FBD2D1;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "color:#2B2B2B;text-align:right;";
                                                                value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                return  value;
                                                            }
                                                        },
                                                        {text: '<span style="color:black;font-weight:bold;">5 Months</span>', dataIndex: 'FMOUNCRE', align: 'center',width: 90,style: 'background: #FBD2D1;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "color:#2B2B2B;text-align:right;";
                                                                value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                return  value;
                                                            }
                                                        },
                                                        {text: '<span style="color:black;font-weight:bold;">Desviacion</span>', dataIndex: 'DESVICRE', align: 'center',width: 90,style: 'background: #FBD2D1;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "color:#2B2B2B;text-align:right;";
                                                                value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                return  value;
                                                            }
                                                        },
                                                        {text: '<span style="color:black;font-weight:bold;">Alert</span>', dataIndex: 'ALERTCRE', align: 'center',width: 90,style: 'background: #FBD2D1;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "color:#2B2B2B;text-align:right;";
                                                                value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                return  value;
                                                            }
                                                        }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Cash</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                    {text:  '<span style="color:black;font-weight:bold;">Month</span>', align: 'center',dataIndex: 'MONTHCAS', align: 'center', width: 50,style: 'background: #D1FBD2;border-color:white',
                                                        renderer: function (value, metaData, record) {
                                                                            metaData.style = "text-align:center";
                                                                            return '<a style="color:#004080; font-weight:bold; text-decoration:underline; cursor:pointer;">' 
                                                                                   + Ext.String.htmlEncode(value) + 
                                                                                   '</a>';
                                                                        },
                                                                    listeners: {
                                                                            click: 'onClickDetailMonthIMF150',
                                                                            args: ['CA']
                                                                        }},
                                                    {text:  '<span style="color:black;font-weight:bold;">QTY</span>' ,align: 'center', dataIndex: 'QTYTKCAS', width: 70,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "color:#2B2B2B;text-align:right;";
                                                        value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        return  value;
                                                    }},
                                                {text:  '<span style="color:black;font-weight:bold;">Amount</span>' ,align: 'center', dataIndex: 'AMOUNCAS', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "color:#2B2B2B;text-align:right;";
                                                        value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        return  value;
                                                    }},
                                                {text:  '<span style="color:black;font-weight:bold;">5 Months</span>' ,align: 'center', dataIndex: 'FMOUNCAS', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "color:#2B2B2B;text-align:right;";
                                                        value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        return  value;
                                                    }},
                                                {text:  '<span style="color:black;font-weight:bold;">Desviacion</span>' ,align: 'center', dataIndex: 'DESVICAS', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "color:#2B2B2B;text-align:right;";
                                                        value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        return  value;
                                                    }},
                                                {text:  '<span style="color:black;font-weight:bold;">Alert</span>' ,align: 'center', dataIndex: 'ALERTCAS', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "color:#2B2B2B;text-align:right;";
                                                        value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        return  value;
                                                    }}
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1200,
                            id: prototype.id + '-panelGridSumaryMain',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                 {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridSumaryMain',
                                    width: 667,
                                    useArrows: true,
                                    rootVisible: false,
                                    multiSelect: true,
                                    columnLines: true,
                                    rowLines: true,
                                    scrollable: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Month</span>', style:'background:#c9daf5;color:black !important',
                                                dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
                                                listeners: {
                                                    click: 'onGridCountry'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    value = '<b>' + value + '</b>';
                                                    return  !record.data.children ? ' ' : value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Society</span>', style:'background:#c9daf5;color:black !important',
                                                dataIndex: 'CCUST',
                                                width: 85,
                                                align: 'center', // centra a nivel de columna (por defecto)
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center; color:#008FE3; text-decoration:underline; display:block; text-align:center;cursor:pointer";

                                                    const strCCUST = {
                                                        '2K01': 'AEROGAL',
                                                        'AB01': 'BRASIL',
                                                        'AV01': 'AVIANCA',
                                                        'LR01': 'LACSA',
                                                        'TA01': 'TACA'
                                                    };

                                                    const displayText = strCCUST[value] || 'AV GROUP';
                                                    return displayText;
                                                },
                                                listeners: {
                                                    click: 'onGridDataDetail'
                                                }
                                            },
                                            {
                                                        text: '<span style="color:black;font-weight:bold;">Total Invoice </span>', menuDisabled: true,style:'background:#c9daf5;color:black !important',
                                                        columns: [
                                                             {
                                                                text: '<span style="color:black;font-weight:bold;">Avianca</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                                 menuDisabled: true,
                                                                columns: [
                                                                    {
                                                               text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'CURRENCY', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                                
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:center;";
                                                                    return '<b>USD<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>USD<b>';
                                                                }
                                                            },
                                                            {
                                                               text: '<span style="color:black;font-weight:bold;">Qty</span>', dataIndex: 'QTY_INVOICES', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'SVFOPL',
                                                                style:'background:#FBD2D1;color:black !important',width: 120, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Praxis</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                 menuDisabled: true,
                                                                columns: [
                                                                    
                                                                         {
                                                                text:  '<span style="color:black;font-weight:bold;">Qty</span>' , dataIndex: 'QTY_100_ALL',
                                                                style:'background:#D1FBD2;color:black !important',width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                                         {
                                                                  text:  '<span style="color:black;font-weight:bold;">Rate</span>' ,
                                                                 dataIndex: 'QTY_100_PENDING', width: 70, style:'background:#F9D88C;color:black !important',align: 'center ', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData) {
                                                                                metaData.style = "color:#2B2B2B;text-align:right;";
                                                                                if (value === null || value === undefined || value === '') return '';
                                                                                return '<b>' + Ext.util.Format.number(value, '0.00') + '%</b>';
                                                                            },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                              {
                                                                text:  '<span style="color:black;font-weight:bold;">Not Found</span>' , dataIndex: 'QTY_NOT_FOUND',
                                                                style:'background:#FFA8A8;color:black !important',width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                        ]
                                    }
                                },
                                  {
                                        xtype: 'panel',
                                        id: prototype.id + '-SummaryMainData',
                                        align: 'left',
                                        margin: '0 0 0 0 ',
                                        layout: {
                                            type: 'hbox',
                                            align: 'center'
                                        },
                                        defaults: {
                                            xtype: 'label',
                                            align: 'center',
                                            html: '' + '&nbsp',
                                            height: 25,
                                            padding: '5 5 5 0',
                                            style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:11px'
                                        },
                                        items: [
                                            {
                                                width: 185,
                                                id: prototype.id + '-SPACE1',
                                                style: 'background:#c9daf5; text-align:center; font-weight:bold; color:black;',
                                                html: 'Totals'
                                            },
                                            {width: 70, id: prototype.id + '-CURRENCY',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-QTY_INVOICES',style:'background: #FBD2D1;text-align:right'},
                                            {width: 120, id: prototype.id + '-SVFOPL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-QTY_100_ALL',style:'background: #D1FBD2;text-align:right'},
                                            {width: 70, id: prototype.id + '-QTY_100_PENDING',style:'background: #F9D88C;text-align:right'},
                                             {width: 80, id: prototype.id + '-QTY_NOT_FOUND',style:'background: #FFA8A8;text-align:right'},
                                        ]
                                    },
                                  {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    margin: '20 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                       {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSM',
                                                    width: 490,
                                                    hidden: true,
                                                    border: false,
                                                    bodyBorder: false,
                                                    bodyStyle: {
                                                        border: 'none',
                                                        background: '#FFFFFF'
                                                    },
                                                    innerPadding: 28,
                                                    height: 260,
                                                    background: '#FFFFFF',
                                                    animation: { duration: 200 },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'right',
                                                        itemSpacing: 10,
                                                        marker: { size: 16 },
                                                        label: { fontSize: 13 },
                                                        style: { background: '#FFFFFF' }
                                                    },
                                                    series: [{
                                                        type: 'pie3d',
                                                        angleField: 'Perc2',
                                                        legendField: 'LABEL',
                                                        distortion: 0.7,
                                                        colors: ['#A7C7F2', '#B8E986', '#F9D88C'],
                                                        label: {
                                                            field: 'VENDOR',
                                                            display: 'outside',
                                                            font: '11px Arial',
                                                            calloutLine: { length: 25, width: 1 },
                                                            renderer: function (value) {
                                                                return value.split('\n')[1];
                                                            }
                                                        },
                                                        highlightCfg: { margin: 10 },
                                                        tooltip: {
                                                            trackMouse: true,
                                                            renderer: function (toolTip, record) {
                                                                toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                            }
                                                        }
                                                    }]
                                                },
                                        {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayBarSM',
                                                    width: 1100,
                                                    height: 260,
                                                    insetPadding: 10,
                                                    border: false,
                                                    background: '#FFFFFF',
                                                    legend: { docked: 'bottom' },
                                                    axes: [
                                                        { type: 'numeric', position: 'left', title: 'Cantidad', grid: true },
                                                        { type: 'category', position: 'bottom', title: 'Mes' }
                                                    ],
                                                    series: [{
                                                        type: 'bar',
                                                        xField: 'month',
                                                        yField: ['Avianca', 'PraxisTotal','NOtFound'],
                                                        title: ['Avianca Total', 'Praxis Total','Not Found'],
                                                        stacked: false, // Barras agrupadas
                                                        style: { opacity: 0.95 },
                                                        colors: ['#A7C7F2', '#B8E986','#FFA8A8'], // 🎨 tonos pastel
                                                        highlightCfg: { fillStyle: '#FFF2A8' },
                                                        tooltip: {
                                                            trackMouse: true,
                                                            renderer: function (tooltip, record, item) {
                                                                tooltip.setHtml(
                                                                    item.series.getTitle()[item.series.getYFieldIndex(item.field)] + ': ' +
                                                                    Ext.util.Format.number(record.get(item.field), '0,0')
                                                                );
                                                            }
                                                        }
                                                    }]
                                                }
                                    ]
                                }


                            ]
                        },
                        
                        ///AGREGAMOS PANEL MES
                        
                        
                        /////////////PAE+NEL IMF150/////////////////////
                        
                        ////////////////////////////////////////////////
                        ////////////////////////////////////////////////////
                        
                        
                        
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataIMF150',
                            bodyStyle: 'background-color: #F4F7FD; overflow-x: hidden;',
                            border: false,
                            height: 'auto',
                            width: 890,
                            margin: '0 0 0 0 ',
                            
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bodyPadding: 10,
                            
                            items: [                        
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelIMF150',
                                    labelAlign: 'center',
                                    style: 'font-weight: bold; color: #231223; text-align: center; display: block;',
                                    
                                    align: 'center',
                                    margin: '5 0 5 0'
//                                    hidden: true
                                },
                                
                                
                                
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'start' ,
                                        margin: '15px 0 15px 15px'
                                    },
                                    margin: '10 0 10 10', // 🔹 margen: arriba, derecha, abajo, izquierda
                                    items: [
                                       
                                         { xtype: 'tbspacer', width: 20 },
                                    
                                        
                                        //fecha
                                        
                                        
                                            ]
                                        },
         
                                
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataIMF150',
                                      xtype: 'grid',
                                      flex: 1, // ocupa todo el espacio disponible del panel
                                      width: '100%', 
                                      bodyStyle: 'background-color: #F4F7FD;',
                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Client</span>', 
                                                dataIndex: 'O_CCUST',
                                                width: 80,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                    renderer: function (value) {
                                                    if (value === '134') return 'Avianca';
                                                    if (value === '202') return 'Taca';
                                                    if (value === '133') return 'Lacsa';
                                                    if (value === '547') return 'Aerogal';
                                                    return value; // por defecto muestra el código
                                                }
                                               },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Agent</span>', 
                                                dataIndex: 'O_SAGENT',
                                                width: 100,
                                                textSelectable: true,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Fuente</span>', 
                                                dataIndex: 'O_FUENTE',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                    
                                                }
                                            },
                                            
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Country</span>',
                                                dataIndex: 'O_PAIS_VENTA',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                 
                                                }
                                            },
                                            
                                            
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Month</span>',
                                                dataIndex: 'O_MES',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                 renderer: function (value, metaData, record) {
                                                                            metaData.style = "text-align:center";
                                                                            return '<a style="color:#004080; font-weight:bold; text-decoration:underline; cursor:pointer;">' 
                                                                                   + Ext.String.htmlEncode(value) + 
                                                                                   '</a>';
                                                                        },
                                                 listeners: {
                                                                            click: 'onClickDetailA720'
                                                                           
                                                                        }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Payment Type</span>',
                                                dataIndex: 'O_FORMAPAGO',
                                                width: 130,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                   renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    if (value === 'CC') {
                                                        return 'CREDIT CARD';
                                                    } else if (value === 'CA') {
                                                        return 'CASH';
                                                    } else {
                                                        return value; // si viene otro valor, lo muestra tal cual
                                                    }
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;"> Amount</span>',
                                                dataIndex: 'O_VFOP',
                                                width: 140,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Total Tickets </span>',
                                                dataIndex: 'O_QTYTKTS',
                                                width: 120,
                                                xtype: 'numbercolumn',
                                                style: 'padding:2px; background: #c9daf5; border-color:white; text-align: center;',
                                                
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align: center";
                                                    if (value == null)
                                                        return '';
                                                    return Ext.util.Format.number(value, '0,000'); // 🔹 sin decimales
                                                }
                                            }

       
                                        

                                        ]
                                        
                                    }
                                }
                            ]
                        },
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        ////////////////////////////////////////////////
                        //////////////panelGridDataA270/////////////////////
                        ////////////////////////////////////////////////
                        
                        
                        
                        //panelGridDataA270
                        
                        
                        
                        
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataA270',
                            bodyStyle: 'background-color: #F4F7FD; overflow-x: hidden;',
                            border: false,
                            height: 'auto',
                            width: 1040,
                            margin: '0 0 0 0 ',
                            
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bodyPadding: 10,
                            
                            items: [                        
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelA270',
                                    labelAlign: 'center',
                                    style: 'font-weight: bold; color: #231223; text-align: center; display: block;',
                                    
                                    align: 'center',
                                    margin: '5 0 5 0',
//                                    hidden: true
                                },
                                
                                
                                
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'start' ,
                                        margin: '15px 0 15px 15px'
                                    },
                                    margin: '10 0 10 10', // 🔹 margen: arriba, derecha, abajo, izquierda
                                    items: [
                                       
                                         { xtype: 'tbspacer', width: 20 },
                                    
                                        
                                        //fecha
                                        
                                        
                                            ]
                                        },
         
                                
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataA270',
                                      xtype: 'grid',
                                      flex: 1, // ocupa todo el espacio disponible del panel
                                      width: '100%', 
                                      bodyStyle: 'background-color: #F4F7FD;',
                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Client</span>', 
                                                dataIndex: 'A_CCUST',
                                                width: 80,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                    renderer: function (value) {
                                                    if (value === '134') return 'Avianca';
                                                    if (value === '202') return 'Taca';
                                                    if (value === '133') return 'Lacsa';
                                                    if (value === '547') return 'Aerogal';
                                                    return value; // por defecto muestra el código
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Ticket</span>', 
                                                dataIndex: 'A_TICKET',
                                                width: 120,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Sale Date</span>', 
                                                dataIndex: 'A_A720FECVTA',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                    
                                                }
                                            },
                                            
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Country<br>of Sale</span>',
                                                dataIndex: 'A_A720PAIVTA',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                 
                                                }
                                            },
                                            
                                            
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Transaction</span>',
                                                dataIndex: 'A_A720TRNCU',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                
                                                 
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Document<br> Type</span>',
                                                dataIndex: 'A_A720TDOC',
                                                width: 100,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;"> Agent</span>',
                                                dataIndex: 'A_A720AGENTE',
                                                width: 120,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                 text: '<span style="color:black;font-weight:bold;"> Origin<br>Of Sale</span>',
                                                dataIndex: 'A_ORIGEN',
                                                width: 80,
                                                xtype: 'numbercolumn',
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }

                                            },
                                             {
                                                text: '<span style="color:black;font-weight:bold;"> Currency</span>',
                                                dataIndex: 'A_A1531MFOPR',
                                                width: 80,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Amount</span>',
                                                dataIndex: 'A_A1531VFOPR',
                                                width: 140,
                                                style: 'padding:2px; background: #c9daf5; border-color:white; text-align: center;', // 🔹 también alinea el encabezado
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align: right; padding-right: 5px;"; // 🔹 alinea contenido de la celda
                                                    return value;
                                                }
                                            }

                                            
       
                                        

                                        ]
                                        
                                    }
                                }
                            ]
                        },
                        
                        
                        
                        ////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////
                        
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
            height: 30,
            margin: '5 0 18 0',
            defaults: {
                border: false
            },
            items: [
                {
                    bodyStyle: 'background: #c9daf5; border-radius: 5px;',
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
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        }
                    ]
                }
            ]
        }
    ]
}
);
