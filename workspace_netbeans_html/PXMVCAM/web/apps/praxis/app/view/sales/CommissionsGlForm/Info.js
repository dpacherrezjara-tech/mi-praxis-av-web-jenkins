/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.CommissionsGlForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAF9;', /*#E3EAEF*/
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1360,
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
//                {
//                    xtype: 'label',
//                    id: prototype.id + '-labelTitle',
//                    labelAlign: 'center',
//                    labelStyle: 'color:#231223',
//                    align: 'center',
//                    margin: '10 0 0 0'
//                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 510,
                    width: 1360,
                    columnLines: true,
                    resizable: false,
                    //border:true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return value;
                                }
                            },
                            {text: 'Proccess  Date', width: 120, dataIndex: 'A1879FECHA'},
                            {text: 'Description', width: 210, dataIndex: 'A1879DESCR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:2px;';
                                    return value;
                                }
                            },
                            {text: 'Accounting Period', width: 130, dataIndex: 'A1879PERIO'},
                            {text: 'Batch', flex: 1,/*width: 300,*/ dataIndex: 'A1879LOTE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:left; margin-right:0px;';
                                    return '<a href="#sales-commissions-gl-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetail'
                                }
                            },
                            {text: 'Currency', width: 100, dataIndex: 'A1879MONED'},
                            {text: 'Debit', width: 100, dataIndex: 'A1879CARGO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Credit', width: 100, dataIndex: 'A1879ABONO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            }

                        ]
                    }
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDetail',
                    border: false,
                    style: '',
                    layout: 'vbox',
                    bodyStyle: 'background:#E3EAF9',
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            style: '',
                            layout: 'hbox',
                            bodyStyle: 'background:#E3EAF9',
                            items: [
                                {xtype: 'tbspacer', width: 400},
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;text-decoration:underline">Conversion</strong>',
                                    width: 200,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;text-decoration:underline">Reversion</strong>',
                                    width: 200,
                                    padding: '1px 5px 0px 10px'

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            style: '',
                            layout: 'hbox',
                            bodyStyle: 'background:#E3EAF9',
                            defaults: {
                                margin: '5 1 5 1'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_description',
                                    readOnly: true,
                                    fieldLabel: '<b>Description</b>',
                                    width: 390,
                                    labelWidth: 90,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_currency',
                                    readOnly: true,
                                    fieldLabel: '<b>Currency</b>',
                                    width: 180,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_rev_date',
                                    readOnly: true,
                                    fieldLabel: '<b>Date</b>',
                                    width: 190,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            style: '',
                            layout: 'hbox',
                            bodyStyle: 'background:#E3EAF9',
                            defaults: {
                                margin: '5 1 5 1'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_major',
                                    readOnly: true,
                                    fieldLabel: '<b>Major</b>',
                                    width: 190,
                                    labelWidth: 90,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_category',
                                    readOnly: true,
                                    fieldLabel: '<b>Category</b>',
                                    width: 185,
                                    labelWidth: 85,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_conv_date',
                                    readOnly: true,
                                    fieldLabel: '<b>Date</b>',
                                    width: 180,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_rev_period',
                                    readOnly: true,
                                    fieldLabel: '<b>Period</b>',
                                    width: 190,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            style: '',
                            layout: 'hbox',
                            bodyStyle: 'background:#E3EAF9',
                            defaults: {
                                margin: '5 1 5 1'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_period',
                                    readOnly: true,
                                    fieldLabel: '<b>Period</b>',
                                    width: 190,
                                    labelWidth: 90,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_as_of_date',
                                    readOnly: true,
                                    fieldLabel: '<b>As of Date</b>',
                                    width: 185,
                                    labelWidth: 85,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_conv_type',
                                    readOnly: true,
                                    fieldLabel: '<b>Type</b>',
                                    width: 180,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_rev_method',
                                    readOnly: true,
                                    fieldLabel: '<b>Method</b>',
                                    width: 190,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            style: '',
                            layout: 'hbox',
                            bodyStyle: 'background:#E3EAF9',
                            defaults: {
                                margin: '5 1 5 1'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_total_debit',
                                    readOnly: true,
                                    fieldLabel: '<b>Debit Entry</b>',
                                    width: 190,
                                    labelWidth: 90,
                                    fieldStyle: 'text-align:right',
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_total_credit',
                                    readOnly: true,
                                    fieldLabel: '<b>Credit Entry</b>',
                                    fieldStyle: 'text-align:right',
                                    width: 185,
                                    labelWidth: 85,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_conv_TC',
                                    readOnly: true,
                                    fieldLabel: '<b>TC</b>',
                                    fieldStyle: 'text-align:right',
                                    width: 180,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt_rev_status',
                                    readOnly: true,
                                    fieldLabel: '<b>Status</b>',
                                    width: 190,
                                    labelWidth: 80,
                                    labelAlign: 'left'
                                }
                            ]
                        }
                    ]
                },
                // --------------------------   GRID DATA DETAIL ------------------
                {
                    xtype: 'grid',
                    padding: '20 0 5 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 370,
                    width: 800,
                    border:true,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Name', width: 100, dataIndex: 'A1879TITU',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Account', flex: 1, /*width: 250,*/ dataIndex: 'A1879NCTA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:left; margin-right:0px;';
                                    return '<a href="#sales-commissions-gl-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetail2'
                                }
                            },
                            {text: 'Currency', width: 90, dataIndex: 'A1879MONED'},
                            {text: 'Debit', width: 120, dataIndex: 'A1879CARGO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Credit', width: 120, dataIndex: 'A1879ABONO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            }
                        ]
                    }
                },
                // --------------------------   GRID DATA DETAIL  2 ------------------
                {
                    xtype: 'grid',
                    padding: '20 0 5 0',
                    id: prototype.id + '-gridDataDetail2',
                    height: 370,
                    width: 800,/*width: 684,*/
                    border:true,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Country', width: 120, dataIndex: 'A1878PAIS',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Zone', width: 100, dataIndex: 'A1878ZONA'},
                            {text: 'Num Fact', flex: 1, /*width: 100,*/ dataIndex: 'A1878NFACT'},
                            {text: 'Fact Date', flex: 1, /*width: 100,*/ dataIndex: 'A1878FFACT',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Debit', width: 100, dataIndex: 'A1878ACTIV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Credit', width: 100, dataIndex: 'A1878PASIV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            }
                        ]
                    }
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-footer',
                            width: 1360,
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
}
);

