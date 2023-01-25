/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.tnu.AtlUsageNoSale.GridData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-gridData',
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
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-grid',
                    columnLines: true,
                    autoScroll: true,
                    height: prototype.heightGridData,
                    width: '99%',
                    columns: {
                        items: [
                            {
                                text: 'Code IATA',
                                dataIndex: 'A1544IATA',
                                width: 80,
                                align: 'left'
                            },
                            {
                                text: 'Agent Name',
                                dataIndex: 'A1544AGENT',
                                width: 220,
                                align: 'left'
                            },
                            {
                                text: 'Usage',
                                dataIndex: 'A1544TUSO',
                                width: 80,
                                align: 'left'
                            },
                            {
                                text: 'Date of usage',
                                dataIndex: 'A1544FUSO',
                                width: 100,
                                align: 'left'
                            }, {
                                text: 'Ticket',
                                dataIndex: 'A1544TICKT',
                                width: 100,
                                align: 'left'
                            }, {
                                text: 'Coupon',
                                dataIndex: 'A1544CUPON',
                                width: 60,
                                align: 'center'
                            }, {
                                text: 'From',
                                dataIndex: 'A1544DESDE',
                                width: 60,
                                align: 'center'
                            }, {
                                text: 'To',
                                dataIndex: 'A1544HACIA',
                                width: 60,
                                align: 'center'
                            }, {
                                text: 'Flight',
                                dataIndex: 'A1544NVUSO',
                                width: 80,
                                align: 'center'
                            }, {
                                text: 'Carrier',
                                dataIndex: 'A1544TRUSO',
                                width: 60,
                                align: 'center'
                            },
                            {
                                text: 'Fare Basis',
                                dataIndex: 'A1544FBAS',
                                width: 100
                            },
                            {
                                text: 'Amount',
                                dataIndex: 'A1544TARIF',
                                width: 80,
                                align: 'right',
                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: 'Curr.',
                                dataIndex: 'A1544MDATF',
                                width: 70,
                                align: 'center'
                            },
                            {
                                text: 'D.Regularization',
                                dataIndex: 'A1544FCONT',
                                width: 100
                            }

                        ]
                    },
                    listeners: {
                        select: function(obj, record, index, eOpts) {
                        }
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: false,
                        markDirty: false,
                        getRowClass: function(record, rowIndex, rowParams, store) {
                            if (rowIndex % 2 === 0)
                                return 'rowA';
                        }
                    },
                    trackMouseOver: true                    
                }
                ,
                /* 
                 * Etiquetas para informacion de paginacion
                 * 
                 */
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

