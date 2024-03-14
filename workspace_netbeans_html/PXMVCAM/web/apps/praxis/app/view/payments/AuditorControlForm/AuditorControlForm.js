/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
prototype.id = 'AuditorControlForm';
prototype.url = CONTEXTPATH + '/AuditorControl';


Ext.define('Ext.Praxis.view.payments.AuditorControlForm.AuditorControlForm', {
    id: prototype.id,
    url: prototype.url,
    extend: 'Ext.form.Panel',
    alias: 'widget.AuditorControlForm',
    requires: [
        'Ext.Praxis.view.payments.AuditorControlForm.Filters',
        'Ext.Praxis.view.payments.AuditorControlForm.Options',
        'Ext.Praxis.view.payments.AuditorControlForm.Info',
        'Ext.Praxis.controller.payments.AuditorControl.AuditorControlController'
    ],
    controller: 'AuditorControlController',
    layout: {type: 'fit'},
    padding: '5 5 5 5',
    border: false,
    defaults: {
        border: false
    },
    init:function(){
        console.log('4-) CONTROLLER Auditor Control - INIT');
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
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
//                          width: 900,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id +'-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1380,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype:prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype:prototype.id+ '-filters',                                          
                                            id: prototype.id+'-contentFilter'
                                        },
                                        {xtype: 'tbspacer', height: 10},
                                        {
                                            xtype: 'panel',
                                            height: 700,
                                            layout: 'fit',
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
//                                       
                                        
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