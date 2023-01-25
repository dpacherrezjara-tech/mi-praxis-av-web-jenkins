/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.BankReconciliation.BankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankReconciliationController',
    fecha: new Date(),
    childs: '',
    beanTemp: {},
    beanDetDay: {},
    beanDet: {},
    beanDet2: {},
    beanDet3: {},
    beanDetCardNbr: {},
    beanDetCardByS: {},
    beanDetDayByS: {},
    beanDetCardNbrByS: {},
    beanDetTicket: {},
    beanboxDetTktS2: {},
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    flag: '',
    flagStatus: '',
    flagDrilDownByDay: '',
    lstBank: [],
    lstCard: [],
    lstCountry: [],
    me: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    init: function(view) {
        me = this;
        prototype.id = 'BankReconciliationForm';
        prototype.url = CONTEXTPATH + '/BankReconciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            // -------------------Eventos Genericos --------------------
            '#BankReconciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BankReconciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BankReconciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#BankReconciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BankReconciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BankReconciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#BankReconciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BankReconciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BankReconciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BankReconciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#BankReconciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BankReconciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BankReconciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#BankReconciliationForm-chkADYEN': {
                change: this.btnSearch_click
            },
            '#BankReconciliationForm-rbgType': {
                change: this.cmbTranType_changeHandler
            },
            '#BankReconciliationForm-imgSwap1': {
                click: this.btnImgSwap1
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    tarjeta_keyDownHandler: function(e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus();
            }
        }
    },
    buscarCard_keyDownHandler: function(e, eOpts, a, b, c) {
        if (Ext.getCmp(prototype.id + '-txtCard1').getValue() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue() !== '') {
//            console.log(eOpts.getKey());
            switch (eOpts.getKey()) {
                case 13:
                    if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6
                            && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                        this.eventKey(e, eOpts);
                    } else {
                        global.Msg({
                            msg: 'Credit Card Number must contain 10 digits.'
                        });
                        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
            }
        } else {
            global.Msg({
                msg: 'Credit Card Number must contain 10 digits.'
            });
            Ext.getCmp(prototype.id + '-txtCard1').setValue('');
            Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function() {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                ["BDATEP", "Reconciliation Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");

        var cmbFTE = Ext.getCmp(prototype.id + '-cmbFTE');
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"]
            ]
        }));
        cmbFTE.setValue("");

        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
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


                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;

                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: me.lstCard,
                    autoLoad: true
                });
                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });
    },
    //</editor-fold>
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
        me.panelActual = '-boxDetByPNR'; //boxDetByPNRpanelGridData
        global.selectedChild(me.childs, prototype.id + me.panelActual);
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
                    win.lblUser_toolTip("Estructura: A2291Y");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {

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
    btnSearch_click: function(obj, e) {
        if (win.getValue('txtPNR').trim() !== '') {
            if (Ext.getCmp(prototype.id + '-txtPNR').getValue().length === 6) {
                this.searchByPNR();
            } else {
                global.Msg({
                    msg: 'PNR must contain 6 characters.'
                });
            }
        } else {
            this.setFormatParameter();
            this.setGridData(obj, e);
        }
    },
    cmbTranType_changeHandler: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rbgType;
        switch (selectedValue) {
            case 'rbSALES':
                var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
                cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["SDATE", "Sales Date"],
                        ["BDATEP", "Reconciliation Date"]
                    ]
                }));
                cmbFecFiltro.setValue("SDATE");
                break;
            case 'rbREFUND':
                var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
                cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["SDATE", "Refund Date"],
                        ["BDATEP", "Reconciliation Date"]
                    ]
                }));
                cmbFecFiltro.setValue("SDATE");
                break;
        }
        this.btnSearch_click();
    },
    //<editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        var bean = {};

        bean.strFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
        bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
        bean.IN_AGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
        bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();

        var option = Ext.getCmp(prototype.id + '-rbgType').getValue().rbgType;
        var option2 = Ext.getCmp(prototype.id + '-chkADYEN').getValue();
        switch (option) {
            case 'rbSALES':
                bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                bean.IN_TDOC = 'R';
                break;
        }

        if (option2) {
            bean.IN_ADYEN = 'Y';
        } else {
            bean.IN_ADYEN = '';
        }


        var beanString = JSON.stringify(bean);
        searchParams = {
            beanString: beanString,
            bean: bean
        };
    },
    //</editor-fold>
    btnImgSwap1: function() {
        var panel1 = Ext.getCmp(prototype.id + '-gridData');
        var panel2 = Ext.getCmp(prototype.id + '-gridDataSwap');
        if (panel1.isVisible()) {
            panel1.setVisible(false);
            panel2.setVisible(true);
        } else {
            panel1.setVisible(true);
            panel2.setVisible(false);
        }
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A2291");
//        me.setWidthPie();
        if (me.panelActual !== '-panelGridData') {
            me.panelActual = '-panelGridData';
            Ext.getCmp(prototype.id + '-gridData').setVisible(true);
            Ext.getCmp(prototype.id + '-gridDataSwap').setVisible(false);
        }
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var obj = obj.data.items[0].data;
                            var headerColumn = Ext.getCmp(prototype.id + '-columnName01');
                            var headerColumnSwap = Ext.getCmp(prototype.id + '-columnName01Swap');
                            if (obj.strFecFiltro === 'BDATEP') {
                                headerColumn.setText("Reconciliation");
                                headerColumnSwap.setText("Reconciliation");
                            } else {
                                if (obj.IN_TDOC === 'R') {
                                    headerColumn.setText("Refund");
//                                    headerColumn.setText("Refund<br>Date");
                                    headerColumnSwap.setText("Refund");
                                } else {
                                    headerColumn.setText("Sales");
//                                    headerColumn.setText("Sales<br>Date");
                                    headerColumnSwap.setText("Sales");
                                }
                            }
                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataSwap').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="onGridDetCard">
    onGridDetCard: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDay';
        me.flagDrilDownByDay = 'Date';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_PAYMENT = rowData.data.IN_PAYMENT;
        this.beanDetDay.IN_BANK = rowData.data.IN_BANK;
        this.beanDetDay.SCARCOD = rowData.data.SCARCOD;
        this.beanDetDay.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetDay.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetDay.SORIG = rowData.data.SORIG;
        this.beanDetDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetDay.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetDay.IN_FTE = rowData.data.IN_FTE;
        this.beanDetDay.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDay.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetDay.strSORIG = rowData.data.strSORIG;
        this.beanDetDay.strDescCard = rowData.data.strDescCard;
        this.beanDetDay.IN_AGENT = rowData.data.IN_AGENT;


        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataDetCard();

    },
    setGridDataDetCard: function(data) {
        win.lblUser_toolTip("Estructura: A2291");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDay'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        var titulo1 = '';
                        if (me.flagDrilDownByDay !== 'Date') {
                            titulo1 = " - Card : " + bean.SCARCOD + ' : ' + bean.strDescCard;
                        }
                        if (bean.strFecFiltro === 'BDATEP') {
                            title = " Reconciliation Date : " + bean.strFormatDate + titulo1;
                        } else {
                            if (bean.IN_TDOC === 'R') {
                                title = " Refund Date : " + bean.strFormatDate + titulo1;
                            } else {
                                title = " Sales Date : " + bean.strFormatDate + titulo1;

                            }
                        }
//                        Ext.getCmp(prototype.id + '-labelTitle1').setText(title);
                        Ext.getCmp(prototype.id + '-gridDataDetDay').setTitle('<center style="font-size:12px;">' + title + '</center>');
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="onGridDetCardS">
    onGridDetCardS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 1:
                rowData.data.IN_STVAL = '1';
                rowData.data.IN_BSTVAL = '';
                cant = rowData.data.lngQMATCH;
                break;
            case 2:
                rowData.data.IN_STVAL = '5';
                rowData.data.IN_BSTVAL = '';
                cant = rowData.data.lngQMANUAL;
                break;
            case 3:
                rowData.data.IN_STVAL = '4';
                rowData.data.IN_BSTVAL = '';
                cant = rowData.data.lngQDIFF;
                break;
            case 4:
                rowData.data.IN_STVAL = '2';
                rowData.data.IN_BSTVAL = '';
                cant = rowData.data.lngQTEF;
                break;
            case 5:
                rowData.data.IN_STVAL = '3';
                rowData.data.IN_BSTVAL = '';
                cant = rowData.data.lngQPAS48;
                break;
                //-----------------------------
            case 7:
                rowData.data.IN_STVAL = '';
                rowData.data.IN_BSTVAL = '1';
                cant = rowData.data.lngQACEP;
                break;
            case 8:
                rowData.data.IN_STVAL = '';
                rowData.data.IN_BSTVAL = '2';
                cant = rowData.data.lngQRECH;
                break;

            case 9:
                rowData.data.IN_STVAL = '';
                rowData.data.IN_BSTVAL = '3';
                cant = rowData.data.lngQSOSP;
                break;
            case 11:
                rowData.data.IN_STVAL = '';
                rowData.data.IN_BSTVAL = 'P';
                cant = rowData.data.lngQTOTWS;
                break;
            case 12:
                rowData.data.IN_STVAL = '';
                rowData.data.IN_BSTVAL = 'C';
                cant = rowData.data.lngQCLAR;
                break;
            case 13:
                rowData.data.IN_STVAL = '';
                rowData.data.IN_BSTVAL = 'H';
                cant = rowData.data.lngQCHRG;
                break;

        }

