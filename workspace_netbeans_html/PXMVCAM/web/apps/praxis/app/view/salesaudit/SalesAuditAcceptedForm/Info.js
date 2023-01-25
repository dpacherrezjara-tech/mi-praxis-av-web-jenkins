Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
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
            id: prototype.id+'-boxConsultas',
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
                    id: prototype.id+'-boxMainData',
                    width: '100%',
                    hidden: false,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id+'-gridData',
                            width: 1705,
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
                                        xtype: 'checkcolumn', sortable: false,
                                        text: '', dataIndex: 'CHECKED', width: 20,
                                        defaults: {
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                id: prototype.id+'-chkAll',
                                                boxLabel: '',
                                                checked: false,
                                                width: '100%',
                                                listeners: {
                                                    change: 'checkAll_clickHandler'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket Nbr', dataIndex: 'strTicket', flex: 1//width: 95
                                    },
                                    {
                                        text: 'Seq', dataIndex: 'A1672SEQ', width: 100, hidden: true
                                    },
                                    {
                                        text: 'Cupon', dataIndex: 'A1672CUPON', width: 100, hidden: true
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A1672FUENT', width: 55
                                    },
                                    {
                                        text: 'Channel', dataIndex: 'A1672CANAL', width: 60
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A1672PAIVT', width: 60
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A1672AGENT', width: 60
                                    },
                                    {
                                        text: 'Trans.', dataIndex: 'A1672TRNCU', width: 60
                                    },
                                    {
                                        text: 'Doc. Type', dataIndex: 'A1672TDOC', width: 72
                                    },
                                    {
                                        text: 'Issue Date', dataIndex: 'A1672FVENT', width: 80
                                    },
                                    {
                                        text: 'Processing<br>Date', dataIndex: 'A1672FPROC', width: 80
                                    },
                                    {
                                        text: 'System<br>Date', dataIndex: 'A1672FREGI', width: 80
                                    },
                                    {
                                        text: 'Suggested<br>Date', dataIndex: 'A1672FREVI', width: 80
                                    },
                                    {
                                        text: 'Itinerary', dataIndex: 'A1672ITIN', flex: 1//width: 95
                                    },
                                    {
                                        text: 'Farebasis', dataIndex: 'A1672FBASI', width: 70
                                    },
                                    {
                                        text: 'Total Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Curr.', dataIndex: 'A1672MONTT', width: 50
                                            },
                                            {
                                                text: 'Airline', dataIndex: 'A1672TTMIA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'A1672TTAGT', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Difference', dataIndex: 'A1672TTDIF', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Tour Code', dataIndex: 'A1672CODIT', width: 88
                                    },
                                    {
                                        text: 'RFND Type', dataIndex: 'A1672TRNCU', width: 50, id: prototype.id+'-tipoRefund', hidden: true
                                    },
                                    {
                                        text: 'Orig. TRNC', dataIndex: 'A1672TRNCU', width: 50, id: prototype.id+'-transOrig', hidden: true
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A1672FLADM', width: 88, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            value = data.A1672FLADM === 'C' ? 'Unregistered Client' :  data.A1672FLADM === 'D' ? 'IATA disabled' : data.A1672FLADM === 'T' ? 'Reaudited BPO': 'Suggested';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Group Nbr', dataIndex: 'A2657NREF', width: 88, id: prototype.id+'-idAgrup'
                                    },
                                    {
                                        text: 'Reason Code', dataIndex: 'A1672ERROR', flex: 1,//width: 200,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="'+data.A1580DESC2+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: '&nbsp;',
                                        sortable: false,
                                        width: 30,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                handler: 'searchPopup'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id+'-pie',
                    hidden: true,
                    width: prototype.widthContenedor,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            height: '100%',
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
                                    id: prototype.id+'-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id+'-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id+'-lbl-total',
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
});