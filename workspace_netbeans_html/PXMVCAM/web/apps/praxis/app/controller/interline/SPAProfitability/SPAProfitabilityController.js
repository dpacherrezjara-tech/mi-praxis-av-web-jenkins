Ext.define('Ext.Praxis.controller.interline.SPAProfitability.SPAProfitabilityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SPAProfitabilityController',
    childs: '',
    stack: [],
    bean: {},
    beanDetail: {},
    beanDetailView: {},
    beanDetailView2: {},
    paramsDetail: {},
//    _path: '',
    //<editor-fold defaultstate="collapsed" desc="Prorrateo">
    beanA020: {},
    strModulo: '',
    beanA728: {},
    lista: new Array(),
    //</editor-fold>
//    me: '',
//    setContext: function() {
//        me = this;
//    },
    init: function(view) {
//        me = this;
//        prototype.id = 'SPAProfitabilityForm';
//        prototype.url = CONTEXTPATH+'/SPAProfitability';
        prototype.widthGrid = 1470;
        prototype.widthGrid2 = 1440;
        prototype.widthGrid3 = 1430;
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAerolinea', '');
        this.setValue('cmbSource', '');
        this.setValue('cmbTop', '20');
        this.imgFilter_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function() {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function() {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
        
        //<editor-fold defaultstate="collapsed" desc="obtainDataCombo">
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstAirlines = res.lstAirlines;
                var airlines = new Array();
                airlines.push(['', 'All']);
                lstAirlines.forEach(function callback(currentValue, index, array) {
                    airlines.push([currentValue.A005KEY, currentValue.A005KEY + ' - ' + currentValue.A005KEY2]);
                });
                var store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airlines', autoLoad: true, data: airlines, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(store);
                
                var lstSource = res.lstSource;
                var sources = new Array();
                sources.push(['', 'All']);
                lstSource.forEach(function callback(currentValue, index, array) {
                    sources.push([currentValue.CODSOUR, currentValue.CODSOUR + ' - ' + currentValue.DESSOU]);
                });
                var store2 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'sources', autoLoad: true, data: sources, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbSource').bindStore(store2);
                
                me.imgSearch_clickHandler();
            }
        });
        //</editor-fold>
    },
    // </editor-fold>
    
    BuscarTKT_keyDownHandler: function( obj , e , eOpts) {
        switch (e.getKey()) {
            case 13:
                if (this.getValue("txtTKT").length == 13) {
                    this.beanDetail.strYearTo = this.getValue("txtTKT");
                    this.searchTKT(this.beanDetail);
                } else {
                    global.Msg({ msg: 'Ticket number must contain 13 digits.' });
                    this.setValue('txtTKT', '');
                }
                if (this.getValue("txtTKT") != '') {
                    this.deshabilitarFiltros();
                }
                break;
            case 8://Backspace
                this.habilitarFiltros();
                break;
            case 32: //Spacebar
                this.habilitarFiltros();
                break;
            case 46: //Delete
                this.habilitarFiltros();
                break;
        }
        if (this.getValue("txtTKT") == '') {
            this.habilitarFiltros();
        }
    },
    
    viewGlobal: function() {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-pie').show();
        this.setValue('txtTKT', '');
        this.habilitarFiltros();
        this.search_Filtro(this.bean);
        this.searchViewGlobal(this.bean);
    },
    viewDetail: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.searchDetail(data);
    },
    viewProrate: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var nroprt = data.NROPRT;