//        console.log(columnNum)
//        console.log(cant)
//        console.log("Row data")
//        console.log(rowData.data)

        if (cant > 0) {
            me.drillDown.push(me.panelActual);


            if (columnNum == 2 || columnNum == 3) {
                me.panelActual = '-boxDetCountryS';
            } else {
                me.panelActual = '-panelGridDetCardByS';
            }

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetCardByS.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetCardByS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetCardByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetCardByS.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetCardByS.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetCardByS.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetCardByS.IN_BSTVAL = rowData.data.IN_BSTVAL;
            this.beanDetCardByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetCardByS.SCURRENCY = rowData.data.SCURRENCY;
            this.beanDetCardByS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetCardByS.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetCardByS.IN_BANK = rowData.data.IN_BANK;
            this.beanDetCardByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetCardByS.IN_FTE = rowData.data.IN_FTE;
            this.beanDetCardByS.IN_ADYEN = rowData.data.IN_ADYEN;
            this.beanDetCardByS.strFormatDate = rowData.data.strFormatDate;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetCardByS);

            if (columnNum == 2 || columnNum == 3) {
                this.setGridDataDetCountryS();
            } else {
                this.setGridDataDetCardS();
            }

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    openQuery: function(column, e, row, column, x, rowData) {

        var beanQuery = rowData.data;
        var BankReconciliation = Ext.create('Ext.Praxis.view.program.ProBankReconciliationTktForm', {id: 'ProBankReconciliationTktForm'});
        var controller = BankReconciliation.getController();
        controller.bean = beanQuery;
        controller.startDisplay();
        BankReconciliation.show();
    },
    setGridDataDetCardS: function(data) {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCodeByStval'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
                        Ext.getCmp(prototype.id + '-gridDataDetCardByS').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetCardByS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    setGridDataDetCountryS: function(data) {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    var pag = Ext.getCmp(prototype.id + '-paggin10');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
                        Ext.getCmp(prototype.id + '-gridDetCountryS').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);

                        var cbxDetErrorAC = res.lstDetError;
                        console.log(cbxDetErrorAC);
                        Ext.getCmp(prototype.id + '-gridDetCSE').bindStore(
                                Ext.create("Ext.Praxis.store.interline.GridData", {data: cbxDetErrorAC})
                                );
                        if (cbxDetErrorAC.length > 0) {
                            var objER = {};
                            for (var q = 0; q < cbxDetErrorAC.length; q++) {
                                objER = cbxDetErrorAC[q];
                            }
                            if (objER.IN_STVAL === '4' || objER.IN_STVAL === '5') {
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
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetCountryS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
    gridDetCountrySEr_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        /*me.drillDown.push(me.panelActual);
         me.panelActual = '-boxDetCountryS';
         global.selectedChild(me.childs, prototype.id + me.panelActual);*/

        beanDet.IN_CERROR = beanDet.CERROR;
//        console.log(beanDet);
        this.searchDetCountryByStval_1(beanDet);

    },
    searchDetCountryByStval_1: function(beanDet) {
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCountryByStval_1'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    //global.selectedChild(me.childs, '-boxDetCountryS');
                    win.lblUser_toolTip("Estructura: A2291");

                    var pag = Ext.getCmp(prototype.id + '-paggin10');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

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
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
    gridDetCardS_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        //win.selectedChild('vskMain', 'boxDetCardS');

//        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
            console.log("this.searchDetCardCodeByStval_Pay(beanDet)");
            //            this.searchDetCardCodeByStval_Pay(beanDet);
        } else {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetCardS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.searchDetCardCodeByStvalWithErrorsList(beanDet);
        }
    },
    searchDetCardCodeByStvalWithErrorsList: function(beanDet) {
        this.beanDet2 = beanDet;
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCodeByStvalWithErrorsList'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet2)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A2291");

                    var pag = Ext.getCmp(prototype.id + '-paggin11');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

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
                            if (objER.IN_STVAL === '4' || objER.IN_STVAL === '5') {
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
        Ext.getCmp(prototype.id + '-paggin11').bindStore(storeGridDatas);
    },
    gridDetDayS_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDet = x.record.data;
        //win.selectedChild('vskMain', 'boxDetDayS');

//        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
//            console.log("this.searchDetDayByStval_Pay(beanDet)");
            //            this.searchDetDayByStval_Pay(beanDet);
        } else {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetDayS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.searchDetDayByStvalWithErrorsList(beanDet);
        }
    },
    searchDetDayByStvalWithErrorsList: function(beanDet) {
        this.beanDet3 = beanDet;
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDayByStvalWithErrorsList'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet3)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    //me.selectedChild('vskMain', 'boxDetDayS');
                    win.lblUser_toolTip("Estructura: A2291");
                    var pag = Ext.getCmp(prototype.id + '-paggin12');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

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
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="onGridDetCardNbr">
    onGridDetCardNbr: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        switch (columnNum) {
            case 0:
                rowData.data.IN_STVAL = '';
                break;
            case 3:
                rowData.data.IN_STVAL = '2';
                break;
            case 4:
                rowData.data.IN_STVAL = '3';
                break;
        }

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetCardNbr';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetCardNbr.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetCardNbr.SDATE = rowData.data.SDATE;
        this.beanDetCardNbr.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetCardNbr.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetCardNbr.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetCardNbr.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetCardNbr.SCARCOD = rowData.data.SCARCOD;
        this.beanDetCardNbr.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetCardNbr.SORIG = rowData.data.SORIG;
        this.beanDetCardNbr.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetCardNbr.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetCardNbr.IN_BANK = rowData.data.IN_BANK;
        this.beanDetCardNbr.IN_FTE = rowData.data.IN_FTE;
        this.beanDetCardNbr.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanDetCardNbr.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetCardNbr.strFormatDate = rowData.data.strFormatDate;
        this.beanDetCardNbr.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetCardNbr.IN_PAYMENT = rowData.data.IN_PAYMENT;
        this.beanDetCardNbr.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetCardNbr.strDescCard = rowData.data.strDescCard;
        this.beanDetCardNbr.strDescCountry = rowData.data.strDescCountry;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetCardNbr);
        this.setGridDataDetCardNbr();

    },
    setGridDataDetCardNbr: function(data) {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardNumber'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin4');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        var titulo1 = '';
                        if (me.flagDrilDownByDay !== 'Date') {
                            titulo1 = " - Card : " + bean.SCARCOD + ' : ' + bean.strDescCard;
                        }
                        if (bean.strFecFiltro === 'BDATEP') {
                            title = " Conciliation Date : " + bean.SDATE + titulo1;
                        } else {
                            if (bean.IN_TDOC === 'R') {
                                title = " Refund Date : " + bean.SDATE + titulo1;
                            } else {
                                title = " Sales Date : " + bean.SDATE + titulo1;

                            }
                        }
                        Ext.getCmp(prototype.id + '-gridDataDetCardNbr').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle3').setText(title);

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetCardNbr').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="onGridDetDayByS">
    onGridDetDayByS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetDayByS.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDayByS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDayByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDayByS.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetDayByS.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetDayByS.SCARCOD = rowData.data.SCARCOD;
        this.beanDetDayByS.IN_BSTVAL = rowData.data.IN_BSTVAL;
        this.beanDetDayByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetDayByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetDayByS.SORIG = rowData.data.SORIG;
        this.beanDetDayByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetDayByS.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetDayByS.IN_BANK = rowData.data.IN_BANK;
        this.beanDetDayByS.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetDayByS.IN_FTE = rowData.data.IN_FTE;
        this.beanDetDayByS.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanDetDayByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDayByS.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetDayByS.strDescCard = rowData.data.strDescCard;
        this.beanDetDayByS.strSORIG = rowData.data.strSORIG;
        this.beanDetDayByS.strDescCountry = rowData.data.strDescCountry;
        this.beanDetDayByS.strTitulo = rowData.data.strTitulo;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDayByS);
        this.setGridDataDetDayByS();

    },
    setGridDataDetDayByS: function(data) {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDayByStval'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin5');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
