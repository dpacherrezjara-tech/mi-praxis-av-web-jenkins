/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ProcessingCommissionsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAF9;',
    border: false,
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
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
                //width: 1200,
                height: 80,
                align: 'center'
            },
            items: [
//                {
//                    xtype: 'tabpanel',
//                    id: prototype.id + '-tabMain',
//                    width: 1100,
//                    height: 600,
//                    anchor: '100%',
//                    margin: '10 1 1 1',
//                    autoScroll: true,
//                    bodyStyle: 'background: transparent;',
//                    items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;',
                    id: prototype.id + '-tabStatistics',
                    height: 80,
                    //  title: '<b style="font-size:13px">Processing</b>',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    margin: '0 10 5 1',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #E3EAF9',
                            border: false,
                            width: 1300,
                            height: 80,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                labelAlign: 'left',
                                margin: '30 2 0 10'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    style: 'color:#231223;font-weight:bold',
                                    align: 'center',
                                    text: 'Search By',
                                    margin: '20 2 0 5'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxType',
                                    fieldLabel: 'Type',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 50,
                                    width: 150,
                                    anchor: '100%',
                                    listeners: {
                                        focus: function(combo) {
                                            //combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxInvoice',
                                    fieldLabel: 'Invoice',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 50,
                                    width: 150,
                                    anchor: '100%',
                                    listeners: {
                                        focus: function(combo) {
                                            // combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxPeriodicity',
                                    fieldLabel: 'Periodicity type',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 100,
                                    width: 200,
                                    anchor: '100%',
                                    listeners: {
                                        focus: function(combo) {
                                            //combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxPerio',
                                    fieldLabel: 'Type',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 50,
                                    width: 150,
                                    anchor: '100%',
                                    listeners: {
                                        focus: function(combo) {
                                            //combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnProccess',
                                    text: '<strong>Start Process<strong>',
                                    tooltip: 'Process',
                                    width: 100,
                                    height: 25
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxZona',
                                    fieldLabel: 'Zone',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'A1769VALOR',
                                    displayField: 'A1769DESC',
                                    emptyText: 'Select',
                                    labelWidth: 40,
                                    width: 180,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'panel',
                                    id:prototype.id+'-panelBtn',
                                    bodyStyle: 'background: #E3EAF9',
                                    border: false,
                                    width: 250,
                                    margin: '0 5 0 5',
                                    padding: '0 10 0 10',
                                    height: 60,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        margin: '3 7 3 7'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnDownloadFile',
                                            text: '<strong>File 1<strong>',
                                            tooltip: 'Process',
                                            width: 220,
                                            height: 25
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnDownloadFile2',
                                            text: '<strong>File 2<strong>',
                                            tooltip: 'Process',
                                            width: 220,
                                            height: 25
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                }
//                        {
//                            xtype: 'panel',
//                            bodyStyle: 'background: transparent',
//                            id: prototype.id + '-tabControlFigures',
//                            title: '<b style="font-size:13px">Result Processing</b>',
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            margin: '10 10 10 10',
//                            defaults: {
//                                labelAlign: 'left'
//                            },
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    bodyStyle: 'background: #E3EAF9',
//                                    border: true,
//                                    width: 1100,
//                                    height: 50,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'end'
//                                    },
//                                    defaults: {
//                                        labelStyle: 'font-weight:bold;',
//                                        fieldStyle: 'text-align: center;',
//                                        anchor: '100%'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'button',
//                                            id: prototype.id + '-btnDownloadFiles',
//                                            text: '<strong>Dowload Files<strong>',
//                                            margin: '10 30 10 10',
//                                            tooltip: 'Process',
//                                            width: 100,
//                                            height: 30
//                                        }
//
//                                    ]
//                                },
//                                // --------------------------   GRID DATA --------------
//                                //------------------------------------------------------
//                                {
//                                    xtype: 'grid',
//                                    padding: '20 0 0 0',
//                                    id: prototype.id + '-gridData',
//                                    bodyStyle: 'background: transparent',
//                                    height: 400,
//                                    width: 612,
//                                    columnLines: true,
//                                    columns: {
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: true,
//                                            align: 'center'
//                                        },
//                                        items: [
//                                            {text: 'Nbr', width: 60, dataIndex: 'RN',enableTextSelection :true},
//                                            {text: 'Valuation Date ', width: 120, dataIndex: 'FPROC'},
//                                            {text: 'Airline ', width: 100, dataIndex: 'AIRLIN'},
//                                            {text: 'Carrier ', width: 100, dataIndex: 'CARRIER'},
//                                            {text: 'CIA ', width: 60, dataIndex: 'CUENTA'},
//                                            {text: 'GL ', width: 100, dataIndex: 'POLIZA_GL'},
//                                            {xtype: 'checkcolumn',
//                                                text: 'Dowload', width: 70, dataIndex: 'CADENA', disabled: true
//                                            }
//                                        ]
//                                    }
//                                }
//
//                            ]
//                        }
//                    ]
//                }
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

