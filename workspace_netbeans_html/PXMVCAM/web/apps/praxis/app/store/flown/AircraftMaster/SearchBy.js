/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.store.flown.AircraftMaster.SearchBy', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["", "Select"],
        ["EQUIPO", "Equipo"],
        ["MODELO", "Modelo"],
        ["MATRIC", "Registration Nbr."]
    ],
    fields: ['code', 'name']
});