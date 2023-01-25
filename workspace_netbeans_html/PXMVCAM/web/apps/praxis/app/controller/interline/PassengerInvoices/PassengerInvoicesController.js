Ext.define('Ext.Praxis.controller.interline.PassengerInvoices.PassengerInvoicesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PassengerInvoicesController',
    childs: '',
    stack: [],
    bean30Source: {},
    bean: {},
    bean21: {},
    bean20: {},
    bean22: {},
    bean30: {},
    bean33: {},
    beanExcel: {},
    beanDetail: {},
    bean40: {},
    beanS30: {},
    paramsDetailExcel: {},
    searchParamsAnual: {},
    tipo: '',
    NPROG: 'PX00000185',
    init: function(view) {
        this.childs = Ext.getCmp(prototype.id+'-vskConsulta').items.items;
    },
    afterRender: function () {
        Ext.getCmp(prototype.id+'-contentFilter').hide();
        this.setStoreData();
        this.initDate();
    },
    openExport: function(grid, rowIndex, colIndex) {
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        var fecha = this.beanDetail.DES_BAIR;
	var fuente = this.beanDetail.PERNUM;
	var ccust = this.beanDetail.CCUST;
        Ext.create('Ext.Praxis.view.interline.PassengerInvoicesForm.DataEntry', {
            id: 'DataEntryPassengerInvoicesForm',
            params: {
                strFecha: fecha,
                strFuente: fuente,
                strccust: ccust
            }
        }).show();
        this.exportFile1(ccust,fecha,fuente);
    },
    BuscarTKT_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                this.cargarTicket();
                if (this.getValue("txtTKT") !== '') {
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
        if (this.getValue("txtTKT") === '') {
            this.habilitarFiltros();
        }
    },
    cargarTicket: function() {
        if (this.getValue("txtTKT").length === 13) {
            this.bean20.IN_TKT = this.getValue("txtTKT");
            console.log(this.bean20);
            this.searchTKT(this.bean20);
        } else {
            this.setValue('txtTKT', '');
            global.Msg({msg: 'Ticket number must contain 13 digits.'});
        }
    },
    btn_SourceCode: function(obj, value) {
        if (value) {
            Ext.getCmp(prototype.id+'-cmbSource').setValue('01');
            Ext.getCmp(prototype.id+'-cmbSource').show();
            this.search_Filtro(this.bean30Source);
            this.bean30Source.SOURCOD = Ext.getCmp(prototype.id+'-cmbSource').getValue();
            this.searchSource(this.bean30Source, this.peek());
        } else {
            Ext.getCmp(prototype.id+'-cmbSource').hide();
            this.btnClear_click();
            this.search_Filtro(this.bean);
            this.search(this.bean, this.peek());
        }
    },
    cmbFind_changeHandler: function () {
        var cmbFindBy = Ext.getCmp(prototype.id+'-cmbFindBy').getValue();
        if (cmbFindBy === "TICKET") {
            Ext.getCmp(prototype.id+'-txtRej').hide();
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id+'-txtTKT').show();
            Ext.getCmp(prototype.id+'-lblTkt').setText("Ticket:");
            Ext.getCmp(prototype.id+'-txtTKT').setValue('');
        } else if (cmbFindBy === "REJ") {
            Ext.getCmp(prototype.id+'-txtTKT').hide();
            Ext.getCmp(prototype.id+'-lblTkt').setText("Rej Number:");
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id+'-txtRej').show();
            Ext.getCmp(prototype.id+'-txtRej').setValue("");
        } else {
//            Ext.getCmp(prototype.id+'-lblTkt').hide();
            Ext.getCmp(prototype.id+'-txtTKT').hide();
            Ext.getCmp(prototype.id+'-txtRej').hide();
        }
    },
    
    //<editor-fold defaultstate="collapsed" desc="Filters">
    initDate: function () {
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue("");
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    setStoreData: function() {
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        
        //<editor-fold defaultstate="collapsed" desc="obtainDataAirline_Source">
        Ext.Ajax.request({
            url: prototype.urlMaster+'/obtainDataAirline_Source',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id+'-contentFilter').mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getCmp(prototype.id+'-contentFilter').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstAirlines = res.lstAirlines;
                var lstSource = res.lstSource;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstAirlines,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstSource,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id+'-cmbAirline').bindStore(storeData);
                Ext.getCmp(prototype.id+'-cmbSource').bindStore(storeData2);
                Ext.getCmp(prototype.id+'-cmbAirline').setValue('');
                Ext.getCmp(prototype.id+'-cmbSource').setValue(storeData2.data.items[0].data.CODSOUR);
                global.clear();
                me.btnSearch_click();
            }
        });
        //</editor-fold>
    },
    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    viewDataDetailSFI30: function(column, e, row, column, x, rowData) {
        this.bean40 = x.record.data;
        this.searchdDetail30(this.bean40, this.peek());
    },
    viewDetailCIA: function(column, e, row, column, x, rowData) {
        this.bean40 = x.record.data;
        this.searchdDetail30byCIA(this.bean40, this.peek());
    },
    viewDataSource: function(column, e, row, column, x, rowData) {
        this.beanS30 = x.record.data;
        this.searchSourceDetail(this.beanS30, this.peek());
    },
    viewDetailbySOURCE: function(column, e, row, column, x, rowData) {
        this.bean30 = x.record.data;
        this.searchdDetail30bySOURCE(this.bean30, this.peek());
    },
    viewDetail: function(column, e, row, column, x, rowData) {
        console.log('viewDetail');
        this.bean30 = x.record.data;
        var tipo = this.bean30.SOURCOD;
        if(tipo==='01' ||tipo==='02'||tipo==='03'||
	   tipo==='08'||tipo==='14'||tipo==='21'||
	   tipo==='23'||tipo==='25'||tipo==='26'|| tipo==='90' || tipo==='95'){
            this.searchdDetail20_1(this.bean30);
	}else if(tipo==='91'|| tipo==='04'|| tipo==='05' || tipo==='06' ||  tipo==='31' ||  tipo==='44'
               ||tipo==='45'|| tipo==='46'|| tipo==='74' || tipo==='92' || tipo==='93'){
		  //92 Y 93 INCLUIDO COMO RECHAZOS (ANTES BM) EN COORDINACION CON PMAYORGA 20190715
                  //sE AGREGO 31 A PEDIDO DE EN (EN HTML) 15 ENERO 2021
            this.searchdDetail21_1(this.bean30);
//	}else if(tipo==='92'|| tipo==='93'|| tipo==='09'|| tipo==='94' || tipo==='24'){
	}else if(tipo==='09'|| tipo==='94' || tipo==='24'){
            this.searchdDetail22_1(this.bean30);	  
	}else{
            global.Msg({msg: 'Data not found'});
	}
    },
    viewDataDetailSFI20_1: function (column, e, row, column, x, rowData) {
        this.bean20 = x.record.data;
        this.searchdDetail20(this.bean20);
    },
    viewDataDetailSFI21_1: function (column, e, row, column, x, rowData) {
        this.bean21 = x.record.data;
        this.searchdDetail21(this.bean21);
    },
    viewDataDetailSFI22_1: function (column, e, row, column, x, rowData) {
        this.bean22 = x.record.data;
        this.searchdDetail22(this.bean22);
    },
    viewDetailSFI031_1: function (column, e, row, column, x, rowData) {
          console.log('viewDetailSFI031_1');
        this.bean22 = x.record.data;
        this.loadlstSFI031_1(this.bean22);
    },
    viewDetailSFI033: function (column, e, row, column, x, rowData) {
          console.log('viewDetailSFI033');
        this.bean33 = x.record.data;
        this.searchdDetail33(this.bean33);
    },
    viewProrate: function(column, e, row, column, x, rowData) {
        var beanD = {};
        var nroprt = x.record.data.TKT.replace(' ', '').replace(' ', '');
        if(nroprt.length === 17){
            //0CCC 0FFFFSSSSSS 0C
            beanD.TDNR = nroprt.substring(1, 4) + nroprt.substring(5, 9) + nroprt.substring(9, 15);
            beanD.CPUI = nroprt.substring(16,17);
		
	}else{
            beanD.TDNR = nroprt;
	}
//        this.NPROG = 'PX00000185';
        
        prototypeProgram.view = 'interline-passenger-invoices-form';
        prototypeProgram.nprog = 'PX00000185';
        prototypeProgram.title = 'Passenger Invoices';
        prototypeProgram.modulo = '';
        
        win.displayProFacsimilSearch(this, beanD,'PassInv');
    },
    viewDataDetailSFI41: function (column, e, row, column, x, rowData) {
        this.bean20 = x.record.data;
        this.searchdDetail41(this.bean20, this.peek());
    },
    viewDetailbyCIASOURCE: function (column, e, row, column, x, rowData) {
        this.bean30 = x.record.data;
        var tipo = this.bean30.SOURCOD;
        if(tipo==='01' ||tipo==='02'||tipo==='03'||
	   tipo==='08'||tipo==='14'||tipo==='21'||
	   tipo==='23'||tipo==='25'||tipo==='26'|| tipo==='90' || tipo==='95'){
            this.searchdDetail20bySO(this.bean30, this.peek());
	}else if(tipo==='91'||tipo==='04'|| tipo==='05' || tipo==='06' || tipo==='31' || tipo==='44'
               ||tipo==='45'||tipo==='46'|| tipo==='74' || tipo==='92' || tipo==='93'){
		  //92 Y 93 INCLUIDO COMO RECHAZOS (ANTES BM) EN COORDINACION CON PMAYORGA 20190715
                  //sE AGREGO 31 A PEDIDO DE EN (EN HTML) 15 ENERO 2021
            this.searchdDetail21bySO(this.bean30, this.peek());
//	}else if(tipo==='92'|| tipo==='93'|| tipo==='09'|| tipo==='94' || tipo==='24'){
	}else if(tipo==='09'|| tipo==='94' || tipo==='24'){
            this.searchdDetail22bySO(this.bean30, this.peek());	  
	}else{
            global.Msg({msg: 'Data not found'});
	}
    },
    
    viewDataDetailSFI41_2: function(column, e, row, column, x, rowData) {
        this.bean21 = x.record.data;
        this.searchdDetail41_2(this.bean21);
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e, eOpts) {
        var cmbFindBy = Ext.getCmp(prototype.id+'-cmbFindBy').getValue();
        if (cmbFindBy === "REJ") {
//            if(e.getKey() === 13){
                if (Ext.getCmp(prototype.id+'-txtRej').getValue().trim().length === 10) {
                    this.bean21.REJNUMBER = Ext.getCmp(prototype.id+'-txtRej').getValue();
                    console.log(this.bean21);
                    this.searchRej(this.bean21);
                } else {
                    Ext.getCmp(prototype.id+'-txtRej').setValue('');
                    global.Msg({msg: 'Reject number must contain 10 digits.'});
                }
//            }
        }
        if (cmbFindBy === "TICKET") {
            if (Ext.getCmp(prototype.id+'-txtTKT').getValue().trim() !== '') {
                if (Ext.getCmp(prototype.id+'-txtTKT').getValue().trim().length === 13) {
                    this.bean20.IN_TKT = Ext.getCmp(prototype.id+'-txtTKT').getValue();
                    console.log(this.bean20);
                    this.searchTKT(this.bean20);
                } else {
                    Ext.getCmp(prototype.id+'-txtTKT').setValue('');
                    global.Msg({ms1g: 'Ticket number must contain 13 digits.'});
                }
            }
        } else if (cmbFindBy === "") {
            if (Ext.getCmp(prototype.id+'-btn').getValue()) {
                this.search_Filtro(this.bean30Source);
                this.bean30Source.SOURCOD = Ext.getCmp(prototype.id+'-cmbSource').getValue();
                this.searchSource(this.bean30Source, this.peek());
            } else {
                this.search_Filtro(this.bean);
                if (this.peek() === prototype.id+'-boxMainDataDetail20') {
                    var cmbPMI = Ext.getCmp(prototype.id + '-cmbPMI').getRawValue();
                    cmbPMI = cmbPMI === null ? "" : cmbPMI;
                    if (cmbPMI !== '') {
                        this.bean20.ORIGPMI = Ext.getCmp(prototype.id + '-cmbPMI').getValue();
//                        this.searchdDetail20(this.bean20, this.peek());
                    } else {
                        this.search(this.bean, this.peek());
                    }
                }else{
                    this.search(this.bean, this.peek());
                }
            }
        }
    },
    searchRejection: function(obj, e, eOpts) {
        var cmbFindBy = Ext.getCmp(prototype.id+'-cmbFindBy').getValue();
        console.log(cmbFindBy);
        if (cmbFindBy === "REJ") {
            if(e.getKey() === 13){
                if (Ext.getCmp(prototype.id+'-txtRej').getValue().trim().length === 10) {
                    this.bean21.REJNUMBER = Ext.getCmp(prototype.id+'-txtRej').getValue();
                    console.log(this.bean21);
                    this.searchRej(this.bean21);
                } else {
                    Ext.getCmp(prototype.id+'-txtRej').setValue('');
                    global.Msg({msg: 'Reject number must contain 10 digits.'});
                }
            }
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnTXT_click: function(obj, e) {     
        var msj = '';
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download TXT annual ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportTXT();
                    }
                }
            });
        }
    },
    exportTXT: function(obj, e) {        
        me.bean = {};
        me.bean.BDATE = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParamsAnual = {
            beanString: beanString
        };
        console.log(searchParamsAnual);
        
        global.getFile(prototype.url + '/downloadTxt?beanString=' + searchParamsAnual.beanString + '&flagByMonth=A' );
    },
    btnExcel_click: function(obj, e) {
       
     
        var msj = '';
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    
    },
    exportExcel: function() {
        
        var panel = this.peek().substr(this.peek().indexOf('-')+1);
        console.log(panel);
        switch (panel) {
            case  'boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case 'boxMainData_2':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + encodeURI(JSON.stringify(this.bean30Source)));
                break;
            case 'boxMainDataDetail':
                global.getFile(prototype.url + '/getXLSXDetail?beanString=' + encodeURI(JSON.stringify(this.bean40)));
                break;
            case 'boxMainDataDetail20_1':
                global.getFile(prototype.url + '/getXLSXDetail20_1?beanString=' + encodeURI(JSON.stringify(this.bean30)));
                break;
            case 'boxMainDataDetail20':
                global.getFile(prototype.url + '/getXLSXDetailSFI20_1?beanString=' + encodeURI(JSON.stringify(this.bean20)));
                break;
            case 'boxMainDataDetail21':
                me.goURLpost('searchdDetail21', JSON.stringify(this.bean21), Ext.getCmp(prototype.id + '-gridMainDataDetail21').config.columns.items);
                break;
            case 'boxMainDataDetail21_1':
                me.goURLpost('searchdDetail21_1', JSON.stringify(this.bean30), Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').config.columns.items);
                break;
            case 'boxMainDataDetail22':
                me.goURLpost('searchdDetail22', JSON.stringify(this.bean22), Ext.getCmp(prototype.id + '-gridMainDataDetail22').config.columns.items);
                break;
            case 'boxMainDataDetail22_1':
                me.goURLpost('searchdDetail22_1', JSON.stringify(this.bean30), Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').config.columns.items);
                break;
            case 'boxMainDataDetail33':
                me.goURLpost('searchdDetail33', JSON.stringify(this.bean33), Ext.getCmp(prototype.id + '-gridMainDataDetail33').config.columns.items);
                break;
               
            case 'boxMainDataDetailbyCIA':
                global.getFile(prototype.url + '/getXLSXDetail30byCIA?beanString=' + encodeURI(JSON.stringify(this.bean40)));
                break;
            case 'boxMainDataDetailbySO':
                global.getFile(prototype.url + '/getXLSXDetailbySO?beanString=' + encodeURI(JSON.stringify(this.bean30)));
                break;
            case 'boxMainDataDetail20bySO':
                global.getFile(prototype.url + '/getXLSXDetail20bySO?beanString=' + encodeURI(JSON.stringify(this.bean30)));
                break;
//            case 'boxMainDataDetail21bySO':
//                global.getFile(prototype.url + '/getXLSXDetail21bySO?beanString=' + JSON.stringify(this.bean30));
//                break;
//            case 'boxMainDataDetail22bySO':
//                global.getFile(prototype.url + '/getXLSXDetail22bySO?beanString=' + JSON.stringify(this.bean30));
//                break;

            
                
            default:
                global.Msg(
                    {msg: 'Under Construction'
                });
        }
    },
    btnClear_click: function(obj, e) {
        this.initDate();
        Ext.getCmp(prototype.id+'-cmbAirline').setValue('');
        Ext.getCmp(prototype.id+'-cmbPERNUM').setValue('');
        Ext.getCmp(prototype.id+'-cmbPMI').setValue('');
//        Ext.getCmp(prototype.id+'-cmbSource').setValue('');
    },
    btnBack_click: function(obj, e) {
        if (this.peek() === prototype.id+'-boxMainData') {
            global.showMenu();
        } else {
            this.stack.pop();
            this.selectedChild(this.peek().substr(this.peek().indexOf('-')+1));
        }
    },
    imFavo_clickHandler: function (cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url+"addFav2.png") {
            cmp.setIcon(url+"delFav.png");
            Ext.getCmp(prototype.id+'-imgType').setTooltip("Delete Favorite");
            global.Msg({ msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url+"delFav.png") {
            cmp.setIcon(url+"addFav2.png");
            Ext.getCmp(prototype.id+'-imgType').setTooltip("Add Favorite");
            global.Msg({ msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean, boxActual) {
//        this.stack = [];
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-contentInfo' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI040");
                    
                    me.selectedChild('boxMainData');
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchSource">
    searchSource: function (bean30Source, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainData' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchSource'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30Source)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI030");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainData_2');
                            
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainData_2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="exportFile1">
    exportFile1: function (strcia, strFecha, strPeriodo) {
        Ext.Ajax.request({
            url: prototype.url + '/exportFile1',
            method: 'POST',
            timeout: 60000000,
            params: {strcia: strcia, strFecha: strFecha, strPeriodo: strPeriodo},
            beforerequest: Ext.getCmp('DataEntryPassengerInvoicesForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryPassengerInvoicesForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaFile = res.listaArray;
                    if(listaFile.length > 0){
                        Ext.getCmp(prototype.id + '-gridFileNames').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", { data: listaFile })
                        );
                        meEntry.strFormatDate = listaFile[0].strFormatDate;
                        meEntry.str = res.str;
                    } else {
                        global.Msg({msg: 'This File has not been created.'});
                        meEntry.btnCancel_clickHandler();
                    }
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryPassengerInvoicesForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail30">
    searchdDetail30: function (bean40, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainData' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail30'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean40)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI030");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail');
                            var bean30 = obj.data.items[0].data;
                            
                            Ext.getCmp(prototype.id+'-gridMainDataDetail').setTitle('Billing Date. : '+ bean30.strFormatDate +'   ' +' Period : ' +bean30.PERNUM);
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail20_1">
    searchdDetail20_1: function (bean30) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail20_1'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI020");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail20_1');
                            var bean = obj.data.items[0].data;
                            
                            Ext.getCmp(prototype.id+'-gridMainDataDetail20_1').setTitle('Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+ '  ' +' | '+'  '+bean30.IN_FECHA_FROM);
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail20_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin12').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail20">
    searchdDetail20: function (bean20) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail20'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean20)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI020");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail20');
                            var bean = obj.data.items[0].data;
                            me.tipo='c2';
                            
//                            Ext.getCmp(prototype.id+'-gridMainDataDetail20').setTitle('Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+'   ' +' Airline Code : ' +bean.BDAIR);
                            Ext.getCmp(prototype.id+'-gridMainDataDetail20').setTitle('<center style="font-size:13px;"> Billing Date. : ' + bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+'   ' +' Airline Code : ' +bean.BDAIR + '</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail20').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail21_1">
    searchdDetail21_1: function (bean30) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail21_1'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI021");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail21_1');
                            var bean = obj.data.items[0].data;
                                                                                        
                            Ext.getCmp(prototype.id+'-gridMainDataDetail21_1').setTitle('Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+ '  ' +' | '+'  '+bean30.IN_FECHA_FROM);
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail21_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin14').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail21">
    searchdDetail21: function (bean21) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail21'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean21)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI021");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail21');
                            var bean = obj.data.items[0].data;
                            me.tipo='c3';
                                                      
                            Ext.getCmp(prototype.id+'-gridMainDataDetail21').setTitle('<center style="font-size:13px;"> Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+'   ' +' Airline Code : ' +bean.BDAIR + '</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail21').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin6').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail22_1">
    searchdDetail22_1: function (bean30) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail22_1'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI022");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail22_1');
                            var bean = obj.data.items[0].data;
                                                      
                            Ext.getCmp(prototype.id+'-gridMainDataDetail22_1').setTitle('Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+'   ' +' Airline Code : ' +bean.BDAIR);
                            Ext.getCmp(prototype.id+'-cmbPMI').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail22_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin15').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //
    //<editor-fold defaultstate="collapsed" desc="searchdDetail22">
    searchdDetail22: function (bean22) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail22'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean22)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI022");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail22');
                            var bean = obj.data.items[0].data;
                                                      
                            Ext.getCmp(prototype.id+'-gridMainDataDetail22').setTitle('Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Source Code : ' +bean.SOURCOD+'   ' +' | ' + ' ' +bean.IN_FECHA_FROM);
                            Ext.getCmp(prototype.id+'-cmbPMI').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail22').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin7').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defauviewDetailSFI033ltstate="collapsed" desc="loadlstSFI031_1">
    loadlstSFI031_1: function (bean22) {
        Ext.Ajax.request({
            url: prototype.url + '/loadlstSFI031_1',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(bean22)
            },
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var lstSFI031_1 = res.data;
                console.log(lstSFI031_1);
                me.mostrarWindow(lstSFI031_1);
                
            }
        });
        
    },
    mostrarWindow: function (obj) {
        
        
        var win = new Ext.Window({
            title: 'Passenger Invoices SFI031 Complete Information',
            id:prototype.id+'-BoxRemarks',
            layout: 'fit',
            autoScroll: true,
            y: 140,
            width: 650,
            height: 280,
            modal: true,
            closeAction: 'hide',
            items: [
            
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    defaults: {
                                xtype: 'textfield',
                                padding: '5 5 5 5',
                                labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                                fieldStyle: 'text-align:center;font-weight:bold'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtNUMRMK',
                            fieldLabel:'RM Reason / Remarks Number: ',
                            fieldStyle: 'text-align:left;background:#E5EDFC;color:#2E486C;',
                            labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                            readOnly: true,
                            value: obj.NUMRMK,
                            labelWidth: 220,
                            width: 260
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtREMARK1',
                            fieldLabel:'Remark 1',
                            fieldStyle: 'text-align:left;background:#E5EDFC;color:#2E486C;',
                            labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                            readOnly: true,
                            value: obj.REMARK1,
                            labelWidth: 120,
                            width: 600
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtREMARK2',
                            fieldLabel:'Remark 2',
                            fieldStyle: 'text-align:left;background:#E5EDFC;color:#2E486C;',
                            labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                            readOnly: true,
                            value: obj.REMARK2,
                            labelWidth: 120,
                            width: 600
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtREMARK3',
                            fieldLabel:'Remark 3',
                            fieldStyle: 'text-align:left;background:#E5EDFC;color:#2E486C;',
                            labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                            readOnly: true,
                            value: obj.REMARK3,
                            labelWidth: 120,
                            width: 600
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtREMARK4',
                            fieldLabel:'Remark 4',
                            fieldStyle: 'text-align:left;background:#E5EDFC;color:#2E486C;',
                            labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                            readOnly: true,
                            value: obj.REMARK4,
                            labelWidth: 120,
                            width: 600
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtREMARK5',
                            fieldLabel:'Remark 5',
                            fieldStyle: 'text-align:left;background:#E5EDFC;color:#2E486C;',
                            labelStyle: 'text-align:left;color:#0b333c;font-weight:bold;',
                            readOnly: true,
                            value: obj.REMARK5,
                            labelWidth: 120,
                            width: 600
                        }
                    ]
                }
            ],
            listeners:{
               close:function(){
                       win.destroy();
               }
           }
        });
        win.show();
        
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail30byCIA">
    searchdDetail30byCIA: function (bean40, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainData' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail30byCIA'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean40)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI030");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetailbyCIA');
                            var bean30 = obj.data.items[0].data;
                            
                            Ext.getCmp(prototype.id+'-gridMainDataDetailbyCIA').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean30.strFormatDate +'   ' +' Period : ' +bean30.PERNUM+'</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetailbyCIA').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //
    //<editor-fold defaultstate="collapsed" desc="searchdDetail33">
    searchdDetail33: function (bean33) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail33'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean33)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI033");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail33');
                            var bean = obj.data.items[0].data;
                            
                            var tit = Ext.getCmp(prototype.id + '-gridMainDataDetail33');
                            tit.setTitle('<center style="font-size:12px;">' + 'Billing Date. : '+ bean.strFormatDate +'   ' +' Period : ' +bean.PERNUM +'   ' +' Airline Code : ' +bean.BDAIR + '</center>');
                                                      
                            Ext.getCmp(prototype.id+'-cmbPMI').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else {
                        global.Msg({msg: res.sesion});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail33').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin16').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchSourceDetail">
    searchSourceDetail: function (beanS30, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainData_2' : boxActual;
        if(this.bean30Source.SOURCOD==='01' || this.bean30Source.SOURCOD==='02' || this.bean30Source.SOURCOD==='03' ||
	   this.bean30Source.SOURCOD==='08' || this.bean30Source.SOURCOD==='14' || this.bean30Source.SOURCOD==='21' ||
	   this.bean30Source.SOURCOD==='23' || this.bean30Source.SOURCOD==='25' || this.bean30Source.SOURCOD==='26' || this.bean30Source.SOURCOD==='90'){
            //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail20 => paggin5">
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url+'/searchSourceDetail'
                },
                listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(boxActual).mask('Loading...');
                        obj.proxy.extraParams = {beanString: JSON.stringify(beanS30)};
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        Ext.getCmp(boxActual).unmask();
                        win.lblUser_toolTip("Estructura: SFI020");
                        var res = Ext.JSON.decode(response._response.responseText);
                        if (res.success) {
                            if (obj.data.length > 0) {
                                me.selectedChild('boxMainDataDetail20');
                                var bean = obj.data.items[0].data;
                                me.tipo='S';
                                
                                Ext.getCmp(prototype.id+'-lblTitulo20').setText('<center style="font-size:13px;">Billing Date. : '+ bean.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean.PERNUM +'&nbsp&nbsp ' +' Source Code : ' +bean.SOURCOD+'&nbsp&nbsp ' +' Airline Code : ' +bean.BDAIR+'</center>');
                                Ext.getCmp(prototype.id + '-cmbPMI').show();
                            } else {
                                global.Msg({msg: 'Data not found'});
                            }
                        } else global.Msg({msg: res.sesion});
                        global.clear();
                    }
                }
            });
            Ext.getCmp(prototype.id+'-gridMainDataDetail20').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id+'-paggin5').bindStore(storeGridDatas);
            //</editor-fold>
        }else if(this.bean30Source.SOURCOD==='91' || this.bean30Source.SOURCOD==='04' || this.bean30Source.SOURCOD==='05' ||
	         this.bean30Source.SOURCOD==='06' || this.bean30Source.SOURCOD==='44' || this.bean30Source.SOURCOD==='45' || this.bean30Source.SOURCOD==='46'){
            //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail21 => paggin6">
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url+'/searchSourceDetail'
                },
                listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(boxActual).mask('Loading...');
                        obj.proxy.extraParams = {beanString: JSON.stringify(beanS30)};
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        Ext.getCmp(boxActual).unmask();
                        win.lblUser_toolTip("Estructura: SFI021");
                        var res = Ext.JSON.decode(response._response.responseText);
                        if (res.success) {
                            if (obj.data.length > 0) {
                                me.selectedChild('boxMainDataDetail21');
                                var bean1 = obj.data.items[0].data;
                                me.tipo='S1';
                                Ext.getCmp(prototype.id + '-cmbPMI').hide();
                                Ext.getCmp(prototype.id+'-gridMainDataDetail21').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean1.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean1.PERNUM +'&nbsp&nbsp ' +' Source Code : ' +bean1.SOURCOD+'&nbsp&nbsp ' +' Airline Code : ' +bean1.BDAIR+'</center>');
                                Ext.getCmp(prototype.id + '-cmbPMI').show();
                            } else {
                                global.Msg({msg: 'Data not found'});
                            }
                        } else global.Msg({msg: res.sesion});
                        global.clear();
                    }
                }
            });
            Ext.getCmp(prototype.id+'-gridMainDataDetail21').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id+'-paggin6').bindStore(storeGridDatas);
            //</editor-fold>
        }else if(this.bean30Source.SOURCOD==='92' || this.bean30Source.SOURCOD==='93' || this.bean30Source.SOURCOD==='09' ||
	         this.bean30Source.SOURCOD==='94' || this.bean30Source.SOURCOD==='24' ){
            //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail22 => paggin7">
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url+'/searchSourceDetail'
                },
                listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(boxActual).mask('Loading...');
                        obj.proxy.extraParams = {beanString: JSON.stringify(beanS30)};
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        Ext.getCmp(boxActual).unmask();
                        win.lblUser_toolTip("Estructura: SFI022");
                        var res = Ext.JSON.decode(response._response.responseText);
                        if (res.success) {
                            if (obj.data.length > 0) {
                                me.selectedChild('boxMainDataDetail22');
                                var bean2 = obj.data.items[0].data;
                                me.tipo='S2';
                                
                                Ext.getCmp(prototype.id+'-gridMainDataDetail22').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean2.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean2.PERNUM +'&nbsp&nbsp ' +' Source Code : ' +bean2.SOURCOD+'&nbsp&nbsp ' +' Airline Code : ' +bean2.BDAIR+'</center>');
                                Ext.getCmp(prototype.id + '-cmbPMI').show();
                            } else {
                                global.Msg({msg: 'Data not found'});
                            }
                        } else global.Msg({msg: res.sesion});
                        global.clear();
                    }
                }
            });
            Ext.getCmp(prototype.id+'-gridMainDataDetail22').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id+'-paggin7').bindStore(storeGridDatas);
            //</editor-fold>
        } else {
            global.Msg({msg: 'Data not found'});
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail41">
    searchdDetail41: function (bean20, boxActual) {
//        console.log(bean20);        
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail41'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean20)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI041");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        console.log(res);
                        console.log(obj.data.items[0].data);
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail41');
                            var bean = obj.data.items[0].data;
                            console.log(obj.data.items[0].data);
                            Ext.getCmp(prototype.id+'-gridDataDetail41').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean.BDATE +'   ' +'        Period :' +bean.PERNUM +'   ' +'        Ticket : ' +bean.TKT);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataDetail41').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail30bySOURCE">
    searchdDetail30bySOURCE: function (bean30, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainDataDetailbyCIA' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail30bySOURCE'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI030");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetailbySO');
                            var bean30 = obj.data.items[0].data;
                            
                            Ext.getCmp(prototype.id+'-gridMainDataDetailbySO').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean30.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean30.PERNUM+'&nbsp&nbsp ' +' Airline code : ' +bean30.BDAIR+'</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetailbySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin8').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail20bySO">
    searchdDetail20bySO: function (bean30, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainDataDetailbySO' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail20bySO'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI020");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail20bySO');
                            var bean = obj.data.items[0].data;
                            me.tipo='c1';
                            Ext.getCmp(prototype.id+'-lblTitulo20bySO').setText('<center style="font-size:13px;">Billing Date. : '+ bean.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean.PERNUM +'&nbsp&nbsp ' +' Source Code : ' +bean.SOURCOD +'&nbsp&nbsp ' +' Airline Code : ' +bean.BDAIR+'</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            Ext.getCmp(prototype.id + '-cmbPMI').hide();
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail20bySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin9').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail21bySO">
    searchdDetail21bySO: function (bean30, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainDataDetailbySO' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail21bySO'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI021");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail21bySO');
                            var bean = obj.data.items[0].data;
                            me.tipo='c4';
                            Ext.getCmp(prototype.id+'-gridMainDataDetail21bySO').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean.PERNUM +'&nbsp&nbsp ' +' Source Code : ' +bean.SOURCOD+'&nbsp&nbsp ' +' Airline Code : ' +bean.BDAIR+'</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail21bySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin10').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchdDetail22bySO">
    searchdDetail22bySO: function (bean30, boxActual) {
        boxActual = boxActual === undefined || boxActual === '' ? prototype.id + '-boxMainDataDetailbySO' : boxActual;
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail22bySO'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean30)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: SFI022");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail22bySO');
                            var bean = obj.data.items[0].data;
                            me.tipo='c6';
                            Ext.getCmp(prototype.id+'-gridMainDataDetail22bySO').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean.strFormatDate +'&nbsp&nbsp ' +' Period : ' +bean.PERNUM +'&nbsp&nbsp ' +' Source Code : ' +bean.SOURCOD+'&nbsp&nbsp ' +' Airline Code : ' +bean.BDAIR+'</center>');
                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataDetail22bySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin11').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTKT">
    searchTKT: function (bean20) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchTKT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean20)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI020");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxTKT');
                            var bean = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridBoxTKT').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-paggin13').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchRej">
    searchRej: function (bean21) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchRej'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean21)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI021");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('srcRN');
                            var bean = obj.data.items[0].data;                            
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridSrcRN').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin13').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="searchdDetail41_2">
    searchdDetail41_2: function (bean21) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchdDetail41_2'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean21)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI041");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxMainDataDetail41_2');
                            var bean = obj.data.items[0].data;
