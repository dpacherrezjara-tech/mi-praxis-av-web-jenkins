/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.salesaudit.ServiceChargePenaltyForm.Info', {
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
                                    width: 1052,
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
                                            {text: 'Transaction', width: 90, dataIndex: 'A2252TRNCU',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Curr', width: 40, dataIndex: 'A2252MDA'},
                                            {text: 'Percent/ <br>Amount', width: 90, dataIndex: 'A2252VALOR', renderer: 'getDouble'},
                                            {text: 'Date From/ <br>effective', width: 90, dataIndex: 'A2252DATEF'},
                                            {text: 'Date To/ <br>effective', width: 90, dataIndex: 'A2252DATET'},
                                            {text: 'Description', width: 90, dataIndex: 'A2252DESCR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['A2252DESCR'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {text: 'Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'User <br>Created', width: 80, dataIndex: 'A2252REGIS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Date', width: 80, dataIndex: 'A2252FREGI'},
                                                    {text: 'Time', width: 80, dataIndex: 'A2252HREGI'},
                                                    {text: 'User<br>Modified', width: 80, dataIndex: 'A2252REVIS'},
                                                    {text: 'Date', width: 80, dataIndex: 'A2252FREVI'},
                                                    {text: 'Time', width: 80, dataIndex: 'A2252HREVI'}
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                width: 40,
                                                align: 'center',
                                                renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    if (Number(data.A2252FLAG) === 0) {
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
                                            },
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
                            width: 972,
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

