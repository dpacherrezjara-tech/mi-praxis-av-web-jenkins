/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ADJUsesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntry',
    requires: [
        'Ext.Praxis.controller.sales.ADJUses.DataEntryADJUsesController'
    ],
    controller: 'DataEntryADJUsesController',
    id: prototype.idDetailADJUsesForm + '-DataEntryContenedor',

    title: 'Transactional Adjustment',
    header: true,
    width: 1100,
    height: 700,
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
            id: prototype.idDetailADJUsesForm + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 1080,
                    margin: '5 5 5 5',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="PanelFilters">
                        {
                            xtype: 'panel',
                            id: prototype.idDetailADJUsesForm + '-de-panelOptions',
                            border: false,
                            width: 1075,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'toolbar',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.idDetailADJUsesForm + '-de-btnSearch',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onBtnSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.idDetailADJUsesForm + '-de-btnClear',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clear Options',
                                            listeners: {
                                                click: 'onBtnClear'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }, // </editor-fold>


                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: true,
                            width: 1075,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                bodyStyle: 'background: #E5ECEF',
                                width: 1075
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="PanelTicket">
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 5 0',
                                    border: false,
                                    style: 'border-bottom: 5px #ffffff solid;border-left: 0px;',
                                    defaults: {
                                        padding: '2px 3px 2px 3px',
                                        align: 'center',
                                        fieldStyle: 'text-align:center',
                                        maskRe: /[0-9]/
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            text: 'Search',
                                            style: 'font-weight:bold',
                                            padding: '4px 5px 2px 8px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDetailADJUsesForm + '-de-cmbTRx',
                                            required: true,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            fieldStyle: 'text-align:left',
                                            listeners: {
                                                change: 'changeCmbTRx'

                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtCia',
                                            required: true,
                                            fieldLabel: 'Ticket',
                                            width: 80,
                                            labelWidth: 40,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            value: '139'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtTicket',
                                            required: true,
                                            width: 100,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 11
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtSeq',
                                            required: true,
                                            width: 35,
                                            labelWidth: 0,
                                            value: '00',
                                            enforceMaxLength: true,
                                            maxLength: 2
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtCupon1',
                                            required: true,
                                            width: 35,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            maskRe: /[1-1]/

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtCupon2',
                                            required: true,
                                            width: 35,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            maskRe: /[2-2]/

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtCupon3',
                                            required: true,
                                            width: 35,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[3-3]/

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtCupon4',
                                            required: true,
                                            width: 35,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            maskRe: /[4-4]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtAffectation',
                                            required: true,
                                            fieldLabel: 'Affectation IATA',
                                            width: 200,
                                            labelWidth: 110,
                                            enforceMaxLength: true,
                                            maxLength: 8
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDetailADJUsesForm + '-de-txtCrtBy',
                                            required: true,
                                            fieldLabel: 'Create By ',
                                            width: 180,
                                            labelWidth: 80

                                        }
                                    ]
                                }, // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Panel 2">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: #E5ECEF'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 180,
                                                labelWidth: 70,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 180,
                                                    text: 'Original Data',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTtarjeta',
                                                    fieldLabel: 'T. Card'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblNtarjeta',
                                                    fieldLabel: 'N°. Card'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblRfig',
                                                    fieldLabel: 'Rfic'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblRfis',
                                                    fieldLabel: 'Rfis'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblVRic',
                                                    fieldLabel: 'VRic'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblFsale',
                                                    fieldLabel: 'F.Sale'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblIATA',
                                                    fieldLabel: 'IAT SAL'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCARRIER',
                                                    fieldLabel: 'CARRIER'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.idDetailADJUsesForm + '-de-panelCorrecData1',
                                            layout: 'vbox',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 100,
                                                labelWidth: 0,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 100,
                                                    text: 'Correct Data',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'


                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblFareCurrency'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblEqFarePaidCurrency'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCommisionCurrency'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTax1Code'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTax2Code'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTax3Code'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTotalAmountCurrency'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCARRIERNEW'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 180,
                                                labelWidth: 90,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 180,
                                                    text: 'Original Data Loc',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblAmount',
                                                    fieldLabel: 'Amount'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCurrency',
                                                    fieldLabel: 'Currency'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCommision',
                                                    fieldLabel: 'Commision'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblSCommision',
                                                    fieldLabel: 'OVER Comm'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblYQ',
                                                    fieldLabel: 'YQ'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblFBASIS',
                                                    fieldLabel: 'F. BASIS'
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            id: prototype.idDetailADJUsesForm + '-de-panelCorrecData2',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 100,
                                                labelWidth: 0,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 120,
                                                    text: 'Correct Data Loc',
                                                    style: 'font-weight:bold;text-align:left;',
                                                    padding: '1px 5px 5px 0px'


                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblAmountNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCurrencyNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCommisionNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblSCommisionNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblYQNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblFBASISE'

                                                }
                                            ]
                                        },
                                        //
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 180,
                                                labelWidth: 90,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 180,
                                                    text: 'Original Data REV',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTC',
                                                    fieldLabel: 'TC'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblAmountREV',
                                                    fieldLabel: 'Amount'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCurrencyREV',
                                                    fieldLabel: 'Currency'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCommisionREV',
                                                    fieldLabel: 'Commision'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblSCommisionREV',
                                                    fieldLabel: 'OVER Comm'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblYQREV',
                                                    fieldLabel: 'YQ'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            id: prototype.idDetailADJUsesForm + '-de-panelCorrecData3',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 100,
                                                labelWidth: 0,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 120,
                                                    text: 'Correct Data REV',
                                                    style: 'font-weight:bold;text-align:left;',
                                                    padding: '1px 5px 5px 0px'


                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTCNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblAmountREVNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCurrencyREVNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblCommisionREVNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblSCommisionREVNEW', value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblYQREVNEW', value: 0

                                                }
                                            ]
                                        }
                                    ]
                                }, // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Panel 3">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '15 0 1 5',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: #E5ECEF'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 180,
                                                labelWidth: 70,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 180,
                                                    text: 'Original Data',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTFOP',
                                                    fieldLabel: 'FP. Fiscal'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTicket',
                                                    fieldLabel: 'Ticket'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.idDetailADJUsesForm + '-de-panelCorrecData4',
                                            layout: 'vbox',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 120,
                                                labelWidth: 0,
                                                labelSeparator: '',
                                                height: 25

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
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTFOPNEW'

                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        // padding: '0px 3px 0px 3px',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:right;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;', labelStyle: 'font-weight:bold;',
                                                        labelWidth: 0,
                                                        labelSeparator: '',
                                                        height: 25

                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.idDetailADJUsesForm + '-de-lblTicketcia',
                                                            width: 35
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            id: prototype.idDetailADJUsesForm + '-de-lblTicketNEW',
                                                            width: 65
                                                        }


                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:center;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 220,
                                                labelWidth: 90,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblGroup',
                                                    fieldLabel: 'Group'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblIATATrx',
                                                    fieldLabel: 'IATA TRNC'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblTRNC',
                                                    fieldLabel: 'TRNC'
                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-lblDate',
                                                    fieldLabel: 'Date TRNC'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.idDetailADJUsesForm + '-de-Commision',
                                                    boxLabelAlign: 'before',
                                                    width: 110,
                                                    boxLabel: '<b>AFFECT TNU </b>',
                                                    readOnly: false
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.idDetailADJUsesForm + '-de-cmbTYPEUSE',
                                                    required: true,
                                                    fieldLabel: 'Reason',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    fieldStyle: '',
                                                    readOnly: false,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    width: 220,
                                                    labelWidth: 105,
                                                    listConfig: {
                                                        minWidth: 200
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.idDetailADJUsesForm + '-de-cmbTYUSEASS',
                                                    required: true,
                                                    fieldLabel: 'Use Annulment',
                                                    fieldStyle: '',
                                                    readOnly: false,
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    width: 220,
                                                    labelWidth: 105
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:center;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 220,
                                                labelWidth: 90,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-TKTREFE',
                                                    fieldLabel: 'TKT REFE'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-TKTSEQ',
                                                    fieldLabel: 'SEQ'

                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:center;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 220,
                                                labelWidth: 90,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-DATE',
                                                    fieldLabel: 'DATE',
                                                    maxLength: 8,
                                                    enforceMaxLength: 8,
                                                    maskRe: /[0-9]/

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-ORIGEN',
                                                    fieldLabel: 'ORI'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-DESTINO',
                                                    fieldLabel: 'DES'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-CARRIER',
                                                    fieldLabel: 'CARRIER'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-FLIGHT',
                                                    fieldLabel: 'FLIGHT'

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-AmountLoc',
                                                    fieldLabel: 'Amount Loc',
                                                    value: 0

                                                },
                                                {
                                                    id: prototype.idDetailADJUsesForm + '-de-AmountRev',
                                                    fieldLabel: 'Amount Rev',
                                                    value: 0

                                                }

                                            ]
                                        }
                                    ]
                                }, // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Panel 4">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '15 0 1 5',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: #E5ECEF'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:left;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:3px;border-bottom-width:3px;',
                                                labelStyle: 'font-weight:bold;',
                                                labelSeparator: ''
                                                        // height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    height: '',
                                                    id: prototype.idDetailADJUsesForm + '-de-txaReference',
                                                    padding: '0 2 0 2',
                                                    width: 1050,
                                                    fieldLabel: 'Justificación',
                                                    labelPad: 0,
                                                    labelWidth: 90

                                                }
                                            ]
                                        }
                                    ]
                                } // </editor-fold>

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
            bodyStyle: 'background: #E5ECEF',
            items: [
                {
                    text: 'Save',
                    id: prototype.idDetailADJUsesForm + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDetailADJUsesForm + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDetailADJUsesForm + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.idDetailADJUsesForm + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});