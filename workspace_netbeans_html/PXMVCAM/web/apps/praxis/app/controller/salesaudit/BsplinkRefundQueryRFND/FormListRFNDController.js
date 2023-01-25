/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormListRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormListRFNDController',

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
       // this.urlWin01 = Ext.String.trim(this.view.params.url01);
        
        this.setStoresGrids();
        //this.onLoadGrids();
    },
    setStoresGrids: function(){
        var me = this;
                
        var grid01 = Ext.getCmp(prototype.id06 + '-gridData02');
                
        var store01 = Ext.create('Ext.data.Store',{
            storeId: prototype.id06 + '-store-grid01',
            proxy:{
                type: 'ajax',
               url: this.urlWin01 + '/searchLstRFND',
                extraParams: {beanString: JSON.stringify(me.beanTMP)},                
                /*extraParams{
                    beanString: JSON.stringify(bean)
                //: me.beanTMP,
                */
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
    initial: function(txtSNumber,txtCOUNTRY,urlWin01) {
        this.beanTMP.IN_OPTION = "1";
        this.beanTMP.IN_DOCUMET = txtSNumber;
        this.beanTMP.IN_COUNTRY = txtCOUNTRY;
        url: this.urlWin01=urlWin01;

    },
    
    onColumnAirlineRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnReason: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    OnAirlineSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000.00');
    }
    
    
    
});