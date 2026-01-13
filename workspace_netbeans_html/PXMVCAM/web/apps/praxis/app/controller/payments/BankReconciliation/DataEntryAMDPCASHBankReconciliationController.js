Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryAMDPCASHBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAMDPCASHBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDe: '',
    actionCode: '',
    storeDataCash: {},
    showOnlyPending: false,
    bean: {},
    beanCashAgent: {},
    beanCashCsv: {},
    bean_detail: {},
    bean_scan: {},
    lstA1852: {},
    lstAmounts: [],
    lstSendManual: [],
    lstBlocked: [],
    lstAdjustment: [],
    sumAmount: 0,
    sumAmountBlocked: 0,
    dataObtain: {},
    beanReversed: {},
    // </editor-fold>
    init: function (view) {
        meDe = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.beanCons;
        console.log(this.p.beanCons, "PROBANDO")
        this.lstCard = this.p.lstCard;
        this.lstBank = this.p.lstBank;
        this.lstCountry = this.p.lstCountry;
        this.lstAdjustment = [];
    },
    afterRender: function () {

        console.log(this.bean, "Esto es todo lo que traigo")

//        Ext.Ajax.request({
//            url: prototype.urlMaster + '/obtainData',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify({USERPERMIS: 2, NPROG: sessionStorage.getItem('nprog')})},
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    if (res.userPermis.PERMM === 'Y') {
//                        Ext.getCmp(prototype.id + '-btn-reverse').show();
//                    } else {
//                        Ext.getCmp(prototype.id + '-btn-reverse').hide();
//                    }
//                } else
//                    global.Msg({msg: res.sesion});
//            }
//            
//        });

        this.obtainData();
        this.mostrarData();
        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').show();
        console.log(this.bean.STVAL, 'ESTADOOOO')
        console.log(this.bean.CBATCH, "wdaaaaaaaaaaaaaaA")

        this.onSearchCompleteDetail();
        
    },
    ocultarBtnReversa: function () {
        let validacion1 = ['45', '46', '54', '55'].includes(this.bean.CERROR);
        let validacion2 = this.bean.TERMI === '00000000' && this.bean.CODEBANK === '0051';
        if (validacion1 || validacion2) {
            console.log('entra en ocultar')
            Ext.getCmp(prototype.id + '-btn-reverse').hide();
        } else {
            console.log('entra en mostrar')
            Ext.getCmp(prototype.id + '-btn-reverse').hide();
        }
    },

    joinMultiSelect: function (element) {
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    onSearchCompleteDetail: function () {
        meDe.showOnlyPending = false;
        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(this.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_DETAILCASH',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res.success, 'RESULTADOOOOOO')
                if (res.success) {
                    meDe.bean_detail = res.result;
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    if (meDe.bean.TINPUT == 'I') {
                        Ext.getCmp(prototype.id + '-gridDataInfoScanICCS').bindStore(storeData);
                    } else {
                        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    }

                    meDe.storeDataCash = storeData;

//                    meDe.calcularSumAmount();
                    meDe.calcularMontos();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
            }
        });
    },
    mostrarData: function () {

        // DETAIL SETTLEMENT
        this.setValue('de-txtStatusCash', this.bean.descSTVAL);
        let cfuente;
        if (this.bean.TINPUT === 'B') {
            cfuente = 'BSP';
            Ext.getCmp(prototype.id + '-panelDataInfoScan').show();
            Ext.getCmp(prototype.id + '-panelDataInfoScanICCS').hide();

        } else if (this.bean.TINPUT === 'A') {
            Ext.getCmp(prototype.id + '-panelDataInfoScan').show();
            Ext.getCmp(prototype.id + '-panelDataInfoScanICCS').hide();
            cfuente = 'ARC';

        } else if (this.bean.TINPUT === 'I') {
            cfuente = 'ICCS';
            Ext.getCmp(prototype.id + '-panelDataInfoScanICCS').show();
            Ext.getCmp(prototype.id + '-panelDataInfoScan').hide();
        }
        ;
        this.setValue('de-txtSource', cfuente);
        this.setValue('de-txtAdate', this.bean.ADATE);
        this.setValue('de-txtScountry', this.bean.DESC_SCOUNTRY);
        let negocio = 'PASAJES';

        this.setValue('de-txtNegocio', negocio);
        this.setValue('de-txtScurrency', this.bean.SCURRENCY);
        this.setValue('de-txtNeto', Ext.util.Format.number(this.bean.NETO, '0,000.00'));
        this.setValue('de-txtBandoc', this.bean.BANDOC);
        this.setValue('de-txtAccount', this.bean.ACCNUMB);
        this.setValue('de-txtQtyTkt', this.bean.QTYTKT);



        // CONCILIATE

        this.setValue('de-txtSTVAL', this.bean.descSTVAL);
        this.setValue('de-txtdescFREGLA', this.bean.descFREGLA);
        this.setValue('de-txtDATEC', this.bean.DATEC);
        this.setValue('de-txtDATECI', this.bean.DATECI);
        this.setValue('de-txtTRANCI', this.bean.TRANCI);
        this.setValue('de-txtTRANC', this.bean.TRANC);
        this.setValue('de-txtQTYDOC', this.bean.QTYDOC);
        this.setValue('de-txtQTYTKT', this.bean.QTYTKT);
        this.setValue('de-txtNetoPending', Ext.util.Format.number(this.bean.lngPayamouPending, '0,000.00'));
        this.setValue('de-txtNetConciliado', Ext.util.Format.number(this.bean.lngPayamouMatch, '0,000.00'));

        // 191 
        this.setValue('de-txtCOUNTRY191', this.bean.DESC_SCOUNTRY);
        this.setValue('de-txtCurrency191', this.bean.SCURRENCY_191);
        this.setValue('de-txtSCONSOL_191', this.bean.SCONSOL_191);
        this.setValue('de-txtSTRDATE', this.bean.STARDATE_191);
        this.setValue('de-txtENDDATE', this.bean.ENDDATE_191);
        this.setValue('de-txtNETO191', Ext.util.Format.number(this.bean.NETO_191, '0,000.00'));
        this.setValue('de-txtPAYAMOU191', Ext.util.Format.number(this.bean.PAYAMOU_191, '0,000.00'));
        this.setValue('de-txtCOMISION191', Ext.util.Format.number(this.bean.NETO_191 - this.bean.PAYAMOU_191, '0,000.00'));
        this.setValue('de-txtQTYTKT191', this.bean.QTYTKT_191);
        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
    },
    calcularMontos: function () {
        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        var qtyTkt = store_gridInfoScan.getCount();

        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);
            if (dataRow1.data.STMANUAL !== 'Blocked') {
                this.sumAmount = this.sumAmount + dataRow1.data.A1531VFOP;
            }
        }
        for (var i = 0; i < this.lstAdjustment.length; i++) {
            this.sumAmount = this.sumAmount + parseFloat(this.lstAdjustment[i].A1531VFOP);
        }
        Ext.getCmp(prototype.id + '-de-QtyTkt').setValue(qtyTkt);
