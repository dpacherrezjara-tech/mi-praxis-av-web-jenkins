
prototype.id = 'ControlBsplinkProcessForm';
prototype.url = CONTEXTPATH + '/ControlBsplinkProcess';

Ext.define('Ext.Praxis.view.refund.ControlBsplinkProcessForm.ControlBsplinkProcessForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ControlBsplinkProcessForm',
    requires: [
        'Ext.Praxis.view.refund.ControlBsplinkProcessForm.Options',
        'Ext.Praxis.view.refund.ControlBsplinkProcessForm.Filters',
        'Ext.Praxis.view.refund.ControlBsplinkProcessForm.Info',
        'Ext.Praxis.controller.refund.ControlBsplinkProcess.ControlBsplinkProcessController'
    ],
    controller: 'ControlBsplinkProcessController',
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
                            width: 980,
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
                                        width: 1350,
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
                                            height: 650,
                                            width: 1350,
                                            bodyStyle: 'background-color: #E3EAEF;border: none;',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 1350,
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







