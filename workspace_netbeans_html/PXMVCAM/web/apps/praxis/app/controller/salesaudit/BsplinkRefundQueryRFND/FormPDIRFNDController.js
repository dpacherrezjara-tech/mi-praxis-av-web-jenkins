/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormPDIRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormPDIRFNDController',

    beanTMP: {},
    urlWin01: '',

    init: function(view){
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        
        this.setStoresGrids();
    },
    setStoresGrids: function(){
        var me = this;
        Ext.getCmp(prototype.id07 + '-form').mask('Please Wait....'); 
       Ext.Ajax.request({
             url: this.urlWin01 + '/SearchRFNDPDI',
            method: 'POST',
            timeout: '300000',
            params: {
                    beanString: JSON.stringify(me.beanTMP)

                },
            success: function(response, options){
                Ext.getCmp(prototype.id07 + '-form').unmask();
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;
                  Ext.getCmp(prototype.id07 + '-pdi').setValue(data);
                
               
               
            }
        });  
    },
    
    OnLoadGridAfterrender: function(obj){
        
    },
    initial: function(txtSNumber,urlWin01) {
        this.beanTMP.IN_DOCUMET = txtSNumber;
         this.urlWin01=urlWin01;

    },
    onSearchkey: function(f, e) {
        if (e.getKey() === e.ENTER) {
            this.onCmbStatusChange();
        }

    }/*,
    onCmbStatusChange: function(){
        var Filter =  Ext.getCmp(prototype.id + '-Filter').getValue();
         var data =  Ext.getCmp(prototype.id07 + '-pdi').getValue();
         
        if (data.indexOf(Filter) !== -1) {
            Ext.getCmp(prototype.id07 + '-pdi').focus();
        }
       
        
    }*/
    
    
});