//                        Ext.getCmp(prototype.id + '-labelTitle4').setText(title);
//                        Ext.getCmp(prototype.id + '-gridDataDetDayByS').setTitle('<center style="font-size:12px;">' + title + '</center>');
                        Ext.getCmp(prototype.id + 'lblTitulo').setText(title);
                        console.log(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetDayByS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="onGridDetCardNbrByS">
    onGridDetCardNbrByS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetCardNbrByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetCardNbrByS.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetCardNbrByS.SDATE = rowData.data.SDATE;
        this.beanDetCardNbrByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetCardNbrByS.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetCardNbrByS.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetCardNbrByS.SCARCOD = rowData.data.SCARCOD;
        this.beanDetCardNbrByS.IN_BSTVAL = rowData.data.IN_BSTVAL;
        this.beanDetCardNbrByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetCardNbrByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetCardNbrByS.SORIG = rowData.data.SORIG;
        this.beanDetCardNbrByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetCardNbrByS.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetCardNbrByS.IN_BANK = rowData.data.IN_BANK;
        this.beanDetCardNbrByS.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetCardNbrByS.IN_FTE = rowData.data.IN_FTE;
        this.beanDetCardNbrByS.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanDetCardNbrByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDetCardNbrByS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetCardNbrByS.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetCardNbrByS.strDescCard = rowData.data.strDescCard;
        this.beanDetCardNbrByS.strDescCountry = rowData.data.strDescCountry;
//        console.log(this.beanDetCardNbrByS.IN_STVAL);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetCardNbrByS);
        this.setGridDataDetCardNbrByS();

    },
    setGridDataDetCardNbrByS: function(data) {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardNbrByStval'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin6');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
