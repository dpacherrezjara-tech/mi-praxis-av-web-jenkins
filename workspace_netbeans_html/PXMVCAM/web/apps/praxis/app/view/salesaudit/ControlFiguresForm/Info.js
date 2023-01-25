/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.salesaudit.ControlFiguresForm.Info', {
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
                                    width: 1692,
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
                                            {text: 'Processing <br>Date', width: 90, dataIndex: 'FECPRO'},
                                            {text: 'System Date', width: 90, dataIndex: 'FECSYS'},
                                            {text: 'Accounting <br>Date', width: 90, dataIndex: 'FECPRO'},
                                            {text: 'Tickets QTY',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Memo', width: 80, dataIndex: 'QTYSAMEMO', renderer: 'getInt'},
                                                    {text: 'Praxis', width: 80, dataIndex: 'QTYPXFA', renderer: 'getInt'},
                                                    {text: 'Sales Audit',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Processed', width: 80, dataIndex: 'QTYSAFAPR', renderer: 'getInt'},
                                                            {text: 'Void', width: 70, dataIndex: 'QTYSAFAVO', renderer: 'getInt'},
                                                            {text: 'Exonerated(*)', width: 90, dataIndex: 'QTYSAFAEX', renderer: 'getInt'}
                                                        ]
                                                    },
                                                    {text: 'Difference', width: 80, dataIndex: 'DIFFARE', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Tax QTY',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Praxis', width: 80, dataIndex: 'QTYPXTX', renderer: 'getInt'},
                                                    {text: 'Sales Audit<br>Processed', width: 80, dataIndex: 'QTYSATX', renderer: 'getInt'},
                                                    {text: 'Difference', width: 80, dataIndex: 'DIFTAX', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Comm QTY',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Praxis', width: 80, dataIndex: 'QTYPXCM', renderer: 'getInt'},
                                                    {text: 'Sales Audit<br>Processed', width: 80, dataIndex: 'QTYSACM', renderer: 'getInt'},
                                                    {text: 'Difference', width: 80, dataIndex: 'DIFCOMM', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Tax On Comm QTY',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Praxis', width: 80, dataIndex: 'QTYPXSC', renderer: 'getInt'},
                                                    {text: 'Sales Audit<br>Processed', width: 80, dataIndex: 'QTYSASC', renderer: 'getInt'},
                                                    {text: 'Difference', width: 80, dataIndex: 'DIFTAXC', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Formatting <br> Status', width: 100, dataIndex: 'FLAGF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var background = record.data['FLAGF'] === '1' ? '99FFCC' : record.data['FLAGF'] === '2' ? 'FF0000' : 'FBD705';
                                                    var texto = record.data['FLAGF'] === '0' ? 'Pending' : record.data['FLAGF'] === '1' ? 'Ok' : record.data['FLAGF'] === 'X' ? 'Processing' : 'Error';
                                                    metaData.style = 'background:#' + background + ';';
                                                    return texto;
                                                }
                                            },
                                            {text: 'Audit Process <br> Status', width: 100, dataIndex: 'FLAGD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var background = record.data['FLAGD'] === '1' ? '99FFCC' : record.data['FLAGF'] === '2' ? 'FF0000' : 'FBD705';
                                                    var texto = record.data['FLAGD'] === '0' ? 'Pending' : record.data['FLAGF'] === '1' ? 'Ok' : record.data['FLAGF'] === 'X' ? 'Processing' : 'Error';
                                                    metaData.style = 'background:#' + background + ';';
                                                    return texto;
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '0',
                                    margin: '0',
                                    width: 1672,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            grow: true,
                                            anchor: '100%',
                                            id: prototype.id + '-txaReference',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '',
                                            width: 580,
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '0'

                                        }
                                    ]
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
                            width: 1672,
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

