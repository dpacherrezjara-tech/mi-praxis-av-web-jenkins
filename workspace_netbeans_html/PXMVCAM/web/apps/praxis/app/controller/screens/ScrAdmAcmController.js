Ext.define('Ext.Praxis.controller.screens.ScrAdmAcmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrAdmAcmController',
    meEle: "",
    p: '',
    bean: {},
    beanAccounting: {},
    beanResultSet01: {},
    modBack: '',
    fuente: '',
    strVTR: '',
    gloCcust: '',
    strVoid: '',
    nPosition1: 0,
    nPosition2: 0,
    nPosition3: 0,
    nPosition4: 0,
    filterTKT: {},
    listaTkts: new Array(),
    lstRest: new Array(),
    gridCpnDataAC: new Array(),
    lstAGTN: new Array(),
    A714: {},
    init: function(view) {
        meEle = this;
        this.p = view.params;
        prototype.AdmAcm = {
            id: 'ScrAdmAcmForm',
            url: CONTEXTPATH+'/ScrAdmAcm'
        };
    },
    afterRender: function() {
        this.startDisplay();
        //console.log(this.p);
        this.loadTicketAdmAcm(this.p.bean.IN_CCUST, this.p.bean.IN_CIA, this.p.bean.IN_FORMA, this.p.bean.IN_SERIE,this.p.bean.IN_SEQ);
    },
    startDisplay: function() {
        //Ext.getCmp(prototype.AdmAcm.id+'-boxCpnInfo').show();        
        
        //this.modBack = back;       
        
    },
    //<editor-fold defaultstate="collapsed" desc="result">
    
    onResultLoadTicketAdmAcm: function (res) {
        console.log(res.filterTKT);
        this.lstRest = res.filterTKT;
        if(this.lstRest.length > 0){
            //Ext.getCmp(prototype.AdmAcm.id+'-boxDataTktMemo').focus();
            var A714 = this.lstRest;
            
            //Ext.getCmp(prototype.AdmAcm.id+'-gridLeg').getStore().removeAll();
            var objRow = {};
            var objRowPar = {};
            //<editor-fold defaultstate="collapsed" desc="gridLegCTS">
            var listaRout = A714;
            this.gridCpnDataAC = new Array();
            for (var i = 0; i < listaRout.length; i++) {
                objRowPar = listaRout[i];
                objRow = {};
                win.setValue('txtCia', objRowPar.A714CIA);
                win.setValue('txtDocument', objRowPar.A714FORMA+objRowPar.A714SERIE);
                win.setValue('txtDCheq', objRowPar.A714DCHEQ);
                
                win.setValue('txtTransaction', objRowPar.A714TRNCU);
                win.setValue('txtTCamb', objRowPar.A714TCAMB);
                win.setValue('txtFopCode', objRowPar.A714CFOP);
                win.setValue('txtFopCur', objRowPar.A714MDAFP);
                win.setValue('txtFopAmt', objRowPar.A714VFOP);
                win.setValue('txtNetRemCurr', objRowPar.A714MNETR);
                win.setValue('txtNetRemAmt', objRowPar.A714VNETR);
                win.setValue('txtComCurr1', objRowPar.A714MDACOM);
                win.setValue('txtComAmt1', objRowPar.A714COMMIS);
                win.setValue('txtComCurr2', objRowPar.A714MDACM);
                win.setValue('txtComAmt2', objRowPar.A714TSCM);
                win.setValue('txtGrupoInfo', objRowPar.A714GRUPO);
                
                if(objRowPar.A714ORIG==="B") win.setValue('txtSource', "BSP");
                else if(objRowPar.A714ORIG==="A") win.setValue('txtSource', "ARC");
                else if(objRowPar.A714ORIG==="S") win.setValue('txtSource', "ASR");
                else if(objRowPar.A714ORIG==="M") win.setValue('txtSource', "MAN");
                else win.setValue('txtSource', "   ");
                
                win.setValue('txtPais', objRowPar.A714PAIS);
                win.setValue('txtIdFile', objRowPar.A714IDFIL);
                win.setValue('txtTDoc', objRowPar.A714TDOC);
                win.setValue('txtIssueDate', objRowPar.A714FECVTA);
                win.setValue('txtMdaLoc', objRowPar.A714MDARV);
                win.setValue('txtIataCode', objRowPar.A714AGENTE);
                win.setValue('txtCityVta', objRowPar.A714CIUVTA);
                win.setValue('txtCtryVta', objRowPar.A714PAIVTA);
                win.setValue('txtTarifCur', objRowPar.A714MDAFA);
                win.setValue('txtTarifAmt', objRowPar.A714FARE);
                win.setValue('txtTaxCode', objRowPar.A714CTAX);
                win.setValue('txtTaxCurr', objRowPar.A714MDATX);
                win.setValue('txtTaxAmt', objRowPar.A714TTAX);
                win.setValue('txtTaxComCurr', objRowPar.A714MDATC);
                win.setValue('txtTaxComAmt', objRowPar.A714TTXC);                
            }
            //</editor-fold>
            
        }
    },  
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="loadTicketAdmAcm">
    loadTicketAdmAcm: function (IN_CCUST, IN_CIA, IN_FORMA, IN_SERIE,IN_SEQ) {
        console.log(IN_CCUST);
        Ext.Ajax.request({
            url: prototype.AdmAcm.url+'/loadTicketAdmAcm',
            method: 'POST',
            timeout: 60000000,
            params: {IN_CCUST: IN_CCUST, IN_CIA: IN_CIA, IN_FORMA: IN_FORMA, IN_SERIE: IN_SERIE, IN_SEQ: IN_SEQ},
            beforerequest: Ext.getCmp('ScrAdmAcmForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstRest = res.filterTKT;
                    if(lstRest.length > 0){
                        meEle.onResultLoadTicketAdmAcm(res);
                    }
                    else global.Msg({msg: 'Data Not Found'});
                        
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrAdmAcmForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrAdmAcmForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    btnDeliveryAdm_clickHandler: function () {
        var bean = {};
        bean.TDNR = this.p.bean.IN_CIA+this.p.bean.IN_FORMA+this.p.bean.IN_SERIE;
	bean.FUENTE = win.getValue('txtSource');
        console.log('btnDeliveryAdm_clickHandler');
        if(bean.TDNR !== '' && bean.FUENTE !== ''){
            bean.A720TKVOID = "";//this.gloA720TKVOID;
            console.log(bean);
            this.searchDeliveryAdm(bean);
	}
    },
    btnAccountingAdm_clickHandler: function () {
        win.selectedChild('vskData', 'gridDataAccountingAdm');
        this.get_load_AccountingAdm();
    },
    get_load_AccountingAdm: function () {
        var params = {};
        if (win.getValue('txtFilterTicketFormSer').trim().length === 10) {
            //win.removeAll('gridDataAccountingAdm');
            this.beanAccounting.VP_A1716CCUST = '139';
            this.beanAccounting.VP_A1716CIA = win.getValue('txtFilterTicketCia');
            this.beanAccounting.VP_A1716FORMA = win.getValue('txtFilterTicketFormSer').substring(0, 4);
            this.beanAccounting.VP_A1716SERIE = win.getValue('txtFilterTicketFormSer').substring(4, 10);
            this.beanAccounting.VP_A1716SEQT = this.p.bean.IN_SEQ;	
            
            this.beanAccounting.VP_A1716SEQR = ""; //this.filterTKT.VP_A1716SEQR;	
            this.beanAccounting.VP_A1716SEQF = ""; //this.filterTKT.VP_A1716SEQF;	
            this.beanAccounting.VP_A1716SEQI = ""; //this.filterTKT.VP_A1716SEQI;	
            this.beanAccounting.VP_A1716SEQA = ""; //this.filterTKT.VP_A1716SEQA;	
            console.log('this.beanAccountingAdm');
            console.log(this.beanAccounting);
            params.beanAccounting = this.beanAccounting;
            Ext.create('Ext.Praxis.view.screens.ScrAccountingAdmForm', {
                id: 'ScrAccountingAdmForm',
                params: params
            }).show();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="loadAccountig">
    loadAccountigAdm: function (beanAccounting) {
        //Ext.getCmp(prototype.id+'-gridDataAccountingAdm').el.setStyle({height: '100%'});
        var me01 = this;
        Ext.Ajax.request({
            url: prototype.url+'/loadAccountig',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanAccounting)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function (response, opts) {
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) me01.onResultLoadAccountigAdm(res.lst_Accounting);
                else global.Msg({msg: "Bad Request"});
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDelivery">
    searchDeliveryAdm: function (bean) {
        console.log(prototype.ProrrateoNew.url + '/searchDeliveryMEMO');
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDeliveryMEMO',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var texto = res.strTextoBSP;
                    if(texto !== ''){
                        Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                            id: 'CtrlDeliveryOrigForm',
                            params: {
                                strTexto: texto,
                                strVoid: ''//me1.gloA720TKVOID
                            }
                        }).show();
                    }
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    onResultLoadAccountigAdm: function (gridDataTktAccountingAC) {
         try{
                console.log(gridDataTktAccountingAC);
                var fileBean = {};
                for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
                    fileBean = gridDataTktAccountingAC[i];
                    fileBean.A1530TCAMP = ""; //this.beanResultSet01.fileA1530.A1530TCAMP;
                    gridDataTktAccountingAC[i] = fileBean;
                }
                var typeRow;
                var bolHeader = false, bolRecord = false, bolTotal = false;
                for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
                    typeRow = this.getTypeRow(gridDataTktAccountingAC[i]);
                    switch(typeRow){
                        case 'H':
                            if (i === 0){
                                bolHeader = true;
                                bolRecord = false;
                                bolTotal = false;
                            }else{
                                if (bolHeader || bolRecord || bolTotal){
                                    gridDataTktAccountingAC.splice(i,1);
                                    i--;
                                }else{
                                    bolHeader = true;
                                    bolRecord = false;
                                    bolTotal = false;
                                }
                            }
                            break;
                        case 'R':
                            bolHeader = false;
                            bolRecord = true;
                            bolTotal = false;
                            break;
                        case 'T':
                            if (i === 0){
                                gridDataTktAccountingAC.splice(i,1);
                                i--;
                            }else{
                                if (!bolRecord){
                                    gridDataTktAccountingAC.splice(i,1);
                                    i--;
                                    if (bolHeader || bolTotal){
                                        gridDataTktAccountingAC.splice(i,1);
                                        i--;
                                    }
                                }
                            }
                            bolHeader = false;
                            bolRecord = false;
                            bolTotal = false;
                            break;
                        default:
                    }
                    if (i === gridDataTktAccountingAC.length - 1){
                        typeRow = this.getTypeRow(gridDataTktAccountingAC[i]);
                        if (typeRow === 'H'){
                            gridDataTktAccountingAC.splice(i,1);
                            i--;
                        }
                    }
                }
                Ext.getCmp(prototype.id+'-gridDataAccountingAdm').bindStore(
                    Ext.create("Ext.Praxis.store.program.GridData", { data: gridDataTktAccountingAC })
                );
        }catch(e){
            console.log(e);
        }
    },
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    },
    getTypeRow: function (fileBean) {
        var typeRow;
	fileBean.A1716SEQ = fileBean.A1716SEQ.trim();
	fileBean.A1716MODO = fileBean.A1716MODO.trim();
	fileBean.A1716CUENT = fileBean.A1716CUENT.trim();
	if(fileBean.A1716SEQ === ''){
            typeRow = 'H';
	}else if(fileBean.A1716SEQ !== '' && fileBean.A1716SEQ !== '--------'){
            typeRow = 'R';
	}else if(fileBean.A1716MODO === 'TOTAL'){
            typeRow = 'T';
	}else{
            typeRow = '';
	}
	return typeRow;
    },
    imgPrev_clickHandler_adm: function () {
        var me01 = this;
        win.setValue('lblRelatedTickets1_Adm', '');
        win.setValue('lblRelatedTickets2_Adm', '');
        win.setValue('lblRelatedTickets3_Adm', '');
        win.setValue('lblRelatedTickets4_Adm', '');        

        win.setValue('lblRelatedTickets1SEQ_Adm', '00');
        win.setValue('lblRelatedTickets2SEQ_Adm', '00');
        win.setValue('lblRelatedTickets3SEQ_Adm', '00');
        win.setValue('lblRelatedTickets4SEQ_Adm', '00');


        nPosition1=nPosition1-4;
        nPosition2=nPosition2-4;
        nPosition3=nPosition3-4;
        nPosition4=nPosition4-4;

        if(nPosition1<0)
        {
                nPosition1=0;
                nPosition2=1;
                nPosition3=2;
                nPosition4=3;
        }

        if(nPosition1 >= 0 && nPosition1<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition1];
                win.setValue('lblRelatedTickets1_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets1SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }
        if(nPosition2 >= 0 && nPosition2<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition2];
                win.setValue('lblRelatedTickets2_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets2SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }

        if(nPosition3 >= 0 && nPosition3<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition3];
                win.setValue('lblRelatedTickets3_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets3SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }

        if(nPosition4 >= 0 && nPosition4<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition4];
                win.setValue('lblRelatedTickets4_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets4SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }
    },
    imgNext_clickHandler_adm: function () {
        var me01 = this;
        if(nPosition1<0)
        {
                nPosition1=0;
                nPosition2=1;
                nPosition3=2;
                nPosition4=3;
        }
        else
        {
                nPosition1=nPosition1+4;
                nPosition2=nPosition2+4;
                nPosition3=nPosition3+4;
                nPosition4=nPosition4+4;
        }


        if(nPosition1>=me01.filterTKT.lstResultSet10.length) 
        {
                nPosition1=nPosition1-4;
                nPosition2=nPosition2-4;
                nPosition3=nPosition3-4;
                nPosition4=nPosition4-4;
                return;
        }

        win.setValue('lblRelatedTickets1_Adm', '');
        win.setValue('lblRelatedTickets2_Adm', '');
        win.setValue('lblRelatedTickets3_Adm', '');
        win.setValue('lblRelatedTickets4_Adm', '');        

        win.setValue('lblRelatedTickets1SEQ_Adm', '00');
        win.setValue('lblRelatedTickets2SEQ_Adm', '00');
        win.setValue('lblRelatedTickets3SEQ_Adm', '00');
        win.setValue('lblRelatedTickets4SEQ_Adm', '00');


        if(nPosition1 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition1];
                win.setValue('lblRelatedTickets1_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets1SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }
        if(nPosition2 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition2];
                win.setValue('lblRelatedTickets2_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets2SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }
        if(nPosition3 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition3];
                win.setValue('lblRelatedTickets3_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets3SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }

        if(nPosition4 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition4];
                win.setValue('lblRelatedTickets4_Adm',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets4SEQ_Adm',beanResultSet10.fileA1531.A1531SEQ730);
        }
    },
    imgSearchTKT_clickHandler_adm: function (cmp, a, event) {
        var p = '';
        switch (cmp.id) {
            case prototype.id+'-imgSearchTKT1_Adm': p = 'TKT1'; break;
            case prototype.id+'-imgSearchTKT2_Adm': p = 'TKT2'; break;
            case prototype.id+'-imgSearchTKT3_Adm': p = 'TKT3'; break;
            case prototype.id+'-imgSearchTKT4_Adm': p = 'TKT4'; break;
        }
	switch(p){
            case 'TKT1':
                if(win.getValue('lblRelatedTickets1_Adm').trim().length > 0 && win.getValue('lblRelatedTickets1_Adm').substr(0, 3) === '139'){
                    //this.imgSearch_clickHandler_adm();
                }
                break;
            case 'TKT2':
                if(win.getValue('lblRelatedTickets2_Adm').trim().length > 0 && win.getValue('lblRelatedTickets2_Adm').substr(0, 3) === '139'){
                    //this.imgSearch_clickHandler_adm();
                }
                break;
            case 'TKT3':
                if(win.getValue('lblRelatedTickets3_Adm').trim().length > 0 && win.getValue('lblRelatedTickets3_Adm').substr(0, 3) === '139'){
                    //this.imgSearch_clickHandler_adm();
                }
                break;
            case 'TKT4':
                if(win.getValue('lblRelatedTickets4_Adm').trim().length > 0 && win.getValue('lblRelatedTickets4_Adm').substr(0, 3) === '139'){
                    //this.imgSearch_clickHandler_adm();
                }
                break;
	}
    },
});