/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */



prototype.id = 'CintaValidationForm';
prototype.url = CONTEXTPATH + '/CintaValidation';

Ext.define('Ext.Praxis.view.payments.CintaValidationForm.CintaValidationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CintaValidationForm',
    requires: [
        'Ext.Praxis.view.payments.CintaValidationForm.Options',
        'Ext.Praxis.view.payments.CintaValidationForm.Filters',
        'Ext.Praxis.view.payments.CintaValidationForm.Info',
        'Ext.Praxis.controller.payments.CintaValidation.CintaValidationController'
    ],
    controller: 'CintaValidationController',
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
                                        width: 1600,
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
                                        //GRILLA SIZE
                                        {
                                            xtype: 'panel',
                                            height: 650,
                                            width: 1600,
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







