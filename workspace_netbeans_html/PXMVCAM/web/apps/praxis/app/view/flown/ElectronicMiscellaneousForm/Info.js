/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            width: 1295,
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
                    xtype: 'label',
                    id: prototype.id + '-labelTitle',
                    labelAlign: 'center',
                    labelStyle: 'color:#231223',
                    align: 'center',
                    margin: '10 0 0 0'
                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                            xtype: 'grid',
                            padding: '20 0 0 0',
                            id: prototype.id + '-gridData',
                            height: 550,
                            width: 613,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Flight <br> Date', width: 130, dataIndex: 'strFormatDate',
                                        listeners: {
                                            click: 'onSetGridDataDetail'
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                            return '';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-decoration:none; color:#008FE3; ';
                                            return '<a href="#flown-electronic-miscellaneous-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'EMD',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Stand Alone', width: 120, dataIndex: 'QCPNSTAS',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                                ,
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.totQCPNSTAS, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Used ', width: 120, dataIndex: 'QCPNUSEA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                                ,
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.totQCPNUSEA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'ORPHANED', width: 120, dataIndex: 'QCPNOTHU',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                                ,
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.totQCPNOTHU, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Total', width: 120, dataIndex: 'QCPNEMD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                    ;
                                                }
                                                ,
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.totQCPNEMD, '0,000') + '<b>';
                                                }
                                            }
                                        ]


                                    }

                                ]
                            }
                },
                // --------------------------   GRID DETAIL------------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 555,
                    width: 1415,
                    // hidden: true,
                    columnLines: true,
                    features: [{
                            ftype: 'summary'
                        }],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Flight <br> Date', width: 130, dataIndex: 'strFormatDate',
                                listeners: {
                                    click: 'onSetGridDataDetailCoupon'
                                },
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                    return '';
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:none; color:#008FE3; ';
                                    return '<a href="#flown-electronic-miscellaneous-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                }
                            },
                            {text: 'Flight<br> Number', width: 80, dataIndex: 'NFLIGHT'},
                            {text: 'Plane Nbr.', width: 100, dataIndex: 'NPLANE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:center;';
                                    return value;
                                }
                            },
                            {text: 'Zone', width: 80, dataIndex: 'ZONA'},
                            {text: 'ORIG', width: 75, dataIndex: 'CDEPART'},
                            {text: 'DEST', width: 75, dataIndex: 'CARRIVA'},
                            {text: 'EMD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Total', width: 100, dataIndex: 'QCPNEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return value;
                                        }
                                        ,
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNEMD, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'OAL ', width: 100, dataIndex: 'QCPNOAL',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return value;
                                        }
                                        ,
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'AM', width: 100, dataIndex: 'QCPNON',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return value;
                                        }
                                        ,
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNON, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: 'CPN <br> STAND-ALONE', width: 100, dataIndex: 'QCPNSTAS',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return value;
                                }
                                ,
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totQCPNSTAS, '0,000') + '<b>';
                                }
                            },
                            {text: 'CPN USED',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'QTY', width: 100, dataIndex: 'QCPNUSEA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return value;
                                        }
                                        ,
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNUSEA, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'VAL ', width: 100, dataIndex: 'QCPNVAL',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return value;
                                        }
                                        ,
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNVAL, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'DIFF', width: 100, dataIndex: 'QCPNDIFF',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return value;
                                        }
                                        ,
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNDIFF, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: 'CPN <br> Others', width: 100, dataIndex: 'QCPNOTHU',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return value;
                                }
                                ,
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totQCPNOTHU, '0,000') + '<b>';
                                }
                            },
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
                // --------------------------   GRID DETAIL COUPON-----------------
                //-----------------------------------------------------------------
                {
                            xtype: 'grid',
                            padding: '20 0 0 0',
                            id: prototype.id + '-gridDataDetailCoupon',
                            height: 555,
                            width: 1530,
                            // hidden: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', width: 120, dataIndex: 'strTicket',
                                        listeners: {
                                            click: 'onFacsimilClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-decoration:none; color:#008FE3; ';
                                            return '<a href="#flown-electronic-miscellaneous-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Seq', width: 60, dataIndex: 'SEQ'},
                                    {text: 'Rolling', width: 60, dataIndex: 'SEQRO'},
                                    {text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Associated <br> Ticket', width: 150, dataIndex: 'TKTASO'},
                                            {text: 'Plane', width: 100, dataIndex: 'NPLANE',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:center;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Date ', width: 70, dataIndex: 'strFormatDate2'},
                                            {text: 'Country', width: 70, dataIndex: 'PSVVTA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescPSVVTA'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', width: 70, dataIndex: 'FVAL'}
                                        ]
                                    },
                                    {text: 'RFIC', width: 50, dataIndex: 'RFIC'},
                                    {text: 'Reason <br> Code', width: 60, dataIndex: 'RECODE'},
                                    {text: 'Free Description', width: 140, dataIndex: 'DES_RECODE'},
                                    {text: 'Coupon',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Carrier', width: 60, dataIndex: 'CARR'},
                                            {text: 'Value ', width: 60, dataIndex: 'VCPN',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return value;
                                                }
                                            },
                                            {text: 'Com. ', width: 60, dataIndex: 'COMISI',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Curr.', width: 60, dataIndex: 'MDACP'},
                                            {text: 'Status <br> Valoration', width: 120, dataIndex: 'strDescFVAL'},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                text: 'Edit',
                                                width: 60,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick2'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {text: 'Accounting',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', width: 80, dataIndex: 'strFCON'},
                                            {text: 'ID', width: 140, dataIndex: 'IDCON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['IDCON'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                ,
                /** PAGINATION LABELS*/
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
                            width: 1295,
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
//        {
//            region: 'center',
//            id: prototype.id + '-regionCenterGrid02',
//            layout: {
//                type: 'vbox',
//                align: 'center'
//            },
//            defaults: {
//                bodyStyle: 'background: transparent;',
//                border: false,
//                height: 600,
//                align: 'center'
//            },
//            items: [
//                {
//                    xtype: 'grid',
//                    padding: '20 0 0 0',
//                    id: prototype.id + '-gridDataDetail',
//                    height: 550,
//                    width: 660,
//                    columnLines: true,
//                    columns: {
//                        defaults: {
//                            menuDisabled: true,
//                            sortable: true,
//                            align: 'center'
//
//                        },
//                        items: [
//                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
//                            {text: 'Ticket', width: 150, dataIndex: 'strTicket'},
//                            {text: 'Flight',
//                                defaults: {
//                                    menuDisabled: true,
//                                    sortable: true,
//                                    align: 'center'
//                                },
//                                columns: [
//                                    {text: 'Date', width: 100, dataIndex: 'strFormatDate'},
//                                    {text: 'Number', width: 100, dataIndex: 'NFLIGHT'}
//                                ]
//                            },
//                            {text: 'Orig', width: 100, dataIndex: 'CDEPART',
//                                renderer: function(value, metaData, record) {
//                                    var tool = record.data['strDescCDEPART'].trim();
//                                    if (tool.length > 0) {
//                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
//                                    }
//                                    return value;
//                                }
//                            },
//                            {text: 'Status', width: 100, dataIndex: 'strDescripcion',
//                                renderer: function(value, metaData, record) {
//                                    metaData.style = 'text-align :left; margin-left : 3px ';
//                                    return value;
//                                }
//                            },
//                            {
//                                sortable: false,
//                                xtype: 'actioncolumn',
//                                text: 'Edit',
//                                width: 50,
//                                align: 'center',
//                                items: [
//                                    {
//                                        iconCls: 'prx-icon-edit',
//                                        tooltip: 'Edit',
//                                        handler: 'onEditClick'
//                                    }
//                                ]
//                            }
//                        ]
//                    }
//                }
//                ,
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-pie2',
//                    layout: {
//                        type: 'hbox',
//                        pack: 'center'
//                    },
//                    border: true,
//                    height: 25, bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                    defaults: {
//                        border: true,
//                        padding: '0px 1px 0px 1px'
//                    },
//                    padding: '1px 1px 1px 1px',
//                    items: [
//                        {
//                            xtype: 'panel',
//                            width: 600,
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
//                                    id: prototype.id + '-lbl-currentPage2',
//                                    text: '1',
//                                    width: 50
//                                },
//                                {
//                                    text: 'Of',
//                                    width: 50
//                                },
//                                {
//                                    id: prototype.id + '-lbl-pageCount2',
//                                    text: '0',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 100},
//                                {
//                                    text: 'Total found',
//                                    width: 80
//                                },
//                                {
//                                    id: prototype.id + '-lbl-total2',
//                                    text: '0',
//                                    width: 50
//                                }
//                            ]
//                        }
//                    ]
//                }
//            ]
//        },


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

