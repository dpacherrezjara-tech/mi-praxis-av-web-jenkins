/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryNumberingOracle', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryNumberingOracle',
    controller: 'DataEntryNumberingOracleController',
    requires: [
        'Ext.Praxis.controller.salesaudit.OracleReportForm.DataEntryNumberingOracleController'
    ],
    title: 'ENUMERATE ADMs / ACMs PROCESS',
    header: true,
    width: 700,
    height: 430,
    id: prototype.idDataEntryNumberingOracle + '-winDataEntryNumberingOracle',
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idDataEntryNumberingOracle + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Processing Date</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryNumberingOracle + '-txtDATE',
                                            fieldLabel: 'Date',
                                            labelWidth: 30,
                                            width: 130,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryNumberingOracle + '-txtOriginDes',
                                            fieldLabel: 'Origin',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            labelWidth: 40,
                                            width: 200,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryNumberingOracle + '-txtAreaDes',
                                            fieldLabel: 'Area',
                                            labelWidth: 30,
                                            width: 150,
                                            readOnly: true
                                        },
                                        {xtype: 'textfield',id: prototype.idDataEntryNumberingOracle + '-txtAREA', hidden: true},
                                        {xtype: 'textfield',id: prototype.idDataEntryNumberingOracle + '-txtOrigen', hidden: true},
                                        {xtype: 'textfield',id: prototype.idDataEntryNumberingOracle + '-txtType', hidden: true}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryNumberingOracle + '-txtcountry',
                                            fieldLabel: 'Country',
                                            labelWidth: 50,
                                            width: 110,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryNumberingOracle + '-txtFTE',
                                            fieldLabel: 'Source',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 110,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.idDataEntryNumberingOracle + '-gridDataEntry',
                                            width: 690,
                                            height: 330,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'System<br>Date', dataIndex: 'FPROC', width: 70},
                                                    {text: 'Source', dataIndex: 'FUENT', width: 60},
                                                    {text: 'Country', dataIndex: 'PAIS', width: 150},
                                                    {text: 'Area', dataIndex: 'AREADES', width: 100},
                                                    {text: 'Origin', dataIndex: 'BASEDES', width: 100},
                                                    {text: 'Type', dataIndex: 'TYPEDES', width: 100},

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



                                                    //

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
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Processed',
                    id: prototype.idDataEntryNumberingOracle + '-btn-save',
                    icon: 'resources/img/botones/process_load.png', //process_load
                    //hidden: true,
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.idDataEntryNumberingOracle + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});