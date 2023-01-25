
Ext.define('Ext.Praxis.controller.payments.BankAccountingVoucher.BankAccountingVoucherController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankAccountingVoucherController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanStatment: {},
    beanDet: {},
    beanDetCtas: {},
    paginActual: '',
    drillDown: [],
    dw_excel: false,
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    boxActual: '-boxMainData',
    reg99: 0,
    me: '',
    dup: '',
    gloTipo: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'BankAccountingVoucherForm';
        prototype.url = CONTEXTPATH + '/BankAccountingVoucher';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BankAccountingVoucherForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BankAccountingVoucherForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BankAccountingVoucherForm-btnClear': {
                click: this.btnClear_click
            },
            '#BankAccountingVoucherForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BankAccountingVoucherForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BankAccountingVoucherForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BankAccountingVoucherForm-btnBack': {
                click: this.btnBack_click
            },
            '#BankAccountingVoucherForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#BankAccountingVoucherForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#BankAccountingVoucherForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BankAccountingVoucherForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BankAccountingVoucherForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BankAccountingVoucherForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.HabilitarCampo();
    },
    
    DeshabilitarCampo: function() {
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable();
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable();
//        Ext.getCmp(prototype.id + '-cmbPERNUM').disable();
//        Ext.getCmp(prototype.id + '-cmbPROCIND').disable();
//        Ext.getCmp(prototype.id + '-cmbCode').disable();
//        Ext.getCmp(prototype.id + '-cmbTRANSTYPE').disable();
//        Ext.getCmp(prototype.id + '-txtAGENTE').disable();
    },
    
    HabilitarCampo: function() {
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable();
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable();
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').enable();
//        Ext.getCmp(prototype.id + '-cmbDateToYear').enable();
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable();
//        Ext.getCmp(prototype.id + '-cmbDateToDay').enable();
//        Ext.getCmp(prototype.id + '-cmbPERNUM').enable();
//        Ext.getCmp(prototype.id + '-cmbPROCIND').enable();
//        Ext.getCmp(prototype.id + '-cmbCode').enable();
//        Ext.getCmp(prototype.id + '-cmbTRANSTYPE').enable();
//        Ext.getCmp(prototype.id + '-txtAGENTE').enable();
    },
    
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    
    BuscarMER_keyDownHandler: function (e, eOpts) {
        var merchant = Ext.getCmp(prototype.id + '-txtMER').getValue();
        
//        switch (eOpts.getKey()) {
//            case  13:
//                if (merchant.trim().length === 10) {
//                    me.beanTKT.IN_TKT = merchant
//                    var beanString = JSON.stringify(me.beanTKT);
//                    me.paramsTKT = {
//                        beanString: beanString,
//                    };
//                    this.setGridDataTKT();
//                } else {
//                    global.Msg({
//                        msg: 'Ticket number must contain 10 digits.'
//                    });
//                }
//                
//                if(merchant.trim() !== ''){
//                    this.DeshabilitarCampo();
//                }
//                break;
//            case 8:
//                this.HabilitarCampo();
//                break;
//            case 32:
//                this.HabilitarCampo();
//                break;
//            case 46:
//                this.HabilitarCampo();
//                break;
//        }
//        
//        if(ticket.trim() === ''){
//            this.HabilitarCampo();
//	} 
        
    },
    
    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
        


        var cmbPolicy = Ext.getCmp(prototype.id + '-cmbPolicy');
        cmbPolicy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["e", "All"],
                ["L", "Policy"],
                ["", "No Policy"]
            ]
        }));
        cmbPolicy.setValue("");


        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.TRANSCODE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);


                var lstBank = res.lstBank;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstBank,
                    autoLoad: true
                });
                var lstTransCode = res.lstTransCode;
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstTransCode,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData2);

                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
