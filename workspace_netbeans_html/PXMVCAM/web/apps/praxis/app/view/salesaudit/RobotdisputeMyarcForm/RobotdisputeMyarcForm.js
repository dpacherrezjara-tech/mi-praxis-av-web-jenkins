
prototype.idRobotdisputeMyarc = 'RobotdisputeMyarcForm';
prototype.url = CONTEXTPATH + '/RobotdisputeMyarcForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.RobotdisputeMyarcForm.RobotdisputeMyarcForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RobotdisputeMyarcForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RobotdisputeMyarcForm.RobotdisputeMyarcFormController',
    ],

    controller: 'RobotdisputeMyarcFormController',

    id: prototype.idRobotdisputeMyarc + '-Contenedor',

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
            id: prototype.idRobotdisputeMyarc + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRobotdisputeMyarc + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 1000},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idRobotdisputeMyarc + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRobotdisputeMyarc + '-btn-search2',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',hidden: true,
                                    listeners: {
                                        click: 'imgSearch_clickHandler2'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRobotdisputeMyarc + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRobotdisputeMyarc + '-btn-excel', hidden: true,
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRobotdisputeMyarc + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                }, {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.idRobotdisputeMyarc + '-btn-back',
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
                    id: prototype.idRobotdisputeMyarc + '-contenedor-filters',
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
                            id: prototype.idRobotdisputeMyarc + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRobotdisputeMyarc + '-box-filter-01',
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
                                            id: prototype.idRobotdisputeMyarc + '-search-type',
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
                                            id: prototype.idRobotdisputeMyarc + '-txtFilterDateFrom',
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
                                            id: prototype.idRobotdisputeMyarc + '-txtFilterDateTo',
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
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRobotdisputeMyarc + '-ComboRobot',
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
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idRobotdisputeMyarc + '-box-filter-02',
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
                                            id: prototype.idRobotdisputeMyarc + '-CmbStatus',
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
                                        }, {
                                            xtype: 'combo',
                                            id: prototype.idRobotdisputeMyarc + '-CmbArea',
                                            fieldLabel: 'Area',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 250,
                                            labelWidth: 50,
                                            labelAlign: 'right', hidden: true,
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
                                            id: prototype.idRobotdisputeMyarc + '-Audit',
                                            fieldLabel: 'Audit',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 50, hidden: true,
                                            width: 110,
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
                            id: prototype.idRobotdisputeMyarc + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: 920,
                            height: 600,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System <br> date', dataIndex: 'A4139FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Robot', dataIndex: 'A4139ROBOT', width: 250, sortable: false, align: 'center'},
                                    {text: 'Country', dataIndex: 'A4139PAIS', width: 80, align: 'center', renderer: 'onRendererColumnOnPais'},
                                    {text: 'Processed', dataIndex: 'A4139CANTI', width: 100, align: 'right',
                                        //cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return 'Processed ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {text: 'Status', dataIndex: 'A4139FLAG', width: 200, sortable: false, align: 'right'},
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
                            id: prototype.idRobotdisputeMyarc + '-gridDetalle',
                            width: prototype.widthWindow,
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
                                    {text: 'Origin', dataIndex: 'A4139ORIGEN', align: 'center', width: 100, sortable: false},
                                    {text: 'Memo <br> Issue', dataIndex: 'A4139FFILE', align: 'center', width: 90, sortable: false},
                                    {text: 'System <br> Date', dataIndex: 'A4139FREGI', align: 'center', width: 70, sortable: false},
                                    {text: 'Country', dataIndex: 'A4139PAIS', align: 'center', width: 70, sortable: false},
                                    {text: 'Dispute <br> Date', dataIndex: 'A4139DDATE', align: 'center', width: 100, sortable: false},
                                    {text: 'Process', dataIndex: 'A4139BASE', align: 'left', width: 120, sortable: false},
                                    {text: 'Area', dataIndex: 'A4139AREA', align: 'left', width: 120, sortable: false},
                                    {text: 'Type', dataIndex: 'A4139TYPE', align: 'left', width: 120, sortable: false},
                                    {text: 'Memo Number', dataIndex: 'A4139NMEMO', align: 'center', width: 100, sortable: false},
                                    {text: 'Amount', dataIndex: 'A4139NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Audit', dataIndex: 'A4139USER', width: 100, align: 'right'},
                                    //{text: 'Days', dataIndex: 'A3268DIAS', width: 50, align: 'center'},
                                    {text: 'Status', dataIndex: 'A4139FLAG', width: 140, align: 'right'}
                                    //{ text: '',dataIndex: '',width: 60,renderer: 'onRendererColumnOnStatus'}

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
                                    id: prototype.idRobotdisputeMyarc + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {
                                    id: prototype.idRobotdisputeMyarc + '-lbl-totalDeta',
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

