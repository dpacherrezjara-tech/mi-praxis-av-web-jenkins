/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : ComboBoxTOper                                     *                          
 * Created on : 20/02/2018, 11:47:15                              *               
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
Ext.define('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxTOper', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    fields:['code','name'],
    data:[
        ["", ""],
        ["D", "Domestic"],
        ["I", "International"]
    ]
});