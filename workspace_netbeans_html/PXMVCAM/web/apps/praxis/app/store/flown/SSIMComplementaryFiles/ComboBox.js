/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : ComboBox                                          *                          
 * Created on : 17/02/2018, 14:27:15                              *               
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
Ext.define('Ext.Praxis.store.flown.SSIMComplementaryFiles.ComboBox', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    fields:['code','name'],
    data:[
        ["1", "Y"],
        ["2", "N"]
    ]
});