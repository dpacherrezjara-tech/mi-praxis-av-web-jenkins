/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridData3                                         *                          
 * Created on : 05/03/2018, 12:25:55                              *               
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

Ext.define('Ext.Praxis.model.flown.Conciliation.GridData3', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'RN', type: 'string'},
        {name: 'NFLIGHT', type: 'string'},
        {name: 'CDEPART', type: 'string'},
        {name: 'strDescCDEPART', type: 'string'},
        {name: 'CARRIVA', type: 'string'},
        {name: 'strDescCARRIVA', type: 'string'},
        {name: 'strDescripcion', type: 'string'},
        {name: 'QCPNOD', type: 'string'},
        {name: 'QCPNTOT', type: 'string'},
        {name: 'QCPNCON', type: 'string'},
        {name: 'QCPINF', type: 'string'},
        {name: 'QCPNFI', type: 'string'},
        {name: 'mensaje', type: 'string'}
    ]
});