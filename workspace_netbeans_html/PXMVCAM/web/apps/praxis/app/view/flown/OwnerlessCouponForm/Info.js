/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.OwnerlessCouponForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                height: 600,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 500,
                    hidden: false,
                    width: 1200,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Ticket <br> Number', width: 150, dataIndex: 'strTicket',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strTicket'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                    metaData.style = "background:#CCFFFF";
                                    return value;
                                }},
                            {text: 'Flight', align: 'center',
                                columns: [
                                    {text: 'Date', width: 150, dataIndex: 'strFormatDate'},
                                    {text: 'Number', width: 150, dataIndex: 'A1413NVLOB'},
                                ]
                            },
                            {text: 'Transaction <br> Date', width: 150, dataIndex: 'strFormatDate2'},
                            {text: 'Join <br> Date', width: 150, dataIndex: 'strDescripcion'},
                            {text: 'Orig', width: 90, dataIndex: 'A1413FROM',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strFROM'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }},
                            {text: 'Dest', width: 90, dataIndex: 'A1413TO',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strTO'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }},
                            {text: 'Flag <br> Flown', width: 80, dataIndex: 'FFLOWN'},
                            {text: 'Status', width: 120, dataIndex: 'A1413STCRU'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 70,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData2',
                    hidden: true,
                    width: 1500,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'SSIM Data',
                                defaults: {
                                    editable: false,
                                    menuDisabled: true
                                },
                                columns: [
                                    {text: 'Fight', align: 'center',
                                        defaults: {
                                            editable: false,
                                            menuDisabled: true
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 105, align: 'center'},
                                            {text: 'Number', dataIndex: 'NFLIGHT', width: 75, align: 'center'}
                                        ]
                                    },
                                    {text: 'Carrier', dataIndex: 'CARRI', width: 65, align: 'center'},
                                    {text: 'Flown Type', dataIndex: 'strDescFFLOW', width: 85, align: 'center'},
                                    {text: 'Orig', dataIndex: 'CDEPART', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strDescCDEPART'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest', dataIndex: 'CARRIVA', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strDescCARRIVA'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Received', align: 'center',
                                        defaults: {
                                            editable: false,
                                            menuDisabled: true
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDSS', width: 105, align: 'center'}
                                        ]
                                    }
                                ]
                            },
                            {text: 'Information PAX ODS',
                                columns: [
                                    {text: 'Senior', dataIndex: 'QCPAD', width: 60, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }},
                                    {text: 'Children', dataIndex: 'QCPCHD', width: 70, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }},
                                    {text: 'Infant', dataIndex: 'QCPINF', width: 60, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }},
                                    {text: 'Transit', dataIndex: 'QCPTRA', width: 60, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'ODS Data',
                                columns: [
                                    {text: 'Received', align: 'center', menuDisabled: true,
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDOD', width: 105, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Qty', dataIndex: 'QCPNOD', width: 55, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D5F4D5";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'LEG', dataIndex: 'QCPNLEG', width: 55, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#D5F4D5";
                                    return value;
                                }},
                            {text: 'VCR Data',
                                columns: [
                                    {text: 'Received', align: 'center', menuDisabled: true,
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDVC', width: 105, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Qty', dataIndex: 'QCPNVC', width: 60, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'OCR',
                                columns: [
                                    {text: 'Qty', dataIndex: 'QCPNOCR', width: 60, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'Manual',
                                columns: [
                                    {text: 'Qty', dataIndex: 'QCPNMA', width: 60, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'Total', dataIndex: 'QCPNTOT', width: 60, align: 'right', menuDisabled: true, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#D5F4D5;td:hover { background-color: #B2E1FF;}";
                                    return value;
                                }},
                            {text: 'Coupons',
                                columns: [
                                    {text: 'Valued', dataIndex: 'QCPNVAL', width: 65, align: 'right', menuDisabled: true}
                                ]
                            },
                            {
                                text: 'Edit',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 45,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData3',
                    height: 500,
                    hidden: true,
                    width: 1070,
                    features: [{
                            ftype: 'summary',
                            dock: 'bottom'
                        }],
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Flight', align: 'center',
                                columns: [
                                    {text: 'Date', width: 80, dataIndex: 'DFLIGHT'},
                                    {text: 'Number', width: 70, dataIndex: 'NFLIGHT'},
                                ]
                            },
                            {text: 'Orig', dataIndex: 'CDEPART', width: 70, align: 'center',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strDescCDEPART'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'Dest', dataIndex: 'CARRIVA', width: 70, align: 'center',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strDescCARRIVA'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'Status', width: 80, dataIndex: 'STVAL'},
                            //{text: 'Status<br>ODS', width: 120, dataIndex: 'A3778STVAL'},
                            {text: 'ODS Cancelled', align: 'center',
                                columns: [
                                    {text: 'Creation User', width: 100, dataIndex: 'A3778USCR', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D5F4D5;text-align:center";
                                            return value;
                                        }
                                    },
                                    {text: 'Creation Date', width: 100, dataIndex: 'A3778FECR', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D5F4D5;text-align:center";
                                            return value;
                                        }
                                    },
                                    {text: 'Creation Hour', width: 100, dataIndex: 'A3778HOCR', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D5F4D5;text-align:center";
                                            return value;
                                        }
                                    },
                                ]
                            },
                            {text: 'ODS Operated', //B3ECFF
                                columns: [
                                    {text: 'Pax Total', width: 80, align: 'right', dataIndex: 'PAXTOTAL', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridData3').getStore().getData().items[rowIndex].data;
                                            if (data.A1688USCR === '' && data.A1688FECR === '' && data.A1688HOCR === '' && data.PAXTOTAL === 0) {
                                                value = '';
                                            }
                                            metaData.style = "background-color:#B3ECFF;text-align:right";
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData3').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPAXTOTAL, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Creation User', width: 100, dataIndex: 'A1688USCR', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#B3ECFF;text-align:center";
                                            return value;
                                        }
                                    },
                                    {text: 'Creation Date', width: 100, dataIndex: 'A1688FECR', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#B3ECFF;text-align:center";
                                            return value;
                                        }
                                    },
                                    {text: 'Creation Hour', width: 100, dataIndex: 'A1688HOCR', menuDisabled: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#B3ECFF;text-align:center";
                                            return value;
                                        }
                                    },
                                ]
                            },
                        ]
                    }
                },
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
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1000,
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
}
);

