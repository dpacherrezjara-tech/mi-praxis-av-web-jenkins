/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
prototype.id = 'ADMReportForm';
prototype.id1 = 'SeguimietoFormUnico';
prototype.id5 = 'FormUnicoSeguimietoSubiArchivo';
prototype.id4 = 'FormUnicoSeguimieto';
prototype.id6 = 'ADMSeguimietoSubiArchivo';
prototype.url = CONTEXTPATH + '/ADMReport';
prototype.widthContenedor = 1395;
prototype.heightContenedor = 605;

Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.ADMReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ADMReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReportForm.ADMReportFormController',
        'Ext.Praxis.view.screens.ScrFormUnico',
        'Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimietoSubiArchivo',
        'Ext.Praxis.view.salesaudit.ADMReportForm.ADMSeguimietoSubiArchivo'
    ],

    controller: 'ADMReportFormController',

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
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-Save_refresh',
                                    icon: 'resources/img/icon/16x16/Save_refresh-16.png',
                                    tooltip: 'Change massive from approved states to ASR source',
                                    listeners: {
                                        click: 'img_clickHandler_save'
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
                                            width: 200,
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
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
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
                                            id: prototype.id + '-txtNumber',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
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
                                            id: prototype.id + '-country',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            hidden: true,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbProcess',
                                            fieldLabel: 'Process',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 165,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbOrigin',
                                            fieldLabel: 'Origin',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 145,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatus',
                                            fieldLabel: 'Status',
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
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbArea',
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
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbType',
                                            fieldLabel: 'Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 180,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
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
                                    hidden: true,
                                    defaults: {
                                        // style: 'margin-left:1px'
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
                                                afterrender: 'onCmbSourceAfterRender',
                                                select: 'onCmbSourceSelect',
                                                specialkey: 'onSearchkey'
                                            }
                                        }, {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboChannel', hidden: true,
                                            fieldLabel: 'Channel',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 120
                                            },
                                            listeners: {
                                                afterrender: 'onCmbChannelAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-country2',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-Currency',
                                            fieldLabel: 'Currency',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TourCode',
                                            fieldLabel: 'Tour Code',
                                            maxLength: 15,
                                            enforceMaxLength: 15,
                                            labelWidth: 70,
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-Audit',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtPNR',
                                            fieldLabel: 'PNR',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 6,
                                            enforceMaxLength: 6,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtEPR',
                                            fieldLabel: 'EPR',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 6,
                                            enforceMaxLength: 6,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey'
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
                    id: prototype.id + '-campo_cantidad',
                    layout: 'hbox',
                    border: false,
                    hidden: true,
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {xtype: 'tbspacer', width: 130},
                        {
                            xtype: 'panel',
                            width: 160,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Currency: ',
                                            style: 'font-weight:bold;',
                                            width: 76
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblCurrency1',
                                            text: '',
                                            style: 'font-weight:bold;',
                                            width: 63
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: 1100,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Qty ADM: ',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQtyAdm1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Qty ACM: ',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtACM1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Qty NTD: ',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtNTD1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Qty NTC: ',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtNTC1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Amount: ',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtAdm1',
                                            fieldStyle: 'text-align:right;',
                                            enableKeyEvents: true,
                                            width: 70,
                                            padding: '0 2 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Amount:',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtAcm1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Amount:',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtNtd1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Amount:',
                                            style: 'font-weight:bold;',
                                            width: 68
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAmtNtc1',
                                            fieldStyle: 'text-align:right;',
                                            width: 70,
                                            padding: '0 2 0 0'
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
                            width: 1390,
                            height: 480,
                            columnLines: true,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {

                                        if (Ext.String.trim(record.get('A2548FTE')) === 'ASR') {
                                            if (Ext.String.trim(record.get('A2548FLAG')) === 'Y' || Ext.String.trim(record.get('A2548FLAG')) === 'D' || Ext.String.trim(record.get('A2548FLAG')) === 'A') {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else {
                                            if (Ext.String.trim(record.get('A2548FLAG')) === 'D' || Ext.String.trim(record.get('A2548FLAG')) === 'K' || Ext.String.trim(record.get('A2548FLAG')) === 'T' || Ext.String.trim(record.get('A2548FLAG')) === 'H' || Ext.String.trim(record.get('A2548FLAG')) === 'F' || Ext.String.trim(record.get('A2548FLAG')) === 'G' || Ext.String.trim(record.get('A2548FLAG')) === 'Q' || Ext.String.trim(record.get('A2548FLAG')) === 'N' || Ext.String.trim(record.get('A2548FLAG')) === 'P' || Ext.String.trim(record.get('A2548FLAG')) === 'C' || Ext.String.trim(record.get('A2548FLAG')) === 'Z' || Ext.String.trim(record.get('A2548FLAG')) === 'R' || Ext.String.trim(record.get('A2548FLAG')) === 'I' || Ext.String.trim(record.get('A2548FLAG')) === 'J' || Ext.String.trim(record.get('A2548FLAG')) === 'B' || Ext.String.trim(record.get('A2548FLAG')) === 'L' || Ext.String.trim(record.get('A2548FLAG')) === 'X') {
                                                return false;
                                            } else {
                                                return false;
                                            }
                                        }


                                    }
                                }

                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    /*{
                                     xtype: 'checkcolumn', sortable: false,
                                     text: '', dataIndex: 'A2548FLAG', width: 25,
                                     defaults: {
                                     align: 'center'
                                     },
                                     items: [
                                     {
                                     xtype: 'checkboxfield',
                                     id: prototype.id + '-chkAll',
                                     boxLabel: '',
                                     checked: false,
                                     width: '100%',
                                     listeners: {
                                     change: 'checkAll_clickHandler'
                                     }
                                     }
                                     ]
                                     },*/
                                    {text: 'Ticket', dataIndex: 'A2548TIKET', width: 100},
                                    {text: 'Memo<br>Number', dataIndex: 'A2548NMEMO', width: 80},
                                    {text: 'Country', dataIndex: 'A2548PAIS', width: 60},
                                    {text: 'Cur.', dataIndex: 'A2548MDA', width: 40},
                                    {text: 'Amount', dataIndex: 'A2548NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'IATA', dataIndex: 'A2548IATA', width: 70},
                                    {text: 'Agency', dataIndex: 'AGENCY', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Source', dataIndex: 'A2548FTE', width: 60},
                                    {text: 'Transaction', dataIndex: 'A2548TRNCO', width: 80},
                                    {text: 'Tour Code', dataIndex: 'A2548CODIT', width: 80},
                                    {text: 'Types', dataIndex: 'A2548TRNCU', width: 50, renderer: 'onRendererColumnAttr'},
                                    {text: 'System<br>Date', dataIndex: 'A2548FREGI', width: 70},
                                    {text: 'Accounting<br>Date', dataIndex: 'A2548FCONT', width: 90},
                                    {text: 'Issue<br>Date', dataIndex: 'A2548FVTA', width: 90},
                                    {text: 'Bsplink <br> Date', dataIndex: 'A2548FFILE', width: 85},
                                    {text: 'User', dataIndex: 'A2548REGIS', width: 100},
                                    {text: 'Reason 1', dataIndex: 'A2548DESC1', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Origin', dataIndex: 'A2548BASE', width: 100, sortable: false, renderer: 'onRendererColumnBase'},
                                    {text: 'Area', dataIndex: 'A2548AREA', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'Type', dataIndex: 'A2548TYPE', width: 100},
                                    {text: 'Status', dataIndex: 'A2548FLAG', width: 130, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'Connexion', dataIndex: 'A2548NMERF', width: 120, renderer: 'onRendererColumnAttr'},
                                    {text: 'Reference', dataIndex: 'A2548CNREL', width: 120, renderer: 'onRendererColumnAttr'},
                                    {text: 'N°<br>Notice', dataIndex: 'A2548NRCOR', width: 80,},
                                    {text: 'Notice<br>Date', dataIndex: 'A2548FECOR', width: 90},
                                    {text: 'Status<br>Notice', dataIndex: 'A2548STCOR', width: 90,renderer: 'onRendererColumnNotice'},
                                    {text: 'PNR', dataIndex: 'A2548PNR', width: 90},
                                    {text: 'EPR', dataIndex: 'A2548EPR', width: 90},
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
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-docum',
                                                tooltip: 'ADM / ACM Tracing',
                                                handler: 'onDetailDocumtClick'
                                            }
                                        ]
                                    }
                                    //

                                ], listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
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
                    id: prototype.id + '-pagginator-legend',
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
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    text: 'Total ADMs',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lblRowsTotalADM',
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

