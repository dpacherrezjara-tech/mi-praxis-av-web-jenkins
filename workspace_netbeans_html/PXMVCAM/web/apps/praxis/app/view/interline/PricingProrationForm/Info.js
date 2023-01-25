/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.interline.PricingProrationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
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
            id: prototype.id+'-regionCenterGrid01',
            //width: 1550,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id+'-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxMainData',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
//                            width: '100%',    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223;background-color: #E3EAEF;',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                //<editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridData',
                                    padding: '20 0 0 0',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 992,
                                    columnLines: true,
                                    features: [{
                                        ftype: 'summary'
//                                        dock: 'bottom',
//                                        showSummaryRow: true
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Clearing <br>Date', id: prototype.id + '-labelDate', /*width: 80,*/ dataIndex: 'strFormatDate', flex: 1},
                                            {text: 'Airline', width: 70, dataIndex: 'A050AIRLI3'},
                                            {text: 'Group <br>Number', width: 75, dataIndex: 'A050GRUPO',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-pricing-proration-form" style="color:#008FE3;text-decoration:none;font-weight:bold;">'+value+'</a>';
                                                },
                                                listeners: {
                                                    click: 'viewGrupo_clickHandler'
                                                }
                                            },
                                            {text: 'Source', width: 60, dataIndex: 'TUSO'},
                                            {text: 'Status', width: 80, dataIndex: 'strEstado'},
                                            {text: 'Qty Cpn', width: 60, dataIndex: 'QCUPON', renderer: 'getInt',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQTY, '0,000');
                                                }
                                            },
                                            {text: 'Gross', width: 100, dataIndex: 'A050ACEPTA', renderer: 'getDouble',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totA050ACEPTA, '0,000.00');
                                                }
                                            },
                                            {text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'ISC', width: 100, dataIndex: 'A050COMISI', renderer: 'getIntColor',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totA050COMISI, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'CSC', width: 100, dataIndex: 'A050OVRAMT', renderer: 'getIntColor',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totA050OVRAMT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'TAX', width: 100, dataIndex: 'A050TUA', renderer: 'getDouble',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totA050TUA, '0,000.00');
                                                }
                                            },
                                            {text: 'Neto', width: 100, dataIndex: 'A050NETO', renderer: 'getDouble',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totA050NETO, '0,000.00');
                                                }
                                            }

                                        ]
                                    }
                                },
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxRepDate',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
//                            width: '100%',   
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridRepDate">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridRepDate',
                                    padding: '20 0 0 0',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 557,
                                    height: 595,
                                    columnLines: true,
                                    features: [{
                                        ftype: 'summary',
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'A050FUSO'}
                                                ]
                                            },
                                            {text: 'Group',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Range', width: 120, dataIndex: 'strDescripcion'}
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cpn', width: 80, dataIndex: 'QTY',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepDate').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTY, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Match Flown',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Yes', width: 70, dataIndex: 'QMATCH',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepDate').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQMATCH, '0,000');
                                                        }
                                                    },
                                                    {text: 'No', width: 70, dataIndex: 'QNMATCH', renderer: 'getIntColor',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepDate').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQNMATCH, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Audited', width: 75, dataIndex: 'QAUDIT',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepDate').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQAUDIT, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Close',
                                                id: prototype.id+'-dgcCloseDay',
                                                align: 'center',
                                                items: [
                                                    {
                                                        icon: 'resources/img/botones/16x16/Change.png',
                                                        tooltip: 'Close',
                                                        handler: 'closeDayISR_clickHandler'
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
                            xtype: 'panel',
                            id: prototype.id + '-boxRepUnMatch',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
//                            width: '100%',   
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridRepUnMatch">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridRepUnMatch',
                                    padding: '20 0 0 0',
                                    bodyStyle: 'background-color: #E3EAEF;',
//                                    width: 657,
                                    width: 670,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
//                                        dock: 'bottom',
//                                        showSummaryRow: true
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'A050FUSO'}
                                                ]
                                            },
                                            {text: 'Group',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Range', width: 120, dataIndex: 'strDescripcion'}
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cpn', width: 80, dataIndex: 'QTY',
                                                     listeners: {
                                                        click: 'viewDetailUMTkt_clickHandler'
                                                    },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#interline-pricing-proration-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepUnMatch').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTY, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Match Flown',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Yes', width: 70, dataIndex: 'QMATCH',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepUnMatch').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQMATCH, '0,000');
                                                        }
                                                    },
                                                    {text: 'No', width: 70, dataIndex: 'QNMATCH', renderer: 'getIntColor',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepUnMatch').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQNMATCH, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Match Exchange',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Yes', width: 70, dataIndex: 'QMATCH730',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepUnMatch').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQMATCH730, '0,000');
                                                        }
                                                    },
                                                    {text: 'No', width: 70, dataIndex: 'QNMATCH730', renderer: 'getIntColor',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepUnMatch').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQNMATCH730, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Audited', width: 75, dataIndex: 'QAUDIT',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridRepUnMatch').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQAUDIT, '0,000');
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
                            xtype: 'panel',
                            id: prototype.id+'-boxRepUMTkt',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            height: 590,
//                            width: '100%',    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridDataRepUMTkt">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridDataRepUMTkt',
                                    titleAlign: 'center',
                                    padding: '20 0 0 0',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 585,
                                    width: 1089,
                                    columnLines: true,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Nbr', width: 40, dataIndex: 'RN'},
                                            {text: 'Group',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 85, dataIndex: 'A050GRUPO'}
                                                ]
                                            },
                                            {text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 130, dataIndex: 'strTicket'}
                                                ]
                                            },
                                            {text: 'Flight <br>Date', width: 95, dataIndex: 'strFormatDate1'},
                                            {text: 'Fare',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Basis', width: 100, dataIndex: 'A050BASE'}
                                                ]
                                            },
                                            {text: 'Sector', width: 80, dataIndex: 'strDescripcion'},
                                            {text: 'Carrier', width: 55, dataIndex: 'A050TRANSP'},
                                            {text: 'Class', width: 45, dataIndex: 'A050CLASE'},
                                            {text: 'Gross', width: 70, dataIndex: 'A050ACEPTA'},
                                            {text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'ISC', width: 90, dataIndex: 'A050COMISI', renderer: 'getIntColor'},
                                                    {text: 'CSC', width: 90, dataIndex: 'A050OVRAMT', renderer: 'getIntColor'}
                                                ]
                                            },
                                            {text: 'TAX', width: 60, dataIndex: 'A050TUA', renderer: 'getDouble'},
                                            {text: 'Neto', width: 70, dataIndex: 'A050NETO', renderer: 'getDouble'},
                                            {text: 'Flown', width: 65, dataIndex: 'strDescripcion2'}
                                        ]
                                    }
                                },
                                //</editor-fold>
                                
                            ]
                        },
                        
                        
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id+'-pie',
//                    hidden: true,
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
                            id: prototype.id+'-panelPie',
                            width: 992,
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
                                    id: prototype.id+'-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id+'-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id+'-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ]
}
);

