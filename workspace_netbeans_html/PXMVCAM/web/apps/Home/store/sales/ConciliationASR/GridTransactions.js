/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : GridTransactions                                  *
 * Created on : 21-09-2016, 11:44:37                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 21-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext, vConciliationASR_contextPath */

Ext.define('PXMVCAMHome.store.sales.ConciliationASR.GridTransactions', {
    extend: 'Ext.data.Store',
    model: 'PXMVCAMHome.model.sales.ConciliationASR.GridTransaction'/*,
    proxy: {
        type: 'ajax',
        url: vConciliationASR_contextPath + '/ConciliationASR/loadPXF051',
        timeout: 60000000,
        reader: {
            type: 'json',
            root: 'data'
        }
    }*/
});
