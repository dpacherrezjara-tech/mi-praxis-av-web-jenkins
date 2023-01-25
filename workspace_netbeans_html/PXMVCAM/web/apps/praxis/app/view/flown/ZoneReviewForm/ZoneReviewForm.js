/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



prototype.id = 'ZoneReviewForm';
prototype.url = CONTEXTPATH + '/ZoneReview';
anioAnterior2='20182';

Ext.define('Ext.Praxis.view.flown.ZoneReviewForm.ZoneReviewForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ZoneReviewForm',
    requires: [
        'Ext.Praxis.view.flown.ZoneReviewForm.Options',
        'Ext.Praxis.view.flown.ZoneReviewForm.Filters',
        'Ext.Praxis.view.flown.ZoneReviewForm.Info',
        'Ext.Praxis.view.flown.ZoneReviewForm.InfoOAL',
        'Ext.Praxis.controller.flown.ZoneReview.ZoneReviewController'
    ],
    controller: 'ZoneReviewController',
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
//                          width: 900,
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
                                        width: 1600,
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
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            id:prototype.id+'-panelPrincipal',
                                           height: 800,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
                                                           
                                                        },
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-infoOAL',
                                                            id: prototype.id + '-contentInfoOAL'
                                                            
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



