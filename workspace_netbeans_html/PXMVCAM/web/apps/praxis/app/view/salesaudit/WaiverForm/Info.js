/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.Info', {
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
            //width: 1550,
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
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 550,
                                    width: 1300,
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
                                            {text: 'Ticket', width: 100, dataIndex: 'A2537TIKET', renderer: 'getText'},
                                            {text: 'Country', width: 80, dataIndex: 'A2537CNTRY'},
                                            {text: 'Request <br> Date', width: 80, dataIndex: 'A2537DSOLI'},
                                            {text: 'Action <br> Waiver', width: 100, dataIndex: 'A2537ACTW',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537ACTW'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Refund <br> Date', width: 80, dataIndex: 'A2537DRFND'},
                                            {text: 'Emission <br> Date', width: 80, dataIndex: 'A2537DEMI'},
                                            {text: 'Flown <br> Date', width: 80, dataIndex: 'A2537DVOL'},
                                            {text: 'System <br> Date', width: 80, dataIndex: 'A2537FINGR'},
                                            {text: 'Agency', width: 90, dataIndex: 'A2537IATA'},
                                            {text: 'Name <br> Agency', width: 100, dataIndex: 'A2537NAGEN',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537NAGEN'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', width: 100, dataIndex: 'A2537AGENT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537AGENT'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Tour<br>Code', width: 100, dataIndex: 'A2537TCODE',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537TCODE'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Route', width: 100, dataIndex: 'A2537RUTA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537RUTA'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Pax', width: 100, dataIndex: 'A2537NPAX',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537RUTA'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'N° Pax', width: 80, dataIndex: 'A2537NUPAX'},
                                            {text: 'Class', width: 90, dataIndex: 'A2537CLASE',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537CLASE'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Pnr', width: 80, dataIndex: 'A2537PNR'},
                                            {text: 'Code Waiver', width: 80, dataIndex: 'A2537CWAIV'},
                                            {text: 'Rate Appli.', width: 80, dataIndex: 'A2537FAPP'},
                                            {text: 'Curr Appli.', width: 80, dataIndex: 'A2537MAPP'},
                                            {text: 'Rate Pay.', width: 80, dataIndex: 'A2537TPAY'},
                                            {text: 'Curr Pay.', width: 80, dataIndex: 'A2537MPAY'},
                                            {text: 'Rate Reb.', width: 80, dataIndex: 'A2537FREB'},
                                            {text: 'Cur Reb.', width: 80, dataIndex: 'A2537MREB'},
                                            {text: 'Appli. Sale', width: 80, dataIndex: 'A2537APPS'},
                                            {text: 'Appli. Rfnd', width: 80, dataIndex: 'A2537APPR'},
                                            {text: 'Appli. Exch', width: 80, dataIndex: 'A2537APPE'},
                                            {text: 'Description', width: 90, dataIndex: 'A2537DESC',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var tool = record.data['A2537DESC'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: '', width: 80, dataIndex: '',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#salesaudit-waiver-form" style="color:#008FE3;">' + "Download" + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onDownloadFile'
                                                }
                                            },
                                            {
                                                sortable: false,
                                                width: 60,
                                                text: 'Status',
                                                align: 'center',
                                                renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    if (Number(data.A2537STAT) === 0) {
                                                        return '<img src="resources/img/semaforo/Circle_Green.png" width="12px"/>';
                                                    } else {
                                                        return '<img src="resources/img/semaforo/Circle_Red.png" width="12px"/>';
                                                    }

                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                text: 'Edit',
                                                width: 40,
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

                            ]
                        }

                    ]
                },
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
                            id: prototype.id + '-panelPie',
                            width: 1300,
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

