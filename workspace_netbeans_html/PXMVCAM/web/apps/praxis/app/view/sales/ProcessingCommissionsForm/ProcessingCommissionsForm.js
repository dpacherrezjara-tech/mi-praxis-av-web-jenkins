/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'ProcessingCommissionsForm';
prototype.url = CONTEXTPATH + '/ProcessingCommissions';

Ext.define('Ext.Praxis.view.sales.ProcessingCommissionsForm.ProcessingCommissionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProcessingCommissionsForm',
    requires: [
        'Ext.Praxis.view.sales.ProcessingCommissionsForm.Info',
        'Ext.Praxis.controller.sales.ProcessingCommissions.ProcessingCommissionsController'
    ],
    controller: 'ProcessingCommissionsController',
    layout: {
        type: 'fit'
    },
    padding: ' 0 0 0',
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
                                        width: 1300,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '20 0 0 0',
                                            height: 90,
                                            layout: 'fit',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    margin: '5 0 0 0',
                                                    border: true,
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



