Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryAMDPBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAMDPBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDe: '',
    actionCode: '',
    bean: {},
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
        this.lstCard = this.p.lstCard;
        this.lstBank = this.p.lstBank;
        this.lstCountry = this.p.lstCountry;
        this.lstAdjustment = [];
    },
    afterRender: function () {
        

        
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
        
        this.mostrarData();
        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-delete').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').show();
        if (this.bean.STVAL === '1' || this.bean.STVAL === '4' || this.bean.STVAL === '5') {
            this.onSearchCompleteDetail();
            Ext.getCmp(prototype.id + '-btn-update').hide();
//            this.ocultarBtnReversa();
        } else {

            if (this.bean.NEGOC === '1') {
                this.onSearchPendingDetail();
                Ext.getCmp(prototype.id + '-btn-update').show();
            } else {
                Ext.getCmp(prototype.id + '-btn-update').show();
            }
            Ext.getCmp(prototype.id + '-btn-reverse').hide();

        }
        meDe.agregaTicket(meDe.bean);
    },
    ocultarBtnReversa: function () {
        let validacion1 = ['45', '46','54','55'].includes(this.bean.CERROR);
        let validacion2 = this.bean.TERMI === '00000000' && this.bean.CODEBANK === '0051';
        if(validacion1  || validacion2){
            console.log('entra en ocultar')
            Ext.getCmp(prototype.id + '-btn-reverse').hide();
        }else{
            console.log('entra en mostrar')
            Ext.getCmp(prototype.id + '-btn-reverse').show();
        }
    },
    joinMultiSelect: function (element) {
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    addCreditCard_keyDownHandler: function () {
        var fecha_a_validar = "";
        this.bean_scan.TICKET = Ext.getCmp(prototype.id + '-input-txtTKTScan1').getValue();
        this.bean_scan.CARD1 = Ext.getCmp(prototype.id + '-txtCard11').getValue();
        this.bean_scan.CARD2 = Ext.getCmp(prototype.id + '-txtCard22').getValue();
        this.bean_scan.SAUTHOC = Ext.getCmp(prototype.id + '-txtApproval').getValue();
        let fechaBaseRaw = Ext.getCmp(prototype.id + '-txtFromDate').getValue() || fecha_a_validar;

        if (fechaBaseRaw) {
            // Asegúrate de que sea tipo Date
            let fechaBase = Ext.isDate(fechaBaseRaw) ? fechaBaseRaw : Ext.Date.parse(fechaBaseRaw, 'Y-m-d');

            if (fechaBase) {
                this.bean_scan.SDATE = Ext.Date.format(fechaBase, 'Ymd');
                let dateMin = Ext.Date.add(fechaBase, Ext.Date.DAY, -3);
                let dateMax = Ext.Date.add(fechaBase, Ext.Date.DAY, 3);
                this.bean_scan.SDATE_MIN = Ext.Date.format(dateMin, 'Ymd');
                this.bean_scan.SDATE_MAX = Ext.Date.format(dateMax, 'Ymd');
            } else {
                console.warn('La fecha ingresada no es válida.');
            }
        }
        this.bean_scan.SPNR = Ext.getCmp(prototype.id + '-txtScanPNR').getValue();
        this.bean_scan.SAGENT = Ext.getCmp(prototype.id + '-txtScanSAGENT').getValue();
        this.bean_scan.SCURRENCY = this.bean.SCURRENCY;
        this.bean_scan.CCUSTCC = Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue();
        console.log("esto es el CCUST",this.bean_scan.CCUSTCC)
        this.bean_scan.CCUST = Ext.getCmp(prototype.id + '-cmbCLIENT').getValue();
//        this.bean_scan.SCARCOD = Ext.getCmp(prototype.id + '-cmbSCARCOD').getValue();
        this.bean_scan.SCARCOD = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbSCARCOD'));
        this.bean_scan.SCONSOL = Ext.getCmp(prototype.id + '-txtSCONSOL').getValue();
        if (
                !this.bean_scan.TICKET &&
                !this.bean_scan.CARD1 &&
                !this.bean_scan.CARD2 &&
                !this.bean_scan.SAUTHOC &&
                !this.bean_scan.SDATE &&
                !this.bean_scan.SPNR &&
                !this.bean_scan.SAGENT &&
                !this.bean_scan.SCARCOD &&
                !this.bean_scan.SCONSOL 
                ) {
            console.log("Todos los campos son vacíos. No se realizará la solicitud Ajax.");
            global.Msg({msg: 'Fields to Scan must be filled out'});
            return;
        }

        let gridComponentNormalon = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        let gridComponentBlockedon = Ext.getCmp(prototype.id + '-gridDataInfoScanBlocked');
        let dataGrid = gridComponentNormalon.getStore().getData().items;
        let dataGridBl = gridComponentBlockedon.getStore().getData().items;
        let constructorExcluir = {}.constructor;
        let arrayConstructor = dataGrid.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });

        let arrayConstructorBlocked = dataGridBl.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });

        let arrayNormal = [];
        let arrayBlocked = [];
        if (arrayConstructor.length > 0) {
            for (let value of arrayConstructor) {
                arrayNormal.push(value.data);
            }
        }
        if (arrayConstructorBlocked.length > 0) {
            for (let value of arrayConstructorBlocked) {
                arrayBlocked.push(value.data);
            }
        }
        let listAux = {};
        let listAuxBl = {};
        for (let value of arrayNormal) {
            listAux[`${value.STVAL}#${value.descTDOC}#${value.A720AGENTE}#${value.A720FECVTA}#${value.A720PNR}#${value.A720SCOUNTRY}#${value.A1531TKT}#${value.A1531TTARJ}#${value.A1531NREF}#${value.A1531CAPL}#${value.A1531MFOP}#${value.A1531VFOP}`] = "repetido";
        }
        for (let value of arrayBlocked) {
            listAuxBl[`${value.STVAL}#${value.descTDOC}#${value.A720AGENTE}#${value.A720FECVTA}#${value.A720PNR}#${value.A720SCOUNTRY}#${value.A1531TKT}#${value.A1531TTARJ}#${value.A1531NREF}#${value.A1531CAPL}#${value.A1531MFOP}#${value.A1531VFOP}`] = "repetido";
        }


        var paramScan = {};
        paramScan.beanString = JSON.stringify(this.bean_scan);
        console.log(paramScan);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_SCAN',
            method: 'POST',
            timeout: 60000000,
            params: paramScan,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    let ticketsOcupados = [];
                    var cont = 0;


                    let lstNormal = arrayNormal.length > 0 ? arrayNormal : [];
                    let lstBlocked = arrayBlocked.length > 0 ? arrayBlocked : [];

                    for (let item of res.data) {
                        var validador = item.STVAL;
                        if (validador === '1' || validador === '5') {
                            ticketsOcupados.push(item.A1531TKT);
                            cont++;
                            if (`${item.STVAL}#${item.descTDOC}#${item.A720AGENTE}#${item.A720FECVTA}#${item.A720PNR}#${item.A720SCOUNTRY}#${item.A1531TKT}#${item.A1531TTARJ}#${item.A1531NREF}#${item.A1531CAPL}#${item.A1531MFOP}#${item.A1531VFOP}` in listAuxBl) {
                                continue
                            }
                            lstBlocked.push({
                                STVAL: item.STVAL,
                                descTDOC: item.descTDOC,
                                A720AGENTE: item.A720AGENTE,
                                A720FECVTA: item.A720FECVTA,
                                A720PNR: item.A720PNR,
                                A720SCOUNTRY: item.A720SCOUNTRY,
                                A1531TKT: item.A1531TKT,
                                A1531TTARJ: item.A1531TTARJ,
                                A1531NREF: item.A1531NREF,
                                A1531CAPL: item.A1531CAPL,
                                A1531MFOP: item.A1531MFOP,
                                A1531VFOP: item.A1531VFOP,
                                tot_VFOP: item.tot_VFOP,
                                CFUENTE: item.CFUENTE,
                                INVOICE: item.INVOICE,
                                ACCNUMA: item.ACCNUMA,
                                COSTCEN: item.COSTCEN,
                                SCONSOL: item.SCONSOL
                            });
                        } else {
                            if (`${item.STVAL}#${item.descTDOC}#${item.A720AGENTE}#${item.A720FECVTA}#${item.A720PNR}#${item.A720SCOUNTRY}#${item.A1531TKT}#${item.A1531TTARJ}#${item.A1531NREF}#${item.A1531CAPL}#${item.A1531MFOP}#${item.A1531VFOP}` in listAux) {
                                continue
                            }
                            lstNormal.push({
                                STVAL: item.STVAL,
                                descTDOC: item.descTDOC,
                                A720AGENTE: item.A720AGENTE,
                                A720FECVTA: item.A720FECVTA,
                                A720PNR: item.A720PNR,
                                A720SCOUNTRY: item.A720SCOUNTRY,
                                A1531TKT: item.A1531TKT,
                                A1531TTARJ: item.A1531TTARJ,
                                A1531NREF: item.A1531NREF,
                                A1531CAPL: item.A1531CAPL,
                                A1531MFOP: item.A1531MFOP,
                                A1531VFOP: item.A1531VFOP,
                                tot_VFOP: item.tot_VFOP,
                                CFUENTE: item.CFUENTE,
                                INVOICE: item.INVOICE,
                                ACCNUMA: item.ACCNUMA,
                                COSTCEN: item.COSTCEN,
                                SCONSOL: item.SCONSOL
                            });
                        }
                    }
                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: lstNormal,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataNormal);

                    var storeDataBlocked = Ext.create('Ext.data.Store', {
                        data: lstBlocked,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScanBlocked').bindStore(storeDataBlocked);

                    meDe.calcularMontos();
                    meDe.avisarRegistros();
                    meDe.calcularSumAmount();

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    avisarRegistros: function () {
        var Estado = Ext.getCmp(prototype.id + '-de-txtSTVALHide').getValue();
        if (Estado !== '1' && Estado !== '5') {
            let grilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            let listaDeDatos = [];
            let ticketsOcupados = [];
            var cont = 0;
            grilla.getStore().each(function (record) {
                let registro = {
                    STVAL: record.get('STVAL'),
                    PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(),
                    SCARDN: record.get('A1531NREF'),
                    SAUTHOC: record.get('A1531CAPL'),
                    VFOP: record.get('A1531VFOP'),
                    SDATE: record.get('A720FECVTA'),
                    TICKET: record.get('A1531TKT'),
                    TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue()
                };
                if (record.get('STVAL') === '1' || record.get('STVAL') === '5') {
                    ticketsOcupados.push(record.get('A1531TKT'));
                    cont++;
                }
                listaDeDatos.push(registro);
            });
            if (cont > 0) {
                let mensaje = 'Blocked tickets:<br>' + ticketsOcupados.join('<br>');
                global.Msg({msg: mensaje});
                console.log(mensaje);
            }
        }
    },
    obtainData: function () {
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAdjs',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbADJTYPE').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbADJTYPE').setValue(' ');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
        Ext.Ajax.request({
            url: prototype.url + '/obtainMessages',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbCOMENT').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbCOMENT').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });

        this.dataObtain.CARD = 2;
        this.dataObtain.BANK = 2;
        this.dataObtain.USERPERMIS = 2;
        this.dataObtain.NPROG = sessionStorage.getItem('nprog');
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res,"Obteniendores ");
                if (res.success) {
                    me.lstCard = res.lstCard;
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').setValue('');
                    if (res.userPermis.PERMM === 'Y') {
                        Ext.getCmp(prototype.id + '-btn-reverse').show();
                    } else {
                        Ext.getCmp(prototype.id + '-btn-reverse').hide();
                    }
                   
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    onWindowReversed: function () {
        var paramDetail = {};
        this.beanReversed.DATEC = this.bean.DATEC;
        this.beanReversed.TRANC = this.bean.TRANC;
        this.beanReversed.BANDOC = this.bean.BANDOC;
        this.beanReversed.CCUSTCC = Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue();
        Ext.getCmp(prototype.id + '-panelSumAmount').hide();
        paramDetail.beanString = JSON.stringify(this.beanReversed);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_REVERSED',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScanReversed').bindStore(storeData);

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
    },
    onSearchCompleteDetail: function () {
        var paramDetail = {};
        this.bean.CCUSTCC = Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue();
        paramDetail.beanString = JSON.stringify(this.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_DETAIL',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDe.calcularSumAmount();
                    meDe.calcularMontos();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
    },
    onSearchPendingDetail: function () {

        var paramDetail = {};
        this.bean.CCUSTCC = Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue();
        paramDetail.beanString = JSON.stringify(this.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_SCAN_PENDING',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDe.calcularSumAmount();
                    meDe.calcularMontos();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
    },
    mostrarData: function () {
        if (this.bean.NEGOC !== '1') {
            Ext.getCmp(prototype.id + '-containerPanelScan').hide();
        } else {
            Ext.getCmp(prototype.id + '-containerPanelScan').show();
        }

        if (this.bean.STVAL === '1' || this.bean.STVAL === '5') {
            Ext.getCmp(prototype.id + '-mostrarComment').hide();
            Ext.getCmp(prototype.id + '-labelScan').hide();
            Ext.getCmp(prototype.id + '-panelScanCard').hide();
            Ext.getCmp(prototype.id + '-panelScanCard_2').hide();
            Ext.getCmp(prototype.id + '-gridColumnDelete').hide();
            Ext.getCmp(prototype.id + '-gridColumnAdj').hide();
            Ext.getCmp(prototype.id + '-columnACCNUMA').show();
            Ext.getCmp(prototype.id + '-vacioComment').show();
            Ext.getCmp(prototype.id + '-panelSumAmount').setMargin('0 0 0 300');
            this.hiddenByMatch();
        } else {
            Ext.getCmp(prototype.id + '-mostrarComment').show();
            Ext.getCmp(prototype.id + '-labelScan').show();
            Ext.getCmp(prototype.id + '-panelScanCard').show();
            Ext.getCmp(prototype.id + '-panelScanCard_2').show();
            Ext.getCmp(prototype.id + '-gridColumnDelete').show();
            Ext.getCmp(prototype.id + '-gridColumnAdj').show();
            Ext.getCmp(prototype.id + '-columnACCNUMA').hide();
            Ext.getCmp(prototype.id + '-columnINVOICE').setWidth(143);
            Ext.getCmp(prototype.id + '-vacioComment').hide();
            Ext.getCmp(prototype.id + '-panelSumAmount').setMargin('0 0 0 265')
        }

        this.setValue('de-txtPRDA', this.bean.PRDA);
        this.setValue('de-txtTRANC', this.bean.TRANC);
        this.setValue('de-txtSAGENT', this.bean.DESAGENT);
        this.setValue('de-txtMERCHID', this.bean.MERCHNC);
        this.setValue('de-txtIDITEMS', this.bean.IDITEMS);
        this.setValue('de-txtIDITEMT', this.bean.IDITEMT);
        this.setValue('de-txtINSTPLA', this.bean.INSTPLA);
        this.setValue('de-txtINSTPAY', this.bean.INSTPAY);
        this.setValue('de-txtINVORNBR', this.bean.INVORNBR);
        this.setValue('de-txtZONE', this.bean.ZONE);
        this.setValue('de-txtCOUNTRY', this.bean.DESC_SCOUNTRY);
        this.setValue('de-txtNEGOC', this.bean.descNEGOC);
        this.setValue('de-txtCOREP', this.bean.desCOREP);
        this.setValue('de-txtTERMI', this.bean.TERMI);
        this.setValue('de-txtSTCON', this.bean.STCON);
        this.setValue('de-txtFCONT', this.bean.FCONT);
        this.setValue('de-txtIDCON', this.bean.BANDOC);
        this.setValue('de-txtCERRORHST', this.bean.CERRORHST);
        this.setValue('de-txtCERROIN', this.bean.CERROIN);
        
        
        this.setValue('de-txtDebType', this.bean.DEBTYPE);
        
//        this.setValue('de-txtDebType', this.bean.descDEBTYPE);
        // aplicar el tooltip dinámico
            var cmp = Ext.getCmp(prototype.id + '-de-txtDebType');
            cmp.setValue(this.bean.DEBTYPE);

            Ext.tip.QuickTipManager.register({
                target: cmp.getEl(),
                text: this.bean.descDEBTYPE   // aquí va el tooltip real
            });

        
        this.setValue('de-txtDES_CERROIN', this.bean.DES_CERROIN);
        this.setValue('de-txtFLAG', this.bean.FLAG);
        this.setValue('de-txtCERROR', this.bean.CERROR);
        this.setValue('de-txtDES_CERROR',this.bean.CERROR +' - '+ this.bean.DES_CERROR);
        this.setValue('de-txtBSUMDATE', this.bean.SDATE);
        this.setValue('de-txtTDOC', this.bean.strPEM);
        this.setValue('de-txtSPNR', this.bean.SPNR);
        this.setValue('de-txtBANDOC', this.bean.BANDOC);
        this.setValue('de-txtSOCIETY', this.bean.SOCIETY);
        this.setValue('de-txtSOCIETYL', this.bean.SOCIETYL);

        var comg = Ext.getCmp(prototype.id + '-de-txtSOCIETYL').getValue();
        var comp = Ext.getCmp(prototype.id + '-de-txtSOCIETY').getValue();
        var vBandoc = Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue();

        if (comg !== '' && comp !== '' && comg !== comp) {

            if (this.bean.STVAL === '1' || this.bean.STVAL === '5') {
                this.setValue('de-txtIN_FREGLA', '');
                if (this.bean.FREGLA === '*') {
                    this.setValue('de-txtCCUSTCC', this.bean.CCUSTCC);
                } else {
                    this.setValue('de-txtCCUSTCC', this.bean.CCUST);
                }
            } else {
                this.setValue('de-txtIN_FREGLA', '*');
                this.setValue('de-txtCCUSTCC', this.bean.CCUSTCC);
            }

            Ext.util.CSS.createStyleSheet('.detalle-society { background-color: #d5f4d5 !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-society-textfield { background-color: #bff5bf !important; }');
        } else {
            this.setValue('de-txtIN_FREGLA', '');
            this.setValue('de-txtCCUSTCC', this.bean.CCUST);
            Ext.util.CSS.createStyleSheet('.detalle-society { background-color: transparent !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-society-textfield { background-color: #ccdeeb !important; }');
        }
        console.log(vBandoc.substring(0, 1), 'subcadena de bandoc')
        if (vBandoc.substring(0, 1) === 'W' && comg !== '' && comp !== '' && comg === comp) {
            this.setValue('de-txtCCUSTCC', this.bean.CCUSTCC);
        } else {
            this.setValue('de-txtCCUSTCC', this.bean.CCUST);
        }

        this.setValue('de-txtPAYDATE', this.bean.PAYDATE);
        this.setValue('de-txtSCARCODE', this.bean.SCARCOD);
        this.setValue('de-txtCODEBANK', this.bean.CODEBANK);
        this.setValue('de-txtSCARDN', this.bean.SCARDN.trim());
        this.setValue('de-txtSAUTHOC', this.bean.SAUTHOC);
        this.setValue('de-txtSTVAL', this.bean.descSTVAL);
        this.setValue('de-txtSTVALHide', this.bean.STVAL);
        this.setValue('de-txtQTYTKT', this.bean.QTYTKT);
        this.setValue('de-txtACCNUMA', this.bean.ACCNUMA);

        this.setValue('de-txtQTYDOC', this.bean.QTYDOC);
        if (this.bean.QTYDOC > 1) {
            Ext.util.CSS.createStyleSheet('.detalle-qtydoc { background-color: #d5f4d5 !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-qtydoc-textfield { background-color: #bff5bf !important; }');
        } else {
            Ext.util.CSS.createStyleSheet('.detalle-qtydoc { background-color: transparent !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-qtydoc-textfield { background-color: #ccdeeb !important; }');
        }
        this.lstAmounts = [];
        var fila1 = {};
        fila1.label1 = 'Comm. Sett.';
        fila1.amount1 = this.bean.COMMAMO;
        fila1.label2 = 'Fare Sett.';
        fila1.amount2 = this.bean.FAREO;
        fila1.label3 = 'Transact. Amount';
        fila1.amount3 = this.bean.SVFOP;
        this.setValue('de-txtSVFOPHide', this.bean.SVFOP);
        var fila2 = {};
        fila2.label1 = 'Comm. Audit';
        fila2.amount1 = this.bean.COMMAMOC;
        fila2.label2 = 'Fare Sales';
        fila2.amount2 = this.bean.FAREC;
        fila2.label3 = 'Sales Amount';
        fila2.amount3 = this.bean.SVFOPC;
        var fila3 = {};
        fila3.label1 = 'Diff. Comm.';
        fila3.amount1 = this.bean.DIFF_COMMAMO;
        fila3.label2 = 'Diff. Fare';
        fila3.amount2 = this.bean.DIFF_FARE;
        fila3.label3 = 'Diff. Amount';
        fila3.amount3 = this.bean.SVFOPD;
        var fila4 = {};
        fila4.label1 = 'ADM/ACM';
        fila4.amount1 = this.bean.DIFF_COMMAMO;
        fila4.label2 = '';
        fila4.amount2 = this.bean.COMMFAREC;
        fila4.label3 = 'Total ADM';
        fila4.amount3 = this.bean.TOTAL_ADM;
        this.lstAmounts.push(fila1);
        this.lstAmounts.push(fila2);
        this.lstAmounts.push(fila3);
        this.lstAmounts.push(fila4);
        Ext.getCmp(prototype.id + '-gridAmounts').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstAmounts, autoLoad: true})
                );
        var title = 'Currency: ' + this.bean.SCURRENCY;
        Ext.getCmp(prototype.id + '-gridAmounts').setTitle('<center style="font-size:12px;">' + title + '</center>');
        this.lstAmountsExtras = [];
        var fila1EX = {};
        fila1EX.label1EX = 'IVA';
        fila1EX.amount1EX = this.bean.IVA;
        fila1EX.label2EX = 'BASEFUE';
        fila1EX.amount2EX = this.bean.BASEFUE;
        fila1EX.label3EX = 'BASICA';
        fila1EX.amount3EX = this.bean.BASICA;
        var fila2EX = {};
        fila2EX.label1EX = 'PROPINA';
        fila2EX.amount1EX = this.bean.PROPINA;
        fila2EX.label2EX = 'RTEFUE';
        fila2EX.amount2EX = this.bean.RTEFUE;
        fila2EX.label3EX = 'RTEICA';
        fila2EX.amount3EX = this.bean.RTEICA;
        var fila3EX = {};
        fila3EX.label1EX = 'COMISION';
        fila3EX.amount1EX = this.bean.COMISION;
        fila3EX.label2EX = 'RTEIVA';
        fila3EX.amount2EX = this.bean.RTEIVA;
        fila3EX.label3EX = 'NETO';
        fila3EX.amount3EX = this.bean.NETO;
        this.lstAmountsExtras.push(fila1EX);
        this.lstAmountsExtras.push(fila2EX);
        this.lstAmountsExtras.push(fila3EX);
        Ext.getCmp(prototype.id + '-gridAmountsExtras').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstAmountsExtras, autoLoad: true})
                );
        var titleExtras = 'Currency: ' + this.bean.SCURRENCY;
        Ext.getCmp(prototype.id + '-gridAmountsExtras').setTitle('<center style="font-size:12px;">' + titleExtras + '</center>');

        this.setValue('de-txtdescFREGLA', this.bean.descFREGLA);
        this.setValue('de-txtDATEC', this.bean.DATEC);
        this.setValue('de-txtDATECI', this.bean.DATECI);
        this.setValue('de-txtTRANCI', this.bean.TRANCI);
        this.setValue('de-txtVOID', this.bean.VOID);
        this.setValue('de-txtFADM', this.bean.FADM);
        this.setValue('de-txtFREVERSA', this.bean.FREVERSA);
        this.setValue('de-txtFREVADM', this.bean.FREVADM);

        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
        this.obtainData();
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
        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    mostrarComment: function () {

        var txtCOMENT = Ext.getCmp(prototype.id + '-PanelComments');
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
        bean.PRDA = Ext.getCmp(prototype.id + '-de-txtPRDA').getValue();
        bean.MERCHID = Ext.getCmp(prototype.id + '-de-txtMERCHID').getValue();
        bean.SAGENT = Ext.getCmp(prototype.id + '-de-txtSAGENT').getValue().replace(/-/g, '');
        bean.TRANC = Ext.getCmp(prototype.id + '-de-txtTRANC').getValue();
        bean.SDATE = Ext.getCmp(prototype.id + '-de-txtBSUMDATE').getValue();
        bean.SCARDN = Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue();
        console.log(bean.SAGENT);
        return bean;
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('de-txtPRDA', '');
        this.setValue('de-txtSAGENT', '');
        this.setValue('de-txtMERCHID', '');
        this.setValue('de-txtSMERCHID', '');
        this.setValue('de-txtIDITEMS', '');
        this.setValue('de-txtIDITEMT', '');
        this.setValue('de-txtINSTPLA', '');
        this.setValue('de-txtINSTPAY', '');
        this.setValue('de-txtINVORNBR', '');
        this.setValue('de-txtZONE', '');
        this.setValue('de-txtCOUNTRY', '');
        this.setValue('de-txtSTCON', '');
        this.setValue('de-txtFCONT', '');
        this.setValue('de-txtIDCON', '');
        this.setValue('de-txtCERRORHST', '');
        this.setValue('de-txtCERROIN', '');
        this.setValue('de-txtDES_CERROIN', '');
        this.setValue('de-txtFLAG', '');
        this.setValue('de-txtCERROR', '');
        this.setValue('de-txtDES_CERROR', '');
        this.setValue('de-txtFromDateBSUMDATE', '');
        this.setValue('de-txtBSUMDATE', '');
        this.setValue('de-txtTDOC', '');
        this.setValue('de-txtSPNR', '');
        this.setValue('de-txtBANDOC', '');
        this.setValue('de-txtCCUSTCC', '');
        this.setValue('de-txtSCARCODE', '');
        this.setValue('de-txtCODEBANK', '');
        this.setValue('de-txtSCARDN', '');
        this.setValue('de-txtSAUTHOC', '');
        this.setValue('de-txtSTVAL', '');
        this.setValue('de-txtQTYTKT', '');
        this.setValue('de-txtPCURRENCY', '');
        this.setValue('de-txtTGROSAMOUN', '0');
        this.setValue('de-txtdescFREGLA', '');
        this.setValue('de-txtVOID', '');
        this.setValue('de-txtSVFOP', '0');
        this.setValue('de-txtFADM', '');
        this.setValue('de-txtFREVERSA', '');
        this.setValue('de-txtFREVADM', '');
        this.setValue('de-txtDIFF_AMOUNT', '0');
        this.setValue('de-txtUSCR', '');
        this.setValue('de-txtFECR', '');
        this.setValue('de-txtHOCR', '');
        this.setValue('de-txtUSUP', '');
        this.setValue('de-txtFEUP', '');
        this.setValue('de-txtHOUP', '');
    },
    clear_keyDownHandler: function () {
        this.setValue('input-txtTKTScan1', '');
        this.setValue('txtCard11', '');
        this.setValue('txtCard22', '');
        this.setValue('txtApproval', '');
        this.setValue('txtFromDate', null);
        this.setValue('txtScanPNR', null);
        this.setValue('txtScanSAGENT', null);

    },
    clear_tableNormal: function () {
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataClear);

        let storeDataClearBl = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScanBlocked').bindStore(storeDataClearBl);

        let storeDataClearAdjustment = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-gridDataAdjustment').bindStore(storeDataClearAdjustment);
        this.sumAmount = 0;
        this.lstAdjustment = [];
        Ext.getCmp(prototype.id + '-gridDataAdjustment').hide();
        Ext.getCmp(prototype.id + '-panelADJ').hide();
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
    
    
    updateComent: function (){
        
        
        let valorComent = Ext.getCmp(prototype.id + '-cmbCOMENT').getValue();
         meDe.bean.CERROR = valorComent;
        console.log("CERROR enviado:", meDe.bean.CERROR); 
        
        
        
        Ext.Ajax.request({
            url: prototype.url + '/updateCERROR_BPO_revision',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(meDe.bean)},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    
                  var msj = res.mensaje;  
                  global.Msg({
                    msg: msj
                   });
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
                  Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});


                  


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
        
      
        

        let valorComent = Ext.getCmp(prototype.id + '-cmbCOMENT').getValue();
        console.log(valorComent,"visualkizar xxx");
        
        if (valorComent == "58" || valorComent == "59" || valorComent == "75" ||valorComent== "76" ||  valorComent==  "77" || valorComent==  "78"){
            
            
            
               Ext.Msg.show({
                    title: '.:Confirmation:.',
                    msg: 'Are you sure to Update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                           
                            this.updateComent();
                        }
                    }
                });
            
            
            
            
