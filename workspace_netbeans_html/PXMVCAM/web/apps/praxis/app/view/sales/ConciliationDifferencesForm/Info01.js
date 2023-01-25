/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ConciliationDifferencesForm.Info01', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id01 + '-info',
    //layout: 'border',
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
            id: prototype.id01 + '-regionCenterGrid01',
            width: 1570,
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
                    xtype: 'grid',
                    padding: '5 0 0 5',
                    id: prototype.id01 + '-gridData',
                    height: 300,
                    width: '99%',
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
                            {text: 'Processing<br>Date', width: 80, dataIndex: 'PROCESSING_DATE', locked: true},
                            {text: 'Open<br>Date', width: 70, dataIndex: 'OPEN_DATE', locked: true},
                            {text: 'Grupo', width: 70, dataIndex: 'GRUPO', locked: true},
                            {text: 'Curr.', width: 70, dataIndex: 'MDA_LOCAL', locked: true},
                            {text: 'Country', width: 70, dataIndex: 'PAIS', locked: true},
                            {text: 'Fuente', width: 70, dataIndex: 'FUENTE', locked: true},
                            {text: 'IATA', width: 80, dataIndex: 'IATA'},
                            {text: 'Ticket', width: 110, dataIndex: 'TICKET'},
                            {text: 'TRNC', width: 60, dataIndex: 'TRNC'},
                            {text: 'Concepto', width: 80, dataIndex: 'CONCEPTO'},
                            {text: 'Código1', width: 60, dataIndex: 'CODIGO1'},
                            {text: 'Importe1', width: 80, dataIndex: 'IMPORTE1_LOC',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Código2', width: 60, dataIndex: 'CODIGO2'},
                            {text: 'Importe2', width: 80, dataIndex: 'IMPORTE2_LOC',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Descripcion Diff.', width: 290, dataIndex: 'DESCRIPCION'},
                            {text: 'Cód. Diff', width: 80, dataIndex: 'COD_DESC'}                            
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    id: prototype.id01 + '-pie',
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
                            width: '100%',
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
                                    id: prototype.id01 + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id01 + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id01 + '-lbl-total',
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
}
);

