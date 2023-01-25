/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMManualForm.FormRazonesADManualController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormRazonesADManualController',
    beanTMP: {},
    beanGrid: [],
    urlWin01: CONTEXTPATH + '/ADMManualForm',
    init: function (view) {
        var me = this;
        //console.log(this.view.params);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrid();
    },
    setStoresGrid: function () {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id04 + '-gridControlRazon');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id04 + '-store-grid01',
            groupField: 'A2560FAMIL',
            groupDir: 'DESC',
            fields: [
                {name: 'A2560CCUST', type: 'string'},
                {name: 'A2560CODRZ', type: 'string'},
                {name: 'A2560FAMIL', type: 'string'},
                {name: 'A2560COMRE', type: 'string'},
                {name: 'A2560COMES', type: 'string'},
                {name: 'A2560COMEN', type: 'string'},
                {name: 'A2560COMPO', type: 'string'},
                {name: 'A2560COMFR', type: 'string'},
                {name: 'A2560IDIOMA', type: 'string'}
            ],
            sorters: [
                {property: 'A2560FAMIL', direction: 'DESC'}
            ],
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/SearchADManualRazon',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);

        me.OnLoadDataAfterRender();
    },
    OnLoadDataAfterRender: function () {
        this.beanTMP.VP_OPCION = '1';
        this.beanTMP.VP_SEQ = this.view.params.vl_pais;
        this.beanTMP.VP_CODRAZ = '';
        this.beanTMP.VP_FAM = '';
        this.beanTMP.VP_CIA = '';
        this.beanTMP.VP_FORMA = '';
        this.beanTMP.VP_SERIE = '';
        this.beanTMP.VP_CPN = '';

        var grid01 = Ext.getCmp(prototype.id04 + '-gridControlRazon');

        grid01.getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.beanTMP)
            },
            callback: function () {

            }
        });
    },
    OnRendererColumnDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return value;
    },
    OnChkRFNDHandler: function (grid, rowIndex, colIndex, item, e, record) {
        var grid03 = Ext.getCmp(prototype.id01 + '-gridrazon');
        var regs = grid03.getStore().getCount();
        var beanDatos = {};
        //var rec = grid.getStore().getAt(rowIndex);
        var rec = record;
        if (rec.get('A2560IDIOMA') === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Language !');
            return;
        }
        if (rec.get('A2560IDIOMA') === 'SP') {
            beanDatos.A2560ERROR = Ext.String.trim(rec.get('A2560COMES'));
        }
        if (rec.get('A2560IDIOMA') === 'EN') {
            beanDatos.A2560ERROR = Ext.String.trim(rec.get('A2560COMEN'));
        }
        if (rec.get('A2560IDIOMA') === 'PO') {
            beanDatos.A2560ERROR = Ext.String.trim(rec.get('A2560COMPO'));
        }
        if (rec.get('A2560IDIOMA') === 'FR') {
            beanDatos.A2560ERROR = Ext.String.trim(rec.get('A2560COMFR'));
        }
        beanDatos.A2560CODRZ = Ext.String.trim(rec.get('A2560CODRZ'));
        // alert(this.beanDatos.A3403CODE);
        beanDatos.A2560FAMIL = Ext.String.trim(rec.get('A2560FAMIL'));
        for (var i = 0; i < regs; i++) {
            if (grid03.getStore().getAt(i).get('A2560CODRZ') === beanDatos.A2560CODRZ) {
                global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function () {
                    }});
                return;
            }
        }
        ;
        grid03.getStore().add(beanDatos);




    },
    OnChkRFNDIsDisabled: function (view, rowindex, colIndex, item, record) {
        var status = false;
        if (record.get('A2560CODRZ') === '') {
            status = true;
        }
        return status;
    }

});