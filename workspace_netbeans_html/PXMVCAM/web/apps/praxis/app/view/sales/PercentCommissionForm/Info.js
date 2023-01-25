/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.PercentCommissionForm.Info', {
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
            width: 1870,
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
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 550,
                    width: 1850,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'IATA', width: 70, dataIndex: 'A2448IATA'},
                            {text: 'IATA Name', width: 140, dataIndex: 'A003KEY3'},
                            {text: 'Cod. <br> Agre', width: 60, dataIndex: 'A2448CODEA'},
                            {text: 'Description', width: 160, dataIndex: 'A2448DESCR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:4px;';
                                    return value;
                                }
                            },
                            {text: '% Comm.', width: 70, dataIndex: 'A2448COMM',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.0000');
                                }
                            },
                            {
                                text: 'Applicable',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Emmission <br>Form', dataIndex: 'A2448FORMA', width: 80},
                                    {text: 'TNR', dataIndex: 'A2448TRNCU', width: 140},
                                    {text: 'Marketing', dataIndex: 'A2448MCARR', width: 70},
                                    {text: 'Type <br>Pax.', dataIndex: 'A2448TPASS', width: 60},
                                    {text: 'Tour <br> Code', dataIndex: 'A2448TOUR', width: 60},
                                    {text: 'Farebasis', dataIndex: 'A2448FBASI', width: 100},
                                    {text: 'Ticket Designator', dataIndex: 'A2448TDESI', width: 150},
                                    {text: 'Class', dataIndex: 'A2448CLASS', width: 80},
                                    {text: 'Code', dataIndex: 'A2448CODE', width: 60},
                                    {text: 'Sub <br> Code', dataIndex: 'A2448SCODE', width: 60},
                                    {text: 'Method Of <br> Payment', dataIndex: 'A2448MOPAY', width: 80},
                                    {text: 'Ancilliaries', dataIndex: 'A2448ANCIL', width: 80}
                                ]
                            },
                            {
                                text: 'Exclude',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Class', dataIndex: 'A2448CLASX', width: 70},
                                    {text: 'Code', dataIndex: 'A2448CODEX', width: 50},
                                    {text: 'Sub Code', dataIndex: 'A2448SCODX', width: 70},
                                    {text: 'IATA', dataIndex: 'A2448IATAX', width: 70}
                                ]
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
                            width: 1850,
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

