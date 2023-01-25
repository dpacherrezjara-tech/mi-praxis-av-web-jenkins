
Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAplPaymentBatch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id03 + '-infoGridAplPaymentBatch',    
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id03 + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id03 + '-boxMainData',
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
                            id: prototype.id03 + '-infoGridAplPaymentBatch',
                            columnLines: true,                            
                            width: 840,
                            height: 310,
                            padding: '0px 5px 1px 5px',
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Nº Lote <br>load batch', dataIndex: 'A4021LOTE', width: 80, align: 'center', locked: true},
                                    //{text: 'Seq.', dataIndex: 'A4021SQCG', width: 40, align: 'center', locked: true},
                                    {
                                        text: 'Nº Boleto', dataIndex: '', width: 100, align: 'center', locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A4021CIA') + record.get('A4021FORMA') + record.get('A4021SERIE');
                                        }
                                    },      
                                    {text: 'UUID', dataIndex: 'A4021UUID', width: 70, align: 'left', locked: true},
                                    {text: 'Fecha<br>Pago', dataIndex: 'A4021FECPG', width: 70, align: 'center', locked: true},
                                    {text: 'Mda.', dataIndex: 'A4021MDAPG', width: 50, align: 'center', locked: true },                                    
                                    {
                                        text: 'Importe<br>Pago', dataIndex: 'A4021TOTPG', width: 85, align: 'right', locked: true,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            //summaryData.style = "background-color:red;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Importe <br> Venta', dataIndex: 'A4021TOVTA', width: 85, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            summaryData.style = "background-color:green;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Diff.', dataIndex: 'A4021TODIF', width: 70, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            summaryData.style = "background-color:red;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            if(record.get('A4021TODIF') === 0)metaData.style = 'font-weight:bold;color:green;';
                                            if(record.get('A4021TODIF') !== 0)metaData.style = 'font-weight:bold;color:red;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },                                    
                                    {text: 'Ref.', dataIndex: 'A4021REFPG', width: 90, align: 'center', locked: false},
                                    {
                                        text: 'Estado', dataIndex: 'A4021STAT', width: 60, align: 'center', locked: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                                                                                       
                                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="Match" >';
                                            if ( value === '1' )
                                            var html = '<img src="resources/img/semaforo/Circle_Red.png" title="Error" >';                                                
                                            return html;
                                        }
                                    },
                                    {
                                        text: 'Mensaje <br>Resultado', dataIndex: 'A4021DESER', width: 170, align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(record.get('A4021STAT') === '0')metaData.style = 'font-weight:bold;color:green;';
                                            if(record.get('A4021STAT') !== '0')metaData.style = 'font-weight:bold;color:red;';
                                            return value;
                                        }
                                    },                                    
                                    {text: 'Nº Reporte', dataIndex: 'A4021NRRPT', width: 80, align: 'center'},
                                    {text: 'Id Cliente', dataIndex: 'A4021CDCLI', align: 'center', width: 80},
                                    {text: 'Nombre Cliente', dataIndex: 'A3953RSOCI', align: 'left', width: 200}                                    
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
