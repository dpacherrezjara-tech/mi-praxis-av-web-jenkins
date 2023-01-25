Ext.define('Ext.Praxis.controller.interline.PaxRejections.PaxRejectionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PaxRejectionsController',
    me: '',
    dataObtain: {},
    childs: '',
    stack: [],
    bean: {},
    bean21: {},
    paramsTDOC: {},
    paramsTkt: {},
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'PaxRejectionsForm';
        prototype.url = CONTEXTPATH + '/PaxRejections';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
        this.obtainData();
    },
    afterRender: function() {
        this.initDate();
        this.setValue('cmbAerolinea', '');
        this.setValue('cmbSourceCode', '');
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function() {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(mes);
    },
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
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function() {
        this.dataObtain.SOURCE = 2;
        this.dataObtain.AIRLINE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbSourceCode').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstSOURCE, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstAIRLINE, autoLoad: true})
                            );
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    //</editor-fold>
    imgByTdoc_clickHandler: function(column, e, row, column, x, rowData) {
        this.paramsTDOC = x.record.data;
        this.searchByTDOC(this.paramsTDOC);
    },
    imgByRank_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.searchByRank(data);
    },
    imgByTkt_clickHandler: function(column, e, row, column, x, rowData) {
        this.paramsTkt = x.record.data;
        if (column === 7) {
            this.paramsTkt.IN_FCLAS = 'S';
        } else {
            this.paramsTkt.IN_FCLAS = '';
        }
        console.log(this.paramsTkt.IN_FCLAS);
        this.searchByTkt(this.paramsTkt);
    },
    imgByINVOICE_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.searchByInvoice(data);
    },
    viewProrate: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var nroprt = data.NROPRT;

        /*
         this.post_to_url(CONTEXTPATH + '/Home?'
         + 'strMod=BillingMonth&'
         + 'nroprt=' + nroprt
         + '#program-prorrateo-form', {}, 'post', 'ProrrateoForm');
         */

        prototypeProgram.view = 'interline-pax-rejections-form';
        prototypeProgram.nprog = 'PX00000199';
        prototypeProgram.title = 'Pax - Rejections';
        prototypeProgram.modulo = '';

        win.displayBwrProrrateo(this, 'PaxRejec', nroprt);
    },
    post_to_url: function(path, params, method, id) {
        method = method || "post";
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);
        document.body.appendChild(form);
        form.submit();
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
        this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
//        this.bean.IN_TYPEDOC = this.getValue("cmbTypeDoc");
        //bean.IN_CURRENCY=cmbCurrency.selectedItem.data;
        this.bean.IN_AIRLINE = this.getValue("cmbAerolinea");
        this.bean.IN_SOURCE = this.getValue("cmbSourceCode"); //TUSO
