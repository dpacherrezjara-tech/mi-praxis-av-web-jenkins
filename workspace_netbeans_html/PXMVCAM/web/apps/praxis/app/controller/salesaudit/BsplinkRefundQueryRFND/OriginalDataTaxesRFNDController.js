/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.OriginalDataTaxesRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.OriginalDataTaxesRFNDController',

    beanTMP: {},
    urlWin01: '',
    urlWin02: '',

    init: function(view){
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        // console.log(this.view.params)
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
        
        this.setStoresGrids();
        //this.onLoadGrids();
    },
    
    setStoresGrids: function(){
        var me = this;
        var rec = me.view.params.rec;
        
        // console.log(rec);
        
        var grid01 = Ext.getCmp(prototype.id03 + '-gridData02');
        
        me.beanTMP.IN_OPTION = "1";
        me.beanTMP.IN_CIA = rec.get('A3389CCUST');
        me.beanTMP.IN_PREME = rec.get('A3389PREME');
        me.beanTMP.IN_DATEFROM = rec.get('A3389FAPPI');
        
        var store01 = Ext.create('Ext.data.Store',{
            storeId: prototype.id03 + '-store-grid01',
            proxy:{
                type: 'ajax',
                url: this.urlWin01 + '/searchLstTax',
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
    
    OnLoadGridAfterrender: function(obj){
        
    },
    
    onLoadGrids: function(){
        /*var res = this.view.params;
        // console.log(res);
        Ext.getCmp(prototype.id02 + '-gridPAYMENT').getStore().removeAll();
        Ext.getCmp(prototype.id02 + '-gridPAYMENT').getStore().loadData(res.lst_CardTypeAGNT);

        Ext.getCmp(prototype.id02 + '-gridPAYMENTAGENT').getStore().removeAll();
        Ext.getCmp(prototype.id02 + '-gridPAYMENTAGENT').getStore().loadData(res.lst_CardType);*/
    },
    
    OnAirlineSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000.00');
    },
    
    OnAgentSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000.00');
    },
    
    OnDiferencesSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000.00');
    },
    
    onColumnAirlineRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    
    onColumnAgentRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    
    onColumnDiferencesRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    
});