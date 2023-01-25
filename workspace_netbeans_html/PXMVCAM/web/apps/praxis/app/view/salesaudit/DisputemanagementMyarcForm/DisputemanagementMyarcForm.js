
prototype.idDisputemanageMyarc = 'DisputemanagementMyarcForm';
prototype.idDisputeGestionMyarc = 'DetailDisputeGestionMyarc';
prototype.idDisputeFileViewerMyarc = 'DisputeFileViewerMyarc';
prototype.url = CONTEXTPATH + '/DisputemanagementMyarcForm';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DisputemanagementMyarcForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.DisputemanagementMyarcForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DisputemanagementMyarcFormController',
        'Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DetailDisputeGestionMyarc',
        'Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DisputeFileViewerMyarc'
    ],
    
    controller: 'DisputemanagementMyarcFormController',
    

    id: prototype.idDisputemanageMyarc + '-Contenedor',

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
            id: prototype.idDisputemanageMyarc + '-contenedor-form',
            width: prototype.widthContenedor,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idDisputemanageMyarc + '-contenedor-options',
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
                                    id: prototype.idDisputemanageMyarc + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idDisputemanageMyarc + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idDisputemanageMyarc + '-lbl-currentPage',
                                        prototype.idDisputemanageMyarc + '-lbl-pageCount',
                                        prototype.idDisputemanageMyarc + '-lbl-total'
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
                                    id: prototype.idDisputemanageMyarc + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDisputemanageMyarc + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDisputemanageMyarc + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDisputemanageMyarc + '-btn-clear',
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
                    id: prototype.idDisputemanageMyarc + '-contenedor-filters',
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
                            id: prototype.idDisputemanageMyarc + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idDisputemanageMyarc + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.idDisputemanageMyarc + '-search-type',
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
                                                afterrender: 'onCmbSearchAfterRender',
                                                select: 'onCmbSearchSelect'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idDisputemanageMyarc + '-txtFilterDateFrom', hidden: true,
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idDisputemanageMyarc + '-txtFilterDateTo', hidden: true,
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-iata', hidden: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-ComboBase', hidden: true,
                                            fieldLabel: 'Base',
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
                                            listeners: {
                                                afterrender: 'onCmbOriginAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-ComboArea', hidden: true,
                                            fieldLabel: 'Area',
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
                                                afterrender: 'onCmbAreaAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-nmemo', hidden: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        }


                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idDisputemanageMyarc + '-box-filter-02', hidden: true,
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 250,
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
                                            id: prototype.idDisputemanageMyarc + '-CmbStatusMyArc',
                                            fieldLabel: 'Status MyArc',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 250,
                                            labelWidth: 110,
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
                                            id: prototype.idDisputemanageMyarc + '-ComboOrigin', hidden: true,
                                            fieldLabel: 'Origin',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 250,
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
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-Audit',
                                            fieldLabel: 'Audit',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            // readOnly: true,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 30,
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey',
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
                            id: prototype.idDisputemanageMyarc + '-gridData',
                            // flex: 1,
                            width: 1300,
                            height: 500,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Origin', dataIndex: 'A4137ORIGE', align: 'center', width: 80},
                                    {text: 'Memo <br> number', dataIndex: 'A4137NMEMO', align: 'center', width: 90},
                                    {text: 'Country', dataIndex: 'A4137PAIS', align: 'center', width: 60},
                                    {text: 'IATA', dataIndex: 'A4137IATA', align: 'center', width: 70},
                                    {text: 'Agency', dataIndex: 'A4137AGEN', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Currency', dataIndex: 'A4137MDA', width: 70, align: 'center'},
                                    {text: 'Amount', dataIndex: 'A4137NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Processing<br>Date', dataIndex: 'A4137FPROC', width: 80},
                                    {text: 'Dispute <br> Date', dataIndex: 'A4137DDATE', align: 'center', width: 100},
                                    {text: 'System <br> Date', dataIndex: 'A4137FREGI', align: 'center', width: 70},
                                    {text: 'Audit', dataIndex: 'A4137USER', width: 90, align: 'right'},
                                    {text: 'Base', dataIndex: 'A4137BASE', align: 'center', width: 80},
                                    {text: 'Area', dataIndex: 'A4137AREA', align: 'center', width: 100},
                                    {text: 'Status', dataIndex: 'A4137FLAG', width: 130, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'Status MyArc', dataIndex: 'A4137STATO', width: 130, sortable: false},
                                    {text: 'Days', dataIndex: 'A4137DIAS', width: 50, align: 'center'},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 40,
                                        renderer: 'onRendererColumnOnTime'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detail',
                                                handler: 'onDetailClick'
                                            }
                                        ]
                                    }



                                ]
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
                                    id: prototype.idDisputemanageMyarc + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idDisputemanageMyarc + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idDisputemanageMyarc + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    text: 'Total ADMs',
                                    width: 80
                                },
                                {
                                    id: prototype.idDisputemanageMyarc + '-lblRowsTotalADM',
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



