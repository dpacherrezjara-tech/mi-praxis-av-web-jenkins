/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormOfPaymentRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormOfPaymentRFNDController',

    beanTMP: {},

    init: function(view){
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        // console.log(this.view.params)
        
        this.setStoresGrids();
        this.onLoadGrids();
    },
    
    setStoresGrids: function(){
        var grid01 = Ext.getCmp(prototype.id02 + '-gridPAYMENT');
        var grid02 = Ext.getCmp(prototype.id02 + '-gridPAYMENTAGENT');
        
        var store01 = Ext.create('Ext.data.Store',{
            storeId: prototype.id02 + '-store-grid01'
        });
        
        var store02 = Ext.create('Ext.data.Store',{
            storeId: prototype.id02 + '-store-grid02'
        });
        
        grid01.setStore(store01);
        grid02.setStore(store02);
    },
    
    onLoadGrids: function(){
        var res = this.view.params;
        // console.log(res);
        Ext.getCmp(prototype.id02 + '-gridPAYMENT').getStore().removeAll();
        Ext.getCmp(prototype.id02 + '-gridPAYMENT').getStore().loadData(res.lst_CardTypeAGNT);

        Ext.getCmp(prototype.id02 + '-gridPAYMENTAGENT').getStore().removeAll();
        Ext.getCmp(prototype.id02 + '-gridPAYMENTAGENT').getStore().loadData(res.lst_CardType);
    },
    
    OnAmountSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000.00');
    },
    
    onColumnAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    
});