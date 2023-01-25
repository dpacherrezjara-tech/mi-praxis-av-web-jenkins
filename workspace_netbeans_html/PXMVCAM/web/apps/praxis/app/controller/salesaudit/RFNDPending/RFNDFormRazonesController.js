/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDPending.RFNDFormRazonesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDFormRazonesController',
    beanTMP: {},
    beanGrid: [],
    urlWin01: CONTEXTPATH + '/RFNDPending',
    urlWin02: '',
    init: function (view) {
        var me = this;
        //console.log(this.view.params);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // console.log(this.view.params)

        //this.urlWin01 = Ext.String.trim(this.view.params.url01);

        this.setStoresGrid();
    },
    setStoresGrid: function () {
        var grid01 = Ext.getCmp(prototype.idRFNDFormRazones + '-gridControlRazon');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDFormRazones + '-store-grid01',
            groupField: 'A3651FAMIL',
            groupDir: 'DESC',
            fields: [
                {name: 'A3651CODRZ', type: 'string'},
                {name: 'A3651FAMIL', type: 'string'},
                {name: 'A3651COMES', type: 'string'}
            ],
            sorters: [
                {property: 'A3651FAMIL', direction: 'DESC'}
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
    OnLoadDataAfterRender: function () {

        var grid01 = Ext.getCmp(prototype.idRFNDFormRazones + '-gridControlRazon');

        grid01.getStore().loadPage(1, {
            params: this.beanTMP,
            callback: function () {

            }
        });
    },
    OnRendererColumnDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return value;
    },
    OnChkRFNDHandler: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        rec2 = me.view.params;
        var grid03 = Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt');
        var regs = grid03.getStore().getCount();
        var beanDatos = {};
        var rec = record;
        if (Ext.String.trim(rec2.params.A3648COCD) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Language !');
            return;
        }
        if (Ext.String.trim(rec2.params.A3648COCD) === 'Estados Unidos y Canadá') {
            beanDatos.A3649ERROR = rec.get('A3651COMEN');
        }else{
             beanDatos.A3649ERROR = rec.get('A3651COMES');
        }
        beanDatos.A3649CODE = rec.get('A3651CODRZ');
        beanDatos.A3649TYPE = 'AM';
        beanDatos.A3649CIA = Ext.String.trim(rec2.paramsA3648CIA);
        beanDatos.A3649FORMA = Ext.String.trim(rec2.params.A3648FORMA);
        beanDatos.A3649SERIE = Ext.String.trim(rec2.params.A3648SERIE);
        beanDatos.A3649SEQ = Ext.String.trim(rec2.params.A3648SEQ);
        beanDatos.A3649CORRL = '';
        beanDatos.A3649PREME = Ext.String.trim(rec2.params.A3648PREME);
        beanDatos.A3649ANIO = Ext.String.trim(rec2.params.A3648ANIO);
        beanDatos.A3649FAMIL = rec.get('A3651FAMIL');
        console.log(beanDatos);
        for (var i = 0; i < regs; i++) {
            if (grid03.getStore().getAt(i).get('A3649CODE') === beanDatos.A3649CODE) {
                global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function () {
                    }});
                return;
            }
        }
        grid03.getStore().add(beanDatos);

        //var rec = grid.getStore().getAt(rowIndex);






    },
    OnChkRFNDIsDisabled: function (view, rowindex, colIndex, item, record) {
        var status = false;
        if (record.get('A3651CCUST') !== '139') {
            status = true;
        }
        return status;
    }

});