/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : ComboBoxFlag                                      *                          
 * Created on : 20/02/2018, 11:34:15                              *               
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
Ext.define('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlag', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    fields:['code','name'],
    data:[
        ["", "Stand By"],
        ["1", "Received"]
    ]
});