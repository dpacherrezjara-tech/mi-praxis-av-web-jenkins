Ext.define('Ext.Praxis.view.payments.ControlReportForm.Info', {
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
                            width: 1617,
                            id: prototype.id + '-panelGridSumaryMain',
                            bodyStyle: 'background-color: #F4F7FD;margin-top:8px',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
//                                    margin: '0 0 0 20',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            padding: '0 10 3 10',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    padding: '0 10 5 10',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'All View',
                                                            margin: '0 5 0 0',
                                                            width: 50,
                                                            id: prototype.id + '-COL'
                                                        },
                                                        {
                                                            xtype: 'component',
                                                            id: prototype.id + '-btnToggleSwitchPending',
                                                            margin: '0 5 0 0',
                                                            html: `<style>
                                                                    .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                                    .toggle-input{opacity:0;width:0;height:0;}
                                                                    .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                                    .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                                    .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                                    .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                                                </style>
                                                                <label class="toggle-container">
                                                                    <input type="checkbox" class="toggle-input">
                                                                    <span class="toggle-slider"></span>
                                                                </label>`,
                                                            tooltip: 'Export to Report',
                                                            listeners: {
                                                                change: 'chgBash',
                                                                click: 'chgBash'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Pending View',
                                                            margin: '0 0 0 5',
                                                            width: 80,
                                                            id: prototype.id + '-EXT'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'treepanel',
                                            id: prototype.id + '-gridSumaryMain',
                                            width: 1617,
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
                                                        text: '<span style="color:black;font-weight:bold;">Valdate</span>', style: 'background:#c9daf5;color:black !important',
                                                        dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return  !record.data.children ? ' ' : value;
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">AV GROUP</span>', style: 'background:#c9daf5;color:black !important',
                                                        dataIndex: 'CCUST',
                                                        width: 85,
                                                        align: 'center', // centra a nivel de columna (por defecto)
                                                        renderer: function (value, metaData, record) {
                                                            metaData.style = "text-align:center; color:#1A1A1A; display:block; text-align:center;";

                                                            const strCCUST = {
                                                                '547': 'AEROGAL',
                                                                '134': 'AVIANCA',
                                                                '133': 'LACSA',
                                                                '202': 'TACA'
                                                            };

                                                            const displayText = strCCUST[value] || 'AV GROUP';
                                                            return displayText;
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">F1 - Settlement</span>', menuDisabled: true, style: 'background:#FBD2D1;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Received</span>', dataIndex: 'F1_TOTAL', width: 70, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                                text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true, style: 'background:#FBD2D1;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">W/O Settl</span>', dataIndex: 'F1_TOTAL_STVAL3', width: 70, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onClickDetailAvianca',
                                                                            args: ['IN_WSETT']
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
                                                                        text: '<span style="color:black;font-weight:bold;">Completed</span>', dataIndex: 'F1_TOTAL_STVAL1', width: 80, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                                        text: '<span style="color:black;font-weight:bold;">Taxes</span>', dataIndex: 'F1_TOTAL_TAXES', width: 80, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onClickDetailAvianca',
                                                                            args: ['IN_TAXES']
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
                                                                        text: '<span style="color:black;font-weight:bold;">Error</span>', dataIndex: 'F1_TOTAL_ERROR', width: 80, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onClickDetailAvianca',
                                                                            args: ['IN_ERROR']
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
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true, style: 'background:#FBD2D1;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F1_PERCENT', width: 70, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;align: center">Pending <br> to F2</span>', dataIndex: 'F1_TOTAL_PENDING_TO_F2', width: 70, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onClickDetailAvianca',
                                                                    args: ['IN_PENDING_F2']
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
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">F2 - Sales</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">F1 Completed</span>', dataIndex: 'F2_F1_TOTAL_COMPLETED', width: 90, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                                text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">W/O Sales</span>', dataIndex: 'F2_TOTAL_PENDING_OVER50', width: 70, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onClickDetailAvianca',
                                                                            args: ['IN_WSALES']
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
                                                                        text: '<span style="color:black;font-weight:bold;">F2 Completed</span>', dataIndex: 'F2_TOTAL_MATCH_OVER50', width: 90, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F2_PERCENT', width: 70, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A;";
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;align: center">Pending <br> to Acc</span>', dataIndex: 'F3_TOTAL_WO_ACC', width: 70, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onClickDetailAvianca',
                                                                    args: ['IN_PENDING_ACC']
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
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounted</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">F2 Completed</span>', dataIndex: 'F3_F2_TOTAL_COMPLETED', width: 100, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                                text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                columns: [

                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;align: center">Pending <br> to Sent</span>', dataIndex: 'F3_TOTAL_PENDING_SENT', width: 70, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onClickDetailAvianca',
                                                                            args: ['IN_PENDING_SENT']
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
                                                                        text: '<span style="color:black;font-weight:bold;">SENT</span>', dataIndex: 'F3_TOTAL_COMPLETED', width: 100, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onClickDetailAvianca',
                                                                            args: ['IN_SENT']
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
                                                                        text: '<span style="color:black;font-weight:bold;">W/O  Acc</span>', dataIndex: 'F3_TOTAL_WO_ACC', width: 90, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetail'
                                                                        },
                                                                        hidden: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', dataIndex: 'F3_TOTAL_COMPLETED_SAP', width: 90, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
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
                                                                text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F3_PERCENT', width: 70, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Return Error</span>', dataIndex: 'F3_TOTAL_ERROR', width: 90, style: 'background:#D6D6D6;color:black !important', align: 'center', menuDisabled: true, //flex: 1
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
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Sent to AV</span>', menuDisabled: true, style: 'background:#DCD1F7;color:black !important',
                                                        columns: [
                                                            {
                                                                hidden: true, text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true, style: 'background:#DCD1F7;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Completed Acc</span>', dataIndex: 'F1_TOTAL_STVAL3', width: 100, style: 'background:#DCD1F7;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetail'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                hidden: true, text: '<span style="color:black;font-weight:bold;">Pending</span>', menuDisabled: true, style: 'background:#DCD1F7;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">To Sent</span>', dataIndex: 'F3_TOTAL_PENDING_SENT', width: 90, style: 'background:#DCD1F7;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetail'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                hidde: true, text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true, style: 'background:#DCD1F7;color:black !important',
                                                                columns: [

                                                                ]
                                                            },
                                                            {
                                                                hidden: true, text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true, style: 'background:#DCD1F7;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F1_PERCENT', width: 70, style: 'background:#DCD1F7;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetail'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }
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
                                                align: 'left'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'left',
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
                                                {width: 70, id: prototype.id + '-F1_TOTAL_GLOBAL', style: 'background: #FBD2D1;text-align:right'},
                                                {width: 70, id: prototype.id + '-F1_TOTAL_STVAL3_GLOBAL', style: 'background: #FBD2D1;text-align:right'},
                                                {width: 80, id: prototype.id + '-F1_TOTAL_STVAL1_GLOBAL', style: 'background: #FBD2D1;text-align:right'},
                                                {width: 80, id: prototype.id + '-F1_TOTAL_TAXES_GLOBAL', style: 'background: #FBD2D1;text-align:right'},
                                                {width: 80, id: prototype.id + '-F1_TOTAL_ERROR_GLOBAL', style: 'background: #FBD2D1;text-align:right'},
                                                {width: 70, id: prototype.id + '-F1_PERCENT_GLOBAL', style: 'background: #FBD2D1;text-align:right'},
                                                {width: 70, id: prototype.id + '-F1_TOTAL_PENDING_TO_F2_GLOBAL', style: 'background: #FBD2D1;text-align:right'},

                                                {width: 90, id: prototype.id + '-F2_TOTAL_GLOBAL', style: 'background: #D1FBD2;text-align:right'},
                                                {width: 70, id: prototype.id + '-F2_TOTAL_STVAL3_GLOBAL', style: 'background: #D1FBD2;text-align:right'},
                                                {width: 90, id: prototype.id + '-F2_TOTAL_STVAL1_GLOBAL', style: 'background: #D1FBD2;text-align:right'},
                                                {width: 70, id: prototype.id + '-F2_PERCENT_GLOBAL', style: 'background: #D1FBD2;text-align:right'},
                                                {width: 70, id: prototype.id + '-SENT_TOTAL_STVAL3_GLOBAL', style: 'background: #D1FBD2;text-align:right'},

                                                {width: 100, id: prototype.id + '-SENT_TOTAL_GLOBAL', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 70, id: prototype.id + '-SENT_TOTAL_SENT_GLOBAL', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 100, id: prototype.id + '-SENT_TOTAL_STVAL1_GLOBAL', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 90, id: prototype.id + '-SAP_TOTAL_STVAL1_GLOBAL', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 70, id: prototype.id + '-SENT_PERCENT_GLOBAL', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 90, id: prototype.id + '-RETURN_ERROR_GLOBAL', style: 'background: #D6D6D6;text-align:right'},

                                                {hidden: true, width: 100, id: prototype.id + '-SAP_TOTAL_GLOBAL', style: 'background: #DCD1F7;text-align:right'},
                                                {hidden: true, width: 90, id: prototype.id + '-SAP_TOTAL_STVAL3_GLOBAL', style: 'background: #DCD1F7;text-align:right'},
                                                {hidden: true, width: 90, id: prototype.id + '-SAP_PERCENT_GLOBAL', style: 'background: #DCD1F7;text-align:right'},
                                                {hidden: true, width: 70, id: prototype.id + '-SAP_PERCENT_GLOBAL1', style: 'background: #DCD1F7;text-align:right'},
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    margin: '20 0 0 0',
                                    height: 390,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    items: [
                                        // ==========================
                                        // 🟢 PIE 1 - F1 Settlement
                                        // ==========================
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            id: prototype.id + '-pieF1',
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'component',
                                                    html: `
                                                                <div 
                                                                    style="
                                                                        font-size:18px; 
                                                                        font-weight:600; 
                                                                        color:#4C8ED9;
                                                                        text-decoration: underline; 
                                                                        cursor: pointer; 
                                                                        margin-bottom:10px;
                                                                    ">
                                                                    F1 - Settlement
                                                                </div>
                                                            `,
                                                    style: {textAlign: 'center'}
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSM',
                                                    width: 420,
                                                    height: 310,
                                                    innerPadding: 20,
//                                                        insetPadding: { bottom: 40 },
                                                    background: '#FFFFFF',
                                                    border: false,
                                                    bodyBorder: false,
                                                    bodyStyle: {background: '#FFFFFF', border: 'none'},
                                                    animation: {duration: 400, easing: 'easeOut'},
                                                    interactions: ['rotate', 'itemhighlight'],

                                                    legend: {
                                                        docked: 'bottom',
                                                        itemSpacing: 10,
                                                        marker: {size: 14},
                                                        label: {fontSize: 13}
                                                    },

                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            donut: 0, // sin hueco
                                                            distortion: 0.5,
                                                            highlightCfg: {margin: 6},
                                                            colors: ['#A3E4A6', '#E31C24'], // verde pastel = avance, rojo pastel = pendiente

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'rotate',
                                                                contrast: true,
                                                                font: '13px Arial',
                                                                fontWeight: 'bold',
                                                                calloutLine: {length: 25, width: 1}
                                                            },

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                        {id: prototype.id + '-spacef2', xtype: 'container', width: 40},
                                        // ==========================
                                        // 🔵 PIE 2 - F2 Sales
                                        // ==========================
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pieF2',
                                            flex: 1,
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'component',
                                                    html: `
                                                                <div 
                                                                    style="
                                                                        font-size:18px; 
                                                                        font-weight:600; 
                                                                        color:#4C8ED9;
                                                                        text-decoration: underline; 
                                                                        cursor: pointer; 
                                                                        margin-bottom:10px;
                                                                    ">
                                                                    F2 - Sales
                                                                </div>
                                                            `,
                                                    style: {textAlign: 'center'}
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarF2',
                                                    width: 420,
                                                    height: 310,
                                                    innerPadding: 20,
                                                    background: '#FFFFFF',
                                                    border: false,
                                                    bodyBorder: false,
                                                    bodyStyle: {background: '#FFFFFF', border: 'none'},
                                                    animation: {duration: 400, easing: 'easeOut'},
                                                    interactions: ['rotate', 'itemhighlight'],

                                                    legend: {
                                                        docked: 'bottom',
                                                        itemSpacing: 10,
                                                        marker: {size: 14},
                                                        label: {fontSize: 13}
                                                    },

                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            donut: 0,
                                                            distortion: 0.5,
                                                            highlightCfg: {margin: 8},
                                                            colors: ['#A3E4A6', '#E31C24'], // mismos colores pastel

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'rotate',
                                                                contrast: true,
                                                                font: '13px Arial',
                                                                fontWeight: 'bold',
                                                                calloutLine: {length: 25, width: 1}
                                                            },

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {id: prototype.id + '-spacef1', xtype: 'container', width: 40},
                                        // ==========================
                                        // 🔵 PIE 3 - aCCOUNTED
                                        // ==========================
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            id: prototype.id + '-pieAcc',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'component',
                                                    html: `
                                                                <div 
                                                                    style="
                                                                        font-size:18px; 
                                                                        font-weight:600; 
                                                                        color:#4C8ED9;
                                                                        text-decoration: underline; 
                                                                        cursor: pointer; 
                                                                        margin-bottom:10px;
                                                                    ">
                                                                    Accounted
                                                                </div>
                                                            `,
                                                    style: {textAlign: 'center'}
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarF3',
                                                    width: 420,
                                                    height: 310,
                                                    innerPadding: 20,
                                                    background: '#FFFFFF',
                                                    border: false,
                                                    bodyBorder: false,
                                                    bodyStyle: {background: '#FFFFFF', border: 'none'},
                                                    animation: {duration: 400, easing: 'easeOut'},
                                                    interactions: ['rotate', 'itemhighlight'],

                                                    legend: {
                                                        docked: 'bottom',
                                                        itemSpacing: 10,
                                                        marker: {size: 14},
                                                        label: {fontSize: 13}
                                                    },

                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            donut: 0,
                                                            distortion: 0.5,
                                                            highlightCfg: {margin: 8},
                                                            colors: ['#A3E4A6', '#E31C24'], // mismos colores pastel

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'rotate',
                                                                contrast: true,
                                                                font: '13px Arial',
                                                                fontWeight: 'bold',
                                                                calloutLine: {length: 25, width: 1}
                                                            },

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        // ==========================
                                        //F1 CODES
                                        // ==========================
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-codeF1',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            background: '#FFFFFF',
                                            hidden: true,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayF1',
                                                    width: 1000,
                                                    height: 300,
                                                    border: false,
                                                    background: '#F4F7FD',
                                                    margin: '0 0 0 5',
                                                    flipXY: true,

                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart',
                                                            text: 'Pending',
                                                            fontSize: 22,
                                                            color: '#333',
                                                            fontWeight: 'bold'
                                                        }
                                                    },
                                                    animation: {duration: 300},
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'
                                                    },
                                                    axes: [
                                                        {
                                                            type: 'numeric3d',
                                                            position: 'bottom',
                                                            fields: ['QUANTITY_OF_DEPOSITS'],
                                                            grid: true,
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value, '0,000');
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'left',
                                                            fields: 'strDescription',
                                                            grid: true,
                                                            label: {
                                                                textAlign: 'left',
                                                                font: 'bold 16px',
                                                                color: '#333'
                                                            }

                                                        }
                                                    ],
                                                    series: [
                                                        {
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strDescription',
                                                            yField: ['QUANTITY_OF_DEPOSITS'],
                                                            colors: ['#E31C24'], // verde suave
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: 10,
                                                                minGapWidth: 5,
                                                                maxBarWidth: 120,
                                                                thickness: 8 // 👈 reduce la profundidad del 3D
                                                            },
                                                            distortion: 0.25, // 👈 suaviza el ángulo del 3D
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml(
                                                                            'QUANTITY OF DEPOSITS: <b>' +
                                                                            Ext.util.Format.number(
                                                                                    record.get(ctx.field),
                                                                                    '0,000'
                                                                                    ) +
                                                                            '</b>'
                                                                            );
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            hidden: true,
                            width: 1400,
                            id: prototype.id + '-panelGridDataDetail2',
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
                                    height: 543,
                                    width: 1210,
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
                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CUSTOMER', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
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
                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'COUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Settlement Date</span>',
                                                dataIndex: 'DATESETT',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";

                                                    if (!value || value.length !== 8)
                                                        return value;

                                                    var year = value.substring(0, 4);
                                                    var month = value.substring(4, 6);
                                                    var day = value.substring(6, 8);

                                                    return day + "/" + month + "/" + year;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File Name</span>', dataIndex: 'NAMEFILE', width: 503, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File Type</span>', dataIndex: 'TYPEFILE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload Date</span>',
                                                dataIndex: 'DATEUPLO',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";

                                                    if (!value || value.length !== 8)
                                                        return value;

                                                    var year = value.substring(0, 4);
                                                    var month = value.substring(4, 6);
                                                    var day = value.substring(6, 8);

                                                    return day + "/" + month + "/" + year;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Size</span>', dataIndex: 'SIZEFILE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Download File</span>',
                                                width: 100,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');  // o el campo que tú uses para descargar

                                                    return `<img src="resources/img/botones/excel-png-office-xlsx-icon-3.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onDownloadCSV'
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
                            hidden: true,
                            width: 1420,
                            id: prototype.id + '-panelGridDataARC2',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailARC',
                                    height: 543,
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
                                            {text: '<span style="color:white;font-weight:bold;">Report ID</span>', dataIndex: 'REPORTID', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
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
                                            {text: '<span style="color:white;font-weight:bold;">User ID (N/A)</span>', dataIndex: 'USERID', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">REF NBR (B*MM*W*C)</span>', dataIndex: 'REFNBR', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">PED (yy/mm/dd)</span>', dataIndex: 'PEDARC', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Date</span>', dataIndex: 'DATEARC', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File Name</span>', dataIndex: 'NAMEFILE', width: 260, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Time</span>', dataIndex: 'TIMEARC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Dist. Name</span>', dataIndex: 'DISTNAME', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Group ID (N/A)</span>', dataIndex: 'GROUPID', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Lines</span>', dataIndex: 'LINESARC', width: 50, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Pages</span>', dataIndex: 'PAGESARC', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Download</span>',
                                                width: 80,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');  // o el campo que tú uses para descargar

                                                    return `<img src="resources/img/botones/txt.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onDownloadCSVARC'
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
                                                    click: 'onViewCSVARC'
                                                }
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
