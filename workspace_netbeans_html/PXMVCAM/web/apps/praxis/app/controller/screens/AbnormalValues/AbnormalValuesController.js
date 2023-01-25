Ext.define('Ext.Praxis.controller.screens.AbnormalValues.AbnormalValuesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AbnormalValuesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    lstCountry: [],
    bean: {},
    dataObtain: {},
    store_Sales: '',
    store_Refund: '',
    tab_Actual: '',
    _path: '',
    // </editor-fold>
    init: function (view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
//        prototype.id = 'AbnormalValuesForm';
//        prototype.url = CONTEXTPATH+'/AbnormalValues';
//        prototype.widthContenedor = 1200;
//        prototype.widthGrid = 1147;
        // </editor-fold>
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AbnormalValuesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#AbnormalValuesForm-btnSearch': {
                click: this.imgSearch_clickHandler
            },
            '#AbnormalValuesForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
        });

        this.setStoreData();
    },
    afterRender: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateFromDay', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbDateToDay', '');
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function () {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function () {

        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());

        var comboToMonth2 = Ext.getCmp(prototype.id + '-cmbDateToMonth2');
        comboToMonth2.setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue());
    },
    cbxDateFromDay_changeHandler: function () {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);


        Ext.getCmp(prototype.id + '-cmbDateFromYear2').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear2').bindStore(storeComboDataYear);

        Ext.getCmp(prototype.id + '-cmbDateFromMonth2').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth2').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromDay2').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay2').bindStore(storeComboDataDay);


        var cmbTran = Ext.getCmp(prototype.id + '-cmbTran');
        cmbTran.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ACMS", "ACM"],
                ["ADMS", "ADM"],
                ["EXCH", "EXCH"],
                ["RFND", "RFND"],
                ["SALE", "SALE"]
            ]
        }));
        cmbTran.setValue("");

        me.store_Sales = (Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                [1, "Clearing Date"], [2, "Invoice Date"]
            ]
        }));

        me.store_Refund = (Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["FPRDA", "Processing Date"],
                ["RDATE", "Accounting Date"]
            ]
        }));


        this.dataObtain.COUNTRY = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.lstCountry = res.lstCountry;
                    Ext.getCmp(prototype.id + '-cmbPais').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbPais').setValue('');

                    //me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });

    },
    changeTipoFecha: function () {
        if (this.getValue("cmbFecha") == 2) {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').show();
            Ext.getCmp(prototype.id + '-cmbDateToDay').show();
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').hide();
            Ext.getCmp(prototype.id + '-cmbDateToDay').hide();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    changeOptionsTab_clickHandler: function (obj) {
        this.hidePagination_clickHandler();
        
        Ext.getCmp(prototype.id + '-txtCia').setDisabled(false);
        if (obj === prototype.id + '-ScrAVSales_tab' && me.tab_Actual !== obj) {

            Ext.getCmp(prototype.id + '-boxSearchFilter').show();
            Ext.getCmp(prototype.id + '-boxSearchIATA').hide();

            Ext.getCmp(prototype.id + '-cmbFecha').bindStore(me.store_Sales);
            Ext.getCmp(prototype.id + '-cmbFecha').setValue(1);

        } else if (obj === prototype.id + '-ScrDBIataControl_tab' && me.tab_Actual !== obj) {
            Ext.getCmp(prototype.id + '-boxSearchFilter').hide();
            Ext.getCmp(prototype.id + '-boxSearchIATA').show();
        } else if (obj === prototype.id + '-ScrDifferenceFare_tab' && me.tab_Actual !== obj) {
            Ext.getCmp(prototype.id + '-txtCia').setDisabled(true);
            Ext.getCmp(prototype.id + '-boxSearchIATA').hide();
            Ext.getCmp(prototype.id + '-boxSearchFilter').show();            
        }        
        else if (obj === prototype.id + '-ScrRefund_tab' && me.tab_Actual !== obj) {
            Ext.getCmp(prototype.id + '-txtCia').setDisabled(true);
            Ext.getCmp(prototype.id + '-boxSearchFilter').show();
            Ext.getCmp(prototype.id + '-boxSearchIATA').hide();

            Ext.getCmp(prototype.id + '-cmbFecha').bindStore(me.store_Refund);
            Ext.getCmp(prototype.id + '-cmbFecha').setValue("FPRDA");

        } else if (obj === prototype.id + '-ScrExchangeAnalisis_tab' && me.tab_Actual !== obj) {
            Ext.getCmp(prototype.id + '-txtCia').setDisabled(true);
            Ext.getCmp(prototype.id + '-boxSearchFilter').show();
            Ext.getCmp(prototype.id + '-boxSearchIATA').hide();

            Ext.getCmp(prototype.id + '-cmbFecha').bindStore(me.store_Refund);
            Ext.getCmp(prototype.id + '-cmbFecha').setValue("FPRDA");

        }
        me.tab_Actual = obj;
//        this.imgSearch_clickHandler();
    },
    imgSearch_clickHandler: function (obj, e) {
        /*Activar Tab*/
        var id_tab = Ext.getCmp(prototype.id + '-tabMain').activeTab.id;
        this.changeOptionsTab_clickHandler(id_tab);


        this.bean = {};
//        console.log('imgSearch_clickHandler Principal');
        this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
        this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
        this.bean.PAGROW = 20;
        this.bean.IN_TIPOFECHA = this.getValue("cmbFecha");

        console.log(this.bean);


        /*Obtener controlador de pestaña y ejecutar search */
        var component = Ext.getCmp(id_tab.replace('_tab', '_screen'));
        var controller = component.getController();
        controller.btnSearch_click(this.bean);
    },
    search: function (bean) {
//        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
//            proxy: {
//                url: prototype.url+'/search'
//            },
//            listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = bean;
//                },
//                load: function(obj, obj2, success, obj4, obj5) {
//                    win.lblUser_toolTip("Estructura: A1849");
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found'
//                        });
//                    }
//                    global.clear();
//                }
//            }
//        });
//        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
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

        if (tab_id === prototype.id + '-ScrAVSales_tab') {

            component = Ext.getCmp(prototype.id + '-ScrAVSales_screen');

        } else if (tab_id === prototype.id + '-ScrDBIataControl_tab') {

            component = Ext.getCmp(prototype.id + '-ScrDBIataControl_screen');

        } else if (tab_id === prototype.id + '-ScrRefund_tab') {

            component = Ext.getCmp(prototype.id + '-ScrRefund_screen');
        } else if (tab_id === prototype.id + '-ScrOALParticipation_tab') {

            component = Ext.getCmp(prototype.id + '-ScrOALParticipation_screen');

        } else if (tab_id === prototype.id + '-ScrDifferenceFare_tab') {

            component = Ext.getCmp(prototype.id + '-ScrDifferenceFare_screen');
        } else if (tab_id === prototype.id + '-ScrCreditCardAnalisis_tab') {

            component = Ext.getCmp(prototype.id + '-ScrCreditCardAnalisis_screen');
        } else if (tab_id === prototype.id + '-ScrExchangeAnalisis_tab') {

            component = Ext.getCmp(prototype.id + '-ScrExchangeAnalisis_screen');
        }


        var controller = component.getController();
        controller.imgBack_clickHandler();

//        global.showMenu();
    },
    // </editor-fold>

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

//        if(tab_id === prototype.id + '-ScrAVSales_tab'){
//            
//            component = Ext.getCmp(prototype.id + '-ScrAVSales_screen');
//            
//        }else if(tab_id === prototype.id + '-ScrDBIataControl_tab'){
//            
//            component = Ext.getCmp(prototype.id + '-ScrDBIataControl_screen');
//        }

        component = Ext.getCmp(tab_id.replace('_tab', '_screen'));

        return component;
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
            this.imgSearch_clickHandler();
        }
    },
    // </editor-fold>,
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual);
        switch (me.panelActual) {
            case '-boxDetDataS':
                me.pagginActual = '-paggin';
                break;
            case '-boxByWeek':
                me.pagginActual = '-pagginRefundCC';
                break;
            case '-boxDetData':
                me.pagginActual = '-pagginSrcExchange';
                break;
            case '-boxDetailOAL':
                me.pagginActual = '-pagginSrcDetailOAL';
                break;
        }
    },
    // </editor-fold>,
    // <editor-fold defaultstate="collapsed" despagginActualc="Funciones para la paginación">
    pagFirst: function (obj, e) {
//        Ext.getCmp(prototype.id + '-paggin').moveFirst();
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
//        Ext.getCmp(prototype.id + '-paggin').movePrevious();
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
//        Ext.getCmp(prototype.id + '-paggin').moveNext();
        this.getPaggin();
        console.log('----->' + prototype.id + me.pagginActual);
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
//        Ext.getCmp(prototype.id + '-paggin').moveLast();
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    },
    // </editor-fold>
});
