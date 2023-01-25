/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : ConciliationForm                                  *                
 * Created on : 28/02/2018, 17:51:00                              *          
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

Ext.define('Ext.Praxis.view.flown.ConciliationForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'btnFilter_click'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btnDisplay',
                            icon: 'resources/img/botones/FalseChart.png',
                            tooltip: 'Display Charts',
                            listeners: {
                                click: 'btnDisplay_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'btnExcel_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'btnClear_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'btnBack_click'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

