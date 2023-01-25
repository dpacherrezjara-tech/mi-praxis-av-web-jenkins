Ext.define('Ext.Praxis.view.flown.ConciliationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id:prototype.id+'-boxDifference',
            hidden: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1088,
                height: 510,
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="gridData3">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData3',
                    height: 508,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: '-', id:prototype.id + "-hd_Diff", flex: 1,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Nbr',  flex: 1,/*width: 35,*/ dataIndex: 'RN'},
                                    {text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Number',  width: 60, dataIndex: 'NFLIGHT'}
                                        ]
                                    },
                                    {text: 'Origin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Code',  width: 60, dataIndex: 'CDEPART'},
                                            {text: 'Description',  width: 190, dataIndex: 'strDescCDEPART',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Destination',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Code',  width: 60, dataIndex: 'CARRIVA'},
                                            {text: 'Description',  width: 190, dataIndex: 'strDescCARRIVA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Status',  width: 80, dataIndex: 'strDescripcion',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'ODS',  width: 80, dataIndex: 'QCPNOD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {text: 'Conciliation',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Flight',  width: 80, dataIndex: 'QCPNTOT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#FFF9E0;text-align:right;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'ACS', dataIndex: 'QCPNCON', width: 80, sortable: false,
                                                listeners: {
                                                    click: 'LoadTKT_ACS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFF9E0;color:#057ECB;";
                                                    return '<a href="#flown-conciliation-form" style="color:#008FE3;text-decoration:none;"><b>' + value + '</b></a>';
                                                }
                                            },
                                            {text: 'Difference',  width: 80, dataIndex: 'QCPINF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    console.log(record.data.strDesFCLOFO);
                                                    var color = record.data.strDesFCLOFO.replace('0x', '#');
                                                    metaData.style = "background-color:#D5F4D5;text-align:right;color:" + color + ";";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Paper Tkts',  width: 80, dataIndex: 'QCPNFI',
                                        listeners: {
                                            click: 'LoadTKT_Paper'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;color:#057ECB;";
                                            return '<a href="#flown-conciliation-form" style="color:#008FE3;text-decoration:none;"><b>' + value + '</b></a>';
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
                //</editor-fold>
            ]
        },
        {
            region: 'center',
            id:prototype.id+'-boxMainData',
            hidden: true,
            border: false,
            width: '100%',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                height: '100%',
                align: 'center'
            },
            padding: '0 0 0 78',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        align: 'center'
                    },
                    items:[
                        //<editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            border: false,
                            width: 700,
                            height: 510,
                            columnLines: true,                     
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: '', id:prototype.id + "-hd_A1691", flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Nbr',  width: 35, dataIndex: 'RN'},
                                            {text: 'Status',  width: 80, dataIndex: 'strDescripcion', sortable: false,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Flight', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number',  /*width: 60,*/flex: 1, dataIndex: 'NFLIGHT'}
                                                ]
                                            },
                                            {text: 'Origin',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code',  width: 60, dataIndex: 'CDEPART'},
                                                    {text: 'Description',  width: 190, dataIndex: 'strDescCDEPART',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Destination',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code',  width: 60, dataIndex: 'CARRIVA'},
                                                    {text: 'Description',  width: 190, dataIndex: 'strDescCARRIVA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center'
                    },
                    items:[
                        //<editor-fold defaultstate="collapsed" desc="gridData2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData2',
                            border: false,
                            width: 620,
                            height: 510,
                            columnLines: true,                     
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: '', id:prototype.id + "-hd_ACS", flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Nbr',  width: 35, dataIndex: 'RN'},
                                            {text: 'Flight', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number',  /*width: 60,*/flex: 1, dataIndex: 'NFLIGHT'}
                                                ]
                                            },
                                            {text: 'Origin',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code',  width: 60, dataIndex: 'CDEPART'},
                                                    {text: 'Description',  width: 190, dataIndex: 'strDescCDEPART',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Destination',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code',  width: 60, dataIndex: 'CARRIVA'},
                                                    {text: 'Description',  width: 190, dataIndex: 'strDescCARRIVA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                }
            ]
        },
        {
            region: 'center',
            id:prototype.id+'-boxTicketPaper',
            hidden: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="gridDataTKT">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataTKT',
                    border: false,
                    width: 1117,
                    height: 508,
                    columnLines: true,                     
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr',  width: 35, dataIndex: 'RN'},
                            {text: 'Flight', flex: 1,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Number',  /*width: 60,*/flex: 1, dataIndex: 'NFLIGHT'}
                                ]
                            },
                            {text: 'Origin',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Code',  width: 60, dataIndex: 'CDEPART'},
                                    {text: 'Description',  width: 190, dataIndex: 'strDescCDEPART',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Destination',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Code',  width: 60, dataIndex: 'CARRIVA'},
                                    {text: 'Description',  width: 190, dataIndex: 'strDescCARRIVA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'PMR Locator ID',  width: 100, dataIndex: 'strFCON',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Paper Number Ticket',  width: 150, dataIndex: 'strTicket', sortable: true},
                            {text: 'First Name',  width: 130, dataIndex: 'strFormatDate'},
                            {text: 'Last Name',  width: 130, dataIndex: 'strFormatDate2'}
                        ]
                    }
                }
                //</editor-fold>
            ]
        },
        {
            region: 'center',
            id:prototype.id+'-boxTicketACS',
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
                //<editor-fold defaultstate="collapsed" desc="gridDataTKT_ACS">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataTKT_ACS',
                    width: 650,
                    height: 496,
                    columnLines: true,                     
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 50, dataIndex: 'RN'},
                            {text: 'Ticket Number',  /*width: 150,*/flex: 1, dataIndex: 'strTicket'},
                            {text: 'First Name',  width: 170, dataIndex: 'strFormatDate',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Last Name',  width: 170, dataIndex: 'strFormatDate2',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Found',  width: 110, dataIndex: 'FLOAD'}
                        ]
                    }
                }
                //</editor-fold>
            ]
        }
    ]
});

