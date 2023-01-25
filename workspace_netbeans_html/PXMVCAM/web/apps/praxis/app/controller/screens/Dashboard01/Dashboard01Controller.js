Ext.define('Ext.Praxis.controller.screens.Dashboard01.Dashboard01Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard01Controller',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    lstCountry: [],
    lstAIRLINE: [],
    bean: {},
    beanFlown: {},
    dataObtain: {},
    screen_actual: '',
    _path: '',
    // </editor-fold>
    init: function (view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
//        prototype.id = 'Dashboard01Form';
//        prototype.url = CONTEXTPATH+'/Dashboard01';
//        prototype.widthContenedor = 1200;
//        prototype.widthGrid = 1147;
        // </editor-fold>
        this.control({
            // -------------------Eventos Genericos --------------------
            '#Dashboard01Form-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#Dashboard01Form-btnSearch': {
                click: this.imgSearch_clickHandler
            },
            '#Dashboard01Form-btnClear': {
                click: this.btnClear_click
            },
            '#Dashboard01Form-btnExcel': {
                click: this.exportExcel
            },
            '#Dashboard01Form-btnFilter': {
                click: this.btnFilter_click
            },
            '#Dashboard01Form-btnDisplay': {
                click: this.btnDisplay_click
            },
            '#Dashboard01Form-btnAdd': {
                click: this.btnAdd_click
            },
            '#Dashboard01Form-btnBack': {
                click: this.btnBack_click
            },
            '#Dashboard01Form-btnSearch_2': {
                click: this.imgSearch_clickHandler
            },
            '#Dashboard01Form-btnClear_2': {
                click: this.btnClear_click
            },
            '#Dashboard01Form-btnExcel_2': {
                click: this.exportExcel
            },
            '#Dashboard01Form-btnFilter_2': {
                click: this.btnFilter_click
            },
            '#Dashboard01Form-btnDisplay_2': {
                click: this.btnDisplay_click
            },
            '#Dashboard01Form-btnAdd_2': {
                click: this.btnAdd_click
            },
            '#Dashboard01Form-btnBack_2': {
                click: this.btnBack_click
            },
//            '#Dashboard01Form-btn-pag-first': {
//                click: this.pagFirst
//            },
//            '#Dashboard01Form-btn-pag-previous': {
//                click: this.pagPrevious
//            },
//            '#Dashboard01Form-btn-pag-next': {
//                click: this.pagNext
//            },
//            '#Dashboard01Form-btn-pag-last': {
//                click: this.pagLast
//            },
            '#Dashboard01Form-cbCollection': {
                change: this.checInterlineakEvent
            },
            '#Dashboard01Form-btnBack_chartSales': {
                click: this.btnDisplay_click
            },
            '#Dashboard01Form-btnBack_chartInter': {
                click: this.btnDisplay_click
            },
            '#Dashboard01Form-btnBack_chartFlown': {
                click: this.btnDisplay_click
            },
        });

//        this.setStoreData();
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
    },
    setStoreData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbFADateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbFADateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromYear_INT').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear_INT').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromYear_EMD').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear_EMD').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromYear_EXP').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear_EXP').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbFADateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbFADateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth_INT').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth_INT').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth_EMD').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth_EMD').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth_EXP').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth_EXP').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbFADateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbFADateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateFromDay_EMD').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay_EMD').bindStore(storeComboDataDay);

        var cmbSelectBy = Ext.getCmp(prototype.id + '-cmbSelectBy');
        cmbSelectBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['1', "Totals per Month"],
                ['2', "Country of Sale"],
                ['3', "City of Sale"],
                ['4', "City Pair"],
                ['5', "Sales by Agent"],
                ['6', "Alliances"],
                ['7', "Totals by Channel"],
                ['8', "Totals by Cabin"],
                ['10', "Fare Type"],
                ['11', "Routing Type"],
                ['17', "GDS"],
                ['18', "Comparison by Years"],
                ['19', "Comparison by Days"]
            ]
        }));
        cmbSelectBy.setValue("1");

        var cmbFASelectBy = Ext.getCmp(prototype.id + '-cmbFASelectBy');
        cmbFASelectBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['1', "Totals per Month"],
            ]
        }));
        cmbFASelectBy.setValue("1");

        var cmbTran = Ext.getCmp(prototype.id + '-cmbTran');
        cmbTran.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ACMS", "ACMS"],
                ["ADMS", "ADMS"],
                ["EXCH", "EXCH"],
                ["RFND", "RFND"],
                ["SALE", "SALE"]
            ]
        }));
        cmbTran.setValue("");

        var cmbTop = Ext.getCmp(prototype.id + '-cmbTop');
        cmbTop.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "10"],
                ["2", "20"],
                ["3", "30"]
            ]
        }));
        cmbTop.setValue("");

        var cmbFATop = Ext.getCmp(prototype.id + '-cmbFATop');
        cmbFATop.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "10"],
                ["2", "20"],
                ["3", "30"]
            ]
        }));
        cmbFATop.setValue("");

        var cmbPeriodo = Ext.getCmp(prototype.id + '-cmbPERNUM_INT');
        cmbPeriodo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01"],
                ["02", "02"],
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPeriodo.setValue("");

        this.dataObtain.COUNTRY = 2;
        this.dataObtain.AIRLINE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                me.lstCountry = res.lstCountry;
                me.lstAIRLINE = res.lstAIRLINE;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                var storeDataAirline = Ext.create('Ext.data.Store', {
                    data: me.lstAIRLINE,
                    autoLoad: false
                });

                Ext.getCmp(prototype.id + '-cmbPais').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbPais').setValue('');

                Ext.getCmp(prototype.id + '-cmbFAPais').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbFAPais').setValue('');

                Ext.getCmp(prototype.id + '-cmbCountry_EXP').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry_EXP').setValue('');

                Ext.getCmp(prototype.id + '-cmbAirline_INT').bindStore(storeDataAirline);
                Ext.getCmp(prototype.id + '-cmbAirline_INT').setValue('');


                me.changeTab_clickHandler(prototype.id + '-SalesAnalysis_tab');
            }
        });

    },
    afterRender: function () {
        me.screen_actual = prototype.id + '-SalesAnalysis_tab';
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateFromDay', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbDateToDay', '');

        //FLOWN
        this.setValue('cmbFADateFromYear', new Date().getFullYear());
        this.setValue('cmbFADateToYear', new Date().getFullYear());
        this.setValue('cmbFADateFromMonth', '');
        this.setValue('cmbFADateFromDay', '');
        this.setValue('cmbFADateToMonth', '');
        this.setValue('cmbFADateToDay', '');

        //INTERLINEA
        this.setValue('cmbDateFromYear_INT', new Date().getFullYear());
        this.setValue('cmbDateToYear_INT', new Date().getFullYear());
        this.setValue('cmbDateFromMonth_INT', '');
        this.setValue('cmbDateToMonth_INT', '');

        //EMD
        this.setValue('cmbDateFromYear_EMD', new Date().getFullYear());
        this.setValue('cmbDateToYear_EMD', new Date().getFullYear());
        this.setValue('cmbDateFromMonth_EMD', '');
        this.setValue('cmbDateToMonth_EMD', '');
        this.setValue('cmbDateFromDay_EMD', '');
        this.setValue('cmbDateToDay_EMD', '');
        
        //EXPIRED
        this.setValue('cmbDateFromYear_EXP', new Date().getFullYear());
        this.setValue('cmbDateToYear_EXP', new Date().getFullYear());
        this.setValue('cmbDateFromMonth_EXP', '');
        this.setValue('cmbDateToMonth_EXP', '');

