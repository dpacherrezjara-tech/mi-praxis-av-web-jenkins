Ext.define('Ext.Praxis.controller.payments.BankStatementExtract.BankStatementExtractController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankStatementExtractController',
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
    prevYearFrom: '',
    prevYearTo: '',
    init: function (view) {
        me = this;
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        prototype.urlBank = CONTEXTPATH + '/BankReconciliation';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            // -------------------Eventos Genericos --------------------
            '#BankStatementExtractForm-rbChart_IA': {
                change: this.rbChart_IA_change
            },
            '#BankStatementExtractForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BankStatementExtractForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BankStatementExtractForm-btnClear': {
                click: this.btnClear_click
            },
            '#BankStatementExtractForm-btnBack': {
                click: this.btnBack_click
            },
            '#BankStatementExtractForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BankStatementExtractForm-cmbDateToYear': {
                change: this.validateDiffYear
            },
            '#BankStatementExtractForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BankStatementExtractForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#BankStatementExtractForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BankStatementExtractForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BankStatementExtractForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BankStatementExtractForm-btn-pag-last': {
                click: this.pagLast
            },
            '#BankStatementExtractForm-btnTxtLayoutBsplink': {
                click: this.btnTxtLayoutBsplink
            },
            '#BankStatementExtractForm-btnTxtLayoutBsplink_UATP': {
                click: this.btnTxtLayoutBsplink_UATP
            },
            '#BankStatementExtractForm-btnTxtLayoutBsplink_UATPUnif': {
                click: this.btnTxtLayoutBsplink_UATPUnif
            },
            '#BankStatementExtractForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BankStatementExtractForm-btnLog': {
                click: this.executeLog
            },
            '#BankStatementExtractForm-btnExcelLog': {
                click: this.btnExcelLog_click
            },
        });

    },
    init_this: function () {
        me = this;
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
        this.btnSearch_click();
    },
    setStoreData: function () {

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

        var storeComboDataYear = me.getStoreYearBank(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
    },
    rbChart_IA_change: function(radioGroup, newValue, oldValue) {
        let rbValue = newValue.rb;
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        let comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        let comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');

        if (rbValue === 'rbc1_IA') { // Historic
            comboFromYear.setValue('2024');
            comboToYear.setValue('2024');
            comboFromMonth.setValue('');
            comboToMonth.setValue('');
            comboFromDay.setValue('');
            comboToDay.setValue('');
            comboFromMonth.setDisabled(true);
            comboFromDay.setDisabled(true);
            comboToMonth.setDisabled(true);
            comboToDay.setDisabled(true);
            comboFromYear.setDisabled(true);
            comboToYear.setDisabled(true);
        } else { // Current
            var currentYear = new Date().getFullYear();
            comboFromYear.setValue(currentYear);
            comboToYear.setValue(currentYear);
            comboFromMonth.setValue('');
            comboToMonth.setValue('');
            comboFromDay.setValue('');
            comboToDay.setValue('');
            comboFromMonth.setDisabled(false);
            comboFromDay.setDisabled(false);
            comboToMonth.setDisabled(false);
            comboToDay.setDisabled(false);
            comboFromYear.setDisabled(false);
            comboToYear.setDisabled(false);
        }
    },
    btnSearch_click: function () {
        this.onChangeRadio();
    },
    onChangeRadio: function () {
        const valueTypeVisualization = Ext.getCmp(prototype.id + '-typeVisualization').getValue();
        const valuetypeReport = Ext.getCmp(prototype.id + '-typeReport').getValue();

        var rbValue = '';
        var radioGroup = Ext.getCmp(prototype.id + '-rbChart_IA');
        if (radioGroup && radioGroup.getValue() && radioGroup.getValue().rb) {
            rbValue = radioGroup.getValue().rb;
        }

        // NO CAMBIES NI LIMPIES COMBOS ACÁ

        this.setFormatParameter();

        var actions = {};

        if (rbValue === 'rbc1_IA') { // Historic
            actions = {
                'USA_D': this.searchUsaflowDiaryHistoric,
                'USA_W': this.searchUsaflowWeeklyHistoric,
                'TACA_D': this.searchTacaDiaryHistoric,
                'TACA_W': this.searchTacaWeeklyHistoric
            };
        } else { // Current
            actions = {
                'USA_D': this.searchUsaflowDiary,
                'USA_W': this.searchUsaflowWeekly,
                'TACA_D': this.searchTacaDiary,
                'TACA_W': this.searchTacaWeekly
            };
        }

        var key = valueTypeVisualization + '_' + valuetypeReport;
        var action = actions[key];

        if (action) {
            action.call(this);
        } else {
            console.warn('No se encontró una acción para la combinación:', key);
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();

        const getDateValue = (yearCmp, monthCmp, dayCmp) => {
            const year = Ext.getCmp(prototype.id + yearCmp).getValue() || '';
            const month = Ext.getCmp(prototype.id + monthCmp).getValue() || '';
            const day = Ext.getCmp(prototype.id + dayCmp).getValue() || '';
            return year + month + day;
        };

        let getValueDateTo = getDateValue('-cmbDateToYear', '-cmbDateToMonth', '-cmbDateToDay');
        let getValueDateFrom = getDateValue('-cmbDateFromYear', '-cmbDateFromMonth', '-cmbDateFromDay');

        let getNumberAccount = Ext.getCmp(prototype.id + '-numberAccount').getValue();
        let getProcessor = Ext.getCmp(prototype.id + '-cmbCOREP').getValue().length == 0 ? '' : this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbCOREP'));

        me.bean.IN_CCUST = getCustomer || '';
        me.bean.IN_NUMBER_ACCOUNT = getNumberAccount || '';
        me.bean.IN_FECHA_FROM = getValueDateFrom;
        me.bean.IN_FECHA_TO = getValueDateTo;
        me.bean.IN_PROCESSOR = getProcessor;

        console.log(me.bean, 'me.bean');
    },
    searchUsaflowDiary: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchUsaflowDiary'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchUsaflowWeekly: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataUsaflowWeekly';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchUsaflowWeekly'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchUsaflowDiaryHistoric: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchUsaflowDiaryHistoric'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchUsaflowWeeklyHistoric: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataUsaflowWeekly';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchUsaflowWeeklyHistoric'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchTacaDiary: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataTaca';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchTacaDiary'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataTaca').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchTacaWeekly: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataTacaWeekly';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []

        var storeGridDatas123 = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchTacaWeekly'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data,'DAAAA');
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataTacaWeekly').bindStore(storeGridDatas123);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas123);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchTacaDiaryHistoric: function () {
        me.getPaggin()
        me.panelActual = '-panelGridDataTaca';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchTacaDiaryHistoric'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataTaca').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    searchTacaWeeklyHistoric: function () {
        console.log("searchTacaWeeklyHistoric")
        me.getPaggin()
        me.panelActual = '-panelGridDataTacaWeekly';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        let lstData = []

        var storeGridDatas123 = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchTacaWeeklyHistoric'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj.data,'DAAAA');
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataTacaWeekly').bindStore(storeGridDatas123);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas123);
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
        
        const yearFromCmpValue = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        
        if (yearFromCmpValue == "2024") {
            switch (me.panelActual) {
                case '-panelGridDataMain':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXMainHistoric?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
                case '-panelGridDataUsaflowWeekly':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXMainUsaflowWeeklyHistoric?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
                case '-panelGridDataTaca':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXTacaDiaryHistoric?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
                case '-panelGridDataTacaWeekly':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXTacaWeeklyHistoric?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
            }
        } else {
            switch (me.panelActual) {
                case '-panelGridDataMain':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXMain?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
                case '-panelGridDataUsaflowWeekly':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXMainUsaflowWeekly?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
                case '-panelGridDataTaca':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXTacaDiary?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
                case '-panelGridDataTacaWeekly':
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSXTacaWeekly?beanString=' + encodeURI(me.searchParams.beanString));
                    break;
            }
        }
        
    },
    getPaggin: function () {
//        me.pagginActual = '';
        switch (me.panelActual) {
            case '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDataTaca':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataTacaWeekly':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataTaca':
                me.pagginActual = '-paggin3';
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
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
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
        } else {
            var pagData = paggin.getPageData();

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
    selectComboFromYear: function (obj) {
    var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
    var storeComboDataYear = me.getStoreYearBank(false);
    let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
    let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
    let comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
    let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
    let comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
    comboToYear.bindStore(storeComboDataYear);
    comboToYear.setValue(obj.getValue());

    if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
        comboFromMonth.setValue(comboToMonth.getValue());
    }

    // ----------- BLOQUEO DE MES/DIA SI ES 2024 ------------
    if (comboFromYear.getValue() == '2024') {
        comboFromMonth.setValue(''); // Borra valor seleccionado
        comboFromDay.setValue('');
        comboFromMonth.setDisabled(true);
        comboFromDay.setDisabled(true);
    } else {
        comboFromMonth.setDisabled(false);
        comboFromDay.setDisabled(false);
    }

    if (comboToYear.getValue() == '2024') {
        comboToMonth.setValue('');
        comboToDay.setValue('');
        comboToMonth.setDisabled(true);
        comboToDay.setDisabled(true);
    } else {
        comboToMonth.setDisabled(false);
        comboToDay.setDisabled(false);
    }
    // -------------------------------------------------------

    me.validateDiffYear();
},
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        if (obj.getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(false);

        } else {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        }

    },
    selectComboFromDay: function (obj) {
        console.log(obj, 'obj day from')
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
        console.log('sdadsadadsad')
    },
    validateDiffYear: function () {
        let yearFromCmp = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let yearToCmp = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let valueYearFrom = yearFromCmp.getValue();
        let valueYearTo = yearToCmp.getValue();

        let prevYearFrom = me.prevYearFrom;
        let prevYearTo = me.prevYearTo;

        if (valueYearFrom !== valueYearTo) {
            global.Msg({
                msg: 'You cannot select a different year in each filter. Please select the same year for both filters.',
                title: 'Year Selection Error'
            });

            if (prevYearFrom !== undefined && prevYearFrom !== null) {
                yearFromCmp.setValue(prevYearFrom);
            }
            if (prevYearTo !== undefined && prevYearTo !== null) {
                yearToCmp.setValue(prevYearTo);
            }
        } else {
            this.prevYearFrom = valueYearFrom;
            this.prevYearTo = valueYearTo;
        }

        console.log('From:', valueYearFrom, 'To:', valueYearTo, '| PrevFrom:', prevYearFrom, 'PrevTo:', prevYearTo);
    },
    getStoreYearBank: function (ALL) {
        var startYear = 2024;
        var fecha = new Date();
        var endYear = fecha.getFullYear() + 2;
        var years = [];
        if (ALL)
            years.push(['', 'All']);
        for (var year = endYear; year >= startYear; year--) {
            years.push([year, year]);
        }
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'year',
            autoLoad: true,
            data: years,
            fields: ['code', 'name']
        });
    }
});