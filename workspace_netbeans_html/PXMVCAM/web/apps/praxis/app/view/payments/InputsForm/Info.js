Ext.define('Ext.Praxis.view.payments.InputsForm.Info', {
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
                width: 1900,
//                height: 516,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            hidden: false,
                            height: 516,
                            width: 1195,
                            margin: '10 0 0 150',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    height: 510,
                                    width: 1195,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Seq', dataIndex: 'RN', width: 50},
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, flex: 1, dataIndex: 'strFormatDate',
                                                        listeners: {
                                                            click: 'searchDelivery_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Time', dataIndex: 'strDescripcion1', width: 70}
                                                ]
                                            },
                                            {text: 'User',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Creator', dataIndex: 'USCR', width: 100},
                                                ]
                                            },
                                            {text: 'Generation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [  
                                                    {text: 'Date', dataIndex: 'strFormatDate3', width: 100},
                                                ]
                                            },
                                            {text: 'Source', dataIndex: 'FUENTE', width: 100},
                                            {text: 'Total Records',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Received', dataIndex: 'IN_TIPOFECHA', width: 70},
                                                    {text: 'Read', dataIndex: 'QRECOR', width: 70, align: 'center'},
                                                    {text: 'Loaded', dataIndex: 'QRECORG', width: 70, align: 'center'},
                                                    {text: 'Error', width: 70, flex: 1, dataIndex: 'QRECERR',
                                                        listeners: {
                                                            click: 'searchDelivery_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Details / error Message', dataIndex: 'MENSA', width: 380,
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var data = record.data;
                                                        metaData.style = "text-align:left;";
                                                        metaData.tdAttr = 'data-qtip="' + data.MENSA + '"';
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
                            id: prototype.id + '-boxDelivery',
                            bodyStyle: 'background-color: #E3EAEF;',
                            margin: '0 0 0 5',
                            height: 610,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData_2',
                                    height: 522,
                                    width: 1382,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'RN', dataIndex: 'RN', width: 70},
                                            {text: 'Flag',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Error', dataIndex: 'flagError', width: 60}
                                                ]
                                            },
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 85}
                                                ]
                                            },
                                            {text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'QRECOR', width: 80}
                                                ]
                                            },
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Time', dataIndex: 'TTIME', width: 85}
                                                ]
                                            },
                                            {id: prototype.id + '-txtFuente', dataIndex: 'strDescripcion', width: 1000,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
//                                                    metaData.tdAttr = 'data-qtip="' + "Drilldown by bank" + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }
                                ,
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: true,
                                        padding: '0px 1px 0px 1px'
                                    },
                                    padding: '1px 1px 1px 1px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelPie',
                                            width: 780,
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
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxLogA2270',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData_3',
                                    height: 510,
                                    width: 1112,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Status.', dataIndex: 'STVAL', width: 80},
                                            {text: 'Received.', dataIndex: 'IN_TIPOFECHA', width: 90},
                                            {text: 'Read', dataIndex: 'QRECOR', width: 70},
                                            {text: 'Write', dataIndex: 'QRECORG', width: 70},
                                            {text: 'Create',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'User', dataIndex: 'USCR', width: 100},
                                                    {text: 'Date', dataIndex: 'FECR', width: 100}
                                                ]
                                            },
                                            {text: 'Time',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Start', dataIndex: 'HOCR', width: 100},
                                                    {text: 'End', dataIndex: 'strFormatDate', width: 100},
                                                    {text: 'Diff', dataIndex: 'strFormatDate4', width: 100}
                                                ]
                                            },
                                            {text: 'Message', dataIndex: 'MENSA', width: 300}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDataCity',
                            bodyStyle: 'background-color: #E3EAEF;',
                            margin: '0 0 0 300',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCity',
                                    height: 510,
                                    width: 604,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Nbr.', dataIndex: 'RN', width: 60},
                                            {text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'COUNTRY', width: 80},
                                                    {text: 'Description', dataIndex: 'strCountry', width: 110}
                                                ]
                                            },
                                            {text: 'BSPLINK',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'TFILE', width: 80},
                                                ]
                                            },
                                            {text: 'Proccesing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFPROC', width: 90},
                                                ]
                                            },
                                            {text: 'Creation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFECR', width: 90},
                                                    {text: 'Hour', dataIndex: 'strHOCR', width: 80, align: 'center'},
                                                ]
                                            }
                                            ,
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainAll',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            hidden: false,
                            height: 550,
                            width: 1094,
                            margin: '10 0 0 150',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataAll',
                                    height: 510,
                                    width: 1094,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Seq', dataIndex: 'RN', width: 50},
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, flex: 1, dataIndex: 'strFormatDate'}
                                                ]
                                            },
                                            {text: 'Files',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Expected', dataIndex: 'QEXPT', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Received', dataIndex: 'QRECT', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Loaded', dataIndex: 'QRECL', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Not Found', width: 80, dataIndex: 'QRECN',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Error', width: 70, dataIndex: 'QRECE',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Control',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Expected', dataIndex: 'QEXPB', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#FFF8DC;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Received', dataIndex: 'QCONT', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#FFF8DC;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Loaded', dataIndex: 'QCONL', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#FFF8DC;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Not Found', width: 80, dataIndex: 'QCONN',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#FFF8DC;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Error', width: 70, dataIndex: 'QCONE',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#FFF8DC;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'BSP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Received', dataIndex: 'QBSPT', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#b5d0f9;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Loaded', dataIndex: 'QBSPL', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#b5d0f9;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Error', width: 70, dataIndex: 'QBSPE',
                                                        listeners: {
                                                            click: 'searchDetAll_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#b5d0f9;';
                                                            return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetailAll',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            hidden: false,
                            height: 516,
                            width: 1012,
                            margin: '10 0 0 150',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailAll',
                                    height: 510,
                                    width: 1012,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Seq', dataIndex: 'RN', width: 50},
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'PROCDATE'}
                                                ]
                                            },
                                            {text: 'Loading',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'LOADDATE'}
                                                ]
                                            },
                                            {text: 'Generation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'FECR'}
                                                ]
                                            },
                                            {text: 'User',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'USCR'}
                                                ]
                                            },
                                            {text: 'File',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Name', width: 270, dataIndex: 'INPNAME'}
                                                ]
                                            },
                                            {text: 'File',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Type', width: 100, dataIndex: 'CONTROL'}
                                                ]
                                            },
                                            {text: 'File',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Status', width: 100, dataIndex: 'TRFSTAT'}
                                                ]
                                            },
                                            {text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Records', width: 90, dataIndex: 'QTYDOC',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;";
//                                                            return  value;
//                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            id: prototype.id + '-infoCalendar',
                            xtype: 'panel',
                            layout: 'vbox',
                            align: 'center',
                            width: 1500,
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '35 0 35 20',
                            items: [
                                /*
                                 *      HEADER
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    border: false,
                                    bodyStyle: 'background-color: #ffffff;',
                                    padding: '0 0 0 30',
                                    defaults: {
                                        xtype: 'label',
                                        padding: '10 0 10 0',
                                        width: 28,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center '
                                    },
                                    items: [
                                        {
                                            id: prototype.id + '-lbl-year',
                                            text: '2012',
                                            width: 80,
                                            style: 'color:#0b333c;font-weight:bold;background-color: #E3EAEF;'
                                        },
                                        {id: prototype.id + '-lblMon_1', text: 'Mon'},
                                        {id: prototype.id + '-lblTue_1', text: 'Tue'},
                                        {id: prototype.id + '-lblWed_1', text: 'Wed'},
                                        {id: prototype.id + '-lblThu_1', text: 'Thu'},
                                        {id: prototype.id + '-lblFri_1', text: 'Fri'},
                                        {id: prototype.id + '-lblSat_1', text: 'Sat'},
                                        {id: prototype.id + '-lblSun_1', text: 'Sun'},
                                        {id: prototype.id + '-lblMon_2', text: 'Mon'},
                                        {id: prototype.id + '-lblTue_2', text: 'Tue'},
                                        {id: prototype.id + '-lblWed_2', text: 'Wed'},
                                        {id: prototype.id + '-lblThu_2', text: 'Thu'},
                                        {id: prototype.id + '-lblFri_2', text: 'Fri'},
                                        {id: prototype.id + '-lblSat_2', text: 'Sat'},
                                        {id: prototype.id + '-lblSun_2', text: 'Sun'},
                                        {id: prototype.id + '-lblMon_3', text: 'Mon'},
                                        {id: prototype.id + '-lblTue_3', text: 'Tue'},
                                        {id: prototype.id + '-lblWed_3', text: 'Wed'},
                                        {id: prototype.id + '-lblThu_3', text: 'Thu'},
                                        {id: prototype.id + '-lblFri_3', text: 'Fri'},
                                        {id: prototype.id + '-lblSat_3', text: 'Sat'},
                                        {id: prototype.id + '-lblSun_3', text: 'Sun'},
                                        {id: prototype.id + '-lblMon_4', text: 'Mon'},
                                        {id: prototype.id + '-lblTue_4', text: 'Tue'},
                                        {id: prototype.id + '-lblWed_4', text: 'Wed'},
                                        {id: prototype.id + '-lblThu_4', text: 'Thu'},
                                        {id: prototype.id + '-lblFri_4', text: 'Fri'},
                                        {id: prototype.id + '-lblSat_4', text: 'Sat'},
                                        {id: prototype.id + '-lblSun_4', text: 'Sun'},
                                        {id: prototype.id + '-lblMon_5', text: 'Mon'},
                                        {id: prototype.id + '-lblTue_5', text: 'Tue'},
                                        {id: prototype.id + '-lblWed_5', text: 'Wed'},
                                        {id: prototype.id + '-lblThu_5', text: 'Thu'},
                                        {id: prototype.id + '-lblFri_5', text: 'Fri'},
                                        {id: prototype.id + '-lblSat_5', text: 'Sat'},
                                        {id: prototype.id + '-lblSun_5', text: 'Sun'},
                                        {id: prototype.id + '-lblMon_6', text: 'Mon'},
                                        {id: prototype.id + '-lblTue_6', text: 'Tue'},
                                        {id: prototype.id + '-lblWed_6', text: 'Wed'},
                                        {id: prototype.id + '-lblThu_6', text: 'Thu'},
                                        {id: prototype.id + '-lblFri_6', text: 'Fri'},
                                        {id: prototype.id + '-lblSat_6', text: 'Sat'},
                                        {id: prototype.id + '-lblSun_6', text: 'Sun'}
                                    ]
                                },
                                /*
                                 *      JANUARY
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#65C3E5 ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'January', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#65C3E5 ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_1_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_1_2'},
                                                        {id: prototype.id + 'gdiFlag_1_3'},
                                                        {id: prototype.id + 'gdiFlag_1_4'},
                                                        {id: prototype.id + 'gdiFlag_1_5'},
                                                        {id: prototype.id + 'gdiFlag_1_6'},
                                                        {id: prototype.id + 'gdiFlag_1_7'},
                                                        {id: prototype.id + 'gdiFlag_1_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_1_9'},
                                                        {id: prototype.id + 'gdiFlag_1_10'},
                                                        {id: prototype.id + 'gdiFlag_1_11'},
                                                        {id: prototype.id + 'gdiFlag_1_12'},
                                                        {id: prototype.id + 'gdiFlag_1_13'},
                                                        {id: prototype.id + 'gdiFlag_1_14'},
                                                        {id: prototype.id + 'gdiFlag_1_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_1_16'},
                                                        {id: prototype.id + 'gdiFlag_1_17'},
                                                        {id: prototype.id + 'gdiFlag_1_18'},
                                                        {id: prototype.id + 'gdiFlag_1_19'},
                                                        {id: prototype.id + 'gdiFlag_1_20'},
                                                        {id: prototype.id + 'gdiFlag_1_21'},
                                                        {id: prototype.id + 'gdiFlag_1_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_1_23'},
                                                        {id: prototype.id + 'gdiFlag_1_24'},
                                                        {id: prototype.id + 'gdiFlag_1_25'},
                                                        {id: prototype.id + 'gdiFlag_1_26'},
                                                        {id: prototype.id + 'gdiFlag_1_27'},
                                                        {id: prototype.id + 'gdiFlag_1_28'},
                                                        {id: prototype.id + 'gdiFlag_1_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_1_30'},
                                                        {id: prototype.id + 'gdiFlag_1_31'},
                                                        {id: prototype.id + 'gdiFlag_1_32'},
                                                        {id: prototype.id + 'gdiFlag_1_33'},
                                                        {id: prototype.id + 'gdiFlag_1_34'},
                                                        {id: prototype.id + 'gdiFlag_1_35'},
                                                        {id: prototype.id + 'gdiFlag_1_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_1_37'},
                                                        {id: prototype.id + 'gdiFlag_1_38'},
                                                        {id: prototype.id + 'gdiFlag_1_39'},
                                                        {id: prototype.id + 'gdiFlag_1_40'},
                                                        {id: prototype.id + 'gdiFlag_1_41'},
                                                        {id: prototype.id + 'gdiFlag_1_42'}

                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    id:prototype.id +'panel01',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'color:#0b333c;background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 20,
                                                        padding: '3 0 2 0',
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_1_1'},
//                                                        {id: prototype.id + '-lblDay_1_2'},
//                                                        {id: prototype.id + '-lblDay_1_3'},
//                                                        {id: prototype.id + '-lblDay_1_4'},
//                                                        {id: prototype.id + '-lblDay_1_5'},
//                                                        {id: prototype.id + '-lblDay_1_6'},
//                                                        {id: prototype.id + '-lblDay_1_7'},
//                                                        {id: prototype.id + '-lblDay_1_8'},
//                                                        {id: prototype.id + '-lblDay_1_9'},
//                                                        {id: prototype.id + '-lblDay_1_10'},
//                                                        {id: prototype.id + '-lblDay_1_11'},
//                                                        {id: prototype.id + '-lblDay_1_12'},
//                                                        {id: prototype.id + '-lblDay_1_13'},
//                                                        {id: prototype.id + '-lblDay_1_14'},
//                                                        {id: prototype.id + '-lblDay_1_15'},
//                                                        {id: prototype.id + '-lblDay_1_16'},
//                                                        {id: prototype.id + '-lblDay_1_17'},
//                                                        {id: prototype.id + '-lblDay_1_18'},
//                                                        {id: prototype.id + '-lblDay_1_19'},
//                                                        {id: prototype.id + '-lblDay_1_20'},
//                                                        {id: prototype.id + '-lblDay_1_21'},
//                                                        {id: prototype.id + '-lblDay_1_22'},
//                                                        {id: prototype.id + '-lblDay_1_23'},
//                                                        {id: prototype.id + '-lblDay_1_24'},
//                                                        {id: prototype.id + '-lblDay_1_25'},
//                                                        {id: prototype.id + '-lblDay_1_26'},
//                                                        {id: prototype.id + '-lblDay_1_27'},
//                                                        {id: prototype.id + '-lblDay_1_28'},
//                                                        {id: prototype.id + '-lblDay_1_29'},
//                                                        {id: prototype.id + '-lblDay_1_30'},
//                                                        {id: prototype.id + '-lblDay_1_31'},
//                                                        {id: prototype.id + '-lblDay_1_32'},
//                                                        {id: prototype.id + '-lblDay_1_33'},
//                                                        {id: prototype.id + '-lblDay_1_34'},
//                                                        {id: prototype.id + '-lblDay_1_35'},
//                                                        {id: prototype.id + '-lblDay_1_36'},
//                                                        {id: prototype.id + '-lblDay_1_37'},
//                                                        {id: prototype.id + '-lblDay_1_38'},
//                                                        {id: prototype.id + '-lblDay_1_39'},
//                                                        {id: prototype.id + '-lblDay_1_40'},
//                                                        {id: prototype.id + '-lblDay_1_41'},
//                                                        {id: prototype.id + '-lblDay_1_42'}



                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      FEBRUARY 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#ffffff ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'February', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_2_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_2_2'},
                                                        {id: prototype.id + 'gdiFlag_2_3'},
                                                        {id: prototype.id + 'gdiFlag_2_4'},
                                                        {id: prototype.id + 'gdiFlag_2_5'},
                                                        {id: prototype.id + 'gdiFlag_2_6'},
                                                        {id: prototype.id + 'gdiFlag_2_7'},
                                                        {id: prototype.id + 'gdiFlag_2_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_2_9'},
                                                        {id: prototype.id + 'gdiFlag_2_10'},
                                                        {id: prototype.id + 'gdiFlag_2_11'},
                                                        {id: prototype.id + 'gdiFlag_2_12'},
                                                        {id: prototype.id + 'gdiFlag_2_13'},
                                                        {id: prototype.id + 'gdiFlag_2_14'},
                                                        {id: prototype.id + 'gdiFlag_2_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_2_16'},
                                                        {id: prototype.id + 'gdiFlag_2_17'},
                                                        {id: prototype.id + 'gdiFlag_2_18'},
                                                        {id: prototype.id + 'gdiFlag_2_19'},
                                                        {id: prototype.id + 'gdiFlag_2_20'},
                                                        {id: prototype.id + 'gdiFlag_2_21'},
                                                        {id: prototype.id + 'gdiFlag_2_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_2_23'},
                                                        {id: prototype.id + 'gdiFlag_2_24'},
                                                        {id: prototype.id + 'gdiFlag_2_25'},
                                                        {id: prototype.id + 'gdiFlag_2_26'},
                                                        {id: prototype.id + 'gdiFlag_2_27'},
                                                        {id: prototype.id + 'gdiFlag_2_28'},
                                                        {id: prototype.id + 'gdiFlag_2_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_2_30'},
                                                        {id: prototype.id + 'gdiFlag_2_31'},
                                                        {id: prototype.id + 'gdiFlag_2_32'},
                                                        {id: prototype.id + 'gdiFlag_2_33'},
                                                        {id: prototype.id + 'gdiFlag_2_34'},
                                                        {id: prototype.id + 'gdiFlag_2_35'},
                                                        {id: prototype.id + 'gdiFlag_2_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_2_37'},
                                                        {id: prototype.id + 'gdiFlag_2_38'},
                                                        {id: prototype.id + 'gdiFlag_2_39'},
                                                        {id: prototype.id + 'gdiFlag_2_40'},
                                                        {id: prototype.id + 'gdiFlag_2_41'},
                                                        {id: prototype.id + 'gdiFlag_2_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel02',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_2_1'},
//                                                        {id: prototype.id + '-lblDay_2_2'},
//                                                        {id: prototype.id + '-lblDay_2_3'},
//                                                        {id: prototype.id + '-lblDay_2_4'},
//                                                        {id: prototype.id + '-lblDay_2_5'},
//                                                        {id: prototype.id + '-lblDay_2_6'},
//                                                        {id: prototype.id + '-lblDay_2_7'},
//                                                        {id: prototype.id + '-lblDay_2_8'},
//                                                        {id: prototype.id + '-lblDay_2_9'},
//                                                        {id: prototype.id + '-lblDay_2_10'},
//                                                        {id: prototype.id + '-lblDay_2_11'},
//                                                        {id: prototype.id + '-lblDay_2_12'},
//                                                        {id: prototype.id + '-lblDay_2_13'},
//                                                        {id: prototype.id + '-lblDay_2_14'},
//                                                        {id: prototype.id + '-lblDay_2_15'},
//                                                        {id: prototype.id + '-lblDay_2_16'},
//                                                        {id: prototype.id + '-lblDay_2_17'},
//                                                        {id: prototype.id + '-lblDay_2_18'},
//                                                        {id: prototype.id + '-lblDay_2_19'},
//                                                        {id: prototype.id + '-lblDay_2_20'},
//                                                        {id: prototype.id + '-lblDay_2_21'},
//                                                        {id: prototype.id + '-lblDay_2_22'},
//                                                        {id: prototype.id + '-lblDay_2_23'},
//                                                        {id: prototype.id + '-lblDay_2_24'},
//                                                        {id: prototype.id + '-lblDay_2_25'},
//                                                        {id: prototype.id + '-lblDay_2_26'},
//                                                        {id: prototype.id + '-lblDay_2_27'},
//                                                        {id: prototype.id + '-lblDay_2_28'},
//                                                        {id: prototype.id + '-lblDay_2_29'},
//                                                        {id: prototype.id + '-lblDay_2_30'},
//                                                        {id: prototype.id + '-lblDay_2_31'},
//                                                        {id: prototype.id + '-lblDay_2_32'},
//                                                        {id: prototype.id + '-lblDay_2_33'},
//                                                        {id: prototype.id + '-lblDay_2_34'},
//                                                        {id: prototype.id + '-lblDay_2_35'},
//                                                        {id: prototype.id + '-lblDay_2_36'},
//                                                        {id: prototype.id + '-lblDay_2_37'},
//                                                        {id: prototype.id + '-lblDay_2_38'},
//                                                        {id: prototype.id + '-lblDay_2_39'},
//                                                        {id: prototype.id + '-lblDay_2_40'},
//                                                        {id: prototype.id + '-lblDay_2_41'},
//                                                        {id: prototype.id + '-lblDay_2_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      MARCH March 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#65C3E5 ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'March', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#65C3E5 ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_3_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_3_2'},
                                                        {id: prototype.id + 'gdiFlag_3_3'},
                                                        {id: prototype.id + 'gdiFlag_3_4'},
                                                        {id: prototype.id + 'gdiFlag_3_5'},
                                                        {id: prototype.id + 'gdiFlag_3_6'},
                                                        {id: prototype.id + 'gdiFlag_3_7'},
                                                        {id: prototype.id + 'gdiFlag_3_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_3_9'},
                                                        {id: prototype.id + 'gdiFlag_3_10'},
                                                        {id: prototype.id + 'gdiFlag_3_11'},
                                                        {id: prototype.id + 'gdiFlag_3_12'},
                                                        {id: prototype.id + 'gdiFlag_3_13'},
                                                        {id: prototype.id + 'gdiFlag_3_14'},
                                                        {id: prototype.id + 'gdiFlag_3_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_3_16'},
                                                        {id: prototype.id + 'gdiFlag_3_17'},
                                                        {id: prototype.id + 'gdiFlag_3_18'},
                                                        {id: prototype.id + 'gdiFlag_3_19'},
                                                        {id: prototype.id + 'gdiFlag_3_20'},
                                                        {id: prototype.id + 'gdiFlag_3_21'},
                                                        {id: prototype.id + 'gdiFlag_3_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_3_23'},
                                                        {id: prototype.id + 'gdiFlag_3_24'},
                                                        {id: prototype.id + 'gdiFlag_3_25'},
                                                        {id: prototype.id + 'gdiFlag_3_26'},
                                                        {id: prototype.id + 'gdiFlag_3_27'},
                                                        {id: prototype.id + 'gdiFlag_3_28'},
                                                        {id: prototype.id + 'gdiFlag_3_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_3_30'},
                                                        {id: prototype.id + 'gdiFlag_3_31'},
                                                        {id: prototype.id + 'gdiFlag_3_32'},
                                                        {id: prototype.id + 'gdiFlag_3_33'},
                                                        {id: prototype.id + 'gdiFlag_3_34'},
                                                        {id: prototype.id + 'gdiFlag_3_35'},
                                                        {id: prototype.id + 'gdiFlag_3_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_3_37'},
                                                        {id: prototype.id + 'gdiFlag_3_38'},
                                                        {id: prototype.id + 'gdiFlag_3_39'},
                                                        {id: prototype.id + 'gdiFlag_3_40'},
                                                        {id: prototype.id + 'gdiFlag_3_41'},
                                                        {id: prototype.id + 'gdiFlag_3_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel03',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_3_1'},
//                                                        {id: prototype.id + '-lblDay_3_2'},
//                                                        {id: prototype.id + '-lblDay_3_3'},
//                                                        {id: prototype.id + '-lblDay_3_4'},
//                                                        {id: prototype.id + '-lblDay_3_5'},
//                                                        {id: prototype.id + '-lblDay_3_6'},
//                                                        {id: prototype.id + '-lblDay_3_7'},
//                                                        {id: prototype.id + '-lblDay_3_8'},
//                                                        {id: prototype.id + '-lblDay_3_9'},
//                                                        {id: prototype.id + '-lblDay_3_10'},
//                                                        {id: prototype.id + '-lblDay_3_11'},
//                                                        {id: prototype.id + '-lblDay_3_12'},
//                                                        {id: prototype.id + '-lblDay_3_13'},
//                                                        {id: prototype.id + '-lblDay_3_14'},
//                                                        {id: prototype.id + '-lblDay_3_15'},
//                                                        {id: prototype.id + '-lblDay_3_16'},
//                                                        {id: prototype.id + '-lblDay_3_17'},
//                                                        {id: prototype.id + '-lblDay_3_18'},
//                                                        {id: prototype.id + '-lblDay_3_19'},
//                                                        {id: prototype.id + '-lblDay_3_20'},
//                                                        {id: prototype.id + '-lblDay_3_21'},
//                                                        {id: prototype.id + '-lblDay_3_22'},
//                                                        {id: prototype.id + '-lblDay_3_23'},
//                                                        {id: prototype.id + '-lblDay_3_24'},
//                                                        {id: prototype.id + '-lblDay_3_25'},
//                                                        {id: prototype.id + '-lblDay_3_26'},
//                                                        {id: prototype.id + '-lblDay_3_27'},
//                                                        {id: prototype.id + '-lblDay_3_28'},
//                                                        {id: prototype.id + '-lblDay_3_29'},
//                                                        {id: prototype.id + '-lblDay_3_30'},
//                                                        {id: prototype.id + '-lblDay_3_31'},
//                                                        {id: prototype.id + '-lblDay_3_32'},
//                                                        {id: prototype.id + '-lblDay_3_33'},
//                                                        {id: prototype.id + '-lblDay_3_34'},
//                                                        {id: prototype.id + '-lblDay_3_35'},
//                                                        {id: prototype.id + '-lblDay_3_36'},
//                                                        {id: prototype.id + '-lblDay_3_37'},
//                                                        {id: prototype.id + '-lblDay_3_38'},
//                                                        {id: prototype.id + '-lblDay_3_39'},
//                                                        {id: prototype.id + '-lblDay_3_40'},
//                                                        {id: prototype.id + '-lblDay_3_41'},
//                                                        {id: prototype.id + '-lblDay_3_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *    APRIL   
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#ffffff ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'April', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_4_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_4_2'},
                                                        {id: prototype.id + 'gdiFlag_4_3'},
                                                        {id: prototype.id + 'gdiFlag_4_4'},
                                                        {id: prototype.id + 'gdiFlag_4_5'},
                                                        {id: prototype.id + 'gdiFlag_4_6'},
                                                        {id: prototype.id + 'gdiFlag_4_7'},
                                                        {id: prototype.id + 'gdiFlag_4_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_4_9'},
                                                        {id: prototype.id + 'gdiFlag_4_10'},
                                                        {id: prototype.id + 'gdiFlag_4_11'},
                                                        {id: prototype.id + 'gdiFlag_4_12'},
                                                        {id: prototype.id + 'gdiFlag_4_13'},
                                                        {id: prototype.id + 'gdiFlag_4_14'},
                                                        {id: prototype.id + 'gdiFlag_4_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_4_16'},
                                                        {id: prototype.id + 'gdiFlag_4_17'},
                                                        {id: prototype.id + 'gdiFlag_4_18'},
                                                        {id: prototype.id + 'gdiFlag_4_19'},
                                                        {id: prototype.id + 'gdiFlag_4_20'},
                                                        {id: prototype.id + 'gdiFlag_4_21'},
                                                        {id: prototype.id + 'gdiFlag_4_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_4_23'},
                                                        {id: prototype.id + 'gdiFlag_4_24'},
                                                        {id: prototype.id + 'gdiFlag_4_25'},
                                                        {id: prototype.id + 'gdiFlag_4_26'},
                                                        {id: prototype.id + 'gdiFlag_4_27'},
                                                        {id: prototype.id + 'gdiFlag_4_28'},
                                                        {id: prototype.id + 'gdiFlag_4_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_4_30'},
                                                        {id: prototype.id + 'gdiFlag_4_31'},
                                                        {id: prototype.id + 'gdiFlag_4_32'},
                                                        {id: prototype.id + 'gdiFlag_4_33'},
                                                        {id: prototype.id + 'gdiFlag_4_34'},
                                                        {id: prototype.id + 'gdiFlag_4_35'},
                                                        {id: prototype.id + 'gdiFlag_4_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_4_37'},
                                                        {id: prototype.id + 'gdiFlag_4_38'},
                                                        {id: prototype.id + 'gdiFlag_4_39'},
                                                        {id: prototype.id + 'gdiFlag_4_40'},
                                                        {id: prototype.id + 'gdiFlag_4_41'},
                                                        {id: prototype.id + 'gdiFlag_4_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel04',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: ''
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_4_1'},
//                                                        {id: prototype.id + '-lblDay_4_2'},
//                                                        {id: prototype.id + '-lblDay_4_3'},
//                                                        {id: prototype.id + '-lblDay_4_4'},
//                                                        {id: prototype.id + '-lblDay_4_5'},
//                                                        {id: prototype.id + '-lblDay_4_6'},
//                                                        {id: prototype.id + '-lblDay_4_7'},
//                                                        {id: prototype.id + '-lblDay_4_8'},
//                                                        {id: prototype.id + '-lblDay_4_9'},
//                                                        {id: prototype.id + '-lblDay_4_10'},
//                                                        {id: prototype.id + '-lblDay_4_11'},
//                                                        {id: prototype.id + '-lblDay_4_12'},
//                                                        {id: prototype.id + '-lblDay_4_13'},
//                                                        {id: prototype.id + '-lblDay_4_14'},
//                                                        {id: prototype.id + '-lblDay_4_15'},
//                                                        {id: prototype.id + '-lblDay_4_16'},
//                                                        {id: prototype.id + '-lblDay_4_17'},
//                                                        {id: prototype.id + '-lblDay_4_18'},
//                                                        {id: prototype.id + '-lblDay_4_19'},
//                                                        {id: prototype.id + '-lblDay_4_20'},
//                                                        {id: prototype.id + '-lblDay_4_21'},
//                                                        {id: prototype.id + '-lblDay_4_22'},
//                                                        {id: prototype.id + '-lblDay_4_23'},
//                                                        {id: prototype.id + '-lblDay_4_24'},
//                                                        {id: prototype.id + '-lblDay_4_25'},
//                                                        {id: prototype.id + '-lblDay_4_26'},
//                                                        {id: prototype.id + '-lblDay_4_27'},
//                                                        {id: prototype.id + '-lblDay_4_28'},
//                                                        {id: prototype.id + '-lblDay_4_29'},
//                                                        {id: prototype.id + '-lblDay_4_30'},
//                                                        {id: prototype.id + '-lblDay_4_31'},
//                                                        {id: prototype.id + '-lblDay_4_32'},
//                                                        {id: prototype.id + '-lblDay_4_33'},
//                                                        {id: prototype.id + '-lblDay_4_34'},
//                                                        {id: prototype.id + '-lblDay_4_35'},
//                                                        {id: prototype.id + '-lblDay_4_36'},
//                                                        {id: prototype.id + '-lblDay_4_37'},
//                                                        {id: prototype.id + '-lblDay_4_38'},
//                                                        {id: prototype.id + '-lblDay_4_39'},
//                                                        {id: prototype.id + '-lblDay_4_40'},
//                                                        {id: prototype.id + '-lblDay_4_41'},
//                                                        {id: prototype.id + '-lblDay_4_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      MAY 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#65C3E5 ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'May', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#65C3E5 ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_5_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_5_2'},
                                                        {id: prototype.id + 'gdiFlag_5_3'},
                                                        {id: prototype.id + 'gdiFlag_5_4'},
                                                        {id: prototype.id + 'gdiFlag_5_5'},
                                                        {id: prototype.id + 'gdiFlag_5_6'},
                                                        {id: prototype.id + 'gdiFlag_5_7'},
                                                        {id: prototype.id + 'gdiFlag_5_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_5_9'},
                                                        {id: prototype.id + 'gdiFlag_5_10'},
                                                        {id: prototype.id + 'gdiFlag_5_11'},
                                                        {id: prototype.id + 'gdiFlag_5_12'},
                                                        {id: prototype.id + 'gdiFlag_5_13'},
                                                        {id: prototype.id + 'gdiFlag_5_14'},
                                                        {id: prototype.id + 'gdiFlag_5_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_5_16'},
                                                        {id: prototype.id + 'gdiFlag_5_17'},
                                                        {id: prototype.id + 'gdiFlag_5_18'},
                                                        {id: prototype.id + 'gdiFlag_5_19'},
                                                        {id: prototype.id + 'gdiFlag_5_20'},
                                                        {id: prototype.id + 'gdiFlag_5_21'},
                                                        {id: prototype.id + 'gdiFlag_5_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_5_23'},
                                                        {id: prototype.id + 'gdiFlag_5_24'},
                                                        {id: prototype.id + 'gdiFlag_5_25'},
                                                        {id: prototype.id + 'gdiFlag_5_26'},
                                                        {id: prototype.id + 'gdiFlag_5_27'},
                                                        {id: prototype.id + 'gdiFlag_5_28'},
                                                        {id: prototype.id + 'gdiFlag_5_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_5_30'},
                                                        {id: prototype.id + 'gdiFlag_5_31'},
                                                        {id: prototype.id + 'gdiFlag_5_32'},
                                                        {id: prototype.id + 'gdiFlag_5_33'},
                                                        {id: prototype.id + 'gdiFlag_5_34'},
                                                        {id: prototype.id + 'gdiFlag_5_35'},
                                                        {id: prototype.id + 'gdiFlag_5_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_5_37'},
                                                        {id: prototype.id + 'gdiFlag_5_38'},
                                                        {id: prototype.id + 'gdiFlag_5_39'},
                                                        {id: prototype.id + 'gdiFlag_5_40'},
                                                        {id: prototype.id + 'gdiFlag_5_41'},
                                                        {id: prototype.id + 'gdiFlag_5_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel05',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_5_1'},
//                                                        {id: prototype.id + '-lblDay_5_2'},
//                                                        {id: prototype.id + '-lblDay_5_3'},
//                                                        {id: prototype.id + '-lblDay_5_4'},
//                                                        {id: prototype.id + '-lblDay_5_5'},
//                                                        {id: prototype.id + '-lblDay_5_6'},
//                                                        {id: prototype.id + '-lblDay_5_7'},
//                                                        {id: prototype.id + '-lblDay_5_8'},
//                                                        {id: prototype.id + '-lblDay_5_9'},
//                                                        {id: prototype.id + '-lblDay_5_10'},
//                                                        {id: prototype.id + '-lblDay_5_11'},
//                                                        {id: prototype.id + '-lblDay_5_12'},
//                                                        {id: prototype.id + '-lblDay_5_13'},
//                                                        {id: prototype.id + '-lblDay_5_14'},
//                                                        {id: prototype.id + '-lblDay_5_15'},
//                                                        {id: prototype.id + '-lblDay_5_16'},
//                                                        {id: prototype.id + '-lblDay_5_17'},
//                                                        {id: prototype.id + '-lblDay_5_18'},
//                                                        {id: prototype.id + '-lblDay_5_19'},
//                                                        {id: prototype.id + '-lblDay_5_20'},
//                                                        {id: prototype.id + '-lblDay_5_21'},
//                                                        {id: prototype.id + '-lblDay_5_22'},
//                                                        {id: prototype.id + '-lblDay_5_23'},
//                                                        {id: prototype.id + '-lblDay_5_24'},
//                                                        {id: prototype.id + '-lblDay_5_25'},
//                                                        {id: prototype.id + '-lblDay_5_26'},
//                                                        {id: prototype.id + '-lblDay_5_27'},
//                                                        {id: prototype.id + '-lblDay_5_28'},
//                                                        {id: prototype.id + '-lblDay_5_29'},
//                                                        {id: prototype.id + '-lblDay_5_30'},
//                                                        {id: prototype.id + '-lblDay_5_31'},
//                                                        {id: prototype.id + '-lblDay_5_32'},
//                                                        {id: prototype.id + '-lblDay_5_33'},
//                                                        {id: prototype.id + '-lblDay_5_34'},
//                                                        {id: prototype.id + '-lblDay_5_35'},
//                                                        {id: prototype.id + '-lblDay_5_36'},
//                                                        {id: prototype.id + '-lblDay_5_37'},
//                                                        {id: prototype.id + '-lblDay_5_38'},
//                                                        {id: prototype.id + '-lblDay_5_39'},
//                                                        {id: prototype.id + '-lblDay_5_40'},
//                                                        {id: prototype.id + '-lblDay_5_41'},
//                                                        {id: prototype.id + '-lblDay_5_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      JUNE 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#ffffff ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'June', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_6_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_6_2'},
                                                        {id: prototype.id + 'gdiFlag_6_3'},
                                                        {id: prototype.id + 'gdiFlag_6_4'},
                                                        {id: prototype.id + 'gdiFlag_6_5'},
                                                        {id: prototype.id + 'gdiFlag_6_6'},
                                                        {id: prototype.id + 'gdiFlag_6_7'},
                                                        {id: prototype.id + 'gdiFlag_6_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_6_9'},
                                                        {id: prototype.id + 'gdiFlag_6_10'},
                                                        {id: prototype.id + 'gdiFlag_6_11'},
                                                        {id: prototype.id + 'gdiFlag_6_12'},
                                                        {id: prototype.id + 'gdiFlag_6_13'},
                                                        {id: prototype.id + 'gdiFlag_6_14'},
                                                        {id: prototype.id + 'gdiFlag_6_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_6_16'},
                                                        {id: prototype.id + 'gdiFlag_6_17'},
                                                        {id: prototype.id + 'gdiFlag_6_18'},
                                                        {id: prototype.id + 'gdiFlag_6_19'},
                                                        {id: prototype.id + 'gdiFlag_6_20'},
                                                        {id: prototype.id + 'gdiFlag_6_21'},
                                                        {id: prototype.id + 'gdiFlag_6_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_6_23'},
                                                        {id: prototype.id + 'gdiFlag_6_24'},
                                                        {id: prototype.id + 'gdiFlag_6_25'},
                                                        {id: prototype.id + 'gdiFlag_6_26'},
                                                        {id: prototype.id + 'gdiFlag_6_27'},
                                                        {id: prototype.id + 'gdiFlag_6_28'},
                                                        {id: prototype.id + 'gdiFlag_6_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_6_30'},
                                                        {id: prototype.id + 'gdiFlag_6_31'},
                                                        {id: prototype.id + 'gdiFlag_6_32'},
                                                        {id: prototype.id + 'gdiFlag_6_33'},
                                                        {id: prototype.id + 'gdiFlag_6_34'},
                                                        {id: prototype.id + 'gdiFlag_6_35'},
                                                        {id: prototype.id + 'gdiFlag_6_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_6_37'},
                                                        {id: prototype.id + 'gdiFlag_6_38'},
                                                        {id: prototype.id + 'gdiFlag_6_39'},
                                                        {id: prototype.id + 'gdiFlag_6_40'},
                                                        {id: prototype.id + 'gdiFlag_6_41'},
                                                        {id: prototype.id + 'gdiFlag_6_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel06',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_6_1'},
//                                                        {id: prototype.id + '-lblDay_6_2'},
//                                                        {id: prototype.id + '-lblDay_6_3'},
//                                                        {id: prototype.id + '-lblDay_6_4'},
//                                                        {id: prototype.id + '-lblDay_6_5'},
//                                                        {id: prototype.id + '-lblDay_6_6'},
//                                                        {id: prototype.id + '-lblDay_6_7'},
//                                                        {id: prototype.id + '-lblDay_6_8'},
//                                                        {id: prototype.id + '-lblDay_6_9'},
//                                                        {id: prototype.id + '-lblDay_6_10'},
//                                                        {id: prototype.id + '-lblDay_6_11'},
//                                                        {id: prototype.id + '-lblDay_6_12'},
//                                                        {id: prototype.id + '-lblDay_6_13'},
//                                                        {id: prototype.id + '-lblDay_6_14'},
//                                                        {id: prototype.id + '-lblDay_6_15'},
//                                                        {id: prototype.id + '-lblDay_6_16'},
//                                                        {id: prototype.id + '-lblDay_6_17'},
//                                                        {id: prototype.id + '-lblDay_6_18'},
//                                                        {id: prototype.id + '-lblDay_6_19'},
//                                                        {id: prototype.id + '-lblDay_6_20'},
//                                                        {id: prototype.id + '-lblDay_6_21'},
//                                                        {id: prototype.id + '-lblDay_6_22'},
//                                                        {id: prototype.id + '-lblDay_6_23'},
//                                                        {id: prototype.id + '-lblDay_6_24'},
//                                                        {id: prototype.id + '-lblDay_6_25'},
//                                                        {id: prototype.id + '-lblDay_6_26'},
//                                                        {id: prototype.id + '-lblDay_6_27'},
//                                                        {id: prototype.id + '-lblDay_6_28'},
//                                                        {id: prototype.id + '-lblDay_6_29'},
//                                                        {id: prototype.id + '-lblDay_6_30'},
//                                                        {id: prototype.id + '-lblDay_6_31'},
//                                                        {id: prototype.id + '-lblDay_6_32'},
//                                                        {id: prototype.id + '-lblDay_6_33'},
//                                                        {id: prototype.id + '-lblDay_6_34'},
//                                                        {id: prototype.id + '-lblDay_6_35'},
//                                                        {id: prototype.id + '-lblDay_6_36'},
//                                                        {id: prototype.id + '-lblDay_6_37'},
//                                                        {id: prototype.id + '-lblDay_6_38'},
//                                                        {id: prototype.id + '-lblDay_6_39'},
//                                                        {id: prototype.id + '-lblDay_6_40'},
//                                                        {id: prototype.id + '-lblDay_6_41'},
//                                                        {id: prototype.id + '-lblDay_6_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      JULY 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#65C3E5 ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'July', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#65C3E5 ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_7_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_7_2'},
                                                        {id: prototype.id + 'gdiFlag_7_3'},
                                                        {id: prototype.id + 'gdiFlag_7_4'},
                                                        {id: prototype.id + 'gdiFlag_7_5'},
                                                        {id: prototype.id + 'gdiFlag_7_6'},
                                                        {id: prototype.id + 'gdiFlag_7_7'},
                                                        {id: prototype.id + 'gdiFlag_7_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_7_9'},
                                                        {id: prototype.id + 'gdiFlag_7_10'},
                                                        {id: prototype.id + 'gdiFlag_7_11'},
                                                        {id: prototype.id + 'gdiFlag_7_12'},
                                                        {id: prototype.id + 'gdiFlag_7_13'},
                                                        {id: prototype.id + 'gdiFlag_7_14'},
                                                        {id: prototype.id + 'gdiFlag_7_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_7_16'},
                                                        {id: prototype.id + 'gdiFlag_7_17'},
                                                        {id: prototype.id + 'gdiFlag_7_18'},
                                                        {id: prototype.id + 'gdiFlag_7_19'},
                                                        {id: prototype.id + 'gdiFlag_7_20'},
                                                        {id: prototype.id + 'gdiFlag_7_21'},
                                                        {id: prototype.id + 'gdiFlag_7_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_7_23'},
                                                        {id: prototype.id + 'gdiFlag_7_24'},
                                                        {id: prototype.id + 'gdiFlag_7_25'},
                                                        {id: prototype.id + 'gdiFlag_7_26'},
                                                        {id: prototype.id + 'gdiFlag_7_27'},
                                                        {id: prototype.id + 'gdiFlag_7_28'},
                                                        {id: prototype.id + 'gdiFlag_7_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_7_30'},
                                                        {id: prototype.id + 'gdiFlag_7_31'},
                                                        {id: prototype.id + 'gdiFlag_7_32'},
                                                        {id: prototype.id + 'gdiFlag_7_33'},
                                                        {id: prototype.id + 'gdiFlag_7_34'},
                                                        {id: prototype.id + 'gdiFlag_7_35'},
                                                        {id: prototype.id + 'gdiFlag_7_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_7_37'},
                                                        {id: prototype.id + 'gdiFlag_7_38'},
                                                        {id: prototype.id + 'gdiFlag_7_39'},
                                                        {id: prototype.id + 'gdiFlag_7_40'},
                                                        {id: prototype.id + 'gdiFlag_7_41'},
                                                        {id: prototype.id + 'gdiFlag_7_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel07',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_7_1'},
//                                                        {id: prototype.id + '-lblDay_7_2'},
//                                                        {id: prototype.id + '-lblDay_7_3'},
//                                                        {id: prototype.id + '-lblDay_7_4'},
//                                                        {id: prototype.id + '-lblDay_7_5'},
//                                                        {id: prototype.id + '-lblDay_7_6'},
//                                                        {id: prototype.id + '-lblDay_7_7'},
//                                                        {id: prototype.id + '-lblDay_7_8'},
//                                                        {id: prototype.id + '-lblDay_7_9'},
//                                                        {id: prototype.id + '-lblDay_7_10'},
//                                                        {id: prototype.id + '-lblDay_7_11'},
//                                                        {id: prototype.id + '-lblDay_7_12'},
//                                                        {id: prototype.id + '-lblDay_7_13'},
//                                                        {id: prototype.id + '-lblDay_7_14'},
//                                                        {id: prototype.id + '-lblDay_7_15'},
//                                                        {id: prototype.id + '-lblDay_7_16'},
//                                                        {id: prototype.id + '-lblDay_7_17'},
//                                                        {id: prototype.id + '-lblDay_7_18'},
//                                                        {id: prototype.id + '-lblDay_7_19'},
//                                                        {id: prototype.id + '-lblDay_7_20'},
//                                                        {id: prototype.id + '-lblDay_7_21'},
//                                                        {id: prototype.id + '-lblDay_7_22'},
//                                                        {id: prototype.id + '-lblDay_7_23'},
//                                                        {id: prototype.id + '-lblDay_7_24'},
//                                                        {id: prototype.id + '-lblDay_7_25'},
//                                                        {id: prototype.id + '-lblDay_7_26'},
//                                                        {id: prototype.id + '-lblDay_7_27'},
//                                                        {id: prototype.id + '-lblDay_7_28'},
//                                                        {id: prototype.id + '-lblDay_7_29'},
//                                                        {id: prototype.id + '-lblDay_7_30'},
//                                                        {id: prototype.id + '-lblDay_7_31'},
//                                                        {id: prototype.id + '-lblDay_7_32'},
//                                                        {id: prototype.id + '-lblDay_7_33'},
//                                                        {id: prototype.id + '-lblDay_7_34'},
//                                                        {id: prototype.id + '-lblDay_7_35'},
//                                                        {id: prototype.id + '-lblDay_7_36'},
//                                                        {id: prototype.id + '-lblDay_7_37'},
//                                                        {id: prototype.id + '-lblDay_7_38'},
//                                                        {id: prototype.id + '-lblDay_7_39'},
//                                                        {id: prototype.id + '-lblDay_7_40'},
//                                                        {id: prototype.id + '-lblDay_7_41'},
//                                                        {id: prototype.id + '-lblDay_7_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      AUGUST   
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#ffffff ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'August', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_8_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_8_2'},
                                                        {id: prototype.id + 'gdiFlag_8_3'},
                                                        {id: prototype.id + 'gdiFlag_8_4'},
                                                        {id: prototype.id + 'gdiFlag_8_5'},
                                                        {id: prototype.id + 'gdiFlag_8_6'},
                                                        {id: prototype.id + 'gdiFlag_8_7'},
                                                        {id: prototype.id + 'gdiFlag_8_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_8_9'},
                                                        {id: prototype.id + 'gdiFlag_8_10'},
                                                        {id: prototype.id + 'gdiFlag_8_11'},
                                                        {id: prototype.id + 'gdiFlag_8_12'},
                                                        {id: prototype.id + 'gdiFlag_8_13'},
                                                        {id: prototype.id + 'gdiFlag_8_14'},
                                                        {id: prototype.id + 'gdiFlag_8_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_8_16'},
                                                        {id: prototype.id + 'gdiFlag_8_17'},
                                                        {id: prototype.id + 'gdiFlag_8_18'},
                                                        {id: prototype.id + 'gdiFlag_8_19'},
                                                        {id: prototype.id + 'gdiFlag_8_20'},
                                                        {id: prototype.id + 'gdiFlag_8_21'},
                                                        {id: prototype.id + 'gdiFlag_8_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_8_23'},
                                                        {id: prototype.id + 'gdiFlag_8_24'},
                                                        {id: prototype.id + 'gdiFlag_8_25'},
                                                        {id: prototype.id + 'gdiFlag_8_26'},
                                                        {id: prototype.id + 'gdiFlag_8_27'},
                                                        {id: prototype.id + 'gdiFlag_8_28'},
                                                        {id: prototype.id + 'gdiFlag_8_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_8_30'},
                                                        {id: prototype.id + 'gdiFlag_8_31'},
                                                        {id: prototype.id + 'gdiFlag_8_32'},
                                                        {id: prototype.id + 'gdiFlag_8_33'},
                                                        {id: prototype.id + 'gdiFlag_8_34'},
                                                        {id: prototype.id + 'gdiFlag_8_35'},
                                                        {id: prototype.id + 'gdiFlag_8_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_8_37'},
                                                        {id: prototype.id + 'gdiFlag_8_38'},
                                                        {id: prototype.id + 'gdiFlag_8_39'},
                                                        {id: prototype.id + 'gdiFlag_8_40'},
                                                        {id: prototype.id + 'gdiFlag_8_41'},
                                                        {id: prototype.id + 'gdiFlag_8_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel08',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_8_1'},
//                                                        {id: prototype.id + '-lblDay_8_2'},
//                                                        {id: prototype.id + '-lblDay_8_3'},
//                                                        {id: prototype.id + '-lblDay_8_4'},
//                                                        {id: prototype.id + '-lblDay_8_5'},
//                                                        {id: prototype.id + '-lblDay_8_6'},
//                                                        {id: prototype.id + '-lblDay_8_7'},
//                                                        {id: prototype.id + '-lblDay_8_8'},
//                                                        {id: prototype.id + '-lblDay_8_9'},
//                                                        {id: prototype.id + '-lblDay_8_10'},
//                                                        {id: prototype.id + '-lblDay_8_11'},
//                                                        {id: prototype.id + '-lblDay_8_12'},
//                                                        {id: prototype.id + '-lblDay_8_13'},
//                                                        {id: prototype.id + '-lblDay_8_14'},
//                                                        {id: prototype.id + '-lblDay_8_15'},
//                                                        {id: prototype.id + '-lblDay_8_16'},
//                                                        {id: prototype.id + '-lblDay_8_17'},
//                                                        {id: prototype.id + '-lblDay_8_18'},
//                                                        {id: prototype.id + '-lblDay_8_19'},
//                                                        {id: prototype.id + '-lblDay_8_20'},
//                                                        {id: prototype.id + '-lblDay_8_21'},
//                                                        {id: prototype.id + '-lblDay_8_22'},
//                                                        {id: prototype.id + '-lblDay_8_23'},
//                                                        {id: prototype.id + '-lblDay_8_24'},
//                                                        {id: prototype.id + '-lblDay_8_25'},
//                                                        {id: prototype.id + '-lblDay_8_26'},
//                                                        {id: prototype.id + '-lblDay_8_27'},
//                                                        {id: prototype.id + '-lblDay_8_28'},
//                                                        {id: prototype.id + '-lblDay_8_29'},
//                                                        {id: prototype.id + '-lblDay_8_30'},
//                                                        {id: prototype.id + '-lblDay_8_31'},
//                                                        {id: prototype.id + '-lblDay_8_32'},
//                                                        {id: prototype.id + '-lblDay_8_33'},
//                                                        {id: prototype.id + '-lblDay_8_34'},
//                                                        {id: prototype.id + '-lblDay_8_35'},
//                                                        {id: prototype.id + '-lblDay_8_36'},
//                                                        {id: prototype.id + '-lblDay_8_37'},
//                                                        {id: prototype.id + '-lblDay_8_38'},
//                                                        {id: prototype.id + '-lblDay_8_39'},
//                                                        {id: prototype.id + '-lblDay_8_40'},
//                                                        {id: prototype.id + '-lblDay_8_41'},
//                                                        {id: prototype.id + '-lblDay_8_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      SEPTEMBER 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#65C3E5 ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'September', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#65C3E5 ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_9_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_9_2'},
                                                        {id: prototype.id + 'gdiFlag_9_3'},
                                                        {id: prototype.id + 'gdiFlag_9_4'},
                                                        {id: prototype.id + 'gdiFlag_9_5'},
                                                        {id: prototype.id + 'gdiFlag_9_6'},
                                                        {id: prototype.id + 'gdiFlag_9_7'},
                                                        {id: prototype.id + 'gdiFlag_9_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_9_9'},
                                                        {id: prototype.id + 'gdiFlag_9_10'},
                                                        {id: prototype.id + 'gdiFlag_9_11'},
                                                        {id: prototype.id + 'gdiFlag_9_12'},
                                                        {id: prototype.id + 'gdiFlag_9_13'},
                                                        {id: prototype.id + 'gdiFlag_9_14'},
                                                        {id: prototype.id + 'gdiFlag_9_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_9_16'},
                                                        {id: prototype.id + 'gdiFlag_9_17'},
                                                        {id: prototype.id + 'gdiFlag_9_18'},
                                                        {id: prototype.id + 'gdiFlag_9_19'},
                                                        {id: prototype.id + 'gdiFlag_9_20'},
                                                        {id: prototype.id + 'gdiFlag_9_21'},
                                                        {id: prototype.id + 'gdiFlag_9_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_9_23'},
                                                        {id: prototype.id + 'gdiFlag_9_24'},
                                                        {id: prototype.id + 'gdiFlag_9_25'},
                                                        {id: prototype.id + 'gdiFlag_9_26'},
                                                        {id: prototype.id + 'gdiFlag_9_27'},
                                                        {id: prototype.id + 'gdiFlag_9_28'},
                                                        {id: prototype.id + 'gdiFlag_9_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_9_30'},
                                                        {id: prototype.id + 'gdiFlag_9_31'},
                                                        {id: prototype.id + 'gdiFlag_9_32'},
                                                        {id: prototype.id + 'gdiFlag_9_33'},
                                                        {id: prototype.id + 'gdiFlag_9_34'},
                                                        {id: prototype.id + 'gdiFlag_9_35'},
                                                        {id: prototype.id + 'gdiFlag_9_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_9_37'},
                                                        {id: prototype.id + 'gdiFlag_9_38'},
                                                        {id: prototype.id + 'gdiFlag_9_39'},
                                                        {id: prototype.id + 'gdiFlag_9_40'},
                                                        {id: prototype.id + 'gdiFlag_9_41'},
                                                        {id: prototype.id + 'gdiFlag_9_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel09',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_9_1'},
//                                                        {id: prototype.id + '-lblDay_9_2'},
//                                                        {id: prototype.id + '-lblDay_9_3'},
//                                                        {id: prototype.id + '-lblDay_9_4'},
//                                                        {id: prototype.id + '-lblDay_9_5'},
//                                                        {id: prototype.id + '-lblDay_9_6'},
//                                                        {id: prototype.id + '-lblDay_9_7'},
//                                                        {id: prototype.id + '-lblDay_9_8'},
//                                                        {id: prototype.id + '-lblDay_9_9'},
//                                                        {id: prototype.id + '-lblDay_9_10'},
//                                                        {id: prototype.id + '-lblDay_9_11'},
//                                                        {id: prototype.id + '-lblDay_9_12'},
//                                                        {id: prototype.id + '-lblDay_9_13'},
//                                                        {id: prototype.id + '-lblDay_9_14'},
//                                                        {id: prototype.id + '-lblDay_9_15'},
//                                                        {id: prototype.id + '-lblDay_9_16'},
//                                                        {id: prototype.id + '-lblDay_9_17'},
//                                                        {id: prototype.id + '-lblDay_9_18'},
//                                                        {id: prototype.id + '-lblDay_9_19'},
//                                                        {id: prototype.id + '-lblDay_9_20'},
//                                                        {id: prototype.id + '-lblDay_9_21'},
//                                                        {id: prototype.id + '-lblDay_9_22'},
//                                                        {id: prototype.id + '-lblDay_9_23'},
//                                                        {id: prototype.id + '-lblDay_9_24'},
//                                                        {id: prototype.id + '-lblDay_9_25'},
//                                                        {id: prototype.id + '-lblDay_9_26'},
//                                                        {id: prototype.id + '-lblDay_9_27'},
//                                                        {id: prototype.id + '-lblDay_9_28'},
//                                                        {id: prototype.id + '-lblDay_9_29'},
//                                                        {id: prototype.id + '-lblDay_9_30'},
//                                                        {id: prototype.id + '-lblDay_9_31'},
//                                                        {id: prototype.id + '-lblDay_9_32'},
//                                                        {id: prototype.id + '-lblDay_9_33'},
//                                                        {id: prototype.id + '-lblDay_9_34'},
//                                                        {id: prototype.id + '-lblDay_9_35'},
//                                                        {id: prototype.id + '-lblDay_9_36'},
//                                                        {id: prototype.id + '-lblDay_9_37'},
//                                                        {id: prototype.id + '-lblDay_9_38'},
//                                                        {id: prototype.id + '-lblDay_9_39'},
//                                                        {id: prototype.id + '-lblDay_9_40'},
//                                                        {id: prototype.id + '-lblDay_9_41'},
//                                                        {id: prototype.id + '-lblDay_9_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                /*
                                 *      OCTOBER   
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#ffffff ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'October', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_10_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_10_2'},
                                                        {id: prototype.id + 'gdiFlag_10_3'},
                                                        {id: prototype.id + 'gdiFlag_10_4'},
                                                        {id: prototype.id + 'gdiFlag_10_5'},
                                                        {id: prototype.id + 'gdiFlag_10_6'},
                                                        {id: prototype.id + 'gdiFlag_10_7'},
                                                        {id: prototype.id + 'gdiFlag_10_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_10_9'},
                                                        {id: prototype.id + 'gdiFlag_10_10'},
                                                        {id: prototype.id + 'gdiFlag_10_11'},
                                                        {id: prototype.id + 'gdiFlag_10_12'},
                                                        {id: prototype.id + 'gdiFlag_10_13'},
                                                        {id: prototype.id + 'gdiFlag_10_14'},
                                                        {id: prototype.id + 'gdiFlag_10_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_10_16'},
                                                        {id: prototype.id + 'gdiFlag_10_17'},
                                                        {id: prototype.id + 'gdiFlag_10_18'},
                                                        {id: prototype.id + 'gdiFlag_10_19'},
                                                        {id: prototype.id + 'gdiFlag_10_20'},
                                                        {id: prototype.id + 'gdiFlag_10_21'},
                                                        {id: prototype.id + 'gdiFlag_10_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_10_23'},
                                                        {id: prototype.id + 'gdiFlag_10_24'},
                                                        {id: prototype.id + 'gdiFlag_10_25'},
                                                        {id: prototype.id + 'gdiFlag_10_26'},
                                                        {id: prototype.id + 'gdiFlag_10_27'},
                                                        {id: prototype.id + 'gdiFlag_10_28'},
                                                        {id: prototype.id + 'gdiFlag_10_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_10_30'},
                                                        {id: prototype.id + 'gdiFlag_10_31'},
                                                        {id: prototype.id + 'gdiFlag_10_32'},
                                                        {id: prototype.id + 'gdiFlag_10_33'},
                                                        {id: prototype.id + 'gdiFlag_10_34'},
                                                        {id: prototype.id + 'gdiFlag_10_35'},
                                                        {id: prototype.id + 'gdiFlag_10_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_10_37'},
                                                        {id: prototype.id + 'gdiFlag_10_38'},
                                                        {id: prototype.id + 'gdiFlag_10_39'},
                                                        {id: prototype.id + 'gdiFlag_10_40'},
                                                        {id: prototype.id + 'gdiFlag_10_41'},
                                                        {id: prototype.id + 'gdiFlag_10_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel10',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_10_1'},
//                                                        {id: prototype.id + '-lblDay_10_2'},
//                                                        {id: prototype.id + '-lblDay_10_3'},
//                                                        {id: prototype.id + '-lblDay_10_4'},
//                                                        {id: prototype.id + '-lblDay_10_5'},
//                                                        {id: prototype.id + '-lblDay_10_6'},
//                                                        {id: prototype.id + '-lblDay_10_7'},
//                                                        {id: prototype.id + '-lblDay_10_8'},
//                                                        {id: prototype.id + '-lblDay_10_9'},
//                                                        {id: prototype.id + '-lblDay_10_10'},
//                                                        {id: prototype.id + '-lblDay_10_11'},
//                                                        {id: prototype.id + '-lblDay_10_12'},
//                                                        {id: prototype.id + '-lblDay_10_13'},
//                                                        {id: prototype.id + '-lblDay_10_14'},
//                                                        {id: prototype.id + '-lblDay_10_15'},
//                                                        {id: prototype.id + '-lblDay_10_16'},
//                                                        {id: prototype.id + '-lblDay_10_17'},
//                                                        {id: prototype.id + '-lblDay_10_18'},
//                                                        {id: prototype.id + '-lblDay_10_19'},
//                                                        {id: prototype.id + '-lblDay_10_20'},
//                                                        {id: prototype.id + '-lblDay_10_21'},
//                                                        {id: prototype.id + '-lblDay_10_22'},
//                                                        {id: prototype.id + '-lblDay_10_23'},
//                                                        {id: prototype.id + '-lblDay_10_24'},
//                                                        {id: prototype.id + '-lblDay_10_25'},
//                                                        {id: prototype.id + '-lblDay_10_26'},
//                                                        {id: prototype.id + '-lblDay_10_27'},
//                                                        {id: prototype.id + '-lblDay_10_28'},
//                                                        {id: prototype.id + '-lblDay_10_29'},
//                                                        {id: prototype.id + '-lblDay_10_30'},
//                                                        {id: prototype.id + '-lblDay_10_31'},
//                                                        {id: prototype.id + '-lblDay_10_32'},
//                                                        {id: prototype.id + '-lblDay_10_33'},
//                                                        {id: prototype.id + '-lblDay_10_34'},
//                                                        {id: prototype.id + '-lblDay_10_35'},
//                                                        {id: prototype.id + '-lblDay_10_36'},
//                                                        {id: prototype.id + '-lblDay_10_37',style: 'background-color:#e3eaf9 ;'},
//                                                        {id: prototype.id + '-lblDay_10_38'},
//                                                        {id: prototype.id + '-lblDay_10_39'},
//                                                        {id: prototype.id + '-lblDay_10_40'},
//                                                        {id: prototype.id + '-lblDay_10_41'},
//                                                        {id: prototype.id + '-lblDay_10_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                            
                             /*
                                 *      NOVEMBER 
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#65C3E5 ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'November', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#65C3E5 ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_11_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_11_2'},
                                                        {id: prototype.id + 'gdiFlag_11_3'},
                                                        {id: prototype.id + 'gdiFlag_11_4'},
                                                        {id: prototype.id + 'gdiFlag_11_5'},
                                                        {id: prototype.id + 'gdiFlag_11_6'},
                                                        {id: prototype.id + 'gdiFlag_11_7'},
                                                        {id: prototype.id + 'gdiFlag_11_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_11_9'},
                                                        {id: prototype.id + 'gdiFlag_11_10'},
                                                        {id: prototype.id + 'gdiFlag_11_11'},
                                                        {id: prototype.id + 'gdiFlag_11_12'},
                                                        {id: prototype.id + 'gdiFlag_11_13'},
                                                        {id: prototype.id + 'gdiFlag_11_14'},
                                                        {id: prototype.id + 'gdiFlag_11_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_11_16'},
                                                        {id: prototype.id + 'gdiFlag_11_17'},
                                                        {id: prototype.id + 'gdiFlag_11_18'},
                                                        {id: prototype.id + 'gdiFlag_11_19'},
                                                        {id: prototype.id + 'gdiFlag_11_20'},
                                                        {id: prototype.id + 'gdiFlag_11_21'},
                                                        {id: prototype.id + 'gdiFlag_11_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_11_23'},
                                                        {id: prototype.id + 'gdiFlag_11_24'},
                                                        {id: prototype.id + 'gdiFlag_11_25'},
                                                        {id: prototype.id + 'gdiFlag_11_26'},
                                                        {id: prototype.id + 'gdiFlag_11_27'},
                                                        {id: prototype.id + 'gdiFlag_11_28'},
                                                        {id: prototype.id + 'gdiFlag_11_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_11_30'},
                                                        {id: prototype.id + 'gdiFlag_11_31'},
                                                        {id: prototype.id + 'gdiFlag_11_32'},
                                                        {id: prototype.id + 'gdiFlag_11_33'},
                                                        {id: prototype.id + 'gdiFlag_11_34'},
                                                        {id: prototype.id + 'gdiFlag_11_35'},
                                                        {id: prototype.id + 'gdiFlag_11_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_11_37'},
                                                        {id: prototype.id + 'gdiFlag_11_38'},
                                                        {id: prototype.id + 'gdiFlag_11_39'},
                                                        {id: prototype.id + 'gdiFlag_11_40'},
                                                        {id: prototype.id + 'gdiFlag_11_41'},
                                                        {id: prototype.id + 'gdiFlag_11_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel11',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_11_1'},
//                                                        {id: prototype.id + '-lblDay_11_2'},
//                                                        {id: prototype.id + '-lblDay_11_3'},
//                                                        {id: prototype.id + '-lblDay_11_4'},
//                                                        {id: prototype.id + '-lblDay_11_5'},
//                                                        {id: prototype.id + '-lblDay_11_6'},
//                                                        {id: prototype.id + '-lblDay_11_7'},
//                                                        {id: prototype.id + '-lblDay_11_8'},
//                                                        {id: prototype.id + '-lblDay_11_9'},
//                                                        {id: prototype.id + '-lblDay_11_10'},
//                                                        {id: prototype.id + '-lblDay_11_11'},
//                                                        {id: prototype.id + '-lblDay_11_12'},
//                                                        {id: prototype.id + '-lblDay_11_13'},
//                                                        {id: prototype.id + '-lblDay_11_14'},
//                                                        {id: prototype.id + '-lblDay_11_15'},
//                                                        {id: prototype.id + '-lblDay_11_16'},
//                                                        {id: prototype.id + '-lblDay_11_17'},
//                                                        {id: prototype.id + '-lblDay_11_18'},
//                                                        {id: prototype.id + '-lblDay_11_19'},
//                                                        {id: prototype.id + '-lblDay_11_20'},
//                                                        {id: prototype.id + '-lblDay_11_21'},
//                                                        {id: prototype.id + '-lblDay_11_22'},
//                                                        {id: prototype.id + '-lblDay_11_23'},
//                                                        {id: prototype.id + '-lblDay_11_24'},
//                                                        {id: prototype.id + '-lblDay_11_25'},
//                                                        {id: prototype.id + '-lblDay_11_26'},
//                                                        {id: prototype.id + '-lblDay_11_27'},
//                                                        {id: prototype.id + '-lblDay_11_28'},
//                                                        {id: prototype.id + '-lblDay_11_29'},
//                                                        {id: prototype.id + '-lblDay_11_30'},
//                                                        {id: prototype.id + '-lblDay_11_31'},
//                                                        {id: prototype.id + '-lblDay_11_32'},
//                                                        {id: prototype.id + '-lblDay_11_33'},
//                                                        {id: prototype.id + '-lblDay_11_34'},
//                                                        {id: prototype.id + '-lblDay_11_35'},
//                                                        {id: prototype.id + '-lblDay_11_36'},
//                                                        {id: prototype.id + '-lblDay_11_37'},
//                                                        {id: prototype.id + '-lblDay_11_38'},
//                                                        {id: prototype.id + '-lblDay_11_39'},
//                                                        {id: prototype.id + '-lblDay_11_40'},
//                                                        {id: prototype.id + '-lblDay_11_41'},
//                                                        {id: prototype.id + '-lblDay_11_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                   /*
                                 *      DECEMBER   
                                 * 
                                 */
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    align: 'center',
                                    padding: '5 0 0 0',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    defaults: {
                                        xtype: 'label',
                                        width: 28,
                                        heigh: 30,
                                        labelAlign: 'center',
                                        align: 'center',
                                        style: 'color:#0b333c ; font-weight:bold; text-align:center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'background-color:#ffffff ;',
                                            width: 10,
                                            heigh: 30,
                                            padding: '15 5 15 5',
                                            text: ''
                                        },
                                        {xtype: 'label', width: 100, text: 'December', style: 'color:#0b333c ; font-weight:bold; text-align:right', padding: '5 5 5 0'},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 1178,
                                            align: 'center',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    bodyStyle: 'background-color: #D6D6D6;',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        width: 28,
                                                        heigh: 10,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        padding: '5 14 5 14',
                                                        border: false,
                                                        text: ' '
                                                    },
                                                    items: [
                                                        {id: prototype.id + 'gdiFlag_12_1', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_12_2'},
                                                        {id: prototype.id + 'gdiFlag_12_3'},
                                                        {id: prototype.id + 'gdiFlag_12_4'},
                                                        {id: prototype.id + 'gdiFlag_12_5'},
                                                        {id: prototype.id + 'gdiFlag_12_6'},
                                                        {id: prototype.id + 'gdiFlag_12_7'},
                                                        {id: prototype.id + 'gdiFlag_12_8', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_12_9'},
                                                        {id: prototype.id + 'gdiFlag_12_10'},
                                                        {id: prototype.id + 'gdiFlag_12_11'},
                                                        {id: prototype.id + 'gdiFlag_12_12'},
                                                        {id: prototype.id + 'gdiFlag_12_13'},
                                                        {id: prototype.id + 'gdiFlag_12_14'},
                                                        {id: prototype.id + 'gdiFlag_12_15', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_12_16'},
                                                        {id: prototype.id + 'gdiFlag_12_17'},
                                                        {id: prototype.id + 'gdiFlag_12_18'},
                                                        {id: prototype.id + 'gdiFlag_12_19'},
                                                        {id: prototype.id + 'gdiFlag_12_20'},
                                                        {id: prototype.id + 'gdiFlag_12_21'},
                                                        {id: prototype.id + 'gdiFlag_12_22', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_12_23'},
                                                        {id: prototype.id + 'gdiFlag_12_24'},
                                                        {id: prototype.id + 'gdiFlag_12_25'},
                                                        {id: prototype.id + 'gdiFlag_12_26'},
                                                        {id: prototype.id + 'gdiFlag_12_27'},
                                                        {id: prototype.id + 'gdiFlag_12_28'},
                                                        {id: prototype.id + 'gdiFlag_12_29', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_12_30'},
                                                        {id: prototype.id + 'gdiFlag_12_31'},
                                                        {id: prototype.id + 'gdiFlag_12_32'},
                                                        {id: prototype.id + 'gdiFlag_12_33'},
                                                        {id: prototype.id + 'gdiFlag_12_34'},
                                                        {id: prototype.id + 'gdiFlag_12_35'},
                                                        {id: prototype.id + 'gdiFlag_12_36', style: 'background-color:#D6D6D6 ;'},
                                                        {id: prototype.id + 'gdiFlag_12_37'},
                                                        {id: prototype.id + 'gdiFlag_12_38'},
                                                        {id: prototype.id + 'gdiFlag_12_39'},
                                                        {id: prototype.id + 'gdiFlag_12_40'},
                                                        {id: prototype.id + 'gdiFlag_12_41'},
                                                        {id: prototype.id + 'gdiFlag_12_42'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.id +'panel12',
                                                    layout: 'hbox',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'background-color:#ffffff ;',
                                                        padding: '3 0 2 0',
                                                        width: 28,
                                                        heigh: 20,
                                                        labelAlign: 'center',
                                                        align: 'center',
                                                        border: false,
                                                        text: '00'
                                                    },
                                                    items: [
//                                                        {id: prototype.id + '-lblDay_12_1'},
//                                                        {id: prototype.id + '-lblDay_12_2'},
//                                                        {id: prototype.id + '-lblDay_12_3'},
//                                                        {id: prototype.id + '-lblDay_12_4'},
//                                                        {id: prototype.id + '-lblDay_12_5'},
//                                                        {id: prototype.id + '-lblDay_12_6'},
//                                                        {id: prototype.id + '-lblDay_12_7'},
//                                                        {id: prototype.id + '-lblDay_12_8'},
//                                                        {id: prototype.id + '-lblDay_12_9'},
//                                                        {id: prototype.id + '-lblDay_12_10'},
//                                                        {id: prototype.id + '-lblDay_12_11'},
//                                                        {id: prototype.id + '-lblDay_12_12'},
//                                                        {id: prototype.id + '-lblDay_12_13'},
//                                                        {id: prototype.id + '-lblDay_12_14'},
//                                                        {id: prototype.id + '-lblDay_12_15'},
//                                                        {id: prototype.id + '-lblDay_12_16'},
//                                                        {id: prototype.id + '-lblDay_12_17'},
//                                                        {id: prototype.id + '-lblDay_12_18'},
//                                                        {id: prototype.id + '-lblDay_12_19'},
//                                                        {id: prototype.id + '-lblDay_12_20'},
//                                                        {id: prototype.id + '-lblDay_12_21'},
//                                                        {id: prototype.id + '-lblDay_12_22'},
//                                                        {id: prototype.id + '-lblDay_12_23'},
//                                                        {id: prototype.id + '-lblDay_12_24'},
//                                                        {id: prototype.id + '-lblDay_12_25'},
//                                                        {id: prototype.id + '-lblDay_12_26'},
//                                                        {id: prototype.id + '-lblDay_12_27'},
//                                                        {id: prototype.id + '-lblDay_12_28'},
//                                                        {id: prototype.id + '-lblDay_12_29'},
//                                                        {id: prototype.id + '-lblDay_12_30'},
//                                                        {id: prototype.id + '-lblDay_12_31'},
//                                                        {id: prototype.id + '-lblDay_12_32'},
//                                                        {id: prototype.id + '-lblDay_12_33'},
//                                                        {id: prototype.id + '-lblDay_12_34'},
//                                                        {id: prototype.id + '-lblDay_12_35'},
//                                                        {id: prototype.id + '-lblDay_12_36'},
//                                                        {id: prototype.id + '-lblDay_12_37'},
//                                                        {id: prototype.id + '-lblDay_12_38'},
//                                                        {id: prototype.id + '-lblDay_12_39'},
//                                                        {id: prototype.id + '-lblDay_12_40'},
//                                                        {id: prototype.id + '-lblDay_12_41'},
//                                                        {id: prototype.id + '-lblDay_12_42'}
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                }
                            
                            ]

                        }
                    ]
                }
//        {
//                    xtype: 'panel',
//                    id: prototype.id + '-pie',
//                    layout: {
//                        type: 'hbox',
//                        pack: 'center'
//                    },
//                    border: true,
//                    height: 25,
//                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                    defaults: {
//                        border: true,
//                        padding: '0px 1px 0px 1px'
//                    },
//                    padding: '1px 1px 1px 1px',
//                    items: [
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-panelPie',
//                            width: 780,
//                            height: 25,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            defaults: {
//                                xtype: 'label',
//                                margin: '3px 0px 0px 5px'
//                            },
//                            items: [
//                                {
//                                    text: 'Page',
//                                    width: 50
//                                },
//                                {
//                                    id: prototype.id + '-lbl-currentPage',
//                                    text: '1',
//                                    width: 50
//                                },
//                                {
//                                    text: 'Of',
//                                    width: 50
//                                },
//                                {
//                                    id: prototype.id + '-lbl-pageCount',
//                                    text: '0',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 100},
//                                {
//                                    text: 'Total found',
//                                    width: 80
//                                },
//                                {
//                                    id: prototype.id + '-lbl-total',
//                                    text: '0',
//                                    width: 50
//                                }
//                            ]
//                        }
//                    ]
//                }

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
            }
        }
    ]
}
);


