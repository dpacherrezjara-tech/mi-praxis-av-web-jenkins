
prototype.idADJUsesForm = 'ADJUsesForm';
prototype.idDetailADJUsesForm = 'DetailADJUsesForm';
prototype.url = CONTEXTPATH + '/ADJUses';
prototype.widthWindow = 1300;
prototype.heightWindow = 800;

Ext.define('Ext.Praxis.view.sales.ADJUsesForm.ADJUsesForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ADJUsesForm',
    requires: [
        'Ext.Praxis.controller.sales.ADJUses.ADJUsesController',
        'Ext.Praxis.view.sales.ADJUsesForm.DataEntry'
    ],
    controller: 'ADJUsesController',
    id: prototype.idADJUsesForm + '-Contenedor',
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
    items: [
        {
            xtype: 'panel',
            id: prototype.idADJUsesForm + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idADJUsesForm + '-contenedor-options',
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
                                    id: prototype.idADJUsesForm + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    disabled: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idADJUsesForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idADJUsesForm + '-lbl-currentPage',
                                        prototype.idADJUsesForm + '-lbl-pageCount',
                                        prototype.idADJUsesForm + '-lbl-total'
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
                                    id: prototype.idADJUsesForm + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJUsesForm + '-btnAdd',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'New',
                                    listeners: {
                                        click: 'btnAdd_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJUsesForm + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJUsesForm + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Change massive states',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-delete_List',
                                    icon: 'resources/img/icon/delete.png',
                                    tooltip: 'Delete massive states',
                                    listeners: {
                                        click: 'img_clickHandler_delete_List'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idADJUsesForm + '-btn-clear',
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
                    id: prototype.idADJUsesForm + '-contenedor-filters',
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
                            id: prototype.idADJUsesForm + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idADJUsesForm + '-box-filter-01',
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
                                            id: prototype.idADJUsesForm + '-cmbSearch',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 275,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idADJUsesForm + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idADJUsesForm + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCia',
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
                                            id: prototype.id + '-txtFrmaSerie',
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
                                            id: prototype.id + '-txtSeq',
                                            hideLabel: true,
                                            width: 30,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idADJUsesForm + '-txtIATA',
                                            fieldLabel: 'IATA',
                                            width: 100,
                                            labelWidth: 50,
                                            enableKeyEvents: true,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idADJUsesForm + '-CmbProcessed',
                                            fieldLabel: 'Processed',
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
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idADJUsesForm + '-CmbTransaction',
                                            fieldLabel: 'Transaction',
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
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender'
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
                            id: prototype.idADJUsesForm + '-grid',
                            width: prototype.widthWindow,
                            height: 490,
                            columnLines: true,
                            resizable: false,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {

                                        if (!record.data.VP_FlagDisabled) {
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
                                    sortable: true,
                                    resizable: false,
                                    align: 'center'
                                },
                                items: [
                                    /*{text: 'Select', width: 80, xtype: 'checkcolumn', dataIndex: 'VP_Flag',
                                     renderer: function (value, meta, record, row, col) {
                                     
                                     var me = this;
                                     
                                     if (!record.data.VP_FlagDisabled) {
                                     meta['tdCls'] = 'x-item-disabled';
                                     } else {
                                     meta['tdCls'] = '';
                                     }
                                     return new Ext.ux.CheckColumn().renderer(value);
                                     }
                                     },*/
                                    //{text: 'Select', width: 80, xtype: 'checkcolumn', dataIndex: 'VP_Flag', renderer: 'onRenderercheckcolumn'},
                                    {text: 'Ticket', width: 100, dataIndex: 'A2024CODER'},
                                    {text: 'Coupon', width: 70, dataIndex: 'A2024CUPON',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                            var coupon = record.data.A2024CUPON;
                                            if (coupon === '0') {
                                                return '';
                                            } else {
                                                return value;
                                            }
                                        }
                                    },
                                    {text: 'ADJ Sec', width: 80, dataIndex: 'SEQ'},
                                    {text: 'Transaction', width: 100, dataIndex: 'VP_TTRAX', renderer: 'onRendererColumnTransaction'},
                                    {text: 'ADJ Dat', width: 100, dataIndex: 'A2024FECIN'},
                                    {text: 'Processed', width: 100, dataIndex: 'A2024ESTADO', renderer: 'onRendererColumnStatus'},
                                    {text: 'Adj IATA', width: 90, dataIndex: 'A2024IATAUSU'},
                                    {text: 'Group TRNC', width: 100, dataIndex: 'GRUPO'},
                                    {text: 'Sale Date', width: 100, dataIndex: 'A2024FECVTA'},
                                    {text: 'Card Type', width: 70, dataIndex: 'A2024TTARJ'},
                                    {text: 'Card Number', width: 150, dataIndex: 'A2024NTARJ'},
                                    {text: 'RFIC', width: 70, dataIndex: 'A2024RFIC'},
                                    {text: 'RFIS', width: 70, dataIndex: 'A2024RFIS'},
                                    {text: 'VRICOC', width: 70, dataIndex: 'A2024VRICOC', xtype: 'numbercolumn', format: '0,000.00'},
                                    {text: 'Description', width: 140, dataIndex: 'A2024DESCRIP', renderer: 'onRendererColumnAgency'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: 'Edit',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    }/*,
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: 'Delete',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                icon: 'resources/img/botones/restricted_folder_symbol_stop-16.png',
                                                tooltip: 'Delete',
                                                handler: 'onDeleteClick'
                                            }
                                        ]
                                    }*/



                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idADJUsesForm + '-pagginator-legend',
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
                                    id: prototype.idADJUsesForm + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idADJUsesForm + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idADJUsesForm + '-lbl-total',
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