//        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    mostrarCommentCash: function () {

        var txtCOMENT = Ext.getCmp(prototype.id + '-PanelCommentsCash');
        var comentVisible = txtCOMENT.isVisible();
        if (comentVisible) {
            txtCOMENT.hide();
        } else {
            txtCOMENT.show();
        }
    },
    mostrarDeta: function () {
        Ext.getCmp(prototype.id + '-PanelAmountsMain').hide();
        Ext.getCmp(prototype.id + '-PanelAmountsDeta').show();
    },
    calcularSumAmount: function () {
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        var groupField = 'A720PNR';
        var sum = {};

        store_gridInfoScan.each(function (record) {
            var key = record.get(groupField);
            var value = record.get('A1531VFOP');
            sum[key] = (sum[key] || 0) + parseFloat(value);
        });
        store_gridInfoScan.each(function (record) {
            var key = record.get(groupField);
            record.set('tot_VFOP', sum[key]);
        });
        grid.getView().refresh();
    },
    mostrarMain: function () {
        console.log('mostrarMontos');
        Ext.getCmp(prototype.id + '-PanelAmountsMain').show();
        Ext.getCmp(prototype.id + '-PanelAmountsDeta').hide();
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        var bean = {};
//        bean.PRDA = Ext.getCmp(prototype.id + '-de-txtPRDA').getValue();
//        bean.MERCHID = Ext.getCmp(prototype.id + '-de-txtMERCHID').getValue();
//        bean.SAGENT = Ext.getCmp(prototype.id + '-de-txtSAGENT').getValue().replace(/-/g, '');
//        bean.TRANC = Ext.getCmp(prototype.id + '-de-txtTRANC').getValue();
//        bean.SDATE = Ext.getCmp(prototype.id + '-de-txtBSUMDATE').getValue();
//        bean.SCARDN = Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue();
        console.log(bean.SAGENT);
        return bean;
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
//        this.setValue('de-txtPRDA', '');
//        this.setValue('de-txtSAGENT', '');
//        this.setValue('de-txtMERCHID', '');
//        this.setValue('de-txtSMERCHID', '');
//        this.setValue('de-txtIDITEMS', '');
//        this.setValue('de-txtIDITEMT', '');
//        this.setValue('de-txtINSTPLA', '');
//        this.setValue('de-txtINSTPAY', '');
//        this.setValue('de-txtINVORNBR', '');
//        this.setValue('de-txtZONE', '');
//        this.setValue('de-txtCOUNTRY', '');
//        this.setValue('de-txtSTCON', '');
//        this.setValue('de-txtFCONT', '');
//        this.setValue('de-txtIDCON', '');
//        this.setValue('de-txtCERRORHST', '');
//        this.setValue('de-txtCERROIN', '');
//        this.setValue('de-txtDES_CERROIN', '');
//        this.setValue('de-txtFLAG', '');
//        this.setValue('de-txtCERROR', '');
//        this.setValue('de-txtDES_CERROR', '');
//        this.setValue('de-txtFromDateBSUMDATE', '');
//        this.setValue('de-txtBSUMDATE', '');
//        this.setValue('de-txtTDOC', '');
//        this.setValue('de-txtSPNR', '');
//        this.setValue('de-txtBANDOC', '');
//        this.setValue('de-txtCCUSTCC', '');
//        this.setValue('de-txtSCARCODE', '');
//        this.setValue('de-txtCODEBANK', '');
//        this.setValue('de-txtSCARDN', '');
//        this.setValue('de-txtSAUTHOC', '');
//        this.setValue('de-txtSTVAL', '');
//        this.setValue('de-txtQTYTKT', '');
//        this.setValue('de-txtPCURRENCY', '');
//        this.setValue('de-txtTGROSAMOUN', '0');
//        this.setValue('de-txtdescFREGLA', '');
//        this.setValue('de-txtVOID', '');
//        this.setValue('de-txtSVFOP', '0');
//        this.setValue('de-txtFADM', '');
//        this.setValue('de-txtFREVERSA', '');
//        this.setValue('de-txtFREVADM', '');
//        this.setValue('de-txtDIFF_AMOUNT', '0');
//        this.setValue('de-txtUSCR', '');
//        this.setValue('de-txtFECR', '');
//        this.setValue('de-txtHOCR', '');
//        this.setValue('de-txtUSUP', '');
//        this.setValue('de-txtFEUP', '');
//        this.setValue('de-txtHOUP', '');
    },
    clear_keyDownHandler: function () {
        this.setValue('input-txtTKTScanCash', '');
        this.setValue('txtScanSAGENT', '');
        this.setValue('txtScanSconsol', '');
        this.setValue('cmbCLIENT', '');
        this.setValue('txtScanScountry', '');
        this.setValue('txtScanScurrency', '');
        this.setValue('txtFromDateCash', '');
        this.setValue('txtToDateCash', '');
    },
    clear_tableNormal: function () {
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion').bindStore(storeDataClear);
        this.calcularSumAmount();
        this.calcularMontos();
    },

