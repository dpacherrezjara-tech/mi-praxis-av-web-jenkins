Ext.define('Ext.Praxis.controller.payments.SalesReconciliation.SalesReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliationController',
    stack: [],
    bean: {},
    fecha: new Date(),
    beanDetailTkt: {},
    beanDetailTar: {},
    beanIBT: {},
    beanDetailAcc: {},
    beanDetailMer: {},
    beanDebits: {},
    lstTarjetas: {},
    beanProMasterTicket: {},
    beanDetE: {},
    beanDet: {},
    beanDet2: {},
    beanDet3: {},
    beanDet4: {},
    DateControl: '',
    strSTVAL: '',
    NPROG: '',
    f_boxDetTktS: '',
    dpick:null,
    beanboxDetTktS1: {},
    beanboxDetTktS2: {},
    beanboxDetTktS3: {},
    beanboxDetTktS4: {},
    beanDetailAgent: {},
    init: function (view) {
        me = this;
        
        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';
        this.control({
            // -------------------Eventos Genericos --------------------
            
            '#SalesReconciliationForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#SalesReconciliationForm-cmbDateToDay': {
                select: this.selectComboToDay
            },
            '#SalesReconciliationForm-cmbTDOC': {
                select: this.selectDocType
            },
            '#SalesReconciliationForm-cmbDateFromMonth_IBT': {
                afterrender: this.afterRenderMonth
            },
            '#SalesReconciliationForm-cmbDateToMonth_IBT': {
                afterrender: this.afterRenderMonth
            },
     

        });
        
    },
    afterRender: function () {
        this.setStoreData();
        this.initDate();
        this.obtainData();
        console.log(prototype.id, 'prototype.id')
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        //        var mes = new Date().getMonth()+1;
        //        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        
        Ext.getCmp(prototype.id + '-cmbDateFromYear_IBT').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear_IBT').setValue(new Date().getFullYear());

        //        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('');
        //        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('');
        

    },
    cbxDateFromYear_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    cbxDateToYear_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if( comboToYear.getValue() < comboFromYear.getValue()  ){
           comboFromYear.setValue(comboToYear.getValue()); 
        }
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    cbxDateFromMonth_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        if(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() != ''){
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(false);
        }else {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        }
    },
