
prototype.id = 'RobotDisputeControl';
prototype.url = CONTEXTPATH + '/RobotDisputeControl';
prototype.widthContenedor = 1150;
prototype.heightContenedor = 700;

Ext.define('Ext.Praxis.view.salesaudit.RobotDisputeControl.RobotDisputeControl', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RobotDisputeControl',
    requires: [
        'Ext.Praxis.controller.salesaudit.RobotDisputeControl.RobotDisputeControlController',
    ],
    controller: 'RobotDisputeControlController',
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
                        {xtype: 'tbspacer', width: 1000},
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
                                    id: prototype.id + '-btn-excel',hidden: true,
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
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
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
                                            value: new Date(),
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
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
                                                change: 'onchange'
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
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-02',
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
                                        }, {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbArea',hidden: true,
                                            fieldLabel: 'Area',
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
                                                afterrender: 'onCmbAreaAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-Audit',hidden: true,
                                            fieldLabel: 'Audit',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 50,
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
                            id: prototype.id + '-gridData',
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
                                    {
                                        text: 'System <br> date', dataIndex: 'A3268FREGI', width: 100, sortable: true, align: 'center'
                                    },
                                    {
                                        text: 'Robot', dataIndex: 'A3268ROBOT', width: 250, sortable: false, align: 'center'
                                    },
                                    {text: 'Country', dataIndex: 'A3268PAIS', width: 80, align: 'center',
                                        renderer: 'onRendererColumnOnPais'
                                    },
                                    /*{text: 'Country', dataIndex: 'A3268PAIS', width: 80, align: 'center',
                                        listeners: {
                                            click: 'searchform_detalle_Dispute'
                                        },
                                        renderer: function(value, metaData, record, rowIndex) {
                                            var vhtml = '<a href="#salesaudit-Dispute-report-form" >' + value + '</a>';
                                            return vhtml;
                                        }
                                    },*/
                                    {text: 'Total', dataIndex: 'A3268CTAPROCESADA', width: 120, align: 'right',
                                        cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return 'Total ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {text: 'Processed', dataIndex: 'A3268CANT', width: 100, align: 'right',
                                        //cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return 'Processed ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A3268STATUS', width: 200, sortable: false, align: 'right'
                                    },
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnTime'
                                    }
                                    /*{text: '', dataIndex: 'A3268STATO', width: 40, align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value == 'A') {
                                                return '<img src="resources/img/semaforo/Circle_Green.png" />';
                                            } else if (value == 'D') {
                                                return '<img src="resources/img/semaforo/Circle_Silver.png" />';
                                            } else {
                                                return '<img src="resources/img/semaforo/Circle_Red.png" />';
                                            }

                                        }
                                    }*/

                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetalle',
                            width: prototype.widthContenedor,
                            hidden: true,
                            height:600,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Origin', dataIndex: 'A3268BASE', align: 'center', width: 75, sortable: false
                                    },
                                    {
                                        text: 'Memo <br> Issue', dataIndex: 'A3268MODO', align: 'center', width: 50, sortable: false
                                    },
                                    {
                                        text: 'System <br> Date', dataIndex: 'A3268FREGI', align: 'center', width: 70, sortable: false
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A3268PAIS', align: 'center', width: 70, sortable: false
                                    },
                                   /* {text: 'Currency', dataIndex: 'A3388MDA', width: 80, align: 'center'},
                                    {
                                        text: 'Fare', dataIndex: 'A3388TARIF', width: 80, sortable: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },*/
                                    {
                                        text: 'Memo Number', dataIndex: 'A3268NMEMO', align: 'center', width: 100, sortable: false
                                    },
                                    {
                                        text: 'Dispute <br> Date', dataIndex: 'A3268FDISP', align: 'center', width: 100, sortable: false
                                    },
                                    {
                                        text: 'Memo Issue <br> Date', dataIndex: 'A3268FBCP', align: 'center', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Area', dataIndex: 'A3268AREA', align: 'left', width: 120, sortable: false
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A3268TYPE', align: 'left', width: 120, sortable: false
                                    },
                                    {text: 'Audit', dataIndex: 'A3268RAUDI', width: 100, align: 'right'},
                                    {text: 'Days', dataIndex: 'A3268DIAS', width: 50, align: 'center'},
                                    {text: 'Status', dataIndex: 'A3268FLAG', width: 140, align: 'right'},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnStatus'
                                    }
                                    /*{text: '', dataIndex: '', width: 40, align: 'right',renderer: 'onRendererColumnOnStatus'
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value == 'Pending') {
                                                return '<img src="resources/img/icon/16x16/loading_robot.png" />';
                                            } else {
                                                return '<img src="resources/img/icon/16x16/stado_habilita.png" />';
                                            }

                                        }
                                    }*/



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

