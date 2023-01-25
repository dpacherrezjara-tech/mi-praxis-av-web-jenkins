Ext.define('Ext.Praxis.controller.program.ProFacsimil.DataEntryProFacsimilController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryProFacsimilController',
    meEntry: '',
    p: '',
    init: function(view) {
        meEntry = this;
        p = this.view.params;
        console.log(p);
    },
    afterRender: function(){
        
    },
    
//    onCancelClick: function(btn){
//        this.view.close();
//    },
});