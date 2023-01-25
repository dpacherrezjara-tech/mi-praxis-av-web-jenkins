Ext.define('Ext.Praxis.view.salesaudit.SalesAuditReportForm.Info', {
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
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
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
                        // <editor-fold defaultstate="collapsed" desc="gridcontabilidad">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridcontabilidad',
                            width: 1840,
                            height: 534,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'CCUST', dataIndex: 'A1672CCUST', width: 60, hidden: true
                                    },
                                    {
                                        text: 'CIA', dataIndex: 'A1672CIA', width: 60, hidden: true
                                    },
                                    {
                                        text: 'FORMA', dataIndex: 'A1672FORMA', width: 93, hidden: true
                                    },
                                    {
                                        text: 'SERIE', dataIndex: 'A1672SERIE', width: 85, hidden: true
                                    },
                                    {
                                        text: 'SEQ', dataIndex: 'A1672SEQ', width: 75, hidden: true
                                    },
                                    {
                                        text: 'CUPON', dataIndex: 'A1672CUPON', width: 75, hidden: true
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'A1672TICKET', flex: 1//width: 100
                                    }
                                    ,
                                    {
                                        text: 'Source', dataIndex: 'A1672FUENT', width: 53
                                    },
                                    {
                                        text: 'Trans.', dataIndex: 'A1672TRNCU', width: 50
                                    },
                                    {
                                        text: 'Doc.<br>Type', dataIndex: 'A1672TDOC', width: 40
                                    },
                                    {
                                        text: 'Issue<br>Date', dataIndex: 'A1672FVENT', width: 62
                                    },
                                    {
                                        text: 'Processing<br>Date', dataIndex: 'A1672FPROC', width: 76
                                    },
                                    {
                                        text: 'System<br>Date', dataIndex: 'A1672FREGI', width: 55, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Channel', dataIndex: 'A1672CANAL', width: 60
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A1672PAIVT', width: 60
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A1672AGENT', width: 55
                                    },
                                    {
                                        text: 'Name Agency', dataIndex: 'A1672NAGENCY', width: 105,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672NAGENCY + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Tour<br>Code', dataIndex: 'A1672CODIT', width: 65
                                    },
                                    {
                                        text: 'Itinerary', dataIndex: 'A1672ITIN', width: 97,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672ITIN + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Fare Basis', dataIndex: 'A1672FBASI', width: 97,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672FBASI + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Error<br>Code', dataIndex: 'A1672ERROR', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672ERROR + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Reason<br>code', dataIndex: 'A1672NREASON', width: 56,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672NREASON + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A1672MEMO', width: 50
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
                                                text: 'Cur.', dataIndex: 'A1672CURRENCY', width: 40
                                            },
                                            {
                                                text: 'Airline', dataIndex: 'A1672TTMIA', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Agency', dataIndex: 'A1672TTAGT', width: 56,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Difference', dataIndex: 'A1672TTDIF', width: 72,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'User', dataIndex: 'A1672REVIS', width: 80, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Audited', dataIndex: 'A1672STO0', width: 58
                                    },
                                    {
                                        text: 'Transfer', dataIndex: 'A1672FLADM', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.A1672FLADM === 'AGENT IS CLOSED' ? 'FF0000' : data.A1672FLADM === 'UNGREGISTERED CLIENT' ? '#FF0000' : '#CCFFFF';
                                            metaData.style = "text-align:left;font-weight:bold;background-color:" + background + ";";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672FLADM + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'ADM/ACM<br>/NC/NA', dataIndex: 'A1672CHADI', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672CHADI + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: 'BPO', width: 40, sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                handler: 'searchPopup'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Status<br>Accepted', dataIndex: 'A2548FLAG', width: 75, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            value = data.A2548FLAG === 'A' ? 'Approved' : 
                                                    data.A2548FLAG === 'U' ? 'Cleared Up' : 
                                                    data.A2548FLAG === 'X' ? 'Canceled' : 
                                                    data.A2548FLAG === 'C' ? 'Condoned' :
                                                    data.A2548FLAG === 'P' ? 'Billed' :
                                                    data.A2548FLAG === 'Z' ? 'Authorized' : 
                                                    data.A2548FLAG === 'N' ? 'Rejected' : 
                                                    data.A2548FLAG === 'R' ? 'Reaudited' : 
                                                    data.A2548FLAG === 'J' ? 'Justified' : 
                                                    data.A2548FLAG === 'D' ? 'Disputed' : 
                                                    data.A2548FLAG === 'E' ? 'Rejecte Disputed' : 
                                                    data.A2548FLAG === 'W' ? 'Approve Disputed' :
                                                    data.A2548FLAG === 'B' ? 'Acm na BSPlink \ MM' :
                                                    data.A2548FLAG === 'O' ? 'IATA Disabled' :
                                                    data.A2548FLAG === 'Q' ? 'Unregistered Client' :
                                                    data.A2548FLAG === 'L' ? 'Acm BSPlink \ MM' :
                                                    data.A2548FLAG === 'Y' ? 'Pending' :
                                                    '';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'EMD<br>Real', dataIndex: 'A1672TKCNX', width: 85
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
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
});