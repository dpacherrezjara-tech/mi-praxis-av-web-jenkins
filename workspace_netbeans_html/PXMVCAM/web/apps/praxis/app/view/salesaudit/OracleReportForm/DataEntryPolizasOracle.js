/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.    DataEntryPolizasOracle    DataEntryPolizasOracleController
 */

/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracle', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPolizasOracle',

    controller: 'DataEntryPolizasOracleController',

    requires: [
        'Ext.Praxis.controller.salesaudit.OracleReportForm.DataEntryPolizasOracleController'
    ],
    id: prototype.idDataEntryPolizasOracle + '-win',

    title: 'PROCESSED ORACLE',
    header: true,
    height: 430,
    width: 430,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idDataEntryPolizasOracle + '-form',
            defaults: {
                style: 'margin: 5px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [

                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryPolizasOracle + '-txtcountry',
                            fieldLabel: 'Country',
                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                            maxLength: 2,
                            enforceMaxLength: 2,
                            labelWidth: 50,
                            width: 110,
                            listeners: {
                                specialkey: 'onSearchkey',
                                change: 'onchange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryPolizasOracle + '-txtProcDate',
                            fieldLabel: 'Date',
                            labelWidth: 30,
                            width: 130,
                            readOnly: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDataEntryPolizasOracle + '-ComboType',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 120,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 150
                            },
                            listeners: {
                                afterrender: 'onCmbSourceAfterRender'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDataEntryPolizasOracle + '-gridDataPoliza',
                            width: 400,
                            height: 320,
                            columnLines: true,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {
                                    }
                                }

                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [

                                    {text: 'Source', dataIndex: 'FUENT', width: 80},
                                    {text: 'Area', dataIndex: 'AREADES', width: 80},
                                    {text: 'Processing <br> Date', dataIndex: 'FPROC', width: 100},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: '',
                                        width: 40,
                                        align: 'center',
                                        items: [
                                            {
                                                icon: 'resources/img/botones/check.png',
                                                tooltip: 'Select',
                                                handler: 'onSelectClick'
                                            }
                                        ]
                                    }

                                ], listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                }

            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Processed',
                    id: prototype.idDataEntryPolizasOracle + '-btn-save',
                    icon: 'resources/img/botones/process_load.png',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDataEntryPolizasOracle + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});