//                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.strYear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(); 
        me.bean.strMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(); 
                        

        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_AUTHOC = Ext.getCmp(prototype.id + '-txtAUTHOC').getValue();
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-txtSCURRENCY').getValue();
        
        
                
        var beanString = JSON.stringify(me.bean);
        searchParams = beanString;
        
        console.log(searchParams);
    },
    
    btnSearch_click: function (obj, e) {
//        var tkt = Ext.getCmp(prototype.id + '-txtTKT').getValue();
//        this.HabilitarCampo();
//        if (tkt.trim() !== '') {
//            if (tkt.trim().length === 13) {
//                
//                me.beanTKT.IN_TKT = tkt
//                var beanString = JSON.stringify(me.beanTKT);
//                me.paramsTKT = {
//                    beanString: beanString,
//                };
//                this.setGridDataTKT();
//            } else {
//                global.Msg({
//                    msg: 'Ticket number must contain 13 digits.'
//                });
//            }
//        } else {
            this.setFormatParameter();
            this.setGridData();
//        }
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2368");
//        me.panelActual = '-boxMainData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams,dw_excel:false};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                            console.log(obj.data.length);
//                            console.log(obj.data);
//                        var pag = Ext.getCmp(prototype.id + '-paggin');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

//                        if (obj.data.length === 0) {
//                            Ext.getCmp(prototype.id + '-TOTdblAmount').setText('');
//                            global.Msg({
//                                msg: 'Data not found.'
//                            });
//                        } 
//                        else {
//                            var data = obj.data.items[0].data;
//                            Ext.getCmp(prototype.id + '-TOTdblAmount').setText(Ext.util.Format.number(data.TOTdblAmount, '0,000'));
//                        }
//                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    gridDetPoli_clickHandler: function(column, e, row, column, x, rowData) {
//        console.log(param);

//        Ext.getCmp(field.id).setGroupValue(param);

        Ext.getCmp(prototype.id + '-boxSubFilter').show();
        this.beanStatment = x.record.data;
	this.beanStatment.FSELEC    = Ext.getCmp(prototype.id + '-cmbPolicy').getValue();

        this.searchDetPoli();
    },

    searchDetPoli: function () {
        win.lblUser_toolTip("Estructura: A2282");
        this.showGrid('-boxDetPoli');
//        me.panelActual = '-boxDetPoli';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetPoli'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanStatment),dw_excel:false};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '--lblTitDetPoli').setText('');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } 
                    else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-lblTitDetPoli').setText('Transaction Date : ' + data.DTRANS + ' Merchant Nbr.: ' + data.MERCHN);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetPoli').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    gridDet_clickHandler: function(param,column, e, row, column, x, rowData) {
//        console.log(param);


        this.beanDet = x.record.data;
	this.beanDet.IN_FLAG    = param;
        me.gloTipo = param;

        this.searchDet();
    },
    searchDet: function () {
        win.lblUser_toolTip("Estructura: A2282");
        this.showGrid('-boxDet');
//        me.panelActual = '-boxDet';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDet'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet),dw_excel:false};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-lblTitDetPoli').setText('');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } 
                    else {
                        var data = obj.data.items[0].data;
                        var tit = 'Transaction Date : ' + data.DTRANS;
                        if(me.gloTipo === '1'){
                            tit = tit +  ' Merchant Nbr.: ' + data.MERCHN;
                        }
                        Ext.getCmp(prototype.id + '-lblTitDet').setText(tit);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDet').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    GeneraTxt: function () {
        
//        Ext.Ajax.request({
//            url: prototype.url + '/generateTXT',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
//            params: {beanString: JSON.stringify(me.beanDet)},
//            success: function(response, options) {
//                Ext.getBody().unmask('Loading...');
//                console.log(response);
//
//                var res = Ext.JSON.decode(response.responseText);
//                
//                console.log(res.lstLINE);
//                console.log(res.lstDETA);
//
//            }
//        });
        
        me.goURLpost('generateTXT', JSON.stringify(me.beanDet), '');
    },
    gridDetCtas_clickHandler: function(column, e, row, column, x, rowData) {
        this.beanDetCtas = x.record.data;

        this.searchDetCtas();
    },
    searchDetCtas: function () {
        win.lblUser_toolTip("Estructura: A2364");
        this.showGrid('-boxDetCtas');
//        me.panelActual = '-boxDet';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCtas'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDetCtas),dw_excel:false};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-lblTitDetPoli').setText('');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } 
                    else {
                        var data = obj.data.items[0].data;
                        var tit = 'Transaction Date : ' + data.DTRANS + ' Merchant Nbr.: '  + data.MERCHN;
                        Ext.getCmp(prototype.id + '-lblTitDetPoli').setText(tit);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetCtas').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    } ,
    btnBack_click: function (obj, e) {


        if (me.drillDown.length > 0) {
 
            if(me.boxActual === '-boxDetPoli'){
                Ext.getCmp(prototype.id + '-boxSubFilter').hide();
            }
         
            Ext.getCmp(prototype.id + me.boxActual).hide();
            me.boxActual = me.drillDown.pop();
            Ext.getCmp(prototype.id + me.boxActual).show();
//            this.getPaggin();
////            if (me.pagginActual !== '') {
////                var pag = Ext.getCmp(prototype.id + me.pagginActual);
////                var pagData = pag.getPageData();
////                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
////                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
////                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
////            }
          

            Ext.getCmp(prototype.id + '-contentFilterBT').hide();
        }
    },
    
    btnClear_click: function (obj, e) {
        
        
    },
    
    btnExcel_click: function (obj, e) {
        this.setFormatParameter();
        
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
                
//        switch (me.panelActual) {
//            case  '-boxMainData':
//                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
//                break;
//        }


        console.log('Excel');
        console.log(searchParams);
        me.dw_excel = true;
        if(me.boxActual === '-boxMainData'){
            console.log(Ext.getCmp(prototype.id + '-gridData').config.columns.items);
            me.goURLpost('search',searchParams,Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        }else if(me.boxActual === '-boxDetPoli'){
            console.log(Ext.getCmp(prototype.id + '-gridDetPoli').config.columns.items);
//            console.log(JSON.stringify(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns));
//            me.goURLpost('searchDetSales',JSON.stringify(me.beanDet),Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
            me.goURLpost('searchDetPoli', JSON.stringify(me.beanStatment), Ext.getCmp(prototype.id + '-gridDetPoli').config.columns.items);
        }else if(me.boxActual === '-boxDet'){
            console.log(Ext.getCmp(prototype.id + '-gridDet').config.columns);
            me.goURLpost('searchDet', JSON.stringify(me.beanDet), Ext.getCmp(prototype.id + '-gridDet').config.columns.items);
        }else if(me.boxActual === '-boxDetCtas'){
            console.log(Ext.getCmp(prototype.id + '-gridDetCtas').config.columns);
            me.goURLpost('searchDetCtas', JSON.stringify(me.beanDetCtas), Ext.getCmp(prototype.id + '-gridDetCtas').config.columns.items);
        }else{
            me.dw_excel = false;
        }
    },
    goURLpost: function (method,parms,columns) {
        
        var js_columns = JSON.stringify(columns);
        
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' +method+'?dw_excel=true';

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

        document.body.appendChild(mapForm);


        mapForm.submit();
    },
    showGrid: function (nameGrid) {

        me.drillDown.push(me.boxActual);
        Ext.getCmp(prototype.id + me.boxActual).hide();

        me.boxActual = nameGrid;
        console.log(me.boxActual);
        Ext.getCmp(prototype.id + me.boxActual).show();

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case '-boxTKT':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    
    /*     
     * Funciones para la paginacion     
     */
    
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    } 
}
);