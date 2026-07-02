prototype.id = 'CargoSendForm';
prototype.url = CONTEXTPATH + '/CargoSend';

Ext.define('Ext.Praxis.view.payments.CargoSendForm.CargoSendForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CargoSendForm',
    requires: [
        'Ext.Praxis.view.payments.CargoSendForm.Options',
        'Ext.Praxis.view.payments.CargoSendForm.Filters',
        'Ext.Praxis.view.payments.CargoSendForm.Info',
        'Ext.Praxis.view.payments.CargoSendForm.DataEntryCargoSend',
        'Ext.Praxis.view.payments.CargoSendForm.DataEntryEditCargoSend',
        'Ext.Praxis.controller.payments.CargoSend.CargoSendController'
    ],
    controller: 'CargoSendController',
    layout: {type: 'fit'},
    padding: '0 0 0 0',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 1000,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1500,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options',
                                            style:'margin-top:10px'
                                        }
                                        ,{
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter',
                                            hidden: false
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 630,
                                            layout: 'fit',
                                             id: prototype.id + '-panelHeight',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                   ]
                                }
                            ]
                            
                        }
                    ]
                }
            ]
        }
    ]
});