/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.SearchCouponFlightForm.Info', {
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
                width: 1490,
                height: 550,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 530,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Ticket', width: 130, dataIndex: 'strTicket',
                            listeners: {
                                    click: 'showTicket'
                                },
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = 'text-decoration:none; color:#008FE3; ';
                                return '<a href="#flown-search-coupon-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                }
                            },
                            {text: 'Type', width: 40, dataIndex: 'TDOC'},
                            {text: 'Sales',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 90, dataIndex: 'strFormatFVTA'},
                                    {text: 'Country', width: 80, dataIndex: 'PSVVTA'},
                                    {text: 'Agent', width: 80, dataIndex: 'AGTIA'}
                                ]
                            },
                            {text: 'Flight',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 90, dataIndex: 'strFormatDate'},
                                    {text: 'Number', width: 80, dataIndex: 'NFLIGHT'},
                                    {text: 'Orig', width: 80, dataIndex: 'CDEPART'},
                                    {text: 'Dest', width: 80, dataIndex: 'CARRIVA'},
                                    {text: 'Carrier', width: 80, dataIndex: 'CARR'},
                                    {text: 'Cabin', width: 80, dataIndex: 'CABI'}
                                ]
                            },
                            {text: 'Values',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Use Type', width: 70, dataIndex: 'TOPUS'},
                                    {text: 'Value', width: 80, dataIndex: 'VCPN',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right ; margin-right : 3px ';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }},
                                    {text: 'Curr.', width: 70, dataIndex: 'MDACP',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right ; margin-right : 3px ';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }},
                                    {text: 'MXN', width: 70, dataIndex: 'VCPMX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right ; margin-right : 3px ';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }},
                                    {text: 'Rate', width: 70, dataIndex: 'TCMUS',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right ; margin-right : 3px ';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }},
                                    {text: 'USD', width: 70, dataIndex: 'VCPUS',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right ; margin-right : 3px ';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }},
                                    {text: 'Com', width: 70, dataIndex: 'COMISI',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right ; margin-right : 3px ';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }}
                                ]
                            },
                            {text: 'Accounting <br> Date', width: 80, dataIndex: 'strFormatDate2'},
                            


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
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1560,
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

