
Ext.define('Ext.Praxis.view.sales.VouchersIssuedVersusClaimsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
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
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
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
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            width: '99%',
                            height: 500,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    
                                    {
                                        text: 'Travel Voucher Nbr', dataIndex: '', width: 120, align: 'center',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                                             
                                            return record.get("A4213CIA")+record.get("A4213FORMA")+record.get("A4213SERIE");
                                        }
                                    },
                                    {text: 'Issued Date', dataIndex: 'A4213FECVT', align: 'center', width: 100},
                                    {text: 'Curr.', dataIndex: 'A4213MONED', width: 50, align: 'center'},
                                    {text: 'Amount', dataIndex: 'A4213AMOUN', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },                                    
                                    {text: 'Agent', dataIndex: 'A4213AGENT', align: 'center', width: 70},
                                    {text: 'Ticket<br>Ancillaries', dataIndex: '', align: 'center', width: 120,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                                                                                         
                                            return record.get("A4213CIATK")+record.get("A4213FORTK")+record.get("A4213SERTK");
                                        }
                                    },                                    
                                    {text: 'Coupons', dataIndex: 'A4213CUPON', align: 'center', width: 70},                                    
                                    {text: 'Curr.', dataIndex: 'A4213MDATK', width: 50, align: 'center'},
                                    {text: 'Amount', dataIndex: 'A4213TFOP', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            value.style = "background-color:green;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Estado', dataIndex: 'A4213STAF', align: 'left', width: 100,
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                                                                                         
                                            var vl_estado = 'PENDIENTE';
                                            if( value === 'F' ) vl_estado = 'FORMATEADO';
                                            if( value === 'X' ) vl_estado = 'ERROR';
                                            return vl_estado;
                                        }
                                    },
                                    {text: 'System Date', dataIndex: 'A4213FECIN', align: 'center', width: 100},
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 35,
                                        align: 'center',
                                        //locked: true,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle',
                                                handler: 'onEditClick'
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
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: 210,
                            height: 35,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxPaginacion',
                                    width: 210,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
