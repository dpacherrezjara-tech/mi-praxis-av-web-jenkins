Ext.define('Ext.Praxis.controller.payments.SalesReconciliation.SalesReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliationController',
    stack: [],
    bean: {},
    beanDetailTkt: {},
    beanDetailTar: {},
    beanDetailMer: {},
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
    beanboxDetTktS1: {},
    beanboxDetTktS2: {},
    beanboxDetTktS3: {},
    beanboxDetTktS4: {},
    init: function(view) {
        me = this;
        prototypeProgram.view = 'payments-sales-reconciliation-form';
        prototypeProgram.nprog = 'PX00000263';
        prototypeProgram.title = 'Sales Reconciliation by Ticket';
        prototypeProgram.modulo = '';
    },
    afterRender: function() {
        this.setStoreData();
        this.initDate();
        this.obtainData();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        //        var mes = new Date().getMonth()+1;
        //        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        //        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('');
        //        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        //        var storeComboDataMonth = win.getStoreDays(true);
        //        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(storeComboDataMonth);
        //        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    cmbTranType_changeHandler: function() {
        var filtro = win.getValue('cmbFecFiltro');

        var selectedValue = win.getValue('rbgType').rbgType;
        switch (selectedValue) {
            case 'Sales':
                var cbxFecFiltroAC = new Array();
                cbxFecFiltroAC.push({name: "Sales Date", code: 'ADATE'});
                cbxFecFiltroAC.push({name: "Reconciliation Date", code: 'DATEC'});
                Ext.getCmp(prototype.id + '-cmbFecFiltro').bindStore(cbxFecFiltroAC);

                win.setValue('cmbFecFiltro', filtro);
                break;
            case 'Refund':
                var cbxFecFiltroAC = new Array();
                cbxFecFiltroAC.push({name: "Refund Date", code: 'ADATE'});
                cbxFecFiltroAC.push({name: "Reconciliation Date", code: 'DATEC'});
                Ext.getCmp(prototype.id + '-cmbFecFiltro').bindStore(cbxFecFiltroAC);

                win.setValue('cmbFecFiltro', filtro);
                break;
        }

        this.changeLabels(selectedValue);
        this.btnSearch_click();
    },
    changeLabels: function(tipo) {
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
    cbxFOPAC_changeHandler: function() {
        var FOP = win.getValue('cmbFOP');

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
    tarjeta_keyDownHandler: function(e, eOpts) {

        var txtCard1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (txtCard1.trim().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus(false, 200);
            }
        }
    },
    BuscarTKT_keyDownHandler: function(obj, e, eOpts) {
        win.enabled('cmbDateFromYear', true);
        win.enabled('cmbDateFromMonth', true);
        win.enabled('cmbDateToYear', true);
        win.enabled('cmbDateToMonth', true);
        win.enabled('cmbAFTE', true);
        win.enabled('cmbCardType', true);
        win.enabled('cmbCountry', true);
        win.enabled('cmbFOP', true);
        win.enabled('cmbSource', true);


        if (win.getValue('txtTicket') !== '') {
            switch (e.getKey()) {
                case 13:
                    if (win.getValue('txtTicket').trim().length === 13) {

                        var selectedValues = win.getValue('rbgType').rbgType;
                        switch (selectedValues) {
                            case 'Sales':
                                this.beanDetailTkt.IN_TDOC = 'S';
                                break;
                            case 'Refund':
                                this.beanDetailTkt.IN_TDOC = 'R';
                                break;
                        }
                        this.beanDetailTkt.IN_TICKET = win.getValue('txtTicket');
                        this.searchDetTICKET(this.beanDetailTkt);
                    } else {
                        win.setValue('txtTicket', '');
                        global.Msg({msg: 'Ticket number must contain 13 digits.'});
                    }
                    if (win.getValue('txtTicket').trim() !== '') {
                        win.enabled('cmbDateFromYear', false);
                        win.enabled('cmbDateFromMonth', false);
                        win.enabled('cmbDateToYear', false);
                        win.enabled('cmbDateToMonth', false);
                        win.enabled('cmbAFTE', false);
                        win.enabled('cmbCardType', false);
                        win.enabled('cmbCountry', false);
                        win.enabled('cmbFOP', false);
                        win.enabled('cmbSource', false);
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
            if (win.getValue('txtTicket').trim() === '') {
                this.habilitarFiltros();
            }
        } else if (win.getValue('txtCard1') !== '' || win.getValue('txtCard2') !== '') {
            switch (e.getKey()) {
                case 13:
                    if (win.getValue('txtCard1').trim().length === 6 && win.getValue('txtCard2').trim().length === 4) {
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
                        this.beanDetailTar.IN_CARDN1 = win.getValue('txtCard1');
                        this.beanDetailTar.IN_CARDN2 = win.getValue('txtCard2');
                        this.beanDetailTar.IN_AUTHNBR = win.getValue('txtAUTHNBR');
                        console.log(this.beanDetailTar);
                        this.searchDetTARJETA(this.beanDetailTar);
                    } else {
                        win.setValue('txtCard1', '');
                        win.setValue('txtCard2', '');
                        global.Msg({msg: 'CC Number must contain 10 digits.'});
                    }
                    if (win.getValue('txtCard1').trim() !== '' && win.getValue('txtCard2').trim() !== '') {
                        win.enabled('cmbAFTE', false);
                        win.enabled('cmbCardType', false);
                        win.enabled('cmbCountry', false);
                        win.enabled('cmbFOP', false);
                        win.enabled('cmbSource', false);
                    }
                    break;
                case 8://Backspace
                    this.habilitarFiltros2();
                    break;
                case 32: //Spacebar
                    this.habilitarFiltros2();
                    break;
                case 46: //Delete
                    this.habilitarFiltros2();
                    break;
            }
            if (win.getValue('txtCard1').trim() === '' && win.getValue('txtCard2').trim() === '') {
                this.habilitarFiltros2();
            }
        } else if (win.getValue('txtMERCHN') !== '') {
            switch (e.getKey()) {
                case 13:
                    if (win.getValue('txtMERCHN').trim().length === 20) {
                        var selectedValuem = win.getValue('rbgType').rbgType;
                        switch (selectedValuem) {
                            case 'Sales':
                                this.beanDetailMer.IN_TDOC = 'S';
                                break;
                            case 'Refund':
                                this.beanDetailMer.IN_TDOC = 'R';
                                break;
                        }
                        this.beanDetailMer.strFecFiltro = win.getValue('cmbFecFiltro');
                        this.beanDetailMer.strYearFrom = win.getValue('cmbDateFromYear');
                        this.beanDetailMer.strMonthFrom = win.getValue('cmbDateFromMonth');
                        this.beanDetailMer.strYearTo = win.getValue('cmbDateToYear');
                        this.beanDetailMer.strMonthTo = win.getValue('cmbDateToMonth');
                        this.beanDetailMer.IN_MERCHN = win.getValue('txtMERCHN');
                        console.log(this.beanDetailMer);
//                        this.searchDetMERCHAT(this.beanDetailMer);
                    } else {
                        win.setValue('txtMERCHN', '');
                        global.Msg({msg: 'Merchant number must contain 20 digits.'});
                    }
                    if (win.getValue('txtMERCHN').trim() !== '') {
                        win.enabled('cmbAFTE', false);
                        win.enabled('cmbCardType', false);
                        win.enabled('cmbCountry', false);
                        win.enabled('cmbFOP', false);
                        win.enabled('cmbSource', false);
                    }
                    break;
                case 8://Backspace
                    this.habilitarFiltros2();
                    break;
                case 32: //Spacebar
                    this.habilitarFiltros2();
                    break;
                case 46: //Delete
                    this.habilitarFiltros2();
                    break;
            }
            if (win.getValue('txtMERCHN').trim() === '') {
                this.habilitarFiltros2();
            }
        }
    },
    BuscarPNR_keyDownHandler: function(obj, e, eOpts) {
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
    searchByPNR: function() {
        var bean = {};
        bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue()
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByPNR'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2290AK");

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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetByPNR').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin11').bindStore(storeGridDatas);
    },
    //<editor-fold defaultstate="collapsed" desc="onViewClick">
    gridDetCountry_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCountry');
        this.searchDetCountry(beanDet);
        this.strSTVAL = '';
    },
    gridDetCard_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetCard');
        this.searchDetCardCode(beanDet);
        this.strSTVAL = '';
    },
    gridDetDay_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetDay');
        this.searchDetDay(beanDet);
        this.strSTVAL = '';
    },
    gridDetTicket_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        win.selectedChild('vskMain', 'boxDetTicket');
        this.searchDetTicket(beanDet);
        this.strSTVAL = '';
    },
    viewDataEntry_clickHandler: function(tableview, e, rowNum, columnNum, x, model, a, b) {
        var data = x.record.data;
        var flagWarn;
        switch (b.scope.id) {
            case prototype.id + '-gridDetTktByStval':
                flagWarn = 'Y';
                break;
            case prototype.id + '-gridDetTicket':
                flagWarn = '';
                break;
        }
        if (data.lngQOBS > 1 || flagWarn === "Y") {
            this.searchWarnTkts(data);
        } else {
            this.searchBean(data, this.peek());
        }
    },
    gridCashDetCountry_clickHandler: function(column, e, row, column, x, rowData) {
        var obj = x.record.data;
        this.searchCashCountry(obj);
    },
    gridCashDetDay_clickHandler: function(column, e, row, column, x, rowData) {
        var obj = x.record.data;
        this.searchCashDay(obj);
    },
    gridDetCountryS_clickHandler: function(column, e, row, column, x, rowData) {
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
    gridDetCountrySEr_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;

        beanDet.IN_CERROR = beanDet.CERROR;
        console.log(beanDet);
        this.searchDetCountryByStval_1(beanDet);

    },
    gridData_act1_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        this.beanProMasterTicket = {};
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
        this.beanProMasterTicket.IN_SEQ = '00';

        win.displayProMasterTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    gridDetCardS_clickHandler: function(column, e, row, column, x, rowData) {
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
    gridDetDayS_clickHandler: function(column, e, row, column, x, rowData) {
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
    gridDetTicketS_clickHandler: function(column, e, row, column, x, rowData) {
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
    btnQuery_click: function(obj, e) {
        var beanQuery = {};

        var MatchTkt = Ext.create('Ext.Praxis.view.program.ProMatchTktForm', {id: 'ProMatchTktForm'});
        var controller = MatchTkt.getController();
        controller.bean = beanQuery;
        controller.startDisplay();
        MatchTkt.show();
    },
    openQuery: function(column, e, row, column, x, rowData) {

        var beanQuery = rowData.data;
        var MatchTkt = Ext.create('Ext.Praxis.view.program.ProMatchTktForm', {id: 'ProMatchTktForm'});
        var controller = MatchTkt.getController();
        controller.bean = beanQuery;
        controller.startDisplay();
        MatchTkt.show();
    },
    eventKeyTKT: function(e, eOpts) {
        var strTkt = e.value.replace(' ', '');
        console.log(strTkt);
        if (eOpts.getKey() === 13) {
            this.viewMasterTkt(strTkt);
        }
    },
    viewMasterTkt: function(strTkt) {
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

//        win.displayProMasterTicket(this, 'DataRequestedByBank', beanProMasterTicket);



        win.displayProMasterTicket(this, 'ViewConciliation', this.beanProMasterTicket);


    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        if (win.getValue('txtTicket').trim() !== '' || win.getValue('txtMERCHN').trim() !== '' || win.getValue('txtAUTHNBR').trim() !== ''
                || win.getValue('txtCard1').trim() !== '' || win.getValue('txtCard2').trim() !== '' || win.getValue('txtPNR').trim() !== '') {
            if (win.getValue('txtTicket').trim() !== '') {
                if (win.getValue('txtTicket').trim().length === 13) {
                    var selectedValues = win.getValue('rbgType').rbgType;
                    switch (selectedValues) {
                        case 'Sales':
                            this.beanDetailTkt.IN_TDOC = 'S';
                            break;
                        case 'Refund':
                            this.beanDetailTkt.IN_TDOC = 'R';
                            break;
                    }
                    this.beanDetailTkt.IN_TICKET = win.getValue('txtTicket');
                    this.searchDetTICKET(this.beanDetailTkt);
                } else {
                    win.setValue('txtTicket', '');
                    global.Msg({msg: 'Ticket number must contain 13 digits.'});
                }
            } 
            else if (win.getValue('txtPNR').trim() !== '') {                
                if (Ext.getCmp(prototype.id + '-txtPNR').getValue().length === 6) {
                    this.searchByPNR();
                } else {
                    global.Msg({
                        msg: 'PNR must contain 6 characters.'
                    });
                }
            }
            else if (win.getValue('txtCard1').trim() !== '' || win.getValue('txtCard2').trim() !== '') {


                if (win.getValue('txtCard1').trim().length === 6 && win.getValue('txtCard2').trim().length === 4) {
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
                    this.beanDetailTar.IN_CARDN1 = win.getValue('txtCard1');
                    this.beanDetailTar.IN_CARDN2 = win.getValue('txtCard2');
                    this.beanDetailTar.IN_AUTHNBR = win.getValue('txtAUTHNBR');
                    if (win.getValue('chkADYEN')) {
                        this.beanDetailTar.IN_ADYEN = 'Y';
                    } else {
                        this.beanDetailTar.IN_ADYEN = '';
                    }
                    console.log(this.beanDetailTar);
                    this.searchDetTARJETA(this.beanDetailTar);
                } else {
                    alert("CC Number must contain 10 digits.");
                    txtCard1.text = '';
                    txtCard2.text = '';
                }





            } else if (win.getValue('txtMERCHN').trim() !== '') {
                window.alert("2");
                //	  		if(app.trim(txtMERCHN.text).length == 20){
                //				
                //				var selectedValuem:String = String(rbgType.selectedValue);
                //				switch(selectedValuem){
                //					case 'Sales':
                //						beanDetailMer.IN_TDOC = 'S';
                //						break;
                //					case 'Refund':
                //						beanDetailMer.IN_TDOC = 'R';
                //						break;
                //				}
                //				beanDetailMer.strFecFiltro = String(cmbFecFiltro.selectedItem.data);
                //				beanDetailMer.strYearFrom  = app.getYearCode2(cmbDateFromYear.selectedIndex+1);
                //				beanDetailMer.strMonthFrom = app.getMonthCode(cmbDateFromMonth.selectedIndex).replace("00", "");
                //				beanDetailMer.strYearTo    = app.getYearCode2(cmbDateToYear.selectedIndex+1);
                //				beanDetailMer.strMonthTo   = app.getMonthCode(cmbDateToMonth.selectedIndex).replace("00", "");
                //				beanDetailMer.IN_MERCHN    = txtMERCHN.text;
                //				beanDetailMer.IN_AUTHNBR   = txtAUTHNBR.text;
                //				if(String(chkADYEN.selected) == 'true'){
                //					bean.IN_ADYEN = 'Y';
                //				}else{
                //					bean.IN_ADYEN = '';
                //				}
                //				
                //				roBwrConciliation.searchDetMERCHAT(beanDetailMer);
                //				
                //			}else{
                //				Alert.show("Merchant Number must contain 20 digits.");
                //				txtMERCHN.text = '';
                //			}
                //			
            } else if (win.getValue('txtAUTHNBR').trim() !== '') {
                console.log("----->");
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
                this.beanDetailTar.IN_CARDN1 = win.getValue('txtCard1');
                this.beanDetailTar.IN_CARDN2 = win.getValue('txtCard2');
                this.beanDetailTar.IN_AUTHNBR = win.getValue('txtAUTHNBR');
                console.log(this.beanDetailTar);

                if (win.getValue('txtAUTHNBR').trim().length === 6) {
                    this.searchDetTARJETA(this.beanDetailTar);
                } else {
                    win.setValue('txtTicket', '');
                    global.Msg({msg: 'Authorization Number must contain 6 digits.'});
                }



                //	  		var selectedValueA:String = String(rbgType.selectedValue);
                //			switch(selectedValueA){
                //				case 'Sales':
                //					beanDetailAut.IN_TDOC = 'S';
                //					break;
                //				case 'Refund':
                //					beanDetailAut.IN_TDOC = 'R';
                //					break;
                //			}
                //			beanDetailAut.strFecFiltro = String(cmbFecFiltro.selectedItem.data);
                //			beanDetailAut.strYearFrom  = app.getYearCode2(cmbDateFromYear.selectedIndex+1);
                //			beanDetailAut.strMonthFrom = app.getMonthCode(cmbDateFromMonth.selectedIndex).replace("00", "");
                //			beanDetailAut.strYearTo    = app.getYearCode2(cmbDateToYear.selectedIndex+1);
                //			beanDetailAut.strMonthTo   = app.getMonthCode(cmbDateToMonth.selectedIndex).replace("00", "");
                //			beanDetailAut.IN_AUTHNBR   = txtAUTHNBR.text;
                //			if(String(chkADYEN.selected) == 'true'){
                //				bean.IN_ADYEN = 'Y';
                //			}else{
                //				bean.IN_ADYEN = '';
                //			}
                //	  		
                //	  		if(app.trim(txtAUTHNBR.text).length == 6){
                //				
                //				roBwrConciliation.searchDetTARJETA(beanDetailAut);
                //				
                //			}else{
                //				Alert.show("Authorization Number must contain 6 digits.");
                //				txtAUTHNBR.text = '';
                //			}
            }
        } else {
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
            this.bean.IN_PAYMENT = win.getValue('cmbFOP');
            this.bean.IN_CARDC = win.getValue('cmbCardType');
            this.bean.IN_TICKET = win.getValue('txtTicket').trim();
            this.bean.IN_FTE = win.getValue('cmbSource');
            this.bean.IN_AFTE = win.getValue('cmbAFTE');
            this.bean.IN_MERCHN = win.getValue('txtMERCHN').trim();
            this.bean.IN_AUTHNBR = win.getValue('txtAUTHNBR').trim();
            if (win.getValue('chkADYEN')) {
                this.bean.IN_ADYEN = 'Y';
            } else {
                this.bean.IN_ADYEN = '';
            }
            //            if(vskPrincipal.selectedChild == boxCharts){
            //                    with(boxSearchFilter){visible = false; includeInLayout = false}
            //                    imgFilter.toolTip = (boxSearchFilter.visible == true) ? 'Hidden filter' : 'Display filter';
            //                    imgSearchChart_clickHandler();
            //
            //            }else{
            if (win.getValue('cmbFOP') === 'CA') {
                this.searchCashMonth(this.bean);
            } else {
                this.search(this.bean);
            }
            //            }	
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
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
                    this.btnExcel_click();
                }
            }
        });
        //
    },
    btnExcel_click: function() {

        console.log(this.peek());
        console.log(me.f_boxDetTktS);

        switch (this.peek()) {
            case prototype.id + '-boxMainData':
                global.getFileExcelPost('search', JSON.stringify(this.bean), Ext.getCmp(prototype.id + '-gridData').config.columns.items);
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
                if (me.f_boxDetTktS === '1') {
                    global.getFileExcelPost('searchDetTICKET', JSON.stringify(me.beanboxDetTktS1), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                } else if (me.f_boxDetTktS === '2') {
                    global.getFileExcelPost('searchDetTktByStval', JSON.stringify(me.beanboxDetTktS2), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                } else if (me.f_boxDetTktS === '3') {
                    global.getFileExcelPost('searchDetTARJETA', JSON.stringify(me.beanboxDetTktS3), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                } else if (me.f_boxDetTktS === '4') {
                    global.getFileExcelPost('searchDetMERCHAT', JSON.stringify(me.beanboxDetTktS4), Ext.getCmp(prototype.id + '-gridDetTktByStval').config.columns.items);
                }
                break;
            case prototype.id + '-boxDetTktMatch':
                global.getFileExcelPost('searchDetTktByStval', JSON.stringify(me.beanboxDetTktS2), Ext.getCmp(prototype.id + '-gridDetTktMatch').config.columns.items);
                break;
            default:
                break;
        }
//        console.log('Excel');
//        me.dw_excel = true;
//        if (me.boxActual === '-boxPostBilling') {
//            console.log(Ext.getCmp(prototype.id + '-gridDataPostBilling').config.columns.items);
//            me.goURLpost('searchPostBiling', this.searchParams, Ext.getCmp(prototype.id + '-gridDataPostBilling').config.columns.items);
//        } else if (me.boxActual === '-boxStatus') {
//            console.log(Ext.getCmp(prototype.id + '-gridDataStatus').config.columns.items);
//            me.goURLpost(me._urlExcel, this.searchParams, Ext.getCmp(prototype.id + '-gridDataStatus').config.columns.items);
//        } else if (me.boxActual === '-panelDetailCommentBsplink') {
//            console.log(Ext.getCmp(prototype.id + '-gridDataDetailTCommnetBsplink').config.columns.items);
//            me.goURLpost('searchDetailComment', this.searchParams, Ext.getCmp(prototype.id + '-gridDataDetailTCommnetBsplink').config.columns.items);
//        } else if (me.boxActual === '-panelDetailTktBsplink') {
////            global.getFile(prototype.url + '/getXLSXDetailComment?beanString=' + me.paramDetail.beanString);
//            console.log(Ext.getCmp(prototype.id + '-gridDataDetailTktBsplink').config.columns.items);
//            me.goURLpost('searchDetailTktBsplink', paramDetailProcess.beanString, Ext.getCmp(prototype.id + '-gridDataDetailTktBsplink').config.columns.items);
//        } else {
//            me.dw_excel = false;
//        }
    },
    btnClear_click: function(obj, e) {
        this.initDate();

        win.setValue('cmbCountry', '');
        win.setValue('cmbFOP', 'CC');
        win.setValue('cmbCardType', '');
        win.setValue('txtTicket', '');
        win.setValue('cmbSource', '');
        win.setValue('txtPNR', '');
    },
//    btnQuery_click: function (obj, e) {
//        var beanQuery = {};
//
//        var MatchTkt = Ext.create('Ext.Praxis.view.program.ProMatchTktForm', {id: 'ProMatchTktForm'});
//        var controller = MatchTkt.getController();
//        controller.bean = beanQuery;
//        controller.startDisplay();
//        MatchTkt.show();
//    },
    btnBack_click: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            global.showMenu();
        } else {
            this.stack.pop();
            this.selectedChild('vskMain', this.peek().substr(this.peek().indexOf('-') + 1), false);
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function() {
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2, CARD: 2
                })
            },
            success: function(response, options) {
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
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2297");

                    me.selectedChild('vskMain', 'boxMainData');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
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
                            }
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetCountry">
    searchDetCountry: function(beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountry'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2290");

                    me.selectedChild('vskMain', 'boxDetCountry');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            if (obj.strFecFiltro === 'DATEC') {
                                Ext.getCmp(prototype.id + '-gridDetCountry').setTitle("Reconciliation Date : " + obj.strFormatDate);
                                if (obj.IN_TDOC === 'R') {
                                    win.setText('ahDetCtry', 'Refund Reconciliation');
                                } else {
                                    win.setText('ahDetCtry', 'Sales Reconciliation');
                                }
                            } else {
                                if (obj.IN_TDOC === 'R') {
                                    Ext.getCmp(prototype.id + '-gridDetCountry').setTitle("Refund Date : " + obj.strFormatDate);
                                    win.setText('ahDetCtry', 'Refund Reconciliation');
                                } else {
                                    Ext.getCmp(prototype.id + '-gridDetCountry').setTitle("Sales Date : " + obj.strFormatDate);
                                    win.setText('ahDetCtry', 'Sales Reconciliation');
                                }
                            }
                            //                            bxPag1.width = 1200;
                            //                            bxPag2.width = 1;
                            //                            bxPag2.visible = false;
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetCountry').setTitle('');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetCardCode">
    searchDetCardCode: function(beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCode'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2290");

                    me.selectedChild('vskMain', 'boxDetCard');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            if (obj.strFecFiltro === 'DATEC') {
                                Ext.getCmp(prototype.id + '-gridDetCard').setTitle("Reconciliation Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry);
                                if (obj.IN_TDOC === 'R') {
                                    win.setText('ahDetCard', 'Refund Reconciliation');
                                } else {
                                    win.setText('ahDetCard', 'Sales Reconciliation');
                                }
                            } else {
                                if (obj.IN_TDOC === 'R') {
                                    Ext.getCmp(prototype.id + '-gridDetCard').setTitle("Refund Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry);
                                    win.setText('ahDetCard', 'Refund Reconciliation');
                                } else {
                                    Ext.getCmp(prototype.id + '-gridDetCard').setTitle("Sales Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry);
                                    win.setText('ahDetCard', 'Sales Reconciliation');
                                }
                            }
                            //                            bxPag1.width = 1200;
                            //                            bxPag2.width = 1;
                            //                            bxPag2.visible = false;
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetCard').setTitle('');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCard').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetDay">
    searchDetDay: function(beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDay'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2290");

                    me.selectedChild('vskMain', 'boxDetDay');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            if (obj.strFecFiltro === 'DATEC') {
                                Ext.getCmp(prototype.id + '-gridDetDay').setTitle("Reconciliation Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry + " - Card : " + obj.SCARCOD + ' : ' + obj.strDescCard);
                                if (obj.IN_TDOC === 'R') {
                                    win.setText('ahDetDay', 'Refund Reconciliation');
                                } else {
                                    win.setText('ahDetDay', 'Sales Reconciliation');
                                }
                            } else {
                                if (obj.IN_TDOC === 'R') {
                                    Ext.getCmp(prototype.id + '-gridDetDay').setTitle("Refund Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry + " - Card : " + obj.SCARCOD + ' : ' + obj.strDescCard);
                                    win.setText('ahDetDay', 'Refund Reconciliation');
                                } else {
                                    Ext.getCmp(prototype.id + '-gridDetDay').setTitle("Sales Date : " + obj.strFormatDate + " - Country : " + obj.strDescCountry + " - Card : " + obj.SCARCOD + ' : ' + obj.strDescCard);
                                    win.setText('ahDetDay', 'Sales Reconciliation');
                                }
                            }
                        } else {
                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTicket">
    searchDetTicket: function(beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTicket'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A2290");

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
                            win.setText('lblTotSVFOP', '0');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCashMonth">
    searchCashMonth: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCashMonth'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCashMonth').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCashCountry">
    searchCashCountry: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCashCountry'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCashCountry').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCashDay">
    searchCashDay: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCashDay'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCashDay').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTICKET">
    searchDetTICKET: function(beanDetailTkt) {
        me.f_boxDetTktS = '1';
        me.beanboxDetTktS1 = beanDetailTkt;
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTICKET',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanboxDetTktS1)},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                win.lblUser_toolTip("Estructura: A2290");

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
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchWarnTkts">
    searchWarnTkts: function(bean) {
        Ext.Ajax.request({
            url: prototype.url + '/searchWarnTkts',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                win.lblUser_toolTip("Estructura: A2290");

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstA2290 = res.lstWarnTkt;

                    if (lstA2290 !== undefined && lstA2290.length > 0) {
                        var DataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationForm.DataEntry', {
                            id: 'DataEntrySalesReconciliationForm'
                        });
                        var controller = DataEntry.getController();
                        controller.lstA2290 = lstA2290;
                        controller.lstCards = me.lstTarjetas;
                        controller.actionCode = win.DE_ACT_VIEW;
                        DataEntry.show();
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchBean">
    searchBean: function(bean, box) {
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(box).mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(box).unmask();
                win.lblUser_toolTip("Estructura: A2290");

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanCons = res.beanCons;

                    if (beanCons !== undefined && beanCons.strTicket !== '') {
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
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(box).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetCountryByStval">
    searchDetCountryByStval: function(beanDet) {
        this.beanDet = beanDet;
        console.log(this.beanDet);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCountryS');
                    win.lblUser_toolTip("Estructura: A2290");

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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    //</editor-fold>
    searchDetCountryByStval_1: function(beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_1'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCountryS');
                    win.lblUser_toolTip("Estructura: A2290");

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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCountryS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    //<editor-fold defaultstate="collapsed" desc="searchDetCardCodeByStval">
    searchDetCardCodeByStval: function(beanDet) {
        this.beanDet2 = beanDet;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCodeByStval'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet2)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetCardS');
                    win.lblUser_toolTip("Estructura: A2290");

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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCardS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetDayByStval">
    searchDetDayByStval: function(beanDet) {
        this.beanDet3 = beanDet;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDayByStval'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet3)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetDayS');
                    win.lblUser_toolTip("Estructura: A2290");

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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetDayS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTktByStvalBK">
    searchDetTktByStvalBK: function(beanDetE) {
        me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetE;
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTktByStval',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanboxDetTktS2)},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                win.lblUser_toolTip("Estructura: A2290");

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
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTktByStval">
    searchDetTktByStval: function(beanDetE) {
        me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetE;


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktByStval'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanboxDetTktS2)};
                },
                load: function(obj, obj2, success, response, obj5) {

//                    me.selectedChild('vskMain', 'boxDetTktMatch');
                    win.lblUser_toolTip("Estructura: A2290");

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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
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
//                win.lblUser_toolTip("Estructura: A2290");
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

    searchDetTARJETA: function(beanDetailTar) {
        me.f_boxDetTktS = '3';
        me.beanboxDetTktS3 = beanDetailTar;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTARJETA'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanboxDetTktS3)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    me.selectedChild('vskMain', 'boxDetTktS');
                    win.lblUser_toolTip("Estructura: A2290");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetDaySAC = res.data;
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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
    searchDetMERCHAT: function(beanDetailMer) {
        me.f_boxDetTktS = '4';
        me.beanboxDetTktS4 = beanDetailMer;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetMERCHAT'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDetailMer)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    me.selectedChild('vskMain', 'boxDetTktS');
                    win.lblUser_toolTip("Estructura: A2290");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetDaySAC = res.data;
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
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    viewMasterTkt2: function (column, e, row, column, x, rowData) {
        
        var data = x.record.data;
        var strTkt = data.TICKET;
        
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
//        this.beanProMasterTicket.IN_SEQ = '00';

        console.log(this.beanProMasterTicket);
        win.displayProMasterTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    habilitarFiltros: function() {
        win.enabled('cmbDateFromYear', true);
        win.enabled('cmbDateFromMonth', true);
        win.enabled('cmbDateToYear', true);
        win.enabled('cmbDateToMonth', true);
        win.enabled('cmbAFTE', true);
        win.enabled('cmbCardType', true);
        win.enabled('cmbCountry', true);
        win.enabled('cmbFOP', true);
        win.enabled('cmbSource', true);
    },
    habilitarFiltros2: function() {
        win.enabled('cmbAFTE', true);
        win.enabled('cmbCardType', true);
        win.enabled('cmbCountry', true);
        win.enabled('cmbFOP', true);
        win.enabled('cmbSource', true);
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

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(padre, child, add) {
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
            console.log('selectedChild');
            console.log(padre + child + add);
            console.log(Ext.getCmp(prototype.id + '-paggin9'));
            console.log(paggin);
            console.log(pagData);

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
    getPaggin: function() {
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
            default:
                return null;
        }
    },
    peek: function() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    onValidarChange: function(cmp, value) {
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
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        console.log(e.getKey());
        if (e.getKey() === 13) {
            this.btnSearch_click();

//            this.BuscarTKT_keyDownHandler(obj, e, eOpts);
        }
    }
    // </editor-fold>
});
