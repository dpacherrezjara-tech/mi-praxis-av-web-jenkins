
prototype.idRefunddirectsale = 'RefunddirectsaleForm';
prototype.url = CONTEXTPATH + '/RefunddirectsaleForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;
 
Ext.define('Ext.Praxis.view.salesaudit.RefunddirectsaleForm.RefunddirectsaleForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RefunddirectsaleForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RefunddirectsaleForm.RefunddirectsaleFormController',
    ],

    controller: 'RefunddirectsaleFormController',

    id: prototype.idRefunddirectsale + '-Contenedor',

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
            id: prototype.idRefunddirectsaleLoadticket + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRefunddirectsaleLoadticket + '-contenedor-options',
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
                                    xtype: 'checkbox',
                                    id: prototype.idRefunddirectsaleLoadticket + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idRefunddirectsaleLoadticket + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idRefunddirectsaleLoadticket + '-lbl-currentPage',
                                        prototype.idRefunddirectsaleLoadticket + '-lbl-pageCount',
                                        prototype.idRefunddirectsaleLoadticket + '-lbl-total'
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
                                    id: prototype.idRefunddirectsaleLoadticket + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddirectsaleLoadticket + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddirectsaleLoadticket + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddirectsaleLoadticket + '-btn-clear',
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
                    id: prototype.idRefunddirectsaleLoadticket + '-contenedor-filters',
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
                            id: prototype.idRefunddirectsaleLoadticket + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRefunddirectsaleLoadticket + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Processing By',
                                            id: prototype.idRefunddirectsaleLoadticket + '-search-type',
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
                                            xtype: 'combo',
                                            fieldLabel: 'Country',
                                            id: prototype.idRefunddirectsaleLoadticket + '-cmbcountry',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',hidden:true,
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 50,
                                            width: 150,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender2'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRefunddirectsaleLoadticket + '-txtFilterDateFrom',
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
                                            id: prototype.idRefunddirectsaleLoadticket + '-txtFilterDateTo',
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
                                        },
                                         {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'button',
                                            text:'Processing Data',          
                                            id: prototype.idRefunddirectsaleLoadticket + '-btn-processingdata',
                                            iconCls: 'prx-icon-processing',
                                            tooltip: 'Processing Data',
                                            listeners: {
                                                click: 'Processing_clickHandler'
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
                            id: prototype.idRefunddirectsaleLoadticket + '-gridsale',
                            columnLines: true,
                            autoScroll: true,
                            width: 1360,
                            height: 520,
                            columns: {
                                items: [
                                    {text: 'Cia', dataIndex: 'A2554CIAI', width: 30},
                                    {text: 'Forma', dataIndex: 'A2554FRMAI', width: 50},
                                    {text: 'Serie', dataIndex: 'A2554SRIEI', width: 60},
                                    {text: 'Sale <br>Date', dataIndex: 'A2554FVTA', width: 60},
                                    {text: 'Trans.', dataIndex: 'A2554TRNCU', width: 50},
                                    {text: 'Iata', dataIndex: 'A2554AGTIA', width: 60, align: 'left'},
                                    {text: 'Agent', dataIndex: 'A2554AGENT', width: 55, align: 'left', renderer: 'onRendererColumn'},
                                    {text: 'Commision', dataIndex: 'A2554COMTO', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
                                    {text: 'Currency<br>Commision', dataIndex: 'A2554MCOM', width: 80, align: 'center'},
                                    {text: 'Over<br>Commision', dataIndex: 'A2554SCMTO', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
                                    {text: 'Currency<br>over Commision', dataIndex: 'A2554SMCOM', width: 80, align: 'center'},
                                    {text: 'Tax On<br> Commision', dataIndex: 'A2554TTXC', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
                                    {text: 'Form of<br> Payment', dataIndex: 'A2554CFOP', width: 80, align: 'center'},
                                    {text: 'Card <br>Type', dataIndex: 'A2554TTARJ', width: 60, align: 'center'},
                                    {text: 'Card <br>number', dataIndex: 'A2554NREF', width: 90, align: 'left'},
                                    {text: 'Class 1', dataIndex: 'A2554CLAS1', width: 30, align: 'center'},
                                    {text: 'Class 2', dataIndex: 'A2554CLAS2', width: 30, align: 'center'},
                                    {text: 'Class 3', dataIndex: 'A2554CLAS3', width: 30, align: 'center'},
                                    {text: 'Class 4', dataIndex: 'A2554CLAS4', width: 30, align: 'center'},
                                    {text: 'Farebasis 1', dataIndex: 'A2554FBAS1', width: 60, align: 'center'},
                                    {text: 'Farebasis 2', dataIndex: 'A2554FBAS2', width: 60, align: 'center'},
                                    {text: 'Farebasis 3', dataIndex: 'A2554FBAS3', width: 60, align: 'center'},
                                    {text: 'Farebasis 4', dataIndex: 'A2554FBAS4', width: 60, align: 'center'},
                                    {text: 'Itinerary', dataIndex: 'ITINERARIO', width: 70, align: 'left'},
                                    {text: 'sale <br>country', dataIndex: 'A2554PVTA', width: 70, align: 'center'},
                                    {text: 'Administrative <br>charge', dataIndex: 'A2554CHARG', width: 70, align: 'right'},
                                    {text: 'Iva<br>charge', dataIndex: 'A2554IVACH', width: 70, align: 'right'},
                                    {text: 'Neto', dataIndex: 'A2554NETO', width: 65, align: 'right'}



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
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idRefunddirectsaleLoadticket + '-gridexch1',
                            columnLines: true,
                            autoScroll: true,
                            width: 1360,
                            height: 520,
                            columns: {
                                items: [

                                    {text: 'EXCH1',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'New Issued',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Cia', dataIndex: 'A2556CIAI', width: 30},
                                                    {text: 'Forma', dataIndex: 'A2556FRMAI', width: 50},
                                                    {text: 'Serie', dataIndex: 'A2556SRIEI', width: 60},
                                                    {text: 'Sale Date', dataIndex: 'A2556FVTA', width: 50},
                                                    {text: 'Trans.', dataIndex: 'A2556TRNCU', width: 50},
                                                    {text: 'Iata', dataIndex: 'A2556AGTIA', width: 60, align: 'left'},
                                                    {text: 'Agent', dataIndex: 'A2556AGENT', width: 55, align: 'left', renderer: 'onRendererColumn'},
                                                    {text: 'Commision', dataIndex: 'A2556COMIS', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>Commision', dataIndex: 'A2556MCOM', width: 60, align: 'center'},
                                                    {text: 'Over<br>Commision', dataIndex: 'A2556SMCOM', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>over Commision', dataIndex: 'A2554SMCOM', width: 60, align: 'center'},
                                                    {text: 'Tax On<br> Commision', dataIndex: 'A2556TTXC', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Form of<br> Payment', dataIndex: 'A2556CFOP', width: 60, align: 'center'},
                                                    {text: 'Card Type', dataIndex: 'A2556TTARJ', width: 60, align: 'center'},
                                                    {text: 'Card number', dataIndex: 'A2556NREF', width: 90, align: 'left'},
                                                    {text: 'Class 1', dataIndex: 'A2556CLAS1', width: 30, align: 'center'},
                                                    {text: 'Class 2', dataIndex: 'A2556CLAS2', width: 30, align: 'center'},
                                                    {text: 'Class 3', dataIndex: 'A2556CLAS3', width: 30, align: 'center'},
                                                    {text: 'Class 4', dataIndex: 'A2556CLAS4', width: 30, align: 'center'},
                                                    {text: 'Farebasis 1', dataIndex: 'A2556FBAS1', width: 60, align: 'center'},
                                                    {text: 'Farebasis 2', dataIndex: 'A2556FBAS2', width: 60, align: 'center'},
                                                    {text: 'Farebasis 3', dataIndex: 'A2556FBAS3', width: 60, align: 'center'},
                                                    {text: 'Farebasis 4', dataIndex: 'A2556FBAS4', width: 60, align: 'center'},
                                                    {text: 'Itinerary', dataIndex: 'ITINERARIO', width: 70, align: 'left'},
                                                    {text: 'sale <br>country', dataIndex: 'A2556PVTA', width: 70, align: 'center'}
                                                ]
                                            }, {text: 'Original Issued',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Cia', dataIndex: 'A2556CIA2', width: 30},
                                                    {text: 'Forma', dataIndex: 'A2556FRMA2', width: 50},
                                                    {text: 'Serie', dataIndex: 'A2556SRIE2', width: 60},
                                                    {text: 'Sale Date', dataIndex: 'A2556FVTA2', width: 50},
                                                    {text: 'Itinerary', dataIndex: 'ITINERARIORIG', width: 70, align: 'left'},
                                                    {text: 'Commision', dataIndex: 'A2556COMI2', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>Commision', dataIndex: 'A2556SMCO2', width: 60, align: 'center'},
                                                    {text: 'Over<br>Commision', dataIndex: 'A2556TSCM2', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>over Commision', dataIndex: 'A2556MCOM', width: 60, align: 'center'},
                                                    {text: 'Original Tax<br> On Commision', dataIndex: 'A2556TTX2', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'}
                                                ]
                                            },
                                            {text: 'Administrative <br>charge', dataIndex: 'A2556CHARG', width: 70, align: 'right'},
                                            {text: 'Iva<br>charge', dataIndex: 'A2556IVACH', width: 70, align: 'right'},
                                            {text: 'Neto', dataIndex: 'A2556NETO', width: 65, align: 'right'}
                                        ]
                                    }
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
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idRefunddirectsaleLoadticket + '-gridexch2',
                            columnLines: true,
                            autoScroll: true,
                            width: 1360,
                            height: 520,
                            columns: {
                                items: [

                                    {text: 'EXCH1',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'New Issued',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Cia', dataIndex: 'A2557CIAI', width: 30},
                                                    {text: 'Forma', dataIndex: 'A2557FRMAI', width: 50},
                                                    {text: 'Serie', dataIndex: 'A2557SRIEI', width: 60},
                                                    {text: 'Sale Date', dataIndex: 'A2557FVTA', width: 50},
                                                    {text: 'Trans.', dataIndex: 'A2557TRNCU', width: 50},
                                                    {text: 'Iata', dataIndex: 'A2557AGTIA', width: 60, align: 'left'},
                                                    {text: 'Agent', dataIndex: 'A2557AGENT', width: 55, align: 'left', renderer: 'onRendererColumn'},
                                                    {text: 'Commision', dataIndex: 'A2557COMIS', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>Commision', dataIndex: 'A2557MCOM', width: 60, align: 'center'},
                                                    {text: 'Over<br>Commision', dataIndex: 'A2557CTSCM', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>over Commision', dataIndex: 'A2557SMCOM', width: 60, align: 'center'},
                                                    {text: 'Tax On<br> Commision', dataIndex: 'A2557TTXC', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Form of<br> Payment', dataIndex: 'A2557CFOP', width: 60, align: 'center'},
                                                    {text: 'Card Type', dataIndex: 'A2557TTARJ', width: 60, align: 'center'},
                                                    {text: 'Card number', dataIndex: 'A2557NREF', width: 90, align: 'left'},
                                                    {text: 'Class 1', dataIndex: 'A2557CLAS1', width: 30, align: 'center'},
                                                    {text: 'Class 2', dataIndex: 'A2557CLAS2', width: 30, align: 'center'},
                                                    {text: 'Class 3', dataIndex: 'A2557CLAS3', width: 30, align: 'center'},
                                                    {text: 'Class 4', dataIndex: 'A2557CLAS4', width: 30, align: 'center'},
                                                    {text: 'Farebasis 1', dataIndex: 'A2557FBAS1', width: 60, align: 'center'},
                                                    {text: 'Farebasis 2', dataIndex: 'A2557FBAS2', width: 60, align: 'center'},
                                                    {text: 'Farebasis 3', dataIndex: 'A2557FBAS3', width: 60, align: 'center'},
                                                    {text: 'Farebasis 4', dataIndex: 'A2557FBAS4', width: 60, align: 'center'},
                                                    {text: 'Itinerary', dataIndex: 'ITINERARIO', width: 70, align: 'left'},
                                                    {text: 'sale <br>country', dataIndex: 'A2557PVTA', width: 70, align: 'center'}
                                                ]
                                            }, {text: 'Original Issued',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Cia', dataIndex: 'A2557CIA2', width: 30},
                                                    {text: 'Forma', dataIndex: 'A2557FRMA2', width: 50},
                                                    {text: 'Serie', dataIndex: 'A2557SRIE2', width: 60},
                                                    {text: 'Sale Date', dataIndex: 'A2557FVTA2', width: 50},
                                                    {text: 'Itinerary', dataIndex: 'ITINERARIORIG', width: 70, align: 'left'},
                                                    {text: 'Commision', dataIndex: 'A2557COMI2', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>Commision', dataIndex: 'A2557SMCO2', width: 60, align: 'center'},
                                                    {text: 'Over<br>Commision', dataIndex: 'A2557TSCM2', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'},
                                                    {text: 'Currency<br>over Commision', dataIndex: 'A2557MCOM', width: 60, align: 'center'},
                                                    {text: 'Original Tax<br> On Commision', dataIndex: 'A2557TTX2', width: 65, renderer: 'onColumnAmountRenderer', align: 'right'}
                                                ]
                                            },
                                            {text: 'Administrative <br>charge', dataIndex: 'A2557CHARG', width: 70, align: 'right'},
                                            {text: 'Iva<br>charge', dataIndex: 'A2557IVACH', width: 70, align: 'right'},
                                            {text: 'Neto', dataIndex: 'A2557NETO', width: 65, align: 'right'}
                                        ]
                                    }
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
                    id: prototype.idRefunddirectsaleLoadticket + '-pagginator-legend',
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
                                    id: prototype.idRefunddirectsaleLoadticket + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idRefunddirectsaleLoadticket + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idRefunddirectsaleLoadticket + '-lbl-total',
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



