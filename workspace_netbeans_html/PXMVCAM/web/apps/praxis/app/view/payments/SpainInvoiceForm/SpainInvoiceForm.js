
prototype.idSpainInvoice = 'SpainInvoiceForm';
prototype.url = CONTEXTPATH + '/SpainInvoiceForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.payments.SpainInvoiceForm.SpainInvoiceForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SpainInvoiceForm',

    requires: [
        'Ext.Praxis.controller.payments.SpainInvoiceForm.SpainInvoiceFormController',
    ],

    controller: 'SpainInvoiceFormController',

    id: prototype.idSpainInvoice + '-Contenedor',

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
            id: prototype.idSpainInvoice + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idSpainInvoice + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idSpainInvoice + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSpainInvoice + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSpainInvoice + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'exportText'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSpainInvoice + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
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
                    id: prototype.idSpainInvoice + '-contenedor-filters',
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
                            id: prototype.idSpainInvoice + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idSpainInvoice + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Processing By:',
                                            style: 'font-weight:bold;',
                                            padding: '10 5 5 5'

                                        }, {
                                            xtype: 'combo',
                                            hideLabel: true,
                                            id: prototype.idSpainInvoice + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 80,
                                            labelClsExtra: 'prx-label-search',
                                            width: 275,
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
                                            xtype: 'datefield',
                                            id: prototype.idSpainInvoice + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 60,
                                            labelAlign: 'right',
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idSpainInvoice + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
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
                            id: prototype.idSpainInvoice + '-gridSpain',
                            columnLines: true,
                            autoScroll: true,
                            width: 1360,
                            height: 520,
                            columns: {
                                items: [
                                    {text: 'Sale date', dataIndex: 'FECHA_EXPEDICION', width: 80},
                                    {text: 'Pax name', dataIndex: 'NOMBRE_PASAJERO', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Ticket', dataIndex: 'NUMERO_BOLETO', width: 100},
                                    {text: 'Source', dataIndex: 'FUENTE', width: 60},
                                    {text: 'Trx', dataIndex: 'TRX', width: 50},
                                    {text: 'Tdoc', dataIndex: 'TDOC', width: 60, align: 'left'},
                                    {text: 'Cur.', dataIndex: 'MONEDA', width: 40},
                                    {text: 'Country', dataIndex: 'A2548PAIS', width: 60},
                                    {text: 'IATA', dataIndex: 'IATA', width: 70},
                                    {text: 'Agency', dataIndex: 'NOMBRE_AGENCIA', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Payment1', dataIndex: 'FORMA_PAGO1', width: 70},
                                    {text: 'Payment2', dataIndex: 'FORMA_PAGO2', width: 70},
                                    {text: 'Payment3', dataIndex: 'FORMA_PAGO3', width: 70},
                                    {text: 'Payment4', dataIndex: 'FORMA_PAGO4', width: 70},
                                    {text: 'Description', dataIndex: 'DESCRIPCION', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Fare', dataIndex: 'TARIFA', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Fee', dataIndex: 'FEE', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Total <br> amount', dataIndex: 'FEE', width: 120, renderer: 'IMPORTE_TOTAL'}
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idSpainInvoice + '-pagginator-legend',
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
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idSpainInvoice + '-lbl-total',
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

