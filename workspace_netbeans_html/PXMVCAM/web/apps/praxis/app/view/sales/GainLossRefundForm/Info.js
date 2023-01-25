/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.GainLossRefundForm.Info', {
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
            width: 1240,
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
                    width: 1240,
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
                            {text: 'Processing <br> Date', dataIndex: 'A1530FPROC', width: 80},
                            {text: 'Group', dataIndex: 'A1530GRUPO', width: 80},
                            {text: 'Source', dataIndex: 'A1530FUENT', width: 80},
                            {text: 'Country', dataIndex: 'A1530PSVTA', width: 80},
                            {text: 'Company', dataIndex: 'A713CIA', width: 80},
                            {text: 'Form', dataIndex: 'A713FORMA', width: 80},
                            {text: 'Serie', dataIndex: 'A713SERIE', width: 80},
                            {text: 'Coupon', dataIndex: 'A713_CUPON', width: 80},
                            {text: 'IATA', dataIndex: 'A713AGENTE', width: 80},
                            {text: 'Isuue Date', dataIndex: 'A713FECVTA', width: 80},
                            {text: 'FoP', dataIndex: 'A1731_CFOP', width: 80},
                            {text: 'Curr', dataIndex: 'A713MDARV', width: 60},
                            {text: 'Refund Amount', dataIndex: 'A713_VALOR', xtype: 'numbercolumn', format: '0,000.00', width: 100,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Sales Amount', dataIndex: 'A720_VALOR', xtype: 'numbercolumn', format: '0,000.00', width: 100,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Gain/Loss', dataIndex: 'GAIN_LOSS', xtype: 'numbercolumn', format: '0,000.00', width: 100,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
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
                            width: 1240,
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