//    cbxDateFromDay_changeHandler: function () {
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
//    },
    cbxDateToMonth_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (comboToMonth.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(comboToMonth.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        console.log(obj, 'obj day from')
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
        console.log('sdadsadadsad')
    },
    selectComboToDay: function (obj) {
        console.log('wadafa')
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDay');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if(comboFromDay.getValue() === ''){
            
            comboFromDay.setValue(obj.getValue())
        }
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        
        Ext.getCmp(prototype.id + '-cmbDateFromYear_IBT').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear_IBT').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        
        Ext.getCmp(prototype.id + '-cmbDateFromMonth_IBT').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth_IBT').bindStore(storeComboDataMonth);
        
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        
        Ext.getCmp(prototype.id + '-cmbDateDay_IBT').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay_IBT').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateDay_IBT').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay_IBT').setValue("");

        //        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(storeComboDataMonth);
        //        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    selectDocType: function (obj) {
        console.log('wadafafafa')
        if( obj.getValue() == 'D' || obj.getValue() == 'R' || obj.getValue() == 'C' || obj.getValue() == 'A' ){
            Ext.getCmp(prototype.id + '-cmbDebitType').show()
            Ext.getCmp(prototype.id + '-contADJ').hide()
            Ext.getCmp(prototype.id + '-chkADYEN').setValue(false)
            Ext.getCmp(prototype.id + '-cmbADJTYPE').setValue('')
            Ext.getCmp(prototype.id + '-lblTDOC').show();
        }else{
           Ext.getCmp(prototype.id + '-cmbDebitType').hide() 
           Ext.getCmp(prototype.id + '-contADJ').show() 
           Ext.getCmp(prototype.id + '-lblTDOC').hide()
           Ext.getCmp(prototype.id + '-cmbDebitType').setValue('')
        }
        
        switch (obj.getValue()) {
            case 'D':
                Ext.getCmp(prototype.id + '-txtTicket').setDisabled(true)
                Ext.getCmp(prototype.id + '-txtAUTHNBR').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtSAGENT').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtTicket').setValue('')
                break;
            case 'R':
                Ext.getCmp(prototype.id + '-txtTicket').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtAUTHNBR').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtSAGENT').setDisabled(false)
                
                break;
            case 'C':
                Ext.getCmp(prototype.id + '-txtTicket').setDisabled(true)
                Ext.getCmp(prototype.id + '-txtAUTHNBR').setDisabled(true)
                Ext.getCmp(prototype.id + '-txtSAGENT').setDisabled(true)
                Ext.getCmp(prototype.id + '-txtTicket').setValue('')
                Ext.getCmp(prototype.id + '-txtAUTHNBR').setValue('')
                Ext.getCmp(prototype.id + '-txtSAGENT').setValue('')
                break;
             case 'A':
                Ext.getCmp(prototype.id + '-txtTicket').setDisabled(true)
                Ext.getCmp(prototype.id + '-txtAUTHNBR').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtSAGENT').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtTicket').setValue('')
                break;
            case 'S':
                Ext.getCmp(prototype.id + '-txtTicket').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtAUTHNBR').setDisabled(false)
                Ext.getCmp(prototype.id + '-txtSAGENT').setDisabled(false)
                
                break;
        }
        
        
    },
    cmbTranType_changeHandler: function () {
        var filtro = win.getValue('cmbFecFiltro');

        var selectedValue = win.getValue('rbgType').rbgType;
        switch (selectedValue) {
            case 'Sales':
                var cbxFecFiltroAC = new Array();
                cbxFecFiltroAC.push({name: "Sales Date", code: 'SDATE'});
                //cbxFecFiltroAC.push({name: "Reconciliation Date", code: 'DATEC'});
                Ext.getCmp(prototype.id + '-cmbFecFiltro').bindStore(cbxFecFiltroAC);

                win.setValue('cmbFecFiltro', filtro);
                break;
            case 'Refund':
                var cbxFecFiltroAC = new Array();
                cbxFecFiltroAC.push({name: "Refund Date", code: 'SDATE'});
                //cbxFecFiltroAC.push({name: "Reconciliation Date", code: 'DATEC'});
                Ext.getCmp(prototype.id + '-cmbFecFiltro').bindStore(cbxFecFiltroAC);

                win.setValue('cmbFecFiltro', filtro);
                break;
        }

        this.changeLabels(selectedValue);
        this.btnSearch_click();
    },
    changeLabels: function (tipo) {
        var oldLabel = 'Sales';
        if (tipo === 'Sales') {
            oldLabel = 'Refund';
        }
        var newabel = tipo;

        win.setText('label_1', Ext.getCmp(prototype.id + '-label_1').text.replace(oldLabel, newabel) + this.DateControl);
        win.setText('label_2', Ext.getCmp(prototype.id + '-label_2').text.replace(oldLabel, newabel));
        win.setText('label_3', Ext.getCmp(prototype.id + '-label_3').text.replace(oldLabel, newabel));
        win.setText('label_4', Ext.getCmp(prototype.id + '-label_4').text.replace(oldLabel, newabel));
        win.setText('label_5', Ext.getCmp(prototype.id + '-label_5').text.replace(oldLabel, newabel));
        win.setText('label_6', Ext.getCmp(prototype.id + '-label_6').text.replace(oldLabel, newabel));
        win.setText('label_7', Ext.getCmp(prototype.id + '-label_7').text.replace(oldLabel, newabel));
        win.setText('label_8', Ext.getCmp(prototype.id + '-label_8').text.replace(oldLabel, newabel));
        win.setText('label_9', Ext.getCmp(prototype.id + '-label_9').text.replace(oldLabel, newabel));
        //        win.setText('label_10', Ext.getCmp(prototype.id+'-label_10').text.replace(oldLabel, newabel));
        //        win.setText('label_11', Ext.getCmp(prototype.id+'-label_11').text.replace(oldLabel, newabel));
        //        win.setText('label_12', Ext.getCmp(prototype.id+'-label_12').text.replace(oldLabel, newabel));
        //        win.setText('label_13', Ext.getCmp(prototype.id+'-label_13').text.replace(oldLabel, newabel));
        //        win.setText('label_14', Ext.getCmp(prototype.id+'-label_14').text.replace(oldLabel, newabel));
        //        win.setText('label_15', Ext.getCmp(prototype.id+'-label_15').text.replace(oldLabel, newabel));
        //        win.setText('label_16', Ext.getCmp(prototype.id+'-label_16').text.replace(oldLabel, newabel));
        //        win.setText('label_17', Ext.getCmp(prototype.id+'-label_17').text.replace(oldLabel, newabel));
    },
    cbxFOPAC_changeHandler: function () {
//        var FOP = win.getValue('cmbFOP');

        if (FOP === 'CA') {
            win.enabled('txtAUTHNBR', false);
            win.enabled('txtCard1', false);
            win.enabled('txtCard2', false);
        } else {
            win.enabled('txtAUTHNBR', true);
            win.enabled('txtCard1', true);
            win.enabled('txtCard2', true);
        }
    },
    tarjeta_keyDownHandler: function (e, eOpts) {

        var txtCard1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (txtCard1.trim().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus(false, 200);
            }
        }
    },
    BuscarTKT_keyDownHandler: function (obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                this.btnSearch_click()
                
        }
    },
    BuscarPNR_keyDownHandler: function (obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtPNR').getValue().length === 6) {
                    this.searchByPNR();
                } else {
                    global.Msg({
                        msg: 'PNR must contain 6 characters.'
                    });
                }
                break;
        }
    },
    searchByPNR: function () {
        var bean = {};
        bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue()
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByPNR'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF100AK");

                    me.selectedChild('vskMain', 'boxDetByPNR');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            /*var obj = obj.data.items[0].data;
                             if (obj.strFecFiltro === 'DATEC') {
                             win.setText('adgSalDate', 'Reconciliation');
                             } else {
                             if (obj.IN_TDOC === 'R') {
                             win.setText('adgSalDate', 'Refund');
                             } else {
                             win.setText('adgSalDate', 'Sales');
                             }
                             me.DateControl = obj.strDescripcion;
                             win.setText('label_1', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetCtry', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetCard', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetDay', 'Sales Reconciliation ' + me.DateControl);
                             }*/
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetByPNR').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin11').bindStore(storeGridDatas);
    },
    BuscarSAGENT_keyDownHandler: function (obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtSAGENT').getValue().length === 8) {
                    console.log('funciona campo')
                    this.searchBySAGENT()
                } else {
                    global.Msg({
                        msg: 'Agent must contain 8 digits.'
                    });
                }
                break;
        }
    },
    searchBySAGENT: function (beanDetailAgent) {
        var beanDetailAgent = {}
        beanDetailAgent.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue()
        console.log(beanDetailAgent, 'beanDetailAgent')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchBySAGENT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDetailAgent)};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin12');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetBySAGENT');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res, 'res')
                    if (res.success) {
                        if (obj.data.length > 0) {
                            /*var obj = obj.data.items[0].data;
                             if (obj.strFecFiltro === 'DATEC') {
                             win.setText('adgSalDate', 'Reconciliation');
                             } else {
                             if (obj.IN_TDOC === 'R') {
                             win.setText('adgSalDate', 'Refund');
                             } else {
                             win.setText('adgSalDate', 'Sales');
                             }
                             me.DateControl = obj.strDescripcion;
                             win.setText('label_1', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetCtry', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetCard', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetDay', 'Sales Reconciliation ' + me.DateControl);
                             }*/
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetBySAGENT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
    },
    //<editor-fold defaultstate="collapsed" desc="onViewClick">
    gridDetCountry_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountry');
        this.searchDetCountry(beanDet);
        this.strSTVAL = '';
        beanDet.IN_STVAL = '';
    },
    gridDetCountry_clickHandler_MATCH: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS');
        
        beanDet.IN_STVAL = '1';
        this.searchDetCountryByStval_1(beanDet);
    },
    gridDetCountry_clickHandler_MANUAL: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS');
        beanDet.IN_STVAL = '5';
        this.searchDetCountryByStval_1(beanDet);
    },
    gridDetCountry_clickHandler_DIFF: function (column, e, row, column, x, rowData) {
//        var beanDet = x.record.data;
//        win.selectedChild('vskMain', 'boxDetCountryS');
//        beanDet.IN_STVAL = '5';
//        this.searchDetCountryByStval_1(beanDet);
    },
    gridDetCountry_clickHandler_PEND: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS');
        beanDet.IN_STVAL = '2';
        this.searchDetCountryByStval_1(beanDet);
    },
    gridDetCountry_clickHandler_MATCH_REFND: function (column, e, row, column, x, rowData) {
        var beanREFND = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_REFND');
        
        beanREFND.IN_STVAL = '1';
        console.log(beanREFND.IN_TDOC, 'IN_TDOC' )
        console.log(beanREFND.strFecFiltro, 'strFecFiltro')
        this.searchDetCountryByStval_REFND(beanREFND);
    },
    gridDetCountry_clickHandler_MANUAL_REFND: function (column, e, row, column, x, rowData) {
        var beanREFND = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_REFND');
        
        beanREFND.IN_STVAL = '5';
        this.searchDetCountryByStval_REFND(beanREFND);
    },
    gridDetCountry_clickHandler_PEND_REFND: function (column, e, row, column, x, rowData) {
        var beanREFND = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_REFND');
        
        beanREFND.IN_STVAL = '3';
        this.searchDetCountryByStval_REFND(beanREFND);
    },
    gridDetCountry_clickHandler_MATCH_CHGBAK: function (column, e, row, column, x, rowData) {
        var beanCHGBAK = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_CHGBAK');
        
        beanCHGBAK.IN_STVAL = '1';
        console.log(beanCHGBAK.IN_TDOC, 'IN_TDOC' )
        console.log(beanCHGBAK.strFecFiltro, 'strFecFiltro')
        this.searchDetCountryByStval_CHGBAK(beanCHGBAK);
    },
    gridDetCountry_clickHandler_MANUAL_CHGBAK: function (column, e, row, column, x, rowData) {
        var beanCHGBAK = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_CHGBAK');
        
        beanCHGBAK.IN_STVAL = '5';
        this.searchDetCountryByStval_CHGBAK(beanCHGBAK);
    },
    gridDetCountry_clickHandler_PEND_CHGBAK: function (column, e, row, column, x, rowData) {
        var beanCHGBAK = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_CHGBAK');
        
        beanCHGBAK.IN_STVAL = '3';
        this.searchDetCountryByStval_CHGBAK(beanCHGBAK);
    },
    gridDetCountry_clickHandler_MATCH_ACREDIT: function (column, e, row, column, x, rowData) {
        var beanACREDIT = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_ACREDIT');
        
        beanACREDIT.IN_STVAL = '1';
        console.log(beanACREDIT.IN_TDOC, 'IN_TDOC' )
        console.log(beanACREDIT.strFecFiltro, 'strFecFiltro')
        this.searchDetCountryByStval_ACREDIT(beanACREDIT);
    },
    gridDetCountry_clickHandler_MANUAL_ACREDIT: function (column, e, row, column, x, rowData) {
        var beanACREDIT = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_ACREDIT');
        
        beanACREDIT.IN_STVAL = '5';
        this.searchDetCountryByStval_ACREDIT(beanACREDIT);
    },
    gridDetCountry_clickHandler_PEND_ACREDIT: function (column, e, row, column, x, rowData) {
        var beanACREDIT = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountryS_ACREDIT');
        
        beanACREDIT.IN_STVAL = '3';
        this.searchDetCountryByStval_ACREDIT(beanACREDIT);
    },
    gridDetCountry_clickHandler_DEBITS: function (column, e, row, column, x, rowData) {
        //COUNTRY
//        var beanACREDIT = x.record.data;
//        win.selectedChild('vskMain', 'boxDetCountryS_ACREDIT');
//        
//        beanACREDIT.IN_STVAL = '';
//        this.searchDetCountryByStval_ACREDIT(beanACREDIT);
    },
    onGridDetCardSMain_DEBITS_MATCH: function (column, e, row, column, x, rowData){
        
        var beanDEBITS= x.record.data;
        win.selectedChild('vskMain', 'panelGridDetCardByS_Debits');
        
        beanDEBITS.IN_STVAL = '1';
        this.searchDetCountryByStval_DEBITS(beanDEBITS);
    },
    onGridDetCardSMain_DEBITS_MATCH_MANUAL: function (column, e, row, column, x, rowData){
        
        var beanDEBITS= x.record.data;
        win.selectedChild('vskMain', 'panelGridDetCardByS_Debits');
        
        beanDEBITS.IN_STVAL = '5';
        this.searchDetCountryByStval_DEBITS(beanDEBITS);
    },
    onGridDetCardSMain_DEBITS_PEND: function (column, e, row, column, x, rowData){
        console.log('BAJADA POR MATCH EN SUMARY')
        var beanDEBITS= x.record.data;
        win.selectedChild('vskMain', 'panelGridDetCardByS_Debits');
        
        beanDEBITS.IN_STVAL = '3';
        this.searchDetCountryByStval_DEBITS(beanDEBITS);
    },
    gridDet_DEBITS_clickHandler: function (column, e, row, column, x, rowData){
        var beanDetDebits = x.record.data;
        if( beanDetDebits.IN_STVAL == '1' || beanDetDebits.IN_STVAL == '5' ){
            beanDetDebits.IN_TDOC = 'M'
        }else if( beanDetDebits.IN_STVAL == '3' ){
            beanDetDebits.IN_TDOC = 'D'
        }
        console.log(beanDetDebits,'WADAFAADADADAD')
        console.log(beanDetDebits.IN_STVAL, 'IN_STVAL')
        console.log(beanDetDebits.IN_TDOC, 'IN_TDOC')
        win.selectedChild('vskMain', 'panelGridDataDetalle_DEBITS');
        this.searchDetByStval_DEBITS(beanDetDebits);
    },
    gridDetCard_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCard');
        this.searchDetCardCode(beanDet);
        this.strSTVAL = '';
        beanDet.IN_STVAL = '';
    },
    gridDetDay_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetDay');
        this.searchDetDay(beanDet);
        this.strSTVAL = '';
        beanDet.IN_STVAL = '';
    },
    gridDetTicket_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetTicket');
        this.searchDetTicket(beanDet);
        this.strSTVAL = '';
        beanDet.IN_STVAL = '';
    },
    viewDataEntry_clickHandler: function (tableview, e, rowNum, columnNum, x, model, a, b) {
        var data = x.record.data;
        var flagWarn;
        switch (b.scope.id) {
            case prototype.id + '-gridDetTktByStval':
                flagWarn = 'Y';
                break;
            case prototype.id + '-gridDetTicket':
                flagWarn = '';
                break;
//            case prototype.id + '-gridDetTktByStval_DEBITS':
//                flagWarn = '';
//                break;    
        }
//        if (data.lngQOBS > 1 || flagWarn === "Y") {
//            this.searchWarnTkts(data);
//        } else {
//            this.searchBean(data, this.peek());
//        }
        this.searchBean(data, this.peek());
    },
    gridCashDetCountry_clickHandler: function (column, e, row, column, x, rowData) {
        var obj = x.record.data;
        this.searchCashCountry(obj);
    },
    gridCashDetDay_clickHandler: function (column, e, row, column, x, rowData) {
        var obj = x.record.data;
        this.searchCashDay(obj);
    },
    gridDetCountryS_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        var dataIndex = Ext.getCmp(prototype.id + '-gridData').headerCt.getGridColumns()[column].dataIndex;
        var estado, cant;
        switch (dataIndex) {
            case 'lngQMATCH':
                estado = '1';
                cant = Number(beanDet.lngQMATCH);
                break;
            case 'lngQMANUAL':
                estado = '5';
                cant = Number(beanDet.lngQMANUAL);
                break;
            case 'lngQDIFF':
                estado = '4';
                cant = Number(beanDet.lngQDIFF);
                break;
            case 'lngQSALES':
                estado = '2';
                cant = Number(beanDet.lngQSALES);
                break;
            case 'lngQACCB':
                estado = '3';
                cant = Number(beanDet.lngQACCB);
                break;
        }
        if (cant > 0) {
            this.strSTVAL = '';
            beanDet.IN_STVAL = estado;
            win.selectedChild('vskMain', 'boxDetCountryS');
            this.searchDetCountryByStval(beanDet);
        } else {
            global.Msg({msg: 'Data Not Found'});
        }
    },
    gridDetCountrySEr_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;

        beanDet.IN_CERROR = beanDet.CERROR;
        console.log(beanDet);
        this.searchDetCountryByStval_1(beanDet);

    },
    gridData_act1_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        this.beanProMasterTicket = {};
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
        this.beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket, 'beanProMasterTicket')
        
        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';

        win.displayCustomViewTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    gridData_act1_clickHandler_IBT: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        this.beanProMasterTicket = {};
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
        this.beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket, 'beanProMasterTicket')
        
        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';

        win.displayProMasterTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    gridDetCardS_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCardS');

        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
            console.log("this.searchDetCardCodeByStval_Pay(beanDet)");
            //            this.searchDetCardCodeByStval_Pay(beanDet);
        } else {
            this.searchDetCardCodeByStval(beanDet);
        }
    },
    gridDetCardS_clickHandler_MATCH: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCardS');
        
        beanDet.IN_STVAL = '1';
        this.searchDetCardCodeByStval(beanDet);
    },
    gridDetCardS_clickHandler_MANUAL: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCardS');
        beanDet.IN_STVAL = '5';
        this.searchDetCardCodeByStval(beanDet);
    },
    gridDetCardS_clickHandler_PEND: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCardS');
        beanDet.IN_STVAL = '2';
        this.searchDetCardCodeByStval(beanDet);
    },
    gridDetDayS_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetDayS');

        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
            console.log("this.searchDetDayByStval_Pay(beanDet)");
            //            this.searchDetDayByStval_Pay(beanDet);
        } else {
            this.searchDetDayByStval(beanDet);
        }
    },
    gridDetDayS_clickHandler_MATCH: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetDayS');
        
        beanDet.IN_STVAL = '1';
        this.searchDetDayByStval(beanDet);
    },
    gridDetDayS_clickHandler_MANUAL: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetDayS');
        beanDet.IN_STVAL = '5';
        this.searchDetDayByStval(beanDet);
    },
    gridDetDayS_clickHandler_DIFF: function (column, e, row, column, x, rowData) {
//        var beanDet = x.record.data;
//        win.selectedChild('vskMain', 'boxDetDayS');
//        beanDet.IN_STVAL = '5';
//        this.searchDetDayByStval(beanDet);
    },
    gridDetDayS_clickHandler_PEND: function (column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetDayS');
        beanDet.IN_STVAL = '2';
        this.searchDetDayByStval(beanDet);
    },
    gridDetTicketS_clickHandler: function (column, e, row, column, x, rowData) {
        this.beanDetE = x.record.data;

        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
            console.log("win.selectedChild('vskMain', 'boxDetTktS_P');");
            console.log("this.searchDetTktByStval_Pay(this.beanDetE);");
            //            win.selectedChild('vskMain', 'boxDetTktS_P');
            //            this.searchDetTktByStval_Pay(this.beanDetE);
        } else {
            if (this.beanDetE.CERROR !== "") {
                this.beanDetE.IN_CERROR = this.beanDetE.CERROR;
            } else {
                this.beanDetE.IN_CERROR = "";
            }
            win.selectedChild('vskMain', 'boxDetTicket');
            this.searchDetTktByStval(this.beanDetE);
        }
    },
    gridDetTicketS_clickHandler_MATCH: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;
        win.selectedChild('vskMain', 'boxDetTicket');
        
        beanDetE.IN_STVAL = '1';
        this.searchDetTktByStval(beanDetE);
    },
    gridDetTicketS_clickHandler_MANUAL: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;
        win.selectedChild('vskMain', 'boxDetTicket');
        beanDetE.IN_STVAL = '5';
        this.searchDetTktByStval(beanDetE);
    },
    gridDetTicketS_clickHandler_PEND: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;
        win.selectedChild('vskMain', 'boxDetTicket');
        beanDetE.IN_STVAL = '2';
        this.searchDetTktByStval(beanDetE);
    },
    gridDet_REFND_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;
        let consultPath = 'searchDetTktByStval_REFND'
        win.selectedChild('vskMain', 'boxDetTktS_DEBITS');
        let paggin = 'paggin17'
        
