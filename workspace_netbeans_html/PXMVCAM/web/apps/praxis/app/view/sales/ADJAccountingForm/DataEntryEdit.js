/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ADJAccountingForm.DataEntryEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntryEdit',
    controller: prototype.id + '-dataEntryEditController',
    requires: [
        'Ext.Praxis.controller.sales.ADJAccounting.DataEntryEditADJAccountingController'
    ],
    title: 'Transactional Adjustment',
    header: true,
    width: 1580,
    height: 760,
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
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 1580,
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: true,
                            width: 1580,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                bodyStyle: 'background: #E5ECEF',
                                width: 1550
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
                                            id: prototype.id + '-de-cmbTypeBusq',
                                            required: true,
                                            fieldLabel: 'Type of Adj',
                                            width: 200,
                                            labelWidth: 100,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            fieldStyle: 'text-align:left',
                                            disabled: true,
                                            listeners: {
                                                // change: 'changeCmbTRx'

                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            text: 'Transaction: ',
                                            style: 'font-weight:normal',
                                            padding: '4px 5px 2px 8px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbTRx',
                                            required: true,
                                            fieldLabel: 'Type of Adj',
                                            width: 200,
                                            labelWidth: 100,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            fieldStyle: 'text-align:left',
                                            disabled: true,
                                            listeners: {
                                                //change: 'changeCmbTRx'

                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCia',
                                            required: true,
                                            fieldLabel: 'Ticket',
                                            width: 80,
                                            labelWidth: 40,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            value: '139',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTicket',
                                            required: true,
                                            width: 100,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 11,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCupon1s',
                                            required: true,
                                            width: 35,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            maskRe: /[1-4]/,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtAffectation',
                                            required: true,
                                            fieldLabel: 'Affectation IATA',
                                            width: 200,
                                            labelWidth: 110,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCrtBy',
                                            required: true,
                                            fieldLabel: 'Create By ',
                                            width: 180,
                                            labelWidth: 80,
                                            enableKeyEvents: true,
                                            readOnly: true

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
                                                xtype: 'label',
                                                padding: '1px 5px 5px 8px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                style: 'font-weight:bold;',
                                                width: 70,
                                                height: 25

                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 70},
                                                {
                                                    text: 'T. Card'
                                                },
                                                {
                                                    text: 'N°. Card'
                                                },
                                                {
                                                    text: 'Rfic'
                                                },
                                                {
                                                    text: 'Rfis'
                                                }

                                            ]
                                        },
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
                                                width: 120,
                                                labelWidth: 0,
                                                readOnly: true,
                                                labelSeparator: '',
                                                fieldLabel: '',
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
                                                    id: prototype.id + '-de-lblTtarjeta'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblNtarjeta'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblRfig'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblRfis'
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                xtype: 'label',
                                                padding: '1px 5px 5px 8px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                style: 'font-weight:bold;',
                                                width: 90,
                                                height: 25

                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 90}, {
                                                    text: 'VRIC'
                                                },
                                                {
                                                    text: 'F. Sale'
                                                },
                                                {
                                                    text: 'IATA Sal.'
                                                },
                                                {
                                                    text: 'TKT REFE'
                                                },
                                                {
                                                    text: 'SEQ'
                                                },
                                                {
                                                    text: 'CARRIER',
                                                    id: prototype.id + '-de-carrielLabel'
                                                }

                                            ]
                                        },
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
                                                width: 120,
                                                labelWidth: 0,
                                                readOnly: true,
                                                fieldLabel: '',
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 120,
                                                    text: '',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblVRic'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblFsale'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblIATA'
                                                },
                                                {
                                                    id: prototype.id + '-de-TKTREFE'
                                                },
                                                {
                                                    id: prototype.id + '-de-TKTSEQ'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblCARRIER'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 25',
                                            id: prototype.id + '-de-panelCorrecDataLocLabel',
                                            border: false,
                                            defaults: {
                                                xtype: 'label',
                                                padding: '1px 5px 5px 8px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                style: 'font-weight:bold;',
                                                width: 90,
                                                height: 25

                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 90},
                                                {
                                                    id: prototype.id + '-de-label-lblAmount',
                                                    text: 'Amount'
                                                },
                                                {
                                                    id: prototype.id + '-de-label-lblCurrency',
                                                    text: 'Currency'
                                                },
                                                {
                                                    id: prototype.id + '-de-label-lblCommision',
                                                    text: 'Commision'
                                                },
                                                {
                                                    id: prototype.id + '-de-label-lblSCommision',
                                                    text: 'OVER Comm'
                                                },
                                                {
                                                    id: prototype.id + '-de-label-lblYQ',
                                                    text: 'YQ'
                                                },
                                                {
                                                    id: prototype.id + '-de-label-lblFBASIS',
                                                    text: 'F. BASIS'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            id: prototype.id + '-de-panelCorrecDataLoc',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 120,
                                                labelWidth: 0,
                                                labelSeparator: '',
                                                height: 25,
                                                readOnly: true

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
                                                    id: prototype.id + '-de-lblAmount'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblCurrency'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblCommision'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblSCommision'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblYQ'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblFBASIS'

                                                }
                                            ]
                                        },
                                        //--
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            id: prototype.id + '-de-panelOriginalDataRevLabel',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                xtype: 'label',
                                                padding: '1px 5px 5px 8px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                style: 'font-weight:bold;',
                                                width: 90,
                                                height: 25

                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 90},
                                                {
                                                    text: 'TC'
                                                },
                                                {
                                                    text: 'Amount'
                                                },
                                                {
                                                    text: 'Currency'
                                                },
                                                {
                                                    text: 'Commision'
                                                },
                                                {
                                                    text: 'OVER Comm'
                                                },
                                                {
                                                    text: 'YQ'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            id: prototype.id + '-de-panelOriginalDataRev',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 120,
                                                labelWidth: 0,
                                                readOnly: true,
                                                labelSeparator: '',
                                                fieldLabel: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 140,
                                                    text: 'Original Data REV',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    padding: '1px 5px 5px 8px'

                                                },
                                                {
                                                    id: prototype.id + '-de-lblTC'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblAmountREV'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblCurrencyREV'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblCommisionREV'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblSCommisionREV'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblYQREV'
                                                }
                                            ]
                                        },
                                        ///----
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
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 220,
                                                labelWidth: 90,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    id: prototype.id + '-de-lblGroup',
                                                    fieldLabel: 'Group'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblTdoc',
                                                    fieldLabel: 'T. DOC'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblTRNC',
                                                    fieldLabel: 'TRNC'
                                                },
                                                {
                                                    id: prototype.id + '-de-lblPROCESSDATE',
                                                    fieldLabel: 'Proc. Date'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-de-Commision',
                                                    boxLabelAlign: 'before',
                                                    width: 110,
                                                    boxLabel: '<b>AFFECT TNU </b>',
                                                    readOnly: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-de-panelCombos',
                                            layout: 'vbox',
                                            margin: '1 0 1 25',
                                            border: false,
                                            defaults: {
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:right;font-weight:bold;background:#D9DDE0;border-style:solid;border-color:#7F98A8;border-right-width:2px;border-bottom-width:2px;',
                                                labelStyle: 'font-weight:bold;',
                                                width: 220,
                                                labelWidth: 90,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25
                                            },
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbTYPEUSE',
                                                    required: true,
                                                    fieldLabel: 'Reason',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    fieldStyle: '',
                                                    readOnly: false,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    width: 220,
                                                    labelWidth: 105
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbTYUSEASS',
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
                                        }
                                    ]
                                }, // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Panel 3 PANEL TAB">
                                {
                                    xtype: 'tabpanel',
                                    id: prototype.id + '-tabMain',
                                    width: 1500,
                                    height: 440,
                                    anchor: '100%',
                                    margin: '1 1 1 1',
                                    autoScroll: true,
                                    bodyStyle: 'background: transparent',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: transparent',
                                            id: prototype.id + '-tabCorrectData',
                                            title: 'Correct Data',
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
                                                    xtype: 'grid',
                                                    padding: '5 0 0 0',
                                                    id: prototype.id + '-de-gridCorrectData',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    height: 300,
                                                    width: 1445,
                                                    columnLines: true,
                                                    resizable: false,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Mode', width: 80, dataIndex: 'A2024TRNC',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var valor = '';
                                                                    switch (value) {
                                                                        case 'S':
                                                                            valor = 'SALE';
                                                                            break;
                                                                        case 'F':
                                                                            valor = 'FLWN';
                                                                            break;
                                                                        case 'R':
                                                                            valor = 'RFND';
                                                                            break
                                                                        case 'J':
                                                                            valor = 'EXCH';
                                                                            break
                                                                        case 'M':
                                                                            valor = 'MEMO';
                                                                            break
                                                                        case 'I':
                                                                            valor = 'TAXC';
                                                                            break
                                                                        default :
                                                                            valor = value;
                                                                            break;
                                                                    }

                                                                    return valor;
                                                                }

                                                            },
                                                            {text: 'SRC', width: 60, dataIndex: 'A2024FUENT'},
                                                            {text: 'SUB <BR>SRC', width: 60, dataIndex: 'A2024SFUEN'},
                                                            {text: 'CON1', width: 60, dataIndex: 'CONP1'},
                                                            {text: 'CON2', width: 60, dataIndex: 'CONP2'},
                                                            {text: 'ACCOUNT<br> NUMBER', dataIndex: 'A2024CTA', width: 200},
                                                            {text: 'File', dataIndex: 'A2024LIB1', width: 50},
                                                            {text: 'City', dataIndex: 'A2024PSVTA', width: 50},
                                                            {text: 'LOCAL ',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'CURR', dataIndex: 'A2024MDALOC', width: 60},
                                                                    {text: 'DEBIT', dataIndex: 'A2024DEBLOC', width: 65,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var A1716MODO = record.data.A1716MODO;
                                                                            metaData.style = 'text-align :right;';
                                                                            if (A1716MODO === '') {
                                                                                return '';
                                                                            } else {
                                                                                return Ext.util.Format.number(value, '0,000.00');
                                                                            }
                                                                        }
                                                                    },
                                                                    {text: 'CREDIT', dataIndex: 'A2024CRELOC', width: 65,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var A1716MODO = record.data.A1716MODO;
                                                                            metaData.style = 'text-align :right;';
                                                                            if (A1716MODO === '') {
                                                                                return '';
                                                                            } else {
                                                                                return Ext.util.Format.number(value, '0,000.00');
                                                                            }
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
                                                                    {text: 'DEBIT', dataIndex: 'A2024DEBREV', width: 65,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var A1716MODO = record.data.A1716MODO;
                                                                            metaData.style = 'text-align :right;';
                                                                            if (A1716MODO === '') {
                                                                                return '';
                                                                            } else {
                                                                                return Ext.util.Format.number(value, '0,000.00');
                                                                            }
                                                                        }
                                                                    },
                                                                    {text: 'CREDIT', dataIndex: 'A2024CREREV', width: 65,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var A1716MODO = record.data.A1716MODO;
                                                                            metaData.style = 'text-align :right;';
                                                                            if (A1716MODO === '') {
                                                                                return '';
                                                                            } else {
                                                                                return Ext.util.Format.number(value, '0,000.00');
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Concept', dataIndex: 'A2024TITU', width: 250,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align :left;';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Client', dataIndex: 'A2024CLIENT', width: 80},
                                                            {text: 'Provider', dataIndex: 'A2024PROVEE', width: 80},
                                                            {text: 'PTE', dataIndex: 'MARCA', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var valor = '';
                                                                    switch (value) {
                                                                        case 'P':
                                                                            valor = 'PTE';
                                                                            break;
                                                                        case 'x':
                                                                            valor = 'PTE';
                                                                            break;
                                                                        default:
                                                                            valor = '';
                                                                    }

                                                                    return valor;
                                                                }
                                                            }

                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelSummaryCorrectData',
                                                    width: 550,
                                                    align: 'center',
                                                    margin: '10 0 5 500',
                                                    defaults: {
                                                        xtype: 'label',
                                                        align: 'center',
                                                        html: '' + '&nbsp',
                                                        height: 25,
                                                        padding: '5 0 5 0',
                                                        style: 'background:#E5ECEF;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                                    },
                                                    items: [
                                                        {width: 150, text: 'TOTALS', style: 'background:#A0BFD3;color:#244066;text-align:left;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'},
                                                        {width: 100, id: prototype.id + '-de-lblA1716ACTIGL6'},
                                                        {width: 100, id: prototype.id + '-de-lblA1716PASIGL6'},
                                                        {width: 100, id: prototype.id + '-de-lblA1716TOTALGL6'},
                                                        {width: 100, id: prototype.id + '-de-lblA1716SALDO6'}

                                                    ]
                                                },
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
                                                            xtype: 'textareafield',
                                                            height: '',
                                                            id: prototype.id + '-de-txaReference',
                                                            fieldStyle: 'text-align:left;font-weight:bold;border-style:solid;border-color:#7F98A8;border-right-width:3px;border-bottom-width:3px;',
                                                            labelStyle: 'font-weight:bold;',
                                                            padding: '5 2 0 2',
                                                            width: 1050,
                                                            readOnly: true,
                                                            fieldLabel: 'Justificación',
                                                            labelPad: 0,
                                                            labelWidth: 90

                                                        }

                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>



                            ]
                        }
                    ]
                }

            ]
        }
    ]

});