//                        Ext.getCmp(prototype.id + '-labelTitle5').setText(title);
                        Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').setTitle('<center style="font-size:12px;">' + title + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    //</editor-fold>
    onGridDetTicket: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.lngQTYDOC > 0) {
            if (rowData.data.IN_STVAL !== '' || rowData.data.IN_BSTVAL) {
                me.flagStatus = 'S';
            } else {
                me.flagStatus = '';
            }
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetTicket';
            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetTicket.FCONC = rowData.data.FCONC;
            this.beanDetTicket.SDATE = rowData.data.SDATE;
            this.beanDetTicket.SCOUNTRY = rowData.data.SCOUNTRY;
            this.beanDetTicket.TDOC = rowData.data.TDOC;
            this.beanDetTicket.CODEBANK = rowData.data.CODEBANK;
            this.beanDetTicket.SCARCOD = rowData.data.SCARCOD;
            this.beanDetTicket.SCARDN = rowData.data.SCARDN;
            this.beanDetTicket.SAUTHOC = rowData.data.SAUTHOC;
            this.beanDetTicket.SVFOP = rowData.data.SVFOP;
            this.beanDetTicket.SEQNUM = rowData.data.SEQNUM;
            this.beanDetTicket.NUMREF = rowData.data.NUMREF;
            this.beanDetTicket.strDescCard = rowData.data.strDescCard;
            this.beanDetTicket.strFormatDate = rowData.data.strFormatDate;
            this.beanDetTicket.strDescCountry = rowData.data.strDescCountry;
            this.beanDetTicket.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetTicket.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetTicket.IN_PAYMENT = rowData.data.IN_PAYMENT;
            this.beanDetTicket.IN_CARDN = rowData.data.IN_CARDN;
            this.beanDetTicket.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetTicket.strTitulo = rowData.data.strTitulo;
            this.beanDetTicket.FTE = rowData.data.FTE;
            this.beanDetTicket.BAID = rowData.data.BAID;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetTicket);
            this.setGridDataDetTicket();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDetTicket: function(data) {
        win.lblUser_toolTip("Estructura: A2290");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTicket'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin7');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
