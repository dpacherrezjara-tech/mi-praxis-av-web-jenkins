/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.LogCouponsUpdateForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1368,
                height: 550,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 550,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 40, dataIndex: 'RN'},
                            {text: 'Cia', width: 50, dataIndex: 'A2865CIA'},
                            {text: 'Form', width: 50, dataIndex: 'A2865FORMA'},
                            {text: 'Serie', width: 80, dataIndex: 'A2865SERIE'},
                            {text: 'Coupon', width: 80, dataIndex: 'CUPON'},
                            {text: 'Seq', width: 45, dataIndex: 'A2865SEQ'},
                            {text: 'Proces <br> Date', width: 70, dataIndex: 'A2865FPROC'},
                            {text: 'User', width: 80, dataIndex: 'A2865REGIS'},
                            {text: 'Fec. Regis', width: 90, dataIndex: 'A2865FREGI'},
                            {text: 'Time Regis', width: 90, dataIndex: 'A2865HREGI'},
                            {text: 'Sales',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'Val.', width: 80, dataIndex: 'VALOLD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Com.', width: 80, dataIndex: 'COMOLD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'Flown',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'Val.', width: 70, dataIndex: 'VALFLO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Com.', width: 70, dataIndex: 'COMFLO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Status <br> Valoration', width: 80, dataIndex: 'STVAL'},
                                    {text: 'Value <br> Date', width: 80, dataIndex: 'FECVAL'},
                                    {text: 'Accounting <br> Date', width: 80, dataIndex: 'FCONT'},
                                    {text: 'Id. <br> cont', width: 150, dataIndex: 'IDCON'}
                                ]
                            }

                        ]
                    }
                }
                ,
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
                        padding: '0px 0px 0px 0px'
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1368,
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

