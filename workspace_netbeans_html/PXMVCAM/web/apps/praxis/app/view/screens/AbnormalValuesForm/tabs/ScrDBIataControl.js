Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDBIataControl', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrDBIataControl',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController'
    ],
    controller: 'ScrDBIataControlController',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        //border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalIataControl',
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
                    id: prototype.id + '-boxMainDataIataControl',
                    width: '100%',
//                    hidden: false,
                    layout: {
                        type: 'vbox',
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
                        // Filtros Select By
                        {
                            xtype: 'panel',
                            border: false,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
//                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Select By',
                                    id: prototype.id + '-cmbTipo_ControlTotal',
                                    queryMode: 'local',
                                    enableKeyEvents: true,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 60,
                                    width: 200,
                                    listeners: {
                                        select: 'btnSearch_click'
                                    }
                                },
                                {xtype: 'tbspacer', width: 700},
                                {
                                    xtype: 'label',
                                    html: 'Three Columns View',
                                    id: prototype.id + '-chkMonth_label',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkONE',
                                    margin: '0 5 0 5',
                                    labelStyle: 'color:#378BCC;font-weight:bold;',
                                    width: 140,
                                    boxLabel: '',
                                    inputValue: '1',
                                    listeners: {
                                        change: 'ChangechkONE'
                                    }
                                },
                            ]
                        },
                        // Filtros Country Agent
                        {
                            xtype: 'panel',
                            margin: '0 0 5 0',
                            border: false,
                            id: prototype.id + '-radioButton',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                pack: 'left'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-rbgType',
                                    fieldLabel: '',
                                    horizontal: true,
                                    items: [
                                        {boxLabel: '<strong >Country</strong>', name: 'rbgType', inputValue: '1', width: 100, checked: true},
                                        {boxLabel: '<strong >Agent</strong>', name: 'rbgType', inputValue: '2', width: 100}
                                    ],
                                    listeners: {
                                        change: 'DD_BYAGENT_colHandler',
                                        args: ['XXX']
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataIataValuesOutOfRange',
                            width: '100%',
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxAB_Pais_ONE',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridMainDataByValues',
                                            padding: '5px 0px 0px 0px',
                                            width: 784,
                                            height: 528,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center', columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strCountryName', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'FMETHOD', width: 60
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'TDOC', width: 70
                                                    },
                                                    {
                                                        text: 'USD', columns: [
                                                            {
                                                                text: 'Sales', columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Coupons', dataIndex: 'Rej1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.Var1 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#0000e6"
                                                                            : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxAB_Pais',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridControlTotal_Abnormal_CS',
                                            padding: '5px 0px 0px 0px',
                                            width: 554,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales', id: prototype.id + '-titSales_AB',
                                                        columns: [
                                                            {
                                                                text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFecha_AB_Country_S',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.Var1 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                            : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridControlTotal_Abnormal_CR',
                                            padding: '5px 0px 0px 0px',
                                            width: 554,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Refund', id: prototype.id + '-titRefund_AB',
                                                        columns: [
                                                            {
                                                                text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFecha_AB_Country_R',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.Aud1 > data.Avg1) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                            : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridControlTotal_Abnormal_CE',
                                            padding: '5px 0px 0px 0px',
                                            width: 554,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Exchange', id: prototype.id + '-titExchange_AB',
                                                        columns: [
                                                            {
                                                                text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFecha_AB_Country_E',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.Aud1 > data.Avg1) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                            : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxAB_Agent',
                                    hidden: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
//                                            id: prototype.id + '-BoxAB_Agent',
//                                            hidden: true,
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-grid_BoxSale',
                                                    padding: '5px 0px 0px 0px',
                                                    width: 479,
                                                    height: 546,
                                                    columnLines: true,
                                                    /*features: [{
                                                     ftype: 'summary'
                                                     }],*/
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Agent', dataIndex: 'AIRLINE', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strFlag + '"';
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '',
                                                                xtype: 'actioncolumn',
                                                                width: 25,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        icon: 'resources/img/botones/FalseChart.png',
                                                                        tooltip: 'SALE',
                                                                        handler: 'ViewAgent'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Sales', id: prototype.id + '-titSales_AB_A',
                                                                columns: [
                                                                    {
                                                                        text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFechaS_AB',
                                                                        listeners: {
                                                                            click: 'onClickViewAgent',
                                                                            args: ['SALE']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<a href="#screens-abnormal-values-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Average', columns: [
                                                                            {
                                                                                text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            (data.Var1 >= 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                            return Ext.util.Format.number(value, '0,000%');
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-grid_BoxRefund',
                                                    padding: '5px 0px 0px 0px',
                                                    width: 479,
                                                    height: 546,
                                                    columnLines: true,
                                                    /*features: [{
                                                     ftype: 'summary'
                                                     }],*/
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Agent', dataIndex: 'AIRLINE', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strFlag + '"';
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '',
                                                                xtype: 'actioncolumn',
                                                                width: 25,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        icon: 'resources/img/botones/FalseChart.png',
                                                                        tooltip: 'RFND',
                                                                        handler: 'ViewAgent'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Refund', id: prototype.id + '-titRefund_AB_A',
                                                                columns: [
                                                                    {
                                                                        text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFechaR_AB',
                                                                        listeners: {
                                                                            click: 'onClickViewAgent',
                                                                            args: ['RFND']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<a href="#screens-abnormal-values-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Average', columns: [
                                                                            {
                                                                                text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            (data.Var1 >= 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                            return Ext.util.Format.number(value, '0,000%');
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-grid_BoxExchange',
                                                    padding: '5px 0px 0px 0px',
                                                    width: 479,
                                                    height: 546,
                                                    columnLines: true,
                                                    /*features: [{
                                                     ftype: 'summary'
                                                     }],*/
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Agent', dataIndex: 'AIRLINE', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strFlag + '"';
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: '',
                                                                xtype: 'actioncolumn',
                                                                width: 25,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        icon: 'resources/img/botones/FalseChart.png',
                                                                        tooltip: 'EXCH',
                                                                        handler: 'ViewAgent'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Exchange', id: prototype.id + '-titExchange_AB_A',
                                                                columns: [
                                                                    {
                                                                        text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFechaE_AB',
                                                                        listeners: {
                                                                            click: 'onClickViewAgent',
                                                                            args: ['EXCH']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<a href="#screens-abnormal-values-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Average', columns: [
                                                                            {
                                                                                text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            (data.Var1 >= 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                                            return Ext.util.Format.number(value, '0,000%');
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        // Filtros Select By
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            margin: '15 0 5 0',
                                            id: prototype.id + '-panel_titulo',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                //                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    html: '<strong style="color:#000;"> </strong>',
                                                    align: 'center',
                                                    id: prototype.id + '-lb_barras',
                                                    fieldStyle: 'text-align:center;',
                                                    padding: '8px 7px 8px 0px'
                                                }
                                            ]
                                        },
                                        
                                        // GRAFICO BARRAS
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelGraficos',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 0 0 10',
                                            hidden: true,
                                            width: 1110,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-displaySAChart14',
                                                    width: 1100,
                                                    border: false,
                                                    height: 380,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#E3EAEF'
                                                    },
                                                    axes: [
                                                        {
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            //title: 'Millions of USD',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    if ((value / 1000).toString().length > 3) {
                                                                        return  '$' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                                    } else {
                                                                        return  '$' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                                    }
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, 
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
                                                                text: 'Sales Date',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [
                                                        {
                                                            type: 'bar3d',
                                                            stacked: false,
//                                                        title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)'],
                                                            xField: 'strFormatDate',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#339933', '#DBA901', '#70DB70', '#FF9966'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1200
                                                            },
                                                            label: {
                                                                field: ['AMOUNT'],
//                                                            display: 'insideEnd',
                                                                display: 'outside',
                                                                calloutLine: {
                                                                    length: 10,
                                                                    width: 0,
                                                                color: '#FFFFFF',
                                                                },
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutVertical = false;
//                                                                    if (value === 100) {
                                                                        return '$' + Ext.util.Format.number(value, '0,000');
//                                                                    } else {
//                                                                        return Ext.util.Format.number(value, '0,000.00');
//                                                                    }
                                                                }
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
//                                                                var label = '';
//                                                                if (ctx.field === 'CUPONS_ARC') {
//                                                                    label = 'ARC';
//                                                                } else if (ctx.field === 'CUPONS_ASR') {
//                                                                    label = 'ASR';
//                                                                } else if (ctx.field === 'CUPONS_MEX') {
//                                                                    label = 'BSP(Mexico)';
//                                                                } else if (ctx.field === 'CUPONS_OTHER') {
//                                                                    label = 'BSP(Others)';
//                                                                }
//                                                                    toolTip.setHtml(record.get('strFormatDate') + ' : ' + record.get('AMOUNT'));
                                                                    toolTip.setHtml(record.get('strFormatDate') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            },
//                                                            renderer: 'onColumnRender'
                                                        },
                                                        {
                                                            type: 'line',
                                                            xField: 'strFormatDate',
                                                            yField: 'AVG',
                                                            title: 'Average',
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strFormatDate') + ' : ' + Ext.util.Format.number(record.get('totAud1'), '0,000'));
                                                                }
                                                            },
                                                            style: {
                                                                smooth: true,
                                                                fill: '#fcfcfc',    // punto
//                                                                stroke: '#33bdda',
                                                                stroke: 'blue',
                                                                fillOpacity: 0.1,
                                                                miterLimit: 3,
                                                                lineCap: 'miter',
                                                                lineWidth: 2
                                                            },
                                                            marker: {
                                                                type: 'circle',
                                                                radius: 4,
                                                                lineWidth: 2,
//                                                                stroke: "#33bdda",
                                                                stroke: "blue",
                                                                fill: 'white'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxTKT_CT',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridQuickTkt_CT',
                                            padding: '5px 0px 0px 0px',
                                            width: 1074,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: '', id: prototype.id + '-titTKT_Tran',
                                                        columns: [
                                                            {
                                                                text: 'Ticket Number', dataIndex: 'strDescripcion', align: 'center', width: 120,
                                                                listeners: {
                                                                    click: 'gridData_VIEWTKT_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return '<a href="#screens-abnormal-values-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Seq', dataIndex: 'A720SEQ', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'City', dataIndex: 'A720CIUVTA', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Coupon 1', columns: [
                                                                    {
                                                                        text: 'Sector', dataIndex: 'strDescripcion1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'A720VALOR1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#99ccff";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Coupon 2', columns: [
                                                                    {
                                                                        text: 'Sector', dataIndex: 'strDescripcion2', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'A720VALOR2', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#99ccff";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Coupon 3', columns: [
                                                                    {
                                                                        text: 'Sector', dataIndex: 'strDescripcion3', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'A720VALOR3', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#99ccff";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Coupon 4', columns: [
                                                                    {
                                                                        text: 'Sector', dataIndex: 'strDescripcion4', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'A720VALOR4', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#99ccff";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                    ]
                                }
                            ]
                        },
                        // Opcion Average Control
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataIataAverageControl',
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
                                            id: prototype.id + '-gridTotal_AG',
                                            padding: '5px 0px 0px 0px',
                                            width: 954,
                                            height: 528,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Agent', align: 'center', columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'strFormatDate1', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 300,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'COMENT1', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Ctr', dataIndex: 'strFormatDate', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha6_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej6', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#99ccff;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud6', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#99ccff;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average', columns: [
                                                            {
                                                                text: '5 months', dataIndex: 'Rate2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Rate3', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.Rate3 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                            return Ext.util.Format.number(value, '0,000.00%');
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridTotal_AG_2',
                                            padding: '5px 0px 0px 0px',
                                            width: 784,
                                            height: 528,
                                            hidden: true,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Agent', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha6_AG_2',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej6', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#99ccff;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud6', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#99ccff;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average', columns: [
                                                            {
                                                                text: '5 months', dataIndex: 'Rate2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Rate3', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.Rate3 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                            return Ext.util.Format.number(value, '0,000.00%');
                                                        }
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha1_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej1', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud1', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha2_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha3_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej3', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud3', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha4_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej4', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud4', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha5_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej5', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud5', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
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
                            xtype: 'panel',
                            id: prototype.id + '-BoxControlTotal',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridControlTotal',
                                    padding: '5px 0px 0px 0px',
                                    width: 1504,
                                    height: 528,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Transaction', dataIndex: 'AIRLINE', width: 80
                                            },
                                            {
                                                text: '',
                                                id: prototype.id + '-titFecha1_CT',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'Rej1', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud1', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '',
                                                id: prototype.id + '-titFecha2_CT',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'Rej2', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud2', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '',
                                                id: prototype.id + '-titFecha3_CT',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'Rej3', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud3', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '',
                                                id: prototype.id + '-titFecha4_CT',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'Rej4', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud4', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '',
                                                id: prototype.id + '-titFecha5_CT',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'Rej5', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud5', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '',
                                                id: prototype.id + '-titFecha6_CT',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'Rej6', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#99ccff;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud6', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#99ccff;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '%', dataIndex: 'dblPerRev', align: 'center', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000%');
                                                }
                                            },
                                            {
                                                text: 'Average', columns: [
                                                    {
                                                        text: '5 months', dataIndex: 'Rate2', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Differences', dataIndex: 'Rate1', align: 'center', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Variation', dataIndex: 'Rate3', align: 'center', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.Rate3 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#ff0000"
                                                            : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                    return Ext.util.Format.number(value, '0,000.00%');
                                                }
                                            }
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