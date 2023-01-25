Ext.define('Ext.Praxis.controller.salesaudit.TaxesBySegmentForm.CtrlTaxesByCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlTaxesByCodeController',
    beanA020: {},
    strModulo: '',
    beanA728: {},
    NPROG: '',
    lista: new Array(),
    
    init: function(view) {
        var me = this;

        Ext.getCmp(prototype.idCtrlTaxesByCode + '-widget-ttbs').setParam(view.params);
    },
    afterRender: function () {
    },
    startDisplay: function(strMod, nroprt) {
    }
});