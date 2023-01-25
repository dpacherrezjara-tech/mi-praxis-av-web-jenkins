
prototype.id = 'TaxesByCodeForm';
prototype.url = CONTEXTPATH + '/TaxesByCode';

Ext.define('Ext.Praxis.view.salesaudit.TaxesByCodeForm.TaxesByCodeForm', {
    extend: 'Ext.form.Panel',
    //extend: 'Ext.window.Window',
    alias: 'widget.TaxesByCodeForm',
    requires: [
        'Ext.Praxis.view.widgets.ttbs',
        'Ext.Praxis.controller.salesaudit.TaxesByCodeForm.TaxesByCodeController'
    ],
    controller: 'TaxesByCodeController',
    layout: {
        type: 'fit'
    },
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
                            layout: 'border',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-det-TTBS',
                            //title: 'TTBS',
                            items: [
                                {
                                    //xtype: 'panel',
                                    region: 'center',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        align: 'center'
                                    },
                                    id: prototype.id + '-contenedor-form',
                                    width: 1305,
                                    height: 750,
                                    items: [
                                        {
                                            xtype: 'ttbs',
                                            id: prototype.id + '-widget-ttbs'
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