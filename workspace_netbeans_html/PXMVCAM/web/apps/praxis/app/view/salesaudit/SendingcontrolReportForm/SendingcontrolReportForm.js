
prototype.idSendingcontrol = 'SendingcontrolReportForm';
prototype.url = CONTEXTPATH + '/SendingcontrolReportForm';
prototype.widthWindow = 850;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.SendingcontrolReportForm.SendingcontrolReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SendingcontrolReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.SendingcontrolReportForm.SendingcontrolReportFormController',
    ],

    controller: 'SendingcontrolReportFormController',

    id: prototype.idSendingcontrol + '-Contenedor',

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
            id: prototype.idSendingcontrol + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idSendingcontrol + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 830},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idSendingcontrol + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSendingcontrol + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSendingcontrol + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSendingcontrol + '-btn-ListFiles',
                                    iconCls: 'prx-icon-download',
                                    tooltip: 'download List Files',
                                    listeners: {
                                        click: 'onListFilesClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSendingcontrol + '-btn-File',
                                    iconCls: 'prx-icon-1400209639_24',
                                    tooltip: 'download Files', hidden: true,
                                    listeners: {
                                        click: 'onFileClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idSendingcontrol + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                }, {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.idSendingcontrol + '-btn-back',
                                    tooltip: 'Back',
                                    hidden: true,
                                    listeners: {
                                        click: 'onBackClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idSendingcontrol + '-contenedor-filters',
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
                            id: prototype.idSendingcontrol + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idSendingcontrol + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.idSendingcontrol + '-search-type',
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
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        }, {
                                            xtype: 'datefield',
                                            id: prototype.idSendingcontrol + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idSendingcontrol + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idSendingcontrol + '-box-filter-02',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idSendingcontrol + '-country',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idSendingcontrol + '-CmbStatus',
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
                                            id: prototype.idSendingcontrol + '-CmbType',
                                            fieldLabel: 'Type',
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
                            id: prototype.idSendingcontrol + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: 800,//prototype.widthWindow,
                            height: 600,
                            features: [{
                                    //id: 'group',
                                    ftype: 'groupingsummary',
                                    groupHeaderTpl: '{name}',
                                    hideGroupedHeader: false,
                                    enableGroupingMenu: false
                                }, {
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            selModel: {
                                selType: 'checkboxmodel'
                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System </br>date', dataIndex: 'A3949FREGI', width: 75},
                                    {text: 'Execution </br>date', dataIndex: 'A3949FDATE', width: 75},
                                    {text: 'Country', dataIndex: 'A3949PAIS', width: 80, align: 'center', renderer: 'onRendererColumnOnPais'},
                                    {text: 'Type', dataIndex: 'A3949TYPE', width: 150, align: 'center', renderer: 'onRendererColumn'},
                                    {text: 'Processed', dataIndex: 'A3949COUNT2', width: 100, align: 'right',
                                        //cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return 'Processed ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {text: 'Status', dataIndex: 'A3949DESC', width: 200, sortable: false, align: 'right'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime'}

                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idSendingcontrol + '-gridDetalle',
                            width: 815,
                            hidden: true,
                            height: 600,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System </br>date', dataIndex: 'A3949FREGI', width: 70},
                                    {text: 'Execution </br>date', dataIndex: 'A3949FDATE', width: 70},
                                    {text: 'Country', dataIndex: 'A3949PAIS', width: 70, align: 'center'},
                                    {text: 'Type', dataIndex: 'A3949TYPE', width: 80, align: 'center', renderer: 'onRendererColumn'},
                                    {text: 'Description', dataIndex: 'A3949NOMBR', width: 200, renderer: 'onRendererColumnAttr'},
                                    {text: 'Processed', dataIndex: 'A3949COUNT2', width: 90, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return 'Processed ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {text: 'Status', dataIndex: 'A3949DESC', width: 170, sortable: false, align: 'right'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime'}

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
                        pack: 'left'
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
                                pack: 'left'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 350},
                                {
                                    text: 'Total Records found',
                                    width: 150
                                },
                                {
                                    id: prototype.idSendingcontrol + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {
                                    id: prototype.idSendingcontrol + '-lbl-totalDeta',
                                    text: '0',
                                    width: 50,
                                    hidden: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    ]
});

