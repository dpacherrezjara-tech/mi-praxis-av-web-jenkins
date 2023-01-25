/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'SSIMComplementaryFilesForm';
prototype.id01 = 'DataEntrySSIMComplementaryFilesForm';
prototype.url = CONTEXTPATH + '/SSIMComplementaryFiles';
prototype.widthContenedor = 1400;
prototype.widthGrid = 835;
prototype.heightGrid = 529;

Ext.define('Ext.Praxis.view.flown.SSIMComplementaryFilesForm.SSIMComplementaryFilesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SSIMComplementaryFilesForm',
    requires: [
          'Ext.Praxis.controller.flown.SSIMComplementaryFiles.SSIMComplementaryFilesController',
          'Ext.Praxis.view.flown.SSIMComplementaryFilesForm.DataEntry',
          'Ext.Praxis.view.flown.SSIMComplementaryFilesForm.Options',
          'Ext.Praxis.view.flown.SSIMComplementaryFilesForm.Filters',
          'Ext.Praxis.view.flown.SSIMComplementaryFilesForm.Info'
    ],
    controller: 'SSIMComplementaryFilesController',
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
                                        width: 1300,
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
                                            xtype: 'panel',
                                            height: 580,
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



