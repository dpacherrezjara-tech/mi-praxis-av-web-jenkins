Ext.define('Ext.Praxis.controller.interline.ValidationInterfaces.ValidationInterfacesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ValidationInterfacesController',
    fecha: new Date(),
    objA3096: {},
    bean: {},
    beanTicket: {},
    beanExcel: {},
    loadDate: '',
    searchParams: {},
    me: '',
    drillDown: [],
    gridActual: '-boxMainData',
    boxActual: '-vskMain',
    pagginActual: '-paggin',
    user: '',
    columnCode: '',
    init: function (view) {
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ValidationInterfacesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ValidationInterfacesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ValidationInterfacesForm-btnClear': {
                click: this.btnClear_click
            },
            '#ValidationInterfacesForm-btnBack': {
                click: this.btnBack_click
            },
            '#ValidationInterfacesForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ValidationInterfacesForm-cmbDateToYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ValidationInterfacesForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ValidationInterfacesForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#ValidationInterfacesForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#ValidationInterfacesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ValidationInterfacesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ValidationInterfacesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ValidationInterfacesForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ValidationInterfacesForm-btnTxtLayoutBsplink': {
                click: this.btnTxtLayoutBsplink
            },
            '#ValidationInterfacesForm-btnTxtLayoutBsplink_UATP': {
                click: this.btnTxtLayoutBsplink_UATP
            },
            '#ValidationInterfacesForm-btnTxtLayoutBsplink_UATPUnif': {
                click: this.btnTxtLayoutBsplink_UATPUnif
            },
            '#ValidationInterfacesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ValidationInterfacesForm-btnLog': {
                click: this.executeLog
            },
            '#ValidationInterfacesForm-btnExcelLog': {
                click: this.btnExcelLog_click
            },
        });

    },
    init_this: function () {
        me = this;
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        this.btnSearch_click();
    },
    setStoreData: function () {
        // Obtener la fecha de ayer
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

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

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue(day); // Ahora se establece el día de ayer
    },
    btnSearch_click: function () {
        this.setFormatParameter();
        this.search();
    },
    setFormatParameter: function () {
        me.bean = {};
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getInterface = Ext.getCmp(prototype.id + '-interface').getValue();
        let getReferencia = Ext.getCmp(prototype.id + '-referencia').getValue();
        let getExtractionDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue()+
                                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        
        me.bean.IN_CCUST = getCustomer;
        me.bean.IN_EXTRACTION_DATE = getExtractionDate;
        me.bean.IN_INTERFACE = getInterface;
        me.bean.IN_REFERENCIA = getReferencia;
        this.searchParams.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'me.bean')
    },
    search: function () {
        let lstData = []
        this.showGrid('-vskMain');
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchAccountingInterfaces'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj,'obj')
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    console.log(pagData,'pagData')
                    
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
//        
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    showGrid: function (nameGrid) {

        if (me.drillDown.indexOf(nameGrid) === -1) {
            var paginacion = Ext.getCmp(prototype.id + '-boxPag');
            //Mostrar paginacion
            if (nameGrid === '-vskMain' || nameGrid === '-detailTicket2' )
            {
                paginacion.setVisible(true);
            } else {
                paginacion.setVisible(false);
            }

            me.drillDown.push(nameGrid);
            Ext.getCmp(prototype.id + me.boxActual).hide();
            me.boxActual = nameGrid;
            Ext.getCmp(prototype.id + me.boxActual).show();
            console.log(me.drillDown,'me.drillDown')
        }
    },
    btnExcel_click: function () {
        this.setFormatParameter();
        console.log(this.searchParams,'this.searchParams')
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {
        console.log(this.boxActual,'this.boxActual')
        console.log(me.boxActual,'this.boxActual')
        if (this.boxActual === '-boxMainData') {
            console.log('entre excel')
            me.goURLpost('excelAccountingInterfaces', this.searchParams.beanString, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        }
    },
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-vskMain').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-vskMain').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-vskMain').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-vskMain').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
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
    }
});