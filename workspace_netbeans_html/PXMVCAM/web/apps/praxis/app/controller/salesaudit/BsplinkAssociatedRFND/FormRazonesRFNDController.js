/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkAssociatedRFND.FormRazonesRFNDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormRazonesRFNDController',
    beanTMP: {},
    beanGrid: [],
    urlWin01: '',
    urlWin02: '',
    init: function(view) {
        var me = this;
        //console.log(this.view.params);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        // console.log(this.view.params)

        this.urlWin01 = Ext.String.trim(this.view.params.url01);

        this.setStoresGrid();
    },
    setStoresGrid: function() {
        var grid01 = Ext.getCmp(prototype.id04 + '-gridControlRazon');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id04 + '-store-grid01',
            groupField: 'A3404FAMIL',
            groupDir: 'DESC',
            fields: [
                {name: 'A3404CODRZ', type: 'string'},
                {name: 'A3404FAMIL', type: 'string'},
                {name: 'A3404COMES', type: 'string'}
            ],
            sorters: [
                {property: 'A3404FAMIL', direction: 'DESC'}
            ],
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/SearchRFNDRazon',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);

        this.OnLoadDataAfterRender();
    },
    OnLoadDataAfterRender: function() {
        this.beanTMP.IN_PAIS = this.view.params.vl_pais;

        var grid01 = Ext.getCmp(prototype.id04 + '-gridControlRazon');

        grid01.getStore().loadPage(1, {
            params: this.beanTMP,
            callback: function() {

            }
        });
        /*Ext.Ajax.request({
         url: this.urlWin01 + '/SearchRFNDRazon',
         timeout: 60000000,
         method: 'GET',
         params: this.beanTMP,
         success: function (response, options) {
         var res = Ext.JSON.decode(response.responseText);
         console.log(res);
         }
         });*/
    },
    OnRendererColumnDescription: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return value;
    },
    OnChkRFNDHandler: function(grid, rowIndex, colIndex,item,e,record) {
        var grid03 = Ext.getCmp(prototype.id01 + '-gridRazones');
        var regs = grid03.getStore().getCount();
        var beanDatos = {};
        //var rec = grid.getStore().getAt(rowIndex);
        var rec = record;
        if (rec.get('IN_COMENT') === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Language !');
            return;
        }
        if (rec.get('IN_COMENT') === 'SP') {
            beanDatos.A3404ERROR = rec.get('A3404COMES');
        }
        if (rec.get('IN_COMENT') === 'EN') {
            beanDatos.A3404ERROR = rec.get('A3404COMEN');
        }
        if (rec.get('IN_COMENT') === 'PO') {
            beanDatos.A3404ERROR = rec.get('A3404COMPO');
        }
        if (rec.get('IN_COMENT') === 'FR') {
            beanDatos.A3404ERROR = rec.get('A3404COMFR');
        }
        beanDatos.A3404CODRZ = rec.get('A3404CODRZ');
        // alert(this.beanDatos.A3403CODE);
        beanDatos.A3404FAMIL = rec.get('A3404FAMIL');
        for(var i=0;i<regs;i++){
            if(grid03.getStore().getAt(i).get('A3404CODRZ')=== beanDatos.A3404CODRZ){
                 global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function() {
                            }}); return;
            }
        };
        grid03.getStore().add(beanDatos);

        


    },
    OnChkRFNDIsDisabled: function(view, rowindex, colIndex, item, record) {
        var status = false;
        if (record.get('A3404CCUST') != '139') {
            status = true;
        }
        return status;
    }

});