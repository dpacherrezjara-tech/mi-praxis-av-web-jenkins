prototype.DeliveryOrig = {
    id: 'CtrlDeliveryOrigForm'
};

Ext.define('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlDeliveryOrigForm',
    requires: [
        'Ext.Praxis.controller.screens.CtrlDeliveryOrigController'
    ],
    controller: 'CtrlDeliveryOrigController',
    title: 'Delivery Information',
    header: true,
    width: 1180,
    height: 428,
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
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 380,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.DeliveryOrig.id+'-idDelivery',
                            layout: {
                                type:'card',
                                hideInactive:false
                            },
                            width: 1140,
                            height: 260,
                            border: false,
                            bodyStyle: 'background: transparent',
//                            bodyStyle: "background-image:url(resources/img/icon/999x999/VOID_03_r1_c1.png) !important;background-repeat: no-repeat;background-position: center;",
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textarea',
                                    width: '100%',
                                    height: '100%',
                                    id: prototype.DeliveryOrig.id+'-txtTexto',
                                    fieldStyle: 'overflow:scroll; overflow-wrap: normal; white-space:pre; letter-spacing:0.8px; line-height:19.9px; background-color:transparent;text-align:left; color:#2D476A; font-size:11px; font-family:"Courier New";',
                                    margin: '5',
                                    inputAttrTpl: [
                                        'spellcheck=false'//quitar la autocorreccion (subrayado en rojo)
                                    ]//,
                                    //value: "BKS00442015 24 1709290000001398217860023  5                FVVV                               SALEMEX  YYZ          GELGQI       HUX408"
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'hbox',
                            border: false,
                            margin: '5 0',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%',
                                style: 'font-size:13px;'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Legend:'
                                },
                                {
                                    xtype: 'label',
                                    text: '{=0 A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9 '
                                },
                                {
                                    xtype: 'label',
                                    text: '}=0- J=1- K=2- L=3- M=4- N=5- O=6- P=7- Q=8- R=9- '
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            id: prototype.DeliveryOrig.id+'-test',
            dock: 'bottom',
            ui: 'footer',
            style: 'border-top: 2px #c4cccc solid;border-bottom: 2px #c4cccc solid',
            margin: '20 0',
            padding: '8 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                padding: '3 0',
                margin: '8 0'
            },
            items: [
                {
                    text: '<strong style="color:black;font-size:13px;">View</strong>',
                    id: prototype.DeliveryOrig.id+'-btnView',
                    hidden: true,
                    scale: 'small',
                    width: 90,
                    listeners: {
                        click: 'btnView_clickHandler'
                    }
                },
                {xtype: 'tbspacer', width: 10},
                {
                    text: '<strong style="color:black;font-size:13px;">Close</strong>',
                    id: prototype.DeliveryOrig.id+'-btnClose',
                    scale: 'small',
                    width: 90,
                    listeners: {
                        click: 'btnClose_clickHandler'
                    }
                }
            ]
        }
    ]
});