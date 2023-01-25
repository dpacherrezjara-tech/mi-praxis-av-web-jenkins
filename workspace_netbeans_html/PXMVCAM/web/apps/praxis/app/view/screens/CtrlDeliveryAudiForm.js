/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.screens.CtrlDeliveryAudiForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlDeliveryAudiForm',
    controller: 'CtrlDeliveryAudiFormController',
    requires: [
        'Ext.Praxis.controller.screens.CtrlDeliveryAudiFormController'
    ],
    header: true,
    title: 'Delivery Information',
    width: 1180,
    height: 428,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    closable: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'box',
            id: prototype.id0 + '-contenido_html',
            fieldStyle: 'letter-spacing:0.8px; line-height:19.9px; background-color:transparent;text-align:left; color:#2D476A; font-size:14px; font-family:"Courier New";',
            margin: '5',
            inputAttrTpl: [
                'spellcheck=false'//quitar la autocorreccion (subrayado en rojo)
            ],

            //style: 'background-color: black; color: white; padding: 4px; fontSize:14; fontFamily:Courier New; '
        }

    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            //margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id0 + '-box',
                    layout: 'vbox',
                    border: false,
                    defaults: {
                        padding: '5px 1px 5px 1px'
                    },
                    items: [{
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                padding: '5px 1px 5px 1px'
                            },
                            items: [{
                                    xtype: 'label',
                                    id: prototype.id0 + '-label', border: false,
                                    text: 'Legend: {=0 A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9 }=0- J=1- K=2- L=3- M=4- N=5- O=6- P=7- Q=8- R=9-'
                                            //margin: '0 0 0 10'
                                }]
                        }, {
                            xtype: 'button',
                            width: 100,
                            cls: 'x-btn-sent',
                            overCls: 'x-btn-sent-over',
                            text: '<span style="color: white; font-weight: bold;">Close</span>',
                            listeners: {
                                click: 'onCancelClick'
                            }
                        }]
                }
                /*{
                 icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                 text: 'Close',
                 height: 30,
                 scale: 'medium',
                 listeners: {
                 click: 'onCancelClick'
                 }
                 }*/
            ]
        }
    ]
});
