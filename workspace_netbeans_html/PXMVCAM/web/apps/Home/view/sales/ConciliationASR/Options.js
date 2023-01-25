/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Options                                           *
 * Created on : 20-09-2016, 17:18:36                              *
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

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sales-conciliation-asr-form-options',
    height: 29,
    layout: 'fit',
    tbar: [
        {
            xtype: 'radiogroup',
            id: 'vConciliationASR-rg1',
            hideLabel: false,
            width: 120,
            defaults: {
                xtype: 'radiofield',
                style: 'margin: 0px 0px 0px 5px;',
                labelStyle: 'font-weight:bold;',
                hideLabel: false,
                checked: false,
                width: 120
            },
            items: [
                {
                    id: 'vConciliationASR-rf1',
                    name: 'opt',
                    boxLabel: 'Interact vs PRAXIS',
                    inputValue: 'IP'
                },
                {
                    id: 'vConciliationASR-rf2',
                    name: 'opt',
                    boxLabel: 'PRAXIS vs Interact',
                    inputValue: 'PI'
                }
            ]
        },
        '->',
        '-',
        {
            xtype: 'button',
            id: 'vConciliationASR-btnSearch',
            icon: 'resources/img/botones/search.png',
            tooltip: 'Search'
        },
        {
            xtype: 'button',
            id: 'vConciliationASR-btnFilter',
            icon: 'resources/img/botones/filter.png',
            tooltip: 'Hidden/Show filter'
        },
        {
            xtype: 'button',
            id: 'vConciliationASR-btnClear',
            icon: 'resources/img/botones/clear.png',
            tooltip: 'Clear Options'
        },
        {
            xtype: 'button',
            id: 'vConciliationASR-btnExcel',
            icon: 'resources/img/botones/excel.png',
            tooltip: 'Export to Excel'
        },
        {
            xtype: 'button',
            id: 'vConciliationASR-btnBack',
            icon: 'resources/img/botones/back.png',
            tooltip: 'Back'
        },
        '-'
    ]
});
