
Ext.define('Ext.Praxis.view.gerencial.GdsAnalysisForm.Info4', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info4',
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
                            id: prototype.id + '-gridData04',
                            width: prototype.widthGrid,
                            height: 365,
                            columnLines: true,
                            features: [{
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }],
                            columns: {
                                items: [
                                    {text: '', dataIndex: 'NBR', width: 25, align: 'right'},
                                    {
                                        text: 'BIDT',
                                        columns: [
                                            {text: 'Code', dataIndex: 'IATA', width: 60, align: 'center'},
                                            {text: 'Agent name', dataIndex: 'AGNAME', width: 130},
                                            {text: 'GDS', dataIndex: 'GDS', width: 40, align: 'center'},
                                            {text: 'PAX', dataIndex: 'PAXNAME', width: 145},
                                            {text: 'Flight<br>Number', dataIndex: 'FNUMBER', width: 60, align: 'center'},
                                            {text: 'From-To', dataIndex: 'ORI_DST', width: 70, align: 'center'},
                                            {text: 'Seats', dataIndex: 'NUMSEAT', width: 55, align: 'right', summaryType: 'sum', renderer: 'onAmountRenderer'},
                                            {text: 'BN', dataIndex: 'BN', width: 40, align: 'right', summaryType: 'sum', renderer: 'onAmountRenderer'},
                                            {text: 'Paid $', dataIndex: 'NET', width: 60, align: 'right', renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,00.00') + '</b>';
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
                                        text: 'Sale',
                                        columns: [
                                            {text: 'Usage', dataIndex: 'VNR', width: 95, align: 'left'},
                                            {text: 'Ticket', dataIndex: 'TKT', width: 108, align: 'left'}
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
//                            //height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 1px 1px 1px',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: prototype.widthGrid,
//                                    //height: 25,
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