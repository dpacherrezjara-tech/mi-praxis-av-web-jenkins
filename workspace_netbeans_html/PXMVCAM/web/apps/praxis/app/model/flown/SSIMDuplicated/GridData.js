/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridData                                          *                          
 * Created on : 19/02/2018, 14:36:55                              *               
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

Ext.define('Ext.Praxis.model.flown.SSIMDuplicated.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'strFormatDate' , type: 'string'},
        {name :'NFLIGHT' , type: 'string'},
        {name :'LEGSEQ' , type: 'string'},
        {name :'CDEPART' , type: 'string'},
        {name :'CARRIVA' , type: 'string'},
        {name :'CARRI' , type: 'string'},
        {name :'strFormatFSENDSS' , type: 'string'},
        {name :'QCPAD' , type: 'string'},
        {name :'QCPCHD' , type: 'string'},
        {name :'QCPINF' , type: 'string'},
        {name :'QCPTRA' , type: 'string'},
        
        {name :'strFormatFSENDOD' , type: 'string'},
        {name :'QCPNOD' , type: 'string'},
        
        {name :'QCPNLEG' , type: 'string'},
        
        {name :'strFormatFSENDVC' , type: 'string'},
        {name :'QCPNVC' , type: 'string'},
        
        {name :'QCPNOCR' , type: 'string'},
        {name :'QCPNMA' , type: 'string'},
        {name :'QCPNTOT' , type: 'string'}
    ]
});