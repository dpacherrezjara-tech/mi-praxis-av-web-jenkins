
prototype.id = 'PendingGroupingForm';
prototype.url = CONTEXTPATH + '/PendingGroupingForm';
prototype.widthWindow = 1200;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.PendingGroupingForm.PendingGroupingForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PendingGroupingForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.PendingGroupingForm.PendingGroupingFormController',
        'Ext.Praxis.view.salesaudit.PendingGroupingForm.DataEntryPendingGroupingForm'
    ],

    controller: 'PendingGroupingFormController',

    id: prototype.id + '-Contenedor',

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
            id: prototype.id + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-options',
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
                                    id: prototype.id + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.id + '-pagginator-01',
                                    pagInfo: [
                                        prototype.id + '-lbl-currentPage',
                                        prototype.id + '-lbl-pageCount',
                                        prototype.id + '-lbl-total'
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
                                    id: prototype.id + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-clear',
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
                    id: prototype.id + '-contenedor-filters',
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
                            id: prototype.id + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search by',
                                            id: prototype.id + '-cbxFiltro',
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
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNumber',
                                            hideLabel: true,
                                            width: 80,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCia',
                                            values: '139',
                                            hideLabel: true,
                                            width: 35,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFrmaSerie',
                                            hideLabel: true,
                                            width: 80,
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
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
                                            id: prototype.id + '-txtFilterDateTo',
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
                                            id: prototype.id + '-txtIATA',
                                            width: 100,
                                            hideLabel: true,
                                            enableKeyEvents: true,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtCountry',
                                            queryMode: 'local',
                                             fieldLabel: 'Country',
                                            displayField: 'USERFIELD',
                                            valueField: 'USERFIELD',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender4',
                                                specialkey: 'onSearchkey'
                                            }
                                        }
                                        
                                        
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-02',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboSource',
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
                                                afterrender: 'onCmbSourceAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAudit',
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
                                            fieldLabel: 'Status',
                                            id: prototype.id + '-CmbStatus',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 600},
                                        {
                                            xtype: 'label',
                                            text: 'Action: ',
                                            style: 'font-weight:bold;',
                                            width: 70,
                                            padding: '10 0'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + 'btn-OK',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">OK</strong>',
                                            scale: 'small',
                                            width: 40,
                                            margin: '2 0 2 0',
                                            listeners: {
                                                click: 'btnOK_clickHandler'
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
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: prototype.widthWindow,
                            height: 480,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {
                                        if (Ext.String.trim(record.get('A3329FLAG')) !== 'Pending') {
                                            return false;
                                        } else {
                                            return true;
                                        }

                                    }
                                }

                            },
                            columns: {
                                items: [
                                    {text: 'System<br>Date', dataIndex: 'A3329FREGI', width: 70},
                                     {text: 'Processing<br>Date', dataIndex: 'A3329FPROC', width: 80},
                                    {text: 'Country', dataIndex: 'A3329PAIS', width: 70},
                                    {text: 'Ticket', dataIndex: 'A3329TIKET', width: 100},
                                    {text: 'IATA', dataIndex: 'A3329IATA', width: 70},
                                    {text: 'Agency', dataIndex: 'A3329NAMEAGEN', width: 180, renderer: 'onRendererColumnAttr'},
                                    {text: 'Source', dataIndex: 'A3329FUETE', width: 60},
                                    {text: 'Cur.', dataIndex: 'A3329CUR', width: 40},
                                    {text: 'Amount', dataIndex: 'A3329NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'User', dataIndex: 'A3329REGIS', width: 90},
                                    {text: 'Grouping', dataIndex: 'A3329CNXPA', width: 100},
                                    {text: 'Processed', dataIndex: 'A3329FLAG', width: 80},
                                    {text: 'Status', dataIndex: 'A3329STATU', width: 80},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 30,
                                        renderer: 'OnColumnStatusRenderer'
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
                    id: prototype.id + '-pagginator-legend',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    hidden: false,
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
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
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


