/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMManualForm.FormListTKTADManualController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormListTKTADManualController',
    BeanMoreTKT: {},
    urlWin01: CONTEXTPATH + '/ADMManualForm',
    init: function(view) {
        var me = this;
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
        if(me.view.params.CmboType===''){
            Ext.getCmp(prototype.id5 + '-MemoNumber').setValue("");
            Ext.getCmp(prototype.id5 + '-MemoNumber').hide();
        }else{
             Ext.getCmp(prototype.id5 + '-MemoNumber').show();
            Ext.getCmp(prototype.id5 + '-MemoNumber').setValue("");
             Ext.getCmp(prototype.id5 + '-MemoNumber').setValue(Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue());
        }
       
        this.BeanMoreTKT.VP_OPCION='2';
        this.BeanMoreTKT.VP_CIA=Ext.getCmp(prototype.id01 + '-txtCia').getValue();
        this.BeanMoreTKT.VP_FORMA=Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue().substring(0, 4);
        this.BeanMoreTKT.VP_SERIE=Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue().substring(4, 10);
        this.BeanMoreTKT.VP_SEQ=Ext.getCmp(prototype.id01 + '-txtSeq').getValue(); 
        this.BeanMoreTKT.VP_CPN=me.view.params.CmboType; 
         this.BeanMoreTKT.VP_CODRAZ=Ext.getCmp(prototype.id01 + '-txtCountry').getValue();
        
         var mask = new Ext.LoadMask(Ext.getCmp(prototype.id5 + '-form'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchADManualRazon',
            params: {beanString: JSON.stringify(this.BeanMoreTKT)},
            success: function(records, operation, success) {
                mask.hide();
                 var res = Ext.decode(records.responseText);
                if(res.data.length > 0){
                     Ext.getCmp(prototype.id5 + '-gridTKT').getStore().loadData(res.data);
                }else{
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
                 
               
                //Ext.getCmp(prototype.id5 + '-gridDocumRel').getStore().loadData(res.data);
            }
        });
    },
    setStoresGrids: function() {
        var grid01 = Ext.getCmp(prototype.id5 + '-gridTKT');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id5 + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    OnAmountSummary: function(value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    }
});

