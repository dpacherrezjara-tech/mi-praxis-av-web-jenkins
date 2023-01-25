/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
prototype.idadj = 'ADJAccountingForm';
prototype.idbrowser= '-browser-tkt';
prototype.url = CONTEXTPATH + '/ADJAccounting';
prototype.widthContenedor = 1400;
prototype.heightContenedor = 605;
Ext.define('Ext.Praxis.view.sales.ADJAccountingForm.ADJAccountingForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ADJAccountingForm',
    requires: [
        'Ext.Praxis.controller.sales.ADJAccounting.ADJAccountingController',
        'Ext.Praxis.view.sales.ADJAccountingForm.DataEntryNew'
    ],
    controller: 'ADJAccountingController',
    id: prototype.idadj + '-Contenedor',
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
            id: prototype.idadj + '-contenedor-form',
            width: prototype.widthContenedor,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idadj + '-contenedor-options',
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
                                    id: prototype.idadj + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idadj + '-lbl-currentPage',
                                        prototype.idadj + '-lbl-pageCount',
                                        prototype.idadj + '-lbl-total'
                                    ]
                                }
                            ]
                        },{xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idadj + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idadj + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idadj + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idadj + '-btnAdd',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'New',
                                    listeners: {
                                        click: 'winDataNewEntry'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idadj + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Change massive states',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idadj + '-btn-clear',
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
                    id: prototype.idadj + '-contenedor-filters',
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
                            id: prototype.idadj + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idadj + '-box-filter-01',
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
                                            id: prototype.idadj + '-search-by',
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
                                            xtype: 'datefield',
                                            id: prototype.idadj + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idadj + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idadj + '-txtCia',
                                            hideLabel: true,
                                            width: 35,
                                            maskRe: /[0-9]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            value: '139',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idadj + '-txtFrmaSerie',
                                            hideLabel: true,
                                            width: 80,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idadj + '-txtSeq',
                                            hideLabel: true,
                                            width: 30,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idadj + '-txtIATA',
                                            width: 100,
                                            fieldLabel: 'IATA',
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
                                            labelWidth: 30,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idadj + '-Audit',
                                            fieldLabel: 'Audit',
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
                                            id: prototype.idadj + '-CmbProcess',
                                            fieldLabel: 'Processed',
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
                                            id: prototype.idadj + '-CmbTransaction',
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
                            id: prototype.idadj + '-gridData',
                            width: 1390,
                            height: 480,
                            columnLines: true,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {

                                        if (Ext.String.trim(record.get('A2024ESTADO')) === 'IN') {
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
                                    {text: 'Ticket', dataIndex: 'A2024CODER', width: 100},
                                    {text: 'Cpn', dataIndex: 'A2024CUPON', width: 35},
                                    {text: 'ADJ <br> Sec.', dataIndex: 'SEQ', width: 40},
                                    {text: 'Trans.', dataIndex: 'VP_TTRAX', width: 50, renderer: 'onRendererColumnTransa'},
                                    {text: 'Trnc. Date', dataIndex: 'A2024FECPRO', width: 70},
                                    {text: 'Processed', dataIndex: 'A2024ESTADO', width: 80, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'Local Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Debit', dataIndex: 'DEBLOC', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Credit', dataIndex: 'CRELOC', width: 80, renderer: 'onColumnAmountRenderer'},
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
                                            {text: 'Debit', dataIndex: 'DEBREV', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Credit', dataIndex: 'CREREV', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Net', dataIndex: 'SQUARE', width: 80, renderer: 'onColumnNetoRenderer'}
                                        ]
                                    },
                                    {text: 'Accounting',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'ID', dataIndex: 'A1541IDCON', width: 80},
                                            {text: 'Date', dataIndex: 'A1541FCONT', width: 80}
                                        ]
                                    },
                                    {text: 'Adj <br>IATA', width: 70, dataIndex: 'A2024IATAUSU'},
                                    {text: 'Source', width: 70, dataIndex: 'A2024FUENT'},
                                    {text: 'S. Source', width: 70, dataIndex: 'A2024SFUEN'},
                                    {text: 'Grup. <br> TRNC', width: 70, dataIndex: 'GRUPO'},
                                    {text: 'Sales <br> Date', width: 70, dataIndex: 'A2024FECVTA'},
                                    {text: 'Card <br> Type', width: 70, dataIndex: 'A2024TTARJ'},
                                    {text: 'Card <br> Number', width: 70, dataIndex: 'A2024NTARJ'},
                                    //{text: 'RFIC', width: 70, dataIndex: 'A2024RFIC'},
                                    //{text: 'RFIS', width: 70, dataIndex: 'A2024RFIS'},
                                    //{text: 'Vricoc', dataIndex: 'A2024VRICOC', width: 65, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Description', dataIndex: 'A2024DESCRIP', width: 150, renderer: 'onRendererColumnAttr'},
                                    //{text: 'RFIS', width: 70, dataIndex: 'A2024RFIS'},
                                    {text: 'Audit', width: 80, dataIndex: 'A2024USRIN'},
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
                    id: prototype.idadj + '-pagginator-legend',
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
                                    id: prototype.idadj + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idadj + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idadj + '-lbl-total',
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

