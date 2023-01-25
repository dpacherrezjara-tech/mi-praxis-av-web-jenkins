/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormSabreEstatus', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormSabreEstatus',

    controller: 'FormSabreEstatusController',

    requires: [
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormSabreEstatusController'
    ],

    title: 'DETAIL COUPONS',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 400,
    width: 600,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idSabreEstatus + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idSabreEstatus + '-txtNumber',
                            fieldLabel: 'RFND Number',
                            labelWidth: 95,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idSabreEstatus + '-txtSNumber',
                            fieldLabel: 'TKT Number',
                            labelWidth: 80,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            id: prototype.idSabreEstatus + '-btnprocessing',
                            iconCls: 'prx-icon-processing',
                            tooltip: 'Process sabre status',
                            listeners:{
                                click: 'onSabreStatusClick'
                            }
                        }
                    ]
                },{
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idSabreEstatus + '-txtAplidate',
                            fieldLabel: 'Application date',
                            labelWidth: 95,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idSabreEstatus + '-txtcpnsRFND',
                            fieldLabel: 'CNPS',
                            labelWidth: 80,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        }
                    ]
                }, {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idSabreEstatus + '-gridDataStatus',
                            //title: 'RELATED TICTES',
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {
                                        text: 'Ticket',
                                        dataIndex: 'A3908TKT',
                                        width: 80
                                    },
                                    {
                                        text: 'Cupon',
                                        dataIndex: 'A3908CPN',
                                        width: 80
                                    },
                                    {
                                        text: 'Code',
                                        dataIndex: 'A3908CODE',
                                        width: 75
                                    },
                                    {
                                        text: 'Previous <br> status',
                                        dataIndex: 'A3908STINI',
                                        width: 90
                                    },
                                    {
                                        text: 'Current <br> status',
                                        dataIndex: 'A3908STFIN',
                                        width: 90
                                    },
                                    {
                                        text: 'Date',
                                        dataIndex: 'A3908FCAMB',
                                        width: 70
                                    },
                                    {
                                        text: 'Hour',
                                        dataIndex: 'A3908HCAMB',
                                        width: 70
                                    },
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 300,
                            flex: 1,
                            listeners: {
                                afterrender: 'OnLoadGridAfterrender'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
