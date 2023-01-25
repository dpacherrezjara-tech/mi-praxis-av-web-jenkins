/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridData                                          *                          
 * Created on : 16/02/2018, 10:14:15                              *               
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

Ext.define('Ext.Praxis.model.flown.SSIMComplementaryFiles.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'RN', type: 'string'},
        {name: 'NSEQ', type: 'string'},
        {name: 'NFLIGHT', type: 'string'},
        {name: 'CDEPART', type: 'string'},
        {name: 'CARRIVA', type: 'string'},
        {name: 'LEG', type: 'string'},
        {name: 'TOPER', type: 'string'},
        {name: 'FSSIM', type: 'string'},
        {name: 'FREQ', type: 'string'},
        {name: 'CARRIER', type: 'string'},
        {name: 'TOPER', type: 'string'},
        {name: 'NFLIGHTH', type: 'string'},
        {name: 'CARRIERH', type: 'string'}
    ]
});