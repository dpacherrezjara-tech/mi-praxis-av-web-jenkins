/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'EstimationReverseProcessForm';
prototype.url = CONTEXTPATH + '/EstimationReverseProcess';

Ext.define('Ext.Praxis.view.flown.EstimationReverseProcessForm.EstimationReverseProcessForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EstimationReverseProcessForm',
    requires: [
        'Ext.Praxis.view.flown.EstimationReverseProcessForm.Info',
        'Ext.Praxis.controller.flown.EstimationReverseProcess.EstimationReverseProcessController'
    ],
    controller: 'EstimationReverseProcessController',
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
                            border: false,
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
                                        width: 1130,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 650,
                                            layout: 'fit',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    margin: '30 0 0 0',
                                                    border: false,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo',
                                                            border: false
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