//                        console.log(obj.data);
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        console.log(obj.data);
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo + ' - CC Nbr: ' + bean.ACARDN;
                        Ext.getCmp(prototype.id + '-gridDataDetTicket').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    onGridDetA1531: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetA1531';
//        console.log(me.panelActual);
        if (rowData.data.TDOC === 'R') {
            Ext.getCmp(prototype.id + '-txtAgent').setValue('86997470');
        } else {
            Ext.getCmp(prototype.id + '-txtAgent').setValue('86975394');
        }
        Ext.getCmp(prototype.id + '-txtSaleDate').setValue(rowData.data.SDATE);

        this.beanTemp.strFecFiltro = rowData.data.strFecFiltro;
        this.beanTemp.SDATE = rowData.data.SDATE;
        this.beanTemp.IN_TDOC = rowData.data.IN_TDOC;
        this.beanTemp.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanTemp.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanTemp.SCARCOD = rowData.data.SCARCOD;
        this.beanTemp.IN_BSTVAL = rowData.data.IN_BSTVAL;
        this.beanTemp.IN_STVAL = rowData.data.IN_STVAL;
        this.beanTemp.SCURRENCY = rowData.data.SCURRENCY;
        this.beanTemp.SORIG = rowData.data.SORIG;
        this.beanTemp.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanTemp.IN_AGENT = rowData.data.IN_AGENT;
        this.beanTemp.IN_BANK = rowData.data.IN_BANK;
        this.beanTemp.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanTemp.IN_FTE = rowData.data.IN_FTE;
        this.beanTemp.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanTemp.strFormatDate = rowData.data.strFormatDate;
        this.beanTemp.IN_SDATE = rowData.data.IN_SDATE;
        this.beanTemp.IN_CARDC = rowData.data.IN_CARDC;
        this.beanTemp.strDescCard = rowData.data.strDescCard;
        this.beanTemp.strDescCountry = rowData.data.strDescCountry;


//        this.beanTemp.IN_SDATE1531 = Ext.getCmp(prototype.id + '-txtSaleDate').getValue();
        this.beanTemp.IN_SDATE1531 = rowData.data.SDATE;
        this.beanTemp.IN_AGENTA1531 = Ext.getCmp(prototype.id + '-txtAgent').getValue();

//        console.log(this.beanTemp);
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(this.beanTemp);
//        BuscarAgenteA1531();
        this.setGridDataDetA1531TKT();
        this.setGridDataDetA1531Excel();

    },
    setGridDataDetA1531TKT: function(data) {
        win.lblUser_toolTip("Estructura: A2290");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetA1531TKT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin8');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
//                        console.log(obj.data);
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        console.log(obj.data);
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
//                        console.log(title);
//                        Ext.getCmp(prototype.id + '-gridDataDetA151TKT').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
//                        Ext.getCmp(prototype.id + 'lblTituloDetA1531').setText(title);
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetA1531TKT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
    },
    setGridDataDetA1531Excel: function(data) {
        win.lblUser_toolTip("Estructura: A2290");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetA1531Excel'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin8');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
