/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.ADJAccountingForm.DataEntryNew', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryNew',
    controller: 'DataEntryNewADJAccountingController',
    requires: [
        'Ext.Praxis.controller.sales.ADJAccounting.DataEntryNewADJAccountingController',
        'Ext.Praxis.view.sales.ADJAccountingForm.DataAddEntryNew'
    ],
    id: prototype.idadjnew + '-win',
    title: 'Accounting adjustments',
    header: true,
    height: 818,
    width: 1210,
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
            id: prototype.idadjnew + '-form',
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
                            xtype: 'combo',
                            fieldLabel: 'Type Of Adj',
                            id: prototype.idadjnew + '-search-byedt',
                            labelAlign: 'left',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 75,
                            labelClsExtra: 'prx-label-search',
                            width: 200,
                            editable: false,
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender',
                                change: 'onCmbSearchChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idadjnew + '-CmbTtraxedt1',
                            fieldLabel: 'Tran',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 180,
                            labelWidth: 50,
                            labelAlign: 'right',
                            hidden: true,
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender',
                                change: 'onCmbSearchChangeCmbT1'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idadjnew + '-CmbTtraxedt2',
                            fieldLabel: 'Tran',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 180,
                            labelWidth: 50,
                            labelAlign: 'right',
                            hidden: true,
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender',
                                change: 'onCmbSearchChangeCmbT1'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            width: 50,
                            text: 'Ticket: ',
                            style: 'font-weight:normal',
                            padding: '4px 5px 2px 8px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjnew + '-txtCia',
                            hideLabel: true,
                            width: 35,
                            maskRe: /[0-9]/,
                            maxLength: 2,
                            enforceMaxLength: 2,
                            value: '139'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjnew + '-txtFrmaSerie',
                            hideLabel: true,
                            width: 80,
                            maskRe: /[0-9]/,
                            maxLength: 10,
                            enforceMaxLength: 10,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjnew + '-txtSeq',
                            hideLabel: true,
                            width: 30,
                            value: '',
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            id: prototype.idadjnew + '-txtCpn0',
                            width: 50,
                            text: 'Cupon: ',
                            style: 'font-weight:normal',
                            padding: '4px 5px 2px 8px',
                            hidden: true,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjnew + '-txtCpn',
                            hideLabel: true,
                            width: 30,
                            maskRe: /[0-4]/,
                            maxLength: 1,
                            enforceMaxLength: 1,
                            value: '0',
                            hidden: true,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                            
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.idadjnew + '-de-lblDate',
                            fieldLabel: 'Date',
                            format: 'Y/m/d',
                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                            labelWidth: 45,
                            labelAlign: 'right',
                            width: 150,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'button',
                            id: prototype.idadjnew + '-de-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'onBtnSearch'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.idadjnew + '-de-btnSEQ',
                            iconCls: 'prx-icon-104-ticket',
                            tooltip: 'Find tickets',
                            listeners: {
                                click: 'onBtnFindtickets'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.idadjnew + '-de-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onBtnClear'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            id: prototype.idadjnew + '-co-OriginalData1',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Original Data',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblTtarjeta',
                                    fieldLabel: 'T. Card',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblNtarjeta',
                                    fieldLabel: 'N. Card',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblRfig',
                                    fieldLabel: 'Rfic',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblRfis',
                                    fieldLabel: 'Rfis',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblVRic',
                                    fieldLabel: 'VRic',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblFsale',
                                    fieldLabel: 'F. Sale',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170,
                                    maxLength: 8,
                                    enforceMaxLength: 8
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblIATA',
                                    fieldLabel: 'IAT. Sale',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    enforceMaxLength: 8
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Correct Data',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblTtarjeta',
                                    fieldLabel: 'T. Card',
                                    labelWidth: 55,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblNtarjeta',
                                    fieldLabel: 'N. Card',
                                    labelWidth: 55,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblRfig',
                                    fieldLabel: 'Rfic',
                                    labelWidth: 55,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblRfis',
                                    fieldLabel: 'Rfis',
                                    labelWidth: 55,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblVRic',
                                    fieldLabel: 'VRic',
                                    labelWidth: 55,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblFsale',
                                    fieldLabel: 'F. Sale',
                                    labelWidth: 55,
                                    width: 170,
                                    maxLength: 8,
                                    enforceMaxLength: 8
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblIATA',
                                    fieldLabel: 'IAT. Sale',
                                    labelWidth: 55,
                                    width: 170,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    enforceMaxLength: 8
                                }

                            ]
                        },
                        //2
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            id: prototype.idadjnew + '-co-OriginalData2',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Original Data',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblAmount',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblCurrency',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblCommision',
                                    fieldLabel: 'Commision',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblSCommision',
                                    fieldLabel: 'Over Com',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblYQ',
                                    fieldLabel: 'YQ',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblFBASIS',
                                    fieldLabel: 'F. BASIS',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblCARRIER',
                                    fieldLabel: 'Carrier',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Correct Data Loc',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblAmount',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblCurrency',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblCommision',
                                    fieldLabel: 'Commision',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblSCommision',
                                    fieldLabel: 'Over Com',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblYQ',
                                    fieldLabel: 'YQ',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblFBASIS',
                                    fieldLabel: 'F. BASIS',
                                    labelWidth: 60,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblCARRIER',
                                    fieldLabel: 'Carrier',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                }

                            ]
                        },
                        //3
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            id: prototype.idadjnew + '-co-OriginalData3',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Original Data REV',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblTC',
                                    fieldLabel: 'TC',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblCurrencyREV',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblAmountREV',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblCommisionREV',
                                    fieldLabel: 'Commision',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblSCommisionREV',
                                    fieldLabel: 'Over Com',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-label-lblYQREV',
                                    fieldLabel: 'YQ',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Correct Data Rev',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblTC',
                                    fieldLabel: 'TC',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblCurrencyREV',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblAmountREV',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblCommisionREV',
                                    fieldLabel: 'Commision',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblSCommisionREV',
                                    fieldLabel: 'Over Com',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-label-lblYQREV',
                                    fieldLabel: 'YQ',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'General fields',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblGroup',
                                    fieldLabel: 'Group',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    maskRe: /[0-9]/,
                                    maxLength: 9,
                                    enforceMaxLength: 9
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblTdoc',
                                    fieldLabel: 'T. DOC',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    maskRe: /[0-9]/,
                                    maxLength: 4,
                                    enforceMaxLength: 4
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-de-lblIATATrx',
                                    fieldLabel: 'IATA',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    enforceMaxLength: 8
                                }/*,
                                 {
                                 xtype: 'textfield',
                                 id: prototype.idadjnew + '-de-lblDate',
                                 fieldLabel: 'Date',
                                 labelWidth: 60,
                                 readOnly: true,
                                 width: 170
                                 }*/


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'General fields',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                }, {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-TKTREFE',
                                    fieldLabel: 'TKT Refe',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 13,
                                    enforceMaxLength: 13
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-TKTSEQ',
                                    fieldLabel: 'TKT.Seq',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 13,
                                    enforceMaxLength: 13
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.idadjnew + '-txtAffectTNU',
                                    labelWidth: 70,
                                    labelSeparator: '',
                                    fieldLabel: 'Affect TNU'
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'General fields',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idadjnew + '-de-cmbTYPEUSE',
                                    required: true,
                                    fieldLabel: 'Reason',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    fieldStyle: '',
                                    readOnly: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    hidden: true,
                                    width: 220,
                                    labelWidth: 105,
                                    listConfig: {
                                        minWidth: 300
                                    },
                                    listeners: {
                                        afterrender: 'onCmbSearchAfterRender'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idadjnew + '-de-cmbTYUSEASS',
                                    required: true,
                                    fieldLabel: 'Use Annulment',
                                    fieldStyle: '',
                                    hidden: true,
                                    readOnly: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 220,
                                    labelWidth: 105,
                                    listConfig: {
                                        minWidth: 300
                                    },
                                    listeners: {
                                        afterrender: 'onCmbSearchAfterRender'
                                    }
                                },
                                        /*{
                                         xtype: 'button',
                                         width: 80,
                                         cls: 'x-btn-sent',
                                         overCls: 'x-btn-sent-over',
                                         text: '<span style="color: white; font-weight: bold;">PDI</span>',
                                         listeners: {
                                         click: 'onPDIClick'
                                         }
                                         }*/


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            id: prototype.idadjnew + '-cab-ORIGEN',
                            hidden: true,
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'General fields',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-ORIGEN',
                                    fieldLabel: 'Ori.',
                                    labelWidth: 45,
                                    width: 150,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-DESTINO',
                                    fieldLabel: 'Des.',
                                    labelWidth: 45,
                                    width: 150,
                                    maxLength: 3,
                                    enforceMaxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-FLIGHT',
                                    fieldLabel: 'Flight',
                                    labelWidth: 45,
                                    width: 150,
                                    maxLength: 8,
                                    enforceMaxLength: 8
                                }



                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            hidden: true,
                            id: prototype.idadjnew + '-cab-ORIGEN2',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'General fields',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-lblCARRIER2',
                                    fieldLabel: 'Carrier',
                                    labelWidth: 60,
                                    maxLength: 2,
                                    enforceMaxLength: 2,
                                    width: 170
                                }, {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-AmountLoc',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 170,
                                    value: 0
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-co-AmountRev',
                                    fieldLabel: 'Amount Rv',
                                    labelWidth: 60,
                                    width: 170,
                                    value: 0
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'General fields',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-txtAffectation',
                                    width: 180,
                                    fieldLabel: 'Affec. IATA',
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    enforceMaxLength: 8,
                                    enableKeyEvents: true,
                                    labelWidth: 60,
                                    listeners: {
                                        specialkey: 'onSearchkey'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-country',
                                    fieldLabel: 'Country',
                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                    maxLength: 2,
                                    enforceMaxLength: 2,
                                    labelWidth: 60,
                                    width: 180,
                                    listeners: {
                                        specialkey: 'onSearchkey',
                                        change: 'onchange'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjnew + '-txtCrtBy',
                                    fieldLabel: 'Create By',
                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                    maxLength: 10,
                                    enforceMaxLength: 10,
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 180,
                                    listeners: {
                                        specialkey: 'onSearchkey',
                                        change: 'onchange'
                                    }
                                }


                            ]
                        }

                    ]
                },
                {
                    xtype: 'tabpanel',
                    id: prototype.idadjnew + '-tabMain',
                    width: 1200,
                    height: 400,
                    margin: '1 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: transparent',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.idadjnew + '-boxDataAccounting',
                            title: 'Original Data',
                            layout: 'hbox',
                            //overflowY: 'scroll',
                            resizable: {
                                handles: 's'
                            },
                            defaults: {
                                anchor: '100%',
                                height: '235'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridDataAccounting">
                                {
                                    xtype: 'grid',
                                    id: prototype.idadjnew + '-de-gridOriginalData',
                                    width: 1200,
                                    height: '100%',
                                    autoScroll: true,
                                    columnLines: true,
                                    resizable: {
                                        handles: 's'
                                    },
                                    border: true,
                                    dockedItems: [{
                                            xtype: 'toolbar',
                                            items: [{
                                                    id: prototype.idadjnew + '-gridReverse',
                                                    cls: 'x-btn-sent',
                                                    tooltip: 'Reverse',
                                                    overCls: 'x-btn-sent-over',
                                                    text: '<span style="color: white; font-weight: bold;">Reverse</span>',
                                                    handler: 'onReverseClick'
                                                }, '-']
                                        }],
                                    selModel: {
                                        selType: 'checkboxmodel',
                                        listeners: {
                                            beforeselect: function (grid, record, index, eOpts, metaData) {
                                                if (Ext.String.trim(record.get('A1716MODO')) === '' || Ext.String.trim(record.get('A1716MODO')) === 'TOTAL') {
                                                    return false;
                                                } else {
                                                    return true;
                                                }

                                            }
                                        }

                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'PTE', width: 40, xtype: 'checkcolumn', dataIndex: 'A1716MARCA',
                                                renderer: function (value, meta, record, row, col) {
                                                    var me = this;

                                                    if (record.data.A1716MODO === '' || record.data.A1716MODO === 'TOTAL') {
                                                        meta['tdCls'] = 'x-item-disabled';
                                                    } else {
                                                        meta['tdCls'] = '';
                                                    }
                                                    return new Ext.ux.CheckColumn().renderer(value);
                                                }
                                            }, {
                                                text: 'MODE', dataIndex: 'A1716MODO', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'text-align:right;';

                                                    var rtn = '';
                                                    switch (data.A1716MODO.trim()) {
                                                        case 'S':
                                                            rtn = 'SALE';
                                                            break;
                                                        case 'M':
                                                            rtn = 'MEMO';
                                                            break;
                                                        case 'J':
                                                            rtn = 'EXCH';
                                                            break;
                                                        case 'I':
                                                            rtn = 'TAXC';
                                                            break;
                                                        case 'R':
                                                            rtn = 'RFND';
                                                            break;
                                                        case 'F':
                                                            rtn = 'FLWN';
                                                            break;
                                                        case 'C':
                                                            rtn = 'EXPI';
                                                            break;
                                                        case 'L':
                                                            rtn = 'IPAY';
                                                            break;
                                                        default:
                                                            rtn = data.A1716MODO.trim();
                                                    }

                                                    return rtn;
                                                }
                                            },
                                            {
                                                text: 'SRC', dataIndex: 'A1716FUENT', width: 40
                                            },
                                            {
                                                text: 'SUB<br>SRC', dataIndex: 'A1716SUBFU', width: 40
                                            },
                                            {
                                                text: 'FOP', dataIndex: 'A1716FP', width: 40
                                            },
                                            {
                                                text: 'CPN', dataIndex: 'A1716CUPON', width: 40
                                            },
                                            {
                                                text: 'SEQ', dataIndex: 'A1716SEQ', width: 40
                                            },
                                            {
                                                text: 'ACCOUNTING',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'DATE', dataIndex: 'A1716FPRO', width: 70
                                                    },
                                                    {
                                                        text: 'PERIOD', dataIndex: 'A1716FCONT', width: 70
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'ACCOUNT NUMBER', dataIndex: 'A1716CUENT', /*width: 277*/flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'font-family:"Courier New";';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'LOCAL AMOUNT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'CURR', dataIndex: 'A1716CUR', width: 50
                                                    },
                                                    {
                                                        text: 'DEBIT', dataIndex: 'A1716ACTIV', width: 100, renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                        summaryType: function (records) {
                                                            var total = 0;
                                                            var lenn = records.length;
                                                            for (var j = 0; j < lenn; ++j) {
                                                                if (String(Ext.String.trim(records[j].get('A1716MODO'))) !== '') {
                                                                    total = total + parseFloat(records[j].get('A1716ACTIV'));
                                                                }
                                                            }
                                                            return total.toFixed(2);
                                                        }
                                                    },
                                                    {
                                                        text: 'CREDIT', dataIndex: 'A1716PASIV', width: 100, renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                        summaryType: function (records) {
                                                            var total = 0;
                                                            var lenn = records.length;
                                                            for (var j = 0; j < lenn; ++j) {
                                                                if (String(Ext.String.trim(records[j].get('A1716MODO'))) !== '') {
                                                                    total = total + parseFloat(records[j].get('A1716PASIV'));
                                                                }
                                                            }
                                                            return total.toFixed(2);
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'REVENUE AMOUNT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'CURR', dataIndex: 'A1716CURRV', width: 50
                                                    },
                                                    {
                                                        text: 'DEBIT', dataIndex: 'A1716ACTRV', width: 100, renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                        summaryType: function (records) {
                                                            var total = 0;
                                                            var lenn = records.length;
                                                            for (var j = 0; j < lenn; ++j) {
                                                                if (String(Ext.String.trim(records[j].get('A1716MODO'))) !== '') {
                                                                    total = total + parseFloat(records[j].get('A1716ACTRV'));
                                                                }
                                                            }
                                                            return total.toFixed(2);
                                                        }
                                                    },
                                                    {
                                                        text: 'CREDIT', dataIndex: 'A1716PASRV', width: 100, renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                        summaryType: function (records) {
                                                            var total = 0;
                                                            var lenn = records.length;
                                                            for (var j = 0; j < lenn; ++j) {
                                                                if (String(Ext.String.trim(records[j].get('A1716MODO'))) !== '') {
                                                                    total = total + parseFloat(records[j].get('A1716PASRV'));
                                                                }
                                                            }
                                                            return total.toFixed(2);
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'CONCEPT', dataIndex: 'A1716TITU', width: 245,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'CLIENT', dataIndex: 'A1716COPE', width: 80
                                            },
                                            {
                                                text: 'PROVIDER', dataIndex: 'A1716PROV', width: 80
                                            },
                                            {
                                                text: 'JOURNAL<br>ENTRY', dataIndex: 'A1716IDCON', width: 80
                                            },
                                            {
                                                text: 'EXCHANGE<br>RATE', dataIndex: 'A720ROE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1530TCAMB, '0,000.000000') : '';
                                                    return Ext.util.Format.number(value, '0,000.000000');
                                                }
                                            }
                                        ]
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.idadjnew + '-tabCorrectData',
                            title: 'Correct Data',
                            width: 1200,
                            height: 400,
                            layout: {
                                type: 'vbox',
                                align: 'rigth'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.idadjnew + '-de-gridCorrectData',
                                            columnLines: true,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            plugins: {
                                                cellediting: {
                                                    clicksToEdit: 1
                                                }
                                            },
                                            dockedItems: [{
                                                    xtype: 'toolbar',
                                                    items: [{
                                                            text: 'Add',
                                                            tooltip: 'ADD',
                                                            id: prototype.idadjnew + '-de-btnAdd',
                                                            iconCls: 'prx-icon-add',
                                                            handler: 'onAddataClick'
                                                        }, '-']
                                                }],
                                            autoScroll: true,
                                            columns: {
                                                items: [
                                                    {text: 'Mode', dataIndex: 'A1716MODO', width: 45, renderer: 'onRendererColumnModo'},
                                                    {text: 'SRC', width: 40, dataIndex: 'A1716FUENT', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 3, enforceMaxLength: 3,
                                                                maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                                listeners: {
                                                                    change: 'onchange'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {text: 'SUB <br>SRC', width: 40, dataIndex: 'A1716SUBFU', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 3, enforceMaxLength: 3,
                                                                maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                                listeners: {
                                                                    change: 'onchange'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {text: 'SEQT', width: 40, dataIndex: 'A1716SEQT', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 2, enforceMaxLength: 2,
                                                                maskRe: /[0-9]/
                                                            }
                                                        }
                                                    },
                                                    {text: 'CPN', width: 35, dataIndex: 'A1716CUPON', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                editor: 'numberfield',
                                                                maxLength: 1, enforceMaxLength: 1,
                                                                maskRe: /[0-4]/
                                                            }
                                                        }
                                                    },
                                                    {text: 'FP', width: 35, dataIndex: 'A1716FP', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 2, enforceMaxLength: 2,
                                                                maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                                listeners: {
                                                                    change: 'onchange'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {text: 'C1', width: 30, dataIndex: 'CONP1', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 4, enforceMaxLength: 4,
                                                                listeners: {
                                                                    change: 'onchange'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {text: 'C2', width: 30, dataIndex: 'CONP2', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 4, enforceMaxLength: 4,
                                                                listeners: {
                                                                    change: 'onchange'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {text: 'Account <br> Number', width: 90, dataIndex: 'A1716CUENT', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 36, enforceMaxLength: 36
                                                            }
                                                        }
                                                    },
                                                    {text: 'File', dataIndex: 'A1716FILE', width: 35},
                                                    {text: 'LOCAL ',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'CUR', dataIndex: 'A1716CUR', width: 40},
                                                            {text: 'DEBIT', dataIndex: 'A1716ACTIV', width: 70, align: 'right', editor: 'numberfield',
                                                                renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                                summaryType: function (records) {
                                                                    var total = 0;
                                                                    var lenn = records.length;
                                                                    for (var j = 0; j < lenn; ++j) {
                                                                        if (String(Ext.String.trim(records[j].get('A1716MODO'))) !== '') {
                                                                            total = total + parseFloat(records[j].get('A1716ACTIV'));
                                                                        }
                                                                    }
                                                                    //return Ext.util.Format.number(total, '0,000.00');//total.toFixed(2);
                                                                    return total.toFixed(2);
                                                                    //console.log(records);
                                                                }
                                                            },
                                                            {text: 'CREDIT', dataIndex: 'A1716PASIV', width: 70, align: 'right', editor: 'numberfield',
                                                                renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                                summaryType: function (records) {
                                                                    var total = 0;
                                                                    var lenn = records.length;
                                                                    for (var i = 0; i < lenn; ++i) {
                                                                        if (String(Ext.String.trim(records[i].get('A1716MODO'))) !== '') {
                                                                            total = total + parseFloat(records[i].get('A1716PASIV'));
                                                                        }
                                                                    }
                                                                    //return Ext.util.Format.number(total, '0,000.00');
                                                                    return total.toFixed(2);
                                                                    //console.log(records);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'REVENUE ',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'CUR', dataIndex: 'CUR2', width: 40},
                                                            {text: 'DEBIT', dataIndex: 'ACTIV2', width: 70, align: 'right', editor: 'numberfield',
                                                                renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                                summaryType: function (records) {
                                                                    var total = 0;
                                                                    var lenn = records.length;
                                                                    for (var k = 0; k < lenn; ++k) {
                                                                        if (String(Ext.String.trim(records[k].get('A1716MODO'))) !== '') {
                                                                            total = total + parseFloat(records[k].get('ACTIV2'));
                                                                        }
                                                                    }
                                                                    // return Ext.util.Format.number(total, '0,000.00');
                                                                    return total.toFixed(2);
                                                                    //console.log(records);
                                                                }
                                                            },
                                                            {text: 'CREDIT', dataIndex: 'PASIV2', width: 70, align: 'right', editor: 'numberfield',
                                                                renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                                                summaryType: function (records) {
                                                                    var total = 0;
                                                                    var lenn = records.length;
                                                                    for (var p = 0; p < lenn; ++p) {
                                                                        if (String(Ext.String.trim(records[p].get('A1716MODO'))) !== '') {
                                                                            total = total + parseFloat(records[p].get('PASIV2'));
                                                                        }
                                                                    }
                                                                    //return Ext.util.Format.number(total, '0,000.00');
                                                                    return total.toFixed(2);
                                                                    //console.log(records);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Concept', dataIndex: 'A1716TITU', width: 100, renderer: 'onRendererColumnAttr'},
                                                    {text: 'Client', width: 70, dataIndex: 'A1716CLIEN', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 10, enforceMaxLength: 10
                                                            }
                                                        }
                                                    },
                                                    {text: 'Provider', width: 70, dataIndex: 'A1716PROV', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 10, enforceMaxLength: 10
                                                            }
                                                        }
                                                    },
                                                    {text: 'PTE', width: 70, dataIndex: 'A1716MARCA', editor: {
                                                            completeOnEnter: false,
                                                            field: {
                                                                xtype: 'textfield',
                                                                maxLength: 3, enforceMaxLength: 3,
                                                                listeners: {
                                                                    change: 'onchange'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Delete',
                                                        width: 50,
                                                        menuDisabled: true,
                                                        sortable: false,
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                handler: 'OnDatoRemove'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                defaults: {
                                                    sortable: false,
                                                    menuDisabled: true,
                                                    align: 'center'
                                                }
                                            }, viewConfig: {
                                                //trackOver: false,
                                                stripeRows: true,
                                                enableTextSelection: true
                                            },
                                            width: 1200,
                                            height: 300
                                        }
                                    ]
                                }, {
                                    xtype: 'textareafield',
                                    id: prototype.idadjnew + '-txaReference',
                                    labelStyle: 'font-weight:bold;',
                                    width: 1200,
                                    fieldLabel: 'Justificación',
                                    labelWidth: 90

                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idadjnew + '-gridDataCabe',
                    title: 'Original Data',
                    layout: 'hbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idadjnew + '-de-gridDataDetail',
                            width: 1200,
                            height: 300,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Mode', dataIndex: 'A2024TRNC', width: 45},
                                    {text: 'SRC', width: 40, dataIndex: 'A2024FUENT'},
                                    {text: 'SUB <BR>SRC', width: 40, dataIndex: 'A2024SURC'},
                                    {text: 'SEQ', width: 38, dataIndex: 'SEQ'},
                                    {text: 'CPN', width: 38, dataIndex: 'A2024CUPON'},
                                    {text: 'FP', width: 35, dataIndex: 'A2024CONP1'},
                                    {text: 'C1', width: 30, dataIndex: 'A2024CONP1'},
                                    {text: 'C2', width: 30, dataIndex: 'A2024CONP2'},
                                    {text: 'C3', width: 30, dataIndex: 'A2024CONP3'},
                                    {text: 'ACCOUNTING',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'DATE', dataIndex: 'A1716FPRO', width: 60},
                                            {text: 'PERIOD', dataIndex: 'A1716FCONT', width: 60}
                                        ]
                                    },
                                    {text: 'ACCOUNT<br> NUMBER', dataIndex: 'A2024CTA', width: 170},
                                    {text: 'File', dataIndex: 'A2024LIB1', width: 35},
                                    {text: 'LOCAL ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'CUR', dataIndex: 'A2024MDALOC', width: 40},
                                            {text: 'Debit', dataIndex: 'A2024DEBLOC', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'},
                                            {text: 'Credit', dataIndex: 'A2024CRELOC', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'}

                                        ]
                                    },
                                    {text: 'REVENUE ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'CUR', dataIndex: 'CUR2', width: 40},
                                            {text: 'Debit', dataIndex: 'A2024DEBREV', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'},
                                            {text: 'Credit', dataIndex: 'A2024CREREV', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'}
                                        ]
                                    },
                                    {text: 'Concept', dataIndex: 'A2024TITU', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'Client', dataIndex: 'A2024CLIENT', width: 60},
                                    {text: 'Dire', dataIndex: 'A2024DIRECC', width: 60},
                                    {text: 'Provider', dataIndex: 'A2024PROVEE', width: 60},
                                    {text: 'PTE', width: 40, dataIndex: 'MARCA'}


                                ]
                            }, viewConfig: {
                                trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }



                    ]
                },
                {
                    xtype: 'textareafield',
                    id: prototype.idadjnew + '-txaReference1',
                    labelStyle: 'font-weight:bold;',
                    width: 1100,
                    fieldLabel: 'Justificación',
                    labelWidth: 90

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
                    text: 'Save',
                    id: prototype.idadjnew + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onClickSave'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.idadjnew + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

