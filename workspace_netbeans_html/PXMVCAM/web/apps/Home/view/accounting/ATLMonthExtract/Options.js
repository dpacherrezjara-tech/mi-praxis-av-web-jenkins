/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Options                            *
 * Created on : 18-oct-2016, 16:53:23                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 18-oct-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.accounting.ATLMonthExtract.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accounting-atl-month-extract-form-options',
    width: 1455,
    height: 35,
    layout: 'fit',
    tbar: [
        {
            xtype: 'container',
            width: 925
        },
        '->',
        {
            xtype: 'pagingtoolbar',
            id: 'vATLMonthExtract-pagTool',
            pageSize: 10,
            border: false,
            displayInfo: false,
            width: 250
        },
        {
            width: 20,
            border: false
        },
        '-',
        {
            xtype: 'button',
            id: 'vATLMonthExtract-btnSearch',
            icon: 'img/botones/search.png',
            tooltip: 'Search'
        },
        {
            xtype: 'button',
            id: 'vATLMonthExtract-btnFilter',
            icon: 'img/botones/filter.png',
            tooltip: 'Hidden/Show filter'
        },
        {
            xtype: 'button',
            id: 'vATLMonthExtract-btnClear',
            icon: 'img/botones/clear.png',
            tooltip: 'Clear Options'
        },
        {
            xtype: 'button',
            id: 'vATLMonthExtract-btnExcel',
            icon: 'img/botones/excel.png',
            tooltip: 'Export to Excel'
        },
        {
            xtype: 'button',
            id: 'vATLMonthExtract-btnBack',
            icon: 'img/botones/back.png',
            tooltip: 'Back'
        },
        '-'
    ]
});
