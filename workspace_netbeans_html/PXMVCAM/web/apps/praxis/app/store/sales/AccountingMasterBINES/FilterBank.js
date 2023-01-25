/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.store.sales.AccountingMasterBINES.FilterBank', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: true,
    fields: [
        {name: '', type: 'string'}       
    ],
     proxy: {
        type: 'ajax',
        //url: 'ZoneMasterFile/getCities',
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