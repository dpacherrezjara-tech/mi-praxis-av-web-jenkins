/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : GridDataMainData1                                 *                          
 * Created on : 05/03/2018, 12:27:15                              *               
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

Ext.define('Ext.Praxis.store.flown.Conciliation.GridDataMainData1', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.flown.Conciliation.GridData',
    autoLoad:true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        timeout: 60000000,
        reader: {
            keepRawData: true,
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
