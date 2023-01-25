Ext.define('Ext.Praxis.controller.program.Prorrateo.ProrrateoNewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProrrateoNewController',
    beanA020: {},
    strModulo: '',
    beanA728: {},
    NPROG: '',
    lista: new Array(),
    
    init: function(view) {
        var me = this;

        Ext.getCmp(prototype.idProrrate + '-widget-prorrate').setParam(view.params);
    },
    afterRender: function () {
    },
    startDisplay: function(strMod, nroprt) {
    }
});
