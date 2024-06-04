valor = '0';
Ext.define('Ext.Praxis.view.payments.ChargebackForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1750,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1700,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1695,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Chargeback<br>Date', dataIndex: 'CHGDATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Card<br>Code', dataIndex: 'CARDTYPE', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Credit Card', dataIndex: 'SCARDN', width: 135,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Auth.<br>Code', dataIndex: 'SAUTHOC', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant', dataIndex: 'COMPANYID', width: 96,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Charge.<br>Amount', dataIndex: 'CHGAMOUNT', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Charge.<br>Currency', dataIndex: 'CHGCURREN', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'TKTNUMER', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Proces.<br>Date', dataIndex: 'PRDA', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },

                                            {text: 'Agent', dataIndex: 'SAGENT', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Proces', dataIndex: 'PROCESA', width: 69,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 75},
                                            {text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 90},
                                            {text: 'Code Bank', dataIndex: 'CODEBANK', width: 75},
                                            {text: 'Auth. Amount', dataIndex: 'AUTAMOUNT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {text: 'Society', dataIndex: 'SOCIETY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Societyl', dataIndex: 'SOCIETYL', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Canal', dataIndex: 'CANAL', width: 62,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        },

                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1522,
                            margin: '10 0 0 0 ',
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1522,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
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
                        },
                    ]
                },

                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


