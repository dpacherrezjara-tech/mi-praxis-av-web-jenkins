/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridDataTKT                                       *                          
 * Created on : 01/03/2018, 17:53:55                              *               
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

Ext.define('Ext.Praxis.model.flown.Conciliation.GridDataTKT', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'RN', type: 'string'},
        {name: 'NFLIGHT', type: 'string'},
        {name: 'CDEPART', type: 'string'},
        {name: 'strDescCDEPART', type: 'string'},
        {name: 'CARRIVA', type: 'string'},
        {name: 'strDescCARRIVA', type: 'string'},
        {name: 'strFCON', type: 'string'},
        {name: 'strTicket', type: 'string'},
        {name: 'strFormatDate', type: 'string'},
        {name: 'strFormatDate2', type: 'string'}
    ]
});