
Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAppliedPaymentDet', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-infoGridAppliedPaymentDet',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal-infoGridAppliedPaymentDet',
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
                    id: prototype.id + '-boxMainData-infoGridAppliedPaymentDet',
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
                            id: prototype.id + '-infoGridAppliedPaymentDet',
                            columnLines: true,
                            title: 'Detalle',
                            width: 890,
                            height: 280,
                            padding: '0px 5px 1px 5px',
                            tbar: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-TICKET-CIA',
                                    fieldLabel: 'Consultar Boleto', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                    enableKeyEvents: true,
                                    width: 170,
                                    value: '139',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    height: 24,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress01'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-TICKET-NUMB',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                    fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                    enableKeyEvents: true,
                                    padding: '0 0 0 2',
                                    width: 110,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    height: 24,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress01'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-TICKET-SEQ',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                    enableKeyEvents: true,
                                    width: 30,
                                    value: '00',
                                    height: 24,
                                    padding: '0 0 0 2',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress01'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-apl-consulta-tkt',
                                    text: 'Consultar',
                                    icon: 'resources/img/icon/search.png',                                                    
                                    listeners: {
                                        click: 'get_aplpago_detalle'
                                    }
                                }
                            ],
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            //plugins: 'gridfilters',
                            columns: {
                                items: [
                                    {text: 'Boleto', dataIndex: 'TICKET_NUMBER', width: 105, align: 'center', locked: true,
                                        summaryType: 'count',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000') + ' Boleto (s)';
                                        }
//                                        filter: {                                            
//                                            type: 'string',                                            
//                                            //value: '139', // setting a value makes the filter active.
//                                            itemDefaults: {
//                                                // any Ext.form.field.Text configs accepted
//                                            }
//                                        }
                                    },
                                    {text: 'Trx.', dataIndex: 'A3977TRNCU', align: 'center', width: 50, locked: true},
                                    {text: 'Sec.<br>Apl.', dataIndex: 'A3977SQAPL', align: 'center', width: 40},
                                    {text: 'Fecha<br>Pago', dataIndex: 'A3977FECPG', align: 'center', width: 70},
                                    {text: 'Mda<br>Pago', dataIndex: 'A3977MDA', align: 'center', width: 60},
                                    {
                                        text: 'Total', dataIndex: 'A3977TOT', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            //metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Pago', dataIndex: 'A3977TOTAP', width: 80, align: 'right',
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
                                        text: 'Saldo', dataIndex: 'A3977SALD', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            //metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Estado', dataIndex: 'A3977STSPG', align: 'left', width: 100},
                                    {
                                        text: 'Aplicacion',
                                        columns: [
                                            {text: 'Usuario', dataIndex: 'A3977APLIC', width: 80, align: 'left'},
                                            {text: 'Fecha', dataIndex: 'A3977FAPLC', width: 80, align: 'left'},
                                            {text: 'Hora', dataIndex: 'A3977HAPLC', width: 50, align: 'left'}
                                        ]
                                    },
                                    {text: 'Tipo', dataIndex: 'A3977TRXPG', align: 'center', width: 60},
                                    {text: 'Ref. Pago', dataIndex: 'A3977REFPG', align: 'left', width: 130},
                                    {text: 'Banco', dataIndex: 'A3977BANCO', align: 'left', width: 130},
                                    {text: 'Cta Bancaria', dataIndex: 'A3977CTABC', align: 'left', width: 100}
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
//                                    if ( record.data.A3958STSPG === "T" )                  
//                                         return 'rowC';                                        
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
