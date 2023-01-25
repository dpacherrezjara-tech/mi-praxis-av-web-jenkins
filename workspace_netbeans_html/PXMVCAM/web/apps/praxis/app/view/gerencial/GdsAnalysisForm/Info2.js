
Ext.define('Ext.Praxis.view.gerencial.GdsAnalysisForm.Info2', {
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
                            height: 365,
                            columnLines: true,
                            features: [{
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }],
                            columns: {
                                items: [
                                    {text: '', dataIndex: 'NBR', align: 'right', width: 25},
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 30,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Edit',
                                                handler: 'onDetailFlownClick01'
                                            }
                                        ]
                                    },
                                    {text: 'Date', dataIndex: 'FDATE', align: 'center', width: 80},
                                    {
                                        text: 'BIDT',
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'PAX', width: 60, renderer: 'onAmountRenderer', align: 'right', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                }
                                            },
                                            /*{
                                             text: 'Bookings', dataIndex: 'BN', width: 75, renderer: 'onAmountRenderer', align: 'right', summaryType: 'sum',
                                             summaryRenderer: function(value, summaryData, dataIndex) {
                                             return Ext.util.Format.number(value, '0,000');
                                             }
                                             },*/
                                            {
                                                text: 'Total $', dataIndex: 'NET', width: 90, renderer: 'onAmountRenderer01', align: 'right', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,00.00') + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Booking With Sales',
                                        columns: [
                                            {text: 'Pax', dataIndex: 'PAXM', width: 70, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                }
                                            },
                                            {text: 'Paid $', dataIndex: 'NETM', width: 100, align: 'right', renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,00.00') + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Not used',
                                        columns: [
                                            {text: 'Pax', dataIndex: 'PAXNU', width: 55, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                }
                                            },
                                            {text: 'Paid $ ', dataIndex: 'NETNU', width: 75, align: 'right', renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,00.00') + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Booking Without Sales',
                                        columns: [
                                            {text: 'Pax', dataIndex: 'PAXNM', width: 70, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Paid $', dataIndex: 'NETNM', width: 80, renderer: 'onAmountRenderer01', align: 'right', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,00.00') + '</b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'PNOMATCH', width: 50, renderer: 'onAmountRenderer01', align: 'right', summaryType: 'sum',
                                                summaryType: function(records, values) {
                                                    var i = 0, total_paid = 0.0, total_NoMatch = 0.0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        total_paid += record.get('NET');
                                                        total_NoMatch += record.get('NETNM');
                                                    }
                                                    return  '<b>' + Ext.util.Format.number((total_NoMatch / total_paid) * 100, '0,000.00') + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Dupl. Pmnt.', dataIndex: 'OVERAGE', width: 90, renderer: 'onAmountRenderer01', align: 'right', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,00.00') + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cancels', dataIndex: 'CANCEL', width: 80, renderer: 'onAmountRenderer01', align: 'right', summaryType: 'sum',
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                        }
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
                            //height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    //height: 25,
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