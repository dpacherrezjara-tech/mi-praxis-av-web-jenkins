
Ext.define('Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridCalendario', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info-GridCalendario',   
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal-GridCalendario',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData-GridCalendario',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData-GridCalendario',
                            columnLines: true,
                            autoScroll: true,
                            width: '100%',
                            height: 130,
                            padding: '0px 5px 1px 5px',
//                            plugins: {
//                                ptype: 'cellediting',
//                                clicksToEdit: 1
//                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',                                    
                                    dock: 'right',
                                    items: [
//                                        {
//                                            text: 'Add',
//                                            id: prototype.id + '-gridData-identif-add',
//                                            iconCls: 'prx-icon-add',                                            
//                                            handler: 'onClickAdd_identif'
//                                        }
                                    ]
                                }],
                            columns: {
                                items: [
                                    {
                                        text: 'TIPO', dataIndex: 'A3965PERIO', locked: true, align: 'center', width: 70
//                                        editor: {
//                                            xtype: 'textfield',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 20
//                                        }
                                    },
                                    {
                                        text: 'Tipo<br>Periodo', dataIndex: 'A3965INDPE', align: 'center', width: 60
//                                        editor: {
//                                            xtype: 'textfield',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 100
//                                        }
                                    },
                                    {
                                        text: 'Fecha<br>Emisión', dataIndex: 'A3965FEJEC', width: 80, align: 'center'
//                                        editor: {
//                                            xtype: 'textfield',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 6
//                                        }
                                    },
                                    {
                                        text: 'Periodo', 
                                        columns: [
                                            {text: 'Año', dataIndex: 'A3965AAAAP', width: 50, align: 'center'},
                                            {text: 'Mes', dataIndex: 'A3965MMP', width: 40, align: 'center'},
                                            {text: 'Desde', dataIndex: 'A3965FINIP', width: 70, align: 'center'},
                                            {text: 'Hasta', dataIndex: 'A3965FFINP', width: 70, align: 'center'}
                                        ]
//                                        editor: {
//                                            xtype: 'datefield',
//                                            width: 120,
//                                            format: 'Y/m/d',
//                                            //minValue: new Date(1990, 00, 01),
//                                            maskRe: /[0-9/]/,
//                                            editable: true,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 10,
//                                            //padding: '2 0 0 2 ',
//                                            listeners: {
//                                                keypress: function (obj, e) {
//                                                    if (e.getKey() === e.ENTER) {
//                                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
//                                                    }
//                                                }
//                                            }
//                                        },
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.date(value, 'Y/m/d');
//                                        }
                                    },
                                    {
                                        text: 'Estado', dataIndex: 'A3965STAT', width: 70, align: 'center'
//                                        editor: {
//                                            xtype: 'datefield',
//                                            width: 120,
//                                            format: 'Y/md',
//                                            //minValue: new Date(1990, 00, 01),
//                                            maskRe: /[0-9/]/,
//                                            editable: true,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 10,
//                                            //padding: '2 0 0 2 ',
//                                            listeners: {
//                                                keypress: function (obj, e) {
//                                                    if (e.getKey() === e.ENTER) {
//                                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
//                                                    }
//                                                }
//                                            }
//                                        },
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.date(value, 'Y/m/d');
//                                        }
                                    }
//                                    {
//                                        xtype: 'actioncolumn',
//                                        sortable: false,
//                                        width: 40,
//                                        align: 'center',
//                                        items: [
//                                            {                                                
//                                                tooltip: 'Click for Remove',
//                                                iconCls: 'prx-icon-image-trash', 
//                                                //handler: 'onClickRemove_identif'                                                
//                                            }
//                                        ]
//                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'left'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
//                            width: prototype.widthGrid,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 1px 1px 1px',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: prototype.widthGrid,
//                                    height: 25,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        margin: '3px 0px 0px 5px'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
