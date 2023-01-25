
prototype.id = 'ConciliationStatus';
prototype.url2 = CONTEXTPATH + '/ConciliationStatus';
prototype.url = CONTEXTPATH + '/ChangeOfStatusForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.ConciliationStatus.ConciliationStatus',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.ConciliationStatus',

    requires:[
        'Ext.Praxis.controller.salesaudit.ConciliationStatus.ConciliationStatusController',
    ],

    controller: 'ConciliationStatusController',

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
    items: [{
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
             width: 1360,
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
                                        click: 'imgSearch_clickHandler'
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
                                }, {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.id + '-btn-back',
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
                                                change: 'onCmbChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtLote',
                                            fieldLabel: 'Lote',
                                            labelWidth: 50,
                                            width: 300,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: new Date(),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: new Date(),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Type',
                                            id: prototype.id + '-Cmbtype',
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
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbOrigen',
                                            fieldLabel: 'Origin', //readOnly: true,
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
                                                afterrender: 'onCmbStatusOrigen'
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
                            width: 980,
                            height: 600,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System <br> date', dataIndex: 'A3676FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Lote', dataIndex: 'A3676LOTE', width: 150, align: 'left', renderer: 'onRendererColumnOnLote'},
                                    {text: 'Origin', dataIndex: 'A3676ORIG', width: 100, sortable: true, align: 'center'},
                                    {text: 'Total Send <br> TKT', dataIndex: 'A3676TETKT', width: 100, sortable: true, align: 'right'},
                                    {text: 'Total Send <br> CPN', dataIndex: 'A3676TECPN', width: 100, sortable: true, align: 'right'},
                                    {text: 'Total Answer <br> TKT', dataIndex: 'A3676TECPN', width: 100, sortable: true, align: 'right'},
                                    {text: 'Total Answer <br> CPN', dataIndex: 'A3676TRCPN', width: 100, sortable: true, align: 'right'},
                                    {text: 'Status',dataIndex: 'A3676STROB',width: 215,renderer: 'onRendererColumnStatus'}

                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetalle',
                             width: 1360,
                            hidden: true,
                            height: 500,
                            columnLines: true,
                             autoScroll: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Origin',
                                        dataIndex: 'A3676ORIG',
                                        width: 100
                                    },
                                    {
                                        text: 'System </br>date',
                                        dataIndex: 'A3676FREGI',
                                        width: 80
                                    },
                                    {
                                        text: 'Processing </br> date',
                                        dataIndex: 'A3676FRECE',
                                        width: 80
                                    },
                                    {text: 'Praxis',
                                        columns: [
                                            {text: 'Ticket', dataIndex: 'A3676TIKET',width: 100},
                                            { text: 'CPN',dataIndex: 'A3676CUPON',width: 40},
                                            {text: 'Cur.',dataIndex: 'A3676CUR',width: 40},
                                            {text: 'Net.',dataIndex: 'A3676MONTO',width: 70,align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return win.formatDblNumber(value);
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Robot',
                                        columns: [
                                             {text: 'Ticket', dataIndex: 'A3676TKT',width: 100},
                                             { text: 'CPN',dataIndex: 'A3676CPNRB',width: 40},
                                             {text: 'Cur.',dataIndex: 'A3676CURRB',width: 40},
                                             {text: 'Net.',dataIndex: 'A3676MONRB',width: 70,align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return win.formatDblNumber(value);
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3676STROB',
                                        width: 200,
                                         renderer: 'onRendererColumnStatus'
                                    },
                                    {
                                        text: 'Lote',
                                        dataIndex: 'A3676NARCH',
                                        width: 300,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                    {
                                        text: 'Hour',
                                        dataIndex: 'A3676HRECE',
                                        width: 70
                                    }
                                   
                                ]
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataControl',
                            columnLines: true,
                            autoScroll: true,
                            width: 1050,
                            height: 600,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System <br> date', dataIndex: 'A3676FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Lote', dataIndex: 'A3676NARCH', width: 200, align: 'left'},
                                    {text: 'Origin', dataIndex: 'A3676ORIG', width: 100, sortable: true, align: 'center'},
                                    {text: 'Total <br> Praxis', dataIndex: 'A3676CNTAM', width: 100, sortable: true, align: 'right'},
                                    {text: 'Total <br> Robot', dataIndex: 'A3676CNTPR', width: 100, sortable: true, align: 'right'},
                                    {text: 'Status',dataIndex: 'A3676STROB',width: 215,renderer: 'onRendererColumnStatusContr'},
                                    {text: 'Hour <br> Initial', dataIndex: 'A3676HREGI',width: 70},
                                    {text: 'Hour end', dataIndex: 'A3676HREVI',width: 70},
                                    {text: '', dataIndex: 'A3676STROB', width: 40, align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value === 'Running') {
                                                return '<img src="resources/img/botones/loading.gif" />';
                                            } else if (value === 'Processed') {
                                                return '<img src="resources/img/botones/imgclock_complete.png" />';
                                            } else {
                                                return '<img src="resources/img/botones/warning.png" />';
                                            }

                                        }
                                    }

                                ]
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
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-totalDeta',
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


