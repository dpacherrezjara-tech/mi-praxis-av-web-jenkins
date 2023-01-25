/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'InputsControlForm';
prototype.url = CONTEXTPATH + '/InputsControl';



Ext.define('Ext.Praxis.view.flown.InputsControlForm.InputsControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InputsControlForm',
    requires: [
         'Ext.Praxis.controller.flown.InputsControl.InputsControlController',
          'Ext.Praxis.view.flown.InputsControlForm.Options',
          'Ext.Praxis.view.flown.InputsControlForm.Filters',
          'Ext.Praxis.view.flown.InputsControlForm.Filters2',
          'Ext.Praxis.view.flown.InputsControlForm.Filters3',
          'Ext.Praxis.view.flown.InputsControlForm.Info'
    ],
    controller: 'InputsControlController',
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
                            region: 'center',
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
                                        width: 1350,
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
                                        }
                                         ,                                       
                                        {
                                            xtype:prototype.id+ '-filters3',
                                            id: prototype.id+'-contentFilter3'
                                        }
                                        ,
                                        {
                                            xtype:prototype.id+ '-filters2',
                                            id: prototype.id+'-contentFilter2'
                                        }                                    
                                       
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 580,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: false
                                                         
                                                    },
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id +'-info',
                                                            id:prototype.id+'-contentInfo'
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



