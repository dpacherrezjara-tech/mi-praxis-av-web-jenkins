/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.TaxesByCodeForm.TaxesByCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesByCodeController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'TaxesByCodeForm';
        prototype.url = CONTEXTPATH + '/TaxesByCode';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TaxesByCodeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        //this.getDataInputs();
        //this.btnSearch_click();
    }
});