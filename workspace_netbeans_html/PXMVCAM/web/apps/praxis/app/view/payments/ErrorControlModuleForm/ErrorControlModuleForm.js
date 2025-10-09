
prototype.id = 'ErrorControlModuleForm';
prototype.url = CONTEXTPATH + '/ErrorControlModule';

Ext.define('Ext.Praxis.view.payments.ErrorControlModuleForm.ErrorControlModuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ErrorControlModuleForm',
    requires: [
        'Ext.Praxis.view.payments.ErrorControlModuleForm.Options',
        'Ext.Praxis.view.payments.ErrorControlModuleForm.Filters',
        'Ext.Praxis.view.payments.ErrorControlModuleForm.Info',
        'Ext.Praxis.controller.payments.ErrorControlModule.ErrorControlModuleController'
    ],
    controller: 'ErrorControlModuleController',
    layout: {type: 'fit'},
    border: false,
    defaults: {
        border: false
    },
     items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            bodyCls: 'colorFondo',
            layout: 'fit',
            items: [
                {
                    id: prototype.id +'-form',
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
                            id: prototype.id + '-panelPrincipal',
                            hidden: false,
//                            width: 980,
                            width: 1880,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id +'-center',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1700,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype:prototype.id + '-options'
                                        },
                                        {
                                            xtype:prototype.id+ '-filters',
                                            id: prototype.id+'-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 620,
                                            width: 1700,
                                            bodyStyle: 'background-color: #E3EAEF;border: none;',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 1650,
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







