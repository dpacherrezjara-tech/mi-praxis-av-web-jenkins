/*
 * Desarrollado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.SpdrspcrQuery.DetailSpdrspcrQuery', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailSpdrspcrQuery',
    controller: 'DetailSpdrspcrQueryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SpdrspcrQuery.DetailSpdrspcrQueryController'
    ],
    id: prototype.id01 + '-win',
    title: 'SPDR/SPCR PER REPORTING PERIOD',
    header: true,
    height: 400,
    width: 850,
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
            id: prototype.id01 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNumber',
                            fieldLabel: 'Memo number',
                            labelWidth: 85,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtIssuedate',
                            fieldLabel: 'Issue date',
                            labelWidth: 60,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCOUNTRY',
                            fieldLabel: 'Country',
                            labelWidth: 50,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtBillingPeriod',
                            fieldLabel: 'Billing Period',
                            labelWidth: 80,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        }
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNRerela',
                            fieldLabel: 'Memo Rela.',
                            labelWidth: 85,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCur',
                            fieldLabel: 'Currency',
                            labelWidth: 60,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtType',
                            fieldLabel: 'Type',
                            labelWidth: 50,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTrncu',
                            fieldLabel: 'TRNCU',
                            labelWidth: 60,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 3, border: false
                        }
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAgencia',
                            fieldLabel: 'Agency',
                            labelWidth: 85,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtIata',
                            fieldLabel: 'IATA',
                            labelWidth: 60,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txaReason',
                            fieldLabel: 'Reason',
                            labelWidth: 80,
                            grow: true,
                            readOnly: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout:{
                        type: 'table',
                        columns: 6
                    },
                    defaults:{
                        labelWidth: 120,
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important',
                        fieldStyle: 'font-weight: bold; color: blue; text-align: right;'
                    },
                    items:[
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'ADM/ACM Calculation',
                            id: prototype.id01 + '-ADM/ACM',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Airline Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Agent Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Difference',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'FARE',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREADM',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'panel',
                            title: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'TAX',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxADM',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Commission',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionADM',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'TAX on CM',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPADM',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'TOTAL',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTOADM',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTOAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTOAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            defaults:{
                                labelSeparator: '',
                                style: 'margin:0px !important',
                                fieldStyle: 'font-weight: bold; color: blue; text-align: right;'
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtTODIFE',
                                    fieldLabel: '',
                                    readOnly: true,
                                    value: '0.00'
                                }
                            ]
                        },
                        /*,*/
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
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
                    text: 'Close',
                    id: prototype.id01 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});





