/*DetailRefundQueryRFND*/
/*
 * Desarrollado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.DetailRefundQueryRFND', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailRefundQueryRFND',

    controller: 'DetailRefundQueryRFNDController',

    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.DetailRefundQueryRFNDController',
        'Ext.Praxis.view.salesaudit.RFNDPending.RFNDFormRazones'
    ],
    id: prototype.id01 + '-win',

    title: '',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 600,
    width: 1100,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.id01 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNumber',
                            fieldLabel: 'Folio',
                            labelWidth: 35,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtArea',
                            fieldLabel: 'Area',
                            labelWidth: 40,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-Company',
                            fieldLabel: 'Company',
                            labelWidth: 55,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAplidate',
                            fieldLabel: 'Application date',
                            labelWidth: 100,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 3, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtHourRFND',
                            fieldLabel: 'Hour RFND',
                            labelWidth: 70,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtEmail',
                            fieldLabel: 'Email',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 230
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtEmail2',
                            fieldLabel: 'Email',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 230
                        },
                        {
                            width: 6, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtDateModi',
                            fieldLabel: 'Date modified',
                            labelWidth: 100,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        }
                        /* {
                         xtype: 'textfield',
                         id: prototype.id01 + '-txtCURRENCY',
                         fieldLabel: 'Currency',
                         labelWidth: 50,
                         width: 200,
                         value: 'xxxxxx',
                         readOnly: true
                         },
                         {
                         width: 6, border: false
                         },
                         {
                         xtype: 'textfield',
                         id: prototype.id01 + '-txtNeto',
                         fieldLabel: 'Neto',
                         labelWidth: 30,
                         width: 160,
                         value: '0000',
                         readOnly: true
                         }*/
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtUSER',
                            fieldLabel: 'Auditor',
                            labelWidth: 40,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            width: 6, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtStatusRFND',
                            fieldLabel: 'Status RFND',
                            labelWidth: 80,
                            width: 300,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        /*{
                         width: 6, border: false
                         },
                         {
                         xtype: 'textfield',
                         id: prototype.id01 + '-txtTypeRFND',
                         fieldLabel: 'Type RFND',
                         labelWidth: 65,
                         width: 190,
                         value: 'xxxxxx',
                         readOnly: true
                         },*/
                        {
                            width: 6, border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCOUNTRY',
                            fieldLabel: 'Country',
                            labelWidth: 50,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        }


                    ]
                },
                /*{
                 xtype: 'panel',
                 layout: 'hbox',
                 defaults: {
                 style: 'margin: 1px',
                 fieldStyle: 'font-weight: bold; color: blue;'
                 },
                 items: [
                 {
                 xtype: 'textfield',
                 id: prototype.id01 + '-txtStatus',
                 fieldLabel: 'Status',
                 labelWidth: 40,
                 value: 'xxxxxx',
                 readOnly: true,
                 width: 200
                 },
                 {
                 xtype: 'textfield',
                 id: prototype.id01 + '-txtDateModi',
                 fieldLabel: 'Date modified',
                 labelWidth: 100,
                 width: 200,
                 value: 'xxxxxx',
                 readOnly: true,
                 labelAlign: 'right'
                 }
                 
                 
                 ]
                 },*/
                {
                    xtype: 'panel',
                    layout: 'hbox', hidden: true,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPreme',
                            fieldLabel: '',
                            readOnly: true,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTKTDUPLI',
                            fieldLabel: '',
                            readOnly: true,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFolio',
                            fieldLabel: '',
                            readOnly: true,
                            hidden: true
                        },
                        {xtype: 'textfield', id: prototype.id01 + '-txtCanTKT', hidden: true},
                        {xtype: 'textfield', id: prototype.id01 + '-txtIdioma', hidden: true}


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridtkt',
                            title: 'Documents Agent',
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    //{text: 'Airline', dataIndex: 'A3648CCUST', flex: 1},
                                    {text: 'TKT\'S', dataIndex: 'A3648TKT', width: 120},
                                    {text: 'IATA', dataIndex: 'A3648IATA', width: 65},
                                    {text: 'Cur.', dataIndex: 'A3648MDA', width: 50},
                                    {text: 'Fare', dataIndex: 'A3648TARIF', width: 70, align: 'right', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Taxes', dataIndex: 'A3648TTAX', width: 70, align: 'right', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Total<br>Xml', dataIndex: 'A3648TOTAL', width: 70, align: 'right', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Total<br>RFND', dataIndex: 'A3648TOTAD', width: 70, align: 'right', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Pax', dataIndex: 'A3648PAX', width: 150, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'Status', dataIndex: 'A3648FLAG', width: 100},
                                    {text: 'Status </br> SABRE', dataIndex: 'A3648STFIN', width: 100, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'Status </br> audit', dataIndex: 'A3648STATO', width: 100, align: 'left', renderer: 'onRendererColumnAttr'},
                                    //{text: 'Case S.F.', dataIndex: 'A3648SFW', width: 100},

                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
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

                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txaDescription',
                            fieldLabel: 'Description',
                            labelWidth: 130,
                            grow: true,
                            readOnly: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id01 + '-contenedor-status',
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-ComboEstatus',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'left',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterrender'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Add Reasons',
                            iconCls: 'prx-icon-add',
                            listeners: {
                                click: 'onAddRazonClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridRazones', hidden: true,
                            columnLines: true,
                            autoScroll: true,
                            selModel: 'cellmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: {
                                items: [
                                    {text: 'Sender', dataIndex: 'A3649TYPE', align: 'center', width: 90},
                                    {text: 'Code', dataIndex: 'A3649CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A3649ERROR', flex: 1, editor: 'textfield'},
                                    {text: 'File', dataIndex: 'A3649ARCHI', width: 90, renderer: 'OnColumnRazones1Renderer'},
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50, dataIndex: 'A3649TYPE',
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnChkRFNDRemove',
                                                getClass: function (v, meta, rec) {
                                                    if (rec.data.A3649TYPE === 'Company') {
                                                        return '';
                                                    }else{
                                                         return 'prx-icon-image-trash';
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            flex: 1
                        }, {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridRazonesDetall', hidden: true,
                            columnLines: true,
                            autoScroll: true,

                            columns: {
                                items: [
                                    {text: 'Sender', dataIndex: 'A3649TYPE', align: 'center', width: 90},
                                    {text: 'Code', dataIndex: 'A3649CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A3649ERROR', flex: 1},
                                    {text: 'File', dataIndex: 'A3649ARCHI', width: 90, renderer: 'OnColumnRazones2Renderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id01 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});