//</editor-fold>

// <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.executeOption(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },

    updateComent: function () {


        let valorComent = Ext.getCmp(prototype.id + '-cmbCOMENTCASH').getValue();
        meDe.bean.CERROR = valorComent;
        console.log("CERROR enviado:", meDe.bean.CERROR);



        Ext.Ajax.request({
            url: prototype.url + '/updateCERROR_BPO_revision',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(meDe.bean)},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {

                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {

                    var msj = res.mensaje;
                    global.Msg({
                        msg: msj
                    });
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//                    var beanCons = res.result;
//                    console.log('beanCons');
//                    console.log(beanCons);
//                    if (beanCons !== null) {
//                        me.winDataEntryDebits('U', beanCons);
//                    } else {
//                        global.Msg({
//                            msg: 'An error has ocurred. Please contact our System Department'
//                        });
//                    }

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
    onUpdateClick: async function (btn) {

// 
        let valorComent = Ext.getCmp(prototype.id + '-cmbCOMENTCASH').getValue();
        console.log(valorComent, "visualkizar xxx");

        if (valorComent == "75" || valorComent == "76" || valorComent == "77" || valorComent == "78") {

            this.updateComent();
//            console.log("recibe comentario codigo");

        } else {
            var deci = await this.preexecuteOption();
            if (deci) {
                Ext.Msg.show({
                    title: '.:Confirmation:.',
                    msg: 'Are you sure to Update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            beanTemp = this.llenarData();
                            beanTemp.option = 'U';
                            beanTemp.beanString = JSON.stringify(meDe.bean);
                            this.executeOption(beanTemp);
                        }
                    }
                });
            }

        }



    },

    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(meDe.bean);
                    this.executeOption(beanTemp);
                }
            }
        });
    },
    onReverseClick: function (btn) {
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Reverse?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp = this.llenarData();
                    beanTemp.option = 'R';
                    beanTemp.beanString = JSON.stringify(meDe.bean);
                    this.reverseOption(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    preexecuteOption: async function () {

        var decide = false;
        var ASVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtSVFOPHide').getValue().replace(/,/g, '').replace('.00', ''));
        var BSVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', ''));
        if (ASVFOP == BSVFOP) {

            var comment = Ext.getCmp(prototype.id + '-cmbCOMENTCASH').getValue();
            if (comment !== '' && comment !== null) {
                let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
                let miGrillaAdj = Ext.getCmp(prototype.id + '-gridDataAdjustment');
                let comentVisible = miGrillaAdj.isVisible();
                let datos = {};
                datos = await this.procesarRegistros(miGrilla, miGrillaAdj);
                if (datos == false) {
                    global.Msg({msg: 'The amount exceeds the allowed ranges'});
                    return false
                } else {
                    console.log('modificable');
                    decide = true;
                }
            } else {
                global.Msg({msg: 'Select the Manual Reconciliation reason "BPO Comment" '});
                Ext.getCmp(prototype.id + '-PanelCommentsCash').show();
                Ext.getCmp(prototype.id + '-COMENT_ForcedCash').show();
            }

        } else {
            console.error('No cuadra');
            global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Settlement.'});
        }
        return decide;
    },
    executeOption: async function (beanTemp, option) {

        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        let miGrillaAdj = Ext.getCmp(prototype.id + '-gridDataAdjustment');
        var comentVisible = miGrillaAdj.isVisible();

        let datos = {};
        if (miGrilla) {
            console.error('Entró al procesar Registros');
            if (comentVisible) {
                datos = await this.procesarRegistros(miGrilla, miGrillaAdj);
            } else {
                datos = await this.procesarRegistros(miGrilla);
            }
            if (datos == false) {
                global.Msg({msg: 'The amount exceeds the allowed ranges'});
                return false
            } else {
                Ext.Ajax.request({
                    url: prototype.url + '/executeOption',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                    }
                });
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },
    reverseOption: function (beanTemp, option) {

        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        let datos = {};
        var cont;
        if (miGrilla) {
            cont = this.desprocesarRegistros(miGrilla);
            if (cont === 0) {

                datos = this.desprocesarOnlyLiquidacion();
                Ext.Ajax.request({
                    url: prototype.url + '/reverseOptionOnlyLiq',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                    }
                });

            } else {
                datos = this.desprocesarRegistros(miGrilla);
                Ext.Ajax.request({
                    url: prototype.url + '/reverseOption',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                    }
                });
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODDES") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
        if (beanTemp.SDATE !== '' && beanTemp.SCOUNTRY !== ''
                && beanTemp.TDOC !== '' && beanTemp.CBANK !== ''
                && beanTemp.SCARCOD !== '' && beanTemp.IN_CARDN1 !== ''
                && beanTemp.IN_CARDN2 !== '' && beanTemp.SAUTHOC !== ''
                && beanTemp.SVFOP > 0 && beanTemp.SCURRENCY !== ''
                && beanTemp.SEQNUM !== '' && beanTemp.MERCHN !== ''
                && beanTemp.TDATE !== '' && beanTemp.BDATEP !== '') {
            if (Ext.getCmp(prototype.id + '-de-txtSAGENT').getErrors().length > 0) {
                msjResult = 'Invalid Agent Code.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getErrors().length > 0) {
                msjResult = 'Invalid Authorization Code.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSVFOP').getErrors().length > 0) {
                msjResult = 'Invalid Local Amount.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getErrors().length > 0) {
                msjResult = 'Invalid Currency.';
            } else if (Ext.getCmp(prototype.id + '-de-txtLDATE').getErrors().length > 0) {
                msjResult = 'Invalid Load Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtTDATE').getErrors().length > 0) {
                msjResult = 'Invalid Transaction Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtDATEF').getErrors().length > 0) {
                msjResult = 'Invalid TEF Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtBDATEP').getErrors().length > 0) {
                msjResult = 'Invalid Process Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtQTYTKT').getErrors().length > 0) {
                msjResult = 'Invalid Quantity Tickets.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSEQNUM').getErrors().length > 0) {
                msjResult = 'Invalid Sequence Number.';
            } else if (Ext.getCmp(prototype.id + '-de-txtMERCHN').getErrors().length > 0) {
                msjResult = 'Invalid Merchant Number.';
            } else if (Ext.getCmp(prototype.id + '-de-cmbSCARCODE').getErrors().length > 0) {
                msjResult = 'Invalid Card Code.';
            }
        } else {
            msjResult = 'You must enter all required fields.';
        }
        return msjResult;
    },
    deshabilitarCampos1: function () {
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCARCODE').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtPNR').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbTRNXCODE').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbBSTVAL').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbTIPOTAR').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbPEM').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbFLOAD').disable(true);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbSORIG').disable(true);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtQTYTKT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(true);
    },
    habilitarCampos1: function () {
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtPNR').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtQTYTKT').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(false);
    },
    onGridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').close();
        var data = x.record.data;
        var strTkt = data.A1531TKT;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';
        win.displayCustomViewTicket(this, 'BankConciliation', beanProMasterTicket);
    },
    onGridDataViewTktFinal: function (column, e, row, column, x, rowData) {
        Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').close();
        var data = x.record.data;
        var strTkt = data.A1531TKT;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';
        win.displayProMasterTicket(this, 'BankConciliation', beanProMasterTicket);
    },

    removeTKT: function (grid, rowIndex, colIndex) {
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion').getView().refresh();
        this.calcularSumAmount();
        this.calcularMontos();
    },
    onAdjust: function (grid, rowIndex, colIndex) {

        var data = grid.getStore().getAt(rowIndex).data;
        if (data.STMANUAL !== 'Blocked') {
            if (this.sumAmount === this.bean.SVFOP) {
                global.Msg({msg: 'The sum amount is equal to transaction amount.'});
            } else {
                Ext.getCmp(prototype.id + '-gridDataAdjustment').show();
                Ext.getCmp(prototype.id + '-panelADJ').show();
                var rec = Object.create(grid.getStore().getAt(rowIndex).data);
                var monto_ajustado = parseFloat(parseFloat(this.bean.SVFOP - this.sumAmount).toFixed(2))

                rec.A1531VFOP = monto_ajustado;
                rec.tot_VFOP = monto_ajustado;
                this.lstAdjustment.push(rec);
                Ext.getCmp(prototype.id + '-gridDataAdjustment').bindStore(
                        Ext.create('Ext.data.Store', {data: this.lstAdjustment, autoLoad: true})
                        );
                this.calcularSumAmount();
                this.calcularMontos();
            }
        } else {
            global.Msg({msg: 'Can\'t adjust a blocked ticket.'});
        }
    },
    addAdjTicket_keyDownHandler: function () {
        var ticket = this.getValue('input-txtAdjTKTScan1').trim();
        var registro_adj = {};
        registro_adj.ST_MANUAL = '';
        registro_adj.FDESGLOSE = '2';
        registro_adj.A1531TTARJ = this.bean.SCARCOD;
        registro_adj.A1531NREF = this.bean.SCARDN;
        registro_adj.A1531CAPL = this.bean.SAUTHOC;
        registro_adj.A1531MFOP = this.bean.SCURRENCY;
        registro_adj.A1531TKT = ticket;
        registro_adj.A1531VFOP = this.bean.SVFOP;
        registro_adj.tot_VFOP = this.bean.SVFOP;
        registro_adj.A720FECVTA = this.bean.SDATE;
        registro_adj.A720PNR = this.bean.SPNR;
        registro_adj.A720AGENTE = $('#menuUser').text();
        ;
        registro_adj.descTDOC = 'Adj.';
        registro_adj.TDOC = 'A';
        this.lstSendManual.push(registro_adj);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstSendManual, autoLoad: true})
                );
        this.calcularSumAmount();
        this.calcularMontos();
    },
    hiddenByMatch: function () {
        Ext.getCmp(prototype.id + '-btnClearCustom').hide();
        $('.x-tab-top:contains("Blocked")').hide();
    },
    onWindowNormal: function () {
        Ext.getCmp(prototype.id + '-panelSumAmount').show();
        if (this.bean.STVAL === '1' || this.bean.STVAL === '5') {

        } else {
            Ext.getCmp(prototype.id + '-panelSumAmount').setMargin('0 0 0 296');
        }
    },
    onWindowBlocked: function () {
        Ext.getCmp(prototype.id + '-panelSumAmount').setMargin('0 0 0 215');
        Ext.getCmp(prototype.id + '-panelSumAmount').show();
    },
    allRefreshDataEntryAMDPCASH: function () {
        this.onSearchCompleteDetail();
        console.log("Hace Algo")
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
        }
    },
