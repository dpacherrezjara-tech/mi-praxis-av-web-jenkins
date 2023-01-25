/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.RevenueZoneForm.DeliveryInformation', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-deliveryInformation',
    controller: prototype.id + '-DeliveryController',
    requires: [
        'Ext.Praxis.controller.flown.RevenueZone.DeliveryController'
    ],
    title: 'Delivery Information',
    header: true,
    width: 1180,
    height: 400,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-delivery-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 380,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            width: 1140,
                            height: 260,
                            id: prototype.id + 'del-txtTexto',
                            fieldStyle: 'color: #0B333C; font-size: 12px;',
                            margin: '10 10 10 10'
                        },
                        {
                            xtype: 'panel',
                            width: 1160,
                            margin: '0 10 0 10',
                            padding: '5 0 5 0',
                            style: 'border-top: 2px #c4cccc solid;border-bottom: 2px #c4cccc solid',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + 'del-btnClose',
                                    text: 'Close',
                                    listeners: {
                                        click: 'onBtnClose'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]


        }
    ]

});