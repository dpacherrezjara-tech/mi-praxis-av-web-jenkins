Ext.define('Ext.Praxis.view.interline.InterlineVsSalesForm.Info', {
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
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
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
                        {
                            xtype: 'button',
                            border: false,
                            id: prototype.id + '-btnSwap',
                            style: 'background:#E3EAEF',
                            icon: 'resources/img/exchange.png',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgSwap_clickHandler'
                            }
                        },
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 1205, //prototype.widthGrid,
//                            height: 545,
                            columnLines: true,
                            margin: '0 0 0 0 ',
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Billing Date', dataIndex: 'strFormatDate', width: 80,
                                        listeners: {
                                            click: 'OnViewDetByCia'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity', dataIndex: 'QTYTKT', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales Amt', dataIndex: 'VALORS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interline Amt', dataIndex: 'GROSSI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Difference', dataIndex: 'DIFF', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Sales',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'High Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTHS', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSHS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSIHS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFHS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Low Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTLS', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSLS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSILS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFLS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataSummary',
                            width: 1205,
                            align: 'left',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                align: 'center',
                                html: '' + '&nbsp',
                                height: 25,
                                padding: '5 5 5 0',
                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                            },
                            items: [
                                {width: 80}, 
                                {width: 75, id: prototype.id + '-totQTYTKT'},
                                {width: 100, id: prototype.id + '-totVALORS'},
                                {width: 100, id: prototype.id + '-totGROSSI'},
                                {width: 100, id: prototype.id + '-totDIFF'},
                                
                                {width: 75, id: prototype.id + '-totQTYTKTHS'},
                                {width: 100, id: prototype.id + '-totVALORSHS'},
                                {width: 100, id: prototype.id + '-totGROSSIHS'},
                                {width: 100, id: prototype.id + '-totDIFFHS'},
                                
                                {width: 75, id: prototype.id + '-totQTYTKTLS'},
                                {width: 100, id: prototype.id + '-totVALORSLS'},
                                {width: 100, id: prototype.id + '-totGROSSILS'},
                                {width: 100, id: prototype.id + '-totDIFFLS'}
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="boxSwapData">
                {
                    region: 'center',
                    id: prototype.id + '-boxSwapData',
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
                        {
                            xtype: 'button',
                            border: false,
                            id: prototype.id + '-btnSwap2',
                            style: 'background:#E3EAEF',
                            icon: 'resources/img/exchange.png',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgSwap_clickHandler'
                            }
                        },
                        // <editor-fold defaultstate="collapsed" desc="gridSwapData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridSwapData',
                            width: 1205, //prototype.widthGrid,
//                            height: 545,
                            columnLines: true,
                            margin: '0 0 0 0 ',
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Billing Date', dataIndex: 'strFormatDate', width: 80,
                                        listeners: {
                                            click: 'OnViewDetByCia'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity', dataIndex: 'QTYTKT', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales Amt', dataIndex: 'VALORS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interline Amt', dataIndex: 'GROSSI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Difference', dataIndex: 'DIFF', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exchange',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'High Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTHE', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSHE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSIHE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFHE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Low Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTLE', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSLE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSILE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFLE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataSummary_1',
                            width: 1205,
                            align: 'left',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                align: 'center',
                                html: '' + '&nbsp',
                                height: 25,
                                padding: '5 5 5 0',
                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                            },
                            items: [
                                {width: 80}, 
                                {width: 75, id: prototype.id + '-totS_QTYTKT'},
                                {width: 100, id: prototype.id + '-totS_VALORS'},
                                {width: 100, id: prototype.id + '-totS_GROSSI'},
                                {width: 100, id: prototype.id + '-totS_DIFF'},
                                
                                {width: 75, id: prototype.id + '-totQTYTKTHE'},
                                {width: 100, id: prototype.id + '-totVALORSHE'},
                                {width: 100, id: prototype.id + '-totGROSSIHE'},
                                {width: 100, id: prototype.id + '-totDIFFHE'},
                                
                                {width: 75, id: prototype.id + '-totQTYTKTLE'},
                                {width: 100, id: prototype.id + '-totVALORSLE'},
                                {width: 100, id: prototype.id + '-totGROSSILE'},
                                {width: 100, id: prototype.id + '-totDIFFLE'}
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold> 
               
                // <editor-fold defaultstate="collapsed" desc="boxDetCIA">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetCIA',
                    width: 1197,
                    hidden: true,
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
                            xtype: 'button',
                            border: false,
                            id: prototype.id + '-btnSwap3',
                            style: 'background:#E3EAEF',
                            icon: 'resources/img/exchange.png',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgSwap_clickHandler'
                            }
                        },
                        // <editor-fold defaultstate="collapsed" desc="gridDetCiaAC">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetCiaAC',
                            width: 1197,
                            height: 497,
                            columnLines: true,
                            margin: '0 0 0 0 ',
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Airline', dataIndex: 'BDAIR', width: 60},
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity', dataIndex: 'QTYTKT', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales Amt', dataIndex: 'VALORS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interline Amt', dataIndex: 'GROSSI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Difference', dataIndex: 'DIFF', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Sales',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'High Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTHS', width: 75,
                                                        listeners: {
                                                            click: 'OnViewDetByTktType'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSHS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSIHS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFHS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Low Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTLS', width: 75,
                                                        listeners: {
                                                            click: 'OnViewDetByTktType'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSLS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSILS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6ecc6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFLS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataSummary2',
                            width: 1197,
                            align: 'left',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                align: 'center',
                                html: '' + '&nbsp',
                                height: 25,
                                padding: '5 5 5 0',
                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                            },
                            items: [
                                {width: 60}, 
                                {width: 75, id: prototype.id + '-totDC_QTYTKT'},
                                {width: 100, id: prototype.id + '-totDC_VALORS'},
                                {width: 100, id: prototype.id + '-totDC_GROSSI'},
                                {width: 100, id: prototype.id + '-totDC_DIFF'},
                                
                                {width: 75, id: prototype.id + '-totDC_QTYTKTHS'},
                                {width: 100, id: prototype.id + '-totDC_VALORSHS'},
                                {width: 100, id: prototype.id + '-totDC_GROSSIHS'},
                                {width: 100, id: prototype.id + '-totDC_DIFFHS'},
                                
                                {width: 75, id: prototype.id + '-totDC_QTYTKTLS'},
                                {width: 100, id: prototype.id + '-totDC_VALORSLS'},
                                {width: 100, id: prototype.id + '-totDC_GROSSILS'},
                                {width: 100, id: prototype.id + '-totDC_DIFFLS'}
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="boxDetCIASwap">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetCIASwap',
                    width: 1197,
                    hidden: true,
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
                            xtype: 'button',
                            border: false,
                            id: prototype.id + '-btnSwap4',
                            style: 'background:#E3EAEF',
                            icon: 'resources/img/exchange.png',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgSwap_clickHandler'
                            }
                        },
                        // <editor-fold defaultstate="collapsed" desc="gridDetCiaSwap">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetCiaSwap',
                            width: 1197,
                            height: 497,
                            columnLines: true,
                            margin: '0 0 0 0 ',
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Airline', dataIndex: 'BDAIR', width: 60},
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity', dataIndex: 'QTYTKT', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales Amt', dataIndex: 'VALORS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interline Amt', dataIndex: 'GROSSI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Difference', dataIndex: 'DIFF', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exchange',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'High Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTHE', width: 75,
                                                        listeners: {
                                                            click: 'OnViewDetByTktType'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSHE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSIHE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFHE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Low Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Quantity', dataIndex: 'QTYTKTLE', width: 75,
                                                        listeners: {
                                                            click: 'OnViewDetByTktType'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Sales Amt', dataIndex: 'VALORSLE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Interline Amt', dataIndex: 'GROSSILE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color: #c6d8ec;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Difference', dataIndex: 'DIFFLE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataSummary2_1',
                            width: 1197,
                            align: 'left',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                align: 'center',
                                html: '' + '&nbsp',
                                height: 25,
                                padding: '5 5 5 0',
                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                            },
                            items: [
                                {width: 60}, 
                                {width: 75, id: prototype.id + '-totDCS_QTYTKT'},
                                {width: 100, id: prototype.id + '-totDCS_VALORS'},
                                {width: 100, id: prototype.id + '-totDCS_GROSSI'},
                                {width: 100, id: prototype.id + '-totDCS_DIFF'},
                                
                                {width: 75, id: prototype.id + '-totDC_QTYTKTHE'},
                                {width: 100, id: prototype.id + '-totDC_VALORSHE'},
                                {width: 100, id: prototype.id + '-totDC_GROSSIHE'},
                                {width: 100, id: prototype.id + '-totDC_DIFFHE'},
                                
                                {width: 75, id: prototype.id + '-totDC_QTYTKTLE'},
                                {width: 100, id: prototype.id + '-totDC_VALORSLE'},
                                {width: 100, id: prototype.id + '-totDC_GROSSILE'},
                                {width: 100, id: prototype.id + '-totDC_DIFFLE'}
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxDetTKTType">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetTKTType',
//                    width: prototype.widthContenedor,
                    width: 1312,
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
                            id: prototype.id + '-gridDetTktType',
                            width: 1300, //prototype.widthGrid,
                            height: 558,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Ticket Number', dataIndex: 'TKT', width: 140,
                                        listeners: {
                                            click: 'displayMasterTkt'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-interline-vs-sales-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Src', dataIndex: 'SOURCOD', width: 40},
                                    {text: 'Date', dataIndex: 'strFormatDate', width: 70},
                                    {text: 'Prd', dataIndex: 'PERNUM', width: 40},
                                    {
                                        text: 'City Pair',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'From', dataIndex: 'FROMCPN', width: 45},
                                            {text: 'To', dataIndex: 'TOCPN', width: 45}
                                        ]
                                    },
                                    {
                                        text: 'Sales',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'IATA', dataIndex: 'IATA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }},
                                            {text: 'Fare Basis', dataIndex: 'FAREBASIS', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    var tool = record.data['FAREBASIS'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Src', dataIndex: 'FUENTE', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }},
                                            {text: 'Type', dataIndex: 'CANAL', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }},
                                            {text: 'Cl', dataIndex: 'CLASE', width: 30,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }},
                                            {text: 'Ori', dataIndex: 'strOrigVta', width: 30,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }},
                                            {text: 'Date', dataIndex: 'strFecVta', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }},
                                            {text: 'Curr', dataIndex: 'AIROWUSE', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var AIROWUSE = record.data['AIROWUSE'].trim();
                                                    var ACURREN = record.data['ACURREN'].trim();

                                                    if (AIROWUSE !== ACURREN) {
                                                        metaData.style = "text-align:center;color:#057ECB;background-color: #c6ecc6;";
                                                    } else {
                                                        metaData.style = "text-align:center;color:#323232;background-color: #c6ecc6;";
                                                    }
                                                    //metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;font-weight:bold;cursor:hand;";
                                                    //return '<a href="#interline-clearing-house-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'dblValorVta', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;text-align:right;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Proration', dataIndex: 'AGRINDV', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #c6ecc6;";
                                                    return value;
                                                }}
                                        ]
                                    },
                                    {
                                        text: 'Interline',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'FLIGHTD', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color: #b3ecff;";
                                                            return value;
                                                        }},
                                                    {text: 'Number', dataIndex: 'FLIGHTN', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color: #b3ecff;";
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            {text: 'Airline', dataIndex: 'BNUMBER', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color: #b3ecff;";
                                                    return value;
                                                }},
                                            {text: 'Curr', dataIndex: 'ACURREN', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var AIROWUSE = record.data['AIROWUSE'].trim();
                                                    var ACURREN = record.data['ACURREN'].trim();

                                                    if (AIROWUSE !== ACURREN) {
                                                        metaData.style = "text-align:center;color:#057ECB;background-color: #b3ecff;";
                                                    } else {
                                                        metaData.style = "text-align:center;color:#323232;background-color: #b3ecff;";
                                                    }
                                                    //metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;font-weight:bold;cursor:hand;";
                                                    //return '<a href="#interline-clearing-house-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'GROSS', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color: #b3ecff;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Diff.', dataIndex: 'OTHCOMPER', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //var OTHCOMPER = record.data['OTHCOMPER'].trim();

                                                    if (value < 0) {
                                                        metaData.style = "text-align:right;color:#ff0000;background-color: #b3ecff;";
                                                    } else {
                                                        metaData.style = "text-align:right;color:#323232;background-color: #b3ecff;";
                                                    }
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataSummary3',
                            width: 1300,
                            align: 'left',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                align: 'center',
                                html: '' + '&nbsp',
                                height: 25,
                                padding: '5 5 5 0',
                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                            },
                            items: [
                                {width: 140},
                                {width: 40},
                                {width: 70},
                                {width: 40},
                                {width: 45},
                                {width: 45},
                                {width: 70},
                                {width: 80},
                                {width: 40},
                                {width: 40},
                                {width: 30},
                                {width: 30},
                                {width: 70},
                                {width: 40},
                                {width: 70, id: prototype.id + '-totT_VALOR'},
                                {width: 60},
                                {width: 60},
                                {width: 60},
                                {width: 80},
                                {width: 40},
                                {width: 75, id: prototype.id + '-totT_GROSS'},
                                {width: 75, id: prototype.id + '-totT_DIFF'}
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    width: 1312,
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
                            width: 1312,
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

                /*,
                 {
                 region: 'center',
                 id: prototype.id + '-boxDetailData',
                 width: prototype.widthContenedor,
                 hidden: true,
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
                 // <editor-fold defaultstate="collapsed" desc="gridDataDetail">
                 {
                 xtype: 'grid',
                 id: prototype.id + '-gridDataDetail',
                 width: prototype.widthGrid2,
                 height: 530,
                 columnLines: true,
                 columns: {
                 defaults: {
                 menuDisabled: true,
                 sortable: false,
                 align: 'center'
                 },
                 items: [
                 {
                 text: 'Prorate Number', dataIndex: 'NROPRT', width: 120,
                 listeners: {
                 click: 'viewA728'
                 },
                 renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                 metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                 return '<a href="#interline-spa-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                 }
                 },
                 {
                 text: 'Paragraph References.', dataIndex: 'TEXT1', width: 300,
                 renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                 metaData.style = "text-align:left;";
                 return value;
                 }
                 },
                 {
                 text: 'Description', dataIndex: 'TEXT2', flex: 1,//width: 450,
                 renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                 metaData.style = "text-align:left;";
                 return value;
                 }
                 }
                 ]
                 }
                 }
                 // </editor-fold>
                 ]
                 }*/
            ]
        }
    ]
});