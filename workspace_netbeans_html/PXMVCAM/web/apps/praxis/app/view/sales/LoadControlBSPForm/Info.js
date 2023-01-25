Ext.define('Ext.Praxis.view.sales.LoadControlBSPForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            bodyStyle: 'background: transparent;',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tnvMain',
                    bodyStyle: 'background: transparent;',
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: 1200,
                        height: 540,
                        align: 'center',
                        listeners: {
                            activate: 'tab_clickHandler'
                        }
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="BSP Load Control">
                        {
                            title: 'BSP Load Control',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridControlLoadRep',
                                    bodyStyle: 'background: transparent;',
                                    height: 540,
                                    columnLines: true,
                                    autoScroll: true,
                                    enableKeyEvents: true,
                                    tbar: [
                                        '->',
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnFormatMasterFile',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">Format Master File</strong>',
                                            icon: 'resources/img/botones/1400209639_25.png',
                                            border: true,
                                            listeners: {
                                                click: 'btnFormatMasterFile_clickHandler'
                                            }
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Country', dataIndex: 'A1698PAIS', width: 110},
                                            {text: 'City', dataIndex: 'A1698BANK', width: 130},
                                            {text: 'Processing Date', dataIndex: 'A1698FPRDA_00', width: 120},
                                            {text: 'Ending Date', dataIndex: 'A1698FFILE_00', width: 120},
                                            {text: 'Hour', dataIndex: 'A1698HFILE', width: 50},
                                            {text: 'QUANTITY LINES',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Received', dataIndex: 'A1698SQNR', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Processed', dataIndex: 'A1698LINE', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'STATUS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Delivery', dataIndex: 'A1698STREC_00', width: 70},
                                                    {text: 'Master File', dataIndex: 'A1698STCAR_00', width: 100},
                                                    {text: 'Prorate File', dataIndex: 'A1698STPRO_00', width: 100}
                                                ]
                                            },
                                            {text: 'ID File', dataIndex: 'A1698IDFIL', flex: 1, width: 100},
                                            {text: 'System Date', dataIndex: 'A1698FREGI', width: 100}
                                        ]
                                    },
                                    listeners: {
                                        select: 'gridControlLoadRep_itemClickHandler'
                                    }
                                },
                                // <editor-fold defaultstate="collapsed" desc="pie3">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie3',
                                    hidden: true,
                                    width: 900,
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
                                            width: 900,
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
                                                    id: prototype.id + '-lbl-currentPage3',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount3',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total3',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        //</editor-fold>

                        //<editor-fold defaultstate="collapsed" desc="Load HOT">
                        {
                            title: 'Load HOT',
                            id: prototype.id + '-LoadControl1',
                            tbar: [
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/download.png',
                                    tooltip: 'View More',
                                    listeners: {
                                        click: 'pagNext'
                                    }
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnLoad',
                                    icon: 'resources/img/botones/process.png',
                                    style: 'font-weight:bold;background:#024F79;',
                                    html: '<strong style="background:#024F79;color:white;">Load HOT</strong>',
                                    tooltip: 'Load HOT BSP',
                                    listeners: {
                                        click: 'btnLoadHOT_clickHandler'
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: prototype.id + '-txaDelivery',
                                    fieldStyle: 'text-align:left;background:white;font-family:"Courier New";',
                                    scrollable: true,
                                    height: 450,
                                    width: '100%',
                                    readOnly: true
                                },
                                // <editor-fold defaultstate="collapsed" desc="pie4">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie4',
                                    hidden: true,
                                    width: 900,
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
                                            width: 900,
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
                                                    id: prototype.id + '-lbl-currentPage4',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount4',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total4',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        //</editor-fold>

                        //<editor-fold defaultstate="collapsed" desc="Errors Load">
                        {
                            title: 'Errors Load',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridControlLoadError',
                                    bodyStyle: 'background: transparent;',
                                    columnLines: true,
                                    autoScroll: true,
                                    height: 400,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Country', dataIndex: 'A1697PAIS', width: 110},
                                            {text: 'City', dataIndex: 'A1697BANK', width: 130},
                                            {text: 'Processing Date', dataIndex: 'A1697FPRDA', width: 140},
                                            {text: 'Ending Date', dataIndex: 'A1697FFILE', width: 140},
                                            {text: 'Hour', dataIndex: 'A1697HFILE', width: 50},
                                            {text: 'ID File', dataIndex: 'A1697IDFIL', width: 140},
                                            {text: 'Error', dataIndex: 'A1697CDERR', flex: 1},
                                            {text: 'System Date', dataIndex: 'A1697FREGI', width: 140}
                                        ]
                                    }
                                },
                                // <editor-fold defaultstate="collapsed" desc="pie5">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie5',
                                    hidden: true,
                                    width: 900,
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
                                            width: 900,
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
                                                    id: prototype.id + '-lbl-currentPage5',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount5',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total5',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        //</editor-fold>

                        //<editor-fold defaultstate="collapsed" desc="Errors Format">
                        {
                            title: 'Errors Format',
                            id: prototype.id + '-boxErrorsFormat',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridErrorsFormat',
                                    bodyStyle: 'background: transparent;',
                                    columnLines: true,
                                    autoScroll: true,
                                    height: 517,
                                    tbar: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIDFile',
                                            fieldStyle: 'text-align:center;',
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            maxLength: 9,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            fieldLabel: 'ID File',
                                            maskRe: /[0-9]/,
                                            width: 180,
                                            listeners: {
                                                keypress: 'onTextKeypress_btnSearchIDFile_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchIDFile',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">Search</strong>',
                                            listeners: {
                                                click: 'btnSearchIDFile_clickHandler'
                                            }
                                        },
                                        '->',
                                        //<editor-fold defaultstate="collapsed" desc="paggin2">
                                        {
                                            xtype: 'toolbar',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-first2',
                                                    iconCls: 'prx-icon-pagination-first',
                                                    tooltip: 'First Page',
                                                    listeners: {
                                                        click: 'pagFirst'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-previous2',
                                                    iconCls: 'prx-icon-pagination-previous',
                                                    tooltip: 'Previous Page',
                                                    listeners: {
                                                        click: 'pagPrevious'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-next2',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Next Page',
                                                    listeners: {
                                                        click: 'pagNext'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-last2',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Last Page',
                                                    listeners: {
                                                        click: 'pagLast'
                                                    }
                                                },
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin2',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: true
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'ID File', dataIndex: 'A1724IDFIL', width: 105},
                                            {text: 'Group', dataIndex: 'A1724GRUPO', width: 105},
                                            {text: 'Transaction', dataIndex: 'A1724TRANS', width: 115},
                                            {text: 'Cia', dataIndex: 'A1724CIA', width: 60},
                                            {text: 'Form', dataIndex: 'A1724FORMA', width: 70},
                                            {text: 'Ser', dataIndex: 'A1724SERIE', width: 80},
                                            {text: 'Code', dataIndex: 'A1724CODER', width: 85},
                                            {text: 'Description', dataIndex: 'A1272DES', width: 290,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Data', dataIndex: 'A1724DATA', flex: 1,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                },
                                // <editor-fold defaultstate="collapsed" desc="pie2">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie2',
                                    hidden: true,
                                    width: 900,
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
                                            width: 900,
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
                                                    id: prototype.id + '-lbl-currentPage2',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount2',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total2',
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
                        //</editor-fold>
                    ]
                }
            ]
        }
    ]
});