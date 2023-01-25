Ext.define('Ext.Praxis.view.sales.InplantCommissionsForm.Info', {
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
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                height: 647,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridTourCode">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridTourCode',
                            width: prototype.widthGrid,
                            height: 520,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Air', dataIndex: 'A1738CIA', width: 40
                                    },
                                    {
                                        text: 'Document', dataIndex: 'DOCUMENT', width: 80
                                    },
                                    {
                                        text: 'Cpn', dataIndex: 'A1738CUPON', width: 40
                                    },
                                    {
                                        text: 'Seq', dataIndex: 'A1738CORRL', width: 35
                                    },
                                    {
                                        text: 'ID Lote', dataIndex: 'A1738NLOTE', width: 75
                                    },
                                    {
                                        text: 'Transaction', dataIndex: 'A1738TRNCU', width: 82
                                    },
                                    {
                                        text: 'Issue Date', dataIndex: 'A1738FVTA', width: 72
                                    },
                                    {
                                        text: 'Sector', dataIndex: 'A720RUTA', width: 75
                                    },
                                    {
                                        text: 'Flight<br>Number', dataIndex: 'A1738NVLO', width: 65
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'A1738CARR', width: 55
                                    },
                                    {
                                        text: 'Class', dataIndex: 'A1738CLAS', width: 45
                                    },
                                    {
                                        text: 'Fare Basis', dataIndex: 'A1738FBAS', width: 75
                                    },
                                    {
                                        text: 'Ticket<br>Designator', dataIndex: 'A1738DESIG', width: 80
                                    },
                                    {
                                        text: 'Coupon<br>Value', dataIndex: 'A1738VCPLC', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'A1738MDALC', width: 75
                                    },
                                    {
                                        text: 'ADC<br>Amount', dataIndex: 'A1738ADC', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Tour Code', dataIndex: 'A1738TOUR', width: 70
                                    },
                                    {
                                        text: 'IATA Code', dataIndex: 'A1738IATA', width: 82
                                    },
                                    {
                                        text: 'Passenger', dataIndex: 'A1738PAX', width: 135
                                    },
                                    {
                                        text: 'FOP', dataIndex: 'A1738FOP', width: 58
                                    },
                                    {
                                        text: 'Credit Card', dataIndex: 'A1738NTARJ', width: 120
                                    },
                                    {
                                        text: 'Used Type', dataIndex: 'A1738TCRUC', width: 80
                                    },
                                    {
                                        text: 'Used Date', dataIndex: 'A1738FCRUC', width: 70
                                    },
                                    {
                                        text: 'Group<br>Status', dataIndex: 'A1738STPRO', width: 65
                                    },
                                    {
                                        text: 'Sale<br>Status', dataIndex: 'A1738STVTA', width: 65
                                    },
                                    {
                                        text: 'Error Description', dataIndex: 'A1738ERROR', width: 110
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid-2,
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
                            padding: '1px 0px 1px 0px',
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
                                            text: 'Total found',
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
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});