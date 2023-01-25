
Ext.define('Ext.Praxis.view.sales.VouchersIssuedVersusClaimsForm.Info01', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id01 + '-info01',    
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id01 + '-boxPrincipal-uatp',
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
                    id: prototype.id01 + '-boxMainData-uatp',
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
                            id: prototype.id01 + '-gridData-TKT',
                            columnLines: true,
                            autoScroll: true,
                            width: '100%',
                            height: 220,
                            padding: '0px 5px 1px 5px',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
//                            dockedItems: [
//                                {
//                                    xtype: 'toolbar',                                    
//                                    dock: 'right',
//                                    items: [
//                                        {
//                                            text: 'Add',
//                                            id: prototype.id + '-gridData-uatp-add',
//                                            iconCls: 'prx-icon-add',                                            
//                                            handler: 'onClickAdd_uatp'
//                                        }
//                                    ]
//                                }],
                            columns: {
                                items: [
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        locked: true,
                                        items: [
                                            {                                                
                                                tooltip: 'Click for Remove',
                                                iconCls: 'prx-icon-image-trash', 
                                                handler: 'onClickRemove'                                                
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Number Prime', dataIndex: 'A4213TICKET', locked: true, align: 'left', width: 130
//                                        editor: {
//                                            xtype: 'textfield',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 20
//                                        }
                                    },
                                    {
                                        text: 'Coupons', dataIndex: 'A4213CUPON', align: 'left', width: 120, locked: true
//                                        editor: {
//                                            xtype: 'textfield',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            enforceMaxLength: true,
//                                            maxLength: 111
//                                        }
                                    },
                                    {
                                        text: 'Issued Dt', dataIndex: 'A4213FEMIS', width: 90, align: 'left'                                        
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
//                                            return Ext.util.Format.date(value, 'Ymd');
//                                        }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'A4213AMOTK', width: 90, align: 'right',                                        
                                        editor: {
                                            xtype: 'numberfield',
                                            width: 120,                                                                                        
                                            enableKeyEvents: true,                                                                                        
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                                    }
                                                }
                                            }
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.style = 'background:yellow;font-weight:bold;color:green;'; 
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Curr.<br>Pay', dataIndex: 'A4213MDATK', width: 50, align: 'left'
                                    },
                                    {
                                        text: 'FOP', dataIndex: 'A4213TFOP', width: 90, align: 'right',
                                        renderer: function (value) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                     {
                                        text: 'FOP Rev.', dataIndex: 'A4213TFOPR', width: 90, align: 'right',
                                        renderer: function (value) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Pax Name', dataIndex: 'A4213PAX', width: 150, align: 'left'},
                                    {text: 'T. Doc.', dataIndex: 'A4213TDOC', width: 70, align: 'center'},
                                    {text: 'CJN', dataIndex: 'A4213FLG', width: 60, align: 'center'},
                                    {text: 'Usages', dataIndex: 'A720USOS', width: 60, align: 'left'}                                    
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
