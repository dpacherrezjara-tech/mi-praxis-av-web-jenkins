Ext.define('Ext.Praxis.controller.payments.ControlReport.ControlReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlReportController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsObtainData: {},
    init: function (view) {
        me = this;
        prototype.id = 'ControlReportForm';
        prototype.url = CONTEXTPATH + '/ControlReport';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridSumaryMain';
        prototypeProgram.view = 'payments-control-report';
        prototypeProgram.nprog = 'PX00001036';
        prototypeProgram.title = 'Payment Control Report';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#ControlReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ControlReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ControlReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#ControlReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ControlReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ControlReportForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ControlReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#ControlReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ControlReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ControlReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ControlReportForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ControlReportForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#ControlReportForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#ControlReportForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#ControlReportForm-cmbDateFromYearARC': {
                select: this.selectComboFromYearARC
            },
            '#ControlReportForm-cmbDateFromMonthARC': {
                select: this.selectComboFromMonthARC
            },
            '#ControlReportForm-cmbDateFromDayARC': {
                select: this.selectComboFromDayARC
            },
        });
        // </editor-fold>
    },
    xpanel_afterrender: function () {
        me.obtainData();
//        me.btnSearch_click();

        $('#ControlReportForm-btnToggleSwitchPending').on('change', function () {

            var toggleCmp = Ext.getCmp(prototype.id + '-btnToggleSwitchPending');
            var isChecked = toggleCmp.getEl().down('input.toggle-input').dom.checked;
            if (isChecked) {
                Ext.getCmp(prototype.id + '-pieF1').setVisible(false);
                Ext.getCmp(prototype.id + '-pieF2').setVisible(false);
                Ext.getCmp(prototype.id + '-pieAcc').setVisible(false);
                Ext.getCmp(prototype.id + '-spacef1').setVisible(false);
                Ext.getCmp(prototype.id + '-spacef2').setVisible(false);
                Ext.getCmp(prototype.id + '-codeF1').setVisible(true);
                console.log('Pending View activo');
            } else {
                console.log('All View activo');
                Ext.getCmp(prototype.id + '-pieF1').setVisible(true);
                Ext.getCmp(prototype.id + '-pieF2').setVisible(true);
                Ext.getCmp(prototype.id + '-pieAcc').setVisible(true);
                Ext.getCmp(prototype.id + '-spacef1').setVisible(true);
                Ext.getCmp(prototype.id + '-spacef2').setVisible(true);
                Ext.getCmp(prototype.id + '-codeF1').setVisible(false);
            }
        });

    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        // Año actual (ya está bien como número)
        var yearActual = fechaActual.getFullYear();

        // Mes actual CONVERTIDO a string de 2 dígitos
        var monthActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

        // Bind stores
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        // Asignar valores (año como número, mes como string de 2 dígitos)
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        // Lo mismo para combos ARC
        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue("");

        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.IN_PF122CODPR = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {

                var res = Ext.JSON.decode(response.responseText);
                me.lstCountry = res.lstCountry;
                me.lstProcessor = res.listaProcesadores;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });

                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstProcessor,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');
                global.clear();
            }
        });

        Ext.Ajax.request({
            url: prototype.url + '/obtainCodeError',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({})
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data || [];

                var dataCorregida = Ext.Array.map(data, function (item) {
                    return {
                        CODE: item.CODE,
                        NAME: item.NAME
                    };
                });

                var storeCodeError = Ext.create('Ext.data.Store', {
                    fields: ['CODE', 'NAME'],
                    data: dataCorregida,
                    autoLoad: true
                });

                var cmb = Ext.getCmp(prototype.id + '-cmbCodeError');
                cmb.bindStore(storeCodeError);
                cmb.setValue('');

                global.clear();
            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    btnSearch_click: function (obj, e) {
        let fs = Ext.getCmp(prototype.id + '-typeReportSelected');
        let selectedBy = Ext.getCmp(prototype.id + '-cmbInputReport').getValue();

        if (selectedBy === 'P') {
            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">PROCESS STATUS</span>');
        } else if (selectedBy === 'T') {
            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">TOTAL BY CONCILIATION</span>');
        }

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];


        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelCredito').setVisible(true);
            Ext.getCmp(prototype.id + '-panelCash').setVisible(false);

            this.setFormatParameter();
            this.setGridData();
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelCredito').setVisible(false);
            Ext.getCmp(prototype.id + '-panelCash').setVisible(true);
            /*
             this.setFormatParameterARC();
             this.setGridDataARC();
             */
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        me.bean.IN_REFER = Ext.getCmp(prototype.id + '-txtREFER').getValue();
        me.bean.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessor').getValue() || "";
        me.bean.IN_IDCONT = Ext.getCmp(prototype.id + '-txtIDCONT').getValue();
        me.bean.IN_HEADER = Ext.getCmp(prototype.id + '-txtHeaderText').getValue();
        me.bean.IN_PROVISION = Ext.getCmp(prototype.id + '-txtAccprov').getValue();
        me.bean.IN_CODEERROR = Ext.getCmp(prototype.id + '-cmbCodeError').getValue() || "";
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeSociety').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMain'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {

                        let lstData = [];
                        for (let value of obj.data.items) {
                            lstData.push(value.data);
                        }

                        // Totales generales
                        let F1_TOTAL_GLOBAL = 0;
                        let F1_TOTAL_STVAL3_GLOBAL = 0;
                        let F1_TOTAL_STVAL1_GLOBAL = 0;
                        let F1_TOTAL_TAXES_GLOBAL = 0;
                        let F1_TOTAL_ERROR_GLOBAL = 0;
                        let F1_TOTAL_PENDING_TO_F2_GLOBAL = 0;

                        let F2_F1_TOTAL_COMPLETED_GLOBAL = 0;
                        let F2_TOTAL_PENDING_OVER50_GLOBAL = 0;
                        let F2_TOTAL_MATCH_OVER50_GLOBAL = 0;

                        let F3_F2_TOTAL_COMPLETED_GLOBAL = 0;
                        let F3_TOTAL_WO_ACC_GLOBAL = 0;
                        let F3_TOTAL_COMPLETED_GLOBAL = 0;
                        let F3_TOTAL_PENDING_SENT_GLOBAL = 0;
                        let F3_TOTAL_COMPLETED_SAP_GLOBAL = 0;
                        let F3_TOTAL_ERROR_GLOBAL = 0;

                        let a = [];
                        let dataRoot = {text: '.', expanded: false, children: []};

                        Ext.Object.each(lstData, function (index, value) {
                            if (a.indexOf(value.strFormatDate) < 0) {
                                let V_F1_TOTAL = 0;
                                let V_F1_TOTAL_STVAL3 = 0;
                                let V_F1_TOTAL_STVAL1 = 0;
                                let V_F1_TOTAL_TAXES = 0;
                                let V_F1_TOTAL_ERROR = 0;
                                let V_F1_PERCENT = 0;
                                let V_F1_PENDING_TO_F2 = 0;

                                let V_F2_F1_TOTAL_COMPLETED = 0;
                                let V_F2_TOTAL_PENDING_OVER50 = 0;
                                let V_F2_TOTAL_MATCH_OVER50 = 0;
                                let V_F2_PERCENT = 0;

                                let V_F3_F2_TOTAL_COMPLETED = 0;
                                let V_F3_TOTAL_WO_ACC = 0;
                                let V_F3_TOTAL_COMPLETED = 0;
                                let V_F3_TOTAL_PENDING_SENT = 0;
                                let V_F3_PERCENT = 0;
                                let V_F3_TOTAL_COMPLETED_SAP = 0;
                                let V_F3_TOTAL_ERROR = 0;

                                // Agrupar por mes
                                Ext.Object.each(lstData, function (index, valuex) {
                                    if (value.strFormatDate === valuex.strFormatDate) {
                                        V_F1_TOTAL += valuex.F1_TOTAL;
                                        V_F1_TOTAL_STVAL3 += valuex.F1_TOTAL_STVAL3;
                                        V_F1_TOTAL_STVAL1 += valuex.F1_TOTAL_STVAL1;
                                        V_F1_TOTAL_TAXES += valuex.F1_TOTAL_TAXES;
                                        V_F1_TOTAL_ERROR += valuex.F1_TOTAL_ERROR;
                                        V_F1_PENDING_TO_F2 += valuex.F1_TOTAL_PENDING_TO_F2;

                                        V_F2_F1_TOTAL_COMPLETED += valuex.F2_F1_TOTAL_COMPLETED;
                                        V_F2_TOTAL_PENDING_OVER50 += valuex.F2_TOTAL_PENDING_OVER50;
                                        V_F2_TOTAL_MATCH_OVER50 += valuex.F2_TOTAL_MATCH_OVER50;

                                        V_F3_F2_TOTAL_COMPLETED += valuex.F3_F2_TOTAL_COMPLETED;
                                        V_F3_TOTAL_WO_ACC += valuex.F3_TOTAL_WO_ACC;
                                        V_F3_TOTAL_COMPLETED += valuex.F3_TOTAL_COMPLETED;
                                        V_F3_TOTAL_PENDING_SENT += valuex.F3_TOTAL_PENDING_SENT;
                                        V_F3_TOTAL_COMPLETED_SAP += valuex.F3_TOTAL_COMPLETED_SAP;
                                        V_F3_TOTAL_ERROR += valuex.F3_TOTAL_ERROR;
                                    }
                                });

                                // Calcular porcentaje por mes
                                if (V_F1_TOTAL > 0) {
                                    V_F1_PERCENT = (V_F1_TOTAL_STVAL1 * 100) / V_F1_TOTAL;
                                }

                                if (V_F2_F1_TOTAL_COMPLETED > 0) {
                                    V_F2_PERCENT = (V_F2_TOTAL_MATCH_OVER50 * 100) / V_F2_F1_TOTAL_COMPLETED;
                                }

                                if (V_F3_F2_TOTAL_COMPLETED > 0) {
                                    V_F3_PERCENT = (V_F3_TOTAL_COMPLETED * 100) / V_F3_F2_TOTAL_COMPLETED;
                                }

                                // Agregar al árbol
                                a.push(value.strFormatDate);
                                dataRoot.children.push({
                                    strFormatDate: value.strFormatDate,
                                    VALDATE: value.VALDATE,
                                    F1_TOTAL: V_F1_TOTAL,
                                    F1_TOTAL_STVAL3: V_F1_TOTAL_STVAL3,
                                    F1_TOTAL_STVAL1: V_F1_TOTAL_STVAL1,
                                    F1_TOTAL_TAXES: V_F1_TOTAL_TAXES,
                                    F1_TOTAL_ERROR: V_F1_TOTAL_ERROR,
                                    F1_TOTAL_PENDING_TO_F2: V_F1_PENDING_TO_F2,
                                    F1_PERCENT: V_F1_PERCENT.toFixed(2) + '%',

                                    F2_F1_TOTAL_COMPLETED: V_F2_F1_TOTAL_COMPLETED,
                                    F2_TOTAL_PENDING_OVER50: V_F2_TOTAL_PENDING_OVER50,
                                    F2_TOTAL_MATCH_OVER50: V_F2_TOTAL_MATCH_OVER50,
                                    F2_PERCENT: V_F2_PERCENT.toFixed(2) + '%',

                                    F3_F2_TOTAL_COMPLETED: V_F3_F2_TOTAL_COMPLETED,
                                    F3_TOTAL_WO_ACC: V_F3_TOTAL_WO_ACC,
                                    F3_TOTAL_COMPLETED: V_F3_TOTAL_COMPLETED,
                                    F3_TOTAL_PENDING_SENT: V_F3_TOTAL_PENDING_SENT,
                                    F3_TOTAL_COMPLETED_SAP: V_F3_TOTAL_COMPLETED_SAP,
                                    F3_PERCENT: V_F3_PERCENT.toFixed(2) + '%',
                                    F3_TOTAL_ERROR: V_F3_TOTAL_ERROR,

                                    expanded: false,
                                    children: []
                                });

                                // Agregar las filas hijas
                                Ext.Object.each(lstData, function (index, value01) {
                                    if (value.strFormatDate === value01.strFormatDate) {
                                        let V_CHILD_PERCENT = 0;
                                        let V_CHILD_PERCENT_F2 = 0;
                                        let V_CHILD_PERCENT_F3 = 0;

                                        if (value01.F1_TOTAL > 0) {
                                            V_CHILD_PERCENT = (value01.F1_TOTAL_STVAL1 * 100) / value01.F1_TOTAL;
                                        }

                                        if (value01.F2_F1_TOTAL_COMPLETED > 0) {
                                            V_CHILD_PERCENT_F2 = (value01.F2_TOTAL_MATCH_OVER50 * 100) / value01.F2_F1_TOTAL_COMPLETED;
                                        }

                                        if (value01.F3_F2_TOTAL_COMPLETED > 0) {
                                            V_CHILD_PERCENT_F3 = (value01.F3_TOTAL_COMPLETED * 100) / value01.F3_F2_TOTAL_COMPLETED;
                                        }

                                        dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                            strFormatDate: value01.strFormatDate,
                                            VALDATE: value01.VALDATE,
                                            CCUST: value01.CCUST,
                                            F1_TOTAL: value01.F1_TOTAL,
                                            F1_TOTAL_STVAL3: value01.F1_TOTAL_STVAL3,
                                            F1_TOTAL_STVAL1: value01.F1_TOTAL_STVAL1,
                                            F1_TOTAL_TAXES: value01.F1_TOTAL_TAXES,
                                            F1_TOTAL_ERROR: value01.F1_TOTAL_ERROR,
                                            F1_TOTAL_PENDING_TO_F2: value01.F1_TOTAL_PENDING_TO_F2,
                                            F1_PERCENT: V_CHILD_PERCENT.toFixed(2) + '%',

                                            F2_F1_TOTAL_COMPLETED: value01.F2_F1_TOTAL_COMPLETED,
                                            F2_TOTAL_PENDING_OVER50: value01.F2_TOTAL_PENDING_OVER50,
                                            F2_TOTAL_MATCH_OVER50: value01.F2_TOTAL_MATCH_OVER50,
                                            F2_PERCENT: V_CHILD_PERCENT_F2.toFixed(2) + '%',

                                            F3_F2_TOTAL_COMPLETED: value01.F3_F2_TOTAL_COMPLETED,
                                            F3_TOTAL_WO_ACC: value01.F3_TOTAL_WO_ACC,
                                            F3_TOTAL_COMPLETED: value01.F3_TOTAL_COMPLETED,
                                            F3_TOTAL_PENDING_SENT: value01.F3_TOTAL_PENDING_SENT,
                                            F3_TOTAL_COMPLETED_SAP: value01.F3_TOTAL_COMPLETED_SAP,
                                            F3_TOTAL_ERROR: value01.F3_TOTAL_ERROR,
                                            F3_PERCENT: V_CHILD_PERCENT_F3.toFixed(2) + '%',

                                            leaf: true
                                        });
                                    }
                                });

                                // Acumular global
                                F1_TOTAL_GLOBAL += V_F1_TOTAL;
                                F1_TOTAL_STVAL3_GLOBAL += V_F1_TOTAL_STVAL3;
                                F1_TOTAL_STVAL1_GLOBAL += V_F1_TOTAL_STVAL1;
                                F1_TOTAL_TAXES_GLOBAL += V_F1_TOTAL_TAXES;
                                F1_TOTAL_ERROR_GLOBAL += V_F1_TOTAL_ERROR;
                                F1_TOTAL_PENDING_TO_F2_GLOBAL += V_F1_PENDING_TO_F2;

                                F2_F1_TOTAL_COMPLETED_GLOBAL += V_F2_F1_TOTAL_COMPLETED;
                                F2_TOTAL_PENDING_OVER50_GLOBAL += V_F2_TOTAL_PENDING_OVER50;
                                F2_TOTAL_MATCH_OVER50_GLOBAL += V_F2_TOTAL_MATCH_OVER50;

                                F3_F2_TOTAL_COMPLETED_GLOBAL += V_F3_F2_TOTAL_COMPLETED;
                                F3_TOTAL_WO_ACC_GLOBAL += V_F3_TOTAL_WO_ACC;
                                F3_TOTAL_COMPLETED_GLOBAL += V_F3_TOTAL_COMPLETED;
                                F3_TOTAL_PENDING_SENT_GLOBAL += V_F3_TOTAL_PENDING_SENT;
                                F3_TOTAL_COMPLETED_SAP_GLOBAL += V_F3_TOTAL_COMPLETED_SAP;
                                F3_TOTAL_ERROR_GLOBAL += V_F3_TOTAL_ERROR;
                            }
                        });

                        // Calcular porcentaje global
                        let F1_PERCENT_GLOBAL = 0;
                        if (F1_TOTAL_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL = (F1_TOTAL_STVAL1_GLOBAL * 100) / F1_TOTAL_GLOBAL;
                        }

                        let F1_PERCENT_GLOBAL_F2 = 0;
                        if (F2_F1_TOTAL_COMPLETED_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL_F2 = (F2_TOTAL_MATCH_OVER50_GLOBAL * 100) / F2_F1_TOTAL_COMPLETED_GLOBAL;
                        }

                        let F1_PERCENT_GLOBAL_F3 = 0;
                        if (F3_F2_TOTAL_COMPLETED_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL_F3 = (F3_TOTAL_COMPLETED_GLOBAL * 100) / F3_F2_TOTAL_COMPLETED_GLOBAL;
                        }

                        // Crear el store
                        var storeTree = Ext.create('Ext.data.TreeStore', {
                            root: dataRoot
                        });

                        Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);

                        Ext.getCmp(prototype.id + '-F1_TOTAL_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_STVAL3_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_STVAL1_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_TAXES_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_TAXES_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_ERROR_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_ERROR_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_PERCENT_GLOBAL').setText(F1_PERCENT_GLOBAL.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-F1_TOTAL_PENDING_TO_F2_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_PENDING_TO_F2_GLOBAL, '0,000'));

                        Ext.getCmp(prototype.id + '-F2_TOTAL_GLOBAL').setText(Ext.util.Format.number(F2_F1_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F2_TOTAL_PENDING_OVER50_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F2_TOTAL_MATCH_OVER50_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_PERCENT_GLOBAL').setText(F1_PERCENT_GLOBAL_F2.toFixed(2) + '%');

                        Ext.getCmp(prototype.id + '-SENT_TOTAL_GLOBAL').setText(Ext.util.Format.number(F3_F2_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_WO_ACC_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_PERCENT_GLOBAL').setText(F1_PERCENT_GLOBAL_F3.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_SENT_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_PENDING_SENT_GLOBAL, '0,000'));

                        Ext.getCmp(prototype.id + '-SAP_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_COMPLETED_SAP_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-RETURN_ERROR_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_ERROR_GLOBAL, '0,000'));

                        // ==== F1 - Settlement ====
                        var totalsF1 = [];
                        if (typeof F1_PERCENT_GLOBAL !== 'undefined') {
                            totalsF1.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL, '0.00') + '%'
                            });
                            totalsF1.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL, '0.00') + '%'
                            });
                        }
                        var storeF1 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF1});
                        Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeF1);


                        // ==== F2 - Sales ====
                        var totalsF2 = [];
                        if (typeof F1_PERCENT_GLOBAL_F2 !== 'undefined') {
                            totalsF2.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL_F2,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL_F2, '0.00') + '%'
                            });
                            totalsF2.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL_F2,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL_F2, '0.00') + '%'
                            });
                        }
                        var storeF2 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF2});
                        Ext.getCmp(prototype.id + '-displayPolarF2').bindStore(storeF2);

                        // ==== Accounted ====
                        var totalsF3 = [];
                        if (typeof F1_PERCENT_GLOBAL_F3 !== 'undefined') {
                            totalsF3.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL_F3,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL_F3, '0.00') + '%'
                            });
                            totalsF3.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL_F3,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL_F3, '0.00') + '%'
                            });
                        }
                        var storeF3 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF3});
                        Ext.getCmp(prototype.id + '-displayPolarF3').bindStore(storeF3);

                    }
                }
            }
        });
        global.clear();
        this.getPaggin()
        var storeGridDatasPending = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMainPendingGraf'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0)
                        return;

                    let lstData = obj.data.items.map(v => v.data);
                    let dataRoot = {text: '.', expanded: true, children: []};

                    Ext.Array.each(lstData, function (value) {

                        let descError = value.DESCRIPTION_CERROR;

                        // 🔹 VALIDACIÓN: código vacío
                        if ((!value.CERROR || value.CERROR.trim() === '') &&
                                (!descError || descError.trim() === '')) {
                            descError = 'PENDIENTES SIN COMENTARIO';
                        }

                        dataRoot.children.push({
                            CERROR: value.CERROR,
                            DESCRIPTION_CERROR: descError,
                            QUANTITY: value.QUANTITY,
                            leaf: true
                        });
                    });

                    console.log(dataRoot, 'dataRoot');

                    let storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});

                    // ------------------ GRÁFICO ------------------
                    let chartData = [];
                    let totalPending = 0;
                    let totalCerradoAV = 0;

                    Ext.Array.each(lstData, function (v) {

                        let qty = v.QUANTITY || 0;
                        let cerror = v.CERROR || '';
                        let descError = v.DESCRIPTION_CERROR;

                        // 🔹 MISMA VALIDACIÓN PARA DESCRIPCIÓN
                        if (cerror.trim() === '' &&
                                (!descError || descError.trim() === '')) {
                            descError = 'PENDIENTES SIN COMENTARIO';
                        }

                        chartData.push({
                            strDescription: descError,
                            QUANTITY_OF_DEPOSITS: qty
                        });

                        // 🔹 TOTALES
                        if (cerror === '07') {
                            totalCerradoAV += qty;           // solo 07
                        } else {
                            totalPending += qty;             // todo menos 07
                        }
                    });

                    if (chartData.length === 0) {
                        chartData.push({strDescription: 'Not found', QUANTITY_OF_DEPOSITS: 1});
                    }

                    console.log(chartData, 'chartData');

                    let storeGraf3 = Ext.create('Ext.data.Store', {data: chartData});

                    let chart = Ext.getCmp(prototype.id + '-displayF1');

                    // ------------------ TÍTULO ------------------
                    chart.setCaptions({
                        title: {
                            alignTo: 'chart',
                            text:
                                    'Pending (Total: ' +
                                    Ext.util.Format.number(totalPending, '0,000') +
                                    ') - Cerrado por AV (Total: ' +
                                    Ext.util.Format.number(totalCerradoAV, '0,000') +
                                    ')',
                            fontSize: 22,
                            color: '#333',
                            fontWeight: 'bold'
                        }
                    });

                    chart.bindStore(storeGraf3);
                }

            }
        });
    },

    setFormatParameterARC: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayARC').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayARC').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
        me.bean.IN_COMAND = Ext.getCmp(prototype.id + '-cmbComand').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileARC').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataARC: function () {
        win.lblUser_toolTip("Estructura: MPF218");
        me.panelActual = '-panelGridDataARC';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchARC'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailARC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onViewCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const filename = data.NAMEFILE;

        if (!filename) {
            Ext.Msg.alert('Error', 'No se encontró el nombre del archivo.');
            return;
        }

        const imageUrl = prototype.url
                + '/getARCImage'
                + '?filename=' + encodeURIComponent(filename);

        Ext.create('Ext.window.Window', {
            title: 'ARC Image Viewer',
            modal: true,
            width: 1300,
            height: 800,
            layout: 'fit',
            items: [{
                    xtype: 'panel',
                    autoScroll: true,
                    bodyStyle: 'background:#000;',
                    items: [{
                            xtype: 'image',
                            src: imageUrl,
                            style: {
                                display: 'block',
                                transform: 'scale(1.4)', // 🔍 nivel de zoom
                                transformOrigin: 'top left', // 🎯 foco arriba izquierda
                                margin: '0'
                            }
                        }]
                }],
            buttons: [{
                    text: 'Close',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
        }).show();

    },
    onDownloadCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;

        const datePed = data.PEDARC;     // "25/12/07"  (YY/MM/DD)
        let filename = data.NAMEFILE;   // sin .txt

        if (!datePed || !filename) {
            Ext.Msg.alert(
                    'Error',
                    'Faltan parámetros para la descarga (Date PED, File Name).'
                    );
            return;
        }

        // PEDARC = YY/MM/DD
        const parts = datePed.split('/');

        if (parts.length !== 3) {
            Ext.Msg.alert('Error', 'Formato de fecha PED inválido: ' + datePed);
            return;
        }

        const year = '20' + parts[0];   // ✅ 25 → 2025

        // asegurar extensión .txt
        if (!filename.toLowerCase().endsWith('.txt')) {
            filename += '.txt';
        }

        const url = prototype.url + '/getTXTARC'
                + '?year=' + encodeURIComponent(year)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function () {
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridDataARC':
                global.getFile(prototype.url + '/getXLSXARC?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg({msg: 'Under Construction'});
        }
    },
    buildDate: function (y, m, d) {
        // Convertir a string y limpiar
        y = String(y || '').trim();
        m = String(m || '').trim();
        d = String(d || '').trim();

        if (!y)
            return '';

        // Asegurar que mes tenga 2 dígitos si existe
        if (m) {
            m = m.padStart(2, '0');
            // Asegurar que día tenga 2 dígitos si existe
            if (d) {
                d = d.padStart(2, '0');
            }
        }

        return y + m + d;
    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual, 'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridSumaryMain':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataARC':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                me.pagginActual = '-paggin';
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginacion ">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboFromYearARC: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearARC');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearARC');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthARC');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonthARC: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayARC: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayARC');
        comboToDay.setValue(obj.getValue());
    },
    getPeriodoYYYYMM: function (strFormatDate) {
        if (!strFormatDate)
            return null;

        let [anio, mesTxt] = strFormatDate.split('-');
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return anio + (meses[mesTxt] || '00');
    },
    onUpperValue: function (obj, e, eOpts) {
        let value = obj.getValue().toUpperCase();
        obj.setValue(value);
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    // </editor-fold>
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onDownloadCSV: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const country = data.COUNTRY;
        const dateSett = data.DATESETT;
        const customer = data.CUSTOMER;
        const filename = data.NAMEFILE;

        if (!country || !dateSett || !customer) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Country, Customer o Settlement Date).');
            return;
        }

        const url = prototype.url + '/getCSV'
                + '?country=' + encodeURIComponent(country)
                + '&dateSett=' + encodeURIComponent(dateSett)
                + '&customer=' + encodeURIComponent(customer)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    onDownloadAllCSV: function () {
        let me = this;
        let url = null;

        switch (me.panelActual) {

            case '-panelGridDataDetail': // BSP
                console.log('ZIP BSP permitido');
                url = prototype.url + '/getBulkCSV';
                break;

            case '-panelGridDataARC': // ARC
                console.log('ZIP ARC permitido');
                url = prototype.url + '/getBulkTXTARC';
                break;

            default:
                global.Msg({msg: 'Under Construction'});
                return;
        }

        if (!searchParams || !searchParams.beanString) {
            Ext.Msg.alert(
                    "Error",
                    "Debe realizar una búsqueda antes de descargar."
                    );
            return;
        }

        console.log("Solicitando ZIP con filtros:", searchParams);
        console.log("Endpoint:", url);

        me.getFileByPost(url, {
            beanString: searchParams.beanString
        });
    },
    getFileByPost: function (url, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", url);
        form.setAttribute("target", "_blank");

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
        form.remove();
    }
}
);