//                            me.tipo='c2';
                            Ext.getCmp(prototype.id+'-gridDataDetail41_2').setTitle('<center style="font-size:13px;">Billing Date. : '+ bean.BDATE +'   ' +'   Period : ' +bean.PERNUM +'   ' +'   Rejection Nbr. : ' +bean.RBCNUM);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataDetail41_2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    viewDetailSFI031: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        var bean21 = {};
        bean21 = rowData.data;
        this.loadlstSFI031(bean21);
    },
    loadlstSFI031: function(bean21) {
        console.log(bean21);
        Ext.Ajax.request({
            url: prototype.url + '/loadlstSFI031',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean21)},
            beforerequest: (Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').mask('Loading...'),Ext.getCmp(prototype.id + '-gridMainDataDetail21').mask('Loading...')),
            success: function(response, opts) {
                console.log(response);
                Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').unmask();
                Ext.getCmp(prototype.id + '-gridMainDataDetail21').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var objSFI031 = res.result;
                    console.log(objSFI031);
                    if (objSFI031 !== null) {
                        Ext.create('Ext.Praxis.view.interline.PassengerInvoicesForm.DataEntryRe', {
                            id: prototype.id + '-DataEntryRePassengerInvoicesForm',
                            params: {
                                bean: objSFI031
                            }
                        }).show();
                    } else {
                        global.Msg(
                                {msg: 'Data not found'
                                });
                    }
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').unmask();
                Ext.getCmp(prototype.id + '-gridMainDataDetail21').unmask();
            }
        });
    },
    
    habilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbAirline').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbPERNUM').enable(true);
        Ext.getCmp(prototype.id + '-cmbPMI').enable(true);
    },
    deshabilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbAirline').disable(true);
        Ext.getCmp(prototype.id + '-cmbPERNUM').disable(true);
        Ext.getCmp(prototype.id + '-cmbPMI').disable(true);
    },
    search_Filtro: function (obj) {
        obj.yearFrom = Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue();
        obj.monthFrom = Ext.getCmp(prototype.id+'-cmbDateFromMonth').getValue();
        obj.yearTo = Ext.getCmp(prototype.id+'-cmbDateToYear').getValue();
        obj.monthTo = Ext.getCmp(prototype.id+'-cmbDateToMonth').getValue();
        obj.dayFrom='';
        obj.dayTo=''; 
        obj.BDAIR = Ext.getCmp(prototype.id+'-cmbAirline').getValue();
        obj.PERNUM = Ext.getCmp(prototype.id+'-cmbPERNUM').getValue();
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        this.getPaggin().moveFirst();
    },
    pagPrevious: function(obj, e) {
        this.getPaggin().movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin().moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin().moveLast();
    },
    // </editor-fold>

    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    onValidarChange: function() {
        var list = Ext.getCmp(prototype.id+'-txtTKT').getValue().replace(/\s/g, "").split("");
        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        Ext.getCmp(prototype.id+'-txtTKT').setValue(txtTicket.substring(0, 13));
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(box) {
        if(!win.visible(box)) {
            this.stack.push(prototype.id+'-'+box);
            global.selectedChild(this.childs, prototype.id+'-'+box);
        }
        var paggin = this.getPaggin();
        if (paggin === null) {
            win.visible('boxPaginacion', false);
            win.visible('boxPagDetail', false);
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = paggin.getPageData();
            
            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);
            
            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);
            //</editor-fold>
            win.visible('boxPaginacion', true);
            win.visible('boxPagDetail', true);

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id+'-'+box).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id+'-boxPagDetail').setWidth(width);
        }
    },
    getPaggin: function() {
        switch (this.peek()) {
            case prototype.id+'-boxMainData': return Ext.getCmp(prototype.id + '-paggin');
            case prototype.id+'-boxMainData_2': return Ext.getCmp(prototype.id + '-paggin2');
            case prototype.id+'-boxMainDataDetail': return Ext.getCmp(prototype.id + '-paggin3');
            case prototype.id+'-boxMainDataDetailbyCIA': return Ext.getCmp(prototype.id + '-paggin4');
            case prototype.id+'-boxMainDataDetail20': return Ext.getCmp(prototype.id + '-paggin5');
            case prototype.id+'-boxMainDataDetail21': return Ext.getCmp(prototype.id + '-paggin6');
            case prototype.id+'-boxMainDataDetail22': return Ext.getCmp(prototype.id + '-paggin7');
            case prototype.id+'-boxMainDataDetailbySO': return Ext.getCmp(prototype.id + '-paggin8');
            case prototype.id+'-boxMainDataDetail20bySO': return Ext.getCmp(prototype.id + '-paggin9');
            case prototype.id+'-boxMainDataDetail21bySO': return Ext.getCmp(prototype.id + '-paggin10');
            case prototype.id+'-boxMainDataDetail22bySO': return Ext.getCmp(prototype.id + '-paggin11');
            case prototype.id+'-boxMainDataDetail20_1': return Ext.getCmp(prototype.id + '-paggin12');
            case prototype.id+'-boxMainDataDetail21_1': return Ext.getCmp(prototype.id + '-paggin14');
            case prototype.id+'-boxMainDataDetail22_1': return Ext.getCmp(prototype.id + '-paggin15');
            case prototype.id+'-boxMainDataDetail33': return Ext.getCmp(prototype.id + '-paggin16');
            case prototype.id+'-srcRN': return Ext.getCmp(prototype.id + '-paggin13');
            default: return null;
        }
    },
    peek: function() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    ,
    goURLpost: function (method,parms,columns) {
        console.log('goURLpost');
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
    openExportManyExcels: function(grid, rowIndex, colIndex) {
        
        var flagByMonth = "";
        
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        this.beanExcel.BDATE = this.beanDetail.BDATE;
        this.beanExcel.PERNUM = this.beanDetail.PERNUM;
//        
        me.paramsDetailExcel.beanString = JSON.stringify(this.beanExcel);
        
        if(colIndex === 12){
            flagByMonth = "Y";
            global.getFile(prototype.url + '/downloadTxt?beanString=' + me.paramsDetailExcel.beanString + '&flagByMonth=' + flagByMonth);
        }else{
            flagByMonth = "";
            global.getFile(prototype.url + '/downloadXlsxs?beanString=' + me.paramsDetailExcel.beanString + '&flagByMonth=' + flagByMonth);
        }
    },
    
    exportExcelEMD: function(grid, rowIndex, colIndex) {
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        this.beanExcel.BDATE = this.beanDetail.BDATE;
        this.beanExcel.PERNUM = this.beanDetail.PERNUM;
        me.paramsDetailExcel.beanString = JSON.stringify(this.beanExcel);   
        Ext.Ajax.request({
            url: prototype.url + '/ObtenDato',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.beanExcel)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaFile = res.listaArray;
                    if(listaFile.length > 0){
                        
                        global.getFile(prototype.url + '/downloadExcelEMD?beanString=' + me.paramsDetailExcel.beanString);
                    } else {
                        global.Msg({msg: 'Data not found.'});
                    }
                } else global.Msg({msg: res.sesion});
            }
        });
    }
});
