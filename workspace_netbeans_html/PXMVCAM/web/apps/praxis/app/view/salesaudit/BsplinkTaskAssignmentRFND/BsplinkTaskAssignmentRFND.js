
prototype.id = 'BsplinkTaskAssignmentRFND';
prototype.url = CONTEXTPATH + '/BsplinkTaskAssignmentRFND';
prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
prototype.widthContenedor = 1100;
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.salesaudit.BsplinkTaskAssignmentRFND.BsplinkTaskAssignmentRFND', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.BsplinkTaskAssignmentRFND',

    requires: [
        'Ext.Praxis.controller.salesaudit.BsplinkTaskAssignmentRFND.BsplinkTaskAssignmentRFNDController',
    ],

    controller: 'BsplinkTaskAssignmentRFNDController',

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
            width: prototype.widthContenedor,
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
                            hidden: true,
                            defaults: {
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items: [
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
                                    id: prototype.id + '-btn-back',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
                                    hidden: true,
                                    listeners: {
                                        click: 'onBackClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-save',
                                    iconCls: 'prx-icon-image-update',
                                    tooltip: 'Change Auditor',
                                    hidden: true,
                                    listeners: {
                                        click: 'onChangeAuditorClick'
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
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.id + '-search-type',
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
                                            id: prototype.id + '-txtIATA',
                                            width: 100,
                                            hideLabel: true,
                                            enableKeyEvents: true,
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCia',
                                            hideLabel: true,
                                            width: 35,
                                            hidden: true,
                                            value: '139'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFrmaSerie',
                                            hideLabel: true,
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNumber',
                                            hideLabel: true,
                                            width: 80,
                                            hidden: true,
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    hidden: false,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-cmbCountry',
                                            fieldLabel: 'Country',
                                            labelWidth: 50,
                                            width: 110,
                                             maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            listeners: {
                                               specialkey: 'onSearchkey',
                                               change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtUser',
                                            fieldLabel: 'Auditor',
                                            queryMode: 'local',
                                            displayField: 'A3389REGAS',
                                            valueField: 'A3389REGAS',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtUser2', hidden: true,
                                            fieldLabel: 'New Auditor',
                                            queryMode: 'local',
                                            displayField: 'A3389REGAS',
                                            valueField: 'A3389REGAS',
                                            width: 200,
                                            labelWidth: 80,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
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
                            id: prototype.id + '-gridPediente',
                            columnLines: true,
                            autoScroll: true,
                            width: 800,
                            height: 480,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'Date',
                                        dataIndex: 'A3389FAPPI',
                                        flex: 1,
                                        renderer: 'OnColumnAuditorRenderer'
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        flex: 1,
                                        align: 'left'
                                    },
                                    {
                                        text: 'Pending',
                                        dataIndex: 'A3389CANTPEDI',
                                        flex: 1,
                                        align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: 'OnPendingColumnSummary'
                                    },
                                    {
                                        text: 'Processed',
                                        dataIndex: 'A3389CANTPROC',
                                        flex: 1,
                                        align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: 'OnProcessedColumnSummary'
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                // trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            },
                            listeners: {
                                afterrender: 'OnLoadDataPendienteAfterrender'
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridcabiatas',
                            columnLines: true,
                            autoScroll: true,
                            hidden: true,
                            width: 800,
                            height: 480,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        flex: 1
                                    },
                                    {
                                        text: 'Date of Assignment',
                                        dataIndex: 'A3389FREAS',
                                        flex: 1
                                    },
                                    {
                                        text: 'Country',
                                        dataIndex: 'A3389PAIS',
                                        flex: 1,
                                        renderer: 'OnColumnCountryRenderer'
                                    },
                                    {
                                        text: 'Pending',
                                        dataIndex: 'A3389CANTPEDI',
                                        flex: 1
                                    },
                                    {
                                        text: 'Processed',
                                        dataIndex: 'A3389CANTPROC',
                                        flex: 1,
                                        summaryType: 'sum',
                                        summaryRenderer: 'OnProcessedColumnSummary'
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDETALLE',
                            columnLines: true,
                            autoScroll: true,
                            hidden: true,
                            width: 900,
                            height: 480,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {
                                        if (!record.get('CHK')) {
                                            return false;
                                        } else {
                                            return true;
                                        }


                                    }
                                }

                            },
                            /*selModel: {
                             selType: 'checkboxmodel',
                             showHeaderCheckbox: false,
                             listeners: {
                             beforeselect: function(grid, record) {
                             if (!record.get('CHK')) {
                             return false;
                             }
                             }
                             }
                             },*/
                            /*selModel: {
                             selType: 'checkboxmodel',
                             selectable: function (record) {
                             // return record.get('A3389NUMER') == '0994747594' ? true : false;
                             
                             if(record.get('CHK')){
                             return false;
                             }else{
                             return true;
                             }
                             //return record.get('CHK')=== 'true' ? true : false;
                             
                             //return record.get('CHK') ? false : false;
                             }
                             },*/
                            columns: {
                                items: [
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        flex: 1
                                    },
                                    {
                                        text: 'Document',
                                        dataIndex: 'A3389NUMER',
                                        flex: 1
                                    },
                                    {
                                        text: 'Country',
                                        dataIndex: 'A3389PAIS',
                                        flex: 1
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3389FLAG',
                                        flex: 1
                                    },
                                    {
                                        text: 'Date of Assignment',
                                        dataIndex: 'A3389FREAS',
                                        flex: 1
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                trackOver: false,
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
                    hidden: true,
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

