valor = '0';
Ext.define('Ext.Praxis.view.payments.BankAccountingVoucherForm.Info', {
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
                width: 1300,
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
                            border: true,
                            height: 'auto',
                            width: 1122,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1122,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text:'Transaction',
                                                columns: [
                                                     {text: 'Date', dataIndex: 'strFormatDate',align:'center',width: 100}
                                                ]
                                            },
                                            {
                                            text:'Statement',
                                                columns: [
                                                   {text: 'Currency', dataIndex: 'SCURRENCY',align:'center',width: 100,
                                                           listeners: {
                                                               click: 'gridDetPoli_clickHandler'
                                                           },
                                                           renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                               metaData.style = "color:#057ECB;text-align:center;";
                                                               return '<a href="#payments-bank-accounting-voucher-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                           }
                                                    },
                                                   {
                                                        text: 'Credit', dataIndex: 'AMTCARGO', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMTCARGO, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Debit', dataIndex: 'AMTDEPOS', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMTDEPOS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'DBLDIFF', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDBLDIFF, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                            text:'Policy',
                                                columns: [
                                                   {text: 'Currency', dataIndex: 'SCURRENCY',align:'center',width: 100,
                                                           listeners: {
                                                               click: 'gridDet_clickHandler',
                                                               args:['2']
                                                           },
                                                           renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                               metaData.style = "color:#057ECB;text-align:center;";
                                                               return '<a href="#payments-bank-accounting-voucher-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                           }
                                                    },
                                                   {
                                                        text: 'Rec', dataIndex: 'dblCREDIT', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totCREDIT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Rev', dataIndex: 'dblDEBIT', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDEBIT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant Nbr.', dataIndex: 'MERCHN',align:'center',width: 100,
                                                           listeners: {
                                                               click: 'gridDet_clickHandler',
                                                               args:['1']
                                                           },
                                                           renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                               metaData.style = "color:#057ECB;text-align:center;";
                                                               return '<a href="#payments-bank-accounting-voucher-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                           }
                                            },
                                            {
                                                text: 'Error Cod.', dataIndex: 'desCERROR',align:'center',width: 100
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetPoli',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: '100%',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {xtype: 'label', id: prototype.id + '-lblTitDetPoli', style: 'font-weight:bold;color:#0B333C;', text: '--', width: 500},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetPoli',
                                    width: 1335,
                                    height: 480,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text:'Trans.',
                                                columns: [
                                                     {text: 'Type', dataIndex: 'TTRAN',align:'center',width: 50,
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var tool = record.data['strDescTTRAN'].trim();
                                                                if (tool.length > 0) {
                                                                    metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                                }
                                                                return value;
                                                            }
                                                      }
                                                ]
                                            },
                                            {       
                                                text: 'Bank', dataIndex: 'CODEBANK',align:'center',width: 50,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var tool = record.data['strDescBANK'].trim();
                                                        if (tool.length > 0) {
                                                            metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                        }
                                                        return value;
                                                    }
                                            },
                                            {
                                                text:'Merchant.',
                                                columns: [
                                                     {text: 'Nbr.', dataIndex: 'MERCHN',align:'center',width: 100}
                                                ]
                                            },
                                            {
                                                text:'Authorization',
                                                columns: [
                                                     {text: 'Code', dataIndex: 'AUTHOC',align:'center',width: 80}
                                                ]
                                            },
                                            {
                                            text:'EECC',
                                                columns: [
                                                   {text: 'Src.', dataIndex: 'EFTE',align:'center',width: 50,
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var tool = record.data['strEFTE'].trim();
                                                                if (tool.length > 0) {
                                                                    metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                                }
                                                                return value;
                                                            }
                                                    },
                                                    {text: 'Code', dataIndex: 'CTRAN',align:'center',width: 50},
                                                    {text: 'Description', dataIndex: 'DESCRT',align:'center',width: 320}
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY',align:'center',width: 65},
                                            {
                                                text: 'Credit', dataIndex: 'dblCREDIT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value ;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetPoli').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totCREDIT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Debit', dataIndex: 'dblDEBIT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value ;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetPoli').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totDEBIT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                            text:'Selection',
                                                columns: [
                                                   {text: 'Policy', dataIndex: 'strFSELEC',align:'center',width: 50},
                                                   {text: 'Date', dataIndex: 'FECSELEC',align:'center',width: 70}
                                                ]
                                            },
                                            {
                                            text:'Sequence',
                                                columns: [
                                                   {text: 'Generation', dataIndex: 'SEQ',align:'center',width: 60}
                                                ]
                                            },
                                            {
                                            text:'Trans.',
                                                columns: [
                                                   {text: 'Date', dataIndex: 'DTRANS',align:'center',width: 70}
                                                ]
                                            },
                                            {
                                                text: 'ChargeBack', dataIndex: 'strFSTVAL',align:'center',width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['DesStrFSTVAL'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
//                            width: 915,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnProcess',
                                    text: '<b>Generate Policy</b>',
                                    tooltip: 'Process',
                                    width: 150,
                                    height: 20,
                                    margin: '8px 5px 5px 5px',
                                    padding: '2 5 5 2',
                                    style: 'text-align:center;font-weight:bold;color:#CEF6CE;', 
                                    listeners: {
                                         click: 'GeneraTxt'
                                    }

                                },
                                {xtype: 'label', id: prototype.id + '-lblTitDet', style: 'text-align:center;font-weight:bold;color:#0B333C;', text: '--', width: 500},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDet',
                                    width: 910,
                                    height: 560,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text:'Policy.',
                                                columns: [
                                                     {text: 'Number', dataIndex: 'NUMPOL',align:'center',width: 120,
                                                           listeners: {
                                                               click: 'gridDetCtas_clickHandler'
                                                           },
                                                           renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                               metaData.style = "color:#057ECB;text-align:center;";
                                                               return '<a href="#payments-bank-accounting-voucher-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                           }
                                                    }
                                                ]
                                            },
                                            {
                                                text:'Transaction.',
                                                columns: [
                                                     {text: 'Code', dataIndex: 'CTRAN',align:'center',width: 60},
                                                     {text: 'Name', dataIndex: 'strDescCTRAN',align:'left',width: 250}
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY',align:'center',width: 60},
                                            {
                                                text: 'REC', dataIndex: 'dblCREDIT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value ;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDet').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totCREDIT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'REV', dataIndex: 'dblDEBIT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value ;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDet').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totDEBIT, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Merchant Nbr.', dataIndex: 'MERCHN',align:'center',width: 100},
                                            {text: 'Error Cod.', dataIndex: 'desCERROR',align:'center',width: 110}
                                        ]
                                    }
                                }
                            ]
                        },
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCtas',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
//                            width: 915,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {xtype: 'label', id: prototype.id + '-lblTitDetCtas', style: 'text-align:center;font-weight:bold;color:#0B333C;', text: '--', width: 500},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCtas',
                                    width: 1220,
                                    height: 560,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text:'Policy.',
                                                columns: [
                                                     {text: 'Number', dataIndex: 'NUMPOL',align:'center',width: 120}
                                                ]
                                            },
                                            {
                                                text:'Trans.',
                                                columns: [
                                                     {text: 'Code', dataIndex: 'CTRAN',align:'center',width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strDescCTRAN'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                     }
                                                ]
                                            },
                                            {text: 'Class', dataIndex: 'CLASE',align:'center',width: 50},
                                            {text: 'Complement', dataIndex: 'COMPLEM',align:'center',width: 50},
                                            {
                                                text:'Document.',
                                                columns: [
                                                     {text: 'Number', dataIndex: 'NUMDOC',align:'center',width: 90}
                                                ]
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY',align:'center',width: 60},
                                            {
                                                text: 'REC', dataIndex: 'dblCREDIT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value ;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCtas').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totCREDIT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'REV', dataIndex: 'dblDEBIT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value ;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCtas').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totDEBIT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text:'Accounting.',
                                                columns: [
                                                     {text: 'Date', dataIndex: 'DCONTAB',align:'center',width: 100}
                                                ]
                                            },
                                            {
                                                text:'Code.',
                                                columns: [
                                                     {text: 'Bank', dataIndex: 'CODEBANK',align:'center',width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strDescBANK'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                     }
                                                ]
                                            },
                                            {
                                                text:'Src.',
                                                columns: [
                                                     {text: 'EECC', dataIndex: 'EFTE',align:'center',width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strEFTE'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                     }
                                                ]
                                            },
                                            {
                                                text:'Customer',
                                                columns: [
                                                       {text: 'Code', dataIndex: 'CODCLI',align:'center',width: 60},
                                                        {text: 'Addres', dataIndex: 'DIRCLIT',align:'center',width: 70}
                                                ]
                                            },
                                            {
                                                text:'Account',
                                                columns: [
                                                       {text: 'Number', dataIndex: 'strACCOUNT',align:'center',width: 250}
                                                ]
                                            }
                                          
                                        ]
                                    }
                                }
                            ]
                        },
                        
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 572,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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