//        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function () {
        switch (me.screen_actual) {
            case  prototype.id + '-SalesAnalysis_tab':
            case  prototype.id + '-ScrDBIataControl_tab':
                this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
                break
            case  prototype.id + '-FlownAnalysis_tab':
                this.setValue('cmbFADateToYear', this.getValue("cmbFADateFromYear"));
                break
            case  prototype.id + '-ScrInterline_tab':
                this.setValue('cmbDateToYear_INT', this.getValue("cmbDateFromYear_INT"));
                break
            case  prototype.id + '-ScrEMD_tab':
                this.setValue('cmbDateToYear_EMD', this.getValue("cmbDateFromYear_EMD"));
                break
            case  prototype.id + '-ScrExpired_tab':
                this.setValue('cmbDateToYear_EXP', this.getValue("cmbDateFromYear_EXP"));
                break
        }

    },
    cbxDateFromMonth_changeHandler: function () {
        switch (me.screen_actual) {
            case  prototype.id + '-SalesAnalysis_tab':
            case  prototype.id + '-ScrDBIataControl_tab':
                this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
                break
            case  prototype.id + '-FlownAnalysis_tab':
                this.setValue('cmbFADateToMonth', this.getValue("cmbFADateFromMonth"));
                break
            case  prototype.id + '-ScrInterline_tab':
                this.setValue('cmbDateToMonth_INT', this.getValue("cmbDateFromMonth_INT"));
                break
            case  prototype.id + '-ScrEMD_tab':
                this.setValue('cmbDateToMonth_EMD', this.getValue("cmbDateFromMonth_EMD"));
                break
            case  prototype.id + '-ScrExpired_filter':
                this.setValue('cmbDateToMonth_EXP', this.getValue("cmbDateFromMonth_EXP"));
                break
        }

    },
    cbxDateFromDay_changeHandler: function () {
        if (me.screen_actual === prototype.id + '-ScrEMD_tab') {
            this.setValue('cmbDateToDay_EMD', this.getValue("cmbDateFromDay_EMD"));
        } else {
            this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
        }
    },
    changeTipoFecha: function () {
        if (this.getValue("cmbFecha") === 2) {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').show();
            Ext.getCmp(prototype.id + '-cmbDateToDay').show();
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').hide();
            Ext.getCmp(prototype.id + '-cmbDateToDay').hide();
        }
    },
    checInterlineakEvent: function () {
        this.changeTab_clickHandler(me.screen_actual);
    },
    changeTab_clickHandler: function (name_tab) {
        me.bean = {};
        console.clear();
        console.log(name_tab);
        
        this.hidePagination_clickHandler();

        me.hideFilters();
        me.screen_actual = name_tab;

        var component = Ext.getCmp(name_tab.replace('_tab', '_screen'));
        var controller = component.getController();

        switch (name_tab) {
            case  prototype.id + '-SalesAnalysis_tab':
                Ext.getCmp(prototype.id + '-SalesAnalysis_filter').show();
                controller.inicio();
                break;

            case  prototype.id + '-ScrDBIataControl_tab':
                Ext.getCmp(prototype.id + '-SalesAnalysis_filter').show();
                break;

            case  prototype.id + '-FlownAnalysis_tab':
                Ext.getCmp(prototype.id + '-FlownAnalysis_filter').show();
                controller.inicio();
                break;

            case  prototype.id + '-ScrInterline_tab':
                Ext.getCmp(prototype.id + '-ScrInterline_filter').show();
                controller.inicio();
                break;
            case  prototype.id + '-ScrEMD_tab':
                Ext.getCmp(prototype.id + '-ScrEMD_filter').show();
                controller.inicio();
                break;
            case  prototype.id + '-ScrExpired_tab':
                Ext.getCmp(prototype.id + '-ScrExpired_filter').show();
                controller.inicio();
                break;
        }

    },
    hideFilters: function () {
        Ext.getCmp(prototype.id + '-SalesAnalysis_filter').hide();
        Ext.getCmp(prototype.id + '-FlownAnalysis_filter').hide();
        Ext.getCmp(prototype.id + '-ScrInterline_filter').hide();
        Ext.getCmp(prototype.id + '-ScrEMD_filter').hide();
        Ext.getCmp(prototype.id + '-ScrExpired_filter').hide();
    },
    imgSearch_clickHandler: function (obj, e) {
        this.changeTab_clickHandler(Ext.getCmp(prototype.id + '-tabMain').activeTab.id);
    },
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1849");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    imgFilter_clickHandler: function () {
        console.log('imgFilter_clickHandler');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function (obj, e) {
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
    imgClear_clickHandler: function (obj, e) {
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    imgBack_clickHandler: function () {

        var tab_id = Ext.getCmp(prototype.id + '-tabMain').activeTab.id;
        var component = null;

        if (tab_id === prototype.id + '-SalesAnalysis_tab') {

            component = Ext.getCmp(prototype.id + '-SalesAnalysis_screen');

        } else if (tab_id === prototype.id + '-FlownAnalysis_tab') {

            component = Ext.getCmp(prototype.id + '-FlownAnalysis_screen');
        } else if (tab_id === prototype.id + '-ScrExpired_tab') {

            component = Ext.getCmp(prototype.id + '-ScrExpired_screen');
        }

        var controller = component.getController();
        controller.imgBack_clickHandler();

//        global.showMenu();
    },
    exportExcel: function () {
//        global.getFile(_path);
        var component = this.getComponentByTab();
        if (component !== null) {
            var controller = component.getController();
            controller.imgExcel_clickHandler();
        }


    },
    getComponentByTab: function () {

        var tab_id = Ext.getCmp(prototype.id + '-tabMain').activeTab.id;
        var component = null;

//        if(tab_id === prototype.id + '-SalesAnalysis_tab'){
//            
//            component = Ext.getCmp(prototype.id + '-SalesAnalysis_screen');
//            
//        }else if(tab_id === prototype.id + '-FlownAnalysis_tab'){
//            
//            component = Ext.getCmp(prototype.id + '-FlownAnalysis_screen');
//        }

        component = Ext.getCmp(tab_id.replace('_tab', '_screen'));

        return component;
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    },
    btnDisplay_click: function () {
        this.hidePagination_clickHandler();
        var panelTab = Ext.getCmp(prototype.id + '-panelTabs');
        var panelChart = Ext.getCmp(prototype.id + '-panelChart');
        if (panelTab.isVisible()) {
            panelTab.hide();
            panelChart.show();
            //Esto es temporal, hasta que se implementen todos los graficos de las pestañas
            if (!this.showCurrentChart()) {
                panelTab.show();
                panelChart.hide();
            }


        } else {
            panelTab.show();
            panelChart.hide();
        }
    },
    showCurrentChart: function () {
        var isOK = true;
        this.hidePanelsChart();
        me.screen_actual=Ext.getCmp(prototype.id + '-tabMain').activeTab.id;
        switch (me.screen_actual) {

            case prototype.id + '-SalesAnalysis_tab' :
                Ext.getCmp(prototype.id + '-panelChartSales').show();
                break;
            case prototype.id + '-FlownAnalysis_tab' :
                Ext.getCmp(prototype.id + '-panelChartFlown').show();
                meFChart.inicio2();
                break;
            case prototype.id + '-ScrInterline_tab' :
                Ext.getCmp(prototype.id + '-panelChartInterline').show();
                break;
        }

        return isOK;

    },
    hidePanelsChart: function () {

        Ext.getCmp(prototype.id + '-panelChartInterline').hide();
        Ext.getCmp(prototype.id + '-panelChartSales').hide();
        Ext.getCmp(prototype.id + '-panelChartFlown').hide();

    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    // </editor-fold>,
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual);
        switch (me.panelActual) {
            case '-BoxDetGDSAgte':
                me.pagginActual = '-pagginGDS';
                break;
            case '-BoxDetGDSTkt':
                me.pagginActual = '-pagginGDStkt';
                break;
            case '-BoxCabin':
                me.pagginActual = '-pagginCabin';
                break;
            case '-BoxDetAgenteAlliances':
                me.pagginActual = '-pagginAlliance';
                break;
            case '-BoxDetRouting':
                me.pagginActual = '-pagginRoutingType';
                break;
            case '-BoxDDTMDetailbyAgent':
                me.pagginActual = '-paggin_loadSalesAgent';
                break;
            case '-boxFlownAnalysis':
                me.pagginActual = '-paggin_searchFlownFlight';
                break;
            case '-boxByCityPair':
                me.pagginActual = '-paggin_searchByCityPair';
                break;
            case '-BoxCityPair':
                me.pagginActual = '-paggin_loadCityPair';
                break;
            case '-boxDetailData':
                me.pagginActual = '-paggin_searchDetail';
                break;
            case '-boxCoupon':
                me.pagginActual = '-paggin_searchDetByCoupon';
                break;
            case '-boxDetailByCabin':
                me.pagginActual = '-paggin_searchByCabin';
                break;
            case '-boxByFlightProfitability':
                me.pagginActual = '-paggin_searchByFlightProfitability';
                break;
        }      
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
//        Ext.getCmp(prototype.id + '-paggin').moveFirst();
    },
    pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
//        Ext.getCmp(prototype.id + '-paggin').movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        console.log(me.pagginActual);
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
//        Ext.getCmp(prototype.id + '-paggin').moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
//        Ext.getCmp(prototype.id + '-paggin').moveLast();
    }
    // </editor-fold>
});
