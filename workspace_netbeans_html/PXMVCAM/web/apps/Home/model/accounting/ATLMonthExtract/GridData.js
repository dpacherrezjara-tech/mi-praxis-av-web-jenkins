/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : GridData                                          *
 * Created on : 18-10-2016, 19:56:38                              *
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

Ext.define('PXMVCAMHome.model.accounting.ATLMonthExtract.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'GLCODE', type: 'string'},
        {name: 'FUENT', type: 'string'},
        {name: 'FOP', type: 'string'},
        {name: 'NREF', type: 'string'},
        {name: 'AMOUNT', type: 'float'},
        {name: 'FBAS', type: 'string'},
        {name: 'FVTA', type: 'string'},
        {name: 'OD', type: 'string'},
        {name: 'CARR', type: 'string'},
        {name: 'NVLO', type: 'string'},
        {name: 'FVLO', type: 'string'},
        {name: 'TICKET', type: 'string'},
        {name: 'CUPON', type: 'string'},
        {name: 'EXCHTICKET', type: 'string'}
    ]
});
