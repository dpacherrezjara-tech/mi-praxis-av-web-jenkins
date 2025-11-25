Ext.define('Ext.Praxis.controller.payments.DataImportMonitoring.DataImportMonitoringController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataImportMonitoringController',

    fecha: new Date(),
    childs: null,
    searchParams: {},
    searchParamsRPA: {},
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
            '#DataImportMonitoringForm-btnBack': {click: this.btnBack_click},
            '#DataImportMonitoringForm-gridDataRPA': {
                afterrender: this.bindGridButtonEvents
            }
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

//                    Ext.getCmp(prototype.id + '-cmbIN_COUNTRY')
//                            .bindStore(storeData3)
//                            .setValue('');

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
        let tabPanel = Ext.getCmp(prototype.id + '-tabPanel');
        let activeTab = tabPanel.getActiveTab();
        let tabId = activeTab.getItemId();

        if (tabId === prototype.id + '-tabProcessed') {
            this.setFormatParameter();
            this.setGridData();
        }

        if (tabId === prototype.id + '-tabRpaControl') {
            this.setFormatParameterRPA();
            this.setGridDataRPA();
        }

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
    },

    // UPS
    changeViewRPA: function () {
        console.log('changeViewRPA');
        this.setFormatParameterRPA();
        this.setGridDataRPA();
    },
    setFormatParameterRPA: function () {
        this.searchParamsRPA.bean = {
            IN_CCUST: '134'
        };
        this.searchParamsRPA.beanString = JSON.stringify(this.searchParamsRPA.bean);
        console.log('Parametros RPA: \n');
        console.log(this.searchParamsRPA);
    },
    setGridDataRPA: function () {
        var storeGrid = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/getMonitoringRPA',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                beforeload: function (store) {
                    store.getProxy().extraParams = me.searchParamsRPA;
                },
                load: function (store, records) {
                    console.log("📌 Respuesta completa backend:", store.getProxy().getReader().rawData);
                    console.log("📌 Primer registro:", records[0]?.data);
                }
            }
        });

        var grid = Ext.getCmp(prototype.id + '-gridDataRPA');
        grid.bindStore(storeGrid);
    },
    bindGridButtonEvents: function () {
        let me = this;

        Ext.getCmp(prototype.id + '-gridDataRPA').getEl().on('click', function (e) {
            let target = e.getTarget('.btn-rpa-icon');
            if (!target || target.classList.contains('btn-rpa-disabled'))
                return; // botón deshabilitado → no hacer nada

            let id = target.getAttribute('data-id');
            let action = target.getAttribute('data-action');
            let status = target.getAttribute('data-status');
            let enabled = target.getAttribute('data-enabled') === "true";

            // Validaciones de seguridad (evita ataques visuales)
            if (!enabled) {
                global.Msg({msg: "⚠ Robot inactivo. No se puede ejecutar acciones."});
                return;
            }
            if (status !== "RUNNING" && (action === "stop" || action === "restart" || action === "log")) {
                global.Msg({msg: "⚠ Robot no está corriendo."});
                return;
            }
            if (status === "RUNNING" && action === "start") {
                global.Msg({msg: "⚠ Robot ya está en ejecución."});
                return;
            }

            // Si todo OK ➜ ejecutar acción
            switch (action) {
                case "start":
                    me.onRpaStart(id);
                    break;
                case "stop":
                    me.onRpaStop(id);
                    break;
                case "restart":
                    me.onRpaRestart(id);
                    break;
                case "log":
                    me.onRpaLog(id);
                    break;
            }
        });
    },
    onRpaStart: function (id) {
        console.log("START robot", id);
        this.executeRpaAction(id, "start");
    },
    onRpaStop: function (id) {
        console.log("STOP robot", id);
        this.executeRpaAction(id, "stop");
    },
    onRpaRestart: function (id) {
        console.log("RESTART robot", id);
        this.executeRpaAction(id, "restart");
    },
    onRpaLog: function (id) {
        let me = this;

        Ext.Ajax.request({
            url: prototype.url + '/getLogRPA',
            method: 'POST',
            params: {LIVE_ID: id},

            success: function (res) {
                let r = Ext.JSON.decode(res.responseText);
                let panel = Ext.getCmp(prototype.id + '-rpaLogPanel');

                if (r.success && r.log && r.log.trim() !== "") {
                    panel.update(
                            '<pre class="rpa-log">' + Ext.String.htmlEncode(r.log) + '</pre>'
                            );
                } else {
                    panel.update(
                            '<span class="log-waiting">⏳ Waiting for robot log...</span>'
                            );
                }
            },
            failure: function () {
                Ext.getCmp(prototype.id + '-rpaLogPanel').update(
                        '<pre class="rpa-log">⚠ Error de conexión con API</pre>'
                        );
            }
        });
    },
    executeRpaAction: function (id, action) {
        let me = this;

        Ext.Ajax.request({
            url: prototype.url + '/executeRpaAction',
            method: 'POST',
            params: {
                RN: id,
                ACTION: action
            },
            success: function (res) {
                let r = Ext.JSON.decode(res.responseText);
                global.Msg({msg: r.message || "Acción ejecutada"});

                // refrescar grilla después
                me.setGridDataRPA();
            },
            failure: function () {
                global.Msg({msg: 'Error ejecutando acción RPA'});
            }
        });
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DataImportMonitoringForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: []
//                lstCountry: me.lstCountry
            }
        }).show();
    },

});
