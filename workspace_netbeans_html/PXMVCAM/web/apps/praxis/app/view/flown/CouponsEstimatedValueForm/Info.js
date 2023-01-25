/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CouponsEstimatedValueForm.Info', {
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
            width: 1395,
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
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },

                    items: [
                        {
                            xtype: 'grid',
                            padding: '20 0 0 0',
                            id: prototype.id + '-gridData',
                            height: 540,
                            width: 1331,
                            columnLines: true,
                            resizable: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    resizable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Tickets', width: 110, dataIndex: 'strTicket',
                                        listeners: {
                                            click: 'displayMasterTkt_clickHandler'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-coupons-estimated-value-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Seq', width: 55, dataIndex: 'SEQ'},
                                    {text: 'Status', width: 85, dataIndex: 'strDescSTVAL'},
                                    {text: 'Flight ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', width: 80, dataIndex: 'strFormatDate2'}
                                        ]
                                    },
                                    {text: 'VCR Date', width: 80, dataIndex: 'strFormatDate'},
                                    {text: 'Flight ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Number', width: 60, dataIndex: 'NFLIGHT'}
                                        ]
                                    },
                                    {text: 'City ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Pair', width: 70, dataIndex: 'strDescripcion'}
                                        ]
                                    },
                                    {text: 'Leg ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Sec.', width: 45, dataIndex: 'LEGSEQ'}
                                        ]
                                    },
                                    {text: 'Zone', width: 50, dataIndex: 'ZONA'},
                                    {text: 'Carrier', width: 51, dataIndex: 'CARR'},
                                    {text: 'Fare ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Basis', width: 95, dataIndex: 'FBASE',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return  value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Class', width: 45, dataIndex: 'CLAS'},
                                    {text: 'Sales Value ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Flag', width: 60, dataIndex: 'strFVAL'},
                                            {text: 'USD', width: 80, dataIndex: 'VCPN',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Estimated Value',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'USD', width: 81, dataIndex: 'VCPMX',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Exch.',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Rate', width: 80, dataIndex: 'TCMUS',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:center;';
                                                    return  value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Estimated Value',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'MXN', width: 82, dataIndex: 'VCPUS',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Create',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', width: 80, dataIndex: 'strFormatFVTA'}
                                        ]
                                    },
                                    {text: 'Flag', width: 40, dataIndex: 'strDescSTNEW'}

                                    /*

                                    {text: 'Values',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Value', width: 90, dataIndex: 'VCPN',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'Currency', width: 90, dataIndex: 'MDACP',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'Status <br> Accounting', width: 120, dataIndex: 'strDescFVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'MXN', width: 70, dataIndex: 'VCPMX',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'Rate', width: 70, dataIndex: 'TCMUS',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'Difference', width: 70, dataIndex: 'difVakues',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'USD', width: 70, dataIndex: 'VCPUS',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'Commission', width: 70, dataIndex: 'COMISI',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    }

                                    */

                                ]
                            }
                        },
        //                {
        //                    xtype: 'grid',
        //                    padding: '20 0 0 0',
        //                    id: prototype.id + '-gridDataPrevious',
        //                    height: 450,
        //                    width: 1033,
        //                    hidden: true,
        //                    columnLines: true,
        //                    resizable: false,
        //                    columns: {
        //                        defaults: {
        //                            menuDisabled: true,
        //                            sortable: true,
        //                            resizable: false,
        //                            align: 'center'
        //                        },
        //                        items: [
        //                            {text: 'Flight ',
        //                                defaults: {
        //                                    menuDisabled: true,
        //                                    sortable: true,
        //                                    align: 'center'
        //                                },
        //                                columns: [
        //                                    {text: 'Date', width: 90, dataIndex: 'strTicket'},
        //                                    {text: 'Orig', width: 70, dataIndex: 'CDEPART'},
        //                                    {text: 'Dest', width: 70, dataIndex: 'CARRIVA'},
        //                                    {text: 'RBD', width: 50, dataIndex: 'CLAS'},
        //                                    {text: 'Fare <br> Basis', width: 100, dataIndex: 'FBASE'}
        //                                ]
        //                            },
        //                            {text: 'Values',
        //                                defaults: {
        //                                    menuDisabled: true,
        //                                    sortable: true,
        //                                    align: 'center'
        //                                },
        //                                columns: [
        //                                    {text: 'Value', width: 90, dataIndex: 'VCPN',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'Currency', width: 90, dataIndex: 'MDACP',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'Status <br> Accounting', width: 120, dataIndex: 'strDescFVAL',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'MXN', width: 70, dataIndex: 'VCPMX',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'Rate', width: 70, dataIndex: 'TCMUS',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'Difference', width: 70, dataIndex: 'difVakues',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'USD', width: 70, dataIndex: 'VCPUS',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    },
        //                                    {text: 'Commission', width: 70, dataIndex: 'COMISI',
        //                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //                                            metaData.style = 'text-align:right; margin-right:0px;';
        //                                            return  Ext.util.Format.number(value, '0,000');
        //                                        }
        //                                    }
        //                                ]
        //                            }
        //
        //                        ]
        //                    }
        //                },
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
                                    width: 1260,
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

