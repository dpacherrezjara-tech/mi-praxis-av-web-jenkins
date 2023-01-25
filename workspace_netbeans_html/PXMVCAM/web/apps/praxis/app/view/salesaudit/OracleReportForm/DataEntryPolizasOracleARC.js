/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor. DataEntryPolizasOracleARC  DataEntryPolizasOracleARCController
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracleARC', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPolizasOracleARC',

    controller: 'DataEntryPolizasOracleARCController',

    requires: [
        'Ext.Praxis.controller.salesaudit.OracleReportForm.DataEntryPolizasOracleARCController'
    ],
    id: prototype.idDataEntryPolizasOracleARC + '-win',

    title: 'PROCESSED ORACLE ARC',
    header: true,
    height: 430,
    width: 650,
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
            id: prototype.idDataEntryPolizasOracleARC + '-form',
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
                            id: prototype.idDataEntryPolizasOracleARC + '-txtcountry',
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
                            id: prototype.idDataEntryPolizasOracleARC + '-txtProcDate',
                            fieldLabel: 'Date',
                            labelWidth: 30,
                            width: 140,
                            readOnly: true
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDataEntryPolizasOracleARC + '-gridDataPolizaArc',
                            width: 620,
                            height: 480,
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
                                    {text: 'Origin', dataIndex: 'BASEDES', width: 80},
                                    {text: 'Area', dataIndex: 'AREADES', width: 80},
                                    {text: 'Type', dataIndex: 'TYPEDES', width: 80},
                                    {text: 'Processing <br> Date', dataIndex: 'FPROC', width: 100},
                                    {text: 'Country', dataIndex: 'PAIS', width: 80},
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
                                ]
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
                    id: prototype.idDataEntryPolizasOracleARC + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDataEntryPolizasOracleARC + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});



