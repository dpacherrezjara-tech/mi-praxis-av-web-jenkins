/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridData                                          *                          
 * Created on : 07/03/2018, 11:07:55                              *               
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

Ext.define('Ext.Praxis.model.sales.CountryMasterFile.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'A006KEY', type: 'string'},
        {name: 'A006KEY1', type: 'string'},
        {name: 'CODMONEDANUM', type: 'string'},
        {name: 'CODMONEDAALPHA', type: 'string'},
        {name: 'NOMMONEDA', type: 'string'}
    ]
});