//            console.log("recibe comentario codigo");
            
        }else{
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

            var comment = Ext.getCmp(prototype.id + '-cmbCOMENT').getValue();
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
                Ext.getCmp(prototype.id + '-PanelComments').show();
                Ext.getCmp(prototype.id + '-COMENT_Forced').show();
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
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
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
        
        datos.DATEC = this.bean.DATEC;
        datos.TRANC = this.bean.TRANC;
        datos.CODPRO = this.bean.CODPRO;
        datos.TDOCORG = this.bean.TDOCORG;

        let beanReversa = JSON.stringify(datos);
        var cont;
//        return false;
        Ext.Ajax.request({
            url: prototype.url + '/reverseOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanReversa, option: option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    global.Msg({
                        msg: res.Mensaje,
                        icon: 1,
                        fn: function () {
                            Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
        
//        if (miGrilla) {
//            cont = this.desprocesarRegistros(miGrilla);
//            if (cont === 0) {
//
//                datos = this.desprocesarOnlyLiquidacion();
//                Ext.Ajax.request({
//                    url: prototype.url + '/reverseOptionOnlyLiq',
//                    method: 'POST',
//                    timeout: 60000000,
//                    params: {beanString: datos, option: option},
//                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
//                    success: function (response, opts) {
//                        Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
//                        var res = Ext.JSON.decode(response.responseText);
//                        if (res.success) {
//
//                            global.Msg({
//                                msg: res.Mensaje,
//                                icon: 1,
//                                fn: function () {
//                                    Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
//                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
//                                }
//                            });
//                        } else
//                            global.Msg({msg: res.sesion});
//                    },
//                    failure: function (response, opts) {
//                        console.log('server-side failure with status code ' + response.status);
//                        Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
//                    }
//                });
//
//            } else {
//                datos = this.desprocesarRegistros(miGrilla);
//                
//            }
//        } else {
//            console.error('No se pudo encontrar la grilla con el ID especificado.');
//        }
    },
    //</editor-fold>

    procesarRegistros: async function (grilla, miGrillaAdj) {

        let listaDeDatos = [];
        let ticketsOcupados = [];
        var cont = 0;
        let montoAjuste = 0;
        let cantidadAdj = 0;
        let beanValidationAdj = {}
        let amountMax = 0
        let amountMin = 0
        let isExistRange = false
        let codRejec = Ext.getCmp(prototype.id + '-cmbADJTYPE').getValue()
        beanValidationAdj.SCURRENCY = meDe.bean.SCURRENCY;
        try {
            const response = await new Promise((resolve, reject) => {
                Ext.Ajax.request({
                    url: prototype.url + '/validationAdj',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: Ext.JSON.encode(beanValidationAdj)},
                    success: function (response) {
                        resolve(response);
                    },
                    failure: function (response) {
                        reject(new Error('server-side failure with status code ' + response.status));
                    }
                });
            });

            var res = Ext.JSON.decode(response.responseText);
            if (res.success) {
                amountMax = res.result.MAXF2;
                amountMin = res.result.MINF2;
                if (!(amountMax === 0 && amountMin === 0)) {
                    isExistRange = true;
                }
            } else {
                global.Msg({msg: res.sesion});
            }

        } catch (error) {
            console.error(error.message);
            return false;
        }

        let isDiff = false;
        let agentSales = '';
        grilla.getStore().each(function (record, index) {
            let currentAgent = record.get('A720AGENTE');
            if (index === 0) {
                agentSales = currentAgent;
            } else if (currentAgent !== agentSales) {
                isDiff = true;
            }
        })

        grilla.getStore().each(function (record) {
            let registro = {
                PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(), // 
                SCARDN: record.get('A1531NREF'), // 
                SCARDNM: Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue(),
                SAUTHOCM: Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getValue(),
                SAUTHOC: record.get('A1531CAPL'),
                VFOP: Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, ''),
                SDATE: record.get('A720FECVTA'),
                TICKET: record.get('A1531TKT'),
                TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(),
                CERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(),
                CERROIN: Ext.getCmp(prototype.id + '-cmbADJTYPE').getValue(),
                CCUSTCC: Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue(),
                FREGLA: Ext.getCmp(prototype.id + '-de-txtIN_FREGLA').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                DATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue(),
                DATECI: Ext.getCmp(prototype.id + '-de-txtDATECI').getValue(),
                TRANCI: Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue(),
                SAGENT: isDiff === false ? record.get('A720AGENTE') : '',
                COREP: meDe.bean.COREP,
                CODPRO: meDe.bean.CODPRO,
                CCUSTPRO: meDe.bean.CCUSTPRO
            };
            if (record.get('STVAL') === '1' || record.get('STVAL') === '5') {
                ticketsOcupados.push(record.get('A1531TKT'));
                cont++;
            }
            listaDeDatos.push(registro);
        });

        if (miGrillaAdj && miGrillaAdj.getStore) {
            miGrillaAdj.getStore().each(function (record) {
                cantidadAdj++;
                montoAjuste = montoAjuste + record.get('A1531VFOP');
                let registro = {
                    ASTVAL: '1',
                    ATDOC: 'A',
                    ASCARCOD: record.get('A1531TTARJ'),
                    ASCARDN: record.get('A1531NREF'),
                    ASAUTHOC: record.get('A1531CAPL'),
                    ACURRENCY: record.get('A1531MFOP'),
                    AAMOUNT: record.get('A1531VFOP'),
                    ASDATE: record.get('A720FECVTA'),
                    APNR: record.get('A720PNR'),
                    ATICKET: record.get('A1531TKT'),
                    ASAGENT: record.get('A720AGENTE'),
                    ATRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(),
                    ACERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(),
                    ADJCODE: Ext.getCmp(prototype.id + '-cmbADJTYPE').getValue(),
                    CCUSTCC: Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue(),
                    FREGLA: Ext.getCmp(prototype.id + '-de-txtIN_FREGLA').getValue(),
                    BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                    CFUENTE: record.get('CFUENTE'),
                    ADATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue()
                };
                listaDeDatos.push(registro);
            });
        } else {
            console.error('La grilla o su tienda no están definidas correctamente.');
        }
        let validada = codRejec == "01"
        if (codRejec == "01" && isExistRange && !(montoAjuste >= amountMin && montoAjuste <= amountMax)) {
            return false;
        }
        let datosEnJSON = Ext.JSON.encode(listaDeDatos);
        if (cont > 0) {
            let mensaje = 'Errror. Blocked tickets:<br>' + ticketsOcupados.join('<br>');
            console.log(mensaje);
            return [];
        } else {
            return datosEnJSON;
        }
    },
    desprocesarRegistros: function (grilla) {
        let listaDeDatos = [];
        grilla.getStore().each(function (record) {
            let registro = {
                PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(),
                SAUTHOCM: Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getValue(),
                SAUTHOC: record.get('A1531CAPL'),
                SCARDNM: Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue(),
                SCARDN: record.get('A1531NREF'),
                VFOP: Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, ''),
                SDATE: record.get('A720FECVTA'),
                TICKET: record.get('A1531TKT'),
                TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(),
                CERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(),
                CCUSTCC: Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                DATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue()
            };
            console.log(registro);
            listaDeDatos.push(registro);
        });

        if (listaDeDatos.length === 0) {
            console.log('SIN FILAS, UPDATE ONLY LIQUID');
            return 0;
        } else {
            let datosEnJSON = Ext.JSON.encode(listaDeDatos);
            console.log('Datos en JSON:', datosEnJSON);
            return datosEnJSON;
        }
    },
    desprocesarOnlyLiquidacion: function () {
        let listaDeDatos = [];
        let registro = {
            PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(),
            SAUTHOCM: Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getValue(),
            SCARDNM: Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue(),
            VFOP: Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, ''),
            SDATE: Ext.getCmp(prototype.id + '-de-txtBSUMDATE').getValue(),
            TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(),
            CERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(),
            CCUSTCC: Ext.getCmp(prototype.id + '-de-txtCCUSTCC').getValue(),
            BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
            DATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue()
        };
        listaDeDatos.push(registro);
        let datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },
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
        Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
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
        Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
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
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
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
    allRefreshDataEntryAMDP: function () {
        if (this.bean.STVAL === '1' || this.bean.STVAL === '4' || this.bean.STVAL === '5') {
            console.log(this.bean.STVAL, 'this.bean.STVAL');
            this.onSearchCompleteDetail();
        } else {
            this.onSearchPendingDetail();
        }
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
    }
});

