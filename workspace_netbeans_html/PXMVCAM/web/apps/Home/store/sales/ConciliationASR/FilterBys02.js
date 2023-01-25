/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : FilterBys02                                       *
 * Created on : 20-09-2016, 20:07:55                              *
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

Ext.define('PXMVCAMHome.store.sales.ConciliationASR.FilterBys02', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["ALL", "All"],
        ["FPROCE", "Proccessing Date"],
        ["FREPOR", "Open Date"],
        ["GRUPO", "Group"],
        ["NROID", "ID File"]
    ],
    fields: ['code', 'name']
});