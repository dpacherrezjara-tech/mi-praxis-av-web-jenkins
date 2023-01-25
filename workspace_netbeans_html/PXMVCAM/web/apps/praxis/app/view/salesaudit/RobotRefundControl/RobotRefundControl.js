
prototype.id = 'RobotRefundControl';
prototype.url = CONTEXTPATH + '/RobotRefundControl';
prototype.widthContenedor = 1250;
prototype.heightContenedor = 700;

Ext.define('Ext.Praxis.view.salesaudit.RobotRefundControl.RobotRefundControl', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RobotRefundControl',
    requires: [
        'Ext.Praxis.controller.salesaudit.RobotRefundControl.RobotRefundControlController'
    ],
    controller: 'RobotRefundControlController',
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
    listeners:{
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
                        /*{
                         xtype: 'panel',
                         layout: 'hbox',
                         border: false,
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
                         },*/
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
                                    //icon: 'img/botones/back.png',
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
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
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
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
                                            value: new Date(),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-country',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change:'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboRobot',
                                            fieldLabel: 'Robot',
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
                                                afterrender: 'onCmbRobotAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatus',
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
                            width: 1000,
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
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    { text: 'System <br> date', dataIndex: 'A3388FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Robot', dataIndex: 'A3388ROBOT', width: 250, sortable: false, align: 'center'},
                                    {text: 'Channel', dataIndex: 'A3388CHANEL', width: 60, sortable: false, align: 'center'},
                                    {text: 'Country', dataIndex: 'A3388PAIS', width: 80, align: 'center',renderer: 'onRendererColumnOnPais'},
                                    {text: 'Total', dataIndex: 'A3388CANTI', width: 120, align: 'right',
                                        cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return 'Total ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {text: 'Processed', dataIndex: 'A3388COUNT', width: 100, align: 'right',
                                        //cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return 'Processed ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A3388FLAG', width: 200, sortable: false, align: 'right'
                                    },
                                     {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnTime'
                                    }

                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetalle',
                            width: prototype.widthContenedor,
                            hidden: true,
                            height: prototype.heightContenedor,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Channel', dataIndex: 'A3388CHANEL', width: 60, sortable: false, align: 'center'},
                                    {
                                        text: 'Document', dataIndex: 'A3388NUMER', align: 'center', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'A3388TKT', align: 'center', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Agent', dataIndex: 'A3388IATA', align: 'center', width: 80, sortable: false
                                    },
                                    {
                                        text: 'Application <br> date', dataIndex: 'A3388FAPPI', align: 'center', width: 80, sortable: false
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A3388PAIS', align: 'center', width: 80, sortable: false
                                    },
                                    {text: 'Currency', dataIndex: 'A3388MDA', width: 80, align: 'center'},
                                    {
                                        text: 'Fare', dataIndex: 'A3388TARIF', width: 80, sortable: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {text: 'Audit', dataIndex: 'A3388REGAS', width: 100, align: 'right'},
                                    {text: 'Days', dataIndex: 'A3388DIAS', width: 50, align: 'center'},
                                    {text: 'Status audit', dataIndex: 'A3388STATO', width: 170, align: 'right'},
                                    {text: 'Status', dataIndex: 'A3388FLAG', width: 200, align: 'right'},
                                    {text: '', dataIndex: 'A3388FLAG', width: 40, align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value === 'ASSIGNED TO THE AUDITOR' || value === 'REJECTED' || value === 'AUTHORISED' || value === 'UNDER INVESTIGATION') {
                                                return '<img src="resources/img/semaforo/Circle_Green.png" />';
                                            } else if (value === 'CHANGE FOR ANOTHER') {
                                                return '<img src="resources/img/semaforo/Circle_Yellow.png" />';
                                            } else if (value === 'REJECTED') {
                                                return '<img src="resources/img/semaforo/Circle_Yellow.png" />';
                                            } else if (value === 'PENDING') {
                                                return '<img src="resources/img/semaforo/Circle_Orange.png" />';
                                            } else if (value === 'PREVIOUSLY DOWNLOADED') {
                                                return '<img src="resources/img/semaforo/Circle_Silver.png" />';
                                            } else {
                                                return '<img src="resources/img/semaforo/Circle_Red.png" />';
                                            }

                                        }
                                    }



                                ]
                            }, viewConfig: {
                               // trackOver: false,
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

