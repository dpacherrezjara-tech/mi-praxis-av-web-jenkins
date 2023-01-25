Ext.define('Ext.Praxis.controller.sales.ConciliationASR.ConciliationASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConciliationASRController',
    gloGridTransactionsSelectedIndex: -1,
    bean: {},
    beanFilter: {},
    bean_by_amount_excel: {},
    init: function(view) {
        //console.log('PERMX-ACCESS');
        if(accessSelect.PERMX==='N'){
            Ext.getCmp(prototype.id+'-btnExcel').hide();
	}else{
            Ext.getCmp(prototype.id+'-btnExcel').show();
        }
    },
    afterRender: function () {
        this.setStoreData();
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        //console.log(newValue);
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        comboToYear.setValue(newValue);
        //var cmbDateFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        //cmbDateFromMonth.setValue(newValue);
                    
//        if (newValue!=='') {
//            if (comboToYear.getValue()!=='') {
//                if (newValue > comboToYear.getValue()) {
//                    comboToYear.setValue(newValue);
//                }
//            } else comboToYear.setValue(newValue);
//        } else {
//            cmbDateFromMonth.setValue(newValue);
//            comboToYear.setValue(newValue);
//        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        
//        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateFromYear');
//        var cmbDateToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
//        if (newValue!=='') {
//            if (comboFromYear.getValue()!=='') {
//                if (newValue < comboFromYear.getValue()) {
//                    comboFromYear.setValue(newValue);
//                }
//            } else comboFromYear.setValue(newValue);
//        } else {
//            cmbDateToMonth.setValue(newValue);
//            comboFromYear.setValue(newValue);
//        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');        
                
        if (newValue!=='') {
            var store = win.getStoreDays2(true, win.getValue("cmbDateFromYear"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboFromDay.setValue('');
            
            if (win.getValue("cmbDateFromYear")==='') win.setValue("cmbDateFromYear", new Date().getFullYear());
            if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) {
                if (comboToMonth.getValue()!=='') {
                    if (newValue > comboToMonth.getValue()) {
                        comboToMonth.setValue(newValue);
                    }
                } else comboToMonth.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
            if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) comboToMonth.setValue(newValue);
        }
        comboToMonth.setValue(newValue);
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateToDay');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (newValue!=='') {
            var store = win.getStoreDays2(true, win.getValue("cmbDateToYear"), Number(newValue) - 1);
            comboToDay.bindStore(store);
            comboToDay.setValue('');
            
            if (win.getValue("cmbDateFromYear")==='') win.setValue("cmbDateFromYear", new Date().getFullYear());
            if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue()!=='') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else comboFromMonth.setValue(newValue);
            }
        } else {
            comboToDay.setValue(newValue);
            if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) comboFromMonth.setValue(newValue);
        }
    },
    onFromDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        var cmbDateToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateToDay');
        var cmbDateToDay = Ext.getCmp(prototype.id+'-cmbDateToDay');
        if (newValue!=='') {
            if (comboFromMonth.getValue()==='') {
                comboFromMonth.setValue("01");
                if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) {
                    cmbDateToMonth.setValue("01");
                    cmbDateToDay.setValue(newValue);
                }
            }
            comboFromDay.setValue(newValue);
        } else {
            if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) comboToDay.setValue(newValue);
        }
        comboToDay.setValue(newValue);
    },
    onToDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        var cmbDateFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var cmbDateFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        if (newValue!=='') {
            if (comboToMonth.getValue()==='') {
                comboToMonth.setValue("01");
                if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) {
                    cmbDateFromMonth.setValue("01");
                    cmbDateFromDay.setValue(newValue);
                }
            }
            comboToDay.setValue(newValue);
        } else {
            if (win.getValue("cmbDateFromYear") === win.getValue("cmbDateToYear")) comboFromDay.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);

        var days = new Array(); days.push(['', 'All']);
        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(
            Ext.create('Ext.data.ArrayStore', {
                autoLoad: true,
                data: days,
                fields: ['code', 'name']
            })
        );
        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(
            Ext.create('Ext.data.ArrayStore', {
                autoLoad: true,
                data: days,
                fields: ['code', 'name']
            })
        );
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue(mes);
        var day = new Date().getDate()-4;
        //console.log('---->>' + day);
        if(day < 10) day = "0"+day;
        
        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue(day);
        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue(day);
