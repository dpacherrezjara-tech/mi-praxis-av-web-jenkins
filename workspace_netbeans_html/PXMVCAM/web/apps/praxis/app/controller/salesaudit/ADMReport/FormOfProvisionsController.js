/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMReport.FormOfProvisionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormOfProvisionsController',
    BeanMoreProvi: {},
    urlWin01:  CONTEXTPATH + '/ADMReport',
    init: function(view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        // console.log(this.view.params)

        this.setStoresGrids();
        this.cargaDatos();
    },
    cargaDatos: function() {
        var me = this;
        rec = me.view.params.rec;
        this.BeanMoreProvi.VP_PREME=rec.A2548PREME;
        this.BeanMoreProvi.VP_CNXPA=rec.A2548CNXPA; 
        
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id3 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/searchLstProvisi/',
            params: {beanString: JSON.stringify(this.BeanMoreProvi)},
            success: function(records, operation, success) {
                mask.hide();
                 var res = Ext.decode(records.responseText);
                if(res.data.length > 0){
                    Ext.getCmp(prototype.id3 + '-gridProvisions').getStore().loadData(res.data);
                }else{
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
                
                //Ext.getCmp(prototype.id3 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    setStoresGrids: function() {
        var grid01 = Ext.getCmp(prototype.id3 + '-gridProvisions');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id3 + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    OnAmountSummary: function(value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    }
});