//        this.bean.IN_TYPE = this.getValue("cmbStatus"); //STVAL
        this.bean.IN_PERIOD = this.getValue("cmbPeriod");
        this.search(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
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
                this.selectedChild('boxMainData', '', false);
            } else if (this.peek().includes("boxDetailByTdocData")) {
                this.selectedChild('boxDetailByTdocData', 'paggin', false);
            }
        }
    },
    imFavo_clickHandler: function(cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        Ext.getCmp(prototype.id + '-gridDetailByMonth').mask('Loading...');
        Ext.getCmp(prototype.id + '-gridDetailByCurr').mask('Loading...');
        Ext.Ajax.request({
            url: prototype.url + '/search',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByMonth').unmask();
                Ext.getCmp(prototype.id + '-gridDetailByCurr').unmask();
                win.lblUser_toolTip("Estructura: WRF001");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByMonth').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.listaData})
                            );
                    Ext.getCmp(prototype.id + '-gridDetailByCurr').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.lstCurrency})
                            );
                    if (res.listaData.length > 0) {
                        me.selectedChild('boxMainData');
                    } else {
                        global.Msg({msg: 'Data Not Found.'});
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByMonth').unmask();
                Ext.getCmp(prototype.id + '-gridDetailByCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByTDOC">
    searchByTDOC: function(paramsTDOC) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByTDOC'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(paramsTDOC)};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxMainData').unmask();
                    win.lblUser_toolTip("Estructura: WRF001");
                    if (obj.data.length > 0) {
                        if (!me.peek().includes('boxDetailByTdocData'))
                            me.selectedChild('boxDetailByTdocData', 'paggin');
                        else
                            me.selectedChild('boxDetailByTdocData', 'paggin', false);
                        var objResult = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDetailByTdocMonth').setTitle('<center>Billing Month ' + objResult.strFormatDate + ' Period -' + objResult.PERMONT + '- Type of Document ' + objResult.strDescripcion2 + '</center>');
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailByTdocMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.Ajax.request({
            url: prototype.url + '/searchByTDOC',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(paramsTDOC)},
            beforerequest: Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.lstCurrency})
                            );
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByRank">
    searchByRank: function(bean) {
        Ext.Ajax.request({
            url: prototype.url + '/searchByRank',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                win.lblUser_toolTip("Estructura: WRF003");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailRank1').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.listaDataRk1})
                            );
                    Ext.getCmp(prototype.id + '-gridDetailRank2').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.listaDataRk2})
                            );
                    Ext.getCmp(prototype.id + '-gridDetailRank3').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.listaDataRk3})
                            );
                    Ext.getCmp(prototype.id + '-gridDetailRank4').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.listaDataRk4})
                            );
                    if (res.listaDataRk1.length > 0) {
                        me.selectedChild('boxDetailByRank');
                        //<editor-fold defaultstate="collapsed" desc="Total Value">
                        var objResultrK1 = {};
                        var totSector_R = 0;
                        var totCommen_R = 0;
                        var totFamily_R = 0;
                        var totSPA_R = 0;
                        var totSector_OR = 0;
                        var totCommen_OR = 0;
                        var totFamily_OR = 0;
                        var totSPA_OR = 0;
                        for (var p = 0; p < res.listaDataRk1.length; p++) {
                            objResultrK1 = res.listaDataRk1[p];
                            totSector_R += objResultrK1.lngQty;
                            totSector_OR += objResultrK1.lngQtyOthers;
                        }
                        for (var q = 0; q < res.listaDataRk2.length; q++) {
                            objResultrK1 = res.listaDataRk2[q];
                            totCommen_R += objResultrK1.lngQty;
                            totCommen_OR += objResultrK1.lngQtyOthers;
                        }
                        for (var r = 0; r < res.listaDataRk3.length; r++) {
                            objResultrK1 = res.listaDataRk3[r];
                            totFamily_R += objResultrK1.lngQty;
                            totFamily_OR += objResultrK1.lngQtyOthers;
                        }
                        for (var s = 0; s < res.listaDataRk4.length; s++) {
                            objResultrK1 = res.listaDataRk4[s];
                            totSPA_R += objResultrK1.lngSPA;
                            totSPA_OR += objResultrK1.lngQtyOthers;
                        }
                        Ext.getCmp(prototype.id + '-lbl_Rank').setText('Ranking Report View for ' + objResultrK1.strAirline + ' -Invoice : ' + objResultrK1.strDescCOM + ' -Invoice Date : ' + objResultrK1.strFecha);
                        me.setValue('Sec_R', Ext.util.Format.number(totSector_R, '0,000'));
                        me.setValue('Com_R', Ext.util.Format.number(totCommen_R, '0,000'));
                        me.setValue('Fam_R', Ext.util.Format.number(totFamily_R, '0,000'));
                        me.setValue('SPA_R', Ext.util.Format.number(totSPA_R, '0,000'));
                        me.setValue('Sec_OR', Ext.util.Format.number(totSector_OR, '0,000'));
                        me.setValue('Com_OR', Ext.util.Format.number(totCommen_OR, '0,000'));
                        me.setValue('Fam_OR', Ext.util.Format.number(totFamily_OR, '0,000'));
                        me.setValue('SPA_OR', Ext.util.Format.number(totSPA_OR, '0,000'));
                        me.setValue('Sec_U', Ext.util.Format.number(totSector_R + totSector_OR, '0,000'));
                        me.setValue('Com_U', Ext.util.Format.number(totCommen_R + totCommen_OR, '0,000'));
                        me.setValue('Fam_U', Ext.util.Format.number(totFamily_R + totFamily_OR, '0,000'));
                        me.setValue('SPA_U', Ext.util.Format.number(totSPA_R + totSPA_OR, '0,000'));
                        me.setValue('SecPerc_R', Ext.util.Format.number((totSector_R + totSector_OR > 0) ? (totSector_R * 100) / (totSector_R + totSector_OR) : 0, '0,000') + '%');
                        me.setValue('ComPerc_R', Ext.util.Format.number((totCommen_R + totCommen_OR > 0) ? (totCommen_R * 100) / (totCommen_R + totCommen_OR) : 0, '0,000') + '%');
                        me.setValue('FamPerc_R', Ext.util.Format.number((totFamily_R + totFamily_OR > 0) ? (totFamily_R * 100) / (totFamily_R + totFamily_OR) : 0, '0,000') + '%');
                        me.setValue('SPAPerc_R', Ext.util.Format.number((totSPA_R + totSPA_OR > 0) ? (totSPA_R * 100) / (totSPA_R + totSPA_OR) : 0, '0,000'));
                        me.setValue('SecPerc_OR', Ext.util.Format.number((totSector_R + totSector_OR > 0) ? (totSector_OR * 100) / (totSector_R + totSector_OR) : 0, '0,000') + '%');
                        me.setValue('ComPerc_OR', Ext.util.Format.number((totCommen_R + totCommen_OR > 0) ? (totCommen_OR * 100) / (totCommen_R + totCommen_OR) : 0, '0,000') + '%');
                        me.setValue('FamPerc_OR', Ext.util.Format.number((totFamily_R + totFamily_OR > 0) ? (totFamily_OR * 100) / (totFamily_R + totFamily_OR) : 0, '0,000') + '%');
                        me.setValue('SPAPerc_OR', Ext.util.Format.number((totSPA_R + totSPA_OR > 0) ? (totSPA_OR * 100) / (totSPA_R + totSPA_OR) : 0, '0,000'));
                        //</editor-fold>
                    } else {
                        global.Msg({msg: 'Data Not Found.'});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByTkt">
    searchByTkt: function(paramsTkt) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByTkt'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(paramsTkt)};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                    win.lblUser_toolTip("Estructura: WRF002");
                    if (obj.data.length > 0) {
                        if (!me.peek().includes('boxDetailByTktData')) {
                            me.selectedChild('boxDetailByTktData', 'paggin2');
                            if (paramsTkt.IN_FCLAS === '') {
                                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').show();
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').hide();
                            }
                        } else {
                            me.selectedChild('boxDetailByTktData', 'paggin2', false);
                        }
                        var objResult = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').setTitle('<center>Billing Month ' + objResult.strFormatDate + ' Period ' + objResult.PERMONT + ' Airline ' + objResult.AIRLINE + '-' + objResult.strDescripcion4 + ' Invoice ' + objResult.INVOICE + '</center>');
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        Ext.Ajax.request({
            url: prototype.url + '/searchByTkt',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(paramsTkt)},
            beforerequest: Ext.getCmp(prototype.id + '-gridDetailByTktCurr').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByTktCurr').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.lstCurrency})
                            );
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByInvoice">
    searchByInvoice: function(bean) {
        Ext.Ajax.request({
            url: prototype.url + '/searchByInvoice',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                win.lblUser_toolTip("Estructura: WRF001");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var objResult = res.objWRF016Filter;
                    //<editor-fold defaultstate="collapsed" desc="Detail of Invoice">
                    me.selectedChild('boxDetailByInvoiceNbr');
                    me.setValue('lbl_AIRLINE_DES', objResult.AIRLINE + " - " + objResult.strDescripcion);
                    me.setValue('lbl_STVAL_DES', objResult.strDescripcion1);
                    me.setValue('lbl_INVOICE', objResult.INVOICE);
                    me.setValue('lbl_TUSO', objResult.TUSO);
                    me.setValue('lbl_GRUPO', objResult.GRUPO);
                    me.setValue('lbl_FINVOICE', objResult.strFormatDate);
                    me.setValue('lbl_PERMONT', objResult.PERMONT);
                    me.setValue('lbl_FECLIMIT', objResult.strFormatDate2);
                    me.setValue('lbl_FCLEAR', objResult.strFormatDate1);
                    me.setValue('lbl_NETI', Ext.util.Format.number(objResult.NETI, '0,000.00') + ' ' + objResult.CURRENC);
                    me.setValue('lbl_SPA', objResult.strDescripcion2);
                    me.setValue('lbl_IMG', Ext.util.Format.number(objResult.PCUPON, '0,000'));
                    me.setValue('lbl_DATENV', objResult.strFormatDate3);
                    me.setValue('lbl_FECL', objResult.strFormatDate4);
                    me.setValue('lbl_ETKT', Ext.util.Format.number(objResult.QETKT, '0,000'));
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="Invoice Quantity Cpns">
                    me.setValue('lbl_MONEDA', objResult.CURRENP);
                    me.setValue('lbl_TUSO_DES', objResult.strDescripcion3);
                    me.setValue('lbl_QCUPON', Ext.util.Format.number(objResult.QCUPON, '0,000'));
                    me.setValue('lbl_GROSSI', Ext.util.Format.number(objResult.GROSSI, '0,000.00'));
                    me.setValue('lbl_GROSSN', Ext.util.Format.number(objResult.GROSSN, '0,000.00'));
                    me.setValue('lbl_PERC', Ext.util.Format.number((objResult.GROSSI > 0) ? (objResult.GROSSN * 100) / objResult.GROSSI : 0, '0,000.00') + '%');
                    me.setValue('lbl_PCUPON', Ext.util.Format.number(objResult.PCUPON, '0,000'));
                    me.setValue('lbl_PERC2', Ext.util.Format.number((objResult.QCUPON > 0) ? (objResult.PCUPON * 100) / objResult.QCUPON : 0, '0,000.00') + '%');
                    me.setValue('lbl_ISCI', Ext.util.Format.number(objResult.ISCI, '0,000.00'));
                    me.setValue('lbl_ISCN', Ext.util.Format.number(objResult.ISCN, '0,000.00'));
                    me.setValue('lbl_PERC3', Ext.util.Format.number((objResult.ISCI > 0) ? (objResult.ISCN * 100) / objResult.ISCI : 0, '0,000.00') + '%');
                    me.setValue('lbl_QAUDI', Ext.util.Format.number(objResult.QAUDI, '0,000'));
                    me.setValue('lbl_PERC4', Ext.util.Format.number((objResult.QCUPON > 0) ? (objResult.QAUDI * 100) / objResult.QCUPON : 0, '0,000.00') + '%');
                    me.setValue('lbl_TAXI', Ext.util.Format.number(objResult.TAXI, '0,000.00'));
                    me.setValue('lbl_TAXN', Ext.util.Format.number(objResult.TAXN, '0,000.00'));
                    me.setValue('lbl_PERC5', Ext.util.Format.number((objResult.TAXI > 0) ? (objResult.TAXN * 100) / objResult.TAXI : 0, '0,000.00') + '%');
                    me.setValue('lbl_NETI2', Ext.util.Format.number(objResult.NETI, '0,000'));
                    me.setValue('lbl_NETO', Ext.util.Format.number(objResult.NETO, '0,000'));
                    me.setValue('lbl_PERC6', Ext.util.Format.number((objResult.NETI > 0) ? (objResult.NETO * 100) / objResult.NETI : 0, '0,000.00') + '%');
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="Quantity RM">
                    var ttlRm = objResult.QRM;
                    var ttlGross = objResult.QRMGROSS;
                    var ttlISC = objResult.QRMISC;
                    var ttlTax = objResult.QRMTAX;
                    var ttlOthers = objResult.QRMOTH;
                    var perGross = 0;
                    var perIsc = 0;
                    var perTax = 0;
                    var perOthers = 0;
                    if (ttlRm > 0) {
                        perGross = (ttlGross * 100) / ttlRm;
                        perIsc = (ttlISC * 100) / ttlRm;
                        perTax = (ttlTax * 100) / ttlRm;
                        perOthers = (ttlOthers * 100) / ttlRm;
                        if ((perGross + perIsc + perTax + perOthers) > 0 && perGross + perIsc + perTax + perOthers < 100) {
                            while ((perGross + perIsc + perTax + perOthers) < 100) {

                                if (perGross > 0) {
                                    perGross = perGross + 1;
                                } else if (perIsc > 0) {
                                    perIsc = perIsc + 1;
                                } else if (perTax > 0) {
                                    perTax = perTax + 1;
                                } else if (perOthers > 0) {
                                    perOthers = perOthers + 1;
                                }
                            }
                        }
                    }

                    me.setValue('lbl_QRM', Ext.util.Format.number(objResult.QRM, '0,000'));
                    me.setValue('lbl_Rate1', (objResult.QRM > 0) ? '100%' : '0%');
                    me.setValue('lbl_QRMGROSS', Ext.util.Format.number(objResult.QRMGROSS, '0,000'));
                    me.setValue('lbl_PERC7', Ext.util.Format.number(perGross, '0,000') + '%');
                    me.setValue('lbl_QRMISC', Ext.util.Format.number(objResult.QRMISC, '0,000'));
                    me.setValue('lbl_PERC8', Ext.util.Format.number(perIsc, '0,000') + '%');
                    me.setValue('lbl_QRMTAX', Ext.util.Format.number(objResult.QRMTAX, '0,000'));
                    me.setValue('lbl_PERC9', Ext.util.Format.number(perTax, '0,000') + '%');
                    me.setValue('lbl_QRMOTH', Ext.util.Format.number(objResult.QRMOTH, '0,000'));
                    me.setValue('lbl_PERC10', Ext.util.Format.number(perOthers, '0,000') + '%');
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="Adjustment">
                    if (objResult.strFlag == 'true') {
                        Ext.getCmp(prototype.id + '-box_Adjustment').show();
                        me.setValue('lbl_ICUPON', Ext.util.Format.number(objResult.ICUPON, '0,000'));
                        me.setValue('lbl_IFARE', Ext.util.Format.number(objResult.IFARE, '0,000.00'));
                        me.setValue('lbl_IISC', Ext.util.Format.number(objResult.IISC, '0,000.00'));
                        me.setValue('lbl_ITAX', Ext.util.Format.number(objResult.ITAX, '0,000.00'));
                        me.setValue('lbl_IOTHER', Ext.util.Format.number(objResult.IOTHER, '0,000.00'));
                        me.setValue('lbl_INETO', Ext.util.Format.number(objResult.INETO, '0,000.00'));
                        me.setValue('lbl_COMMENTS', objResult.COMENT1 + ' ' + objResult.COMENT2);
                    } else {
                        Ext.getCmp(prototype.id + '-box_Adjustment').hide();
                    }
                    //</editor-fold>
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    exportExcel: function() {

        var currentPanel = this.peek();
        var beanString = '';
        var strEncode = '';

        console.log(currentPanel);
        switch (currentPanel) {
            case prototype.id + '-boxMainData':
                beanString = JSON.stringify(this.bean);
                strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + beanString);
                break;
            case prototype.id + '-boxDetailByTdocData':

                beanString = JSON.stringify(this.paramsTDOC);
                strEncode = encodeURI(prototype.url + '/getXLSX_ByTDOC?beanString=' + beanString);
                break;
            case prototype.id + '-boxDetailByTktData':
                beanString = JSON.stringify(this.paramsTkt);
                strEncode = encodeURI(prototype.url + '/getXLSX_ByTkt?beanString=' + beanString);
                break;

        }
        global.getFile(strEncode);
    },
    BuscarTKT_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                //if (Ext.getCmp(prototype.id + '-txtTKT').getValue().length === 13) {
                this.bean21.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
                this.searchByTktNumber(this.bean21);
                /*} else {
                 global.Msg({
                 msg: 'Ticket number must contain 13 digits.'
                 });
                 }*/
                break;
        }
    },
    searchRejection: function(obj, e, eOpts) {
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if (cmbFindBy === "REJ") {
            if (e.getKey() === 13) {
//                if (Ext.getCmp(prototype.id + '-txtRej').getValue().trim().length === 10) {
                this.bean21.IN_REJNUMBER = Ext.getCmp(prototype.id + '-txtRej').getValue();
                this.searchByRejectNumber(this.bean21);
//                } else {
//                    Ext.getCmp(prototype.id + '-txtRej').setValue('');
//                    global.Msg({msg: 'Reject number must contain 10 digits.'});
//                }
            }
        }
    },
    searchByRejectNumber: function(paramsRejectNumber) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByRejectNumber'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(paramsRejectNumber)};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                    win.lblUser_toolTip("Estructura: WRF002");
                    if (obj.data.length > 0) {
                        if (!me.peek().includes('boxDetailByTktData')) {
                            me.selectedChild('boxDetailByTktData', 'paggin2');
                            if (paramsRejectNumber.IN_FCLAS === '') {
                                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').show();
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').hide();
                            }
                        } else {
                            me.selectedChild('boxDetailByTktData', 'paggin2', false);
                        }
                        var objResult = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').setTitle('<center>Billing Month ' + objResult.strFormatDate + ' Period ' + objResult.PERMONT + ' Airline ' + objResult.AIRLINE + '-' + objResult.strDescripcion4 + ' Invoice ' + objResult.INVOICE + '</center>');
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        Ext.Ajax.request({
            url: prototype.url + '/searchByRejectNumber',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(paramsRejectNumber)},
            beforerequest: Ext.getCmp(prototype.id + '-gridDetailByTktCurr').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByTktCurr').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.lstCurrency})
                            );
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    searchByTktNumber: function(paramsTktNumber) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByTktNumber'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(paramsTktNumber)};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                    win.lblUser_toolTip("Estructura: WRF002");
                    if (obj.data.length > 0) {
                        if (!me.peek().includes('boxDetailByTktData')) {
                            me.selectedChild('boxDetailByTktData', 'paggin2');
                            if (paramsTktNumber.IN_FCLAS === '') {
                                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').show();
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').hide();
                            }
                        } else {
                            me.selectedChild('boxDetailByTktData', 'paggin2', false);
                        }
                        var objResult = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').setTitle('<center>Billing Month ' + objResult.strFormatDate + ' Period ' + objResult.PERMONT + ' Airline ' + objResult.AIRLINE + '-' + objResult.strDescripcion4 + ' Invoice ' + objResult.INVOICE + '</center>');
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        Ext.Ajax.request({
            url: prototype.url + '/searchByTktNumber',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(paramsTktNumber)},
            beforerequest: Ext.getCmp(prototype.id + '-gridDetailByTktCurr').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByTktCurr').bindStore(
                            Ext.create("Ext.Praxis.store.interline.GridData", {data: res.lstCurrency})
                            );
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    cmbFind_changeHandler: function() {
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if (cmbFindBy === "TICKET") {
            Ext.getCmp(prototype.id + '-txtRej').hide();
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id + '-txtTKT').show();
            Ext.getCmp(prototype.id + '-lblTkt').setText("Ticket:");
            Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        } else if (cmbFindBy === "REJ") {
            Ext.getCmp(prototype.id + '-txtTKT').hide();
            Ext.getCmp(prototype.id + '-lblTkt').setText("Rej Number:");
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id + '-txtRej').show();
            Ext.getCmp(prototype.id + '-txtRej').setValue("");
        } else {
//            Ext.getCmp(prototype.id+'-lblTkt').hide();
            Ext.getCmp(prototype.id + '-txtTKT').hide();
            Ext.getCmp(prototype.id + '-txtRej').hide();
        }
    },
// <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if (add)
            this.stack.push(prototype.id + '-' + boxId);
        if (pagginId === null || pagginId === undefined || pagginId.length === 0) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = Ext.getCmp(prototype.id + '-' + pagginId).getPageData();
            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');
            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function() {
        return this.stack[this.stack.length - 1];
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
// </editor-fold>
});
