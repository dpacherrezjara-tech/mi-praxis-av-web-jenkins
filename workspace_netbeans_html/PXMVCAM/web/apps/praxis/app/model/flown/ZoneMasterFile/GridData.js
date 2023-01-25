/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global Ext */

Ext.define('Ext.Praxis.model.flown.ZoneMasterFile.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ciudaOri', type: 'string'},
        {name: 'strCiudadOri', type: 'string'},
        {name: 'ciudaDes', type: 'string'},
        {name: 'strCiudaDes', type: 'string'},
        {name: 'ZONA', type: 'string'},
        {name: 'NFLIGHT', type: 'string'},
        {name: 'CARRIER', type: 'string'},
        {name: 'TREG', type: 'string'},
        {name: 'CCUST', type: 'string'},
        {name: 'USCR', type: 'string'},
        {name: 'FECR', type: 'string'},
        {name: 'HOCR', type: 'string'},
        {name: 'USUP', type: 'string'},
        {name: 'FEUP', type: 'string'},
        {name: 'HOUP', type: 'string'}
        
    ]
});