//                        console.log(obj.data);
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        console.log(obj.data);
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
//                        Ext.getCmp(prototype.id + '-gridDataDetA1531Excel').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetA1531Excel').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
    },
//    setGridDataDetA1531: function(beanTemp) {
//        me.setWidthPie();
//        Ext.Ajax.request({
//            url: prototype.url + '/searchDetA1531Excel',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(this.beanTemp)},
//            beforerequest: Ext.getBody().mask('Loading...'),
//            success: function(response, opts) {
//                Ext.getBody().unmask();
//                win.lblUser_toolTip("Estructura: A1531");
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    var gridDataAC = res.listaData;
//                    var store1 = Ext.create('Ext.data.Store', {data: gridDataAC, autoLoad: true});
//                    Ext.getCmp(prototype.id + '-gridDataDetA151TKT').bindStore(store1);
//
//                    var gridData2AC = res.listaData2;
//                    var store2 = Ext.create('Ext.data.Store', {data: gridData2AC, autoLoad: true});
//                    Ext.getCmp(prototype.id + '-gridDataDetA1531Excel').bindStore(store2);
//
//                } else
//                    global.Msg({msg: res.sesion});
//                global.clear();
//            },
//            failure: function(response, opts) {
//                Ext.getBody().unmask();
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });
//    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        beanProMasterTicket.IN_SEQ = '00';

