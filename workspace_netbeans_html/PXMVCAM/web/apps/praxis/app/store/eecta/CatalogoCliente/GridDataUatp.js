/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {
    extend: 'Ext.data.Store',
    //igual funciona sin el model ?? 
    model: 'Ext.Praxis.model.eecta.CatalogoCliente.GridDataUatp',   
    autoLoad: true,
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


