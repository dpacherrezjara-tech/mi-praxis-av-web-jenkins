Ext.define('Ext.Praxis.controller.payments.DataImportMonitoring.DataImportMonitoringController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataImportMonitoringController',

    fecha: new Date(),
    childs: null,
    searchParams: {},
    dataObtain: {},
    lstCountry: [],

    init: function (view) {
        let me = this;

        prototype.id = 'DataImportMonitoringForm';
        prototype.url = CONTEXTPATH + '/DataImportMonitoring';

        // AHORA panelActual apunta al panel de Info
        me.panelActual = '-centerC-panel01';
        this.childs = Ext.getCmp(prototype.id + '-panelPrincipal')
                .query('*');

        this.control({
            '#DataImportMonitoringForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DataImportMonitoringForm-btnSearch': {click: this.btnSearch_click},
            '#DataImportMonitoringForm-btnClear': {click: this.btnClear_click},
            '#DataImportMonitoringForm-btnExcel': {click: this.btnExcel_click},
            '#DataImportMonitoringForm-btnFilter': {click: this.btnFilter_click},
            '#DataImportMonitoringForm-btnAdd': {click: this.btnAdd_click},
            '#DataImportMonitoringForm-btnBack': {click: this.btnBack_click}
        });
    },

  
    xpanel_afterrender: function () {
        this.obtainData();
        this.btnSearch_click();
    },


    obtainData: function () {
        let me = this;
        this.dataObtain.COUNTRY = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            params: {beanString: JSON.stringify(this.dataObtain)},

            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {

                    me.lstCountry = res.lstCountry;

                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: me.lstCountry
                    });

                    Ext.getCmp(prototype.id + '-cmbIN_COUNTRY')
                            .bindStore(storeData3)
                            .setValue('');

                } else {
                    global.Msg({msg: res.sesion});
                }
            }
        });
    },

   
    setFormatParameter: function () {

        this.searchParams.bean = {
            IN_PROCPAIS: Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').getValue() || ''
        };

        this.searchParams.beanString = JSON.stringify(this.searchParams.bean);
    },

    btnSearch_click: function () {
        this.setFormatParameter();
        this.setGridData();
    },

    
    setGridData: function () {
        let me = this;

        var storeGrid = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/getMonitoringData'
            },
            listeners: {
                beforeload: function (store) {
                    store.getProxy().extraParams = me.searchParams;
                }
            }
        });

        // BIND DEL STORE AL GRID NUEVO
        var grid = Ext.getCmp(prototype.id + '-gridDataImport');
        grid.bindStore(storeGrid);

        // paginador
        Ext.getCmp(prototype.id + '-paggin')?.bindStore(storeGrid);
    },

    btnClear_click: function () {
        Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').setValue('');
        this.btnSearch_click();
    },

   
    btnFilter_click: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        option.setVisible(!option.isVisible());
    },

 
    btnBack_click: function () {
        global.showMenu();
    },


    btnAdd_click: function () {
        global.Msg({msg: 'Under Construction'});
    },

    btnExcel_click: function () {
        global.Msg({msg: 'Under Construction'});
    }
});
