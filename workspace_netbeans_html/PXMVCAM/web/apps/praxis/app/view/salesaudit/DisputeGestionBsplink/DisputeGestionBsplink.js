
prototype.id = 'DisputeGestionBsplink';
prototype.id1 = 'DetailDisputeGestionBsplink';
prototype.url = CONTEXTPATH + '/DisputeGestionBsplink';
prototype.widthContenedor = 1400;
prototype.heightContenedor = 550;

Ext.define('Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeGestionBsplink',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.DisputeGestionBsplink',

    requires:[
        'Ext.Praxis.controller.salesaudit.DisputeGestionBsplink.DisputeGestionBsplinkController',
        'Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplink'
    ],

    controller: 'DisputeGestionBsplinkController',

    id: prototype.id + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults:{
        border: false
    },
    listeners:{
        beforeShow: 'OnBeforeShow'
    },
    items:[
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
                                    listeners:{
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.id + '-pagginator-01',
                                    pagInfo:[
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
                                                select: 'onCmbSearchSelect'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom', hidden: true,
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateTo', hidden: true,
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-iata', hidden: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboOrigin', hidden: true,
                                            fieldLabel: 'Origin',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbOriginAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboArea', hidden: true,
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
                                            listeners: {
                                                afterrender: 'onCmbAreaAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-nmemo', hidden: true,
                                             maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-country', hidden: true,
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
                                        }


                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-02', hidden: true,
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
                                                 select: 'onCmbSourceSelect'
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
                                                afterrender: 'onCmbChannelAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-country2',hidden: true,
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
                                            id: prototype.id + '-TourCode',
                                            fieldLabel: 'Tour Code',
                                            maxLength: 15,
                                            enforceMaxLength: 15,
                                            labelWidth: 60,
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
                                           // readOnly: true,
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
                                            id: prototype.id+'-cmbError',
                                            fieldLabel: 'Reasons',
                                            queryMode: 'local',
                                            displayField: 'A2548DESC1',
                                            valueField: 'A2548CODR1',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig:{
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
                            id: prototype.id + '-gridData',
                           // flex: 1,
                            width: prototype.widthContenedor,
                            height: prototype.heightContenedor,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Memo <br> number', dataIndex: 'A2548NMEMO', align: 'center', width: 90, 
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A2548PAIS', align: 'center', width: 60, 
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A2548IATA', align: 'center', width: 70, 
                                    },
                                    {text: 'Agency', dataIndex: 'AGENCY', width: 200, align: 'left',
                                        renderer: function(value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {text: 'Currency', dataIndex: 'A2548MDA', width: 70, align: 'center'},
                                    {
                                        text: 'Fare', dataIndex: 'A2548NETO', width: 80, sortable: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {text: 'Source', dataIndex: 'A2548FTE', width: 55, align: 'center'},
                                    {
                                        text: 'Dispute <br> Date', dataIndex: 'A2548FDISP', align: 'center', width: 100, 
                                    },
                                  /*  {
                                        text: 'Tour <br> Code', dataIndex: 'A2548CODIT', align: 'center', width: 100, sortable: false
                                    },*/
                                    {
                                        text: 'System <br> Date', dataIndex: 'A2548FREGI', align: 'center', width: 70, 
                                    },
                                    {
                                        text: 'Accounting / <br> Issue Date', dataIndex: 'A2548FCONT', align: 'center', width: 100, 
                                    },
                                    /*{
                                        text: 'Processing <br> Date', dataIndex: 'A2548FPROC', align: 'center', width: 85, sortable: false
                                    },*/
                                    {text: 'Audit', dataIndex: 'A2548REGIS', width: 90, align: 'right'},
                                    {
                                        text: 'Origin', dataIndex: 'A2548BASE', align: 'center', width: 80, 
                                    },
                                    {
                                        text: 'Area', dataIndex: 'A2548AREADES', align: 'center', width: 100, 
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A2548FLAG', flex: 1, sortable: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var backgroundColor =
                                                    data.A2548FLAG === 'A' ? "#99FFCC" :
                                                    (data.A2548FLAG === 'U') ? "#0099FF" :
                                                    (data.A2548FLAG === 'X') ? "#FF0000" :
                                                    (data.A2548FLAG === 'C') ? "#D329E8" :
                                                    (data.A2548FLAG === 'P') ? "#14C92F" :
                                                    (data.A2548FLAG === 'I') ? "#14C92F" :
                                                    (data.A2548FLAG === 'F') ? "#14C92F" :
                                                    (data.A2548FLAG === 'Z') ? "#F8D169" :
                                                    (data.A2548FLAG === 'R') ? "#F2A60D" :
                                                    (data.A2548FLAG === 'J') ? "#69D3F8" :
                                                    (data.A2548FLAG === 'D') ? "#FF9966" :
                                                    (data.A2548FLAG === 'E') ? "#E8400C" :
                                                    (data.A2548FLAG === 'W') ? "#A50C88" :
                                                    (data.A2548FLAG === 'B') ? "#CC9966" :
                                                    (data.A2548FLAG === 'Y') ? "#CCFF00" :
                                                    (data.A2548FLAG === 'N') ? "#FF0000" :
                                                    (data.A2548FLAG === 'O') ? "#B03A2E" :
                                                    (data.A2548FLAG === 'Q') ? "#DC7633" :
                                                    (data.A2548FLAG === 'L') ? "#B280CC" : "#FFFFFF";
                                            var fontWeight = (data.A2548FLAG === 'X' ? 'bold' : 'bold');
                                            metaData.style = "text-align:center;background-color:" + backgroundColor + ";font-weight:" + fontWeight + ";";
                                            var dat = "";
                                            if (data.A2548FLAG === "A")
                                                dat = "Approved";
                                            if (data.A2548FLAG === "U")
                                                dat = "Cleared Up";
                                            if (data.A2548FLAG === "X")
                                                dat = "Canceled";
                                            if (data.A2548FLAG === "C")
                                                dat = "Condoned";
                                            if (data.A2548FLAG === "I")
                                                dat = "Billed GDS";
                                            if (data.A2548FLAG === "P")
                                                dat = "Billed";
                                            if (data.A2548FLAG === "F")
                                                dat = "Accredited";
                                            if (data.A2548FLAG === "Z")
                                                dat = "Authorized";
                                            if (data.A2548FLAG === "N")
                                                dat = "Rejected";
                                            if (data.A2548FLAG === "R")
                                                dat = "Reaudited";
                                            if (data.A2548FLAG === "J")
                                                dat = "Justified";
                                            if (data.A2548FLAG === "D")
                                                dat = "Disputed";
                                            if (data.A2548FLAG === "E")
                                                dat = "Rejecte Disputed";
                                            if (data.A2548FLAG === "W")
                                                dat = "Approve Disputed";
                                            if (data.A2548FLAG === "B" && data.A2548TRNCU === 'ADMA')
                                                dat = "Adm na BSPlink/MM";
                                            if (data.A2548FLAG === "B" && data.A2548TRNCU !== 'ADMA')
                                                dat = "Acm na BSPlink/MM";
                                            if (data.A2548FLAG === "O")
                                                dat = "IATA Disabled";
                                            if (data.A2548FLAG === "Q")
                                                dat = "Unregistered Client";
                                            if (data.A2548FLAG === "L" && data.A2548TRNCU === 'ADMB')
                                                dat = "Adm BSPlink/MM";
                                            if (data.A2548FLAG === "L" && data.A2548TRNCU !== 'ADMB')
                                                dat = "Acm BSPlink/MM";
                                            if (data.A2548FLAG === "Y")
                                                dat = "Pending";
                                            return dat;
                                        }
                                    },
                                    {text: 'Days', dataIndex: 'A2548DIAS', width: 50, align: 'center'},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 40,
                                        renderer: 'onRendererColumnOnTime'
                                    },
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
                                    }
                                    /*{
                                        text: 'ADM<br>Tracing', dataIndex: '', width: 60, renderer: 'onRendererColumnOnLote'
                                        listeners: {
                                            click: 'searchDocumt'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var src = ( data.A2548NMEMO!=='') ? 'resources/img/icon/16x16/search_docum.png' : '';
                                            return '<a href="#salesaudit-dispute-gestion-bsplink"><img src="'+src+'"></a>';
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

