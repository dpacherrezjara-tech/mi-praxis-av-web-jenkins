
Ext.define('Ext.Praxis.view.sales.InterlineAnalysisForm.Info2', {
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
                            id: prototype.id + '-gridData01',
                            width: prototype.widthGrid,
                            height: 500,
                            columnLines: true,
                            columns: {
                                items: [
                                    {text: 'Ticket', dataIndex: 'A2159TKTI', width: 110},
                                    {text: 'Cpn', dataIndex: 'A2159CPN', width: 40, renderer: 'onCantRenderer'},
                                    {text: 'Cnj', dataIndex: 'A2159CNJ', width: 40},
                                    {text: 'Agent', dataIndex: 'A2159AGENT', width: 80},
                                    {text: 'Cur', dataIndex: 'A2159CUR', width: 40},
                                    {text: 'Fare', dataIndex: 'A2159FARE', width: 70, renderer: 'onAmountRenderer01', align: 'right'},
                                    {text: 'Miles', dataIndex: 'A2159MILLA', width: 60, renderer: 'onCantRenderer', align: 'right'},
                                    {text: 'From - to', dataIndex: 'A2159RUTA', width: 65},
                                    {text: 'Car', dataIndex: 'A2159CARRO', width: 40, renderer: 'onCarStringRenderer'},
                                    {text: 'Fare<br>Basis', dataIndex: 'A2159FBASI', width: 90, align: 'left'},
                                    {text: 'Coupon <br>USD', dataIndex: 'A2159FAREC', width: 70, renderer: 'onAmountRenderer01', align: 'right'},
                                    {text: '%<br>Fare', dataIndex: 'A2159PRFAR', width: 60, renderer: 'onAmountRenderer01', align: 'center'/*, sortable: true*/},
                                    {text: 'Miles Cpn', dataIndex: 'A2159MILLC', width: 80, renderer: 'onCantRenderer', align: 'right'},
                                    {text: '%<br>Miles', dataIndex: 'A2159PRMIL', width: 50, renderer: 'onAmountRenderer01', align: 'center'},
                                    {text: 'OAL', dataIndex: 'A2159FOAL', width: 40},
                                    {text: 'Revenue <br>by Mille', dataIndex: 'A2159RVMIL', width: 80, renderer: 'onAmountRenderer01', align: 'right'},
                                    {text: 'Fare <br>by Mille', dataIndex: 'A2159VAL', width: 80, renderer: 'onAmountRenderer01', align: 'right'},
                                    {text: 'Estimated<br>Value', dataIndex: 'A2159PRDIF', width: 80, align: 'right', renderer: 'onAmountRenderer01'},
                                    {text: 'Diff', dataIndex: 'A2159DIFF', width: 80, align: 'right', renderer: 'onAmountRenderer01'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
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