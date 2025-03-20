Ext.define('Ext.Praxis.controller.payments.FiduciaryAlerts.FiduciaryAlertsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FiduciaryAlertsController',
    fecha: new Date(),
    objA3096: {},
    bean: {},
    beanTicket: {},
    beanExcel: {},
    beanDetDay: {},
    beanDebits: {},
    loadDate: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    me: '',
    childs: '',
    drillDown: [],
    gridActual: '-boxMainData',
    boxActual: '-panelGridDataMain',
    pagginActual: '-paggin',
    user: '',
    columnCode: '',
    init: function (view) {
        me = this;
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        prototype.urlBank = CONTEXTPATH + '/BankReconciliation';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log(this.childS, 'HIJOSSSS')
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FiduciaryAlertsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#FiduciaryAlertsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FiduciaryAlertsForm-btnClear': {
                click: this.btnClear_click
            },
            '#FiduciaryAlertsForm-btnBack': {
                click: this.btnBack_click
            },
            '#FiduciaryAlertsForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#FiduciaryAlertsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FiduciaryAlertsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FiduciaryAlertsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FiduciaryAlertsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#FiduciaryAlertsForm-btnTxtLayoutBsplink': {
                click: this.btnTxtLayoutBsplink
            },
            '#FiduciaryAlertsForm-btnTxtLayoutBsplink_UATP': {
                click: this.btnTxtLayoutBsplink_UATP
            },
            '#FiduciaryAlertsForm-btnTxtLayoutBsplink_UATPUnif': {
                click: this.btnTxtLayoutBsplink_UATPUnif
            },
            '#FiduciaryAlertsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FiduciaryAlertsForm-btnLog': {
                click: this.executeLog
            },
            '#FiduciaryAlertsForm-btnExcelLog': {
                click: this.btnExcelLog_click
            },
        });

    },
    init_this: function () {
        me = this;
    },
    xpanel_afterrender: function (obj, e) {

        Ext.getCmp(prototype.id + '-rbChart_IA').items.items[0].setValue(true);
        Ext.getCmp(prototype.id + '-rbChart_IA').cheked = true;

        this.setStoreData();
        this.btnSearch_click();
    },
    setStoreData: function () {
        // Obtener la fecha de ayer
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 4);

        var month = yesterday.getMonth() + 1;
        var day = yesterday.getDate();
        var year = yesterday.getFullYear();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYearVa').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDayVa').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYearVa').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDayVa').setValue(day);

        this.paramsObtainData.COREP = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstProcessor = res.lstProcessor;
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: lstProcessor,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
            }
        });
    },
    onChangeRadio: function () {

        var valueRadio = Ext.getCmp(prototype.id + '-rbChart_IA').getValue().rb;
        console.log(valueRadio);
        switch (valueRadio) {
            case 'rbc1_IA':
                this.setFormatParameterMain();
                this.searchMain();
                break;
            case 'rbc2_IA':
                this.setFormatParameter();
                this.search();
                break;
        }
    },
    btnSearch_click: function () {
        this.onChangeRadio();
    },
    setFormatParameterMain: function () {

        me.bean = {};

        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getValueDate = Ext.getCmp(prototype.id + '-cmbDateFromYearVa').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDayVa').getValue();
        let getNumberAccount = Ext.getCmp(prototype.id + '-numberAccount').getValue();
        let getProcessor = Ext.getCmp(prototype.id + '-cmbCOREP').getValue().length == 0 ? '' : this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbCOREP'));

        me.bean.IN_CCUST = getCustomer;
        me.bean.IN_NUMBER_ACCOUNT = getNumberAccount;
        me.bean.IN_VALUE_DATE = getValueDate;
        me.bean.IN_PROCESSOR = getProcessor;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'me.bean')

    },
    setFormatParameter: function () {

        me.bean = {};

        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getSaleDate = Ext.getCmp(prototype.id + '-cmbDateFromYearVa').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDayVa').getValue();
        let getNumberAccount = Ext.getCmp(prototype.id + '-numberAccount').getValue();
        let getProcessor = Ext.getCmp(prototype.id + '-cmbCOREP').getValue().length == 0 ? '' : this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbCOREP'));

        me.bean.IN_CCUST = getCustomer;
        me.bean.IN_NUMBER_ACCOUNT = getNumberAccount;
        me.bean.IN_SALES_DATE = getSaleDate;
        me.bean.IN_PROCESSOR = getProcessor;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'me.bean')

    },
    searchMain: function () {

        let lstData = []

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMain'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                    console.log(obj, 'obj')
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    console.log(pagData, 'pagData')

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
        Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    search: function () {

        let lstData = []

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                    console.log(obj, 'obj')
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    console.log(pagData, 'pagData')

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
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    showGrid: function (nameGrid) {

        if (me.drillDown.indexOf(nameGrid) === -1) {
            var paginacion = Ext.getCmp(prototype.id + '-boxPag');
            //Mostrar paginacion
            if (nameGrid === '-vskMain')
            {
                paginacion.setVisible(true);
            } else {
                paginacion.setVisible(false);
            }

            me.drillDown.push(nameGrid);
            Ext.getCmp(prototype.id + me.boxActual).hide();
            me.boxActual = nameGrid;
            Ext.getCmp(prototype.id + me.boxActual).show();
            console.log(me.drillDown, 'me.drillDown')
        }
    },
    btnExcel_click: function () {

        Ext.Msg.show({
            title: '.:PRAXISEX:.',
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
        console.log(this.boxActual, 'this.boxActual')
        console.log(me.boxActual, 'this.boxActual')
        console.log(me.panelActual, 'this.panelActual')
//        me.pagginActual = '';
        switch (me.panelActual) {
            case '-panelGridDataMain':
                this.setFormatParameterMain();
                global.getFile(prototype.url + '/getXLSXMain?beanString=' + encodeURI(me.searchParams.beanString));
                break;
            case '-panelGridData':
                this.setFormatParameter();
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(me.searchParams.beanString));
                break;
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case '-panelGridDataMain':
                me.pagginActual = '-paggin1';
                break;
            case '-panelGridData':
                me.pagginActual = '-paggin2';
                break;
        }
    },
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
        console.log(this.getPaggin(), 'this.getPaggin')
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        console.log(pag, 'pag')
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    goURLpost: function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    joinMultiSelect: function (element) {
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
            console.log('NIKAAAAAAAAAA')
        } else {
            var pagData = paggin.getPageData();
            console.log('selectedChild');
            console.log(padre + child + add);
            console.log(Ext.getCmp(prototype.id + '-paggin9'));
            console.log(paggin);
            console.log(pagData);

            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);

            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-boxPagDetail').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + child).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
});