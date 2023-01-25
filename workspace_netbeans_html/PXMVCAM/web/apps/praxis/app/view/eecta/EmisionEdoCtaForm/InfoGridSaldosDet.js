
Ext.define('Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridSaldosDet', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id02 + '-info-det',    
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id02 + '-boxPrincipal-det',
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
                    id: prototype.id02 + '-boxMainData-det',
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
                            id: prototype.id02 + '-gridData-det',
                            columnLines: true,
                            autoScroll: true,
                            width: 800,
                            height: 270,
                            padding: '0px 5px 1px 5px',                                                       
                            columns: {
                                items: [
                                    {text: 'Nº boleto', dataIndex: 'A3990TOT', width: 100, align: 'center', locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A3958CIA') + record.get('A3958FORMA') + record.get('A3958SERIE') ;
                                        }
                                    },
                                    {text: 'Fecha<br> Emisión', dataIndex: 'A3958FEVTA', width: 70, align: 'center', locked: true},
                                    {text: 'Nombre Pasajero', dataIndex: 'A3958PAX', width: 250, align: 'left', locked: true },
                                    {text: 'Ref1.', dataIndex: 'A3958SOLER', width: 50, align: 'center'},
                                    {text: 'Trx.', dataIndex: 'A3958TRNCU', width: 50, align: 'center'},
                                    {text: 'Ruta', dataIndex: 'A3958RUTA', width: 90, align: 'left'},
                                    {text: 'UUID', dataIndex: 'A3958CFDI', width: 100, align: 'left'},
                                    {text: 'Mda.', dataIndex: 'A3958MDLOC', width: 50, align: 'left'},                                    
                                    {
                                        text: 'Saldo', dataIndex: 'A3958TOT', width: 90, align: 'right',                                        
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Ant.Saldo<br>(dias)', dataIndex: 'ANT_SALDO', width: 90, align: 'Center'}
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
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id01 + '-pie',
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
//                                            id: prototype.id01 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id01 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id01 + '-lbl-total',
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
