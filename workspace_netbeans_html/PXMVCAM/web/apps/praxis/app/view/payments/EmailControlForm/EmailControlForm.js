
prototype.id = 'EmailControlForm';
prototype.url = CONTEXTPATH + '/EmailControl';

Ext.define('Ext.Praxis.view.payments.EmailControlForm.EmailControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EmailControlForm',
    requires: [
        'Ext.Praxis.view.payments.EmailControlForm.Options',
        'Ext.Praxis.view.payments.EmailControlForm.Filters',
        'Ext.Praxis.view.payments.EmailControlForm.Info',
        'Ext.Praxis.controller.payments.EmailControl.EmailControlController'
    ],
    controller: 'EmailControlController',
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
                            width: 1300,
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
                                        width: 1300,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype:prototype.id + '-options'
                                        },
//                                        {
//                                            xtype:prototype.id+ '-filters',
//                                            id: prototype.id+'-contentFilter'
//                                        },
                                        //GRILLA SIZE
                                        {
                                            xtype: 'panel',
                                            height: 650,
                                            width: 1300,
                                            bodyStyle: 'background-color: #E3EAEF;border: none;',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 1300,
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    margin: '0 0 0 -20',
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







