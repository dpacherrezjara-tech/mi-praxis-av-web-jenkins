/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridDataTKT_ACS                                   *                          
 * Created on : 05/03/2018, 17:53:55                              *               
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

Ext.define('Ext.Praxis.model.flown.Conciliation.GridDataTKT_ACS', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'RN', type: 'string'},
        {name: 'strTicket', type: 'string'},
        {name: 'strFormatDate', type: 'string'},
        {name: 'strFormatDate2', type: 'string'},
        {name: 'FLOAD', type: 'string'}
    ]
});