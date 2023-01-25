/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ATLMonthExtractForm                               *
 * Created on : 18-10-2016, 16:39:14                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 18-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.accounting.ATLMonthExtract.ATLMonthExtractForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accounting-atl-month-extract-form',
    requires: [
        'PXMVCAMHome.view.accounting.ATLMonthExtract.Options',
        'PXMVCAMHome.view.accounting.ATLMonthExtract.Filters',
        'PXMVCAMHome.view.accounting.ATLMonthExtract.Info'
    ],
    layout: {type: 'fit'},
    padding: '5 5 5 5',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: 'vATLMonthExtract-xpanel',
            border: false,
            autoScroll: true,
            layout: 'fit',
            items: [
                {
                    id: 'vATLMonthExtract-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
//                            width: 900,
                            layout: 'border',
                            border: false,
                            items: [
                                {
                                    region: 'center',
                                    id: 'vATLMonthExtract-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1455
                                    },
                                    items: [
                                        {
                                            layout: 'hbox',
                                            border: false,
                                            margin: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'accounting-atl-month-extract-form-options'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'accounting-atl-month-extract-form-filters',
                                            id: 'vATLMonthExtract-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 510,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: 'vATLMonthExtract-centerC-panel01',
                                                    layout: 'border',
                                                    border: true,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: 'accounting-atl-month-extract-form-info'
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
