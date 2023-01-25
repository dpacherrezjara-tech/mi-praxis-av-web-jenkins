/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ATLMonthExtract                                   *
 * Created on : 18-10-2016, 16:34:23                              *
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

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'resources/js/ext-6.0.2/ux',
        'Ext.global': 'resources/js/global',
        'Ext.ux.window': 'resources/js/global'
    }
});
Ext.require([
    '*',
    'Ext.global.ControlData',
    'Ext.ux.window.Notification',
    'Ext.ux.form.MultiSelect'
]);
Ext.tip.QuickTipManager.init();
Ext.Ajax.timeout = 18000000;
Ext.application({
    name: 'PXMVCAMHome',
    appFolder: 'apps/Home',
    controllers: [
        'accounting.ATLMonthExtract.ATLMonthExtract',
        'sales.ConciliationASR.ConciliationASR'
    ],
    autoCreateViewport: true,
    init: function () {
        console.log('0) APPLICATION HOME - INIT');
    }
});
