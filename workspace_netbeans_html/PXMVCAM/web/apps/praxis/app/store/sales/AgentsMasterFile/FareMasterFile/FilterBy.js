/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.store.sales.FareMasterFile.FilterBy', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: true,
    fields: [
        {name: 'A1007CTATO', type: 'string'},
        {name: 'A1007NOMBR', type: 'string'}
    ],
     proxy: {
        type: 'ajax',       
         actionMethods: {
            read: 'POST'
        },
        timeout: 60000000,
        reader: {
           keepRawData: true,
            type: 'json',
            root: 'data'
        }
    }
       
});