//        console.log(beanProMasterTicket);
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        win.displayProMasterTicket(this, 'BankConciliation', beanProMasterTicket);
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
//        console.log(rec.data.STVAL);
        if (rec.data.IN_ADYEN === 'Y' && (rec.data.IN_STVAL === '2' || rec.data.IN_STVAL === '3')) {
            this.searchBeanAdyen(rec);
        } else {
            this.searchBean(rec);
//            if (rec.data.STVAL !== '1' && rec.data.STVAL !== '4') {
//                console.log('if');
//                this.winDataEntry('U', rec);
//            }
//            else {
//                this.winDataEntry('S', rec);
//                console.log('else');
//            }
        }
    },
    searchBean: function(rec) {
//        console.log(rec);
//        console.log(rec.data);
//      var paramDetail = {};
//        paramDetail.beanString = JSON.stringify(rec);
//        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(rec.data)},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
//                console.log(response);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//                if (res.success) {
                if (res.success) {
                    var beanCons = res.result;
//                    console.log(beanCons.STVAL);
                    if (beanCons !== null && beanCons.SCARDN !== '') {
                        if (beanCons.STVAL !== '1' && beanCons.STVAL !== '5') {
                            me.winDataEntry('U', beanCons);
                        }
                        else {
                            me.winDataEntry('S', beanCons);
                        }
                    } else {
                        global.Msg(
                                {msg: 'An error has ocurred. Please contact our System Department'
                                });
                    }

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    winDataEntry: function(action, beanCons) {
        action = action === null || action === undefined ? 'U' : action;

        Ext.create('Ext.Praxis.view.payments.BankReconciliationForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                lstCountry: me.lstCountry,
                lstCard: me.lstCard,
                lstBank: me.lstBank,
                beanCons: beanCons
            }
        }).show();
    },
    searchBeanAdyen: function(rec) {
//        console.log(rec);
//        console.log(rec.data);
//      var paramDetail = {};
//        paramDetail.beanString = JSON.stringify(rec);
//        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAdyen',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(rec.data)},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
//                console.log(response);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
//                if (res.success) {
                if (res.length !== 0) {
                    var lstBeanAdyen = res;
                    me.winDataEntryAdyen(lstBeanAdyen, rec);
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    winDataEntryAdyen: function(lstA2290, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;


        Ext.create('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryAdyen', {
            id: prototype.id + '-dataEntry',
            params: {
//                action: action,
                rec: rec,
//                lstCountry: me.lstCountry,
//                lstCard: me.lstCard,
//                lstBank: me.lstBank
                lstA2290: lstA2290
            }
        }).show();
    },
    validateFields: function() {
        var msj = '';
        return msj;
    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            if (me.panelActual !== '-panelGridData') {
                me.setWidthPie();
            }
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    onViewDet: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (rowData.data.SCARCOD !== 'AX' || rowData.data.SCOUNTRY !== 'MX') {
            return;
        }

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDet';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        if (rowData.data.SAGENT !== '') {

            this.beanDet.IN_SDATE = rowData.data.SDATE;
            this.beanDet.IN_EPAAMEDATA = rowData.data.SCARDN;
            this.beanDet.IN_MERCHN = rowData.data.MERCHN;

            this.beanDet.FTE_PREV = rowData.data.FTE;
            this.beanDet.SCARCOD_PREV = rowData.data.SCARCOD;
            this.beanDet.SCARDN_PREV = rowData.data.SCARDN;
            this.beanDet.SEQNUM_PREV = rowData.data.SEQNUM;
            this.beanDet.SORIG_PREV = rowData.data.strSORIG;
            this.beanDet.MERCHN_PREV = rowData.data.MERCHN;
            this.beanDet.SAUTHOC_PREV = rowData.data.SAUTHOC;
            this.beanDet.SCURRENCY_PREV = rowData.data.SCURRENCY;
            this.beanDet.SVFOP_PREV = rowData.data.SVFOP;


            /*this.beanDet.SCARCOD = rowData.data.SCARCOD;
             this.beanDet.strDescCard = rowData.data.strDescCard;
             this.beanDet.strFecFiltro = rowData.data.strFecFiltro;
             this.beanDet.IN_TDOC = rowData.data.IN_TDOC;*/
            this.beanDet.strTitulo = rowData.data.strTitulo;

//            console.log('data')
//            console.log(rowData.data);

            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
            this.setGridDataDet();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDet: function() {
        win.lblUser_toolTip("Estructura: A2309B");


        Ext.Ajax.request({
            url: prototype.url + '/searchDet',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: me.paramsDetail},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });

                if (res.settl1.length > 1) {
                    var storeSettlData1 = Ext.create('Ext.data.Store', {
                        data: res.settl1,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-gridDataPrevSettlement').bindStore(storeSettlData1);
                } else {
                    Ext.getCmp(prototype.id + '-gridDataPrevSettlement').setVisible(false);
                    Ext.getCmp(prototype.id + '-tbspacerSettlement').setVisible(false);
                }

                Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeData);
            }
        })



        /*var msj = this.validateFields();
         if (msj !== '') {
         global.Msg({msg: msj
         });
         } else {
         var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
         proxy: {
         url: prototype.url + '/searchDet'
         }, listeners: {
         beforeload: function(obj) {
         obj.proxy.extraParams = me.paramsDetail;
         },
         load: function(obj) {
         
         if (obj.data.length === 0) {
         global.Msg({
         msg: 'Data not found.'
         });
         } else {
         var bean = obj.data.items[0].data;
         
         Ext.getCmp(prototype.id + '-gridDataDet').setTitle('<center style="font-size:12px;">' + bean.strTitulo + '</center>');
         
         //var lstSett1 = obj.settl1;
         var settl1 = new Array();
         console.log("beanSettl1")
         var beanSettl1 = obj.data.items[1].data;
         console.log(obj);
         //settl1.push([beanSettl1.FTE_PREV, beanSettl1.SCARCOD_PREV]);
         var storeSett1 = Ext.create('Ext.data.ArrayStore', {
         storeId: 'settl1', autoLoad: true, data: beanSettl1
         });
         Ext.getCmp(prototype.id + '-gridDataPrevSettlement').bindStore(storeSett1);
         
         //console.log(data);
         
         //var tit = Ext.getCmp(prototype.id + '-gridDataDet');
         //tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + '  - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '   - Status : ' + data.strDescStatus + '</center>');
         }
         //me.setWidthPie();
         }
         }
         });
         
         global.clear();
         console.log(storeGridDatas);
         Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeGridDatas);
         //Ext.getCmp(prototype.id + '-gridDataPrevSettlement').bindStore(storeGridDatas);
         //Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
         } */
    },
    onGridDetByBatch: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetByBatch';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        if (rowData.data.SAGENT !== '') {

            this.beanDet.IN_EPAAMEDATA = rowData.data.SCARDN;
            this.beanDet.IN_PRDA = rowData.data.PRDA;
            this.beanDet.IN_SETTLD = rowData.data.SETTLD;
            this.beanDet.IN_NBATCH = rowData.data.NBATCH;

            /*this.beanDet.SCARCOD = rowData.data.SCARCOD;
             this.beanDet.strDescCard = rowData.data.strDescCard;
             this.beanDet.strFecFiltro = rowData.data.strFecFiltro;
             this.beanDet.IN_TDOC = rowData.data.IN_TDOC;*/
            this.beanDet.strTitulo = rowData.data.strTitulo;

