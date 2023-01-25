/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.store.flown.ZoneMasterFile.FilterBys01', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["1", "Airport"],
        ["2", "City Pair"],
        ["3", "Zone"]
    ],
    fields: ['code', 'name']
});