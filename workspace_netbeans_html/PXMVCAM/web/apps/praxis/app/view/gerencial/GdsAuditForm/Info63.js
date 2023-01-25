
Ext.define('Ext.Praxis.view.gerencial.GdsAuditForm.Info63', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info63',
    layout: 'border',
    align: 'center',
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
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDATA">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData63',
                            columnLines: true,                            
                            width: 990,
                            height: 525,
                            padding: '0px 5px 1px 5px',
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary',
                                    remoteRoot: 'summaryData'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'GDS <br>Name', dataIndex: 'GDS_NAME', locked: true, width: 70, align: 'left'},
                                    {text: 'PARTNER', dataIndex: 'PARTNER', locked: true, width: 75},
                                    {text: 'COUNTRY', dataIndex: 'COUNTRY', locked: true, width: 80},
                                    {text: 'IATA', dataIndex: 'IATA', locked: true, width: 65},
                                    {text: 'PSEUDOC', dataIndex: 'PSEUDOC', width: 75, align: 'left'},
                                    {text: 'AGNAME', dataIndex: 'AGNAME', flex: 1, align: 'left'},
                                    {text: 'PNRGDS', dataIndex: 'PNRGDS', width: 70},
                                    {text: 'FNUMBER', dataIndex: 'FNUMBER', width: 80},
                                    {text: 'FDATE', dataIndex: 'FDATE', width: 60},
                                    {text: 'ORIGEN', dataIndex: 'ORIGEN', width: 65},
                                    {text: 'DESTINO', dataIndex: 'DESTINO', width: 70},
                                    {text: 'PAXNAME', dataIndex: 'PAXNAME', width: 100, align: 'left'},
                                    {text: 'SEAT', dataIndex: 'NUMSEAT', width: 80},
                                    {text: 'BN', dataIndex: 'BN', width: 40,
                                        summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'NET', dataIndex: 'NET', width: 65, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'VNR', dataIndex: 'VNR_NAME', width: 70},
                                    {
                                        xtype: 'checkcolumn',
                                        dataIndex: 'ESTAFIN',
                                        headerCheckbox: true,
                                        width: 30,
                                        stopSelection: false
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
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function(obj) {

                                }
                            }

                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
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
                                            text: 'Total Records',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
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