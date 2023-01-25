
////
prototype.id = 'SalesMasterReportForm';
prototype.id0 = 'CtrlDeliveryAudiForm';
prototype.id1 = 'DataEntryDetail';
prototype.id2 = 'DataEntryDetailsTaxes';
prototype.id3 = 'DataEntryDetailsCommis';
prototype.id4 = 'DataEntryDetailsTaxOnComi';
prototype.id5 = 'DataEntryDetailsReason';
prototype.id6 = 'DataEntryDetailsFOP';
prototype.id7 = 'DataEntryDetailsHistorialTKT';
prototype.id8 = 'DataEntryDetailsPDI';
prototype.id9 = 'DataEntrySalesAuditAccepted';
prototype.idSalesMasterEmail = 'SalesMasterDataEntryEmail';
prototype.url = CONTEXTPATH + '/SalesAuditAccepted';
prototype.url2 = CONTEXTPATH + '/SalesMasterReportForm';
prototype.widthContenedor = 1600;
prototype.heightContenedor = 605;

Ext.define('Ext.Praxis.view.salesaudit.SalesMasterReportForm.SalesMasterReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SalesMasterReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.SalesMasterReportForm.SalesMasterReportFormController',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetail',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsTaxes',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsCommis',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsTaxOnComi',
        'Ext.Praxis.view.screens.CtrlDeliveryAudiForm',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsReason',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsHistorialTKT',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsFOP',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsPDI',
        'Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntrySalesAuditAccepted',
        'Ext.Praxis.view.salesaudit.SalesMasterReportForm.SalesMasterDataEntryEmail'
    ],

    controller: 'SalesMasterReportFormController',

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
                                    //disabled: true,
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
                                        click: 'onSearchexcel'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnSend',
                                    icon: 'resources/img/botones/txt.png',
                                    tooltip: 'Send Mail', hidden: true,
                                    listeners: {
                                        click: 'onWinSendMail'
                                    }
                                },
                                {
                                    xtype: 'button', hidden: true,
                                    id: prototype.id + '-btn-txt',
                                    icon: 'resources/img/botones/txt.png',
                                    tooltip: 'Export to TXT',
                                    listeners: {
                                        click: 'onExcelTXT'
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
                                            id: prototype.id + '-txtCia',
                                            hideLabel: true,
                                            width: 35,
                                            value: '139',
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
                                                afterrender: 'onCmbSearchAfterRender',
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
                                            xtype: 'combo',
                                            id: prototype.id + '-txtCountry',
                                            queryMode: 'local',
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
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIATA',
                                            fieldLabel: 'IATA',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            maxLength: 8,
                                            labelWidth: 35,
                                            enforceMaxLength: 8,
                                            width: 150,
                                            enableKeyEvents: true,
                                            hidden: true
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAgent',
                                            fieldLabel: 'Agent',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            width: 150,
                                            labelWidth: 35,
                                            enableKeyEvents: true,
                                            hidden: true
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboStatusADM',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            hidden: true,
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbTypeMemo',
                                            fieldLabel: 'Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            hidden: true,
                                            listConfig: {
                                                minWidth: 150
                                            },
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
                                            id: prototype.id + '-ComboTrncu',
                                            fieldLabel: 'Transaccion',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                //change: 'onCmbTrncuChange'

                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboRFND',
                                            fieldLabel: 'Refund Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'right',
                                            hidden: true,
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboTRNCO',
                                            fieldLabel: 'Orig. Trans.',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'right',
                                            hidden: true,
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFBasis',
                                            fieldLabel: 'Fare Basis',
                                            maxLength: 320,
                                            enforceMaxLength: 320,
                                            labelWidth: 65,
                                            width: 200,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOpcionAudit',
                                            fieldLabel: 'Audited',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboLikeReason',
                                            fieldLabel: 'Reason Code',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender3',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtCodReason',
                                            queryMode: 'local',
                                            displayField: 'DESCRIPT',
                                            valueField: 'DESCRIPT',
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
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboTypeDocume',
                                            fieldLabel: 'Document Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 170,
                                            labelWidth: 100,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIT',
                                            fieldLabel: 'Tour Code',
                                            maxLength: 15,
                                            enforceMaxLength: 15,
                                            labelWidth: 70,
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboTransfer',
                                            fieldLabel: 'Transfer',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 260,
                                            labelWidth: 100,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
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
                            width: prototype.widthContenedor,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'A1672TICKET', width: 120},
                                    {text: 'Source', dataIndex: 'A1672FUENT', width: 55},
                                    {text: 'Channel', dataIndex: 'A1672CANAL', width: 60},
                                    {text: 'Country', dataIndex: 'A1672PAIVT', width: 60},
                                    {text: 'IATA', dataIndex: 'A1672AGENT', width: 70},
                                    {text: 'Name </br> Agency', dataIndex: 'A1672NAGENCY', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Trans.', dataIndex: 'A1672TRNCU', width: 50},
                                    {text: 'Doc. <br> Type', dataIndex: 'A1672TDOC', width: 40},
                                    {text: 'Issue <br> Date', dataIndex: 'A1672FVENT', width: 70},
                                    {text: 'Processing<br>Date', dataIndex: 'A1672FPROC', width: 80},
                                    {text: 'System<br>Date', dataIndex: 'A1672FREGI', width: 70},
                                    {text: 'Suggested<br>Date', dataIndex: 'A1672FREVI', width: 75},
                                    {text: 'Itinerary', dataIndex: 'A1672ITIN', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Farebasis', dataIndex: 'A1672FBASI', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Type', dataIndex: 'A1672MEMO', width: 70, align: 'center'},
                                    {text: 'Total Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Curr.', dataIndex: 'A1672CURRENCY', width: 50},
                                            {text: 'Airline', dataIndex: 'A1672TTMIA', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Agent', dataIndex: 'A1672TTAGT', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Difference', dataIndex: 'A1672TTDIF', width: 80, renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'FCMI', dataIndex: 'A1672FCMI', width: 30},
                                    {text: 'User', dataIndex: 'A1672REVIS', width: 88, renderer: 'onRendererColumnAttr'},
                                    {text: 'Audited', dataIndex: 'A1672STO0', width: 88, renderer: 'onRendererColumnAttr'},
                                    {text: 'Transfer', dataIndex: 'A1672FLADM', width: 88, renderer: 'onRendererColumnAttr'},
                                    {text: 'ADM/ACM</br>/NC/NA', dataIndex: 'A1672CHADI', width: 88, renderer: 'onRendererColumnAttr'},
                                    {text: 'Tour Code', dataIndex: 'A1672CODIT', width: 88, renderer: 'onRendererColumnAttr'},
                                    {text: 'Status </br>Accepted', dataIndex: 'A2548FLAG', width: 88, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'EMD Real', dataIndex: 'A1672TKCNX', width: 120},
                                    {text: 'Agent', dataIndex: 'A1672BAGFT', width: 70},
                                    {text: 'PNR', dataIndex: 'A1672PNR', width: 70},
                                    {text: 'Error </br> Code', dataIndex: 'A1672ERROR', renderer: 'onRendererColumnAttr'},
                                    {text: 'Reason Code', dataIndex: 'A1672NREASON', renderer: 'onRendererColumnAttr'},
                                    {
                                        xtype: 'actioncolumn',
                                        text: '&nbsp;',
                                        sortable: false,
                                        width: 30,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                handler: 'searchPopup'
                                            }
                                        ]
                                    }
                                    //

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
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
