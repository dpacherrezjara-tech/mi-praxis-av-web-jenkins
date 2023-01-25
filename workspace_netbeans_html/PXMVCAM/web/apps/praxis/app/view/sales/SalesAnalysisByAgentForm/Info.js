
Ext.define('Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            //height: 530,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Code', dataIndex: 'A2775IATA', align: 'left', width: 70
                                    },
                                    {
                                        text: 'Src', dataIndex: 'A2775FTE', align: 'left', width: 40
                                    },
                                    {
                                        text: 'Agent Name', dataIndex: 'A2775NAME', align: 'left', width: 110
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A2775SFTE', align: 'left', width: 40, id: prototype.id + '-cl_canal'
                                    },
                                    {
                                        text: 'Ctr', dataIndex: 'A2775PAISE', width: 40, id: prototype.id + '-iata_name'
//                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:left;";
//                                            return value;
//                                        }
                                    },
                                    {
                                        text: 'ST', dataIndex: 'A2775STAT', width: 40
                                    },
                                    {
                                        text: 'TOTAL', dataIndex: 'A2775TOTAL', width: 85,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'USD',
                                        columns: [
                                            {text: 'JAN', dataIndex: 'A2775ENE', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'FEB', dataIndex: 'A2775FEB', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'MAR', dataIndex: 'A2775MAR', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'APR', dataIndex: 'A2775ABR', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'MAY', dataIndex: 'A2775MAY', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'JUN', dataIndex: 'A2775JUN', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'JUL', dataIndex: 'A2775JUL', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'AUG', dataIndex: 'A2775AGO', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'SEP', dataIndex: 'A2775SET', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'OCT', dataIndex: 'A2775OCT', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'NOV', dataIndex: 'A2775NOV', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false},
                                            {text: 'DEC', dataIndex: 'A2775DIC', width: 75, align: 'right', renderer: 'onAmountRenderer', sortable: false}
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