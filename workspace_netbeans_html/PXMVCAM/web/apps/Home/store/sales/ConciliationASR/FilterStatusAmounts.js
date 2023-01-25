/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : FilterStatusAmounts                               *
 * Created on : 20-09-2016, 20:17:42                              *
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

Ext.define('PXMVCAMHome.store.sales.ConciliationASR.FilterStatusAmounts', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["ALL", "All"],
        ["Y", "Yes"],
        ["N", "Not"]
    ],
    fields: ['code', 'name']
});