// </editor-fold>
    agregaTicket: function (obj) {
        if (obj.IN_TKT_ASIG !== '') {
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setValue(obj.IN_TKT_ASIG);
        }
    },

    ///gridatescan

    onGridViewTKTAgent: function (column, e, row, columnIndex, x, rowData) {

        var value = x.record.data.QTYTKT;
        if (!value || value <= 0) {
            Ext.Msg.alert('Aviso', 'No se encuentran tickets.');
            return;
        }
        
        me.hasScanTicketContext = true;

     
        me.beanCashAgent = {};
        me.beanCashAgent.IN_SAGENT = x.record.data.SAGENT;
        me.beanCashAgent.IN_DATEC = x.record.data.DATEC;
        me.beanCashAgent.IN_TRANC = x.record.data.TRANC;
        me.beanCashAgent.IN_SPAYMENT =
                (x.record.data.TPERIOD === 'E') ? 'EP' : 'CA';

    
        me.beanCashAgent.beanString = JSON.stringify(me.beanCashAgent);

        me.paramsDetail = {};
        me.paramsDetail.beanString = me.beanCashAgent.beanString;

        me.panelActual = '-panelGridDataDetalleCashScan';

        this.setGridDataScanAgent();
    },
    
    



    setGridDataScanAgent: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchBeanTicketAgent'
            },
            listeners: {

                
                beforeload: function (obj) {
                    obj.proxy.extraParams = {
                        beanString: me.beanCashAgent.beanString
                    };
                },

                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-pagginScanAgent');
                    var pagData = pag.getPageData();


                    Ext.getCmp(prototype.id + '-lbl-currentPageScan').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCountScan').setText(pagData.pageCount);                        
                    Ext.getCmp(prototype.id + '-lbl-totalScan').setText(pagData.total);
                            

                    if (obj.data.length === 0) {global.Msg({msg: 'Data not found.'});
                    }
                }
            }
        });

        Ext.getCmp(prototype.id + '-panelDataInfoScanAgent').show();
        Ext.getCmp(prototype.id + '-labelScanAgent').show();
        Ext.getCmp(prototype.id + '-containerPaginationToolbar').show();
        Ext.getCmp(prototype.id + '-containerPageSummary').show();
        var gridAgent = Ext.getCmp(prototype.id + '-gridDataInfoScanAgent');
        gridAgent.show();
        Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion').hide();
        gridAgent.bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pagginScanAgent').bindStore(storeGridDatas);
    },

    ///



    highlightRow: function (value, meta, record) {
        meta.style = "text-align:center;";
        if (record.data.TDOC === 'A')
            meta.style += "background-color:#bff5bf;";
        return value;
    },
    AddAdjustCash: function () {

        if (this.bean.TINPUT == 'I') {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScanICCS');
        } else {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        }

        var gridAgent = Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion');

        var storeScan = gridScan.getStore();
        var storeAgent = gridAgent.getStore();

        // === 1️⃣ Verificar selección ===
        var seleccionado = gridScan.getSelectionModel().getSelection()[0];
        if (!seleccionado) {
            Ext.Msg.alert('Aviso', 'Seleccione una fila del grid principal (Scan) antes de crear el ajuste.');
            return;
        }

        // === 2️⃣ Calcular totales ===
        var totalScan = parseFloat(seleccionado.get('NETO')) || 0;

        var totalAgent = 0;
        storeAgent.each(function (r) {
            totalAgent += parseFloat(r.get('SVFOPNETR')) || 0;
        });
        var scan = Number(totalScan.toFixed(2));
        var agent = Number(totalAgent.toFixed(2));
        var diferencia = scan - agent;
        let invoice = "";
        if (scan > agent) {
            invoice = "PS"
        } else {
            invoice = "PP"
        }
        // === 3️⃣ Obtener último registro como referencia ===
        var ultimoRegistro = storeAgent.last();
        if (!ultimoRegistro) {
            Ext.Msg.alert('Aviso', 'No hay registros en la grilla Agent para usar como referencia.');
            return;
        }
        if (diferencia == 0) {
            Ext.Msg.alert('Aviso', 'El ajuste no puede ser 0');
            return;
        }
//        let key = `${rec.get('CCUST')}#${rec.get('TKT')}#${rec.get('TDOC')}#${rec.get('SCARDNCOR')}#${rec.get('SAUTHOC')}#${rec.get('SEQ')}#${rec.get('CORRL')}`;
        // === 4️⃣ Crear nuevo registro desde cero ===
        var newRec = Ext.create(storeAgent.model, {
            // Copiamos algunos campos del último registro
            TDOC: 'A',
            STVAL: '3',
            SAGENT: ultimoRegistro.get('SAGENT'),
            SCONSOL: ultimoRegistro.get('SCONSOL'),
            SDATE: ultimoRegistro.get('SDATE'),
            MCLOS: ultimoRegistro.get('MCLOS'),
            SCOUNTRY: ultimoRegistro.get('SCOUNTRY'),
            CCUST: ultimoRegistro.get('CCUST'),
            TKT: ultimoRegistro.get('TKT'),
            TDOCORG: ultimoRegistro.get('TDOC'),
            SCARDNCOR: ultimoRegistro.get('SCARDNCOR'),
            SAUTHOC: ultimoRegistro.get('SAUTHOC'),
            SEQ: ultimoRegistro.get('SEQ'),
            CORRL: ultimoRegistro.get('CORRL'),
            SCURRENCY: ultimoRegistro.get('SCURRENCY'),
            INVOICE: ultimoRegistro.get('INVOICE') + invoice,
            CFUENTE: ultimoRegistro.get('CFUENTE'),
            SPAYMENT: ultimoRegistro.get('SPAYMENT'),
            SVFOPNETR: diferencia,
            SVFOP: diferencia
        });

        // === 5️⃣ Agregar el nuevo registro ===
        storeAgent.add(newRec);

        // === 6️⃣ Refrescar la vista ===
        gridAgent.getView().refresh();

        // === 7️⃣ Logs para depuración ===
        console.log('✅ Ajuste creado:', newRec.data);
        console.log('⚖️ Total Scan:', totalScan);
        console.log('⚖️ Total Agent (antes del ajuste):', totalAgent);
        console.log('⚖️ Diferencia aplicada:', diferencia);
    },

    onConciliationCashAdjust: function () {
//        var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        if (this.bean.TINPUT == 'I') {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScanICCS');
        } else {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        }
        var seleccionado = gridScan.getSelectionModel().getSelection()[0];

        if (!seleccionado) {
            Ext.Msg.alert('Aviso', 'Debe seleccionar una fila para conciliar.');
            return;
        }

        // === Crear el bean con los campos requeridos ===
        this.bean_scan = this.bean_scan || {};
        this.bean_scan.SAGENT = seleccionado.get('SAGENT');
        this.bean_scan.SCOUNTRY = seleccionado.get('SCOUNTRY');
        this.bean_scan.SCURRENCY = seleccionado.get('SCURRENCY');
        this.bean_scan.SPAYMENT = 'CA';
        this.bean_scan.CBATCH = seleccionado.get('CBATCH');
        this.bean_scan.STRDATE = seleccionado.get('STRDATE');
        this.bean_scan.ENDDATE = seleccionado.get('ENDDATE');
        this.bean_scan.ADATE = seleccionado.get('ADATE');
        this.bean_scan.TINPUT = seleccionado.get('TINPUT');
        this.bean_scan.SEQ = seleccionado.get('SEQ');

        var paramScan = {beanString: JSON.stringify(this.bean_scan)};

        Ext.Ajax.request({
            url: prototype.url + '/ConciliationAdjust',
            method: 'POST',
            timeout: 60000000,
            params: paramScan,
            beforeRequest: function () {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Procesando conciliación...');
            },
            success: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                var res = Ext.JSON.decode(response.responseText || '{}');

                if (res.success) {
                    global.Msg({msg: res.Mensaje || 'Conciliación completada con éxito.'});

                    var store = gridScan.getStore();
                    if (store)
                        store.reload();
                } else {
                    global.Msg({msg: res.Mensaje || 'Error en la conciliación.'});
                }
            },
            failure: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                Ext.Msg.alert('Error', 'Error en el servidor (' + response.status + ')');
                console.error('Server-side failure:', response);
            }
        });
    },

    onConciliationAddAdjust: function () {
//        var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        if (this.bean.TINPUT === 'I') {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScanICCS');
        } else {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        }
        var seleccionado = gridScan.getSelectionModel().getSelection()[0];

        if (!seleccionado) {
            Ext.Msg.alert('Aviso', 'Debe seleccionar una fila para conciliar.');
            return;
        }

        // === Crear el bean con los campos requeridos ===
        this.bean_scan = this.bean_scan || {};
        this.bean_scan.SAGENT = seleccionado.get('SAGENT');
        this.bean_scan.SCOUNTRY = seleccionado.get('SCOUNTRY');
        this.bean_scan.SCURRENCY = seleccionado.get('SCURRENCY');
        this.bean_scan.SPAYMENT = 'CA';
        this.bean_scan.CBATCH = seleccionado.get('CBATCH');
        this.bean_scan.STRDATE = seleccionado.get('STRDATE');
        this.bean_scan.ENDDATE = seleccionado.get('ENDDATE');
        this.bean_scan.ADATE = seleccionado.get('ADATE');
        this.bean_scan.TINPUT = seleccionado.get('TINPUT');
        this.bean_scan.SEQ = seleccionado.get('SEQ');

        var paramScan = {beanString: JSON.stringify(this.bean_scan)};

        Ext.Ajax.request({
            url: prototype.url + '/ConciliationAddAdjust',
            method: 'POST',
            timeout: 60000000,
            params: paramScan,
            beforeRequest: function () {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Procesando conciliación...');
            },
            success: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                var res = Ext.JSON.decode(response.responseText || '{}');

                if (res.success) {
                    global.Msg({msg: res.Mensaje || 'Conciliación completada con éxito.'});
                    var store = gridScan.getStore();
                    if (store)
                        store.reload();
                } else {
                    global.Msg({msg: res.Mensaje || 'Error en la conciliación.'});
                }
            },
            failure: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                Ext.Msg.alert('Error', 'Error en el servidor (' + response.status + ')');
                console.error('Server-side failure:', response);
            }
        });
    },

    addCash_keyDownHandler: function () {
        var me = this;
        var fecha_a_validar = "";
        this.bean_scan.TICKET = Ext.getCmp(prototype.id + '-input-txtTKTScanCash').getValue();
        let fechaFrom = Ext.getCmp(prototype.id + '-txtFromDateCash').getValue() || fecha_a_validar;
        let fechato = Ext.getCmp(prototype.id + '-txtToDateCash').getValue() || fecha_a_validar;
        let fechaClos = Ext.getCmp(prototype.id + '-txtMclos').getValue() || fecha_a_validar;


        // --- Fechas ---
        if (fechaFrom || fechato || fechaClos) {
            let fechaBaseFrom = Ext.isDate(fechaFrom) ? fechaFrom : Ext.Date.parse(fechaFrom, 'Y-m-d');
            let fechaBaseTo = Ext.isDate(fechato) ? fechato : Ext.Date.parse(fechato, 'Y-m-d');
            let fechaBaseClos = Ext.isDate(fechaClos) ? fechaClos : Ext.Date.parse(fechaClos, 'Y-m-d');

            if (fechaBaseFrom || fechaBaseTo || fechaClos) {
                this.bean_scan.SDATE = Ext.Date.format(fechaBaseFrom, 'Ymd');
                this.bean_scan.SDATE_MIN = Ext.Date.format(fechaBaseFrom, 'Ymd');
                this.bean_scan.SDATE_MAX = Ext.Date.format(fechaBaseTo, 'Ymd');
                this.bean_scan.MCLOS = Ext.Date.format(fechaBaseClos, 'Ymd');
            } else {
                console.warn('La fecha ingresada no es válida.');
            }
        }

        // --- Otros filtros ---
        this.bean_scan.SAGENT = Ext.getCmp(prototype.id + '-txtScanSAGENT').getValue();
        this.bean_scan.SCONSOL = Ext.getCmp(prototype.id + '-txtScanSconsol').getValue();
        this.bean_scan.SCURRENCY = Ext.getCmp(prototype.id + '-txtScanScurrency').getValue();
        this.bean_scan.SCOUNTRY = Ext.getCmp(prototype.id + '-txtScanScountry').getValue();
        this.bean_scan.CCUST = Ext.getCmp(prototype.id + '-cmbCLIENT').getValue();
        this.bean_scan.SPAYMENT = Ext.getCmp(prototype.id + '-cmbTypePayment').getValue();

        if (!this.bean_scan.TICKET && !this.bean_scan.SDATE && !this.bean_scan.SAGENT && !this.bean_scan.SCONSOL) {
            global.Msg({msg: 'Fields to Scan must be filled out'});
            return;
        }

        let gridConciliacion = Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion');
        let store = gridConciliacion.getStore();

        // --- Construir mapa de registros actuales ---
        let existingKeys = {};
        store.each(function (rec) {
            let key = `${rec.get('CCUST')}#${rec.get('TKT')}#${rec.get('TDOC')}#${rec.get('SCARDNCOR')}#${rec.get('SAUTHOC')}#${rec.get('SEQ')}#${rec.get('CORRL')}`;
            existingKeys[key] = true;
        });

        // --- Parámetros AJAX ---
        var paramScan = {beanString: JSON.stringify(this.bean_scan)};
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_SCANCASH',
            method: 'POST',
            timeout: 60000000,
            params: paramScan,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    console.log("✅ Respuesta AJAX:", res);

                    let gridCmp = Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion');
                    let store = gridCmp.getStore();

                    // 🔹 Convertimos los datos existentes a un mapa por clave compuesta
                    let existingKeys = {};
                    store.each(function (record) {
                        let key = record.get('CCUST') + '#' + record.get('TKT') + '#' + record.get('TDOC') + '#' + record.get('SCARDNCOR') + '#' + record.get('SAUTHOC') + '#' + record.get('SEQ') + '#' + record.get('CORRL');
                        console.log(key, "Clave compuesta");
                        console.log("Entro a este For");
                        existingKeys[key] = true;
                    });

                    let nuevos = 0;
                    let duplicados = 0;

                    Ext.Array.each(res.data, function (newRecord, index) {
//                        let key = newRecord.TKT + '#' + newRecord.SVFOPNETR + '#' + newRecord.SCURRENCY;
                        let key = newRecord.CCUST + '#' + newRecord.TKT + '#' + newRecord.TDOC + '#' + newRecord.SCARDNCOR + '#' + newRecord.SAUTHOC + '#' + newRecord.SEQ + '#' + newRecord.CORRL;

                        if (!existingKeys[key]) {
                            newRecord.id = key || Ext.id(null, 'rec-');
                            store.add(newRecord);
                            existingKeys[key] = true;
                            nuevos++;
                        } else {
                            duplicados++;
                        }
                    });

                    console.log(`🟢 ${nuevos} registros nuevos agregados, ${duplicados} duplicados ignorados.`);


                    Ext.getCmp(prototype.id + '-panelDataInfoScanAgent').show();
                    Ext.getCmp(prototype.id + '-containerPaginationToolbar').hide();
                    Ext.getCmp(prototype.id + '-containerPageSummary').hide();
                    Ext.getCmp(prototype.id + '-gridDataInfoScanAgent').hide();
                    gridConciliacion.show();

                    meDe.calcularMontos();

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },

            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    onConciliationCash: function (element) {
        var me = this;
//        var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        if (this.bean.TINPUT == 'I') {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScanICCS');
        } else {
            var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        }
        var storeScan = gridScan.getStore();

        // --- Filtrar registros seleccionados
        var seleccionados = storeScan.getRange().filter(function (r) {
            return r.get('selected') === true;
            console.log(r.get('NETO'), "Seleccion Neto");
        });

        if (seleccionados.length === 0) {
            Ext.Msg.alert('Aviso', 'Debe seleccionar al menos un registro para conciliar.');
            return;
        }

        // --- Obtener datos del grid de agentes
        var gridAgent = Ext.getCmp(prototype.id + '-gridDataInfoScanConciliacion');
        var storeAgent = gridAgent.getStore();

        var agentData = [];
        storeAgent.each(function (rec) {
            agentData.push(rec.getData());
        });

        var totalScan = 0;
        seleccionados.forEach(function (r) {
            totalScan += parseFloat(r.get('NETO') || 0);
        });

        var totalAgent = 0;
        storeAgent.each(function (r) {
            totalAgent += parseFloat(r.get('SVFOPNETR') || 0);
        });
        console.log(seleccionados, ' seleccionados')

        var scan = Number(totalScan.toFixed(2));
        var agent = Number(totalAgent.toFixed(2));
        // --- Validar que las sumas coincidan (con pequeña tolerancia)
        var diferencia = Math.abs(scan - agent);

        if (diferencia != 0.00) { // puedes ajustar la tolerancia
            Ext.Msg.alert(
                    'Aviso',
                    'Los montos no coinciden. ' +
                    '<br><b>Liquidacion:</b> ' + totalScan.toFixed(2) +
                    '<br><b>Venta:</b> ' + totalAgent.toFixed(2)
                    );
            return;
        }

        // --- Si pasa la validación, continuar con la conciliación
        var beanConciliacion = {
            mainRecords: seleccionados.map(function (r) {
                return r.getData();
            }),
            agentList: agentData,
            SVFOPNETR: agent
        };
        console.log(agentData, 'agentData')


        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(beanConciliacion);

        console.log(beanConciliacion, 'beanConciliacion')

        Ext.Ajax.request({
            url: prototype.url + '/ManualConciliacionCash',
            method: 'POST',
            jsonData: beanConciliacion,
            timeout: 60000000,
            headers: {'Content-Type': 'application/json'},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Processing Conciliation...'),
            success: function (response) {
//                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.alert('Éxito', 'Conciliación procesada correctamente.');
                    Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').close();
                } else {
                    global.Msg({msg: res.Mensaje || 'Successfully reconciled.'});
                }
            },
            failure: function (response) {
//                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                Ext.Msg.alert('Error', 'No se pudo procesar la conciliación. Código: ' + response.status);
            }
        });

    },

    ExportCSV: function () {
        console.log('Descargando CSV...');

        const country = this.bean.SCOUNTRY; // Ejemplo: "CO"
        const date = this.bean.ADATE;       // Ejemplo: "20250731"
        const fuente = this.bean.TINPUT;       // Ejemplo: "20250731"
        const dateArc = this.bean.DPERIOD;       // Ejemplo: "20250731"
        const ccust = this.bean.CCUST;       // Ejemplo: "20250731"      
        const cycle = this.bean.DCYCLE.trim();

        if (!country || !date) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (SCOUNTRY o ADATE).');
            return;
        }

        // Enviamos los dos parámetros al backend
        const url = prototype.url + '/getCSV?country=' + encodeURIComponent(country)
                + '&date=' + encodeURIComponent(date) + '&fuente=' + encodeURIComponent(fuente)
                + '&dateArc=' + encodeURIComponent(dateArc) + '&ccust=' + encodeURIComponent(ccust) + '&cycle=' + encodeURIComponent(cycle);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    onDownloadBSP: function (column, e, row, columnIndex, x, rowData) {

        const country = rowData.data.SCOUNTRY
        const date = rowData.data.ADATE
        const fuente = "B"
        const dateArc = ""
        const ccust = ""
        const cycle = ""
        const url = prototype.url + '/getCSV?country=' + encodeURIComponent(country)
                + '&date=' + encodeURIComponent(date) + '&fuente=' + encodeURIComponent(fuente)
                + '&dateArc=' + encodeURIComponent(dateArc) + '&ccust=' + encodeURIComponent(ccust) + '&cycle=' + encodeURIComponent(cycle);

        global.getFile(url);
    },
    
    /////NUEVO EXCEL
    /////////////
    
 
    getExcelCashTicket: function () {

        if (!me.beanCashAgent || !me.beanCashAgent.beanString) {
            Ext.Msg.alert('Aviso', 'Debe seleccionar primero un Qty. Tkt.');
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.QUESTION,
            scope: this, 
            fn: function (btn) {
                if (btn === 'ok') {
                    console.log('OK presionado, llamando exportExcel');
                    this.exportExcel();  
                }
            }
        });

    },
    exportExcel: function () {
        
        
       

        switch (me.panelActual) {
            case '-panelGridDataDetalleCashScan':
                console.log('ENTRÓ AL CASE Scan');
                global.getFile(
                        prototype.url +
                        '/getXLSXScan?beanString=' +
                        encodeURIComponent(me.paramsDetail.beanString)
                        );
                break;

            default:
                console.log('NO ENTRÓ A NINGÚN CASE');
                global.Msg({msg: 'Under Construction'});
        }
    },


    //////

    obtainData: function () {
        Ext.Ajax.request({
            url: prototype.url + '/obtainMessages',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
//                    meDe.bean_detail = res.result;
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbCOMENTCASH').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbCOMENTCASH').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });

    },

    onUpdateCommentsCash: function () {
        const getCommentCash = Ext.getCmp(prototype.id + '-cmbCOMENTCASH');
        const commentValue = getCommentCash.getValue();
        var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        var storeScan = gridScan.getStore();

        if (!commentValue) {
            Ext.Msg.alert('Alert', 'No valid comment has been selected.');
            return;
        }

        var seleccionados = storeScan.getRange().filter(function (r) {
            return r.get('selected') === true;
        });

        if (seleccionados.length === 0) {
            Ext.Msg.alert('Alert', 'Please select at least one record to assign a comment.');
            return;
        }

        var invalid = seleccionados.find(function (r) {
            return r.get('STVAL') !== "3";
        });

        if (invalid) {
            Ext.Msg.alert(
                    'Alert',
                    'No puede asignar comentario a un registro MATCH.'
                    );
            return;
        }

        var beanConciliacion = {
            mainRecords: seleccionados.map(function (r) {
                return r.getData();
            }),
            codeComment: commentValue
        };

        console.log(beanConciliacion, 'beanConciliacion')
        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(beanConciliacion);


        Ext.Ajax.request({
            url: prototype.url + '/AssignCashComment',
            method: 'POST',
            jsonData: beanConciliacion,
            timeout: 60000000,
            headers: {'Content-Type': 'application/json'},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').mask('Assigning Comment...'),
            success: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.alert('Success', 'Code Assigned Successfully.');
                    meDe.onSearchCompleteDetail();
                } else {
                    global.Msg({msg: res.Mensaje || 'Code Assigned Successfully.'});
                }
            },
            failure: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryAMDPCASH').unmask();
                Ext.Msg.alert('Error', 'The comment could not be assigned');
            }
        });


    },

    onShowWOSales: function () {
        var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        var storeScan = gridScan.getStore();

        meDe.showOnlyPending = !meDe.showOnlyPending;

        if (meDe.showOnlyPending) {

            var filteredData = meDe.storeDataCash.getRange().filter(function (r) {
                return r.get('STVAL') === "3";
            });

            var newStore = Ext.create('Ext.data.Store', {
                data: filteredData
            });

            gridScan.bindStore(newStore);
//        Ext.Msg.alert('Info', 'Mostrando solo registros Pending (STVAL = 3)');
        } else {

            var newStore = Ext.create('Ext.data.Store', {
                data: meDe.storeDataCash.getRange()
            });

            gridScan.bindStore(newStore);
//        Ext.Msg.alert('Info', 'Mostrando todos los registros');
        }
    }






});

