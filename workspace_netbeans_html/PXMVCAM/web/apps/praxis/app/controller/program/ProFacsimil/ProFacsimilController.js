Ext.define('Ext.Praxis.controller.program.ProFacsimil.ProFacsimilController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProFacsimilController',
    params: {},
    modBack: '',
    bean: {},
    beanA020: {},
    beanA728: {},
    lista: new Array(),
    beanFac: {},
    beanAccounting: {},
    init: function(view) {
        prototype.urlMasterTicket = CONTEXTPATH+'/ProMasterTicket';
//        prototype.ProFacsimil = {
//            id: 'ProFacsimilForm',
//            url: CONTEXTPATH+'/ProFacsimil',
//            urlMasterTicket: CONTEXTPATH+'/MasterTicket'
//        };
        prototype.Facsimil = {
            id: 'ProFacsimilForm',
            url: CONTEXTPATH+'/ProFacsimil'
//            ,urlMasterTicket: CONTEXTPATH+'/MasterTicket'
        };
    },
//    afterRender: function () {
////        this.startDisplay(JSON.parse(this.p.data), this.p.back);
//        this.startDisplay(this.view.params.data, "");
//    },
//    startDisplay: function (filter, back) {
    startDisplay: function() {
        this.modBack = this.params.modBack;
        if (this.params.filter !== undefined) {
            this.searchFacsimil(this.params.filter,'');
        }
    },
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function() {
        Ext.getCmp(prototype.id+'-gridDetFac').getStore().removeAll();
        this.imgClear_clickHandler();
        if (this.bean !== undefined) {
            if(this.bean.FUENTE === 'ARC'){
                Ext.getCmp(prototype.id+'-lblFuente').setText('ARC');
                Ext.getCmp(prototype.id+'-lblFUENTE2').setText('ARC');
            }else if(this.bean.FUENTE === 'ASR'){
                Ext.getCmp(prototype.id+'-lblFuente').setText('ASR');
                Ext.getCmp(prototype.id+'-lblFUENTE2').setText('ASR');
            } else{
                Ext.getCmp(prototype.id+'-lblFuente').setText('BSP');
                Ext.getCmp(prototype.id+'-lblFUENTE2').setText('BSP');
            }
            Ext.getCmp(prototype.id+'-lblPais').setText(this.bean.COUNTRY);
            Ext.getCmp(prototype.id+'-lblNomAer').setText(this.bean.strNomAero);
            Ext.getCmp(prototype.id+'-lblAgente').setText(this.bean.AGTN);
            Ext.getCmp(prototype.id+'-lblNomAgente').setValue(this.bean.strNombreAgente);
            Ext.getCmp(prototype.id+'-lblDirAgente').setValue(this.bean.strDirecAgente);
            Ext.getCmp(prototype.id+'-txtPeriod').setValue(this.bean.periodo);
            Ext.getCmp(prototype.id+'-txtOrigDest').setValue(this.bean.TODC.substring(0, 3)+' - '+this.bean.TODC.substring(3));
            Ext.getCmp(prototype.id+'-txtTicket').setValue(this.bean.TDNR.substring(0, 3)+' - '+this.bean.TDNR.substring(3));
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.id+'-txtEndors',
                html: this.bean.ENRS
            });
            Ext.getCmp(prototype.id+'-txtEndors').setValue(this.bean.ENRS);
            Ext.getCmp(prototype.id+'-txtDateIssue').setValue(this.bean.DAIS);
            Ext.getCmp(prototype.id+'-txtIssExc').setValue(this.bean.strIssExc);
            Ext.getCmp(prototype.id+'-txtPassenger').setValue(this.bean.PXNM);
            Ext.getCmp(prototype.id+'-txtFareCal').setValue(this.bean.FRCA);
            Ext.getCmp(prototype.id+'-txtORIN').setValue(this.bean.ORIN);
            Ext.getCmp(prototype.id+'-txtTourC').setValue(this.bean.TOUR);
            
            Ext.getCmp(prototype.id+'-gridDetFac').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.bean.lstReg63 })
            );
            if(this.bean.lstReg63 !== undefined && this.bean.lstReg63.length > 0){
                var b63 = this.bean.lstReg63[0];
                Ext.getCmp(prototype.id+'-txtBookRef').setValue(b63.RBKD);
            }
            var Fare = this.bean.FARE.trim();
            var EqFare = this.bean.EQFR.trim();
            var Total = this.bean.TOTL.trim();

            var mon = '';
            var amt = '';
            //Fare ================================================
            if(Fare !== ''){
                try{
                    for(var f = 0; f < Fare.length; f++){
                        if(!this.esNumero(Fare.substring(f, f+1))){
                            mon += Fare.substring(f, f+1);
                        }else{
                            amt += Fare.substring(f, f+1);
                        }
                    }
                    Ext.getCmp(prototype.id+'-txtFareCurr').setValue(mon);
                    if(this.bean.FUENTE.trim() === 'ARC' || this.bean.FUENTE.trim() === 'A'){
                        Ext.getCmp(prototype.id+'-txtFareCurr').setValue(this.bean.CUTP1);
                    }
                    Ext.getCmp(prototype.id+'-txtFare').setValue(Ext.util.Format.number(amt, '0,000.00'));
                }catch(e){
                    Ext.getCmp(prototype.id+'-txtFare').setValue(Ext.util.Format.number(Fare, '0,000.00'));
                }
            }
            //Eq.Fare =============================================
            if(EqFare !== ''){
                try{
                    var dig2 = EqFare.substring(0, 1);
                    if(dig2 != '1' && dig2 != '2' && dig2 != '3' && dig2 != '4' && dig2 != '5'
                             && dig2 != '6' && dig2 != '7' && dig2 != '8' && dig2 != '9'){
                         Ext.getCmp(prototype.id+'-txtEquivFaCurr').setValue(EqFare.substring(0, 3));
                         Ext.getCmp(prototype.id+'-txtEquivFa').setValue(Ext.util.Format.number(EqFare.substring(3), '0,000.00'));
                    }else{
                        Ext.getCmp(prototype.id+'-txtEquivFa').setValue(Ext.util.Format.number(EqFare, '0,000.00'));
                    }
                }catch(e){
                    Ext.getCmp(prototype.id+'-txtEquivFa').setValue(Ext.util.Format.number(EqFare, '0,000.00'));
                }
            }

            //Armando Los Taxes ============================
            var lstTaxes = this.bean.lstTaxes;
            var Tax1 = '';
            var esC = false;
            var cur = '';
            var monto = '';
            var tax = '';
            for(var i = 0; i < lstTaxes.length; i++){
                Tax1 = lstTaxes[i].trim();
                monto = '';
                cur = '';
                tax = '';
                for(var x = 0; x < Tax1.length; x++){
                    if(Tax1.substring(x, x+1) != ' '){
                        if(!this.esNumero(Tax1.substring(x, x+1))){
                            if(x==0){
                                esC = true;
                            }
                            if(esC){
                                cur += Tax1.substring(x, x+1);
                            }else{
                                tax += Tax1.substring(x, x+1);
                            }
                        }else{
                            monto += Tax1.substring(x, x+1);
                            esC = false;
                        }
                    }
                }
                if(i == 0){
                    //txtTaxes.text = 'Tax 1: '+lstTaxes.getItemAt(i);
                    Ext.getCmp(prototype.id+'-txtTaxes').setValue('Tax 1: '+cur+' '+Ext.util.Format.number(monto, '0,000.00')+' '+tax);
                }else{
                    //txtTaxes.text += '\nTax '+(i+1)+': '+lstTaxes.getItemAt(i);
                    Ext.getCmp(prototype.id+'-txtTaxes').setValue(Ext.getCmp(prototype.id+'-txtTaxes').getValue()+'\nTax '+(i+1)+': '+cur+' '+Ext.util.Format.number(monto, '0,000.00')+' '+tax);
                }
            }

            //Total ==================================================
            if(Total != ''){
                try{
                    var dig6 = Total.substring(0, 1);
                    if(dig6 != '1' && dig6 != '2' && dig6 != '3' && dig6 != '4' && dig6 != '5'
                             && dig6 != '6' && dig6 != '7' && dig6 != '8' && dig6 != '9'){
                        Ext.getCmp(prototype.id+'-txtTotalCurr').setValue(Total.substring(0, 3));
                        Ext.getCmp(prototype.id+'-txtTotal').setValue(Ext.util.Format.number(Total.substring(3), '0,000.00'));
                    }else{					
                        if(this.bean.FUENTE.trim() == 'ARC' || this.bean.FUENTE.trim() == 'A'){
                            Ext.getCmp(prototype.id+'-txtTotalCurr').setValue(this.bean.CUTP1);
                        }
                        Ext.getCmp(prototype.id+'-txtTotal').setValue(Ext.util.Format.number(Total, '0,000.00'));
                    }
                }catch(e){
                    Ext.getCmp(prototype.id+'-txtTotal').setValue(Ext.util.Format.number(Total, '0,000.00'));
                }
            }
            Ext.getCmp(prototype.id+'-txtFormPay').setValue(this.bean.FPIN);
            Ext.getCmp(prototype.id+'-txtCash').setValue(this.bean.strCash);
            Ext.getCmp(prototype.id+'-txtCredit').setValue(this.bean.strCredit);
            Ext.getCmp(prototype.id+'-lblVD').setText(this.bean.strVD);
            Ext.getCmp(prototype.id+'-lblOthers').setText(this.bean.strOthers);
            Ext.getCmp(prototype.id+'-txtCIA').setValue(this.bean.TDNR.substring(0, 3));
            Ext.getCmp(prototype.id+'-txtFS').setValue(this.bean.TDNR.substring(3));
            Ext.getCmp(prototype.id+'-txtConj').setValue(this.bean.strConjuncion);
            Ext.getCmp(prototype.id+'-txtCOBL').setValue(this.bean.COBL);
        } else {
            global.Msg({msg: 'An error has ocurred. Please call our System Department.'});
        }
        this.IxC();
    },
    IxC: function() {
        Ext.getCmp(prototype.id+'-txtA020KEY').setValue(this.beanA020.A020NROPRT.trim());
        Ext.getCmp(prototype.id+'-txtTicket').setValue(this.beanA020.strTicket.trim().substring(0, 3)+' '+this.beanA020.strTicket.trim().substring(3, 13)+' '+this.beanA020.strTicket.trim().substring(13));
        Ext.getCmp(prototype.id+'-txtTicket2').setValue(this.beanA020.strTicket.trim().substring(0, 3)+' '+this.beanA020.strTicket.trim().substring(3, 13)+' '+this.beanA020.strTicket.trim().substring(13));
        Ext.getCmp(prototype.id+'-txtA020GRUPO').setValue(this.beanA020.A020GRUPO.trim());
        Ext.getCmp(prototype.id+'-txtA728FECVTA').setValue(this.beanA728.A728FECVTA.trim());
        Ext.getCmp(prototype.id+'-txtA020FRECHA').setValue(this.beanA020.A020FRECHA.trim());
        Ext.getCmp(prototype.id+'-txtA020SDATE').setValue(this.beanA020.A020SDATE.trim());
        Ext.getCmp(prototype.id+'-txtA728CTYEMI').setValue(this.beanA728.A728CTYEMI.trim());
        Ext.getCmp(prototype.id+'-txtA728CTYVTA').setValue(this.beanA728.A728CTYVTA.trim());
        Ext.getCmp(prototype.id+'-txtA728CODIT').setValue(this.beanA728.A728CODIT.trim());
        Ext.getCmp(prototype.id+'-txtA020USER').setValue(this.beanA020.A020USER.trim());
        Ext.getCmp(prototype.id+'-txtA020PSTRF').setValue(this.beanA020.A020PSTRF.trim());
        Ext.getCmp(prototype.id+'-txtA728ATBP').setValue(Ext.util.Format.number(this.beanA728.A728ATBP, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA728MDAATB').setValue(this.beanA728.A728MDAATB.trim());
        Ext.getCmp(prototype.id+'-txtA020TUSO').setValue(this.beanA020.A020TUSO.trim());
        Ext.getCmp(prototype.id+'-cmbA728IPLUS').setValue(this.beanA728.A728IPLUS.trim());
        Ext.getCmp(prototype.id+'-txtA728CPLUSS').setValue(Ext.util.Format.number(this.beanA728.A728CPLUSS, '0,000.00'));
        //================================================
        Ext.getCmp(prototype.id+'-txtA020TCALC').setValue(this.beanA020.A020TCALC.trim());
        Ext.getCmp(prototype.id+'-txtA020TARIFA').setValue(Ext.util.Format.number(this.beanA020.A020TARIFA, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA020FAREUS').setValue(Ext.util.Format.number(this.beanA020.A020FAREUS, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA020QSEG').setValue(Ext.util.Format.number(this.beanA020.A020QSEG, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA728CODTAX').setValue(this.beanA728.A728CODTAX.trim());
        Ext.getCmp(prototype.id+'-txtA728TDESC').setValue(this.beanA728.A728TDESC.trim());
        Ext.getCmp(prototype.id+'-txtA728PORDES').setValue(Ext.util.Format.number(this.beanA728.A728PORDES, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA728CSOVER').setValue(Ext.util.Format.number(this.beanA728.A728CSOVER, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA728QSOVER').setValue(Ext.util.Format.number(this.beanA728.A728QSOVER, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA020ACEPTA').setValue(Ext.util.Format.number(this.beanA020.A020ACEPTA, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA020COMISP').setValue(Ext.util.Format.number(this.beanA020.A020COMISP, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA050TUA').setValue(Ext.util.Format.number(this.beanA020.A050TUA, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA050OVRISC').setValue(Ext.util.Format.number(this.beanA020.A050OVRISC, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA050OVRAMT').setValue(Ext.util.Format.number(this.beanA020.A050OVRAMT, '0,000.00'));
        Ext.getCmp(prototype.id+'-txtA050FCONTA').setValue(this.beanA020.A050FCONTA.trim());
        Ext.getCmp(prototype.id+'-txtA050AIRLIN3').setValue(this.beanA020.A050AIRLI3.trim());
        Ext.getCmp(prototype.id+'-txtDES_BAIR').setValue(this.beanA020.DES_BAIR.trim());
        Ext.getCmp(prototype.id+'-txtA050FVUELO').setValue(this.beanA020.A050FVUELO.trim());
        Ext.getCmp(prototype.id+'-txtA050NVUELO').setValue(this.beanA020.A050NVUELO.trim());
        Ext.getCmp(prototype.id+'-txtA050RUTVOL').setValue(this.beanA020.A050RUTVOL.trim());
        Ext.getCmp(prototype.id+'-txtA050FBILLED').setValue(this.beanA020.A050FBILLE.trim());
        Ext.getCmp(prototype.id+'-txtA050QPAX').setValue(Ext.util.Format.number(this.beanA020.A050QPAX, '0,000'));
        Ext.getCmp(prototype.id+'-txtA050CRTR').setValue(this.beanA020.A050CRTR.trim());
        Ext.getCmp(prototype.id+'-txtA020COMISI').setValue(Ext.util.Format.number(this.beanA020.A020COMISI, '0,000.00'));
        
        Ext.getCmp(prototype.id+'-txtA728SECDS').setValue(this.beanA728.A728SECOR.trim()+' - '+this.beanA728.A728SECDS.trim());
        Ext.getCmp(prototype.id+'-txtA728RUTORG').setValue(this.beanA728.A728RUTORG.trim());
        Ext.getCmp(prototype.id+'-txtA728FBASE1').setValue(this.beanA728.A728FBASE1.trim());
        Ext.getCmp(prototype.id+'-txtA728LOHO').setValue(this.beanA728.A728LOHO.trim());
        Ext.getCmp(prototype.id+'-txtA020NETO').setValue(Ext.util.Format.number(this.beanA020.A020NETO, '0,000.00'));
        
        Ext.getCmp(prototype.id+'-gridData').bindStore(
            Ext.create("Ext.Praxis.store.flown.GridData", { data: this.lista })
        );
    },
    //</editor-fold>
    viewLeg: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        if(data.strLeg == 'Y' && this.bean != undefined && this.bean.TDNR != ''){
            this.searchA1897Leg(this.bean.TDNR.substring(0, 3), this.bean.TDNR.substring(3, 7), this.bean.TDNR.substring(7), data.CDGT);
	} else{
            global.Msg({msg: 'Data Not Found.'});
	}
    },
//    post_to_url: function(path, params, method, id) {
//        method = method || "post";
//
//        var form = document.createElement("form");
//        form.setAttribute("method", method);
//        form.setAttribute("action", path);
//        form.setAttribute("id", id);
//
//        document.body.appendChild(form);
//        form.submit();
//    },
//    onMaskclick: function() {
//        this.view.close();
//    },
    //<editor-fold defaultstate="collapsed" desc="button">
    btnMasterIndex_clickHandler: function() {
        this.beanFac.TDNR = Ext.getCmp(prototype.id+'-txtTicket').getValue().replace(' ', '');
        if(this.beanFac.TDNR !== ''){
//            Ext.create('Ext.Praxis.view.program.ProFacsimilForm.DataEntry', {
//                id: 'DataEntryProFacsimilForm',
//                params: {
//                    actionCode: 'S',
//                    bean: this.beanFac
//                }
//            }).show();
            var SrcMasterIndexForm = Ext.create('Ext.Praxis.view.screens.SrcMasterIndexForm', { id: 'SrcMasterIndexForm' });
            var controller = SrcMasterIndexForm.getController();
            controller.bean = this.beanFac;
            controller.actionCode = 'S';
            SrcMasterIndexForm.show();
        } else {
            global.Msg({msg: 'Master Index Data not found.'});
        }
    },
    btnAccounting_clickHandler: function() {
        Ext.getCmp(prototype.id+'-boxDataAccounting').show();
        if(Ext.getCmp(prototype.id+'-txtTicket').getValue().trim().replace(' ','').replace(' ','').length === 14){
            this.beanAccounting.VP_A1716CCUST = '139';
            this.beanAccounting.VP_A1716CIA = Ext.getCmp(prototype.id+'-txtTicket').getValue().substring(0, 3);
            this.beanAccounting.VP_A1716FORMA = Ext.getCmp(prototype.id+'-txtTicket').getValue().substring(4, 8);
            this.beanAccounting.VP_A1716SERIE = Ext.getCmp(prototype.id+'-txtTicket').getValue().substring(8, 14);
            this.beanAccounting.VP_A1716SEQT = '00';	
            this.loadAccountig(this.beanAccounting);
        }
    },
    imgBack_clickHandler: function () {
        win.backPrograma(this.params.back);
//        this.view.close();
////        history.go(-1);
//        if(this.modBack === 'ViewTicket'){
////		Application.application.displayProMaterTicket();
//	}else if(this.modBack === 'FlownOAL'){
////		Application.application.displayFlownOAL();
//	}else if(this.modBack === 'FlightConciliation'){
//            var nameSpace = this.modBack+"Form";
//            var contentPanel = Ext.getCmp('App-main-contenedor');
//            var cmps = contentPanel.items.items;
//            for (var i = 0; i < cmps.length; i++) {
//                cmps[i].hide();
//                console.log(cmps[i]);
//            }
//            for (var i = 0; i < cmps.length; i++) {
//                var id2 = cmps[i].id.substring(0, cmps[i].id.indexOf('-'));
//                if (nameSpace === id2) {
//                    var controller = cmps[i].getController();
//                    controller.init();
//                    Ext.getCmp('App-main').getController().mostrarContenedor();
//                    cmps[i].show();
//                    break;
//                }
//            }
////            this.post_to_url(CONTEXTPATH+'/Home?'
////               +'ticket='+this.p.ticket+'&'
////               +'backBox='+this.p.backBox
////               +'#flown-flight-conciliation-form', {}, 'post', 'FlightConciliationForm');
//	}else if(this.modBack === 'PassengerConciliation'){
////		Application.application.displayAccounting();
//	}else if(this.modBack === 'PassInv'){
////		Application.application.displayBwrPassengerInv();
////		Application.application.lblUser_toolTip('Estructura: SFI020');
//	}
    },
    btnNucRoe_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    imgPrev_clickHandler: function () {
        if(Ext.getCmp(prototype.id+'-txtConj').getValue() !== '' && Ext.getCmp(prototype.id+'-txtTicket').getValue() !== ''){
		
            var tkt = Ext.getCmp(prototype.id+'-txtTicket').getValue().replace(' - ', '');
            var conj = '';

            if(this.bean.lstConj !== undefined && this.bean.lstConj.length > 0 && this.bean.lstConj[0] !== tkt){

                for(var p = 1; p < this.bean.lstConj.length; p++){
                    if(this.bean.lstConj[p] === tkt){
                        conj = this.bean.lstConj[p-1];
                        break;
                    }
                }
                if(conj !== ''){
                    this.imgClear_clickHandler();
                    var bean104 = {};
                    bean104.FUENTE = this.bean.FUENTE;
                    bean104.TDNR = this.bean.TDNR;
                    bean104.COUNTRY = this.bean.COUNTRY;
                    bean104.HRED = this.bean.HRED;
                    this.searchFacsimil(bean104, this.bean.FUENTE);
                }		
            }
	}
    },
    imgNext_clickHandler: function () {
        if(Ext.getCmp(prototype.id+'-txtConj').getValue() !== '' && Ext.getCmp(prototype.id+'-txtTicket').getValue() !== ''){
		
            var tkt = Ext.getCmp(prototype.id+'-txtTicket').getValue().replace(' - ', '');
            var conj = '';

            if(this.bean.lstConj !== undefined && this.bean.lstConj.length > 0){

                for(var p = 0; p < this.bean.lstConj.length - 1; p++){
                    if(this.bean.lstConj[p] === tkt){
                        conj = this.bean.lstConj[p+1];
                        break;
                    }
                }
                if(conj !== ''){
                    this.imgClear_clickHandler();
                    var bean104 = {};
                    bean104.FUENTE = this.bean.FUENTE;
                    bean104.TDNR = this.bean.TDNR;
                    bean104.COUNTRY = this.bean.COUNTRY;
                    bean104.HRED = this.bean.HRED;
                    this.searchFacsimil(bean104, this.bean.FUENTE);
                }		
            }
	}
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="searchFacsimil">
    searchFacsimil: function(filter, strFuente) {
        Ext.Ajax.request({
            url: prototype.url+'/searchFacsimil',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(filter), strFuente: strFuente},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, opts){
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if(res.beanFaximil !== undefined) {
                        me.bean = res.beanFaximil;
                        me.beanA020 = res.dataA020;
                        me.beanA728 = res.dataA728;
                        me.lista = res.lstSectores;
                        Ext.getCmp(prototype.id+'-lblTicket').setText(me.bean.TDNR.substring(0, 3)+'  '+me.bean.TDNR.substring(3)+'  '+me.bean.CDGT);
                        me.mostrarData();
                    } else {
                        global.Msg({msg: 'Data not Found.'});
                    }
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadAccountig">
    loadAccountig: function(beanAccounting) {
        console.log('prototype.urlMasterTicket:'+prototype.urlMasterTicket);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.urlMasterTicket+'/loadAccountig',
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanAccounting)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        console.log('begin grid');
                        console.log(res.lst_Accounting);
                        Ext.getCmp(prototype.id+'-gridDataAccounting').bindStore(
                            Ext.create("Ext.Praxis.store.program.GridData", { data: res.lst_Accounting })
                        );
                console.log('end grid');
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        //Ext.getCmp(prototype.id+'-gridDataAccounting').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchA1897Leg">
    searchA1897Leg: function(ccia, forma, serie, cupon) {
        Ext.Ajax.request({
            url: prototype.url+'/searchA1897Leg',
            method: 'POST',
            timeout: 60000000,
            params: {ccia: ccia, forma: forma, serie: serie, cupon: cupon},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, opts){
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lista = res.lstLegs;
                    console.log(lista);
                    if (lista !== undefined) {
                        
                    }
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    
    imgClear_clickHandler: function() {
        Ext.getCmp(prototype.id+'-lblAgente').setText('');
        Ext.getCmp(prototype.id+'-lblNomAgente').setValue('');
        Ext.getCmp(prototype.id+'-lblDirAgente').setValue('');
        Ext.getCmp(prototype.id+'-txtPeriod').setValue('');
        Ext.getCmp(prototype.id+'-txtOrigDest').setValue('');
        Ext.getCmp(prototype.id+'-txtTicket').setValue('');
        new Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtEndors',
            html: ''
        });
        Ext.getCmp(prototype.id+'-txtEndors').setValue('');
        Ext.getCmp(prototype.id+'-txtDateIssue').setValue('');
        Ext.getCmp(prototype.id+'-txtIssExc').setValue('');
        Ext.getCmp(prototype.id+'-txtPassenger').setValue('');
        Ext.getCmp(prototype.id+'-txtFareCal').setValue('');
        Ext.getCmp(prototype.id+'-txtFareCurr').setValue('');
        Ext.getCmp(prototype.id+'-txtFare').setValue('');
        Ext.getCmp(prototype.id+'-txtEquivFaCurr').setValue('');
        Ext.getCmp(prototype.id+'-txtEquivFa').setValue('');
        Ext.getCmp(prototype.id+'-txtTaxes').setValue('');
        Ext.getCmp(prototype.id+'-txtTotalCurr').setValue('');
        Ext.getCmp(prototype.id+'-txtTotal').setValue('');
        Ext.getCmp(prototype.id+'-txtFormPay').setValue('');
        Ext.getCmp(prototype.id+'-txtCash').setValue('');
        Ext.getCmp(prototype.id+'-txtCredit').setValue('');
        Ext.getCmp(prototype.id+'-lblVD').setText('');
        Ext.getCmp(prototype.id+'-txtCIA').setValue('');
        Ext.getCmp(prototype.id+'-txtFS').setValue('');
        Ext.getCmp(prototype.id+'-txtCK').setValue('');
        Ext.getCmp(prototype.id+'-txtConj').setValue('');
        
        Ext.getCmp(prototype.id+'-gridDetFac').getStore().removeAll();
    },
    
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
});