//            console.log('data')
//            console.log(rowData.data);

            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
            this.setGridDataDetByBatch();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDetByBatch: function() {
        win.lblUser_toolTip("Estructura: A2309B");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetByBatch'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
                        /*var pag = Ext.getCmp(prototype.id + '-paggin9');
                         var pagData = pag.getPageData();
                         Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                         Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                         Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));*/
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-gridDataDetByBatch').setTitle('<center style="font-size:12px;">' + bean.strTitulo + '</center>');
                            //console.log(data);

                            //var tit = Ext.getCmp(prototype.id + '-gridDataDetByBatch');
                            //tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + '  - Card Number : ' + data.SCARDN + ' ' + data.MERCHNAM + '   - Status : ' + data.strDescStatus + '</center>');
                        }
                        //me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetByBatch').bindStore(storeGridDatas);
            //Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
        }
    },
    gridDetTicketS_clickHandler: function(column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;

        beanDetE.IN_SDATE = beanDetE.SDATE;

        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
            console.log("win.selectedChild('vskMain', 'boxDetTktS_P');");
            console.log("this.searchDetTktByStval_Pay(beanDetE);");
            //            win.selectedChild('vskMain', 'boxDetTktS_P');
            //            this.searchDetTktByStval_Pay(beanDetE);
        } else {
            if (beanDetE.CERROR !== "") {
                beanDetE.IN_CERROR = beanDetE.CERROR;
            } else {
                beanDetE.IN_CERROR = "";
            }
            //win.selectedChild('vskMain', 'boxDetTicket');
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTktS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.searchDetTktByStval(beanDetE);
        }
    },
    searchDetTktByStval: function(beanDetE) {
        //me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetE;
        me.setWidthPie();
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
                    win.lblUser_toolTip("Estructura: A2291");

                    var res = Ext.JSON.decode(response._response.responseText);


                    if (res.success) {
                        var gridDetTktSAC = res.data;
                        if (gridDetTktSAC.length > 0) {
                            var obj = {};
                            for (var l = 0; l < gridDetTktSAC.length; l++) {
                                obj = gridDetTktSAC[l];
                                if (obj.IN_STVAL === "5") {
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
                                    //me.selectedChild('boxDetTicket', 'boxDetTktMatch');
                                    Ext.getCmp(prototype.id + '-cmbError').hide();
                                } else {
                                    //                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(
                                    //                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
                                    //                                        );
//                                   Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
//                                   Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);

                                    var pag = Ext.getCmp(prototype.id + '-paggin13');
                                    var pagData = pag.getPageData();
                                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                                    Ext.getCmp(prototype.id + '-cmbError').show();
                                    //me.selectedChild('panelMain', 'boxDetTktS');
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
        //Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
    showTicket: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.NUMREF.substr(0, 3) === '139') {
            console.log('RowData');
            console.log(rowData.data);
            me.viewMasterTkt(rowData.data);
        }
    },
    viewMasterTkt: function(data) {

        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.NUMREF.substr(0, 3);
        beanProMasterTicket.IN_FORMA = data.NUMREF.substr(3, 4);
        beanProMasterTicket.IN_SERIE = data.NUMREF.substr(7, 6);
        console.log(beanProMasterTicket);
        //beanProMasterTicket.IN_SEQ = data.SEQRO;

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    btnClear_click: function(obj, e) {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-cmbFTE').setValue('');
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
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
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                if (Ext.getCmp(prototype.id + '-gridData').isVisible()) {
                    global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                } else {
                    global.getFile(prototype.url + '/getXLSXSwap?beanString=' + searchParams.beanString);
                }
                break;
            case '-panelGridDetDay':
                global.getFile(prototype.url + '/getXLSXDetDay?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetCardByS':
                global.getFile(prototype.url + '/getXLSXDetCardByS?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetCardNbr':
                global.getFile(prototype.url + '/getXLSXDetCardNbr?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetDayByS':
                global.getFile(prototype.url + '/getXLSXDetDayByS?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetCardNbrByS':
                global.getFile(prototype.url + '/getXLSXDetCardNbrByS?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetTicket':
                global.getFile(prototype.url + '/getXLSXDetTicket?beanString=' + me.paramsDetail.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
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
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        console.log(ancho);
        if (ancho > 650) {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(650);
        }
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDetDay':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDetCardByS':
                me.pagginActual = '-paggin3';
                break;
            case '-panelGridDetCardNbr':
                me.pagginActual = '-paggin4';
                break;
            case '-panelGridDetDayByS':
                me.pagginActual = '-paggin5';
                break;
            case '-panelGridDetCardNbrByS':
                me.pagginActual = '-paggin6';
                break;
            case '-panelGridDetTicket':
                me.pagginActual = '-paggin7';
                break;
            case '-panelGridDetA1531':
                me.pagginActual = '-paggin8';
                break;
            case '-panelGridDet':
                me.pagginActual = '-paggin9';
                break;
            case '-boxDetCountryS':
                me.pagginActual = '-paggin10';
                break;
            case '-boxDetCardS':
                me.pagginActual = '-paggin11';
                break;
            case '-boxDetDayS':
                me.pagginActual = '-paggin12';
                break;
            case '-boxDetTktS':
                me.pagginActual = '-paggin13';
                break;
        }
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
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    }


});
