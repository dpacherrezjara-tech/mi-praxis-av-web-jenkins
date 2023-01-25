Ext.define('Ext.Praxis.controller.program.ProMasterTicket.DataEntryProrateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryProrateController',
    p: '',    
    init: function (view) {        
        this.p = this.view.params;        
        console.log(this.p);
        prototype.DataEntryProrate = {            
            id: 'CtrlDataEntryProrateForm',            
            url: CONTEXTPATH + '/CtrlDataEntryProrate'        
        };    
    },    
    afterRender: function () {
        console.log('DataEntryProrate');
        //console.log(this.p);
        Ext.getCmp(prototype.id + '-widget-prorrate').setParam(this.p);
    }
});
