Ext.define('Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntrySalesReconciliAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySalesReconciliAmexController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function(view) {
        prototype.id = 'SalesReconciliAmexForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliAmex';
        meDE = this;
                
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec.data;

    },
    afterRender: function() {
                
        Ext.getCmp(prototype.id + '-1-txtPNR').setValue(this.bean.PNR);
        this.execSearch();
//        this.obtainData();
//        switch (this.actionCode) {
////            case 'I':
////                console.log('dd');
////
////                Ext.getCmp(prototype.id + '-btn-save').show();
////                Ext.getCmp(prototype.id + '-btn-update').hide();
////                Ext.getCmp(prototype.id + '-btn-delete').hide();
////                Ext.getCmp(prototype.id + '-btn-cancel').show();
////                break;
//            case 'U':
//                this.getData();
////                this.DeshabilitarCampoClave();
//                Ext.getCmp(prototype.id + '-btn-save').hide();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
//                break;
//        }
    },
    
    onTextKeypress: function(obj, e, eOpts) {
        
        if (e.getKey() === e.ENTER) {
            this.execSearch();
        }
    },
    
    execSearch: function() {
        
        var selectedValue = win.getValue('1-cbxSearchBy');
	if(selectedValue !== ''){
            this.bean.IN_TFILTER = parseInt(selectedValue);
            switch(this.bean.IN_TFILTER){
                case 1:
                    this.bean.IN_TEXT = win.getValue('1-txtTicketCia')+win.getValue('1-txtTicketForSer').trim();
                    break;
                case 2:
                    this.bean.IN_TEXT = win.getValue('1-txtPassenger');
                    break;
                case 3:
                    this.bean.IN_TEXT = win.getValue('1-txtPNR');
                    break;
                case 4:
                    this.bean.IN_TEXT = win.getValue('1-txtNREF_P1')+win.getValue('1-txtNREF_P2');
                    break;
                case 5:
                    this.bean.IN_TEXT = win.getValue('1-txtIATA');
                    break;
                case 6:
                    this.bean.IN_TEXT = win.getValue('1-txtTicketCia')+win.getValue('1-txtTicketForSer').trim();
                    break;
            }
            
            
            if(this.bean.IN_TEXT === null || this.bean.IN_TEXT === ""){
                return;
            }   
            
            if(win.getValue('1-txtToDate') === null && win.getValue('1-txtFromDate') !== null){
                Ext.getCmp(prototype.id+'-1-txtToDate').setValue(win.getValue('1-txtFromDate'));
                //txtToDate.text = txtFromDate.text;
            }
            else{
                if(win.getValue('1-txtFromDate') === null && win.getValue('1-txtToDate') !== null){
                    Ext.getCmp(prototype.id+'-1-txtFromDate').setValue(win.getValue('1-txtToDate'));
                    //txtFromDate.text = txtToDate.text;
                }
            }
            
            this.bean.IN_IATA = (win.getValue('1-txtIATA') || '').trim();
            
            if(this.bean.IN_TFILTER == 5 && this.bean.IN_IATA == ''){
                alert("Please enter issue date range and IATA");
                return;
            }

            if(this.bean.IN_IATA != ''){
                if(this.bean.IN_IATA.length != 8){
                    alert("IATA number must be 8 characters");
                    return;
                }else{
                    if((win.getValue('1-txtFromDate') === null || win.getValue('1-txtToDate') === null) && this.bean.IN_TFILTER == 5){
                        alert("Please enter issue date range");
                        return;
                    }
                }
            }
            
            this.bean.IN_DATE_FROM = Ext.util.Format.date(win.getValue('1-txtFromDate'), 'Ymd');
            this.bean.IN_DATE_TO = Ext.util.Format.date(win.getValue('1-txtToDate'), 'Ymd');
            
            console.log({ BEAN_SEARCH: this.bean });
            
            this.searchPNR(this.bean);
	}
    },
    
    //<editor-fold defaultstate="collapsed" desc="searchPNR">
    searchPNR: function (bean) {
        console.log('searchPNR');
        var me01 = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.GridData', {
            proxy: {
                url: prototype.url+'/searchPNR'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    win.lblUser_toolTip("Estructura: A720");
                    
                    if (res.success) {
                        if (obj.data.length > 0) {
                            
                            console.log(obj.data);
                            if (obj.data.length === 1) {
                                console.log('_obj.data.items_');
                                console.log(obj.data.items);
                                console.log(obj.data.items[0].data);
                                me01.gridData_act1_clickHandler(obj.data.items[0].data);
                            }
                        } else {
                            if (parseInt(win.getValue('1-cbxSearchBy')) === 1) {
                                console.log('_1-cbxSearchBy_');
                                me01.beanProMasterTicket = {};
                                me01.beanProMasterTicket.IN_CIA  = win.getValue('1-txtTicketCia');
                                me01.beanProMasterTicket.IN_FORMA= win.getValue('1-txtTicketForSer').substr(0, 4); 
                                me01.beanProMasterTicket.IN_SERIE= win.getValue('1-txtTicketForSer').substr(4, 6);
                                me01.beanProMasterTicket.IN_SEQ  = '00';
                                
                                meDE.params.actionCode = 'VIEWTICKET_FOR_BWRMASTERTICKET';
                                meDE.params.bean = me01.beanProMasterTicket;
                                meDE.startDisplay();
                                Ext.getCmp('DataEntryProMasterTicketForm').hide();
                            } else if (parseInt(win.getValue('1-cbxSearchBy')) === 6) {
                                console.log('_ACT_VIEW_BY_TKT_ADM_');
                                me01.beanProMasterTicket = {};
                                me01.beanProMasterTicket.IN_CIA  = win.getValue('1-txtTicketCia');
                                me01.beanProMasterTicket.IN_FORMA= win.getValue('1-txtTicketForSer').substr(0, 4); 
                                me01.beanProMasterTicket.IN_SERIE= win.getValue('1-txtTicketForSer').substr(4, 6);
                                me01.beanProMasterTicket.IN_SEQ  = '00';
                                
                                meDE.params.actionCode = 'ACT_VIEW_BY_TKT_ADM';
                                meDE.params.bean = me01.beanProMasterTicket;
                                //meDE.startDisplay();
                                //Ext.getCmp('DataEntryProMasterTicketForm').hide();
                            } else {
                                Ext.getCmp(prototype.id+'-1-gridData').getStore().removeAll();
                                Ext.getCmp(prototype.id+'-1-pie').hide();
                                Ext.getCmp(prototype.id+'-1-lblPagActual').setText('0');
                                global.Msg({msg: win.STR_NO_DATA});
                            }
                        }
                    } else global.Msg({msg: res.sesion});
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id+'-1-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-1-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    gridData_act1_clickHandler: function (column, e, row, column2, x) {
        
        console.log(meDE);
        
        var data = {};
        if (column.TICKET === undefined) {
            data = x.record.data;
        } else {
            data = column;
        }
        var strTkt = data.TICKET;
        
        prototypeProgram.view = 'payments-sales-reconcili-amex-form';
        prototypeProgram.nprog = 'PX00000570';
        prototypeProgram.title = 'Sales Reconciliation By Amex';
        prototypeProgram.modulo = '';
        
        var beanProMasterTicket = {};
	
	beanProMasterTicket = {};
        
	beanProMasterTicket.IN_CIA  = strTkt.substr(0, 3);
	beanProMasterTicket.IN_FORMA= strTkt.substr(3, 4); 
	beanProMasterTicket.IN_SERIE= strTkt.substr(7, 6);
	beanProMasterTicket.IN_SEQ  = win.stringPad(data.A720SEQ, '0', 2);
        
        console.log(beanProMasterTicket);
        
        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
//        Ext.getCmp(prototype.id + '-dataEntry').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').fireEvent('click', {});
        
//	if (parseInt(win.getValue('1-cbxSearchBy')) === 6) {
//            meDE.actionCode = 'ACT_VIEW_BY_TKT_ADM';
//        }
//        else
//        {
//            meDE.actionCode = 'VIEWTICKET_FOR_BWRMASTERTICKET';
//        }
//        meDE.bean = this.beanProMasterTicket;
//        
//        meDE.startDisplay();
//	meDE.dataEntry.hide(); //Ext.getCmp('DataEntryProMasterTicketForm').hide();
    },
    startDisplay: function () {
        
        console.log('startDisplay');
        console.log(this.actionCode);
        console.log(this.actionCode);
        
        win.visible('1-boxSearchFilter', true);
        switch (this.actionCode) {
            case meDE.SELECT_BY_TKT_2:
                win.setValue('1-cbxSearchBy', "1");
                this.cbxSearchBy_changeHandler();
                if (this.ticketNumber.length === 13) {
                    win.setValue('1-txtTicketCia', this.ticketNumber.substr(0, 3));
                    win.setValue('1-txtTicketForSer', this.ticketNumber.substr(3));
                    this.imgSearch_clickHandler();
                }
                break;
            case meDE.SELECT_BY_PAX:
                win.setValue('1-cbxSearchBy', "2");
                this.cbxSearchBy_changeHandler();
                break;
            case meDE.SELECT_BY_PNR:
                win.setValue('1-cbxSearchBy', "3");
                this.cbxSearchBy_changeHandler();
                break;
            case meDE.SELECT_BY_CC:
                win.setValue('1-cbxSearchBy', "4");
                this.cbxSearchBy_changeHandler();
                break;
        }
    },
    
    mostrarData: function() {
        this.setValue('de-txtNAID', this.beanResult.BAID);
        this.setValue('de-cmbSTVAL', this.beanResult.STVAL);
        
        this.setValue('de-txtSDATE', this.beanResult.SDATE);
        this.setValue('de-txtTDATE', this.beanResult.TDATE);
        this.setValue('de-txtBDATEP', this.beanResult.BDATEP);
        this.setValue('de-txtMERCHN', this.beanResult.MERCHN);
                
        if(this.beanResult.strDescMerchn !== ''){
                this.setValue('de-txtMERCHN', this.beanResult.MERCHN + ' - ' + this.beanResult.strDescMerchn);
	}
        
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtAMOUNTN', Ext.util.Format.number(this.beanResult.dblAMOUNT, '0,000.00'));
        
        this.setValue('de-cmbCODEBANK', this.beanResult.CODEBANK);
        
        this.setValue('de-txtMERCHNR', this.beanResult.MERCHNR);
        this.setValue('de-txtDAMOUNTR', Ext.util.Format.number(this.beanResult.dblAMOUNTR, '0,000.00'));
        this.setValue('de-txtCURRENCYR', this.beanResult.ACURRENCY);
        this.setValue('de-txtDESCRI', this.beanResult.strDescripcion);
        
        this.setValue('de-txtAMOUNTS', Ext.util.Format.number(this.beanResult.AMOUNTS, '0,000.00'));
        this.setValue('de-txtQTYTRAS', Ext.util.Format.number(this.beanResult.QTYTRAS, '0,000'));
        this.setValue('de-txtQTYDOCS', Ext.util.Format.number(this.beanResult.QTYDOCS, '0,000'));
        this.setValue('de-txtAMOUNTR', Ext.util.Format.number(this.beanResult.AMOUNTR, '0,000.00'));
        this.setValue('de-txtQTYTRAR', Ext.util.Format.number(this.beanResult.QTYTRAR, '0,000'));
        this.setValue('de-txtQTYDOCR', Ext.util.Format.number(this.beanResult.QTYDOCR, '0,000'));
       
        this.setValue('de-txtDATEC', this.beanResult.DATEC);
        this.setValue('de-cmbSTATUSC', this.beanResult.STATUSC); 

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function() {
        
        var cmbSTVAL = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Match"],
                ["2", "Bank Without Payment"],
                ["3", "Payment Without Bank"]
            ]
        }));
        cmbSTVAL.setValue('');
        
        
        var cmbSTATUSC = Ext.getCmp(prototype.id + '-de-cmbSTATUSC');
        cmbSTATUSC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Processed"]
            ]
        }));
        cmbSTATUSC.setValue('');


        this.dataObtain.BANK = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);

                var lstBank = res.lstBank;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstBank,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-de-cmbCODEBANK').bindStore(storeData);
                Ext.getCmp(prototype.id + '-de-cmbCODEBANK').setValue('');
            }
        });

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
//        console.log('llenarData');
        beanTemp.CODEBANK = this.getValue("de-txtCODEBANK");
        beanTemp.NAMEBANK = this.getValue("de-txtNAMEBANK");
        beanTemp.COUNTRY = this.getValue("de-cmbCOUNTRY");
        beanTemp.CURRENC = this.getValue("de-txtCURRENC");
        beanTemp.FSTAT = this.getValue("cmbFSTAT");
        beanTemp.FINSUMO = this.getValue("cmbFINSUMO");
        beanTemp.CODEBANKN = this.getValue("cmbCODEBANKN");
        beanTemp.CLIENTE = this.getValue("de-txtCLIENTE");
        
        beanTemp.DOCNUM = this.getValue("txtDOCNUM");
        if (beanTemp.RATEIVA.trim() === '') {
            beanTemp.DOCNUM = 0;
        }
        
        beanTemp.RATECON = this.getValue("de-txtRATECON");
        if (beanTemp.RATECON.trim() === '') {
            beanTemp.RATECON = 0;
        }
        beanTemp.RATECOP1 = this.getValue("de-txtRATECOP1");
        if (beanTemp.RATECOP1.trim() === '') {
            beanTemp.RATECOP1 = 0;
        }
        beanTemp.RATECOP2 = this.getValue("de-txtRATECOP2");
        if (beanTemp.RATECOP2.trim() === '') {
            beanTemp.RATECOP2 = 0;
        }
        beanTemp.RATEIVA = this.getValue("de-txtRATEIVA");
        if (beanTemp.RATEIVA.trim() === '') {
            beanTemp.RATEIVA = 0;
        }

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

//        console.log(beanTemp);

    },
    getData: function() {
//        console.log('getData');
        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);

        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                meDE.beanResult = res.data;
                meDE.mostrarData();

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function(obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.maintenanceBean(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });         
    },
    onUpdateClick: function(btn) {
//        console.log('onUpdateClick');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            this.maintenanceBean(beanTemp);
                        }
                    }
                });
    },
    onDeleteClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    maintenanceBean: function(beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/maintenanceBean',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
    },
    Habilitarlbl: function() {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function() {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function() {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") == '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
// </editor-fold>
});