//        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue('01');
//        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue('01');
//        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('01');
//        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('01');
    },
    // </editor-fold>
    
    cmbFilterType02_changeHandler: function(cmp, newValue) {
        switch (win.getValue('cmbFilterType02')) {
            case 'ALL':
                Ext.getCmp(prototype.id+'-boxFilter01').hide();
                Ext.getCmp(prototype.id+'-boxFilter02').hide();
                Ext.getCmp(prototype.id+'-boxFilter03').hide();
                Ext.getCmp(prototype.id+'-boxFilter04').hide();
                break;
            case 'FPROCE':
                Ext.getCmp(prototype.id+'-boxFilter01').show();
                Ext.getCmp(prototype.id+'-boxFilter02').hide();
                Ext.getCmp(prototype.id+'-boxFilter03').hide();
                Ext.getCmp(prototype.id+'-boxFilter04').hide();
                win.focus('txtProcessingDate01');
                break;
            case 'FREPOR':
                Ext.getCmp(prototype.id+'-boxFilter01').hide();
                Ext.getCmp(prototype.id+'-boxFilter02').show();
                Ext.getCmp(prototype.id+'-boxFilter03').hide();
                Ext.getCmp(prototype.id+'-boxFilter04').hide();
                win.focus('txtOpenDate02');
                break;
            case 'GRUPO':
                Ext.getCmp(prototype.id+'-boxFilter01').hide();
                Ext.getCmp(prototype.id+'-boxFilter02').hide();
                Ext.getCmp(prototype.id+'-boxFilter03').show();
                Ext.getCmp(prototype.id+'-boxFilter04').hide();
                win.focus('txtGroup03');
                break;
            case 'NROID':
                Ext.getCmp(prototype.id+'-boxFilter01').hide();
                Ext.getCmp(prototype.id+'-boxFilter02').hide();
                Ext.getCmp(prototype.id+'-boxFilter03').hide();
                Ext.getCmp(prototype.id+'-boxFilter04').show();
                win.focus('txtIDFile04');
                break;
        }
    },
    rdgVS_changeHandler: function(cmp, newValue) {
        switch (win.getValue('rdgVS').rdgVS) {
            case 'IP':
                Ext.getCmp(prototype.id+'-boxFilter1').show();
                Ext.getCmp(prototype.id+'-boxFilter2').hide();
                Ext.getCmp(prototype.id+'-boxPaginacion').hide();
                Ext.getCmp('espacio1').show();
                Ext.getCmp(prototype.id+'-tnvMain').show();
                Ext.getCmp(prototype.id+'-tnvPraxisVsInteract').hide();
                Ext.getCmp(prototype.id+'-tnvMain').setActiveItem(1);
                win.focus('cmbFilterType');
                break;
            case 'PI':
                Ext.getCmp(prototype.id+'-boxFilter1').hide();
                Ext.getCmp(prototype.id+'-boxFilter2').show();
                Ext.getCmp(prototype.id+'-boxPaginacion').show();
                Ext.getCmp('espacio1').hide();
                Ext.getCmp(prototype.id+'-tnvPraxisVsInteract').show();
                Ext.getCmp(prototype.id+'-tnvMain').hide();
                if (win.getValue('cmbFilterType02')==='ALL') {
                    win.focus('cmbFilterType02');
                } else {
                    this.cmbFilterType02_changeHandler();
                }
                break;
        }
    },
    tnvMain_changeHandler: function(tab, x) {
        Ext.getCmp(prototype.id+'-gridDataByCurrency').getStore().removeAll();
        var tabPanel = Ext.getCmp(prototype.id+'-tnvMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        switch (activeTabIndex) {
            case 0:
                win.lblUser_toolTip("Estructura: PXF051");
                break;
            case 1:
                win.lblUser_toolTip("Estructura: PXF053");
                var filter = {};
                
                filter.yearFrom = win.getValue('cmbDateFromYear');
                filter.monthFrom = win.getValue('cmbDateFromMonth');
                filter.dayFrom = win.getValue('cmbDateFromDay');
                if (filter.dayFrom === null) filter.dayFrom = '';
                filter.yearTo = win.getValue('cmbDateToYear');
                filter.monthTo = win.getValue('cmbDateToMonth');
                filter.dayTo = win.getValue('cmbDateToDay');
                if (filter.dayTo === null) filter.dayTo = '';

                filter.IN_FREPOR_FROM = filter.yearFrom + filter.monthFrom + filter.dayFrom;
                filter.IN_FREPOR_TO = filter.yearTo + filter.monthTo + filter.dayTo;
                this.bean_by_amount_excel.IN_FREPOR_FROM = filter.IN_FREPOR_FROM;
                this.bean_by_amount_excel.IN_FREPOR_TO =  filter.IN_FREPOR_TO;                
                var gridDataPXF051 = Ext.getCmp(prototype.id+'-gridTransactions').getStore().data;
                
                if (gridDataPXF051.length > 0 && this.gloGridTransactionsSelectedIndex > -1) {
                    var filterBean = gridDataPXF051.items[this.gloGridTransactionsSelectedIndex].data;
                    filter.IN_WKSTAT = filterBean.STATION;
                    filter.IN_FREPOR_FROM = filterBean.FREPOR;
                    filter.IN_FREPOR_TO = filterBean.FREPOR;
                    this.bean_by_amount_excel.IN_WKSTAT =  filterBean.STATION;
                    this.bean_by_amount_excel.IN_FREPOR_FROM =  filterBean.FREPOR;
                    this.bean_by_amount_excel.IN_FREPOR_TO =  filterBean.FREPOR;                    
                }
                this.loadPX108S02PXF053(filter);
                break;
        }
    },
    loadPX108S02PXF053: function(filter) {
        
        //var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ConciliationASR.GridDataPX031S03A1530', {
            proxy: {
                url: prototype.url+'/loadPX108S02PXF053'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = filter;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    global.clear();
                }
            }
        });
        //Ext.getCmp(prototype.id+'-gridDataByCurrency').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-gridDataByCurrency').setStore(storeGridDatas);
    },
    gridTransactions_itemClickHandler: function(grid, x, colIndex, e, x, rowIndex, z) {
          this.gloGridTransactionsSelectedIndex = rowIndex;
//        if (this.gloGridTransactionsSelectedIndex === -1) {
//            this.gloGridTransactionsSelectedIndex = rowIndex;
//        } else {
//            if (rowIndex === this.gloGridTransactionsSelectedIndex) {
//                this.gloGridTransactionsSelectedIndex = -1;
//            } else {
//                this.gloGridTransactionsSelectedIndex = rowIndex;
//            }
//        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onActionClick: function(grid, rowIndex, colIndex) {
        //alert('DataEntryTransaction');
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        Ext.create('Ext.Praxis.view.sales.ConciliationASRForm.DataEntryTransaction', {
            id: 'DataEntryTransactionConciliationASRForm',
            params: {
                action: 'U',
                data: data
            }
        }).show();
    },
    gridDataByCurrency_act1_clickHandler: function (obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;
        if(data.WKSTAT !== undefined){
            var paramsContxt = {
                STATION: data.WKSTAT,
                FREPOR: data.FREPOR
            };
            var dataEntryInfInteract = Ext.create('Ext.Praxis.view.sales.LoadReportForm.DataEntryInfInteract', {
                id: prototype.id + '-dataEntyInfInteract',
                params: paramsContxt
            });
            dataEntryInfInteract.show();
	}
    },
    gridDataPraxisVsInteract_act2_clickHandler: function(grid, rowIndex, colIndex) {
        //alert('DataEntryConciliationASRForm');
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        //console.log(data);        
        Ext.create('Ext.Praxis.view.sales.ConciliationASRForm.DataEntry', {
            id: 'DataEntryConciliationASRForm',
            params: {                
                action: 'U',
                bean: data
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        switch (win.getValue('rdgVS').rdgVS) {
            case 'IP':
                var msg = this.validarFecha();
                if(msg === ''){
                    this.gloGridTransactionsSelectedIndex = -1;
                    Ext.getCmp(prototype.id+'-gridTransactions').getStore().removeAll();
                    this.bean.filterType = win.getValue('cmbFilterType');                    
                    this.bean.yearFrom = win.getValue('cmbDateFromYear');
                    this.bean.monthFrom = win.getValue('cmbDateFromMonth');
                    this.bean.dayFrom = win.getValue('cmbDateFromDay');
                    this.bean.yearTo = win.getValue('cmbDateToYear');
                    this.bean.monthTo = win.getValue('cmbDateToMonth');
                    this.bean.dayTo = win.getValue('cmbDateToDay');                    
                    this.bean.WKSTAT = win.getValue('txtWorkstation');
                    this.bean.PSTATE = this.getPSTATE(win.getValue('cmbProcessState'));
                    this.bean.ST = win.getValue('cmbSt');
                    this.bean.SAMT = win.getValue('cmbFilterStatusAmount');                    
                    this.loadPXF051(this.bean);
                } else {
                    global.Msg({
                        msg: msg
                    });
                }
                break;
            case 'PI':
                var strCmbFilterType02_selectedValue = win.getValue('cmbFilterType02');
                if(strCmbFilterType02_selectedValue !== 'ALL'){
                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText('0');
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText('0');
                    Ext.getCmp(prototype.id+'-lbl-total').setText('0');
                    this.execSearch();
                } else {
                    win.focus('cmbFilterType02');
                }
                break;
        }
    },
    execSearch: function() {
        
        this.beanFilter.IN_FREPOR = '';
        this.beanFilter.IN_GROUP = '';
        this.beanFilter.IN_NROID = 0;
        
        var strCmbFilterType02_selectedValue = win.getValue('cmbFilterType02');
        switch (strCmbFilterType02_selectedValue) {
            case 'FPROCE':
                this.beanFilter.IN_TFILTER  = 1;
                this.beanFilter.IN_FPROCE = Ext.util.Format.date(win.getValue('txtProcessingDate01'), 'Ymd');
                this.beanFilter.IN_WKSTAT = win.getValue('txtIATACode01').trim();
                break;
            case 'FREPOR':
                this.beanFilter.IN_TFILTER  = 2;
                this.beanFilter.IN_FREPOR = Ext.util.Format.date(win.getValue('txtOpenDate02'), 'Ymd');
                this.beanFilter.IN_WKSTAT = win.getValue('txtIATACode02').trim();
                break;
            case 'GRUPO':
                this.beanFilter.IN_TFILTER  = 3;
                this.beanFilter.IN_GROUP = win.getValue('txtGroup03').trim();
                break;
            case 'NROID':
                this.beanFilter.IN_TFILTER  = 4;
                this.beanFilter.IN_NROID = win.getValue('txtIDFile04').trim();
                break;
            default:
                this.beanFilter.IN_TFILTER  = 0;
                break;
        }
        this.loadPX031S03A1530(this.beanFilter);
    },
    loadPX031S03A1530: function(beanFilter) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ConciliationASR.GridDataPX031S03A1530', {
            proxy: {
                url: prototype.url+'/loadPX031S03A1530'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanFilter;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
//        Ext.getCmp(prototype.id+'-gridDataPraxisVsInteract').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-gridDataPraxisVsInteract').setStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').setStore(storeGridDatas);
    },
    btnExcel_click: function(obj, e) {
        if(win.getValue('rdgVS').rdgVS === 'IP'){
            var tabPanel = Ext.getCmp(prototype.id+'-tnvMain');
            var activeTab = tabPanel.getActiveTab();
            var activeTabIndex = tabPanel.items.indexOf(activeTab);
            if (activeTabIndex === 0) this.exportExcel('/getXLSX_ip_by_transaction?beanString='+encodeURI(JSON.stringify(this.bean)));
            else if (activeTabIndex === 1) this.exportExcel('/getXLSX_ip_by_amount?beanString='+encodeURI(JSON.stringify(this.bean_by_amount_excel)));
        }            
        if(win.getValue('rdgVS').rdgVS === 'PI'){
            this.exportExcel('/getXLSX_pi?beanString='+encodeURI(JSON.stringify(this.beanFilter)));
        }
            
    },
    btnBack_click: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="loadPXF051">
    loadPXF051: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ConciliationASR.GridData', {
            proxy: {
                url: prototype.url+'/loadPXF051'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridTransactions').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function(_path){        
        //console.log(this.bean);
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + _path);                    
                }
            }
        });                        
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones Locales">
    // <editor-fold defaultstate="collapsed" desc="validarFecha">
    validarFecha: function() {
        var msg = '';
        var fyear = win.getValue('cmbDateFromYear');
        var fmonth = win.getValue('cmbDateFromMonth');
        var tyear = win.getValue('cmbDateToYear');
        var tmonth = win.getValue('cmbDateToMonth');
        var fday = win.getValue('cmbDateFromDay');
        var tday = win.getValue('cmbDateToDay');
        
        if(fyear === null || tyear === null || fmonth === null || tmonth === null || fday === null || tday === null){
            msg = 'Date Error. Please call our System Apartment.';
        }else{
            if(fyear !== '' && fmonth === '') {
                if((tyear === '' && tmonth !== '') || (tyear !== '' && tmonth !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }
            if(fyear === '' && fmonth !== '') {
                if((tyear !== '' && tmonth === '') || (tyear !== '' && tmonth !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect)\n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }    

            if(fyear !== '' && fmonth !== '') {
                if((tyear !== '' && tmonth === '') || (tyear === '' && tmonth !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }

            if(fmonth !== '' && fday === '') {
                if((tmonth === '' && tday !== '') || (tmonth !== '' && tday !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }
            if(fmonth === '' && fday !== '') {
                if((tmonth !== '' && tday === '') || (tmonth !== '' && tday !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }

            if(fmonth !== '' && fday !== '') {
                if((tmonth !== '' && tday === '') || (tmonth === '' && tday !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            } 

            if(fday !== '' && tday !== ''){
                if(fmonth === '' || tmonth === '' ){
                    msg = 'You must choose a month.';
                }else{
                    if(fyear === tyear && fmonth === tmonth && tday < fday){
                        msg = 'The Day To must be greater than Day From.';
                    } 
                }                           
            }

            if(fyear !== '' && tyear !== ''){
                if(tyear < fyear){
                    msg = 'The Year To must be greater than Year From.';
                }                            
            }

            if(fmonth !== '' && tmonth !== ''){
                if(fyear === tyear && tmonth < fmonth){
                    msg = 'The Month To must be greater than Month From.';
                }                            
            }
        }
	return msg;
    },
    // </editor-fold>
    getPSTATE: function(value) {
        var intRtn = 0;
	switch(value){
            case 'ALL':
                intRtn = 0;
                break;
            case 'INTERACT':
                intRtn = 1;
                break;
            case 'MATCH':
                intRtn = 2;
                break;
            case 'AVRA':
                intRtn = 3;
                break;
	}
	return intRtn;
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
//    pagFirst: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').moveFirst();
//        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
//        }
//    },
//    pagPrevious: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').movePrevious();
//        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
//        }
//    },
//    pagNext: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').moveNext();
//        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin2').moveNext();
//        }
//    },
//    pagLast: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').moveLast();
//        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin2').moveLast();
//        }
//    },
    // </editor-fold>
    
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
});
