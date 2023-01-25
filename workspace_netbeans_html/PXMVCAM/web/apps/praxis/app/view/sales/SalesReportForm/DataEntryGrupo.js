/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryGrupo', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idGr+ '-dataEntryGrupo',
    controller: prototype.idGr+ '-dataEntryGroupController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryGroupController'
    ],
    title: 'Group Sales Complete Information',
    header: true,
    width: 1180,
    height: 815,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idGr+ '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 1160,
                    margin: '5 5 5 5',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="PanelFilters">
                        //GROUP FIELDS
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: true,
                            width: 1155,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                bodyStyle: 'background: #E5ECEF',
                                width: 1155
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="GROUP FIELDS">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: #E5ECEF'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Column1">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                labelStyle: 'font-weight:bold;font-size:11px;',
                                                width: 220,
                                                labelWidth: 120,
                                                readOnly: true,
                                                labelSeparator: '',
                                                height: 25
                                            },
                                            items: [
                                                {
                                                    id: prototype.idGr+ '-de-lblGroup',
                                                    fieldLabel: 'Group:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblSource',
                                                    fieldLabel: 'Source:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblIATA',
                                                    fieldLabel: 'IATA/Code:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblCity_Bank',
                                                    fieldLabel: 'City/Bank:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblEndingFrom',
                                                    fieldLabel: 'Period Ending Date:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblProcessing',
                                                    fieldLabel: 'Processing Date:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblCurrency',
                                                    fieldLabel: 'Currency:'
                                                }

                                            ]
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="Column2">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                labelStyle: 'font-weight:bold;font-size:11px;',
                                                width: 220,
                                                labelWidth: 120,
                                                labelSeparator: '',
                                                readOnly: true,
                                                height: 25

                                            },
                                            items: [
                                                {
                                                    id: prototype.idGr+ '-de-lblAccountDate',
                                                    fieldLabel: 'Accounting Date:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblChannel',
                                                    fieldLabel: 'Channel:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblNameIATA',
                                                    fieldLabel: '',
                                                    labelWidth: 0
                                                },
                                                {
                                                    xtype: 'panel',
                                                    disabled: false,
                                                    layout: 'hbox',
                                                    margin: '0 0 0 0',
                                                    padding: '0px 0px 0px 0px',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '0px 3px 0px 3px',
                                                        margin: '0 0 0 0',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                        labelSeparator: '',
                                                        height: 25,
                                                        readOnly: true

                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.idGr+ '-de-lblCity_Bank_Code',
                                                            fieldLabel: '',
                                                            labelWidth: 0,
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.idGr+ '-de-lblCountry',
                                                            fieldLabel: 'Country:',
                                                            labelWidth: 70,
                                                            width: 170
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblEndingTo',
                                                    fieldLabel: 'To:'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    disabled: false,
                                                    margin: '0 0 0 0',
                                                    padding: '0px 0px 0px 0px',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '0px 3px 0px 3px',
                                                        margin: '0 0 0 0',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                        labelSeparator: '',
                                                        height: 25,
                                                         readOnly: true

                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.idGr+ '-de-lblWeek',
                                                            fieldLabel: 'Week:',
                                                            labelWidth: 50,
                                                            width: 110
                                                        },
                                                        {
                                                            id: prototype.idGr+ '-de-lblCycle',
                                                            fieldLabel: 'Cycle:',
                                                            labelWidth: 50,
                                                            width: 110
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblExchangeRate',
                                                    fieldLabel: 'Exchange Rate:'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="Column3">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 10',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 3px 0px 3px',
                                                margin: '1 1 1 1',
                                                align: 'center',
                                                fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                labelStyle: 'font-weight:bold;font-size:11px;',
                                                width: 220,
                                                labelWidth: 120,
                                                labelSeparator: '',
                                                height: 25,
                                                readOnly: true

                                            },
                                            items: [
                                                {
                                                    id: prototype.idGr+ '-de-lblAccount',
                                                    fieldLabel: 'Accounting ID:',
                                                    width: 270
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblStatus',
                                                    fieldLabel: 'Status:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblSabreCity',
                                                    fieldLabel: 'Sabre City:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblSaleType',
                                                    fieldLabel: 'Sales Type:'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    width: 270,
                                                    margin: '0 0 0 0',
                                                    padding: '0px 0px 0px 0px',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '0px 3px 0px 3px',
                                                        margin: '0 0 0 0',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                        labelSeparator: '',
                                                        height: 25,
                                                         readOnly: true

                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.idGr+ '-de-lblCreated',
                                                            fieldLabel: 'Created By:',
                                                            labelWidth: 120,
                                                            width: 200
                                                        },
                                                        {
                                                            id: prototype.idGr+ '-de-lblCreatedHour',
                                                            fieldLabel: '',
                                                            labelWidth: 0,
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '0 0 0 0',
                                                    padding: '0px 0px 0px 0px',
                                                    border: false,
                                                    width: 270,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '0px 3px 0px 3px',
                                                        margin: '0 0 0 0',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                        labelSeparator: '',
                                                        height: 25,
                                                         readOnly: true

                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.idGr+ '-de-lblUpdated',
                                                            fieldLabel: 'Updated By:',
                                                            labelWidth: 120,
                                                            width: 200
                                                        },
                                                        {
                                                            id: prototype.idGr+ '-de-lblUpdatedHour',
                                                            fieldLabel: '',
                                                            labelWidth: 0,
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '0 0 0 0',
                                                    padding: '0px 0px 0px 0px',
                                                    border: false,
                                                    hidden: true,
                                                    width: 270,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '0px 3px 0px 3px',
                                                        margin: '0 0 0 0',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                        labelSeparator: '',
                                                        height: 25,
                                                         readOnly: true

                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.idGr+ '-de-lblAssigned',
                                                            fieldLabel: '',
                                                            labelWidth: 120,
                                                            width: 200
                                                        },
                                                        {
                                                            id: prototype.idGr+ '-de-lblAssignedHour',
                                                            fieldLabel: '',
                                                            labelWidth: 0,
                                                            width: 70
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="Column4">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '0px 0px 0px 0px',
                                                margin: '1 1 1 8',
                                                align: 'center',
                                                fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                                labelStyle: 'font-weight:bold;font-size:11px;',
                                                width: 190,
                                                labelWidth: 80,
                                                labelSeparator: '',
                                                 readOnly: true
                                                        //height: 25
                                            },
                                            items: [
                                                {
                                                    id: prototype.idGr+ '-de-lblPoliza',
                                                    fieldLabel: 'Policy:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblCapture',
                                                    fieldLabel: 'Capture:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblIdFile',
                                                    fieldLabel: 'File/ID:'
                                                },
                                                {
                                                    id: prototype.idGr+ '-de-lblVoidReport',
                                                    fieldLabel: 'Void Report:',
                                                    width: 160
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    padding: '0px 0px 0px 0px',
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        align: 'center',
                                                        fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;',
                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                        labelSeparator: '',
                                                        height: 25

                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.idGr+ '-btnClose',
                                                            text: '<strong style="color:white;">Close Group<strong>',
                                                            // hidden: true,
                                                            tooltip: 'Close Group',
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over',
                                                            width: 90,
                                                            height: 25,
                                                            margin: '0px 13px 0px 0px',
                                                            // padding: '4 5 5 2',
                                                            listeners: {
                                                                click: 'onClosedGroup'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.idGr+ '-btnError',
                                                            text: '<strong style="color:white;">View Error<strong>',
                                                            tooltip: 'View Error',
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over',
                                                            width: 90,
                                                            height: 25,
                                                            margin: '0px 0px 0px 0px',
                                                            // padding: '4 5 5 2',
                                                            listeners: {
                                                                click: 'onViewErrorClick'
                                                            }

                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            id: prototype.idGr+ '-tabMain',
                            width: 1160,
                            height: 580,
                            anchor: '100%',
                            margin: '1 1 1 1',
                            autoScroll: true,
                            bodyStyle: 'background: transparent',
                            listeners: {
                                tabchange: 'onChangeTab'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Tab TKT">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    id: prototype.idGr+ '-tabTkt',
                                    title: 'TKT',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    margin: '5 5 5 5',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.idGr+ '-de-panelOptions1',
                                            border: false,
                                            width: 1050,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.idGr+ '-panelFilter1',
                                                    hidden: true,
                                                    width: 600, border: false,
                                                    layout: 'column',
                                                    items: [
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.idGr+ '-de-cmbOptionTKT',
                                                            margin: '5 0 5 0',
                                                            fieldLabel: 'Search By',
                                                            width: 210,
                                                            labelWidth: 70,
                                                            labelAlign: 'left',
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            valueField: 'code',
                                                            displayField: 'name',
                                                            listeners: {
                                                                change: 'onChangeComboTkt'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-cmbTransactionTKT',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            labelWidth: 10,
                                                            labelAlign: 'left',
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            valueField: 'code',
                                                            displayField: 'name'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-txtTKTNumber',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            labelWidth: 10,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left',
                                                            //padding: '1px 5px 0px 10',
                                                            enforceMaxLength: true,
                                                            maxLength: 10,
                                                            maskRe: /[0-9]/,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-txtIata',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 40,
                                                            labelWidth: 10,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left',
                                                            //padding: '1px 5px 0px 10',
                                                            enforceMaxLength: true,
                                                            maxLength: 8,
                                                            maskRe: /[0-9]/,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 170},
                                                {
                                                    xtype: 'panel',
                                                    width: 100,
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'x-toolbar-pag',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-first1',
                                                                    iconCls: 'prx-icon-pagination-first',
                                                                    tooltip: 'First Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagFirst'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-previous1',
                                                                    iconCls: 'prx-icon-pagination-previous',
                                                                    tooltip: 'Previous Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagPrevious'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-next1',
                                                                    iconCls: 'prx-icon-pagination-next',
                                                                    tooltip: 'Next Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagNext'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-last1',
                                                                    iconCls: 'prx-icon-pagination-last',
                                                                    tooltip: 'Last Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagLast'
                                                                    }

                                                                }
                                                                , {
                                                                    xtype: 'pagingtoolbar',
                                                                    id: prototype.idGr+ '-de-paggin1',
                                                                    pageSize: 10,
                                                                    border: false, displayInfo: false,
                                                                    hidden: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnSearch1',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    listeners: {
                                                                        click: 'onClickBtnSearch'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnFilter1',
                                                                    iconCls: 'prx-icon-filter',
                                                                    tooltip: 'Display filter',
                                                                    listeners: {
                                                                        click: 'onClickBtnFilter'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnExcel1',
                                                                    iconCls: 'prx-icon-excel',
                                                                    tooltip: 'Export to Excel',
                                                                    listeners: {
                                                                        click: 'onClickBtnExcel'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnTxt1',
                                                                    icon: 'resources/img/botones/txt.png',
                                                                    tooltip: 'Export TXT',
                                                                    listeners: {
                                                                        click: 'onClickBtnTxt'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnClear1',
                                                                    iconCls: 'prx-icon-clear',
                                                                    tooltip: 'Clear Options',
                                                                    listeners: {
                                                                        click: 'onClickBtnClear'
                                                                    }
                                                                },
                                                                {xtype: 'button',
                                                                    id: prototype.idGr+ '-btnBack1',
                                                                    iconCls: 'prx-icon-back',
                                                                    tooltip: 'Back',
                                                                    listeners: {
                                                                        click: 'onClickBtnBack'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            padding: '5 0 0 0',
                                            id: prototype.idGr+ '-de-gridDataTkt',
                                            bodyStyle: 'background: #E5ECEF',
                                            height: 550,
                                            width: 1140,
                                            columnLines: true,
                                            resizable: false,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Air', width: 50, dataIndex: 'A720CIA'},
                                                    {text: 'Document', width: 80, dataIndex: 'DOCUMENTO'},
                                                    {text: 'Issue<br> Date', width: 70, dataIndex: 'A720FECVTA'},
                                                    {text: 'CNJ', width: 60, dataIndex: 'CNJ'},
                                                    {text: 'Iata', width: 70, dataIndex: 'A720AGENTE'},
                                                    {text: 'Transaction', width: 80, dataIndex: 'A720TRNCU'},
                                                    {text: 'Document<br> Type', dataIndex: 'A720TDOC', width: 70},
                                                    {text: 'Type', dataIndex: 'A720UFORMA', width: 50},
                                                    {text: 'Fare<br>Currency', dataIndex: 'A720MONEDA', width: 70},
                                                    {text: 'Fare<br>Amount', dataIndex: 'A720TARIFA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Equivalent <br>Fare Curr', dataIndex: 'A720MDAPAG', width: 80},
                                                    {text: 'Equivalent <br>Fare Amount', dataIndex: 'A720TRFPAG', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Add Curr', dataIndex: 'A720MDAAD', width: 70},
                                                    {text: 'Add<br>Amount', dataIndex: 'A720ADC', width: 80, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Error', dataIndex: 'A720MIAERR', width: 75},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        text: '',
                                                        width: 40,
                                                        align: 'center',
                                                        items: [
                                                            {iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'onEditClick'
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
                                // </editor-fold>

                                // <editor-fold defaultstate="collapsed" desc="Tab RFND">

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    id: prototype.idGr+ '-tabTRfnd',
                                    title: 'RFND',
                                    layout: 'vbox',
//                                            {
//                                        type: 'vbox',
//                                        align: 'center'
//                                    },
                                    margin: '5 5 5 5',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.idGr+ '-de-panelOptions2',
                                            border: false,
                                            width: 1050,
                                            layout: //'hbox',
                                                    {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.idGr+ '-panelFilter2',
                                                    width: 600,
                                                    border: false,
                                                    hidden: true,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.idGr+ '-de-cmbOptionRF',
                                                            margin: '5 0 5 0',
                                                            //disabled: true,
                                                            fieldLabel: 'Search By',
                                                            width: 180,
                                                            labelWidth: 80, labelAlign: 'left',
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            valueField: 'code',
                                                            displayField: 'name',
                                                            listeners: {
                                                                change: 'onChangeComboRfnd'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '5 0 5 0',
                                                            padding: '0 0 0 0',
                                                            id: prototype.idGr+ '-de-txtRFNNumber',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            labelWidth: 100,
                                                            width: 100,
                                                            labelAlign: 'left',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 10,
                                                            maskRe: /[0-9]/,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-txtRFIata',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 100,
                                                            labelWidth: 10,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left',
                                                            //padding: '1px 5px 0px 10',
                                                            enforceMaxLength: true,
                                                            maxLength: 8,
                                                            maskRe: /[0-9]/,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 170},
                                                {
                                                    xtype: 'panel',
                                                    width: 100,
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'toolbar', cls: 'x-toolbar-pag',
                                                            items: [
                                                                {
                                                                    xtype: 'button', id: prototype.idGr+ '-btn-pag-first2',
                                                                    iconCls: 'prx-icon-pagination-first',
                                                                    tooltip: 'First Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagFirst'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-previous2',
                                                                    iconCls: 'prx-icon-pagination-previous',
                                                                    tooltip: 'Previous Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagPrevious'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-next2',
                                                                    iconCls: 'prx-icon-pagination-next',
                                                                    tooltip: 'Next Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagNext'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-last2',
                                                                    iconCls: 'prx-icon-pagination-last',
                                                                    tooltip: 'Last Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagLast'
                                                                    }
                                                                }
                                                                , {
                                                                    xtype: 'pagingtoolbar',
                                                                    id: prototype.idGr+ '-de-paggin2',
                                                                    pageSize: 10,
                                                                    border: false,
                                                                    displayInfo: false,
                                                                    hidden: true
                                                                }
                                                            ]}
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnSearch2',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    listeners: {
                                                                        click: 'onClickBtnSearch'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnFilter2',
                                                                    iconCls: 'prx-icon-filter',
                                                                    tooltip: 'Display filter',
                                                                    listeners: {
                                                                        click: 'onClickBtnFilter'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnAdd2',
                                                                    iconCls: 'prx-icon-add',
                                                                    //hidden: true,
                                                                    tooltip: 'New',
                                                                    listeners: {
                                                                        click: 'onClickBtnAdd'
                                                                    }
                                                                },
                                                                {xtype: 'button',
                                                                    id: prototype.idGr+ '-btnClear2',
                                                                    iconCls: 'prx-icon-clear',
                                                                    tooltip: 'Clear Options',
                                                                    listeners: {
                                                                        click: 'onClickBtnClear'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnBack2',
                                                                    iconCls: 'prx-icon-back',
                                                                    tooltip: 'Back',
                                                                    listeners: {
                                                                        click: 'onClickBtnBack'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            padding: '5 0 0 0',
                                            id: prototype.idGr+ '-de-gridDataRfnd',
                                            bodyStyle: 'background: #E5ECEF',
                                            height: 550,
                                            width: 1060,
                                            columnLines: true,
                                            resizable: false,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Airline', width: 50, dataIndex: 'A713AIRLIN', hidden: true},
                                                    {text: 'Air', width: 50, dataIndex: 'A713CIA'},
                                                    {text: 'Document', width: 80, dataIndex: 'DOCUMENTO'},
                                                    {text: 'Coupons', width: 70, dataIndex: 'CUPON'},
                                                    {text: 'Issue<br> Date', width: 70, dataIndex: 'A713FECVTA'},
                                                    {text: 'CNJ', width: 50, dataIndex: 'CNJ'},
                                                    {text: 'Iata', width: 70, dataIndex: 'A713AGENTE'},
                                                    {text: 'Transaction', width: 80, dataIndex: 'A713TRNCU'},
                                                    {text: 'Document<br> Type', dataIndex: 'A713TDOC', width: 70},
                                                    {text: 'Type', dataIndex: 'A713UFORMA', width: 50},
                                                    {text: 'Fare<br>Currency', dataIndex: 'A713MONEDA', width: 70},
                                                    {text: 'Fare<br>Amount', dataIndex: 'A713TARIFA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Equivalent <br>Fare Curr', dataIndex: 'A713MDAPAG', width: 80},
                                                    {text: 'Equivalent <br>Fare Amount', dataIndex: 'A713TRFPAG', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    /*{text: 'Add <br>Curr', dataIndex: 'CURADC', width: 60},
                                                     {text: 'Add<br>Amount', dataIndex: 'ADC', width: 60,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = 'text-align :right;';
                                                     return Ext.util.Format.number(value, '0,000.00');
                                                     }
                                                     },*/
                                                    {text: 'Error', dataIndex: 'A713MIAERR', width: 75},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        text: '',
                                                        width: 30,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'onEditClick'
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
                                // </editor-fold>

                                // <editor-fold defaultstate="collapsed" desc="Tab ADM/ACM">

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    id: prototype.idGr+ '-tabAdm',
                                    title: 'ADM/ACM',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    margin: '5 5 5 5',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.idGr+ '-de-panelOptions3',
                                            border: false,
                                            width: 1050,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.idGr+ '-panelFilter3',
                                                    hidden: true,
                                                    width: 600,
                                                    border: false,
                                                    layout: 'column',
                                                    items: [
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.idGr+ '-de-cmbOptionADM',
                                                            margin: '5 0 5 0',
                                                            //disabled: true,
                                                            fieldLabel: 'Search By',
                                                            width: 180,
                                                            labelWidth: 80, labelAlign: 'left',
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            valueField: 'code',
                                                            displayField: 'name',
                                                            listeners: {
                                                                change: 'onChangeComboAdm'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-cmbTransactionADM',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 100,
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            queryMode: 'local',
                                                            triggerAction: 'all', valueField: 'code',
                                                            displayField: 'name'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-txtADMNumber',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 100,
                                                            labelWidth: 100,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left',
                                                            padding: '1px 5px 0px 10',
                                                            enforceMaxLength: true,
                                                            maxLength: 10,
                                                            maskRe: /[0-9]/,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '5 0 5 5',
                                                            id: prototype.idGr+ '-de-txtADMIata',
                                                            hidden: true,
                                                            fieldLabel: '',
                                                            width: 100,
                                                            labelWidth: 10,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left',
                                                            //padding: '1px 5px 0px 10',
                                                            enforceMaxLength: true,
                                                            maxLength: 8,
                                                            maskRe: /[0-9]/,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 170},
                                                {
                                                    xtype: 'panel',
                                                    width: 100,
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'x-toolbar-pag',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-first3',
                                                                    iconCls: 'prx-icon-pagination-first',
                                                                    tooltip: 'First Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagFirst'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-previous3',
                                                                    iconCls: 'prx-icon-pagination-previous',
                                                                    tooltip: 'Previous Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagPrevious'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-next3',
                                                                    iconCls: 'prx-icon-pagination-next',
                                                                    tooltip: 'Next Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagNext'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btn-pag-last3',
                                                                    iconCls: 'prx-icon-pagination-last',
                                                                    tooltip: 'Last Page',
                                                                    listeners: {
                                                                        click: 'onClickBtnPagLast'
                                                                    }

                                                                }
                                                                , {
                                                                    xtype: 'pagingtoolbar',
                                                                    id: prototype.idGr+ '-de-paggin3',
                                                                    pageSize: 10,
                                                                    border: false,
                                                                    displayInfo: false,
                                                                    hidden: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnSearch3',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    listeners: {
                                                                        click: 'onClickBtnSearch'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnFilter3', iconCls: 'prx-icon-filter',
                                                                    tooltip: 'Display filter',
                                                                    listeners: {
                                                                        click: 'onClickBtnFilter'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnClear3',
                                                                    iconCls: 'prx-icon-clear',
                                                                    tooltip: 'Clear Options',
                                                                    listeners: {
                                                                        click: 'onClickBtnClear'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idGr+ '-btnBack3',
                                                                    iconCls: 'prx-icon-back',
                                                                    tooltip: 'Back',
                                                                    listeners: {
                                                                        click: 'onClickBtnBack'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            padding: '5 0 0 0',
                                            id: prototype.idGr+ '-de-gridDataAdm',
                                            bodyStyle: 'background: #E5ECEF',
                                            height: 550,
                                            width: 1040,
                                            columnLines: true,
                                            resizable: false,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Air', width: 50, dataIndex: 'A714CIA'},
                                                    {text: 'Document', width: 100, dataIndex: 'DOCUMENTO'},
                                                    {text: 'Issue<br> Date', width: 100, dataIndex: 'A714FECVTA'},
                                                    {text: 'CNJ', width: 80, dataIndex: 'CNJ'},
                                                    {text: 'Iata', width: 80, dataIndex: 'A714AGENTE'},
                                                    {text: 'Transaction', width: 80, dataIndex: 'A714TRNCU'},
                                                    {text: 'Document<br> Type', dataIndex: 'A714TDOC', width: 80},
                                                    {text: 'Fare<br>Currency', dataIndex: 'A714MDAFA', width: 80},
                                                    {text: 'Fare<br>Amount', dataIndex: 'A714FARE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FOP <br> Currency', dataIndex: 'A714MDAFP', width: 100},
                                                    {text: 'FOP <br> Aount', dataIndex: 'A714VFOP', width: 80, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Error', dataIndex: 'A714MIAERR', width: 80},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        text: '',
                                                        width: 50,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'onEditClick'
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
                                // </editor-fold>

                                // <editor-fold defaultstate="collapsed" desc="Tab TOTALS">
                                {
                                    xtype: 'panel',
                                    //title: '<label style="color:#0B333C;font-size:12px;">TOTALS</label>',
                                    title: 'TOTALS',
                                    id: prototype.idGr+ '-tabTotal',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;'
                                    },
                                    items: [
                                    ]
                                }
//                                {
//                                    xtype: 'panel',
//                                    bodyStyle: 'background: transparent',
//                                    id: prototype.idGr+ '-tabTotal',
//                                    title: 'TOTALS',
//                                    layout: {
//                                        type: 'vbox',
//                                        align: 'center'
//                                    },
//                                    margin: '5 5 5 5',
//                                    defaults: {
//                                        labelAlign: 'left'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'grid',
//                                            padding: '5 0 0 0',
//                                            id: prototype.idGr+ '-de-gridDataTotal',
//                                            bodyStyle: 'background: #E5ECEF',
//                                            height: 550,
//                                            width: 970,
//                                            columnLines: true,
//                                            resizable: false,
//                                            columns: {
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    resizable: true,
//                                                    align: 'center'
//                                                },
//                                                items: [
//                                                    {text: 'Description', width: 240, dataIndex: 'A1720DESCR'},
//                                                    {text: 'Original Currency',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: true,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {text: 'Document <br>Qty Sal', dataIndex: 'A1720QDOSA', width: 90},
//                                                            {text: 'Sales', dataIndex: 'A1720VSALC', width: 90,
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align :right;';
//                                                                    return Ext.util.Format.number(value, '0,000.00');
//                                                                }
//                                                            },
//                                                            {text: 'Document <br>Qty Ref', dataIndex: 'A1720QDORF', width: 80},
//                                                            {text: 'Refund', dataIndex: 'A1720VRFLC', width: 90,
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align :right;';
//                                                                    return Ext.util.Format.number(value, '0,000.00');
//                                                                }
//                                                            },
//                                                            {text: 'Net', dataIndex: 'A1720VNTLC', width: 90,
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align :right;';
//                                                                    return Ext.util.Format.number(value, '0,000.00');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
//                                                    {text: 'Converted Currency',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: true,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {text: 'Sales', dataIndex: 'A1720VSARV', width: 90,
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align :right;';
//                                                                    return Ext.util.Format.number(value, '0,000.00');
//                                                                }
//                                                            },
//                                                            {text: 'Refund', dataIndex: 'A1720VRFRV', width: 90,
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align :right;';
//                                                                    return Ext.util.Format.number(value, '0,000.00');
//                                                                }
//                                                            },
//                                                            {text: 'Net', dataIndex: 'A1720VNTRV', width: 90,
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align :right;';
//                                                                    return Ext.util.Format.number(value, '0,000.00');
//                                                                }
//                                                            }
//                                                        ]
//                                                    }
//
//                                                ]
//                                            }
//                                        }
//                                    ]}
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});