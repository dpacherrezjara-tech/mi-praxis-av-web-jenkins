
prototype.idADJMassive = 'ADJMassiveaccountingForm';
prototype.idADJLoadADJMassive = 'LoadADJMassiveaccountingSubiArchivo';
prototype.idDataEntryADJMassive = 'DataEntryADJMassive';
prototype.url = CONTEXTPATH + '/ADJMassiveaccountingForm';
prototype.widthWindow = 1400;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.sales.ADJMassiveaccountingForm.ADJMassiveaccountingForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ADJMassiveaccountingForm',

    requires: [
        'Ext.Praxis.controller.sales.ADJMassiveaccountingForm.ADJMassiveaccountingFormController',
        'Ext.Praxis.view.sales.ADJMassiveaccountingForm.LoadADJMassiveaccountingSubiArchivo',
        'Ext.Praxis.view.sales.ADJMassiveaccountingForm.DataEntryADJMassive'
    ],

    controller: 'ADJMassiveaccountingFormController',

    id: prototype.idADJMassive + '-Contenedor',

    defaults: {
        border: false
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.idADJMassive + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idADJMassive + '-contenedor-options',
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
                                    id: prototype.idADJMassive + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idADJMassive + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idADJMassive + '-lbl-currentPage',
                                        prototype.idADJMassive + '-lbl-pageCount',
                                        prototype.idADJMassive + '-lbl-total'
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
                                    id: prototype.idADJMassive + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJMassive + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJMassive + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJMassive + '-btnAdd',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Load Excel Massive Debit',
                                    listeners: {
                                        click: 'winDataNewEntry'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJMassive + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Change massive states',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJMassive + '-btn-clear',
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
                    id: prototype.idADJMassive + '-contenedor-filters',
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
                            id: prototype.idADJMassive + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idADJMassive + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idADJMassive + '-txtCia',
                                            fieldLabel: 'Ticket',
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 100,
                                            value:'139'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idADJMassive + '-txtFrmaSerie',
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
                                            id: prototype.idADJMassive + '-txtSeq',
                                            hideLabel: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idADJMassive + '-txtFilterDateFrom',
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
                                            id: prototype.idADJMassive + '-txtFilterDateTo',
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
                                            id: prototype.idADJMassive + '-Audit',
                                            fieldLabel: 'User',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idADJMassive + '-CmbTransaction',
                                            fieldLabel: 'Tran',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 180,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idADJMassive + '-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 165,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idADJMassive + '-ComboSource',
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
                                                afterrender: 'onCmbSourceAfterRender',
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
                            id: prototype.idADJMassive + '-gridData',
                            width: 1400,
                            height: 480,
                            columnLines: true,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {
                                        if (String(Ext.String.trim(record.get('A3344FLAG'))) === 'INITIAL') {
                                            return true;
                                        } else {
                                            return false;
                                        }


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
                                    {text: 'Ticket', dataIndex: 'A3344TKT', width: 95},
                                    {text: 'Cpn', dataIndex: 'A3344CPN', width: 35},
                                    {text: 'ADJ <br> Sec.', dataIndex: 'A3344CCUST', width: 40},
                                    {text: 'Trans.', dataIndex: 'A3344TRNCU', width: 50},
                                    {text: 'System <br>date', dataIndex: 'A3344FECIN', width: 70},
                                    {text: 'Local Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Debit', dataIndex: 'A3344DBLOC', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Credit', dataIndex: 'A3344CRLOC', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Net', dataIndex: 'SQUARELOC', width: 80, renderer: 'onColumnNetoRenderer'}
                                        ]
                                    },
                                    {text: 'Revenue Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Debit', dataIndex: 'A3344DBREV', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Credit', dataIndex: 'A3344CRREV', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Net', dataIndex: 'SQUAREREV', width: 80, renderer: 'onColumnNetoRenderer'}
                                        ]
                                    },
                                    {text: 'Adj <br>IATA', width: 70, dataIndex: 'A3344IATAU'},
                                    {text: 'Country', width: 60, dataIndex: 'A3344PAIS'},
                                    {text: 'Source', width: 60, dataIndex: 'A3344FUENT'},
                                    {text: 'Description', dataIndex: 'A3344DESCR', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'User', width: 80, dataIndex: 'A3344USRIN'},
                                    {text: 'Processed', dataIndex: 'A3344FLAG', width: 80, renderer: 'onRendererColumnStatus'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: '',
                                        width: 30,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detail',
                                                handler: 'onDetailClick'
                                            }
                                        ]
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: '',
                                        width: 30,
                                        align: 'center',
                                        items: [
                                            {
                                                icon: 'resources/img/botones/restricted_folder_symbol_stop-16.png',
                                                tooltip: 'Delete',
                                                handler: 'onDeleteClick'
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
                },
                {
                    xtype: 'panel',
                    id: prototype.idADJMassive + '-pagginator-legend',
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
                                    id: prototype.idADJMassive + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idADJMassive + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idADJMassive + '-lbl-total',
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

