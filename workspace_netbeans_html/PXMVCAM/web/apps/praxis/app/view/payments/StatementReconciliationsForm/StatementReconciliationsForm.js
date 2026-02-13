
prototype.id = 'StatementReconciliationsForm';
prototype.url = CONTEXTPATH + '/StatementReconciliations';

Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.StatementReconciliationsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.StatementReconciliationsForm',
    requires: [
        'Ext.Praxis.view.payments.StatementReconciliationsForm.Options',
        'Ext.Praxis.view.payments.StatementReconciliationsForm.Filters',
        'Ext.Praxis.view.payments.StatementReconciliationsForm.Info',
        'Ext.Praxis.controller.payments.StatementReconciliations.StatementReconciliationsController'
    ],
    controller: 'StatementReconciliationsController',
    layout: {
        type: 'fit'
    },
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
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 980,
                            layout: 'border',
                            
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 650,
                                            width: 1800,
                                            bodyStyle: 'background-color: #E3EAEF;border: none;',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1800,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background-color: white;',
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




