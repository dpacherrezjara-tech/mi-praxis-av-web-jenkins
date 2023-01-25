/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryTktController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idSale + '-dataEntryTktController',
    url: CONTEXTPATH + '/SalesReport',
    meDET: '',
    seq: '',
    ORIG:'',
    exch: '',
    revCurr: 'USD',
    locCurr: '',
    cant: 0,
    callmodo: '',
    paramsDET: {},
    paramsProrrate: {},
    /**
     * Constructor
     */
    init: function (view) {
        meDET = this;
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH + '/ScrProrrateoNew'
        };
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    afterRender: function () { // global.AccessControlMaganer();
        var params = this.view.params;
        var mode = params.mode;
        meDET.callmodo = mode;
        if(mode==='POPUP')
        {
            console.log('call:getDataInputsPopUp');
            prototype.id='ProMasterTicketForm';
            this.getDataInputsPopUp();
        }
        else {
            console.log('call:getDataInputs');
            prototype.id='SalesReportForm';
            this.getDataInputs();
        }   
    },
    getDataInputs: function () {
        var p = this.view.params;
        var bean = p.rec.data;
        var IN_AIRLIN = '139';
        var IN_CIA = bean.A720CIA;
        var IN_FORMA = bean.DOCUMENTO.substr(0, 4);
        var IN_SERIE = bean.DOCUMENTO.substr(4, 6);
        var A720SEQ = bean.A720SEQ;
        meDET.exch = Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue();
        meDET.locCurr = Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue();

        // meDET.exch = Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue();
        // meDET.locCurr = Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue();
        seq = A720SEQ;
        paramsDET = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A720SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicketDataEntry',
            method: 'POST',
            timeout: 60000000,
            params: paramsDET,
            beforerequest: Ext.getCmp(prototype.idSale + '-DataEntryTkt-center').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log('prototype.url:'+prototype.url);
                var lstTKT = res.lstTKT;
                var lstTKTGrilla = res.lstTKTGrilla;
                meDET.setValues(lstTKT, lstTKTGrilla);
                // Ext.getCmp(prototype.idSale + '-dataEntryTkt').unmask('Loading...', '');
            }
        });
    },
    getDataInputsPopUp: function () {
        var p = this.view.params;
        var bean = p.rec.data;
        var IN_AIRLIN = '139';
        var IN_CIA = bean.A720CIA;
        var IN_FORMA = bean.DOCUMENTO.substr(0, 4);
        var IN_SERIE = bean.DOCUMENTO.substr(4, 6);
        var A720SEQ = bean.A720SEQ;
        //meDET.exch = Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue();
        //meDET.locCurr = Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue();

        seq = A720SEQ;
        paramsDET = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A720SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicketDataEntry',
            method: 'POST',
            timeout: 60000000,
            params: paramsDET,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res.lstTKTGrilla);
                var lstTKT = res.lstTKT;
                var lstTKTGrilla = res.lstTKTGrilla;
                meDET.setValues(lstTKT, lstTKTGrilla);                
            }
        });
    },
    setValues: function (lstTKT, lstTKTGrilla) {
        var file;
        var fileGrilla;
        if (lstTKT.length > 0) {
            file = lstTKT[0];
            Ext.getCmp(prototype.idSale + '-det-lblCia').setValue(file.A720CIAI);
            Ext.getCmp(prototype.idSale + '-det-lblDocumento').setValue(file.A720FORMAI + file.A720SERIEI);
            Ext.getCmp(prototype.idSale + '-det-lblDigito').setValue(file.A720DCHEQ);
            Ext.getCmp(prototype.idSale + '-det-lblTransaction').setValue(file.A720TRNCU);
            Ext.getCmp(prototype.idSale + '-det-lblDocType').setValue(file.A720TDOC);
            Ext.getCmp(prototype.idSale + '-det-lblConjuction').setValue(file.A720FLAG);
            Ext.getCmp(prototype.idSale + '-det-lblBoleto').setValue(Ext.util.Format.number(file.A720NSEQ, '0,000'));
            Ext.getCmp(prototype.idSale + '-det-lblTotBoleto').setValue(Ext.util.Format.number(file.A720CTKTC, '0,000'));
            Ext.getCmp(prototype.idSale + '-det-lblTransactionNbr').setValue(file.A720TRNN);
            Ext.getCmp(prototype.idSale + '-det-lblSeq').setValue(file.A720TRNSQ);
            Ext.getCmp(prototype.idSale + '-det-lblIata').setValue(file.A720AGENTE);
            Ext.getCmp(prototype.idSale + '-det-lblTourCode').setValue(file.A720CODIT);
            Ext.getCmp(prototype.idSale + '-det-lblFareCur').setValue(file.A720MONEDA);
            Ext.getCmp(prototype.idSale + '-det-lblEQVCur').setValue(file.A720MDAPAG);
            Ext.getCmp(prototype.idSale + '-det-lblDiscountCur').setValue(file.A720MDDS);
            Ext.getCmp(prototype.idSale + '-det-lblQCur').setValue(file.A720MDATQ);
            Ext.getCmp(prototype.idSale + '-det-lblExchangeRate').setValue(meDET.exch);
            Ext.getCmp(prototype.idSale + '-det-lblLocalCur').setValue(meDET.locCurr);
            Ext.getCmp(prototype.idSale + '-det-lblGroup').setValue(file.A720GRUPO);
            Ext.getCmp(prototype.idSale + '-det-lblFileId').setValue(file.A720IDFIL);
            Ext.getCmp(prototype.idSale + '-det-lblFare').setValue(Ext.util.Format.number(file.A720TARIFA, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblEQV').setValue(Ext.util.Format.number(file.A720TRFPAG, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblDiscount').setValue(Ext.util.Format.number(file.A720VDSCT, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblQ').setValue(Ext.util.Format.number(file.A720TQ, '0,000.00'));
            if (file.ERRORDESC !== '' && file.A720STAT !== '1' && file.A720STAT !== '4') {
                Ext.getCmp(prototype.idSale + '-det-lblError').setText(file.ERRORDESC);
            } else {
                Ext.getCmp(prototype.idSale + '-det-lblError').setText('');
            }
            if (file.A720ORIG === 'A')
                file.A720ORIG = 'ARC';
            if (file.A720ORIG === 'B')
                file.A720ORIG = 'BSP';
            if (file.A720ORIG === 'S')
                file.A720ORIG = 'ASR';
            if (file.A720ORIG === 'M')
                file.A720ORIG = 'MAN';
            meDET.ORIG=file.A720ORIG;    
            Ext.getCmp(prototype.idSale + '-det-lblSource').setValue(file.A720ORIG + '-' + file.A720PAIS);
            Ext.getCmp(prototype.idSale + '-det-lblIssueDate').setValue(file.A720FECVTA);
            Ext.getCmp(prototype.idSale + '-det-lblPax').setValue(file.A720PAX);
            Ext.getCmp(prototype.idSale + '-det-lblType').setValue(file.A720TPAX);
            Ext.getCmp(prototype.idSale + '-det-lblFARE2Cur').setValue(file.A720MDAFA);
            Ext.getCmp(prototype.idSale + '-det-lblADCCur').setValue(file.A720MDAAD);
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALCur').setValue(file.A720MDAOR);
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALCOMCur').setValue(file.A720MDAOR);
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALOVERCOMCur').setValue(file.A720MDAOR);
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALYQCur').setValue(file.A720MDAOR);
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALIVACur').setValue(file.A720MDAOR);
            Ext.getCmp(prototype.idSale + '-det-lblPAXDIFFCur').setValue(file.A720MDADF);
            Ext.getCmp(prototype.idSale + '-det-lblOtherIncomenCur').setValue(file.A720MDAOI);
            Ext.getCmp(prototype.idSale + '-det-lblPAXDIFF').setValue(Ext.util.Format.number(file.A720DIFPX, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblFARE2').setValue(Ext.util.Format.number(file.A720FARE, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblADC').setValue(Ext.util.Format.number(file.A720ADC, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblORIGINAL').setValue(Ext.util.Format.number(file.A720ORIGEX, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALCOM').setValue(Ext.util.Format.number(file.A720ORCMEX, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALOVERCOM').setValue(Ext.util.Format.number(file.A720ORSCEX, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALYQ').setValue(Ext.util.Format.number(file.A720ORYQEX, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblORIGINALIVA').setValue(Ext.util.Format.number(file.A720ORIVEX, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblOtherIncomen').setValue(Ext.util.Format.number(file.A720OING, '0,000.00'));
            Ext.getCmp(prototype.idSale + '-det-lblVoucherReason').setValue(file.A720VRIC);
            Ext.getCmp(prototype.idSale + '-det-lblFFOP').setValue(file.A720FLAGTN);
            if (file.A720TRNCU === 'EXCH') {
                Ext.getCmp(prototype.idSale + '-det-btnBalance').show();
                Ext.getCmp(prototype.idSale + '-det-gridEXCH').show();
                //Ext.getCmp(prototype.idSale + '-det-totales').show();
                meDET.loadExchange(file);
            } else {
                Ext.getCmp(prototype.idSale + '-det-btnBalance').hide();
                Ext.getCmp(prototype.idSale + '-det-gridEXCH').hide();
                //Ext.getCmp(prototype.idSale + '-det-totales').hide();
            }
            if (file.A720TDOC.substr(0, 3) === 'EMD') {
                Ext.getCmp(prototype.idSale + '-det-panelGridEMD').show();
                meDET.loadEMD(file);
            } else {
                Ext.getCmp(prototype.idSale + '-det-panelGridEMD').hide();
            }
            if (lstTKTGrilla.length > 0) {
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstTKTGrilla,
                    autoLoad: true
                });
                Ext.getCmp(prototype.idSale + '-det-gridDetCpn').bindStore(storeData);

                fileGrilla = lstTKTGrilla[0];
                meDET.revCurr = fileGrilla.A720MDARV.trim();
                Ext.getCmp(prototype.idSale + '-det-lblTotalCpnCur').setValue(fileGrilla.A720MONREG);
                Ext.getCmp(prototype.idSale + '-det-lblTotalQCur').setValue(fileGrilla.A720MONREG);
                //Ext.getCmp(prototype.idSale + '-det-lblTotalYQCur').setValue(fileGrilla.A720MONREG);

                var totalCpn = 0.00;
                var totalQ = 0.00;
                //var totalYQ:Number = 0.00;
                for (var i = 0; i < lstTKTGrilla.length; i++) {
                    totalCpn = totalCpn + lstTKTGrilla[i].CPN;
                    totalQ = totalQ + lstTKTGrilla[i].Q;
                    //totalYQ =  totalYQ + S0007A720Filter(lstTKTGrilla.getItemAt(i)).YQ;
                }
                Ext.getCmp(prototype.idSale + '-det-lblTotalCpn').setValue(Ext.util.Format.number(totalCpn, '0,000.00'));
                Ext.getCmp(prototype.idSale + '-det-lblTotalQ').setValue(Ext.util.Format.number(totalQ, '0,000.00'));
                Ext.getCmp(prototype.idSale + '-det-lblTotalYQ').setValue(Ext.util.Format.number(fileGrilla.A720TYQRV, '0,000.00'));
                Ext.getCmp(prototype.idSale + '-det-lblTotalIVA').setValue(Ext.util.Format.number(fileGrilla.A720TTIVRV, '0,000.00'));
                Ext.getCmp(prototype.idSale + '-det-lblTotalCOM').setValue(Ext.util.Format.number(fileGrilla.A720TTCMRV, '0,000.00'));
                Ext.getCmp(prototype.idSale + '-det-lblTotalOVERCOM').setValue(Ext.util.Format.number(fileGrilla.A720TTSCRV, '0,000.00'));
            }
            
            Ext.getCmp(prototype.idSale + '-panelDetalles').hide();
            if (file.A720TKVOID === 'V'){
                Ext.getCmp(prototype.idSale + '-panelDetalles').show();
                /*var img = new Ext.XTemplate('<img src="{src}">');
                var images = [
                   {src:'resources/img/icon/void.png'}
                   //{src:'https://s3.amazonaws.com/quizzpot/images/202-materialdesign_introduction.png'},
                   //{src:'https://s3.amazonaws.com/quizzpot/images/184-grunt.png'}
                ];
                //var newImage = images[Math.floor(Math.random()*3)];
                var newImage = images[0]; width="500" height="110"
                img.overwrite(Ext.getCmp(prototype.idSale + '-panelDetalles').body,newImage);*/
                Ext.getCmp(prototype.idSale + '-panelDetalles').body.update('<img src="resources/img/icon/void.png"  />');
            }
            
            var IN_TIPOCAP = '';
            var IN_STATUS = '';
            if(meDET.callmodo==='POPUP'){
                IN_TIPOCAP = 'A';
                IN_STATUS = 'CLOSED';
            }else{
                IN_TIPOCAP = Ext.getCmp(prototype.idGr + '-de-lblCapture').getValue().substr(0, 1);
                IN_STATUS = Ext.String.trim(Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue());
            }
            
            var IN_ERROR = Ext.getCmp(prototype.idSale + '-det-lblError').text;
            paramsProrrate = {
                IN_TIPOCAP: IN_TIPOCAP,
                IN_AIRLIN: file.A720AIRLIN,
                IN_GRUPO: file.A720GRUPO,
                IN_CIA: file.A720CIAI,
                IN_FORMA: file.A720FORMAI,
                IN_SERIE: file.A720SERIEI,
                IN_SEQ: file.A720SEQ,
                IN_FTE: file.A720ORIG,
                IN_TRX: file.A720TRNCU,
                IN_EDITABLE: false,
                IN_TCAMB: meDET.exch,
                IN_REVENUE: meDET.revCurr,
                IN_STATUS: IN_STATUS,
                IN_ERROR: IN_ERROR,
                IN_TDOC: Ext.String.trim(Ext.getCmp(prototype.idSale + '-det-lblDocType').getValue()),
                IN_ISSUEDATE: file.A720FECVTA,
                IN_CUPON1: '',
                IN_CUPON2: '',
                IN_CUPON3: '',
                IN_CUPON4: '',
                IN_FORCE: '',
                IN_IDFIL: file.A720IDFIL
            };

            Ext.Ajax.request({
                url: prototype.url + '/loadTotales',
                method: 'POST',
                timeout: 60000000,
                params: {
                    A720CIAI: file.A720CIAI,
                    A720FORMAI: file.A720FORMAI,
                    A720SERIEI: file.A720SERIEI,
                    A720SEQ: file.A720SEQ
                },
                //beforerequest: Ext.getCmp(prototype.idSale + '-dataEntryTkt').mask('Loading...', ''),
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var lst = res.lstTot;
                    if (lst.length > 0) {
                        var file2 = lst[0];
                        Ext.getCmp(prototype.idSale + '-det-lblFOPCur').setValue(file2.FOPCUR);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCur').setValue(file2.TAXCUR);
                        Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONCur').setValue(file2.COMMCUR);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONCur').setValue(file2.TAXCOMMCUR);
                        Ext.getCmp(prototype.idSale + '-det-lblFOP').setValue(Ext.util.Format.number(file2.FOP, '0,000.00'));
                        Ext.getCmp(prototype.idSale + '-det-lblTAX').setValue(Ext.util.Format.number(file2.TAX, '0,000.00'));
                        Ext.getCmp(prototype.idSale + '-det-lblCOMMISION').setValue(Ext.util.Format.number(file2.COMM, '0,000.00'));
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSION').setValue(Ext.util.Format.number(file2.TAXCOMM, '0,000.00'));
                        meDET.loadRubros(file);
                    }
                    // Ext.getCmp(prototype.idSale + '-dataEntryTkt').unmask('Loading...', '');
                }
            });
        }
    },
    loadExchange: function (file) {
        Ext.Ajax.request({
            url: prototype.url + '/loadExchange',
            method: 'POST',
            timeout: 60000000,
            params: {
                A720CIAI: file.A720CIAI,
                A720FORMAI: file.A720FORMAI,
                A720SERIEI: file.A720SERIEI,
                A720SEQ: file.A720SEQ
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstEXCH = res.lstEXCH;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstEXCH,
                    autoLoad: true
                });
                Ext.getCmp(prototype.idSale + '-det-gridEXCH').bindStore(storeData);
            }
        });
    },
    loadEMD: function (file) {
        Ext.Ajax.request({
            url: prototype.url + '/loadEMD',
            method: 'POST',
            timeout: 60000000,
            params: {
                A720CIAI: file.A720CIAI,
                A720FORMAI: file.A720FORMAI,
                A720SERIEI: file.A720SERIEI,
                A720SEQ: file.A720SEQ
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstEMD = res.lstEMD;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstEMD,
                    autoLoad: true
                });
                Ext.getCmp(prototype.idSale + '-det-gridEMD').bindStore(storeData);
            }
        });
    },
    loadRubros: function (file) {
        Ext.Ajax.request({
            url: prototype.url + '/loadRubros',
            method: 'POST',
            timeout: 60000000,
            params: {
                A720CIAI: file.A720CIAI,
                A720FORMAI: file.A720FORMAI,
                A720SERIEI: file.A720SERIEI,
                A720SEQ: file.A720SEQ
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_FOP = res.lstTKT_FOP;
                var lstTKT_TAX = res.lstTKT_TAX;
                var lstTKT_COMM = res.lstTKT_COMM;
                var lstTKT_TAXCOMM = res.lstTKT_TAXCOMM;
                var lstTKT_FC = res.lstTKT_FC;
                var lstTKT_FCR = res.lstTKT_FCR;

                var file1;
                var file2;
                var file3;
                var file4;
                var file5;
                var file6;

                Ext.getCmp(prototype.idSale + '-det-lblRemmittance').setValue('0.00');
                Ext.getCmp(prototype.idSale + '-det-lblFOPOther').setValue('0.00');
                var fopother = 0.00;
                for (var y = 0; y < lstTKT_FOP.length; y++) {
                    file1 = lstTKT_FOP[y];
                    if (file1.A1531CORRL === "01") {
                        Ext.getCmp(prototype.idSale + '-det-lblFOPCode1').setValue(file1.A1531CFOP);
                        Ext.getCmp(prototype.idSale + '-det-lblCardType1').setValue(file1.A1531TTARJ);
                        Ext.getCmp(prototype.idSale + '-det-lblRefNumber1').setValue(file1.A1531NREF);
                        Ext.getCmp(prototype.idSale + '-det-lblFOPCur1').setValue(file1.A1531MFOP);
                        Ext.getCmp(prototype.idSale + '-det-lblFOP1').setValue(Ext.util.Format.number(file1.A1531VFOP, '0,000.00'));
                    }
                    if (file1.A1531CORRL === "02") {
                        Ext.getCmp(prototype.idSale + '-det-lblFOPCode2').setValue(file1.A1531CFOP);
                        Ext.getCmp(prototype.idSale + '-det-lblCardType2').setValue(file1.A1531TTARJ);
                        Ext.getCmp(prototype.idSale + '-det-lblRefNumber2').setValue(file1.A1531NREF);
                        Ext.getCmp(prototype.idSale + '-det-lblFOPCur2').setValue(file1.A1531MFOP);
                        Ext.getCmp(prototype.idSale + '-det-lblFOP2').setValue(Ext.util.Format.number(file1.A1531VFOP, '0,000.00'));
                    }
                    if (file1.A1531CORRL !== "01" && file1.A1531CORRL !== "02" && file1.A1531TFOP !== "EX") {
                        fopother += file1.A1531VFOP;
                    }
                    if (fopother !== 0) {
                        Ext.getCmp(prototype.idSale + '-det-lblFopOtherCur').setValue(Ext.getCmp(prototype.idSale + '-det-lblFOPCur1').getValue());
                        Ext.getCmp(prototype.idSale + '-det-lblFOPOther').setValue(Ext.util.Format.number(fopother, '0,000.00'));
                    }
                    if (file1.A1531CFOP === "CA" && Ext.getCmp(prototype.idSale + '-det-lblRemmittanceCur').getValue().trim() === '') {
                        Ext.getCmp(prototype.idSale + '-det-lblRemmittanceCur').setValue(file1.A1531MNETR);
                        Ext.getCmp(prototype.idSale + '-det-lblRemmittance').setValue(Ext.util.Format.number(file1.A1531VNETR, '0,000.00'));
                    }
                }

                Ext.getCmp(prototype.idSale + '-det-lblTAXOther').setValue('0.00');
                var taxother = 0.00;
                for (var y = 0; y < lstTKT_TAX.length; y++) {
                    file2 = lstTKT_TAX[y];
                    if (file2.A1532CORRL === "01") {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCode1').setValue(file2.A1532CTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCur1').setValue(file2.A1532MTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblPFC1').setValue(file2.A1532APFC);
                        Ext.getCmp(prototype.idSale + '-det-lblTAX1').setValue(Ext.util.Format.number(file2.A1532VTAX, '0,000.00'));
                    }
                    if (file2.A1532CORRL === "02") {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCode2').setValue(file2.A1532CTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCur2').setValue(file2.A1532MTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblPFC2').setValue(file2.A1532APFC);
                        Ext.getCmp(prototype.idSale + '-det-lblTAX2').setValue(Ext.util.Format.number(file2.A1532VTAX, '0,000.00'));
                    }
                    if (file2.A1532CORRL === "03") {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCode3').setValue(file2.A1532CTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCur3').setValue(file2.A1532MTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblPFC3').setValue(file2.A1532APFC);
                        Ext.getCmp(prototype.idSale + '-det-lblTAX3').setValue(Ext.util.Format.number(file2.A1532VTAX, '0,000.00'));
                    }
                    if (file2.A1532CORRL === "04") {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCode4').setValue(file2.A1532CTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCur4').setValue(file2.A1532MTAX);
                        Ext.getCmp(prototype.idSale + '-det-lblPFC4').setValue(file2.A1532APFC);
                        Ext.getCmp(prototype.idSale + '-det-lblTAX4').setValue(Ext.util.Format.number(file2.A1532VTAX, '0,000.00'));
                    }
                    if (file2.A1532CORRL !== "01" && file2.A1532CORRL !== "02" && file2.A1532CORRL !== "03" && file2.A1532CORRL !== "04") {
                        taxother += file2.A1532VTAX;
                    }
                    if (taxother !== 0) {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXOtherCur').setValue(Ext.getCmp(prototype.idSale + '-det-lblTAXCur1').getValue());
                        Ext.getCmp(prototype.idSale + '-det-lblTAXOther').setValue(Ext.util.Format.number(taxother, '0,000.00'));
                    }
                }

                Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONOther').setValue('0.00');
                var commother = 0.00;
                var commcur = '';
                for (var y = 0; y < lstTKT_COMM.length; y++) {
                    file3 = lstTKT_COMM[y];
                    if (file3.A1533TIPO === "CS") {
                        if (Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONCur1').getValue().trim() === '') {
                            Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONRate1').setValue(Ext.util.Format.number(file3.A1533RATE, '0,000.00'));
                            Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONCur1').setValue(file3.A1533MCOM);
                            Ext.getCmp(prototype.idSale + '-det-lblCOMMISION1').setValue(Ext.util.Format.number(file3.A1533VCOM, '0,000.00'));
                            commcur = file3.A1533MCOM;
                        } else {
                            commother += file3.A1533VCOM;
                        }
                    }
                    if (file3.A1533TIPO === "CO") {
                        if (Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONCur2').getValue().trim() === '') {
                            Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONRate2').setValue(Ext.util.Format.number(file3.A1533RATE, '0,000.00'));
                            Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONCur2').setValue(file3.A1533MCOM);
                            Ext.getCmp(prototype.idSale + '-det-lblCOMMISION2').setValue(Ext.util.Format.number(file3.A1533VCOM, '0,000.00'));
                            commcur = file3.A1533MCOM;
                        } else {
                            commother += file3.A1533VCOM;
                        }
                    }
                    if (commother !== 0) {
                        Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONCurOther').setValue(commcur);
                        Ext.getCmp(prototype.idSale + '-det-lblCOMMISIONOther').setValue(Ext.util.Format.number(commother, '0,000.00'));
                    }
                }

                Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONOther').setValue('0.00');
                var taxcommother = 0.00;
                for (var y = 0; y < lstTKT_TAXCOMM.length; y++) {
                    file4 = lstTKT_TAXCOMM[y];
                    if (file4.A1534CORRL === "01") {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONCode1').setValue(file4.A1534CTCOM);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONRate1').setValue(Ext.util.Format.number(file4.A1534RATE, '0,000.00'));
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONCur1').setValue(file4.A1534MTXC);
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSION1').setValue(Ext.util.Format.number(file4.A1534VTXC, '0,000.00'));
                    }
                    if (file4.A1534CORRL !== "01") {
                        taxcommother += file4.A1534VTXC;
                    }
                    if (taxcommother !== 0) {
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONOtherCur').setValue(Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONCur1').getValue());
                        Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSIONOther').setValue(Ext.util.Format.number(taxcommother, '0,000.00'));
                    }
                }

                if (lstTKT_FC.length > 0) {
                    var strTexto = '';
                    for (var j = 0; j < lstTKT_FC.length; j++) {
                        file5 = lstTKT_FC[j];
                        strTexto += file5.A1721FRCA;
                    }
                    Ext.getCmp(prototype.idSale + '-det-lblReference').setValue(strTexto);
                }

                if (lstTKT_FCR.length > 0) {
                    var strTexto2 = '';
                    for (var k = 0; k < lstTKT_FCR.length; k++) {
                        file6 = lstTKT_FCR[k];
                        strTexto2 += file6.A1721FRCA;
                    }
                    Ext.getCmp(prototype.idSale + '-det-lblRelated').setValue(strTexto2);
                }
                Ext.getCmp(prototype.idSale + '-DataEntryTkt-center').unmask('Loading...', '');
            }
        });

    },
    onFareCalc: function (obj) {
        var lblDocumento = Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        if (lblDocumento !== '') {
            var DataEntryFareCalc = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalc', {
                id: prototype.idSale + '-dataEntyFareCalc',
                params: paramsDET
            });
            DataEntryFareCalc.show();
        }
    },
    onChangeTab: function (obj) {
        var idTab = obj.id;
        meDET.cant++;
        if (Ext.getCmp(idTab).getActiveTab().id === 'SalesReportFormSale-det-tabProrrateo' && meDET.cant === 1) {
            Ext.getCmp(prototype.idSale + '-widget-prorrate').setParam(paramsProrrate);
        }
    },
    onClickSearchFOP: function (obj) {
        //console.clear();
        var id = obj.id;
        var lblFOP = Ext.getCmp(prototype.idSale + '-det-lblFOP').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        if (lblFOP !== '' && lblFOP.text !== '0.00' && lblDocumento !== '') {
            //console.log(paramsDET);
            var DataEntryFOP = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryFOP', {
                id: prototype.idSale + '-dataEntyFOP',
                params: paramsDET
            });
            DataEntryFOP.show();
        }
    },
    onClickSearchTAX: function (obj) {
        var lblTAX = Ext.getCmp(prototype.idSale + '-det-lblTAX').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        if (lblTAX !== '' && lblTAX.text !== '0.00' && lblDocumento !== '') {
            var DataEntryTAX = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAX', {
                id: prototype.idSale + '-dataEntyTAX',
                params: paramsDET
            });
            DataEntryTAX.show();
        }
    },
    onClickSearchCOMM: function (obj) {
        var lblCOMM = Ext.getCmp(prototype.idSale + '-det-lblCOMMISION').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        if (lblCOMM !== '' && lblCOMM.text !== '0.00' && lblDocumento !== '') {
            var DataEntryCOMM = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryCOMM', {
                id: prototype.idSale + '-dataEntyCOMM',
                params: paramsDET
            });
            DataEntryCOMM.show();
        }
    },
    onClickSearchTAXCOMM: function (obj) {
        var lblTAXCOMM = Ext.getCmp(prototype.idSale + '-det-lblTAXCOMMISSION').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        if (lblTAXCOMM !== '' && lblTAXCOMM.text !== '0.00' && lblDocumento !== '') {
            var DataEntryTAXCOMM = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXCOMM', {
                id: prototype.idSale + '-dataEntyTAXCOMM',
                params: paramsDET
            });
            DataEntryTAXCOMM.show();
        }
    },
    onEditClickEXCH: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var dataEntryExchange = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryExch', {
            id: prototype.idSale + '-dataEntryExch',
            params: {
                rec: rec,
                A720CIAI: Ext.getCmp(prototype.idSale + '-det-lblCia').getValue(),
                A720FORMAI: Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().substr(0, 4),
                A720SERIEI: Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().substr(4, 6),
                A720SEQ: seq
            }
        });
        dataEntryExchange.show();
    },
    onBalance: function () {
        console.log('prototype.idSale:'+prototype.idSale);
        var lblDocumento = Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        if (lblDocumento !== '') {
            var DataEntryBalance = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryBalance', {
                id: prototype.idSale + '-dataEntyBalance',
                params: paramsDET
            });
            DataEntryBalance.show();
        }
    },
    onFacsimil: function () {
        /*if(Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim() !== ''){
         var params = {};
         
         var bean104 = {};
         bean104.FUENTE = Ext.getCmp(prototype.idSale + '-det-lblSource').getValue().trim().substr(0,3);
         bean104.TDNR = Ext.getCmp(prototype.idSale + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
         bean104.AGTN = Ext.getCmp(prototype.idSale + '-det-lblIata').getValue().trim();
         
         params.bean = bean104;
         params.typeModal = 'FACSIMIL';
         Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
         id: 'ScrProrrateoNewForm',
         params: params
         }).show();
         }*/

        prototype.idFacsimil = prototype.idSale + 'compFacsimil';
        var viewFacsimil = Ext.create('Ext.Praxis.view.program.ProFacsimilForm.FacsimilNew', {
            id: prototype.idSale + '-facsimilComponent',
            params: paramsProrrate
        });
        viewFacsimil.show();
    },
    onProrrate: function () {
        /*if(Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim() !== ''){
         var params = {};
         
         var bean104 = {};
         bean104.FUENTE = Ext.getCmp(prototype.idSale + '-det-lblSource').getValue().trim().substr(0,3);
         bean104.TDNR = Ext.getCmp(prototype.idSale + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
         bean104.AGTN = Ext.getCmp(prototype.idSale + '-det-lblIata').getValue().trim();
         
         params.bean = bean104;
         params.strVoid = '';//this.gloA720TKVOID;
         params.typeModal = 'PRORATE';
         Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
         id: 'ScrProrrateoNewForm',
         params: params
         }).show();
         }*/
        prototype.idProrrate = prototype.idSale + 'compProrrate';
        var viewProrate = Ext.create('Ext.Praxis.view.program.ProrrateoForm.ProrrateoNew', {
            id: prototype.idSale + '-widget-prorratewin',
            params: paramsProrrate
        });
        //viewProrate.setParam(paramsProrrate);
        viewProrate.show();
    },
    onDelivery: function () {
        var bean = {};
        bean.TDNR = Ext.getCmp(prototype.idSale + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idSale + '-det-lblDocumento').getValue().trim();
        bean.FUENTE = meDET.ORIG;//Ext.getCmp(prototype.idSale + '-det-lblSource').getValue().trim().substr(0, 3);
        if (bean.TDNR !== '' && bean.FUENTE !== '') {
            bean.A720TKVOID = '';//this.gloA720TKVOID;
            this.searchDelivery(bean);
        }
    },
    searchDelivery: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDelivery',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var texto = res.strTextoBSP;
                    if (texto !== '') {
                        Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                            id: 'CtrlDeliveryOrigForm',
                            params: {
                                strTexto: texto,
                                strVoid: ''//me1.gloA720TKVOID
                            }
                        }).show();
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});


