/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.EstimationReverseProcessForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
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
                width: 1100,
                height: 650,
                align: 'center'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tabMain',
                    width: 1100,
                    height: 600,
                    anchor: '100%',
                    margin: '10 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;',
                            id: prototype.id + '-tabStatistics',
                            height: 200,
                            title: '<b style="font-size:13px">Processing</b>',
                            layout: {
                                type: 'hbox',
                                align: 'left'
                            },
                            margin: '10 10 10 10',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E3EAF9',
                                    border: true,
                                    width: 1100,
                                    height: 150,
                                    layout: {
                                        type: 'box',
                                        align: 'center'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        margin: '30 0 0 20'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#231223;font-weight:bold',
                                            align: 'center',
                                            text: 'Search By',
                                            margin: '33 0 0 20'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cbxAirline',
                                            fieldLabel: 'Airline Stock',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 80,
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
                                            id: prototype.id + '-cbxCarrier',
                                            fieldLabel: 'Carrier',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 60,
                                            width: 160,
                                            anchor: '100%',
                                            listeners: {
                                                focus: function(combo) {
                                                   // combo.expand();
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Y/m/d',
                                            fieldLabel: 'Valuation Date ',
                                            anchor: '100%',
                                            id: prototype.id + '-txtDate',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 190,
                                            labelWidth: 90
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cbxType',
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
                                            labelWidth: 40,
                                            width: 140,
                                            anchor: '100%',
                                            listeners: {
                                                focus: function(combo) {
                                                    //combo.expand();
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnOutFile',
                                            text: '<strong>Start Process<strong>',
                                            tooltip: 'Process',
                                            width: 100,
                                            height: 25
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-tabControlFigures',
                            title: '<b style="font-size:13px">Result Processing</b>',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E3EAF9',
                                    border: true,
                                    width: 1100,
                                    height: 50,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnDownloadFiles',
                                            text: '<strong>Dowload Files<strong>',
                                            margin: '10 30 10 10',
                                            tooltip: 'Process',
                                            width: 100,
                                            height: 30
                                        }

                                    ]
                                },
                                // --------------------------   GRID DATA --------------
                                //------------------------------------------------------
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background: transparent',
                                    height: 400,
                                    width: 612,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Nbr', width: 60, dataIndex: 'RN',enableTextSelection :true},
                                            {text: 'Valuation Date ', width: 120, dataIndex: 'FPROC'},
                                            {text: 'Airline ', width: 100, dataIndex: 'AIRLIN'},
                                            {text: 'Carrier ', width: 100, dataIndex: 'CARRIER'},
                                            {text: 'CIA ', width: 60, dataIndex: 'CUENTA'},
                                            {text: 'GL ', width: 100, dataIndex: 'POLIZA_GL'},
                                            {xtype: 'checkcolumn',
                                                text: 'Dowload', width: 70, dataIndex: 'CADENA', disabled: true
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
}
);

