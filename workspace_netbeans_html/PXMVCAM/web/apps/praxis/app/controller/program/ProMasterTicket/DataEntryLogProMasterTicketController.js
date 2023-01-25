Ext.define('Ext.Praxis.controller.program.ProMasterTicket.DataEntryLogProMasterTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLogProMasterTicketController',
    beanA2289: {},
    actionCode: '',
    gridDataAC: new Array(),
    lstA2289FilterAC: new Array(),
    init: function () {
    },
    afterRender: function() {
        this.setStoreData();
        this.initDate();
        Ext.getCmp(prototype.id+'-2-txtTicketForSer').setValue(this.beanA2289.IN_FORMA+this.beanA2289.IN_SERIA);
        if(Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue()!==''){
	  this.search(this.beanA2289);
	  this.btn_LogCompare();
	}
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-2-cmbDateToYear').setValue(new Date().getFullYear());
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id+'-2-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id+'-2-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id+'-2-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateToYear').setValue(Ext.getCmp(prototype.id+'-2-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateToMonth').setValue(Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateToDay').setValue(Ext.getCmp(prototype.id+'-2-cmbDateFromDay').getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-2-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-2-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-2-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataMonth = win.getStoreDays(true);
        Ext.getCmp(prototype.id+'-2-cmbDateFromDay').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-2-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    btn_LogCompare: function () {
        if(Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue()!==''){
            Ext.getCmp(prototype.id+'-2-btn').enable(true);
	    this.beanA2289.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
            this.beanA2289.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
            this.beanA2289.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';
	    this.searchCompleteDetail(this.beanA2289);
        }else{
            Ext.getCmp(prototype.id+'-2-btn').disable(true);
        }
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    imgSearch_clickHandler: function () {
	this.execSearch();
	if(Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue()!==''){
            Ext.getCmp(prototype.id+'-2-btn').enable(true);
	    this.beanA2289.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
            this.beanA2289.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
            this.beanA2289.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';
	    this.searchCompleteDetail(this.beanA2289);
        }else{
            Ext.getCmp(prototype.id+'-2-btn').disable(true);
        }
    },
    //</editor-fold>
    
    execSearch: function () {
        this.beanA2289.IN_DATE_FROM = Ext.getCmp(prototype.id+'-2-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').getValue()+ Ext.getCmp(prototype.id+'-2-cmbDateFromDay').getValue();
        this.beanA2289.IN_DATE_TO = Ext.getCmp(prototype.id+'-2-cmbDateToYear').getValue() + Ext.getCmp(prototype.id+'-2-cmbDateToMonth').getValue()+ Ext.getCmp(prototype.id+'-2-cmbDateToDay').getValue();

        this.beanA2289.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
        this.beanA2289.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
        this.beanA2289.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';

        this.search(this.beanA2289);
    },
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (beanA2289) {
        var me01 = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: CONTEXTPATH+'/BwrLog/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanA2289)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A720");
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        me01.gridDataAC = res.data;
                        if(me01.gridDataAC.length > 0) {
                            me01.beanA2289 = me01.gridDataAC[0];
                            Ext.getCmp(prototype.id+'-2-lblPagActual').setText(win.formatLngNumber(me01.beanA2289.page.PAGNUM));
                            Ext.getCmp(prototype.id+'-2-lblPagTotal').setText(win.formatLngNumber(me01.beanA2289.page.TOTPAG));
                            Ext.getCmp(prototype.id+'-2-lblRowsTotal').setText(win.formatLngNumber(me01.beanA2289.page.TOTROW));
                            Ext.getCmp(prototype.id+'-2-boxPaginacion').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                            Ext.getCmp(prototype.id+'-2-lblPagActual').setText('0');
                            Ext.getCmp(prototype.id+'-2-lblPagTotal').setText('0');
                            Ext.getCmp(prototype.id+'-2-lblRowsTotal').setText('0');
                            Ext.getCmp(prototype.id+'-2-boxPaginacion').hide();
                        }
                    } else {
                        global.Msg({msg: res.sesion});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-2-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-2-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCompleteDetail">
    searchCompleteDetail: function (beanA2289) {
        var me02 = this;
        Ext.Ajax.request({
            url: CONTEXTPATH+'/BwrLog/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanA2289)},
            beforerequest: Ext.getCmp('DataEntryLogProMasterTicketForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryLogProMasterTicketForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    me02.lstA2289FilterAC = res.listaCompleteDetail;
                    if(me02.lstA2289FilterAC.length > 0) {
                        me02.bean = me02.lstA2289FilterAC[0];
                        console.log(me02.beanA2289.AVFOP!== me02.bean.A1531VFOP);
                        var DataEntryLogCompare = Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryLogCompare', { id: 'DataEntryLogCompareProMasterTicketForm' });
                        var controller = DataEntryLogCompare.getController();
                        controller.lstA2289FilterAC = me02.lstA2289FilterAC;
                        DataEntryLogCompare.show();
                        console.log("2");
                        if(me02.beanA2289.AVFOP!== me02.bean.A1531VFOP){
                            Ext.getCmp(prototype.id+'-3-msjDiff').show();
                         }else{
                            Ext.getCmp(prototype.id+'-3-msjDiff').hide();
                         }
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryLogProMasterTicketForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').moveLast();
    },
    
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
});