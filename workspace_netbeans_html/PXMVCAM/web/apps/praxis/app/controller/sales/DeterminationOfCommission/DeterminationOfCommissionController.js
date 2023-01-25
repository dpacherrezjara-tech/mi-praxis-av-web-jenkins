Ext.define('Ext.Praxis.controller.sales.DeterminationOfCommission.DeterminationOfCommissionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeterminationOfCommissionController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    beanSQP013627: {},
    beanSQP01362: {},
    me: '',
    _path: '',
    _pathTesting: '',
    FF: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'DeterminationOfCommissionForm';
        prototype.url = CONTEXTPATH+'/DeterminationOfCommission';
        prototype.widthContenedor = 1825;
        prototype.widthGrid = 1790;
        prototype.widthGrid2 = 1420;
        prototype.widthGrid3 = 1800;
        // </editor-fold>
    },
    afterRender: function () {
        this.getListCountry();
        this.getListSchema();
        this.setStoreData();
        this.btnClear_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        if (newValue!=='') {
            if (comboToYear.getValue()!=='') {
                if (newValue > comboToYear.getValue()) {
                    comboToYear.setValue(newValue);
                }
            } else comboToYear.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateFromYear');
        if (newValue!=='') {
            if (comboFromYear.getValue()!=='') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (newValue > comboToMonth.getValue()) {
                    comboToMonth.setValue(newValue);
                }
            }
        } else {
            comboToMonth.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue()!=='') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else comboFromMonth.setValue(newValue);
            }
        } else {
            comboFromMonth.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    onGetListTicketOneKeypress: function ( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            switch (this.getValue('cmbSelectBy')) {
                case '3':
                    if (this.getValue('txtIATA')!=='')
                        this.getListIATA();
                    break;
                case '2':
                    if (this.getValue('txtTicket')!=='')
                        this.getListTicket();
                    break;
            }
        }
    },
    onSetChangeEnvironmentChange: function(cmp, value) {
        this.removeAllGrid();
        if (value === 'P') {
            Ext.getCmp(prototype.id+'-ID_Assign_ADM_ACM').show();
            Ext.getCmp(prototype.id+'-ID_Reprocessing').show();
            Ext.getCmp(prototype.id+'-grid_det_comm_GridGroup').setWidth(prototype.widthGrid);
            Ext.getCmp(prototype.id+'-pie').setWidth(prototype.widthGrid);
        } else {
            Ext.getCmp(prototype.id+'-ID_Assign_ADM_ACM').hide();
            Ext.getCmp(prototype.id+'-ID_Reprocessing').hide();
            Ext.getCmp(prototype.id+'-grid_det_comm_GridGroup').setWidth(prototype.widthGrid-170);
            Ext.getCmp(prototype.id+'-pie').setWidth(prototype.widthGrid-170);
        }
    },
    getListIATA: function() {
        this.setClearFilter2();
        this.setClearPage2();
        this.setViewTkT();
        var schema = this.getValue('txtChema');
        this.beanSQP013627.A2845INDAC = schema.substring(9,10);
        this.beanSQP013627.VP_SCHEMA=schema.substring(3,9);
        this.beanSQP013627.VP_AGENTE=this.getValue('txtIATA');
        var MSI = this.getValue('cmbDateFromMonth');
        var MSF = this.getValue('cmbDateToMonth');
        if(MSI==='')MSI='01';
	if(MSF==='')MSF='12';
        this.beanSQP013627.VP_FPROC_D = this.getValue('cmbDateFromYear')+MSI;
        this.beanSQP013627.VP_FPROC_H = this.getValue('cmbDateToYear')+MSF;
        this.beanSQP013627.VP_FUENT = this.FF;
        this.beanSQP013627.VP_STATUS = this.getValue('cmbStatus');
        this.setIATA(true);
        Ext.getCmp(prototype.id + '-GridGroup').hide();
        Ext.getCmp(prototype.id + '-GridTMtotalperMonth').show();
        Ext.getCmp(prototype.id + '-GridGroupView').hide();
        if (this.getValue('cmbEnvironment')==='P') {
            this.setGridData();
        } else {
            this.setGridDataTesting();
        }
    },
    setViewTkT: function() {
        this.setLABEL(false);
        this.setTHS(false);
        this.setIATA(false);
        Ext.getCmp(prototype.id + '-GridGroup').hide();
        Ext.getCmp(prototype.id + '-GridTMtotalperMonth').show();
        Ext.getCmp(prototype.id + '-GridGroupView').hide();
    },
    getListTicket: function() {
        this.setClearFilter2();
        this.setClearPage2();
        var strTicket = this.getValue('txtTicket');
        if (strTicket!=='') {
            this.beanSQP013627.VP_CIA=strTicket.substr(0,3);
            this.beanSQP013627.VP_FORMA=strTicket.substr(3,4);
            this.beanSQP013627.VP_SERIE=strTicket.substr(7,6);
        } else {
            var MSI = this.getValue('cmbDateFromMonth');
            var MSF = this.getValue('cmbDateToMonth');
            if(MSI==='')MSI='01';
            if(MSF==='')MSF='12';
            this.beanSQP013627.VP_FPROC_D=this.getValue('cmbDateFromYear')+MSI;
            this.beanSQP013627.VP_FPROC_H=this.getValue('cmbDateToYear')+MSF;
            var schema = this.getValue('txtChema');
            this.beanSQP013627.A2845INDAC=schema.substring(9,10);//'U';
            this.beanSQP013627.VP_SCHEMA=schema.substring(3,9);//txtChema.selectedItem.data;
            this.beanSQP013627.VP_FUENT = this.FF;
            if (this.getValue('cmbPais')!==null) {
                this.beanSQP013627.VP_PAIVTA = this.getValue('cmbPais');
            }
        }
        if (this.getValue('cmbEnvironment')==='P') {
            this.setGridData();
        } else {
            this.setGridDataTesting();
        }
    },
    getShowChange: function() {
        this.setLABEL(false);
        this.setIATA(false);
        this.setTHS(false);
        this.setSTATUS(false);
        switch (this.getValue('cmbSelectBy')) {
            case '1':
                this.setLABEL(true);
                Ext.getCmp(prototype.id + '-GridGroup').show();
                Ext.getCmp(prototype.id + '-GridTMtotalperMonth').hide();
                Ext.getCmp(prototype.id + '-GridGroupView').hide();
                break;
            case '2':
                this.setTHS(true);
                Ext.getCmp(prototype.id + '-GridGroup').hide();
                Ext.getCmp(prototype.id + '-GridTMtotalperMonth').show();
                Ext.getCmp(prototype.id + '-GridGroupView').hide();
                break;
            case '3':
                this.setIATA(true);
                this.setSTATUS(true);
                Ext.getCmp(prototype.id + '-GridGroup').show();
                Ext.getCmp(prototype.id + '-GridTMtotalperMonth').hide();
                Ext.getCmp(prototype.id + '-GridGroupView').hide();
                break;
        }
    },
    execSearch: function() {
        this.setClearFilter();
        switch (this.getValue('cmbSelectBy')) {
            case '3':
                if (this.getValue('txtIATA')==='') {
                    var MSI = this.getValue('cmbDateFromMonth');
                    var MSF = this.getValue('cmbDateToMonth');
                    if(MSI==='')MSI='01';
                    if(MSF==='')MSF='12';
                    var schema = this.getValue('txtChema');
                    // <editor-fold defaultstate="collapsed" desc="asignación">
                    this.beanSQP01362.A2845INDAC=schema.substring(9,10);//'U';
                    this.beanSQP01362.VP_SCHEMA=schema.substring(3,9);//txtChema.selectedItem.data;
                    this.beanSQP01362.VP_FPROC_D=this.getValue('cmbDateFromYear')+MSI;
                    this.beanSQP01362.VP_FPROC_H=this.getValue('cmbDateToYear')+MSF;
                    this.beanSQP01362.VP_FUENT = this.FF;
                    this.beanSQP01362.VP_STATUS=this.getValue('cmbStatus');
                    if (this.getValue('cmbPais') !== null) {
                        this.beanSQP01362.VP_PAIVTA = this.getValue('cmbPais');
                    }
                    // </editor-fold>
                    if (this.getValue('cmbEnvironment')==='P') {
                        _path = prototype.url+'/getXLSX?';
                        this.setGridDataListFPROC();
                    } else {
                        _path = prototype.url+'/getXLSXTesting?';
                        this.setGridDataListFPROCTesting();
                    }
                    _path += 
                        'VP_CIA='+this.beanSQP01362.VP_CIA+'&' +
                        'A2845INDAC='+this.beanSQP01362.A2845INDAC+'&' +
                        'VP_SCHEMA='+this.beanSQP01362.VP_SCHEMA+'&' +
                        'VP_FPROC_D='+this.beanSQP01362.VP_FPROC_D+'&' +
                        'VP_FPROC_H='+this.beanSQP01362.VP_FPROC_H+'&' +
                        'VP_FUENT='+this.beanSQP01362.VP_FUENT+'&' +
                        'VP_PAIVTA='+this.beanSQP01362.VP_PAIVTA+'&' +
                        'VP_STATUS='+this.beanSQP01362.VP_STATUS;
                } else {
                    this.getListIATA();
                }
                break;
            case '2':
                this.getListTicket();
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onGetShowListByAgentClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setClearFilter2();
        this.setClearPage2();
        this.setTHS(true);
	this.setSTATUS(false);
	this.beanSQP013627.VP_CIA='139';
	this.beanSQP013627.VP_AGENTE=data.A2845IATAH;
        this.setValue('cmbSelectBy', '2');
        
        var MSI = this.getValue('cmbDateFromMonth');
        var MSF = this.getValue('cmbDateToMonth');
        if(MSI==='')MSI='01';
        if(MSF==='')MSF='12';
        this.beanSQP013627.VP_FPROC_D=this.getValue('cmbDateFromYear')+MSI;
        this.beanSQP013627.VP_FPROC_H=this.getValue('cmbDateToYear')+MSF;
        var schema = this.getValue('txtChema');
        
        this.beanSQP013627.A2845INDAC=schema.substring(9,10);//'U';
        this.beanSQP013627.VP_SCHEMA=schema.substring(3,9);//txtChema.selectedItem.data;
        this.beanSQP013627.VP_FUENT = this.FF;
        this.beanSQP013627.VP_STATUS=this.getValue('cmbStatus');
        
        if (this.getValue('cmbEnvironment')==='P') {
            this.setGridData();
        } else {
            this.setGridDataTesting();
        }
    },
    onSearchInfoREPROClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var BE = {};
        BE.A2845INDAC='U';
	BE.VP_SCHEMA='';
	BE.VP_FPROC_D=data.A2959FPERI;
	BE.VP_FPROC_H=data.A2959FPERI;
	BE.VP_FUENT = data.A2845FUENT;
	BE.VP_PAIVTA= data.A2845PAIVT;
	BE.VP_A2959IATAH= data.A2845IATAH;
	BE.VP_A2959AGENT= data.A2845AGENT;
        if (data.A2959REPRO!=='N') {
            Ext.create('Ext.Praxis.view.sales.DeterminationOfCommissionForm.DataEntry', {
                id: 'DataEntryDeterminationOfCommissionForm',
                params: {
                    data: data,
                    bean: BE
                }
            }).show();
        }
    },
    onSearchInfoADMClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        if (data.STATUS!=='Y') {
            global.Msg({ msg: 'ADM pending or IATA Disabled' });
        } else {
            Ext.create('Ext.Praxis.view.sales.DeterminationOfCommissionForm.DataEntryInfoADM', {
                id: 'DataEntryInfoADMDeterminationOfCommissionForm',
                params: {
                    data: data,
                    beanSQP01362: this.beanSQP01362
                }
            }).show();
        }
    },
    onSetAsignADMACMClick: function(column, e, row, column, x, rowData) {
        var BE = {};
        var beanX = x.record.data;
        var anio = beanX.A2959FPERI.substring(0,4);
        var mes = beanX.A2959FPERI.substring(4,6);
        BE.A2960AIRLI  = beanX.A2845AIRLI;
	BE.IN_DATEFROM= beanX.A2959FPERI+'01';
        BE.IN_DATETO= beanX.A2959FPERI+''+this.btnDias_clickHandler(anio, mes);
        BE.IN_DATEPER1= beanX.A2959FPERI;
	BE.IN_LOTE= beanX.LOTE; 
	BE.IN_IATA= beanX.A2845AGENT;
	BE.IN_SELET_TYPE= beanX.A2959INDAC;
	BE.IN_SELET_BASE= 'M';
        var dat = "";
	if(beanX.STATUS==="P")dat ="Pending";
	if(beanX.STATUS==="D")dat ="IATA Disabled";
	if(beanX.STATUS==="C")dat ="Not Client Register";
	if(beanX.STATUS==="Y")dat ="Processed "+beanX.A2959TRNCO;
        if(beanX.STATUS!=='P'){
            global.Msg({ msg: 'You can not assign this record ('+dat+')' });
        } else {
            if(beanX.APPLY_ADM==='NO'){
                global.Msg({ msg: 'You can not assign this record' });
            } else {
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to assign?',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'ok') {
                            this.getLoadCommiADMACM(BE);
                        }
                    }
                });
            }
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.getSerachList();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
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
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue('cmbPais', '');
        this.setValue('cmbSelectBy', '3');
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        this.removeAllGrid();
        // </editor-fold>
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
            global.showMenu();
        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
            Ext.getCmp(prototype.id+'-GridTMtotalperMonth').hide();
            Ext.getCmp(prototype.id+'-GridGroup').show();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridData', {
            proxy: {
                url: prototype.url+'/getListTicket'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanSQP013627;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP013627");
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id+'-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total2').setText(total);
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
        Ext.getCmp(prototype.id+'-grid_det_comm_ticket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-grid_det_comm_GroupView').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    setGridDataTesting: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridData', {
            proxy: {
                url: prototype.url+'/getListTicketTesting'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanSQP013627;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP013627");
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id+'-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total2').setText(total);
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
        Ext.getCmp(prototype.id+'-grid_det_comm_ticket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-grid_det_comm_GroupView').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    setGridDataListFPROC: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataListFPROC', {
            proxy: {
                url: prototype.url+'/getListFPROC'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanSQP01362;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP01304");
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
        Ext.getCmp(prototype.id+'-grid_det_comm_GridGroup').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    setGridDataListFPROCTesting: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataListFPROC', {
            proxy: {
                url: prototype.url+'/getListFPROCTesting'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanSQP01362;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SQP01304");
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
        Ext.getCmp(prototype.id+'-grid_det_comm_GridGroup').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getListCountry">
    getListCountry: function() {
        Ext.Ajax.request({
            url: prototype.url+'/getListCountry',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaPaises = res.listaPaises;
                    var country = new Array();
                    country.push(['', 'All']);
                    listaPaises.forEach(function callback(currentValue, index, array) {
                        country.push([currentValue.A051KEY2, currentValue.A051KEY2+' - '+currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbPais').bindStore(store);
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getListSchema">
    getListSchema: function() {
        Ext.Ajax.request({
            url: prototype.url+'/getListSchema',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_CIA: '139',
                A2845INDAC: 'U'
            },
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var ListSchema = res.ListSchema;
                    var schema = new Array(), A051KEY2;
                    ListSchema.forEach(function callback(currentValue, index, array) {
                        if(index===0) A051KEY2 = currentValue.A051KEY2;
                        schema.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'schema', autoLoad: true, data: schema, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-txtChema').bindStore(store);
                    Ext.getCmp(prototype.id+'-txtChema').setValue(A051KEY2);
                    me.getSerachList();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getLoadCommiADMACM">
    getLoadCommiADMACM: function(BE) {
        Ext.Ajax.request({
            url: prototype.url+'/getLoadCommiADMACM',
            method: 'POST',
            timeout: 60000000,
            params: BE,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                global.Msg({
                    msg: res.sesion,
                    fn: function(btn) {
                        if (btn === 'ok') {
                            me.getSerachList(false);
                        }
                    }
                });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
            global.getFile(_path);
        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
//            global.getFile(_pathTesting);
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones Locales">
    setLABEL: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-txtLABEL').show();
            Ext.getCmp(prototype.id+'-txtLABEL').setWidth(130);
        } else {
            Ext.getCmp(prototype.id+'-txtLABEL').hide();
            Ext.getCmp(prototype.id+'-txtLABEL').setWidth(0);
        }
    },
    setIATA: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-txtIATA').show();
            Ext.getCmp(prototype.id+'-txtIATA').setWidth(130);
            this.setValue('cmbSelectBy', '3');
        } else {
            Ext.getCmp(prototype.id+'-txtIATA').hide();
            Ext.getCmp(prototype.id+'-txtIATA').setWidth(0);
        }
    },
    setTHS: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-txtTicket').show();
//            this.setValue('cmbSelectBy', '2');
            Ext.getCmp(prototype.id+'-HSCHEMAS').show();
        } else {
            Ext.getCmp(prototype.id+'-txtTicket').hide();
            Ext.getCmp(prototype.id+'-HSCHEMAS').hide();
        }
    },
    setTSCH: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-txtChema').show();
            Ext.getCmp(prototype.id+'-txtChema').setWidth(130);
            this.setValue('cmbSelectBy', '2');
        } else {
            Ext.getCmp(prototype.id+'-txtChema').hide();
            Ext.getCmp(prototype.id+'-txtChema').setWidth(0);
        }
    },
    setSTATUS: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-lblStatus').show();
            Ext.getCmp(prototype.id+'-cmbStatus').show();
        } else {
            Ext.getCmp(prototype.id+'-lblStatus').hide();
            Ext.getCmp(prototype.id+'-cmbStatus').hide();
        }
    },
    setClearFilter: function() {
        this.beanSQP01362.VP_CIA='139';
	this.beanSQP01362.VP_FORMA='';
	this.beanSQP01362.VP_SERIE='';
	this.beanSQP01362.VP_FPROC_D='';
	this.beanSQP01362.VP_FPROC_H='';
	this.beanSQP01362.VP_FUENT='';
	this.beanSQP01362.VP_PAIVTA='';
	this.beanSQP01362.VP_AGENTE='';
	this.beanSQP01362.A2845INDAC='';
	this.beanSQP01362.VP_SCHEMA='';
	this.beanSQP01362.VP_STATUS='';
    },
    setClearFilter2: function() {
        this.beanSQP013627.VP_CIA='139';
	this.beanSQP013627.VP_FORMA='';
	this.beanSQP013627.VP_SERIE='';
	this.beanSQP013627.VP_FPROC_D='';
	this.beanSQP013627.VP_FPROC_H='';
	this.beanSQP013627.VP_FUENT='';
	this.beanSQP013627.VP_PAIVTA='';
	this.beanSQP013627.VP_AGENTE='';
	this.beanSQP013627.VP_A2959IATAH='';
	this.beanSQP013627.A2845INDAC='';
	this.beanSQP013627.VP_SCHEMA='';
	this.beanSQP013627.VP_STATUS='';
    },
    onSetChangeRouteChange: function(cmp, value) {
        var rbSA = value.rbSA;
        this.FF = rbSA;
        this.getSerachList(false);
    },
    getSerachList: function(bool) {
        this.getShowChange();
        this.setClearPage();
        this.execSearch();
    },
    setClearPage: function() {
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
    },
    setClearPage2: function() {
        Ext.getCmp(prototype.id+'-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total2').setText("0");
    },
    removeAllGrid: function() {
        Ext.getCmp(prototype.id+'-grid_det_comm_GridGroup').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        Ext.getCmp(prototype.id+'-grid_det_comm_ticket').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total2').setText("0");
        Ext.getCmp(prototype.id+'-grid_det_comm_GroupView').getStore().removeAll();
    },
    btnDias_clickHandler: function (mes, anio) {
        switch (mes) {
            case 1 : case 3 : case 5 : case 7 : case 8 : case 10 : case 12 : return 31;
            case 2 : return (anio % 4 === 0) ? 29 : 28;
        }
        return 30;
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-GridGroup').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        } else if (Ext.getCmp(prototype.id+'-GridTMtotalperMonth').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
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
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
