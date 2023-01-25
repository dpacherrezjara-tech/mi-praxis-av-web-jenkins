/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'OwnerlessCouponForm';
prototype.id2 = 'OwnerlessCouponForm2';
prototype.url = CONTEXTPATH + '/OwnerlessCoupon';



Ext.define('Ext.Praxis.view.flown.OwnerlessCouponForm.OwnerlessCouponForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.OwnerlessCouponForm',
    requires: [
          'Ext.Praxis.controller.flown.OwnerlessCoupon.OwnerlessCouponController',
          'Ext.Praxis.view.flown.OwnerlessCouponForm.Options',
          'Ext.Praxis.view.flown.OwnerlessCouponForm.Filters',
          'Ext.Praxis.view.flown.OwnerlessCouponForm.Info'
           
    ],
    controller: 'OwnerlessCouponController',
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
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1600,
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
                                        {
                                            xtype: 'panel',
                                            height: 600,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
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



