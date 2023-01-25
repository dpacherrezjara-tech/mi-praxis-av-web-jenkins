prototype.Leg = {
    id: 'ScrAccountingAdmForm'
};
Ext.define('Ext.Praxis.view.screens.ScrAccountingAdmForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.ScrAccountingAdmForm',
    requires: [
        'Ext.Praxis.controller.screens.ScrAccountingAdmController'
    ],
    controller: 'ScrAccountingAdmController',
    title: 'Accounting Data',
    header: true,
    width: 1300,
    height: 400,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: true,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.Leg.id+'-boxCpnInfo',
                    hidden: false,
                    width: 1300,
                    height: 360,
                    layout: 'fit',
                    autoScroll: true,
                    bodyStyle: 'background:#E8F9E8',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataAccountingAdm">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataAccountingAdm',
                            width: 1752,
                            height: '100%',
                            layout: 'fit',
                            //overflowY: 'scroll',
                            resizable: {
                                handles: 's'
                            },
                            border: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'MODE', dataIndex: 'A1716MODO', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'text-align:right;';                                                   

                                                    var rtn = '';
                                                    switch(data.A1716MODO.trim()){
                                                            case 'S': rtn = 'SALE'; break;
                                                            case 'M': rtn = 'MEMO'; break;
                                                            case 'J': rtn = 'EXCH'; break;
                                                            case 'I': rtn = 'TAXC'; break;
                                                            case 'R': rtn = 'RFND'; break;
                                                            case 'F': rtn = 'FLWN'; break;
                                                            case 'C': rtn = 'EXPI'; break;
                                                            case 'L': rtn = 'IPAY'; break;
                                                            default: rtn = data.A1716MODO.trim();
                                                    }

                                                    return rtn;
                                                }
                                    },
                                    {
                                        text: 'SRC', dataIndex: 'A1716FUENT', width: 40
                                    },
                                    {
                                        text: 'SUB<br>SRC', dataIndex: 'A1716SUBFU', width: 40
                                    },
                                    {
                                        text: 'FOP', dataIndex: 'A1716FP', width: 40
                                    },
                                    {
                                        text: 'CPN', dataIndex: 'A1716CUPON', width: 40
                                    },
                                    {
                                        text: 'SEQ', dataIndex: 'A1716SEQ', width: 40
                                    },
                                    {
                                        text: 'ACCOUNTING',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'DATE', dataIndex: 'A1716FPRO', width: 70
                                            },
                                            {
                                                text: 'PERIOD', dataIndex: 'A1716FCONT', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'ACCOUNT NUMBER', dataIndex: 'A1716CUENT', width: 277,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'font-family:"Courier New";';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'LOCAL AMOUNT',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'CURR', dataIndex: 'A1716CUR', width: 50
                                            },
                                            {
                                                text: 'DEBIT', dataIndex: 'A1716ACTIV', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'text-align:right;';
                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1716ACTIV, '0,000.00') : '';
                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'CREDIT', dataIndex: 'A1716PASIV', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'text-align:right;';
                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1716PASIV, '0,000.00') : '';
                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'REVENUE AMOUNT',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'CURR', dataIndex: 'A1716CURRV', width: 50
                                            },
                                            {
                                                text: 'DEBIT', dataIndex: 'A1716ACTRV', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'text-align:right;';
                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'CREDIT', dataIndex: 'A1716PASRV', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'text-align:right;';
                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CONCEPT', dataIndex: 'A1716TITU', width: 245,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'CLIENT', dataIndex: 'A1716COPE', width: 80
                                    },
                                    {
                                        text: 'PROVIDER', dataIndex: 'A1716PROV', width: 80
                                    },
                                    {
                                        text: 'JOURNAL<br>ENTRY', dataIndex: 'A1716IDCON', width: 80
                                    },
                                    {
                                        text: 'EXCHANGE<br>RATE', dataIndex: 'A720ROE', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1530TCAMB, '0,000.000000') : '';
                                            return Ext.util.Format.number(value, '0,000.000000');
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});