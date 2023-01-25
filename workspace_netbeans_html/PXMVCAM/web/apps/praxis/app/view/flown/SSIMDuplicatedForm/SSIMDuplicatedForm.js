/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMDuplicatedForm                                *                
 * Created on : 19/02/2018, 11:30:00                              *          
 * Author     : Gregory Sánchez (gsanchez)                        *          
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

prototype.id = 'SSIMDuplicatedForm';
prototype.id01 = 'DataEntrySSIMDuplicatedForm';
prototype.url = CONTEXTPATH + '/SSIMDuplicated';
prototype.widthContenedor = 1600;
prototype.widthGrid = 1278;
prototype.heightGrid = 529;

Ext.define('Ext.Praxis.view.flown.SSIMDuplicatedForm.SSIMDuplicatedForm', {
//    id: 'SSIMDuplicatedForm-Contenedor',
    extend: 'Ext.panel.Panel',
    alias: 'widget.SSIMDuplicatedForm',
    
    requires: [
        'Ext.Praxis.controller.flown.SSIMDuplicated.SSIMDuplicatedController',
        'Ext.Praxis.view.flown.SSIMDuplicatedForm.DataEntry',
        'Ext.Praxis.view.flown.SSIMDuplicatedForm.Options',
        'Ext.Praxis.view.flown.SSIMDuplicatedForm.Filters',
        'Ext.Praxis.view.flown.SSIMDuplicatedForm.Info'
    ],
    controller: 'SSIMDuplicatedController',

    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
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
                                            xtype: prototype.id + '-contenedor-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contenedor-filters'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 580,
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