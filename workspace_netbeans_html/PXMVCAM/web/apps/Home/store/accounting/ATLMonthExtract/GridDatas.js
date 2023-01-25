/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : GridDatas                                         *
 * Created on : 18-10-2016, 19:54:43                              *
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

Ext.define('PXMVCAMHome.store.accounting.ATLMonthExtract.GridDatas', {
    extend: 'Ext.data.Store',
    model: 'PXMVCAMHome.model.accounting.ATLMonthExtract.GridData',
    autoLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        timeout: 60000000,
        reader: {
            keepRawData: true,
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
