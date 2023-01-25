
Ext.define('Ext.Praxis.view.gerencial.GdsAuditForm.Info1', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info1',
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
                            id: prototype.id + '-gridtree01',
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
                                    text: 'GDS',
                                    dataIndex: 'DESCRIPTION',
                                    flex: 1
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
                                        return Ext.util.Format.number(prototype.id_TOT_NET, '0,000.00');
                                    }
                                },
                                {
                                    text: 'BN',
                                    dataIndex: 'BN',
                                    width: 90,
                                    align: 'right',
                                    summaryType: 'sum',
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Ext.util.Format.number(prototype.id_TOT_BN, '0,000');
                                    },
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                                        if (record.get('IS_TOTAL'))
                                            metaData.tdStyle = 'font-weight: bold;';
                                        return Ext.util.Format.number(value, '0,000');
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
                                        return Ext.util.Format.number(prototype.id_TOT_OVERAGE, '0,000.00');
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
                                        return Ext.util.Format.number(prototype.id_TOT_PNLT, '0,000.00');
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    sortable: false,
                                    width: 30,
                                    align: 'center',
                                    items: [
                                        {
                                            iconCls: 'prx-icon-detail',
                                            tooltip: 'Click for view detail',
                                            handler: 'onDetailClick',
                                            isDisabled: 'onDetailIsDisabled'
                                        }
                                    ]
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
                            },
                            listeners:{
                                afterrender: function(obj){
                                    obj.getStore().sort('NET','DESC');
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