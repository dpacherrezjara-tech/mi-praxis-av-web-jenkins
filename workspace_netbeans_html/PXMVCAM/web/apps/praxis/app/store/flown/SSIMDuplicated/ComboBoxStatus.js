/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : ComboBoxStatus                                    *                          
 * Created on : 20/02/2018, 11:14:15                              *               
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
Ext.define('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxStatus', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    fields:['code','name'],
    data:[
        ["2", "On Process"],
        ["3", "Conciliation"],
        ["4", "Closed"]
    ]
});