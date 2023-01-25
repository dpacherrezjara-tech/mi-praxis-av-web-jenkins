Ext.define('Ext.Praxis.controller.program.ProFacsimil.FacsimilNewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FacsimilNewController',
    beanA020: {},
    strModulo: '',
    beanA728: {},
    NPROG: '',
    lista: new Array(),
    
    init: function(view) {
        var me = this;
        Ext.getCmp(prototype.idFacsimil + '-widget-facsimil').setParam(view.params);
    },
    afterRender: function () {
    },
    startDisplay: function(strMod, nroprt) {
    }
});
