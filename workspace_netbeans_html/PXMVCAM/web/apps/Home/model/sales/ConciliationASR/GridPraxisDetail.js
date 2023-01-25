/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : GridPraxisDetail                                  *
 * Created on : 15-10-2016, 13:42:54                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 15-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.model.sales.ConciliationASR.GridPraxisDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'TTYPE',
            type: 'string',
            convert: function (value, record) {
                var strTTYPE;
                if(value === 'CC'){
                    strTTYPE = value + '-' + record.get('A1720STIPO');
                }else{
                    strTTYPE = value;
                }
                return strTTYPE;
            }
        },
        {name: 'A1720_AMT', type: 'float'}
    ]
});
