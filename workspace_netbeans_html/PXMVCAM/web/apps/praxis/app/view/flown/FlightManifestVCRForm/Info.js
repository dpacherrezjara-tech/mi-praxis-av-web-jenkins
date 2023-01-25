/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.FlightManifestVCRForm.Info', {
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
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 550,
                    width: 600,
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
                                    return '<b>Total</b>';
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                    return '<a href="#flown-flight-manifest-vcr-form" style="color:#008FE3">' + value + '</a>';
                                }


                            },
                            {text: 'Flight <br> Number', width: 90, dataIndex: 'NFLIGHT'},
                            {text: 'Qty-VCR', width: 90, dataIndex: 'VCPN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return value;
                                }
                                ,
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    return '<b>' + Ext.util.Format.number(data.totVCPMX, '0,000') + '<b>';
                                }
                            },
                            {text: 'Qty-Manifest', width: 90, dataIndex: 'QTYPAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return value;
                                }
                                ,
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    return '<b>' + Ext.util.Format.number(data.totTAX, '0,000') + '<b>';
                                }
                            },
                            {text: 'Difference', width: 100, dataIndex: 'difVakues',
                                listeners: {
                                    click: 'onSetGridDataDetail'
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:underline; color:#008FE3; text-align :right ; margin-right : 3px ';
                                    return '<a href="#flown-flight-manifest-vcr-form" style="color:#008FE3">' + value + '</a>';
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                }
                            },
                            {text: 'Flight Manifest <br> Envelope', width: 100, dataIndex: 'pos',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return value;
                                }
                                ,
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    return '<b>' + Ext.util.Format.number(data.totCPN_Proc, '0,000') + '<b>';
                                }
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
                            width: 600,
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
            region: 'center',
            id: prototype.id + '-regionCenterGrid02',
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
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 550,
                    width: 660,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Ticket', width: 150, dataIndex: 'strTicket'},
                            {text: 'Flight',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', width: 100, dataIndex: 'strFormatDate'},
                                    {text: 'Number', width: 100, dataIndex: 'NFLIGHT'}
                                ]
                            },
                            {text: 'Orig', width: 100, dataIndex: 'CDEPART',
                                renderer: function(value, metaData, record) {
                                    var tool = record.data['strDescCDEPART'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'Status', width: 100, dataIndex: 'strDescripcion',
                                renderer: function(value, metaData, record) {
                                    metaData.style = 'text-align :left; margin-left : 3px ';
                                    return value;
                                }
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 50,
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
                }
                ,
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie2',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25, bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 600,
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

