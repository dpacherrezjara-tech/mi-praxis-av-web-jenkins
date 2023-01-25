/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.define('Ext.Praxis.controller.tnu.AtlSalesUseMonthlyBalance.AtlSalesUseMonthlyBalanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.AtlSalesUseMonthlyBalanceController',
    beanTMP: {},
    /**
     * Constructor
     */
    init: function(){
        var me = this;        
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function()
    {      
        //paginador disable
        Ext.getCmp(prototype.id + '-pagginator-01').disable();        
        //load data default
        this.setGridData();        
    },
    onSearchClick: function()
    {
        this.setGridData();
    },
    setGridData: function()
    {
       var me = this;
       var periodo = Ext.getCmp(prototype.id + '-periodo').getValue();        
       if(periodo === ''){
           global.Msg({
                msg: 'Select period'
            });
           return;
       };
       me.beanTMP.VP_CCUST = ''; //No Used
       me.beanTMP.IN_PER = periodo;       
       win.lblUser_toolTip("Estructura: A1890"); 
       var grid01 = Ext.getCmp(prototype.id + '-grid');                
        var store01 = Ext.create('Ext.data.Store',{            
            proxy:{
               type: 'ajax',
               url: prototype.url + '/search',               
               extraParams: me.beanTMP,                                
               timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true
        });        
        grid01.setStore(store01);                
    },
    
    onExcelClick: function(obj)
    {
        if ( Ext.Object.getSize(this.beanTMP) > 0 ){
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/AtlSalesUseMonthlyBalance_excel?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onFilterClick: function()
    {        
        var option = Ext.getCmp(prototype.id + '-contenedor-filters-form');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);        
    },
    onClearClick:function()
    {
        Ext.getCmp(prototype.id + '-grid').getStore().removeAll();        
    },
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts)
    {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click',{});
        if (!newValue){
            Ext.getCmp(prototype.id + '-pagginator-01').disable();         
        }else{
            Ext.getCmp(prototype.id + '-pagginator-01').enable();           
        }
    }
});

