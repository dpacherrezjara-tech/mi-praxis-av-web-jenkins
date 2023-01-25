/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CouponsErrorForm.Info', {
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
                width: 1240,
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
                            {text: 'Ticket', width: 130, dataIndex: 'strTicket'},
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
                                    {text: 'Departure', width: 80, dataIndex: 'CDEPART',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescCDEPART'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Arrival', width: 80, dataIndex: 'CARRIVA',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescCARRIVA'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
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
                                    {text: 'Agent', width: 80, dataIndex: 'AGTIA',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescPSVVTA'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Coupon',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Carrier', width: 60, dataIndex: 'CARR'},
                                    {text: 'Cabin', width: 60, dataIndex: 'CABI'},
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
                                        }}
                                ]
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 50,
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