//        Ext.getCmp(prototype.id + '-centerC').hide();
//        Ext.getCmp(prototype.id + '-centerC2').show();
//        this.startDisplay('SpaProfa', data.NROPRT);

        prototypeProgram.view = 'interline-spa-profitability-form';
        prototypeProgram.nprog = 'PX00000256';
        prototypeProgram.title = 'SPAs Profitability';
        prototypeProgram.modulo = '';
        
        win.displayBwrProrrateo(this, 'SpaProfa', nroprt);
    },
    
    //<editor-fold defaultstate="collapsed" desc="Prorrateo">
    startDisplay: function (strMod, nroprt) {
        this.strModulo = strMod;
        this.beanA020 = {};
        this.beanA020.A020KEY = nroprt;
        
        this.searchProrate(this.beanA020);
    },
    btnShowTaxes_clickHandler: function () {
        if(this.beanA020.strTicket !== '' && this.beanA020.strTicket !== undefined){
            this.searchTaxes(this.beanA020);
	}else{
            global.Msg({msg: 'No Taxes Found.'});
	}
    },
    btnShowTaxes1_clickHandler: function() {
        if (this.getValue("cmbAction") === 'ST') {
            if (this.beanA020.strTicket !== '' && this.beanA020.strTicket !== undefined) {
                this.searchTaxes(this.beanA020);
            } else {
                global.Msg({msg: 'No Taxes Found.'});
            }
        } else {
            global.Msg({msg: 'Under Construction'});
        }
    },
    txtFilterValue_keyDownHandler: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnShowTaxes1_clickHandler();
        }
    },
    imgBack_clickHandler2: function () {
        this.limpiarData();
	this.limpiarDataTCN();
        Ext.getCmp(prototype.id + '-centerC2').hide();
        Ext.getCmp(prototype.id + '-centerC').show();
    },
    txtValidar_keyDownHandler: function() {
    },
    btnNucRoe_clickHandler: function () {
        global.Msg({msg: 'Under Construction'});
    },
    //<editor-fold defaultstate="collapsed" desc="searchProrate">
    searchProrate: function (beanA020) {
        Ext.Ajax.request({
            url: prototype.url + '/searchProrate',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(beanA020) },
            beforerequest: Ext.getCmp(prototype.id + '-boxConsultas2').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxConsultas2').unmask();
                var res = Ext.JSON.decode(response.responseText);
                me.lista = new Array();
                if (res.success) {
                    me.beanA020 = res.dataA020;
                    me.beanA728 = res.dataA728;
                    me.lista = res.lstSectores;
                    
                    me.mostrarData();
                    if(me.beanA020.strFileName !== ''){
//                        imgImage.source = 'GetImageServlet?strOption=AM_IMG_RED&strImagen=' + app.trim(beanA020.strFileName);
                        Ext.getCmp(prototype.id + '-boxImgRED').show();
                        Ext.getCmp(prototype.id + '-boxImgTCN').hide();
                    } else {
                        var imgTCN = res.imgTCN;
                        if (imgTCN.strIssuedBy !== '' && imgTCN.lstCupones.length > 0) {
                            me.setValue('txtT_IssuedBy', imgTCN.strIssuedBy);
                            me.setValue('txtT_PassBagg', imgTCN.strPassBagg);
                            me.setValue('txtT_Endorsements', imgTCN.strEndorsRest);
                            me.setValue('txtT_Tour', imgTCN.strTourCode);
                            me.setValue('txtT_OrigDest', imgTCN.strOrigDestin);
                            me.setValue('txtT_IssueDP', imgTCN.strDatePlaceIssue);
                            me.setValue('txtT_NamePass', imgTCN.strPassenger);
                            me.setValue('txtT_Booking', imgTCN.strBooking);
                            me.setValue('txtT_OriIssue', imgTCN.strOrigIssue);
                            me.setValue('txtT_Exchange', imgTCN.strIssueExc1 + ' ' + imgTCN.strIssueExc2);
                            
                            me.setValue('txtT_Fare', imgTCN.strFare);
                            me.setValue('txtT_EFare', imgTCN.strEquivFare);
                            me.setValue('txtT_Tax1', imgTCN.strTax01);
                            me.setValue('txtT_Tax2', imgTCN.strTax02);
                            me.setValue('txtT_Tax3', imgTCN.strTax03);
                            me.setValue('txtT_FareCal', imgTCN.strFareCal);
                            me.setValue('txtT_TotalTaxes', imgTCN.strTotalTaxes);
                            me.setValue('txtT_FormPay', imgTCN.strFormPay);
                            Ext.getCmp(prototype.id + '-gridEtktRout').bindStore(
                                Ext.create("Ext.Praxis.store.interline.GridData", { data: imgTCN.lstCupones })
                            );
                            Ext.getCmp(prototype.id + '-boxImgRED').hide();
                            Ext.getCmp(prototype.id + '-boxImgTCN').show();
                        } else {
//                            imgImage.source = 'assets/img/not_picture.png';
                            Ext.getCmp(prototype.id + '-boxImgRED').show();
                            Ext.getCmp(prototype.id + '-boxImgTCN').hide();
                        }
                    }
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-boxConsultas2').unmask();
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTaxes">
    searchTaxes: function (beanA020) {
        console.log(beanA020);
        Ext.Ajax.request({
            url: prototype.url + '/searchTaxes',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(beanA020) },
//            beforerequest: Ext.getCmp(DataEntry).mask('Loading...'),
            success: function (response, opts) {
//                Ext.getCmp(DataEntry).unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var gridTaxesAC = res.lstTaxes;
                    console.log(gridTaxesAC);
                    if (gridTaxesAC.length > 0) {
//                        displayTaxesPopup();
//                        twCtrlTaxesA729.gridTaxesAC = gridTaxesAC;
                    } else global.Msg({msg: 'No Taxes Found.'});
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(DataEntry).unmask();
            }
        });
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function () {
        this.setValue('txtA020KEY', this.beanA020.A020KEY);
        this.setValue('txtTicket', this.beanA020.strTKT);
        this.setValue('txtA020GRUPO', this.beanA020.A020GRUPO);
        this.setValue('txtA728AIRFAC', this.beanA728.A728AIRFAC);
        this.setValue('txtA020SUFECH', this.beanA020.A020SUFECH);
        this.setValue('txtA728FECVTA', this.beanA728.A728FECVTA);
        this.setValue('txtA728FVLO1', this.beanA728.A728FVLO1);
        this.setValue('txtA020FRECHA', this.beanA020.A020FRECHA);
        this.setValue('txtA020SDATE', this.beanA020.A020SDATE);
        this.setValue('txtA728CTYEMI', this.beanA728.A728CTYEMI);
        this.setValue('txtA728CTYVTA', this.beanA728.A728CTYVTA);
        this.setValue('txtA728CODIT', this.beanA728.A728CODIT);
        this.setValue('txtA020RMSN', this.beanA020.A020RMSN);
        this.setValue('txtA020USER', this.beanA020.A020USER);
        this.setValue('txtA728ATBP', Ext.util.Format.number(this.beanA728.A728ATBP, '0,000.00'));
        this.setValue('txtA728MDAATB', this.beanA728.A728MDAATB);
        if(this.beanA728.A728IPLUS === 'S'){
            this.setValue('cmbA728IPLUS', 'S');
	}else if(this.beanA728.A728IPLUS == 'N'){
            this.setValue('cmbA728IPLUS', 'N');
	}else {
            this.setValue('cmbA728IPLUS', '');
	}
        this.setValue('txtA728CPLUSS', Ext.util.Format.number(this.beanA728.A728CPLUSS, '0,000.00'));
	//================================================
        this.setValue('txtA020TCALC', this.beanA020.A020TCALC);
        this.setValue('txtA020TARIFA', Ext.util.Format.number(this.beanA020.A020TARIFA, '0,000.00'));
        this.setValue('txtA020FAREUS', Ext.util.Format.number(this.beanA020.A020FAREUS, '0,000.00'));
        this.setValue('txtA020QSEG', Ext.util.Format.number(this.beanA020.A020QSEG, '0,000.00'));
        this.setValue('txtA020SUDEBI', Ext.util.Format.number(this.beanA020.A020SUDEBI, '0,000.00'));
        this.setValue('txtA020ANALIZ', Ext.util.Format.number(this.beanA020.A020ANALIZ, '0,000.00'));
        this.setValue('txtA020IMPNAC', Ext.util.Format.number(this.beanA020.A020IMPNAC, '0,000.00'));
        this.setValue('txtA020BOTCPR', Ext.util.Format.number(this.beanA020.A020BOTCPR, '0,000.00'));
        this.setValue('txtA020BOTCRM', Ext.util.Format.number(this.beanA020.A020BOTCRM, '0,000.00'));
        this.setValue('txtA020TOTDEB', Ext.util.Format.number(this.beanA020.A020TOTDEB, '0,000.00'));
        this.setValue('txtA728CODTAX', this.beanA728.A728CODTAX);
        this.setValue('txtA728TDESC', this.beanA728.A728TDESC);
        this.setValue('txtA728PORDES', Ext.util.Format.number(this.beanA728.A728PORDES, '0,000.00'));
        this.setValue('txtA728CSOVER', Ext.util.Format.number(this.beanA728.A728CSOVER, '0,000.00'));
        this.setValue('txtA728QSOVER', Ext.util.Format.number(this.beanA728.A728QSOVER, '0,000.00'));
        this.setValue('txtA020ACEPTA', Ext.util.Format.number(this.beanA020.A020ACEPTA, '0,000.00'));
        this.setValue('txtA020COMISP', Ext.util.Format.number(this.beanA020.A020COMISP, '0,000.00'));
        this.setValue('txtA020IMPINT', Ext.util.Format.number(this.beanA020.A020IMPINT, '0,000.00'));
        this.setValue('txtA020AOTCPM', Ext.util.Format.number(this.beanA020.A020AOTCPM, '0,000.00'));
        this.setValue('txtA020AOTCRM', Ext.util.Format.number(this.beanA020.A020AOTCRM, '0,000.00'));
        this.setValue('txtA020TOTHAB', Ext.util.Format.number(this.beanA020.A020TOTHAB, '0,000.00'));
        this.setValue('txtA728SECDS', this.beanA728.A728SECOR + this.beanA728.A728SECDS);
        this.setValue('txtA728RUTORG', this.beanA728.A728RUTORG);
        this.setValue('txtA728FBASE1', this.beanA728.A728FBASE1);
        this.setValue('txtA728LOHO', this.beanA728.A728LOHO);
        this.setValue('txtA020REDEBI', Ext.util.Format.number(this.beanA020.A020REDEBI, '0,000.00'));
        this.setValue('txtA020COMISI', Ext.util.Format.number(this.beanA020.A020COMISI, '0,000.00'));
        this.setValue('txtA020DOTCRM', Ext.util.Format.number(this.beanA020.A020DOTCRM, '0,000.00'));
        this.setValue('txtA020TAX', Ext.util.Format.number(this.beanA020.A020TAX, '0,000.00'));
        this.setValue('txtA728RERUT', this.beanA728.A728RERUT);
        this.setValue('txtA728MONSYS', this.beanA728.A728MONSYS);
        this.setValue('txtA020NETO', Ext.util.Format.number(this.beanA020.A020NETO, '0,000.00'));
        Ext.getCmp(prototype.id + '-lblA020BASE').setText(this.beanA020.A020BASE);
        Ext.getCmp(prototype.id + '-gridData2').bindStore(
            Ext.create("Ext.Praxis.store.interline.GridData", { data: this.lista })
        );
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtA020KEY', '');
        this.setValue('txtTicket', '');
        this.setValue('txtA020GRUPO', '');
        this.setValue('txtA728AIRFAC', '');
        this.setValue('txtA020SUFECH', '');
        this.setValue('txtA728FECVTA', '');
        this.setValue('txtA728FVLO1', '');
        this.setValue('txtA020FRECHA', '');
        this.setValue('txtA020SDATE', '');
        this.setValue('txtA728CTYEMI', '');
        this.setValue('txtA728CTYVTA', '');
        this.setValue('txtA728CODIT', '');
        this.setValue('txtA020RMSN', '');
        this.setValue('txtA020USER', '');
        this.setValue('txtA728ATBP', '0');
        this.setValue('txtA728MDAATB', '');
        this.setValue('cmbA728IPLUS', '');
        this.setValue('txtA728CPLUSS', '0');
        this.setValue('txtA020TCALC', '');
        this.setValue('txtA020TARIFA', '0');
        this.setValue('txtA020FAREUS', '0');
        this.setValue('txtA020QSEG', '0');
        this.setValue('txtA020SUDEBI', '0');
        this.setValue('txtA020ANALIZ', '0');
        this.setValue('txtA020IMPNAC', '0');
        this.setValue('txtA020BOTCPR', '0');
        this.setValue('txtA020BOTCRM', '0');
        this.setValue('txtA020TOTDEB', '0');
        this.setValue('txtA728CODTAX', '');
        this.setValue('txtA728TDESC', '');
        this.setValue('txtA728PORDES', '0');
        this.setValue('txtA728CSOVER', '0');
        this.setValue('txtA728QSOVER', '');
        this.setValue('txtA020ACEPTA', '0');
        this.setValue('txtA020COMISP', '0');
        this.setValue('txtA020IMPINT', '0');
        this.setValue('txtA020AOTCPM', '0');
        this.setValue('txtA020AOTCRM', '0');
        this.setValue('txtA020TOTHAB', '0');
        this.setValue('txtA728SECDS', '');
        this.setValue('txtA728RUTORG', '');
        this.setValue('txtA728FBASE1', '');
        this.setValue('txtA728LOHO', '');
        this.setValue('txtA020REDEBI', '0');
        this.setValue('txtA020COMISI', '0');
        this.setValue('txtA020DOTCRM', '0');
        this.setValue('txtA020TAX', '0');
        this.setValue('txtA728RERUT', '');
        this.setValue('txtA728MONSYS', '');
        this.setValue('txtA020NETO', '');
        Ext.getCmp(prototype.id + '-lblA020BASE').setText('');
        
//        imgImage.source = 'assets/img/not_picture.png';
        
        Ext.getCmp(prototype.id+'-gridData2').getStore().removeAll();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarDataTCN">
    limpiarDataTCN: function () {
        this.setValue('txtT_IssuedBy', '');
        this.setValue('txtT_PassBagg', '');
        this.setValue('txtT_Endorsements', '');
        this.setValue('txtT_Tour', '');
        this.setValue('txtT_OrigDest', '');
        this.setValue('txtT_IssueDP', '');
        this.setValue('txtT_NamePass', '');
        this.setValue('txtT_Booking', '');
        this.setValue('txtT_OriIssue', '');
        this.setValue('txtT_Exchange', '');
        
        this.setValue('txtT_Fare', '');
        this.setValue('txtT_EFare', '');
        this.setValue('txtT_Tax1', '');
        this.setValue('txtT_Tax2', '');
        this.setValue('txtT_Tax3', '');
        this.setValue('txtT_FareCal', '');
        this.setValue('txtT_TotalTaxes', '');
        this.setValue('txtT_FormPay', '');
        
        Ext.getCmp(prototype.id+'-gridEtktRout').getStore().removeAll();
    },
    //</editor-fold>
    //</editor-fold>
    
    boxViewGlobalDetail: function(column, e, row, column2, x, rowData) {
        this.beanDetailView = x.record.data;
        switch (column.grid.id) {
            case prototype.id + '-gridDataView1':
                this.searchDetailViewGlobal(this.beanDetailView);
                break;
            default:
                this.beanDetailView.IN_DATE='SPA';
                this.searchDetailViewGlobal(this.beanDetailView);
                break;
        }
    },
    boxViewGlobalDetail2: function(column, e, row, column2, x, rowData) {
        this.beanDetailView2 = x.record.data;
        this.Reiniciar_Paginacion(this.beanDetailView2);
        this.searchDetailViewGlobal2(this.beanDetailView2);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.stack = [];
        if (this.getValue("txtTKT") != '') {
            if (this.getValue("txtTKT").length === 13) {
                this.beanDetail.strYearTo = this.getValue("txtTKT");
                this.searchTKT(this.beanDetail);	
                this.deshabilitarFiltros();
            } else {
                global.Msg({ msg: 'Ticket number must contain 13 digits.'});
                this.setValue('txtTKT', '');
                this.habilitarFiltros();
            }
        } else {
            this.search_Filtro(this.bean);
            this.search(this.bean);
	    Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
        }
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    imgExcel_clickHandler: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
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
    imgClear_clickHandler: function(obj, e) {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAerolinea', '');
        this.setValue('cmbSource', '');
        this.setValue('cmbTop', '');
        this.setValue('cmbCurrency', 'USD');
//        this.setValue('txtTicket', '');
        this.habilitarFiltros();
    },
    imgChart_clickHandler: function() {
    },
    imgBack_clickHandler: function() {
        if (this.peek().includes("boxMainData")) {
            global.showMenu();
        } else {
            this.stack.pop();
            global.selectedChild(this.childs, this.peek());
            if (this.peek().includes("boxMainData")) {
                this.setPaggin('paggin', prototype.widthGrid);
            } else if (this.peek().includes("boxViewGlobal")) {
                this.setPaggin(-1);
            }
        }
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        this.selectedChild('boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = { beanString: JSON.stringify(bean) };
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF001");
                    me.setPaggin('paggin', prototype.widthGrid);
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetail">
    searchDetail: function (data) {
        this.selectedChild('boxDetailData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = { beanString: JSON.stringify(data) };
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF002");
                    me.setPaggin('paggin2', prototype.widthGrid2);
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetail').setTitle('<center>Invoice Date: '+ Objtemp.strDATE +'   ' +' Airline: ' +Objtemp.AIRLINE + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTKT">
    searchTKT: function (beanDetail) {
        this.selectedChild('boxDetailData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = { beanString: JSON.stringify(beanDetail) };
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF002");
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    }
                    me.setPaggin(-1);
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchViewGlobal">
    searchViewGlobal: function (bean) {
        this.selectedChild('boxViewGlobal');
        Ext.Ajax.request({
            url: prototype.url + '/searchViewGlobal',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(bean) },
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaData1 = res.listaData1;
                    var storeGridData1 = Ext.create("Ext.Praxis.store.interline.GridData", { data: listaData1 });
                    Ext.getCmp(prototype.id + '-gridDataView1').bindStore(storeGridData1);
                    
                    var listaData2 = res.listaData2;
                    var storeGridData2 = Ext.create("Ext.Praxis.store.interline.GridData", { data: listaData2 });
                    Ext.getCmp(prototype.id + '-gridDataView2').bindStore(storeGridData2);
                    
                    var listaData3 = res.listaData3;
                    var storeGridData3 = Ext.create("Ext.Praxis.store.interline.GridData", { data: listaData3 });
                    Ext.getCmp(prototype.id + '-gridDataView3').bindStore(storeGridData3);
                    
                    var listaData4 = res.listaData4;
                    var storeGridData4 = Ext.create("Ext.Praxis.store.interline.GridData", { data: listaData4 });
                    Ext.getCmp(prototype.id + '-gridDataView4').bindStore(storeGridData4);
                    
                    if (storeGridData1.data.items.length > 0) {
                        me.setPaggin(-1);
                    } else global.Msg({msg: 'Data not found'});
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetailViewGlobal">
    searchDetailViewGlobal: function (beanDetailView) {
        this.selectedChild('boxDetailViewGlobal');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailViewGlobal'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = { beanString: JSON.stringify(beanDetailView) };
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF002");
                    me.setPaggin('paggin3', prototype.widthGrid3);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetailView').setTitle('<center>TOP 10 - SECTOR: ' +Objtemp.strFDWORK+'</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailView').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetailViewGlobal2">
    searchDetailViewGlobal2: function (beanDetailView2) {
        this.selectedChild('boxDetailViewGlobal2');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailViewGlobal2'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = { beanString: JSON.stringify(beanDetailView2) };
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF002");
                    me.setPaggin('paggin4', prototype.widthGrid3);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetailView2').setTitle('<center>TOP 10 - COMMENTS: ' +Objtemp.strASIGNED+'</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailView2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    habilitarFiltros: function() {
        Ext.getCmp(prototype.id + '-cmbAerolinea').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbCurrency').enable(true);
        Ext.getCmp(prototype.id + '-cmbTop').enable(true);
        Ext.getCmp(prototype.id + '-cmbSource').enable(true);
    },
    deshabilitarFiltros: function() {
        Ext.getCmp(prototype.id + '-cmbAerolinea').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbCurrency').disable(true);
        Ext.getCmp(prototype.id + '-cmbTop').disable(true);
        Ext.getCmp(prototype.id + '-cmbSource').disable(true);
    },
    search_Filtro: function (obj) {
        obj.IN_DATE_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
	obj.IN_DATE_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
	
	obj.AIRLINE = this.getValue("cmbAerolinea");
        obj.IN_CURRENP = this.getValue("cmbCurrency");
        obj.IN_TUSO = this.getValue("cmbSource");
        obj.IN_TDOC = this.getValue("cmbTipo");
        obj.IN_TOP = this.getValue("cmbTop");
        //obj.IN_SPA = cmbSPA.selectedItem.data;
    },
    
    peek: function() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    
    exportExcel: function() {
//        global.getFile(_path);
        var panel = this.peek().substr(this.peek().indexOf('-')+1);
//        console.log(panel);
        switch (panel) {
            case  'boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case 'boxDetailData':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;  
        }
    },
    onValidarChange: function() {
        var list = Ext.getCmp(prototype.id + '-txtTKT').getValue().replace(/\s/g, "").split("");
        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        Ext.getCmp(prototype.id + '-txtTKT').setValue(txtTicket.substring(0, 13));
        if (Ext.getCmp(prototype.id + '-txtTKT').getValue("txtTKT") === '') {
            this.habilitarFiltros();
        }
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        } else if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal') {
            Ext.getCmp(prototype.id + '-paggin3').moveFirst();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal2') {
            Ext.getCmp(prototype.id + '-paggin4').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        } else if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal') {
            Ext.getCmp(prototype.id + '-paggin3').movePrevious();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal2') {
            Ext.getCmp(prototype.id + '-paggin4').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        } else if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal') {
            Ext.getCmp(prototype.id + '-paggin3').moveNext();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal2') {
            Ext.getCmp(prototype.id + '-paggin4').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        } else if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal') {
            Ext.getCmp(prototype.id + '-paggin3').moveLast();
        } else if (this.peek() === prototype.id + '-boxDetailViewGlobal2') {
            Ext.getCmp(prototype.id + '-paggin4').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (id) {
        global.selectedChild(this.childs, prototype.id + '-' + id);
        this.stack.push(prototype.id + '-' + id);
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
    },
    setPaggin: function (id, width) {
        if (id === -1) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            var pagData = Ext.getCmp(prototype.id + '-' + id).getPageData();
            
            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    Reiniciar_Paginacion: function(obj) {
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText('0');
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText('0');
        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        
        obj.page.PAGNUM = -1;
        obj.page.PAGROW = 20;
        obj.page.TOTPAG = -1;
        obj.page.TOTROW = -1;
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
