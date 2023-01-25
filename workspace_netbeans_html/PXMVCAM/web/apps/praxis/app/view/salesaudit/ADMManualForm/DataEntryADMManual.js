/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.ADMManualForm.DataEntryADMManual', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryADMManual',

    controller: 'DataEntryADMManualController',

    requires: [
        'Ext.Praxis.controller.salesaudit.ADMManualForm.DataEntryADMManualController',
        'Ext.Praxis.view.salesaudit.ADMManualForm.RFNDAddTax',
        'Ext.Praxis.view.salesaudit.ADMManualForm.FormRazonesADManual',
        'Ext.Praxis.view.salesaudit.ADMManualForm.FormListTKTADManual'
    ],
    id: prototype.id01 + '-win',

    title: 'AGENCY DEBIT MEMO / CHARGES DEBIT NOTE',
    header: true,
    height: 800,
    width: 900,
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
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboTransaction',
                            fieldLabel: 'Transaction',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 70,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbStatusChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboType1',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            hidden: true,
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbTypeStatusChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboType2',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            hidden: true,
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbTypeStatusChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboType3',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            hidden: true,
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbTypeStatusChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboType4',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            hidden: true,
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbTypeStatusChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboType5',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            hidden: true,
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbTypeStatusChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-ComboSource',
                            fieldLabel: 'Source',
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
                                afterrender: 'onCmbStatusAfterRender',
                                select: 'onCmbSourceSelect'
                            }
                        }, {
                            xtype: 'combo',
                            id: prototype.id01 + '-ComboChannel', hidden: true,
                            fieldLabel: 'Channel',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 120,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 120
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-txtCountry',
                            fieldLabel: 'Country',
                            queryMode: 'local',
                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                            displayField: 'A051DESCR1',
                            valueField: 'A051KEY2',
                            width: 220,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                specialkey: 'onSearchkey',
                                afterrender: 'onCmbStatusAfterRender'

                            }
                        },
                        /*{
                         xtype: 'textfield',
                         id: prototype.id01 + '-txtCountry',
                         fieldLabel: 'Country',
                         maskRe: /[A-Z,a-z,Ñ,ñ]/,
                         maxLength: 2,
                         enforceMaxLength: 2,
                         labelWidth: 50,
                         width: 110,
                         listeners: {
                         change: 'onchange',
                         specialkey: 'onSearchkey'
                         
                         }
                         },*/
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-ComboCurrency',
                            fieldLabel: 'Currency',
                            queryMode: 'local',
                            displayField: 'A006MONEDA',
                            valueField: 'A006MONEDA',
                            width: 120,
                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                specialkey: 'onSearchkey',
                                afterrender: 'onCmbCurrenAfterRender'

                            }
                        }
                        /*{
                         xtype: 'textfield',
                         id: prototype.id01 + '-ComboCurrency',
                         fieldLabel: 'Currency',
                         maskRe: /[A-Z,a-z,Ñ,ñ]/,
                         maxLength: 3,
                         enforceMaxLength: 3,
                         labelWidth: 50,
                         width: 110,
                         listeners: {
                         change: 'onchange',
                         specialkey: 'onSearchkey'
                         
                         }
                         }*/
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
                            fieldLabel: 'Ticket',
                            id: prototype.id01 + '-txtCia',
                            labelWidth: 40,
                            maxLength: 3,
                            enforceMaxLength: 3,
                            width: 80,
                            value: '139'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFrmaSerie',
                            hideLabel: true,
                            width: 150,
                            maxLength: 10,
                            enforceMaxLength: 10,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSeq',
                            hideLabel: true,
                            maxLength: 2,
                            enforceMaxLength: 2,
                            width: 30,
                            value: '00'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id01 + '-btn-search',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'imgSearch_clickHandler'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCupon',
                            fieldLabel: 'Coupon',
                            labelWidth: 50,
                            readOnly: true,
                            width: 100
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id01 + '-txtFDate',
                            fieldLabel: 'Issue Date',
                            format: 'Y/m/d',
                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                            labelWidth: 80,
                            labelAlign: 'right',
                            width: 180,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtADMAssoci',
                            fieldLabel: 'ADM Associated',
                            labelWidth: 100,
                            width: 200,
                            readOnly: true,
                            labelAlign: 'right'
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
                            id: prototype.id01 + '-txtIata',
                            fieldLabel: 'IATA',
                            maxLength: 8,
                            enforceMaxLength: 8,
                            labelWidth: 40,
                            width: 120,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAgencia',
                            fieldLabel: 'IATA NAME',
                            labelWidth: 70,
                             width: 400,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAdrres',
                            fieldLabel: 'Addres',
                            labelWidth: 60,
                            width: 300,
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
                            id: prototype.id01 + '-txtCTA',
                            fieldLabel: 'CTA',
                            maxLength: 29,
                            enforceMaxLength: 29,
                            labelWidth: 40,
                            width: 250
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtLocation',
                            fieldLabel: 'Location',
                            maxLength: 4,
                            enforceMaxLength: 4,
                            labelWidth: 50,
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPASSENGER',
                            fieldLabel: 'Passenger name',
                            labelWidth: 110,
                            readOnly: true,
                            width: 300
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmboADMAssoci',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 150,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            hidden: true,
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
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
                            id: prototype.id01 + '-txtCargo',
                            fieldLabel: 'Management Charge %',
                            value:'0',
                            labelWidth: 140,
                            width: 220,
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtIvaCargo',
                            fieldLabel: 'Iva Charge %',
                            value:'0',
                            labelWidth: 85,
                            width: 140,
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id01 + '-txtCargoApli',
                            checked: true,
                            listeners: {
                                change: 'onChkCargoApli',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtExchange',
                             value:'0',
                            fieldLabel: 'Exchange Rate',
                            labelWidth: 90,
                            width: 170
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-ComboArea',
                            fieldLabel: 'Area',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 180,
                            labelWidth: 30,
                            emptyText: '',
                            listConfig: {
                                minWidth: 150
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'TKT Duplicates'
                        },
                        {
                            xtype: 'button',
                            fieldLabel: 'TKT Duplicates',
                            id: prototype.id01 + '-btn-searchDupli',
                            iconCls: 'prx-icon-104-ticket',
                            tooltip: 'Search Duplicates',
                            listeners: {
                                click: 'imgSearch_clickHandler_Duplicates'
                            }
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
                            id: prototype.id01 + '-txtObservation',
                            fieldLabel: 'Observation',
                            labelWidth: 120,
                            grow: true,
                            flex: 1,
                            height: 35
                        },
                        {xtype: 'textfield', id: prototype.id01 + '-txtiatabaja', hidden: true},
                        {xtype: 'textfield', id: prototype.id01 + '-txtExisteDBDT', hidden: true},
                        {xtype: 'textfield', id: prototype.id01 + '-txtDECMO', hidden: true}
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
                            xtype: 'grid',
                            id: prototype.id01 + '-gridrazon',
                            title: 'LIST OF REASONS',
                            columnLines: true,
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Reason',
                                            id: prototype.id01 + '-gridrazonADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onAddRazonClick'
                                        }, '-']
                                }],
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Code', dataIndex: 'A2560CODRZ', align: 'center', width: 90},
                                    {text: 'Family', dataIndex: 'A2560FAMIL', width: 50},
                                    {text: 'Description', dataIndex: 'A2560ERROR', flex: 1, editor: 'textfield'},
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnRazonRemove'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridtaxAGENT',
                            title: 'LIST OF TAXES',
                            columnLines: true,
                            autoScroll: true,
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Taxes',
                                            id: prototype.id01 + '-gridTaxesADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'OnAddTaxRenderer'
                                        }, '-']
                                }],
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Cur', dataIndex: 'A1673MONED', flex: 1},
                                    {text: 'Tax', dataIndex: 'A1673CDTAX', align: 'center', flex: 1},
                                    {text: 'Ato', dataIndex: 'A1673CDATO', align: 'center', flex: 1},
                                    {text: 'Net', dataIndex: 'A1673TXMIA', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary', //summaryType: 'sum',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                total = total + parseFloat(records[j].get('A1673TXMIA'));
                                            }
                                            return total.toFixed(2);
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnTaxRFNDRemove'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'table',
                        columns: 5
                    },
                    defaults: {
                        labelWidth: 120,
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important',
                        fieldStyle: 'font-weight: bold; color: blue; text-align: right;'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Calculated Airline',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Calculated Agent',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Difference',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Exchange',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'FARE',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFAREAero',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFAREAGENT',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFAREDIFE',
                            readOnly: true,
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id01 + '-txtFARE',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Total Tax',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxAero',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxAGENT',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txTaxDIFE',
                            readOnly: true,
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Services Charges',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtServiChargeAero',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtServiChargeAGENT',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtServiChargeDIFE',
                            readOnly: true,
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id01 + '-txtServiCharge',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Commission',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionAero',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionAGENT',
                            fieldLabel: '', readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionDIFE',
                            readOnly: true,
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id01 + '-txtCommission',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Over Commission',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield', readOnly: true,
                            id: prototype.id01 + '-txtOverCommiAero',
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield', readOnly: true,
                            id: prototype.id01 + '-txtOverCommiAGENT',
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtOverCommiDIFE',
                            readOnly: true,
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id01 + '-txtOverCommi',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Tax on Commission',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield', readOnly: true,
                            id: prototype.id01 + '-txtTaxonCommiAero',
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield', readOnly: true,
                            id: prototype.id01 + '-txtTaxonCommiAGENT',
                            fieldLabel: '',
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTaxonCommiDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkeyCargos',
                                blur: 'onChkCargoApli'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id01 + '-txtTaxonCommi',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Sub Total',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        /*{
                         xtype: 'textfield',
                         id: prototype.id01 + '-txtSubTotalAero',
                         fieldLabel: '',
                         readOnly: true,hidden:true,
                         value: '0.00'
                         },
                         {
                         xtype: 'textfield',
                         id: prototype.id01 + '-txtSubTotalAGENT',
                         fieldLabel: '',
                         readOnly: true,hidden:true,
                         value: '0.00'
                         },*/
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSubTotalDIFE',
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
                            fieldLabel: 'Management Charge',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSubTotalCharge',
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
                            fieldLabel: 'Iva Charge',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSubTotalChargeIva',
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
                            fieldLabel: 'Total',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotal',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
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
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
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
