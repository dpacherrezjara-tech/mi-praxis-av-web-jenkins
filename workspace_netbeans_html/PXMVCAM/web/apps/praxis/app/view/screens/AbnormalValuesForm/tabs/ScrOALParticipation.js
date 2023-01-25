Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrOALParticipation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrOALParticipation',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrOALParticipationController'
    ],
    controller: 'ScrOALParticipationController',
//    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
//    bodyStyle: 'background: transparent;',
    defaults: {
        bodyStyle: 'background: transparent;'
//        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalOAL',
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
                    id: prototype.id + '-boxMainDataOAL',
                    width: '100%',
//                    hidden: false,
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "0 15 0 0"  // (top, right, bottom, left)
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataOAL',
                                    padding: '5px 0px 0px 0px',
                                    width: 1254,
//                                    height: 428,
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
                                            {text: 'Online / Offline',
                                                columns: [
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'strFormatDate', width: 80, align: 'center',
//                                                listeners: {
//                                                    click: 'clickgridDetWeek_colHandler',
//                                                },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            //return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a> font-weight:bold;';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Coupons', dataIndex: 'QCPNS0', width: 80, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'clickDetTotalCoupons_colHandler',
                                                            args: ['1']
                                                        },
                                                    },
                                                    {text: 'Total USD',
                                                        columns: [
                                                            {
                                                                text: 'ON', dataIndex: 'VALOR0', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% USD', dataIndex: 'perVALOR0', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% Milles', dataIndex: 'PERKMSON', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'OFF', dataIndex: 'VALOROA', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% USD', dataIndex: 'perVALOROA', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% Milles', dataIndex: 'PERKMSOF', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'VALOR0ATOT', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {text: 'Offline Only',
                                                columns: [
                                                    {text: '100% Offline',
                                                        columns: [
                                                            {
                                                                text: 'Total<br>Coupons', dataIndex: 'QCPNS2', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c4d3b6";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                listeners: {
                                                                    click: 'clickDetTotalCoupons_colHandler',
                                                                    args: ['3']
                                                                },
                                                            },
                                                            {
                                                                text: 'Total USD', dataIndex: 'VALOR2', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c4d3b6";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Commission', dataIndex: 'VISC2', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c4d3b6";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Codeshare',
                                                        columns: [
                                                            {
                                                                text: 'Total<br>Coupons', dataIndex: 'QCPNS3', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#A9D87D";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                listeners: {
                                                                    click: 'clickDetTotalCoupons_colHandler',
                                                                    args: ['4']
                                                                },
                                                            },
                                                            {
                                                                text: 'Total USD', dataIndex: 'VALOR3', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#A9D87D";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Commission', dataIndex: 'VISC3', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#A9D87D";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDetailOAL',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "0 15 0 0"  // (top, right, bottom, left)
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailOAL',
                            padding: '5px 0px 0px 0px',
                            width: 1570,
                            height: 600,
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
                                    {text: 'Sales',
                                        columns: [
                                            {
                                                text: 'Ticket Number', dataIndex: 'TKT', width: 120, align: 'center',
//                                                listeners: {
//                                                    click: 'clickgridDetWeek_colHandler',
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    //return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a> font-weight:bold;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country - City', dataIndex: 'COUNTRYS', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'VENDOR', width: 80, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescription', width: 120, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Channel', dataIndex: 'strDescription2', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Issued<br>Curr.', dataIndex: 'CURRENL', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Fare', dataIndex: 'TARIFA', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Type', dataIndex: 'TDOC', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Org - Des', dataIndex: 'CITYO', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carrier', dataIndex: 'CARRIER', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'CURRENC', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'VALOR', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '% Part', dataIndex: 'PORXPART', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Miles', dataIndex: 'PMP', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '% Part', dataIndex: 'PERKMSON', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '', dataIndex: '', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    if (record.data.strColorPart === 'R'){
                                                        value = 'resources/img/icon/16x16/circle_red.png';
                                                    } else {
                                                        value = 'resources/img/icon/16x16/circle_green.png';
                                                    }
                                                    
                                                    return '<img src=' + '"' + value + '"' + '>';    
                                                }
                                            },
                                            {
                                                text: 'Rev. by<br>Miles', dataIndex: 'REVXMILLA', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '', dataIndex: '', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    if (record.data.strColorRevMil === 'R'){
                                                        value = 'resources/img/icon/16x16/circle_red.png';
                                                    } else {
                                                        value = 'resources/img/icon/16x16/circle_green.png';
                                                    }
                                                    
                                                    return '<img src=' + '"' + value + '"' + '>';                                                 
                                                }
                                            },
                                            {
                                                text: 'Indic', dataIndex: 'strDescription3', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                    ]
                },
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