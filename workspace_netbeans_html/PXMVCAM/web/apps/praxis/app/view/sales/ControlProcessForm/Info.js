/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ControlProcessForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 980,
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
//                    margin: '10 0 0 0',
//                    hide:true
//                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 530,
                    width: 980,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'Date', width: 100, dataIndex: 'VL_DATE_PROC_00'},
                            {text: 'Received', width: 80, dataIndex: 'VL_RECEIVED',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Total', width: 80, dataIndex: 'VL_RECEIVED_TOT',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Processing Group',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Posted', width: 90, dataIndex: 'VL_GROUP_ACOUNT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;background:#d5f4d5;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Total', width: 90, dataIndex: 'VL_GROUP_ACOUNT_TOT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Not Posted', width: 90, dataIndex: 'VL_GROUP_NOT_ACOUNT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;background:#d5f4d5;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Total', width: 90, dataIndex: 'VL_GROUP_NOT_ACOUNT_TOT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'Pending Group',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Assigned', width: 90, dataIndex: 'VL_GROUP_ASIG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;background:#d5f4d5;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Total', width: 90, dataIndex: 'VL_GROUP_ASIG_TOT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Not Assigned', width: 90, dataIndex: 'VL_GROUP_NOT_ASIG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return '<a href="#sales-control-process-form" style="color:#008FE3;">' + value + '</a>';
                                        },
                                        listeners:{
                                            click:'onDetailNotAssigned'
                                        }
                                    },
                                    {text: 'Total', width: 90, dataIndex: 'VL_GROUP_NOT_ASIG_TOT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
                ,
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden:true,
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
                            width: 980,
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

