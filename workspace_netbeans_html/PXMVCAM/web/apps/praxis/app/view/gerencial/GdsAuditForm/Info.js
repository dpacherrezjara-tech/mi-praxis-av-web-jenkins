
Ext.define('Ext.Praxis.view.gerencial.GdsAuditForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
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
                        // <editor-fold defaultstate="collapsed" desc="gridTree">
                        {
                            xtype: 'treepanel',
                            id: prototype.id + '-gridtree00',
                            width: 600,
                            height: 540,
                            //root: dataRoot,
                            reserveScrollbar: true,
                            useArrows: true,
                            rootVisible: false,
                            multiSelect: true,
                            columnLines: true,
                            rowLines: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'treecolumn',
                                    text: '',
                                    dataIndex: 'DESCRIPTION',
                                    flex: 1
                                },
                                {
                                    text: 'BN',
                                    dataIndex: 'BN',
                                    width: 90,
                                    align: 'right',
                                    summaryType: 'sum',
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        //console.log('id_TOT_BN_' + prototype.id_TOT_BN_);
                                        return Ext.util.Format.number(prototype.id_TOT_BN_, '0,000');
                                    },
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                        if (record.get('IS_TOTAL'))
                                            metaData.tdStyle = 'font-weight: bold;';
                                        return Ext.util.Format.number(value, '0,000');
                                    }
                                },
                                {
                                    text: 'NET',
                                    dataIndex: 'NET',
                                    width: 90,
                                    align: 'right',
                                    summaryType: 'sum',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                        if (record.get('IS_TOTAL'))
                                            metaData.tdStyle = 'font-weight: bold;';
                                        return Ext.util.Format.number(value, '0,000.00');
                                    },
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        var grid = Ext.getCmp(prototype.id + '-gridtree00');
                                        var store = grid.getStore();
                                        var val_overcharge = 0;
                                        store.each(function(value, index) {
                                            if (Ext.String.trim(value.get('DESCRIPTION').toUpperCase()) === 'OVERCHARGE') {
                                                val_overcharge = parseFloat(value.get('NET'));
                                            }
                                        });
                                        return Ext.util.Format.number(parseFloat(prototype.id_TOT_NET_) - val_overcharge, '0,000.00');
                                    }
                                },
                                {
                                    text: '%',
                                    dataIndex: 'NETPOR',
                                    width: 50,
                                    align: 'center',
                                    summaryType: 'sum',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                        if (record.get('IS_TOTAL'))
                                            metaData.tdStyle = 'font-weight: bold;';
                                        return Ext.util.Format.number(value, '0,000.00');
                                    },
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Ext.util.Format.number('100', '0,000.00');
                                    }
                                },
                                {
                                    text: 'AVG',
                                    dataIndex: 'AVG',
                                    width: 50,
                                    align: 'center',
                                    summaryType: 'sum',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                        if (record.get('IS_TOTAL'))
                                            metaData.tdStyle = 'font-weight: bold;';
                                        return Ext.util.Format.number(value, '0,000.00');
                                    },
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Ext.util.Format.number(prototype.id_TOT_AVG_, '0,000.00');
                                    }
                                },
                                {
                                    text: 'ADM',
                                    dataIndex: 'PNLT',
                                    width: 90,
                                    align: 'right',
                                    summaryType: 'sum',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                        if (record.get('IS_TOTAL'))
                                            metaData.tdStyle = 'font-weight: bold;';
                                        return Ext.util.Format.number(value, '0,000.00');
                                    },
                                    summaryRenderer: function(value, summaryData, dataIndex) {
//                                        var grid = Ext.getCmp(prototype.id + '-grid-00');
//                                        var store = grid.getStore();
//                                        var val_overcharge = 0;
//                                        store.each(function(value, index){
//                                            if ( Ext.String.trim(value.get('DESCRIPTION').toUpperCase()) == 'OVERCHARGE' ){
//                                                val_overcharge = parseFloat(value.get('PNLT'))
//                                            }
//                                        });
                                        return Ext.util.Format.number(parseFloat(prototype.id_TOT_PNLT_), '0,000.00');
                                    }
                                }
                            ],
                            scope: this,
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
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