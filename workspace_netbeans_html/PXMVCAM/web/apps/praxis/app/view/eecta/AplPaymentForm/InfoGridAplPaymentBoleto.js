
Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAplPaymentBoleto', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-infoGridAplPaymentBoleto',
    //layout: 'border',
    //align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal-infoGridAplPaymentBoleto',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData-infoGridAplPaymentBoleto',
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
                            id: prototype.id + '-infoGridAplPaymentBoleto',
                            columnLines: true,
                            width: 890,
                            height: 300,
                            padding: '0px 5px 1px 5px',
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            plugins: 'gridfilters',
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: { 
                                    beforeselect: function (grid, record, index, eOpts, metaData) {                                  
                                        if (Ext.String.trim(record.get('A3958STSPG')) === 'T') return false;
                                        else return true;
                                    },
                                    selectionchange:function( this_grid, selected, eOpts ){
                                        //console.log(selected);
                                        var i = 0, vl_total = 0;
                                        for (; i < selected.length; ++i) {                                            
                                            vl_total += selected[i].get('A3958SALDP'); //OLD: A3958TOT
                                        }
                                        Ext.getCmp(prototype.id + '-total_sel').setValue( Ext.util.Format.number( vl_total, '0,000.00') );
                                    }
                                }
                            },
                            columns: {
                                items: [
                                    {text: 'Boleto', dataIndex: 'TICKET_NUMBER', width: 100, align: 'center', locked: true,
                                        summaryType: 'count',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000') + ' Boleto(s)';
                                        },
                                        filter: {                                            
                                            type: 'string',                                            
                                            //value: '139', // setting a value makes the filter active.
                                            itemDefaults: {
                                                // any Ext.form.field.Text configs accepted
                                            }
                                        }
                                    },                                                                        
                                    {text: 'Pax', dataIndex: 'A3958PAX', align: 'left', width: 200, locked: true},
                                    {text: 'Grupo', dataIndex: 'A3958GRUPO', align: 'left', width: 70},
                                    {text: 'Trx.', dataIndex: 'A3958TRNCU', align: 'center', width: 60},
                                    {text: 'Fecha<br>Proceso', dataIndex: 'A3958FPROC', align: 'left', width: 70},                                                                       
                                    {
                                        text: 'Tarifa', dataIndex: 'A3958FARE', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Iva', dataIndex: 'A3958IVA', width: 60, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Tua', dataIndex: 'A3958TUA', width: 60, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'YR', dataIndex: 'A3958YR', width: 60, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Otr', dataIndex: 'A3958OTR', width: 60, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Total', dataIndex: 'A3958TOT', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Pagos', dataIndex: 'A3958TOTAP', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Saldo', dataIndex: 'A3958SALDP', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },                                     
                                    {text: 'Id Contable', dataIndex: 'A3958IDCON', align: 'left', width: 130},
                                    {text: 'UUID', dataIndex: 'A3958CFDI', align: 'left', width: 130},
                                    {text: 'RFC', dataIndex: 'A3958RFC', align: 'left', width: 80},
                                    {text: 'Fecha <br> Timbrado', dataIndex: 'A3958FECTB', align: 'left', width: 70}
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: false,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    //console.log(record.data.A3958STSPG); 
                                    if ( record.data.A3958STSPG === "T" )                  
                                         return 'rowC';                                        
//                                    if (rowIndex % 2 === 0)
//                                        return 'rowA';
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
