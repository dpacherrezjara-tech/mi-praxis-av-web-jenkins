
Ext.define('Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info2',
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData02',
                            width: prototype.widthGrid,
                            height: 450,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Sub<br>Type', dataIndex: 'A2775SFTE', width: 45, renderer: 'onStringRenderer01'},
                                    {text: 'Ag', dataIndex: 'A2775QTY', width: 80, align: 'right', renderer: 'onAmountRenderer01',
                                        summaryType: function(records, values) {
                                            var i = 0, total = 0, record;
                                            for (; i < records.length; ++i) {
                                                record = records[i];
                                                if (record.get('A2775SFTE').trim() === '') {
                                                    total += record.get('A2775QTY');
                                                }
                                            }
                                            return  Ext.util.Format.number(total, '0,000.00');
                                        }
                                    },
                                    {text: 'Total', dataIndex: 'A2775TOTAL', width: 105, align: 'right', renderer: 'onAmountRenderer01',
                                        //funciona con setStore NO con bindStore
                                        summaryType: function(records, values) {
                                            var i = 0, total = 0, record;
                                            for (; i < records.length; ++i) {
                                                record = records[i];
                                                if (record.get('A2775SFTE').trim() === '') {
                                                    total += record.get('A2775TOTAL');
                                                }
                                            }
                                            return  Ext.util.Format.number(total, '0,000');
                                        }
                                    },
                                    {text: '%', dataIndex: 'A2775POR', width: 50, align: 'center' , renderer: 'onAmountPorRenderer01' },
                                    {text: 'USD',
                                        columns: [
                                            {text: 'JAN', dataIndex: 'A2775ENE', width: 85, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775ENE');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'FEB', dataIndex: 'A2775FEB', width: 85, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775FEB');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'MAR', dataIndex: 'A2775MAR', width: 85, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775MAR');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'APR', dataIndex: 'A2775ABR', width: 85, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775ABR');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'MAY', dataIndex: 'A2775MAY', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775MAY');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'JUN', dataIndex: 'A2775JUN', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775JUN');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'JUL', dataIndex: 'A2775JUL', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775JUL');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'AUG', dataIndex: 'A2775AGO', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775AGO');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'SEP', dataIndex: 'A2775SET', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775SET');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'OCT', dataIndex: 'A2775OCT', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775OCT');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'NOV', dataIndex: 'A2775NOV', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775NOV');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {text: 'DEC', dataIndex: 'A2775DIC', width: 90, align: 'right', renderer: 'onAmountRenderer01', sortable: false,
                                                summaryType: function(records, values) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('A2775SFTE').trim() === '') {
                                                            total += record.get('A2775DIC');
                                                        }
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            viewConfig: {
                                trackOver: true,
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this
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