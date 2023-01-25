Ext.define('Ext.Praxis.controller.program.ProrrateoIxC.ProrrateoIxCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProrrateoIxCController',
    dataObtain: {},
    beanA020: {},
    strBack: '',
    beanA728: {},
    lista: new Array(),
    init: function(view) {
        prototype.ProrrateoIxC = {
            id: 'ProrrateoIxCForm',
            url: CONTEXTPATH + '/ProrrateoIxC',
            widthContenedor: 1096
        };
    },
    startDisplay: function() {
        if (this.params.beanA020 !== undefined && this.params.strBack !== undefined) {
            this.beanA020 = this.params.beanA020;
            this.strBack = this.params.strBack;
        }
        Ext.getCmp(prototype.ProrrateoIxC.id + '-txtA020TUSO').show();
        Ext.getCmp(prototype.ProrrateoIxC.id + '-cmbTuso').hide();
        this.limpiarData();
        this.limpiarImgETLR();
        this.searchProrate(this.beanA020);
    },
    ChangeUso: function() {
        //console.log('ChangeUso');
        var cmbTusoLength = Ext.getCmp(prototype.ProrrateoIxC.id + '-cmbTuso').getStore().data.length;
        Ext.getCmp(prototype.ProrrateoIxC.id + '-cmbTuso').show();
        Ext.getCmp(prototype.ProrrateoIxC.id + '-txtA020TUSO').hide();
        this.setValue('cmbTuso', '');
        
        if (cmbTusoLength === 0) {
            this.obtainData();
        }
        //this.setValue('cmbTuso', '');
    },
    setUso: function() {
        //console.log('setUso');
        Ext.getCmp(prototype.ProrrateoIxC.id + '-clear').show();
        Ext.getCmp(prototype.ProrrateoIxC.id + '-save').show();

        var usoTmp = this.getValue("cmbTuso");
        this.setValue('txtA020TUSO', usoTmp);
        //this.setValue('cmbTuso', '');
        Ext.getCmp(prototype.ProrrateoIxC.id + '-cmbTuso').hide();
        Ext.getCmp(prototype.ProrrateoIxC.id + '-txtA020TUSO').show();
    },
    Clear: function() {
        //console.log('Clear');
        var usoTmp = this.beanA020.A020TUSO;
        this.setValue('txtA020TUSO', usoTmp);
        //this.setValue('cmbTuso', '');
        Ext.getCmp(prototype.ProrrateoIxC.id + '-cmbTuso').hide();
        Ext.getCmp(prototype.ProrrateoIxC.id + '-txtA020TUSO').show();
        Ext.getCmp(prototype.ProrrateoIxC.id + '-save').hide();
    },
    Save: function() {
        console.log('Save');
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Change Source Code?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    
                    this.updateUSO(this.getValue("txtA020TUSO"), this.beanA020.strTicket);
                }
            }
        });
    },
    imgBack_clickHandler: function() {
        if (this.strBack === 'InterInv') {
//            history.go(-1);
//            win.lblUser_toolTip("Estructura: A050");
            win.backPrograma(this.params.back);
        } else if (this.strBack === 'PricingProrate') {
            win.backPrograma(this.params.back);
        }
    },
    txtValidar_keyDownHandler: function() {
    },
    btnNucRoe_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    btnTUA_clickHandler: function() {
        if (this.strTicket !== '') {
            this.searchTaxes(this.beanA020);
        } else {
            global.Msg({msg: 'No Taxes Found.'});
        }
    },
    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function() {
        this.dataObtain.USO = 1;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.ProrrateoIxC.id + '-cmbTuso').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstUSO, autoLoad: true})
                            );
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    //</editor-fold>
    ////<editor-fold defaultstate="collapsed" desc="updateUSO">
    updateUSO: function(txtA020TUSO, strTicket) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoIxC.url + '/updateUSO',
            method: 'POST',
            timeout: 60000000,
            params: {uso: txtA020TUSO, tkt: strTicket},
            beforerequest: Ext.getCmp(prototype.ProrrateoIxC.id + '-centerC').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.ProrrateoIxC.id + '-centerC').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var Mensaje = res.Msj;
                    global.Msg({msg: Mensaje});
                    if (Mensaje.indexOf('Successful') != -1) {
                        Ext.getCmp(prototype.ProrrateoIxC.id + '-save').hide();
                        Ext.getCmp(prototype.ProrrateoIxC.id + '-clear').hide();
                        me1.imgBack_clickHandler();
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.ProrrateoIxC.id + '-centerC').unmask();
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchProrate">
    searchProrate: function(beanA020) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoIxC.url + '/searchProrate',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanA020)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, opts) {
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                me1.lista = new Array();
                if (res.success) {
                    me1.beanA020 = res.dataA020;
                    me1.beanA728 = res.dataA728;
                    me1.lista = res.lstSectores;

                    if (me1.beanA020 !== undefined && me1.beanA728 !== undefined && me1.lista !== undefined) {
                        win.lblUser_toolTip("Estructura: A050/A728/A1200");
                        me1.mostrarData();
                        if (me1.beanA020.strFileName !== '') {
                            //                        imgImage.source = 'GetImageServlet?strOption=AM_IMG_RED&strImagen='+app.trim(beanA020.strFileName);
                            Ext.getCmp(prototype.ProrrateoIxC.id + '-boxImgRED').show();
                            Ext.getCmp(prototype.ProrrateoIxC.id + '-boxImgTCN').hide();
                        } else {
                            var imgTCN = res.imgTCN;
                            if (imgTCN.strIssuedBy !== '' && imgTCN.lstCupones.length > 0) {
                                me1.setValue('txtT_IssuedBy', imgTCN.strIssuedBy);
                                me1.setValue('txtT_PassBagg', imgTCN.strPassBagg);
                                me1.setValue('txtT_Endorsements', imgTCN.strEndorsRest.trim());
                                me1.setValue('txtT_Tour', imgTCN.strTourCode);
                                me1.setValue('txtT_OrigDest', imgTCN.strOrigDestin);
                                me1.setValue('txtT_IssueDP', imgTCN.strDatePlaceIssue);
                                me1.setValue('txtT_NamePass', imgTCN.strPassenger.trim());
                                me1.setValue('txtT_Booking', imgTCN.strBooking);
                                me1.setValue('txtT_OriIssue', imgTCN.strOrigIssue);
                                me1.setValue('txtT_Exchange', imgTCN.strIssueExc1 + ' ' + imgTCN.strIssueExc2);

                                me1.setValue('txtT_Fare', imgTCN.strFare);
                                me1.setValue('txtT_EFare', imgTCN.strEquivFare);
                                me1.setValue('txtT_Tax1', imgTCN.strTax01);
                                me1.setValue('txtT_Tax2', imgTCN.strTax02);
                                me1.setValue('txtT_Tax3', imgTCN.strTax03);
                                me1.setValue('txtT_FareCal', imgTCN.strFareCal);
                                me1.setValue('txtT_TotalTaxes', imgTCN.strTotalTaxes);
                                me1.setValue('txtT_FormPay', imgTCN.strFormPay);

                                Ext.getCmp(prototype.ProrrateoIxC.id + '-gridEtktRout').bindStore(
                                        Ext.create("Ext.Praxis.store.interline.GridData", {data: imgTCN.lstCupones})
                                        );
                                Ext.getCmp(prototype.ProrrateoIxC.id + '-boxImgRED').hide();
                                Ext.getCmp(prototype.ProrrateoIxC.id + '-boxImgTCN').show();
                            } else {
                                //                            imgImage.source = 'assets/img/not_picture.png';
                                Ext.getCmp(prototype.ProrrateoIxC.id + '-boxImgRED').show();
                                Ext.getCmp(prototype.ProrrateoIxC.id + '-boxImgTCN').hide();
                            }
                        }
                    } else {
                        global.Msg({msg: 'Data Not Found.'});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTaxes">
    searchTaxes: function(beanA020) {
        console.log(beanA020);
        Ext.Ajax.request({
            url: prototype.ProrrateoIxC.url + '/searchTaxes',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanA020)},
//            beforerequest: Ext.getCmp(DataEntry).mask('Loading...'),
            success: function(response, opts) {
//                Ext.getCmp(DataEntry).unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var gridTaxesAC = res.lstTaxes;
                    console.log(gridTaxesAC);
                    if (gridTaxesAC.length > 0) {
//                        displayTaxesPopup();
//                        twCtrlTaxesA729.gridTaxesAC = gridTaxesAC;
                    } else
                        global.Msg({msg: 'No Taxes Found.'});
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(DataEntry).unmask();
            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function() {
        
        this.setValue('txtA020KEY', this.beanA020.A020NROPRT);
        this.setValue('txtTicket', this.beanA020.strTicket.substring(0, 3) + ' ' + this.beanA020.strTicket.substring(3, 13) + ' ' + this.beanA020.strTicket.substring(13));
        this.setValue('txtA020GRUPO', this.beanA020.A020GRUPO);
        this.setValue('txtA020TUSO', this.beanA020.A020TUSO);
        this.setValue('txtA728AIRFAC', this.beanA728.A728AIRFAC);
        this.setValue('txtA020SUFECH', this.beanA020.A050FCONTA);
        this.setValue('txtA728FECVTA', this.beanA728.A728FECVTA);
        this.setValue('txtA728FVLO1', this.beanA728.A728FVLO1);
        this.setValue('txtA020FRECHA', this.beanA020.A050FCONTA);
        this.setValue('txtA020SDATE', this.beanA020.A020SDATE);
        this.setValue('txtA728CTYEMI', this.beanA728.A728CTYEMI);
        this.setValue('txtA728CTYVTA', this.beanA728.A728CTYVTA);
        this.setValue('txtA728CODIT', this.beanA728.A728CODIT);
        this.setValue('txtA020RMSN', this.beanA020.A020RMSN);
        this.setValue('txtA020USER', this.beanA020.A020USER);
        this.setValue('txtA728ATBP', Ext.util.Format.number(this.beanA728.A728ATBP, '0,000.00'));
        this.setValue('txtA728MDAATB', this.beanA728.A728MDAATB);
        if (this.beanA728.A728IPLUS === 'S') {
            this.setValue('cmbA728IPLUS', 'S');
        } else if (this.beanA728.A728IPLUS === 'N') {
            this.setValue('cmbA728IPLUS', 'N');
        } else {
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
        Ext.getCmp(prototype.ProrrateoIxC.id + '-lblA020BASE').setText(this.beanA020.A020BASE);
        Ext.getCmp(prototype.ProrrateoIxC.id + '-gridData').bindStore(
                Ext.create("Ext.Praxis.store.interline.GridData", {data: this.lista})
                );
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
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
        Ext.getCmp(prototype.ProrrateoIxC.id + '-lblA020BASE').setText('');
        this.setValue('txtA020TUSO', '');
        this.setValue('txtA050TUA', '');

//        imgImage.source = 'assets/img/not_picture.png';

        Ext.getCmp(prototype.ProrrateoIxC.id + '-gridData').getStore().removeAll();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarImgETLR">
    limpiarImgETLR: function() {
        this.setValue('txtT_IssuedBy', '');
        this.setValue('txtT_Endorsements', '');
        this.setValue('txtT_NamePass', '');
        this.setValue('txtT_OriIssue', '');
        this.setValue('txtT_PassBagg', '');
        this.setValue('txtT_Tour', '');
//        this.setValue('txtT_Conjunctions', '');
        this.setValue('txtT_OrigDest', '');
        this.setValue('txtT_IssueDP', '');
        this.setValue('txtT_Booking', '');
        this.setValue('txtT_Exchange', '');
        this.setValue('txtT_Fare', '');
        this.setValue('txtT_EFare', '');
        this.setValue('txtT_Tax1', '');
        this.setValue('txtT_Tax2', '');
        this.setValue('txtT_Tax3', '');
        this.setValue('txtT_FareCal', '');
        this.setValue('txtT_TotalTaxes', '');
        this.setValue('txtT_FormPay', '');

        Ext.getCmp(prototype.ProrrateoIxC.id + '-gridEtktRout').getStore().removeAll();
    },
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.ProrrateoIxC.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.ProrrateoIxC.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.ProrrateoIxC.id + '-' + id).setValue(txt);
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
