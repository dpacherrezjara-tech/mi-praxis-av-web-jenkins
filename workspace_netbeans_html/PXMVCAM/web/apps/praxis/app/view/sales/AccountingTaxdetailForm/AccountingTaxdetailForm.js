
prototype.idAccountingTaxdetail = 'AccountingTaxdetailForm';
prototype.idDataEntryAccountingTax = 'DataEntryAccountingTaxdetail';
prototype.url = CONTEXTPATH + '/AccountingTaxdetailForm';
prototype.widthWindow = 1480;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.sales.AccountingTaxdetailForm.AccountingTaxdetailForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AccountingTaxdetailForm',

    requires: [
        'Ext.Praxis.controller.sales.AccountingTaxdetailForm.AccountingTaxdetailFormController',
        'Ext.Praxis.view.sales.AccountingTaxdetailForm.DataEntryAccountingTaxdetail'
    ],

    controller: 'AccountingTaxdetailFormController',

    id: prototype.idAccountingTaxdetail + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults: {
        border: false
    },

    listeners: {
        beforeShow: 'OnBeforeShow'
    },

    items: [
        {
            xtype: 'panel',
            id: prototype.idAccountingTaxdetail + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idAccountingTaxdetail + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items: [
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idAccountingTaxdetail + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idAccountingTaxdetail + '-lbl-currentPage',
                                        prototype.idAccountingTaxdetail + '-lbl-pageCount',
                                        prototype.idAccountingTaxdetail + '-lbl-total'
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idAccountingTaxdetail + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccountingTaxdetail + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccountingTaxdetail + '-btnSend',
                                    icon: 'resources/img/botones/txt.png',
                                    tooltip: 'Send Mail',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccountingTaxdetail + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccountingTaxdetail + '-btn-btnBack',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idAccountingTaxdetail + '-contenedor-filters',
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding: '5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.idAccountingTaxdetail + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idAccountingTaxdetail + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search By',
                                            id: prototype.idAccountingTaxdetail + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            required: true,
                                            disabled: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Modo',
                                            id: prototype.idAccountingTaxdetail + '-Modo',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 40,
                                            labelClsExtra: 'prx-label-search',
                                            width: 150,
                                            required: true,
                                            disabled: false,
                                            listConfig: {
                                                minWidth: 150
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,                                            
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterCONTABLE',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            hidden: true,
                                            enableKeyEvents: true,
                                            labelAlign: 'left'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterGRUPO',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: 9,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterTax',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            fieldLabel: 'Tax',
                                            width: 100,
                                            labelWidth: 30,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                change: 'onchange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtTotalLoc',
                                            labelStyle: 'font-weight:bold;font-style: italic;',
                                            fieldStyle: 'background:yellow;font-weight:bold;text-align:right;',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            fieldLabel: 'Total Local',
                                            width: 220,
                                            labelWidth: 90,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtTotalRev',
                                            labelStyle: 'font-weight:bold;font-style: italic;',
                                            fieldStyle: 'background:yellow;font-weight:bold;text-align:right;',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            fieldLabel: 'Total Revenue',
                                            width: 220,
                                            labelWidth: 100,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            hidden: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idAccountingTaxdetail + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    hidden: true,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        /*{
                                            xtype: 'combo',
                                            id: prototype.idAccountingTaxdetail + '-cmbContrytax',
                                            fieldStyle: 'text-align: left;',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            listeners: {
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAccountingTaxdetail + '-cmbSALES',
                                            fieldStyle: 'text-align: left;',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: 'Source',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            listeners: {
                                                change: 'onCmbSourceChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAccountingTaxdetail + '-cmbBANK',
                                            fieldStyle: 'text-align: left;',
                                            required: true, hidden: true,
                                            disabled: false,
                                            fieldLabel: 'Bank',
                                            width: 120,
                                            labelWidth: 40,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name'
                                        },*/
                                        /*{
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterCOUNTRY',
                                            required: true,
                                            readOnly: false,
                                            fieldLabel: 'Country',
                                            width: 130,
                                            labelWidth: 60,
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            labelAlign: 'left',
                                            maxLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onchange'
                                            }
                                        },*/
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterCHANNEL',
                                            required: true,
                                            readOnly: false, hidden: true,
                                            fieldLabel: 'Channnel',
                                            width: 160,
                                            labelWidth: 60,
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            labelAlign: 'left',
                                            maxLength: 16,
                                            maskRe: /[a-zA-Z]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterIATA',
                                            required: true,
                                            readOnly: false,
                                            fieldLabel: 'IATA Code', hidden: true,
                                            width: 180,
                                            labelWidth: 80,
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            labelAlign: 'left',
                                            maxLength: 9,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccountingTaxdetail + '-txtFilterCurrency',
                                            required: true,
                                            readOnly: false,
                                            fieldLabel: 'Currency',
                                            width: 150,
                                            labelWidth: 60,
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            labelAlign: 'left',
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onchange'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            padding: '20 0 0 0',
                            id: prototype.idAccountingTaxdetail + '-gridData',
                            height: 530,
                            width: 1460,
                            columnLines: true,
                            resizable: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    //resizable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Modo', width: 80, dataIndex: 'MODO'},
                                    {text: 'Processing<br> Date', width: 80, dataIndex: 'FECPROC'},
                                    {text: 'Sales<br> Date', width: 80, dataIndex: 'FECVTA'},
                                    {text: 'Group', width: 80, dataIndex: 'GRUPO'},
                                    {text: 'IATA', width: 80, dataIndex: 'IATA'},
                                    {text: 'Name', width: 100, dataIndex: 'NOMBRE'},
                                    {text: 'Ticket', width: 100, dataIndex: 'NROBOLETO'},
                                    {text: 'Flag', width: 40, dataIndex: 'FLAG'},
                                    {text: 'Itinerary', width: 150, dataIndex: 'ITINERARIO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left; margin-left:0px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Transaction', width: 80, dataIndex: 'TRANSACCION'},
                                    {text: 'Country<br>Tax', width: 60, dataIndex: 'COUNTRYTAX'},
                                    {text: 'TAX', width: 40, dataIndex: 'Tax'},
                                    {text: 'ATO', width: 40, dataIndex: 'ATO'},
                                    {text: 'Currency<br>Local', width: 90, dataIndex: 'CODMONEDA'},
                                    {text: 'Amount<br>Local', width: 90, dataIndex: 'IMPMDAORI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px;';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Amount<br>Revenue', width: 90, dataIndex: 'IMPMDAREV',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px;';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Accounting<br>Date', width: 120, dataIndex: 'FECCONT'},
                                    {text: 'Accounting<br>ID', width: 140, dataIndex: 'ACOUNTID'},
                                    {text: 'Account', width: 140, dataIndex: 'CUENT'}


                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idAccountingTaxdetail + '-pagginator-legend',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.idAccountingTaxdetail + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idAccountingTaxdetail + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idAccountingTaxdetail + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    id: prototype.idAccountingTaxdetail + '-lblRowsTotalADM',hidden:true,
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

