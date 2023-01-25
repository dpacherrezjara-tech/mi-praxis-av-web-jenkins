
prototype.id = 'BsplinkTicketControlRFND';
prototype.url = CONTEXTPATH + '/BwrRefundTicketControl';
prototype.widthContenedor = 1000;
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.salesaudit.BsplinkTicketControlRFND.BsplinkTicketControlRFND', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.BsplinkTicketControlRFND',
    requires: [
        'Ext.Praxis.controller.salesaudit.BsplinkTicketControlRFND.BsplinkTicketControlRFNDController',
    ],
    controller: 'BsplinkTicketControlRFNDController',
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
            items:[
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding:'10px 5px 0px 5px',
                    layout:{
                        type: 'hbox',
                        pack: 'end'
                    },
                    items:[
                        { xtype: 'tbspacer', width: 50 },
                        {
                            xtype: 'toolbar',
                            items:[
                                {
                                    xtype:'button',
                                    id: prototype.id + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners:{
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype:'button',
                                    id: prototype.id + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners:{
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype:'button',
                                    id: prototype.id + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners:{
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners:{
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
                    defaults:{
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding:'5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'form',
                            id: prototype.id + '-contenedor-filters-form',
                            defaults:{
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items:[
                                {
                                    xtype: 'panel',
                                    id:prototype.id+'-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults:{
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items:[
                                        {
                                            xtype:'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.id+'-search-type',
                                            labelAlign:'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 275,
                                            editable: false,
                                            listConfig:{
                                                minWidth: 200
                                            },
                                            listeners:{
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id+'-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: false
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id+'-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtCia',
                                            hideLabel: true,
                                            width: 35,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtFrmaSerie',
                                            hideLabel: true,
                                            width: 80,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtSeq',
                                            hideLabel: true,
                                            width: 30,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-cmbCountry',
                                            fieldLabel: 'Country',
                                            labelWidth: 50,
                                            width: 110
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout:{
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults:{
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid',
                            columnLines: true,
                            autoScroll:true,
                            width: 950,
                            height: 480,
                            columns:{
                                items:[
                                    {text: 'System</br>date',dataIndex: 'A3389FREGI',width: 80},
                                    {text: 'Channel', dataIndex: 'A3389CHANEL', width: 60, sortable: false, align: 'center'},
                                    {text: 'Ticket',dataIndex: 'A3389TKT',width: 100},
                                    {text: 'Country',dataIndex: 'A3389PAIS',width: 70},
                                    {
                                        text: 'Status',
                                        flex: 1,
                                        columns:[
                                            {
                                                text: 'Send to audit',
                                                dataIndex: 'A3389FLAG',
                                                flex: 1,
                                                align: 'center'
                                            },
                                            {
                                                text: 'Return to audit',
                                                dataIndex: 'A3389STATO',
                                                flex: 1,
                                                align: 'center'
                                            },
                                            {
                                                text: 'Send to sabre',
                                                dataIndex: 'A3389STATU',
                                                flex: 1,
                                                align: 'center'
                                            },
                                            {
                                                text: 'Cur.',
                                                dataIndex: 'A3389MDA',
                                                width: 40,
                                                align: 'center'
                                            },
                                            {
                                                text: 'Amount',
                                                dataIndex: 'A3389TOTAL',
                                                width: 100,
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnAmountRenderer'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'All <br> process',
                                        dataIndex: '',
                                        width: 80,
                                        renderer: 'onRendererColumnOnTime'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 60,
                                        text: 'Detail',
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detail',
                                                handler: 'onSerecRelatedFolios'
                                            }
                                        ]
                                    }
                                ],
                                defaults:{
                                   sortable: true,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            viewConfig: {
                               // trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-contador',
                    layout:{
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: transparent;',
                    defaults:{
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults:{
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    id: prototype.id + '-lbl-sent',
                                    text: '0',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 30 },
                                {
                                    id: prototype.id + '-lbl-return',
                                    text: '0',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    id: prototype.id + '-lbl-sabre',
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

