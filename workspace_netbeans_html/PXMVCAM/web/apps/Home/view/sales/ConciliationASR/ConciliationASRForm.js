/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ConciliationASRForm                               *
 * Created on : 20-09-2016, 17:17:29                              *
 * Author     : Ronald Mayta (rmayta)                             *
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

/* global Ext */

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.ConciliationASRForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sales-conciliation-asr-form',
    requires: [
        'PXMVCAMHome.view.sales.ConciliationASR.Options',
        'PXMVCAMHome.view.sales.ConciliationASR.Filters',
        'PXMVCAMHome.view.sales.ConciliationASR.Info'
    ],
    layout: {type: 'fit'},
    padding: '0 0 0 0',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: 'vConciliationASR-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: 'vConciliationASR-form',
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
//                            width: 900,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: 'vConciliationASR-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1330
                                    },                                    
                                    items: [
                                        {
                                            xtype: 'sales-conciliation-asr-form-options'
                                        },
                                        {
                                            xtype: 'sales-conciliation-asr-form-filters',
                                            id: 'vConciliationASR-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 510,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: 'vConciliationASR-centerC-panel01',
                                                    layout: 'border',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: 'sales-conciliation-asr-form-info'
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