//        beanDetE.IN_STVAL = '1';
        this.searchDetTktByStval_DEBITS(beanDetE, consultPath, paggin);
    },
    gridDet_CHGBAK_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;
        let consultPath = 'searchDetTktByStval_CHGBAK'
        win.selectedChild('vskMain', 'boxDetTktS_DEBITS');
        let paggin = 'paggin17'
        this.searchDetTktByStval_DEBITS(beanDetE, consultPath, paggin);
    },
    gridDet_ACREDIT_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;
        let consultPath = 'searchDetTktByStval_ACREDIT'
        win.selectedChild('vskMain', 'boxDetTktS_DEBITS');
        let paggin = 'paggin17'
        this.searchDetTktByStval_DEBITS(beanDetE, consultPath, paggin );
    },
    btnQuery_click: function (obj, e) {
        var beanQuery = {};

        var MatchTkt = Ext.create('Ext.Praxis.view.program.ProMatchTktForm', {id: 'ProMatchTktForm'});
        var controller = MatchTkt.getController();
        controller.bean = beanQuery;
        controller.startDisplay();
        MatchTkt.show();
    },
    onEditClick: function (grid, rowIndex, colIndex, item, e, record, actionItem) {

        item.disable()

        var rec = grid.getStore().getAt(rowIndex);
        console.log('RECDATA');
        console.log(rec.data);
        this.winDataEntryDebits()
//        this.searchBeanDebits(rec) 
        setTimeout(function() {
            item.enable()
        }, 1000); // Simular una tarea de 1 segundo
       
    },
    winDataEntryDebits: function () {
        //action, beanCons
        action = action === null || action === undefined ? 'U' : action;

        Ext.create('Ext.Praxis.view.payments.SalesReconciliationForm.DataEntryDebits', {
            id: prototype.id + '-dataEntryDebits',
            params: {
//                action: action,
//                lstCountry: me.lstCountry,
//                lstCard: me.lstCard,
//                lstBank: me.lstBank,
//                beanCons: beanCons
            }
        }).show();
    },
    searchBeanDebits: function (rec) {
        
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(rec.data)},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
//                console.log(response);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//                if (res.success) {
                if (res.success) {
                    var beanCons = res.result;
                    console.log('beanCons');
                    console.log(beanCons);
                    if (beanCons !== null) {
                        me.winDataEntryDebits('U', beanCons);
                    } else {
                        global.Msg({
                            msg: 'An error has ocurred. Please contact our System Department'
                        });
                    }

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    openQuery: function (column, e, row, column, x, rowData) {

        var beanQuery = rowData.data;
        var MatchTkt = Ext.create('Ext.Praxis.view.program.ProMatchTktForm', {id: 'ProMatchTktForm'});
        var controller = MatchTkt.getController();
        controller.bean = beanQuery;
        controller.startDisplay();
        MatchTkt.show();
    },
    eventKeyTKT: function (e, eOpts) {
        var strTkt = e.value.replace(' ', '');
        console.log(strTkt);
        if (eOpts.getKey() === 13) {
            this.viewMasterTkt(strTkt);
        }
    },
    viewMasterTkt: function (strTkt) {
//        var beanProMasterTicket = {};
//        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
//        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
//        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
//        beanProMasterTicket.IN_SEQ = '00';
        this.beanProMasterTicket = {};
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        this.beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket);

        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';

        win.displayCustomViewTicket(this, 'ViewConciliation', this.beanProMasterTicket);


    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        console.log(Ext.getCmp(prototype.id + '-chkADYEN').getValue(), 'wadaafafaaaafaf') 
        if( Ext.getCmp(prototype.id + '-vskIBT').isVisible()){
            this.setStoreDataIBT()
        }else{
            if (win.getValue('txtTicket').trim() !== '' || win.getValue('txtMERCHN').trim() !== '' || win.getValue('txtAUTHNBR').trim() !== '' || win.getValue('txtSAGENT').trim() !== ''
                    || win.getValue('txtCard1').trim() !== '' || win.getValue('txtCard2').trim() !== '' || win.getValue('txtPNR').trim() !== '' || win.getValue('cmbSource').trim() !== '' || win.getValue('cmbDebitType') !== '' || win.getValue('cmbADJTYPE') !== ''
                    || win.getValue('cmbCardType').trim() !== '' || win.getValue('cmbStatus').trim() !== '' || win.getValue('txtAMOUNT').trim() !== '' || Ext.getCmp(prototype.id + '-cmbDateDay').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() !== '' || Ext.getCmp(prototype.id + '-chkADYEN').getValue() ) {
                //***********CONSULTA A DETALLE***********
                if( win.getValue('txtTicket').trim() !== '' && win.getValue('txtTicket').trim().length !== 13 ){
                    win.setValue('txtTicket', '');
                    global.Msg({msg: 'Ticket number must contain 13 digits.'});
                    return false
                }
                if( win.getValue('txtPNR').trim() !== '' && win.getValue('txtPNR').length !== 6 && win.getValue('txtPNR').trim().length !== 4 && win.getValue('txtPNR').trim().length !== 5  ){
                    win.setValue('txtPNR', '');
                    global.Msg({msg: 'PNR must contain 6 characters.'});
                    return false
                }
                if( win.getValue('txtCard1').trim() !== '' && win.getValue('txtCard1').trim().length !== 6){
                    win.setValue('txtCard1', '');
                    global.Msg({msg: 'Cc number must contain 6 digits.'})
                    return false
                }
                if( win.getValue('txtCard2').trim() !== '' && win.getValue('txtCard2').trim().length !== 4 ){
                    win.setValue('txtCard2', '');
                    global.Msg({msg: 'Coorrelative must contain 4 digits.'})
                    return false
                }
                if( win.getValue('txtAUTHNBR').trim() !== '' && win.getValue('txtAUTHNBR').trim().length !== 6 && win.getValue('txtAUTHNBR').trim().length !== 4){
                    win.setValue('txtAUTHNBR', '');
                    global.Msg({msg: 'Authorization Number must contain 6 digits.'})
                    return false
                }
                if( win.getValue('txtSAGENT').trim() !== '' && win.getValue('txtSAGENT').trim().length !== 8 ){
                    win.setValue('txtSAGENT', '');
                    global.Msg({msg: 'Agent must contain 8 digits.'})
                    return false
                }
                
                var selectedValuec = win.getValue('rbgType').rbgType;
                switch (selectedValuec) {
                    case 'Sales':
                        this.beanDetailTar.IN_TDOC = 'S';
                        break;
                    case 'Refund':
                        this.beanDetailTar.IN_TDOC = 'R';
                        break;
                }

                this.beanDetailTar.strFecFiltro = win.getValue('cmbFecFiltro');
                this.beanDetailTar.strYearFrom = win.getValue('cmbDateFromYear');
                this.beanDetailTar.strMonthFrom = win.getValue('cmbDateFromMonth');
                this.beanDetailTar.strYearTo = win.getValue('cmbDateToYear');
                this.beanDetailTar.strMonthTo = win.getValue('cmbDateToMonth');
                this.beanDetailTar.strDayFrom = win.getValue('cmbDateDay');
                this.beanDetailTar.strDayTo = win.getValue('cmbDateToDay');
                this.beanDetailTar.IN_CARDN1 = win.getValue('txtCard1');
                this.beanDetailTar.IN_CARDN2 = win.getValue('txtCard2');
                this.beanDetailTar.IN_AUTHNBR = win.getValue('txtAUTHNBR');
                this.beanDetailTar.IN_TICKET = win.getValue('txtTicket');

                this.beanDetailTar.IN_COUNTRY = win.getValue('cmbCountry');
                this.beanDetailTar.IN_CARDC = win.getValue('cmbCardType');
                this.beanDetailTar.IN_FTE = win.getValue('cmbSource');

                this.beanDetailTar.IN_SAGENT = win.getValue('txtSAGENT');
                this.beanDetailTar.IN_SPNR = win.getValue('txtPNR');
                this.beanDetailTar.IN_STVAL = win.getValue('cmbStatus');
                this.beanDetailTar.IN_ADJTYPE = win.getValue('cmbADJTYPE');
                this.beanDetailTar.IN_strSVFOP = win.getValue('txtAMOUNT').replace(/,/g, '');
                this.beanDetailTar.IN_DEBTYPE = win.getValue('cmbDebitType');
                console.log(Ext.getCmp(prototype.id + '-chkADYEN').getValue(), 'wadaafafaaaafaf')        
                if (win.getValue('chkADYEN')) {
                    this.beanDetailTar.IN_TDOC = 'A';
                } else {
                    this.beanDetailTar.IN_TDOC = 'S';
                }
                
                if (win.getValue('chkTP')) {
                    this.beanDetailTar.IN_SCAR = 'Y';
                } else {
                    this.beanDetailTar.IN_SCAR = 'N';
                }
                
                let consultPath = ''
                switch (win.getValue('cmbTDOC')) {
                    case 'S':
                        consultPath = 'searchDetTARJETA'
                        break;
                    case 'D':
                        consultPath = 'searchDetail_ALLDEBITS'
                        break;
                    case 'R':
                        consultPath = 'searchDetail_REFND'
                        break;
                    case 'C':
                        consultPath = 'searchDetail_CHGBAK'
                        break;
                    case 'A':
                        consultPath = 'searchDetail_ACREDIT'
                        break;
                }

                this.searchDetTARJETA(this.beanDetailTar, consultPath);
            } else if (win.getValue('cmbFecFiltro').trim() === 'FCONT') {
                //***********CONSULTA A SUMARIO CONTAB.***********
                this.beanDetailAcc.strFecFiltro = win.getValue('cmbFecFiltro');
                this.beanDetailAcc.strYearFrom = win.getValue('cmbDateFromYear');
                this.beanDetailAcc.strMonthFrom = win.getValue('cmbDateFromMonth');
                this.beanDetailAcc.strYearTo = win.getValue('cmbDateToYear');
                this.beanDetailAcc.strMonthTo = win.getValue('cmbDateToMonth');
                this.beanDetailAcc.IN_COUNTRY = win.getValue('cmbCountry');

                this.searchAcc(this.beanDetailAcc);
            }else if(win.getValue('cmbTDOC').trim() === 'D' || win.getValue('cmbTDOC').trim() === 'R' || win.getValue('cmbTDOC').trim() === 'C' || win.getValue('cmbTDOC').trim() === 'A' ){
                //***********CONSULTA A SUMARIO DEBITOS***********
                this.beanDebits.strFecFiltro = win.getValue('cmbFecFiltro');
                this.beanDebits.strYearFrom = win.getValue('cmbDateFromYear');
                this.beanDebits.strMonthFrom = win.getValue('cmbDateFromMonth');
                this.beanDebits.strYearTo = win.getValue('cmbDateToYear');
                this.beanDebits.strMonthTo = win.getValue('cmbDateToMonth');

                this.beanDebits.IN_COUNTRY = win.getValue('cmbCountry');
    //            this.bean.IN_PAYMENT = win.getValue('cmbFOP');
                this.beanDebits.IN_CARDC = win.getValue('cmbCardType');
                this.beanDebits.IN_TICKET = win.getValue('txtTicket').trim();
                this.beanDebits.IN_FTE = win.getValue('cmbSource');
    //            this.beanDebits.IN_AFTE = win.getValue('cmbAFTE');
                this.beanDebits.IN_CARDN1 = win.getValue('txtCard1').trim();
                this.beanDebits.IN_CARDN2 = win.getValue('txtCard2').trim();
                this.beanDebits.IN_MERCHN = win.getValue('txtMERCHN').trim();
                this.beanDebits.IN_AUTHNBR = win.getValue('txtAUTHNBR').trim();
                this.beanDebits.IN_SAGENT = win.getValue('txtSAGENT').trim();
                this.beanDebits.IN_SPNR = win.getValue('txtPNR').trim();
                this.searchDebits(this.beanDebits)
            } else {
                //***********CONSULTA A SUMARIO VENTA***********
                this.bean.strFecFiltro = win.getValue('cmbFecFiltro');
                this.bean.strYearFrom = win.getValue('cmbDateFromYear');
                this.bean.strMonthFrom = win.getValue('cmbDateFromMonth');
                this.bean.strYearTo = win.getValue('cmbDateToYear');
                this.bean.strMonthTo = win.getValue('cmbDateToMonth');

                var selectedValue = win.getValue('rbgType').rbgType;
                switch (selectedValue) {
                    case 'Sales':
                        this.bean.IN_TDOC = 'S';
                        break;
                    case 'Refund':
                        this.bean.IN_TDOC = 'R';
                        break;
                }
                this.bean.IN_COUNTRY = win.getValue('cmbCountry');
    //            this.bean.IN_PAYMENT = win.getValue('cmbFOP');
                this.bean.IN_CARDC = win.getValue('cmbCardType');
                this.bean.IN_TICKET = win.getValue('txtTicket').trim();
                this.bean.IN_FTE = win.getValue('cmbSource');
    //            this.bean.IN_AFTE = win.getValue('cmbAFTE');
                this.bean.IN_CARDN1 = win.getValue('txtCard1').trim();
                this.bean.IN_CARDN2 = win.getValue('txtCard2').trim();
                this.bean.IN_MERCHN = win.getValue('txtMERCHN').trim();
                this.bean.IN_AUTHNBR = win.getValue('txtAUTHNBR').trim();
                this.bean.IN_SAGENT = win.getValue('txtSAGENT').trim();
                this.bean.IN_SPNR = win.getValue('txtPNR').trim();
                
                //            if(vskPrincipal.selectedChild == boxCharts){
                //                    with(boxSearchFilter){visible = false; includeInLayout = false}
                //                    imgFilter.toolTip = (boxSearchFilter.visible == true) ? 'Hidden filter' : 'Display filter';
                //                    imgSearchChart_clickHandler();
                //
                //            }else{
    //            if (win.getValue('cmbFOP') === 'CA') {
    //                this.searchCashMonth(this.bean);
    //            } else {
                this.search(this.bean);
    //                this.searchDetDay(this.bean);
    //            }
                //            }	
            }
        }
        
        
        
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    imgExcel_clickHandler: function (obj, e) {

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
        console.log(this.peek(), 'this.peek()')
        switch (this.peek()) {
            
            case  prototype.id + '-boxMainData':
                console.log('boxMainData')
                global.getFile(prototype.url + '/getXLSX?beanString=' + JSON.stringify(this.bean));
                break;
            case prototype.id + '-boxDetCountryS':
                global.getFileExcelPost('searchDetCountryByStval', JSON.stringify(me.beanDet), Ext.getCmp(prototype.id + '-gridDetCountryS').config.columns.items);
                break;
            case prototype.id + '-boxDetCardS':
                global.getFileExcelPost('searchDetCardCodeByStval', JSON.stringify(me.beanDet2), Ext.getCmp(prototype.id + '-gridDetCardS').config.columns.items);
                break;
            case prototype.id + '-boxDetDayS':
                global.getFileExcelPost('searchDetDayByStval', JSON.stringify(me.beanDet3), Ext.getCmp(prototype.id + '-gridDetDayS').config.columns.items);
                break;
            case prototype.id + '-boxDetTktS':
                console.log(me.f_boxDetTktS, 'me.f_boxDetTktS')
                if (me.f_boxDetTktS === '1') {
                    
                    global.getFileExcelPost('searchDetTICKET', JSON.stringify(me.beanboxDetTktS1), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                } else if (me.f_boxDetTktS === '2') {
                    global.getFileExcelPost('searchDetTktByStval', JSON.stringify(me.beanboxDetTktS2), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                } else if (me.f_boxDetTktS === '3') {
                    console.log(Ext.getCmp(prototype.id + '-gridDetTktByStval').getStore().data.items[0].data.TDOC, 'valor de grilla')
                    console.log(Ext.getCmp(prototype.id + '-gridDetTktByStval').getStore().data.items[0].data.DATABASE, 'valor de DATABASE')
                    switch (Ext.getCmp(prototype.id + '-gridDetTktByStval').getStore().data.items[0].data.TDOC) {
                        
                        case 'S':
                            me.beanboxDetTktS3.TabMPF = 'MPF100'
                            break;
                        case 'R':
                            me.beanboxDetTktS3.TabMPF = 'MPF075'
                            break;
                        case 'C':
                            me.beanboxDetTktS3.TabMPF = 'MPF076'
                            break;
                        case 'A':
                            switch (Ext.getCmp(prototype.id + '-gridDetTktByStval').getStore().data.items[0].data.DATABASE){
                                case 'MPF100':
                                    me.beanboxDetTktS3.TabMPF = 'MPF100'
                                    break;
                                case 'MPF077':
                                    me.beanboxDetTktS3.TabMPF = 'MPF077'
                                    break;
                            }
                        break
                        case 'D':
                            me.beanboxDetTktS3.TabMPF = 'DEBITS'
                            break;
                        default:
                            me.beanboxDetTktS3.TabMPF = 'MPF100'
                    }
                   
                    global.getFile(prototype.url + '/getXLSXDetalle?beanString=' +  encodeURI(JSON.stringify(me.beanboxDetTktS3)));
//                    global.getFileExcelPost('searchDetTARJETA', JSON.stringify(me.beanboxDetTktS3), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                } else if (me.f_boxDetTktS === '4') {
                    global.getFileExcelPost('searchDetMERCHAT', JSON.stringify(me.beanboxDetTktS4), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                }
                break;
            case prototype.id + '-boxDetTktMatch':
                console.log('entra en el match')
//                global.getFile(prototype.url + '/getXLSXDetalleByStval?beanString=' +  encodeURI(JSON.stringify(me.beanboxDetTktS2)));
                global.getFileExcelPost('searchDetTktByStval', JSON.stringify(me.beanboxDetTktS2), Ext.getCmp(prototype.id + '-gridDetTktMatch').config.columns.items);
                break;
            case prototype.id + '-boxDetBySAGENT':
                console.log(me.beanDetailAgent, 'me.beanDetailAgent')
                var beanDetailAgent = {}
                beanDetailAgent.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue()
                global.getFileExcelPost('searchBySAGENT', JSON.stringify(beanDetailAgent), Ext.getCmp(prototype.id + '-gridDetBySAGENT').config.columns.items);
                break;
            case prototype.id + '-panelIBT':
                console.log(me.beanIBT, 'me.beanIBT')
                global.getFile(prototype.url + '/getXLSXIBT?beanString=' + encodeURI(JSON.stringify(me.beanIBT)));
                break;
//            case  prototype.id + '-boxDetTktS':          
//                global.getFile(prototype.url + '/getXLSXDetailMain?beanString=' + JSON.stringify(this.beanDetailTar));
//                break;
//                
//            case prototype.id + '-boxDetTktS_DEBITS':
//                global.getFileExcelPost('searchDetTktByStval_REFND', JSON.stringify(me.beanboxDetTktS2), Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').config.columns.items);
//                break
            default:
                break;    
            
        }
    },
    btnClear_click: function (obj, e) {
        this.initDate();

        win.setValue('cmbCountry', '');
        win.setValue('cmbCardType', '');
        win.setValue('txtTicket', '');
        win.setValue('txtCard1', '');
        win.setValue('txtCard2', '');
        win.setValue('txtAUTHNBR', '');
        win.setValue('txtMERCHN', '');
        win.setValue('cmbSource', '');
        win.setValue('txtPNR', '');
        win.setValue('txtSAGENT', '');
        win.setValue('txtAMOUNT', '');
        win.setValue('cmbDebitType', '');
        win.setValue('cmbStatus', '');
    },

    btnBack_click: function (obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
//        if (this.peek() === prototype.id + '-boxDetDay') {
            global.showMenu();
        } else {
            this.stack.pop();
            this.selectedChild('vskMain', this.peek().substr(this.peek().indexOf('-') + 1), false);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function () {
        
        Ext.Ajax.request({
            url: prototype.url + '/obtainMessagesDT',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbDebitType').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbDebitType').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                
            }
        });
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAdjs',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbADJTYPE').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbADJTYPE').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2, CARD: 2
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    me.lstTarjetas = res.lstCard;
                    Ext.getCmp(prototype.id + '-cmbCardType').bindStore(
                            Ext.create('Ext.data.Store', {data: me.lstTarjetas, autoLoad: true})
                            );
                    win.setValue('cmbCountry', '');
                    win.setValue('cmbCardType', '');
                    me.btnSearch_click();
                } else
//                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF108");

                    me.selectedChild('vskMain', 'boxMainData');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    searchAcc: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF108");

                    me.selectedChild('vskMain', 'boxMainDataAcc');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;

                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataAcc').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pagginAcc').bindStore(storeGridDatas);
    },
    searchDebits: function (beanDebits) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDebits'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDebits)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF113");

                    me.selectedChild('vskMain', 'boxDebitsData');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        console.log(obj.data.items, 'obj.data')
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;

                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.clear();
                }
            }
        });
        console.log(storeGridDatas, 'STORE DEBITOS')
        Ext.getCmp(prototype.id + '-gridDebitsData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pagginDebits').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetCountry">
    searchDetCountry: function (beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountry'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF108");

                    me.selectedChild('vskMain', 'boxDetCountry');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            let objectData = obj.data.items[0].data;
                            let titleDetCountry = objectData.strTitulo
                            console.log('objectData', objectData, 'titleDetCountry', titleDetCountry)
                            Ext.getCmp(prototype.id + '-gridDetCountry').setTitle('<center style="font-size:12px;">' + titleDetCountry + '</center>');
//                            if (obj.strFecFiltro === 'DATEC') {
//                                Ext.getCmp(prototype.id + '-gridDetCountry').setTitle("Reconciliation Date : " + obj.strFormatDate);
//                                if (obj.IN_TDOC === 'R') {
//                                    win.setText('ahDetCtry', 'Refund Reconciliation');
//                                } else {
//                                    win.setText('ahDetCtry', 'Sales Reconciliation');
//                                }
//                            } else {
//                                if (obj.IN_TDOC === 'R') {
//                                    Ext.getCmp(prototype.id + '-gridDetCountry').setTitle("Refund Date : " + obj.strFormatDate);
//                                    win.setText('ahDetCtry', 'Refund Reconciliation');
//                                } else {
//                                    Ext.getCmp(prototype.id + '-gridDetCountry').setTitle("Sales Date : " + obj.strFormatDate);
//                                    win.setText('ahDetCtry', 'Sales Reconciliation');
//                                }
//                            }
                            //                            bxPag1.width = 1200;
                            //                            bxPag2.width = 1;
                            //                            bxPag2.visible = false;
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetCountry').setTitle('');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetCardCode">
    searchDetCardCode: function (beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCode'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF100");

                    me.selectedChild('vskMain', 'boxDetCard');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            let titleDetCard = obj.strTitulo 
                            Ext.getCmp(prototype.id + '-gridDetCard').setTitle('<center style="font-size:12px;">' + titleDetCard + '</center>');
//                            if (obj.strFecFiltro === 'DATEC') {
//                                Ext.getCmp(prototype.id + '-gridDetCard').setTitle("Reconciliation Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry);
//                                if (obj.IN_TDOC === 'R') {
//                                    win.setText('ahDetCard', 'Refund Reconciliation');
//                                } else {
//                                    win.setText('ahDetCard', 'Sales Reconciliation');
//                                }
//                            } else {
//                                if (obj.IN_TDOC === 'R') {
//                                    Ext.getCmp(prototype.id + '-gridDetCard').setTitle("Refund Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry);
//                                    win.setText('ahDetCard', 'Refund Reconciliation');
//                                } else {
//                                    Ext.getCmp(prototype.id + '-gridDetCard').setTitle("Sales Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry);
//                                    win.setText('ahDetCard', 'Sales Reconciliation');
//                                }
//                            }
                            //                            bxPag1.width = 1200;
                            //                            bxPag2.width = 1;
                            //                            bxPag2.visible = false;
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetCard').setTitle('');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCard').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetDay">
    searchDetDay: function (beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDay'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF100");

                    me.selectedChild('vskMain', 'boxDetDay');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            let titleDetDay = obj.strTitulo
                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + titleDetDay + '</center>');
//                            if (obj.strFecFiltro === 'DATEC') {
//                                Ext.getCmp(prototype.id + '-gridDetDay').setTitle("Reconciliation Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry + " - Card : " + obj.SCARCOD + ' : ' + obj.strDescCard);
//                                if (obj.IN_TDOC === 'R') {
//                                    win.setText('ahDetDay', 'Refund Reconciliation');
//                                } else {
//                                    win.setText('ahDetDay', 'Sales Reconciliation');
//                                }
//                            } else {
//                                if (obj.IN_TDOC === 'R') {
//                                    Ext.getCmp(prototype.id + '-gridDetDay').setTitle("Refund Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry + " - Card : " + obj.SCARCOD + ' : ' + obj.strDescCard);
//                                    win.setText('ahDetDay', 'Refund Reconciliation');
//                                } else {
//                                    Ext.getCmp(prototype.id + '-gridDetDay').setTitle("Sales Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry + " - Card : " + obj.SCARCOD + ' : ' + obj.strDescCard);
//                                    win.setText('ahDetDay', 'Sales Reconciliation');
//                                }
//                            }
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTicket">
    searchDetTicket: function (beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTicket'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF100");

                    me.selectedChild('vskMain', 'boxDetTicket');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetTicketAC = res.data;
                        if (gridDetTicketAC.length > 0) {
                            var obj = {};
                            for (var l = 0; l < gridDetTicketAC.length; l++) {
                                obj = gridDetTicketAC[l];
                                if (obj.IN_STVAL === "4") {
                                    if (obj.strPEM === "ACCB") {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }
                            if (obj !== null) {
                                if (obj.IN_TDOC === 'R') {
                                    win.setText('hcDetTkt', 'Refund');
                                } else {
                                    win.setText('hcDetTkt', 'Sales');
                                }

                                Ext.getCmp(prototype.id + '-gridDetTicket').setTitle(obj.strTitulo);
                                //                                win.setText('lblTotSVFOP', win.formatDblNumber(obj.dblTotSVFOP));
                            }
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetTicket').setTitle('');
                            //win.setText('lblTotSVFOP', '0');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCashMonth">
    searchCashMonth: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCashMonth'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2370");

                    me.selectedChild('vskMain', 'boxByCashMonth');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var Objtemp = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCashMonth').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCashCountry">
    searchCashCountry: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCashCountry'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2370");

                    me.selectedChild('vskMain', 'boxByCashCountry');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var Objtemp = obj.data.items[0].data;
                            win.setTitle('gridDetCashCountry', 'Sale Date ' + Objtemp.strFormatDate);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCashCountry').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCashDay">
    searchCashDay: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCashDay'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2370");

                    me.selectedChild('vskMain', 'boxByCashDay');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var Objtemp = obj.data.items[0].data;
                            win.setTitle('gridDetCashDay', win.getTitle('gridDetCashCountry') + '\t Country ' + Objtemp.SCOUNTRY + '-' + Objtemp.strDescCountry + '\t Currency ' + Objtemp.SCURRENCY);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCashDay').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTICKET">
    searchDetTICKET: function (beanDetailTkt) {
        me.f_boxDetTktS = '1';
        me.beanboxDetTktS1 = beanDetailTkt;
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTICKET',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanboxDetTktS1)},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                win.lblUser_toolTip("Estructura: MPF100");

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var gridDetTktSAC = res.lstDetTkyByStval;
                    if (gridDetTktSAC.length > 0) {
                        var obj = {};
                        for (var l = 0; l < gridDetTktSAC.length; l++) {
                            obj = gridDetTktSAC[l];
                            if (obj.IN_STVAL === "4") {
                                if (obj.strPEM === "ACCB") {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                        if (obj !== null) {
                            if (obj.IN_STVAL === '1') {
                                window.alert("1");
                                me.selectedChild('vskMain', 'boxDetTktMatch');
                                if (win.getValue('txtTicket') === '') {
                                    win.setTitle('gridDetTktMatch', '');
                                }
                                win.setTitle('gridDetTktMatch', 'Status : ' + obj.STVAL);
                                Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(
                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
                                        );
                                Ext.getCmp(prototype.id + '-cmbError').hide();
                            } else {
                                me.selectedChild('vskMain', 'boxDetTktS');
                                win.setText('lblTitDetTktByStval', obj.strTitulo);
                                if (obj.IN_TDOC === 'R') {
                                    win.setText('hcDetTktS', 'Refund');
                                } else {
                                    win.setText('hcDetTktS', 'Sales');
                                }
                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(
                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
                                        );
                                Ext.getCmp(prototype.id + '-cmbError').show();
                            }
                        }
                        // Colocando los Errores ==============================================
                        var lstError = res.lstError;
                        var errors = new Array();
                        errors.push(['', 'All']);
                        lstError.forEach(function callback(currentValue, index, array) {
                            errors.push([currentValue.CERROR, currentValue.strDescripcion]);
                        });
                        var store = Ext.create('Ext.data.ArrayStore', {
                            storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
                        });
                        Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
                        win.setValue('cmbError', '');
                        // ====================================================================
                    } else {
                        win.setTitle('gridDetTktMatch', '');
                        win.setText('lblTitDetTktByStval', '');
                        global.Msg({msg: 'Data not found'});
                    }
                } else
//                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchWarnTkts">
    searchWarnTkts: function (bean) {
        Ext.Ajax.request({
            url: prototype.url + '/searchWarnTkts',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                win.lblUser_toolTip("Estructura: MPF100");

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstMPF100 = res.lstWarnTkt;

                    if (lstMPF100 !== undefined && lstMPF100.length > 0) {
                        var DataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationForm.DataEntry', {
                            id: 'DataEntrySalesReconciliationForm'
                        });
                        var controller = DataEntry.getController();
                        controller.lstMPF100 = lstMPF100;
                        controller.lstCards = me.lstTarjetas;
                        controller.actionCode = win.DE_ACT_VIEW;
                        DataEntry.show();
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
//                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchBean">
    searchBean: function (bean, box) {
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(box).mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(box).unmask();
                win.lblUser_toolTip("Estructura: MPF100");

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanCons = res.beanCons;
                    if (beanCons !== undefined ) {
                        var DataEntryTicket = Ext.create('Ext.Praxis.view.payments.SalesReconciliationForm.DataEntryTicket', {
                            id: 'DataEntryTicketSalesReconciliationForm'
                        });
                        var controller = DataEntryTicket.getController();
                        controller.bean = beanCons;
                        controller.lista = win.getCmp('gridDetTicket').getStore().data.items;
                        controller.lstCards = me.lstTarjetas;
                        controller.actionCode = win.DE_ACT_SELECT;
                        DataEntryTicket.show();
                    } else {
                        
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
//                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(box).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetCountryByStval">
    searchDetCountryByStval: function (beanDet) {
        this.beanDet = beanDet;
        console.log(this.beanDet);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetCountryS');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDetCountryS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                        console.log(res.lstDetError);
                        var cbxDetErrorAC = res.lstDetError;
                        Ext.getCmp(prototype.id + '-gridDetCSE').bindStore(
                                Ext.create("Ext.Praxis.store.payments.GridData", {data: cbxDetErrorAC})
                                );
                        if (cbxDetErrorAC.length > 0) {
                            var objER = {};
                            for (var q = 0; q < cbxDetErrorAC.length; q++) {
                                objER = cbxDetErrorAC[q];
                            }
                            if (objER.IN_STVAL === '4') {
                                Ext.getCmp(prototype.id + '-con').show();
                                Ext.getCmp(prototype.id + '-verQuery').show();
                                Ext.getCmp(prototype.id + '-sin').hide();
                                Ext.getCmp(prototype.id + '-noQuery').hide();
                            } else {
                                Ext.getCmp(prototype.id + '-con').hide();
                                Ext.getCmp(prototype.id + '-verQuery').hide();
                                Ext.getCmp(prototype.id + '-sin').show();
                                Ext.getCmp(prototype.id + '-noQuery').show();
                            }

                            Ext.getCmp(prototype.id + '-gridDetCSE').show();
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetCSE').hide();
                        }
                        //                        //Calculando tamanio del Datagrid
                        //                        if(gridDetCountrySAC.length >= cbxDetErrorAC.length){
                        //                            gridDetCountryS.rowCount = gridDetCountrySAC.length+4;
                        //                            gridDetCSE.rowCount = gridDetCountrySAC.length+4;
                        //                        }else if(cbxDetErrorAC.length >= gridDetCountrySAC.length){
                        //                            gridDetCountryS.rowCount = cbxDetErrorAC.length+4;
                        //                            gridDetCSE.rowCount = cbxDetErrorAC.length+4;
                        //                        }else{
                        //                            gridDetCountryS.rowCount = 6;
                        //                            gridDetCSE.rowCount = 6;
                        //                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    //</editor-fold>
    searchDetCountryByStval_1: function (beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_1'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCountryS');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDetCountryS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    searchDetCountryByStval_REFND: function (beanREFND) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_REFND'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanREFND)};
                },
                load: function (obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCountryS_REFND');
                    win.lblUser_toolTip("Estructura: MPF075");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDetCountryS_REFND', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS_REFND').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
    searchDetCountryByStval_CHGBAK: function (beanCHGBAK) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_CHGBAK'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanCHGBAK)};
                },
                load: function (obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCountryS_CHGBAK');
                    win.lblUser_toolTip("Estructura: MPF076");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDetCountryS_CHGBAK', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS_CHGBAK').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin14').bindStore(storeGridDatas);
    },
    searchDetCountryByStval_ACREDIT: function (beanACREDIT) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_ACREDIT'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanACREDIT)};
                },
                load: function (obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCountryS_ACREDIT');
                    win.lblUser_toolTip("Estructura: MPF077");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDetCountryS_ACREDIT', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS_ACREDIT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin15').bindStore(storeGridDatas);
    },
    searchDetCountryByStval_DEBITS: function (beanDEBITS) {
        console.log('ENTRA AL SEARCH DE BAJADA ')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_DEBITS'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDEBITS)};
                },
                load: function (obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'panelGridDetCardByS_Debits');
                    win.lblUser_toolTip("Estructura: MPF101");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDataDetCardByS_Debits', '<center>' + Objtemp.strTitulo + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetCardByS_Debits').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin15').bindStore(storeGridDatas);
    },
    searchDetByStval_DEBITS: function (beanDetDEBITS) {
        me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetDEBITS;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByStval_DEBITS'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDetDEBITS)};
                },
                load: function (obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'panelGridDataDetalle_DEBITS');
                    win.lblUser_toolTip("Estructura: MPF101");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
                            win.setTitle('gridDataDetalle_DEBITS', '<center>' + Objtemp.strTitulo + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetalle_DEBITS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin18').bindStore(storeGridDatas);
    },
    //<editor-fold defaultstate="collapsed" desc="searchDetCardCodeByStval">
    searchDetCardCodeByStval: function (beanDet) {
        this.beanDet2 = beanDet;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCodeByStval'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet2)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetCardS');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCardSAC = res.data;
                        if (gridDetCardSAC.length > 0) {
                            var Objtemp = gridDetCardSAC[0];
                            win.setTitle('gridDetCardS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                        var cbxDetErrorCCAC = res.lstDetError;
                        Ext.getCmp(prototype.id + '-gridDetCCSE').bindStore(
                                Ext.create("Ext.Praxis.store.payments.GridData", {data: cbxDetErrorCCAC})
                                );
                        if (cbxDetErrorCCAC.length > 0) {
                            var objER = {};
                            for (var q = 0; q < cbxDetErrorCCAC.length; q++) {
                                objER = cbxDetErrorCCAC[q];
                            }
                            if (objER.IN_STVAL === '4') {
                                Ext.getCmp(prototype.id + '-con1').show();
                                Ext.getCmp(prototype.id + '-sin1').hide();
                            } else {
                                Ext.getCmp(prototype.id + '-con1').hide();
                                Ext.getCmp(prototype.id + '-sin1').show();
                            }

                            Ext.getCmp(prototype.id + '-gridDetCCSE').show();
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetCCSE').hide();
                        }
                        //                        //Calculando tamanio del Datagrid
                        //                        if(gridDetCardSAC.length >= cbxDetErrorCCAC.length){
                        //                            gridDetCardS.rowCount = gridDetCardSAC.length+4;
                        //                            gridDetCCSE.rowCount = gridDetCardSAC.length+4;
                        //                        }else if(cbxDetErrorCCAC.length >= gridDetCardSAC.length){
                        //                            gridDetCardS.rowCount = cbxDetErrorCCAC.length+4;
                        //                            gridDetCCSE.rowCount = cbxDetErrorCCAC.length+4;
                        //                        }else{
                        //                            gridDetCardS.rowCount = 6;
                        //                            gridDetCCSE.rowCount = 6;
                        //                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCardS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetDayByStval">
    searchDetDayByStval: function (beanDet) {
        this.beanDet3 = beanDet;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDayByStval'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet3)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetDayS');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetDaySAC = res.data;
                        if (gridDetDaySAC.length > 0) {
                            var Objtemp = gridDetDaySAC[0];
                            win.setTitle('gridDetDayS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                        var cbxDetErrorDAC = res.lstDetError;
                        Ext.getCmp(prototype.id + '-gridDetDSE').bindStore(
                                Ext.create("Ext.Praxis.store.payments.GridData", {data: cbxDetErrorDAC})
                                );
                        if (cbxDetErrorDAC.length > 0) {
                            var objER = {};
                            for (var q = 0; q < cbxDetErrorDAC.length; q++) {
                                objER = cbxDetErrorDAC[q];
                            }
                            //                            
                            Ext.getCmp(prototype.id + '-gridDetDSE').show();
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetDSE').hide();
                        }
                        //                        //Calculando tamanio del Datagrid
                        //                        if(gridDetDaySAC.length >= cbxDetErrorDAC.length){
                        //                            gridDetDayS.rowCount = gridDetDaySAC.length+4;
                        //                            gridDetDSE.rowCount = gridDetDaySAC.length+4;
                        //                        }else if(cbxDetErrorDAC.length >= gridDetDaySAC.length){
                        //                            gridDetDayS.rowCount = cbxDetErrorDAC.length+4;
                        //                            gridDetDSE.rowCount = cbxDetErrorDAC.length+4;
                        //                        }else{
                        //                            gridDetDayS.rowCount = 6;
                        //                            gridDetDSE.rowCount = 6;
                        //                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetDayS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTktByStvalBK">
    searchDetTktByStvalBK: function (beanDetE) {
        me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetE;
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTktByStval',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanboxDetTktS2)},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                win.lblUser_toolTip("Estructura: MPF100");

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var gridDetTktSAC = res.data;
                    if (gridDetTktSAC.length > 0) {
                        var obj = {};
                        for (var l = 0; l < gridDetTktSAC.length; l++) {
                            obj = gridDetTktSAC[l];
                            if (obj.IN_STVAL === "4") {
                                if (obj.strPEM === "ACCB") {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                        if (obj !== null) {
                            var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC, total: res.total});

                            storeGridDatas.total = res.total;
                            storeGridDatas.totalCount = res.total;

                            if (obj.IN_STVAL === '1') {
                                win.setTitle('gridDetTktMatch', obj.strTitulo);
//                                var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC});
                                Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(storeGridDatas);
                                Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
                                me.selectedChild('vskMain', 'boxDetTktMatch');
                                Ext.getCmp(prototype.id + '-cmbError').hide();
                            } else {
//                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(
//                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
//                                        );
                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
                                Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
                                Ext.getCmp(prototype.id + '-cmbError').show();
                                me.selectedChild('vskMain', 'boxDetTktS');
                                win.setText('lblTitDetTktByStval', obj.strTitulo);
                                if (obj.IN_TDOC === 'R') {
                                    win.setText('hcDetTktS', 'Refund');
                                } else {
                                    win.setText('hcDetTktS', 'Sales');
                                }
                            }
                        }
                        // Colocando los Errores ==============================================
                        var lstError = res.lstError;
                        var errors = new Array();
                        errors.push(['', 'All']);
                        lstError.forEach(function callback(currentValue, index, array) {
                            errors.push([currentValue.CERROR, currentValue.strDescripcion]);
                        });
                        var store = Ext.create('Ext.data.ArrayStore', {
                            storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
                        });
                        Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
                        win.setValue('cmbError', '');
                        // ====================================================================
                    } else {
                        win.setTitle('gridDetTktMatch', '');
                        win.setText('lblTitDetTktByStval', '');
                        global.Msg({msg: 'Data not found'});
                    }
                } else
//                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    
    searchDetTktByStval_DEBITS: function (beanDetE, consultPath, paggin) {
//        me.f_boxDetTktS = '2';
//        me.beanboxDetTktS2 = beanDetE;
        let nameTable = ''
        let hideTkt = false
        if(consultPath.includes('REFND')){
            nameTable = 'MPF075'
            hideTkt = false
        } else if (consultPath.includes('CHGBAK')){
            nameTable = 'MPF076'
            hideTkt = true
        } else if (consultPath.includes('ACREDIT')){
            nameTable = 'MPF077'
            hideTkt = true
        }
        
        
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/' + consultPath
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDetE)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetTktS_DEBITS');
                    win.lblUser_toolTip("Estructura: " + nameTable);

                    var res = Ext.JSON.decode(response._response.responseText);
                    

                    if (res.success) {
                        var gridDetTktSAC = res.data;
                        if (gridDetTktSAC.length > 0) {
                            var Objtemp = gridDetTktSAC[0];
                            win.setTitle('gridDetTktByStval_DEBITS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else{
                        global.Msg({msg: res.sesion});
                    }
                    global.clear();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin17').bindStore(storeGridDatas);
        if(hideTkt){
            Ext.getCmp(prototype.id + '-columnTkt_debits').hide();
            Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').setWidth(910)

        }else {
            Ext.getCmp(prototype.id + '-columnTkt_debits').show();
            Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').setWidth(1030)
        }
        
//        Ext.Ajax.request({
//            url: prototype.url + '/' + consultPath,
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(beanDetE)},
//            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
//            success: function (response, opts) {
//                Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                win.lblUser_toolTip("Estructura: " + nameTable);
////                me.selectedChild('vskMain', 'boxDetTktS_DEBITS');
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    var gridDetTktSAC = res.data;
//                    if (gridDetTktSAC.length > 0) {
//                        var obj = {};
//                        for (var l = 0; l < gridDetTktSAC.length; l++) {
//                            obj = gridDetTktSAC[l];
//                            if (obj.IN_STVAL === "4") {
//                                if (obj.strPEM === "ACCB") {
//                                    break;
//                                }
//                            } else {
//                                break;
//                            }
//                        }
//                        if (obj !== null) {
//                            var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC, total: res.total});
//                            storeGridDatas.total = res.total;
//                            storeGridDatas.totalCount = res.total;
////                                Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').bindStore(
////                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
////                                        );
//                            console.log(storeGridDatas, 'storeGridDatas adadadadad')
//                            Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').bindStore(storeGridDatas);
//                            Ext.getCmp(prototype.id + '-paggin17').bindStore(storeGridDatas);
//                            me.selectedChild('vskMain', 'boxDetTktS_DEBITS');
//                            if(hideTkt){
//                                Ext.getCmp(prototype.id + '-columnTkt_debits').hide();
//                                Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').setWidth(910)
//                                
//                            }else {
//                                Ext.getCmp(prototype.id + '-columnTkt_debits').show();
//                                Ext.getCmp(prototype.id + '-gridDetTktByStval_DEBITS').setWidth(1030)
//                            }
//                            Ext.getCmp(prototype.id + '-cmbError_DEBITS').show();
////                            me.selectedChild('vskMain', 'boxDetTktS_DEBITS');
//                            win.setText('lblTitDetTktByStval_DEBITS', obj.strTitulo);
//                            console.log('obj.strTitulo', obj.strTitulo)
//                            win.setTitle('gridDetTktByStval_DEBITS', obj.strTitulo);
//                            if (obj.IN_TDOC === 'R') {
//                                win.setText('hcDetTktS_DEBITS', 'Refund');
//                            } else {
//                                win.setText('hcDetTktS_DEBITS', 'Sales');
//                            }
//                            
//                        }
//                        // Colocando los Errores ==============================================
//                        var lstError = res.lstError;
//                        var errors = new Array();
//                        errors.push(['', 'All']);
//                        lstError.forEach(function callback(currentValue, index, array) {
//                            errors.push([currentValue.CERROR, currentValue.strDescripcion]);
//                        });
//                        var store = Ext.create('Ext.data.ArrayStore', {
//                            storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
//                        });
//                        Ext.getCmp(prototype.id + '-cmbError_DEBITS').bindStore(store);
//                        win.setValue('cmbError', '');
//                        // ====================================================================
//                    } else {
//                        win.setText('lblTitDetTktByStval_DEBITS', '');
//                        global.Msg({msg: 'Data not found'});
//                    }
//                } else
////                    global.Msg({msg: res.sesion});
//                global.clear();
//            },
//            failure: function (response, opts) {
//                Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTktByStval">
    searchDetTktByStval: function (beanDetE) {
        me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetE;


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktByStval'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDetE)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetTktMatch');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);


                    if (res.success) {
                        var gridDetTktSAC = res.data;
                        if (gridDetTktSAC.length > 0) {
                            var obj = {};
                            for (var l = 0; l < gridDetTktSAC.length; l++) {
                                obj = gridDetTktSAC[l];
                                if (obj.IN_STVAL === "4") {
                                    if (obj.strPEM === "ACCB") {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }
                            if (obj !== null) {

                                if (obj.IN_STVAL === '1') {
                                    win.setTitle('gridDetTktMatch', obj.strTitulo);
                                    //                                var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC});
//                                   Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(storeGridDatas);
//                                   Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
                                    me.selectedChild('vskMain', 'boxDetTktMatch');
                                    Ext.getCmp(prototype.id + '-cmbError').hide();
                                } else {
                                    //                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(
                                    //                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
                                    //                                        );
//                                   Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
//                                   Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
                                    Ext.getCmp(prototype.id + '-cmbError').show();
                                    me.selectedChild('vskMain', 'boxDetTktS');
                                    win.setText('lblTitDetTktByStval', obj.strTitulo);
                                    if (obj.IN_TDOC === 'R') {
                                        win.setText('hcDetTktS', 'Refund');
                                    } else {
                                        win.setText('hcDetTktS', 'Sales');
                                    }
                                }
                            }
                            // Colocando los Errores ==============================================
                            var lstError = res.lstError;
                            var errors = new Array();
                            errors.push(['', 'All']);
                            lstError.forEach(function callback(currentValue, index, array) {
                                errors.push([currentValue.CERROR, currentValue.strDescripcion]);
                            });
                            var store = Ext.create('Ext.data.ArrayStore', {
                                storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
                            });
                            Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
                            win.setValue('cmbError', '');
                            // ====================================================================
                        } else {
                            win.setTitle('gridDetTktMatch', '');
                            win.setText('lblTitDetTktByStval', '');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        console.log('storeGridDatas wadafaaaaaaaaaaa', storeGridDatas)
        Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
//        
//        Ext.Ajax.request({
//            url: prototype.url + '/searchDetTktByStval',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(me.beanboxDetTktS2)},
//            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
//            success: function (response, opts) {
//                Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                win.lblUser_toolTip("Estructura: MPF100");
//
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    var gridDetTktSAC = res.data;
//                    if (gridDetTktSAC.length > 0) {
//                        var obj = {};
//                        for (var l = 0; l < gridDetTktSAC.length; l++) {
//                            obj = gridDetTktSAC[l];
//                            if (obj.IN_STVAL === "4") {
//                                if (obj.strPEM === "ACCB") {
//                                    break;
//                                }
//                            } else {
//                                break;
//                            }
//                        }
//                        if (obj !== null) {
//                            var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC,total:res.total});
//                            
//                            storeGridDatas.total = res.total;
//                            storeGridDatas.totalCount = res.total;
//                            
//                            if (obj.IN_STVAL === '1') {
//                                win.setTitle('gridDetTktMatch', obj.strTitulo);
////                                var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC});
//                                Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(storeGridDatas);
//                                Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
//                                me.selectedChild('vskMain', 'boxDetTktMatch');
//                                Ext.getCmp(prototype.id + '-cmbError').hide();
//                            } else {
////                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(
////                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
////                                        );
//                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
//                                Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
//                                Ext.getCmp(prototype.id + '-cmbError').show();
//                                me.selectedChild('vskMain', 'boxDetTktS');
//                                win.setText('lblTitDetTktByStval', obj.strTitulo);
//                                if (obj.IN_TDOC === 'R') {
//                                    win.setText('hcDetTktS', 'Refund');
//                                } else {
//                                    win.setText('hcDetTktS', 'Sales');
//                                }
//                            }
//                        }
//                        // Colocando los Errores ==============================================
//                        var lstError = res.lstError;
//                        var errors = new Array();
//                        errors.push(['', 'All']);
//                        lstError.forEach(function callback(currentValue, index, array) {
//                            errors.push([currentValue.CERROR, currentValue.strDescripcion]);
//                        });
//                        var store = Ext.create('Ext.data.ArrayStore', {
//                            storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
//                        });
//                        Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
//                        win.setValue('cmbError', '');
//                        // ====================================================================
//                    } else {
//                        win.setTitle('gridDetTktMatch', '');
//                        win.setText('lblTitDetTktByStval', '');
//                        global.Msg({msg: 'Data not found'});
//                    }
//                } else
//                    global.Msg({msg: res.sesion});
//            },
//            failure: function (response, opts) {
//                Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });
    },
    //</editor-fold>

    searchDetTARJETA: function (beanDetailTar, consultPath) {
        console.log(beanDetailTar, 'beanDetailTar')
        me.f_boxDetTktS = '3';
        me.beanboxDetTktS3 = beanDetailTar;
        console.log(me.beanboxDetTktS3, 'me.beanboxDetTktS3')
        let nameTable = ''
        let hideTkt = false
        if(consultPath.includes('REFND')){
           nameTable = 'MPF075'
           hideTkt = false
        } else if (consultPath.includes('CHGBAK')){
           nameTable = 'MPF076'
           hideTkt = true
        } else if (consultPath.includes('ACREDIT')){
           nameTable = 'MPF077'
           hideTkt = true
        } else if (consultPath.includes('ALLDEBITS')){
            nameTable = 'AllDebits'
            hideTkt = false
        }else{
            nameTable = 'MPF100'
            hideTkt = false
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                //searchDetTARJETA
                url: prototype.url + '/' + consultPath
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanboxDetTktS3)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetTktS');
                    win.lblUser_toolTip("Estructura: " + nameTable);

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetDaySAC = res.data;
                        if (gridDetDaySAC.length > 0) {
                            var obj = gridDetDaySAC[0];
//                            win.setTitle('gridDetTktByStval', "Sales Date: " + obj.SDATE);

                            if (obj.IN_TDOC === 'R') {
                                win.setText('hcDetTktS', 'Refund');
                            } else {
                                win.setText('hcDetTktS', 'Sales');
                            }
                            Ext.getCmp(prototype.id + '-cmbError').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                        // Colocando los Errores ==============================================
                        var lstError = res.lstError;
                        var errors = new Array();
                        errors.push(['', 'All']);
                        lstError.forEach(function callback(currentValue, index, array) {
                            errors.push([currentValue.CERROR, currentValue.strDescripcion]);
                        });
                        var store = Ext.create('Ext.data.ArrayStore', {
                            storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
                        });
                        Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
                        win.setValue('cmbError', '');

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
        if(hideTkt){
            Ext.getCmp(prototype.id + '-columnTkt_DETALLE').hide();
            Ext.getCmp(prototype.id + '-gridDetTktByStval').setWidth(1383)

        }else {
            Ext.getCmp(prototype.id + '-columnTkt_DETALLE').show();
            Ext.getCmp(prototype.id + '-gridDetTktByStval').setWidth(1525)
        }
    },
    searchDetMERCHAT: function (beanDetailMer) {
        me.f_boxDetTktS = '4';
        me.beanboxDetTktS4 = beanDetailMer;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetMERCHAT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDetailMer)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetTktS');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        var gridDetDaySAC = res.lstDetTkyByStval;
                        if (gridDetDaySAC.length > 0) {
                            var obj = gridDetDaySAC[0];
                            win.setText('lblTitDetTktByStval', obj.strTitulo);

                            if (obj.IN_TDOC === 'R') {
                                win.setText('hcDetTktS', 'Refund');
                            } else {
                                win.setText('hcDetTktS', 'Sales');
                            }
                            Ext.getCmp(prototype.id + '-cmbError').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                        // Colocando los Errores ==============================================
                        var lstError = res.lstError;
                        var errors = new Array();
                        errors.push(['', 'All']);
                        lstError.forEach(function callback(currentValue, index, array) {
                            errors.push([currentValue.CERROR, currentValue.strDescripcion]);
                        });
                        var store = Ext.create('Ext.data.ArrayStore', {
                            storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
                        });
                        Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
                        win.setValue('cmbError', '');

                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
//    exportExcel: function (_path) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function (btn) {
//                if (btn === 'ok') {
//                    global.getFile(_path);
//                }
//            }
//        });
//    },
    setStoreDataIBT:function (){
        
        me.beanIBT = {}
        me.beanIBT.strFecFiltro = win.getValue('cmbFecFiltro_IBT');
        me.beanIBT.strYearFrom = win.getValue('cmbDateFromYear_IBT');
        me.beanIBT.strMonthFrom = win.getValue('cmbDateFromMonth_IBT');
        me.beanIBT.strYearTo = win.getValue('cmbDateToYear_IBT');
        me.beanIBT.strMonthTo = win.getValue('cmbDateToMonth_IBT');
        me.beanIBT.strDayFrom = win.getValue('cmbDateDay_IBT');
        me.beanIBT.strDayTo = win.getValue('cmbDateToDay_IBT');
        me.beanIBT.IN_INVOICE = win.getValue('txtINVOICE_IBT');
        me.beanIBT.IN_BANDOC = win.getValue('txtBANDOC_IBT');
        me.beanIBT.IN_TICKET = win.getValue('txtTicket_IBT');
        console.log(me.beanIBT, 'me.beanIBT')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchIBT'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanIBT)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    console.log('entra al load')
                    var pag = Ext.getCmp(prototype.id + '-paggin19');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage_IBT').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount_IBT').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total_IBT').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    me.selectedChild('vskIBT', 'panelIBT');
                    win.lblUser_toolTip("Estructura: MPF100");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res, 'res')
                    if (res.success) {
                        if (obj.data.length > 0) {
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridIBT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin19').bindStore(storeGridDatas);
    },
    ocultarFiltersMain: function(){
        Ext.getCmp(prototype.id + '-contSales').hide()
        Ext.getCmp(prototype.id + '-contFilterDate1').hide()
        Ext.getCmp(prototype.id + '-contSecondFilter').hide()
        Ext.getCmp(prototype.id + '-contThirdFilter').hide()
        Ext.getCmp(prototype.id + '-boxPagDetail').hide()
        Ext.getCmp(prototype.id + '-contInvoice').show()
        Ext.getCmp(prototype.id + '-contFilterDate2').show()
    },
    verFiltersMain: function(){
        Ext.getCmp(prototype.id + '-contSales').show()
        Ext.getCmp(prototype.id + '-contFilterDate1').show()
        Ext.getCmp(prototype.id + '-contSecondFilter').show()
        Ext.getCmp(prototype.id + '-contThirdFilter').show()
        Ext.getCmp(prototype.id + '-boxPagDetail').show()
        Ext.getCmp(prototype.id + '-contInvoice').hide()
        Ext.getCmp(prototype.id + '-contFilterDate2').hide()
    },
    onViewIBT: function (){
//        let filter = Ext.getCmp(prototype.id + '-contentFilter');
//        let filter_IBT = Ext.getCmp(prototype.id + '-contentFilter_IBT');
        
        let panelMain = Ext.getCmp(prototype.id + '-vskMain');
        let panel_IBT = Ext.getCmp(prototype.id + '-vskIBT');
        if(!panel_IBT.isVisible()){
            this.ocultarFiltersMain()
            this.setStoreDataIBT()
            panel_IBT.show()

            panelMain.hide()
        }else{
            panel_IBT.hide()

            panelMain.show()
            this.verFiltersMain()
        }
        
//        var panelMain = Ext.getCmp(prototype.id + '-panelMain');
//        var panelTW = Ext.getCmp(prototype.id + '-panelTW');
//        
//        var option = Ext.getCmp(prototype.id + '-contentFilter');
//        var option2 = Ext.getCmp(prototype.id + '-contentFilterBT');
//        
//        if (panelMain.isVisible()) {
//            panelMain.setVisible(false);
//            option.setVisible(false);
//            panelTW.setVisible(true);
//            option2.setVisible(true);
//            
//            var lista = [{code:"SDATE",name:"Sale Date"}];
//            var storeData = Ext.create('Ext.data.Store', {
//                fields: ['data'],
//                data: lista,
//                autoLoad: true
//            });
//            Ext.getCmp(prototype.id + '-cmbTipoFecha').bindStore(storeData);//
//            Ext.getCmp(prototype.id + '-cmbTipoFecha').setValue('SDATE');
//            
//            this.setStoreDataTW();
//            this.obtainFields('MPF100','');
//            this.imgClearFields();
//            this.searchTW();
//        } else {
//            panelMain.setVisible(true);
//            option.setVisible(true);
//            panelTW.setVisible(false);
//            option2.setVisible(false);
//        }
    },
    viewMasterTkt2: function (column, e, row, column, x, rowData) {

        var data = x.record.data;
        var strTkt = data.TICKET;

        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        this.beanProMasterTicket.IN_SEQ = '00';

        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';

        win.displayCustomViewTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    viewMasterTkt3: function (column, e, row, column, x, rowData) {

        var data = x.record.data;
        var strTkt = data.strTicket;

        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
        this.beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket);
        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';

        win.displayCustomViewTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    habilitarFiltros: function () {
        win.enabled('cmbDateFromYear', true);
        win.enabled('cmbDateFromMonth', true);
        win.enabled('cmbDateToYear', true);
        win.enabled('cmbDateToMonth', true);
//        win.enabled('cmbAFTE', true);
        win.enabled('cmbCardType', true);
        win.enabled('cmbCountry', true);
//        win.enabled('cmbFOP', true);
        win.enabled('cmbSource', true);
    },
    habilitarFiltros2: function () {
//        win.enabled('cmbAFTE', true);
        win.enabled('cmbCardType', true);
        win.enabled('cmbCountry', true);
//        win.enabled('cmbFOP', true);
        win.enabled('cmbSource', true);
    },
    inhabilitarFiltrosByFCONT: function () {
        win.enabled('cmbSource', false);
//        win.enabled('cmbCountry', false);
        win.enabled('txtPNR', false);
        win.enabled('txtTicket', false);
        win.enabled('txtCard1', false);
        win.enabled('txtCard2', false);
        win.enabled('txtAUTHNBR', false);
        win.enabled('cmbCardType', false);
        win.enabled('txtSAGENT', false);
    },
    habilitarFiltrosByFCONT: function () {
        win.enabled('cmbSource', true);
        win.enabled('cmbCountry', true);
        win.enabled('txtPNR', true);
        win.enabled('txtTicket', true);
        win.enabled('txtCard1', true);
        win.enabled('txtCard2', true);
        win.enabled('txtAUTHNBR', true);
        win.enabled('cmbCardType', true);
        win.enabled('txtSAGENT', true);
        
    },
    vaciarFiltrosByFCONT: function () {
        win.setValue('cmbSource', '');
//        win.setValue('cmbCountry', '');
        win.setValue('txtPNR', '');
        win.setValue('txtTicket', '');
        win.setValue('txtCard1', '');
        win.setValue('txtCard2', '');
        win.setValue('txtAUTHNBR', '');
        win.setValue('cmbCardType', '');
        win.setValue('txtSAGENT', '');
    },
    selectFecFiltro: function () {
        console.log('evento select')
        if( win.getValue('cmbFecFiltro').trim() == 'FCONT' ){
            this.inhabilitarFiltrosByFCONT()
            this.vaciarFiltrosByFCONT()
        } else {
            this.habilitarFiltrosByFCONT()
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
//        let paginado = this.getPaggin()
//        paginado.moveFirst();
        this.getPaggin().moveFirst();
        console.log('BOTON PAGINADO')
    },
    pagPrevious: function (obj, e) {
//        let paginado = this.getPaggin()
//        paginado.movePrevious();
        this.getPaggin().movePrevious();
        console.log('BOTON PAGINADO')
    },
    pagNext: function (obj, e) {
//        let paginado = this.getPaggin()
//        paginado.moveNext();
        this.getPaggin().moveNext();
//        console.log(this.getPaggin(), 'this.getPaggin()')
        console.log('BOTON PAGINADO')
    },
    pagLast: function (obj, e) {
//        let paginado = this.getPaggin()
//        paginado.moveLast();
        this.getPaggin().moveLast();
        console.log('BOTON PAGINADO')
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        console.log(paggin, 'paggin')
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
            console.log('paginado: ', currentPage, pageCount, total )

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
    getPaggin: function () {
        if( Ext.getCmp(prototype.id + '-vskIBT').isVisible()){
            return Ext.getCmp(prototype.id + '-paggin19');
        }else{
            switch (this.peek()) {
                case prototype.id + '-boxMainData':
                    return Ext.getCmp(prototype.id + '-paggin');
                case prototype.id + '-boxDetCountry':
                    return Ext.getCmp(prototype.id + '-paggin2');
                case prototype.id + '-boxDetCard':
                    return Ext.getCmp(prototype.id + '-paggin3');
                case prototype.id + '-boxDetDay':
                    return Ext.getCmp(prototype.id + '-paggin4');
                case prototype.id + '-boxDetTicket':
                    return Ext.getCmp(prototype.id + '-paggin5');
                case prototype.id + '-boxDetCountryS':
                    return Ext.getCmp(prototype.id + '-paggin6');
                case prototype.id + '-boxDetCardS':
                    return Ext.getCmp(prototype.id + '-paggin7');
                case prototype.id + '-boxDetDayS':
                    return Ext.getCmp(prototype.id + '-paggin8');
                case prototype.id + '-boxDetTktMatch':
                    return Ext.getCmp(prototype.id + '-paggin9');
                case prototype.id + '-boxDetTktS':
                    return Ext.getCmp(prototype.id + '-paggin10');
                case prototype.id + '-boxDetByPNR':
                    return Ext.getCmp(prototype.id + '-paggin11');
                case prototype.id + '-boxDetBySAGENT':
                    return Ext.getCmp(prototype.id + '-paggin12');
    //            case prototype.id + '-gridDetCountryS_REFND':
    //                return Ext.getCmp(prototype.id + '-paggin13');
                case prototype.id + '-boxDetTktS_DEBITS':
                    console.log('wadafa')
                    return Ext.getCmp(prototype.id + '-paggin17');
                case prototype.id + '-panelGridDataDetalle_DEBITS':
                    return Ext.getCmp(prototype.id + '-paggin18');

                default:
                    return null;
            }
        }
        
    },
    peek: function () {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    onValidarChange: function (cmp, value) {
        var list = cmp.getValue().replace(/\s/g, "").split("");
        var txt = '';
        for (var i = 0; i < list.length; i++) {
            if (list[i].toLowerCase() === list[i].toUpperCase()) {
                txt += list[i];
            }
        }
        cmp.setValue(txt.substring(0, 13));
        if (cmp.getValue() === '') {
            this.habilitarFiltros();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
//        console.log(e.getKey());
        if (e.getKey() === 13) {
            this.btnSearch_click();

//            this.BuscarTKT_keyDownHandler(obj, e, eOpts);
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    sendMail_clickHandler: function () {

        console.log('sendMail_clickHandler');
        
        me.dpick= win = Ext.create('Ext.window.Window', {
            title: 'Seleccionar Fecha',
            modal: true,
            width: 280,
            height: 200,
            layout: 'hbox',
//            align: 'center',
            items: [
                {
                    xtype: 'monthpicker',
                    id:prototype.id + '-monthPicker',
//                    listeners: {
////                        cancelclick: 'cancelarSeleccionFecha',
//                        monthdblclick: 'aceptarSeleccionFecha'
//                    }
                },
                {
                    xtype: 'button',
                    padding: '10px 10px 10px 10px',
                    margin: '60px 0px 0px 0px',
                    text: 'Enviar Correo',
                    handler: this.aceptarSeleccionFecha
                }
            ]
        });
        me.dpick.show();
           
    },
    aceptarSeleccionFecha: function(button) {
//        var window = button.up('window'); // Obtener la ventana que contiene el MonthPicker
//        var monthpicker = window.down('monthpicker'); // Obtener el componente MonthPicker
        var monthpicker = Ext.getCmp(prototype.id + '-monthPicker'); // Obtener el componente MonthPicker
        var selectedDate = monthpicker.getValue(); // Obtener la fecha seleccionada
//        console.log('Año xxxxxxx:', selectedDate);
        if (selectedDate) {
            var year = selectedDate[1]; // Obtener el año seleccionado
            var month = selectedDate[0] + 1; // Obtener el mes seleccionado (los meses son base 0)
            month = Ext.String.leftPad(month,2,'0');
            
            console.log('Año seleccionado:', year);
            console.log('Mes seleccionado:', month);
            
            // Luego puedes realizar las acciones que necesites con el año y el mes seleccionados
            // Por ejemplo, enviar esta información al servidor para enviar un correo electrónico
            me.enviarCorreo(year +''+ month);
        } else {
            console.error('No se ha seleccionado ninguna fecha');
        }
//        this.enviarFechaSeleccionada(fechaSeleccionada);
    },
    enviarCorreo: function (fecha) {
        me.dpick.close();
        console.log('enviarCorreo');
        console.log(fecha);
        var msj='¿Estás seguro de enviar Correo para la fecha : '+ fecha + ' ?';
        
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: msj,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
//                            this.sendEmailtoIATA(me.lstSendIata);
                    console.log(me.lstSendIata);

                    var listaCadena = [];
//                            console.log(listaCadena);

                    Ext.Ajax.request({
                        url: prototype.url + '/sendEmail',
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
                        params: {v_fecha: fecha},
                        success: function (response, options) {
                            Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                            var res = Ext.JSON.decode(response.responseText);
                            console.log(res);
                            var msj = String(res.msj);

                            global.Msg({msg: msj});

                        }
                    });
                }
            }
        });
            
    }
    
});
