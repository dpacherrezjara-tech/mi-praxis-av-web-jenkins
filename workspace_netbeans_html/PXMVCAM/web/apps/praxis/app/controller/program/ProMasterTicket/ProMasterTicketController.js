Ext.define('Ext.Praxis.controller.program.ProMasterTicket.ProMasterTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProMasterTicketController',
    dataEntry: Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntry', {id: 'DataEntryProMasterTicketForm'} ),
    dataEntryADM: Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryADM', {id: 'DataEntryADMProMasterTicketForm'} ),             
    ACT_VIEW_BY_TKT: 'ACT_VIEW_BY_TKT',
    ACT_VIEW_BY_TKT_ADM: 'ACT_VIEW_BY_TKT_ADM',
    SELECT_BY_TKT_1: 'TKT',
    SELECT_BY_TKT_2: 'TKT2',
    SELECT_BY_PAX: 'PAX',
    SELECT_BY_PNR: 'PNR',
    SELECT_BY_CC: 'CC',    
    params: {},
    bean: {},
    beanSabre: {},
    filterPax: {},
    beanResultSet01: {},
    actionCode: win.DE_ACT_VIEW,
    actionCode2: '',
    nPosition1: 0,
    nPosition2: 0,
    nPosition3: 0,
    nPosition4: 0,
    PERMC: 'N',
//    TicketNumber: '',
    beanAccounting: {},
    gloA720TKVOID: '',
    filterTKT: {},
    filterTKTSeq: {},
    URL_VIEWTICKET : '',
    gridDataMemoAC: [],
    gridDataTktRealUsesAC: [],
    init: function (view) {
//        this.bean.IN_CIA  = '139';
//        this.bean.IN_FORMA= this.TicketNumber.substr(0,4); 
//        this.bean.IN_SERIE= this.TicketNumber.substr(4,6);			
//        this.bean.IN_SEQ = this.TicketNumber.substr(10,2);
        URL_VIEWTICKET = prototype.url;
        this.imgClear_clickHandler();
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH+'/ScrProrrateoNew'
        };
    },
    afterRender: function() {
        console.log(me);
        this.startDisplay();
    },
    startDisplay: function() {
        console.log('PERMC');
        console.log(userAccess);
        console.log(optionSelect);
        $.each(userAccess, function(x, y) {
            if (y.NPROG === optionSelect.nprog) {                
                PERMC = y.PERMC;
                console.log('Access:'+PERMC);
            }
        });
        
        if (this.params.actionCode !== undefined && this.params.bean !== undefined) {
            this.actionCode = this.params.actionCode;
            this.bean = this.params.bean;
        }
        if(this.actionCode==='WorkProgAudit'){
            Ext.getCmp(prototype.id+'-btnADM').show();
	}else{
            Ext.getCmp(prototype.id+'-btnADM').hide();
	}
        if (this.actionCode===this.ACT_VIEW_BY_TKT) {
            win.setValue('cbxSelectBy', 'TKT');
            this.cbxSelectBy_closeHandler();
            win.setValue('txtFilterTicketFormSer', this.bean.IN_FORMA+this.bean.IN_SERIE);
            win.setValue('txtFilterTicketSeq', this.bean.IN_SEQ);
            this.limpiarData();
            this.execSearch();
            this.controlLight();
        } else if (this.actionCode===this.ACT_VIEW_BY_TKT_ADM) {
            win.setValue('cbxSelectBy', 'ADM');
            this.cbxSelectBy_closeHandler();
            win.setValue('txtFilterTicketFormSer', this.bean.IN_FORMA+this.bean.IN_SERIE);
            win.setValue('txtFilterTicketSeq', this.bean.IN_SEQ);
            this.limpiarData();
            this.execSearch();
            this.controlLight();
        } else if (this.actionCode === 'ViewDashboard' || this.actionCode === 'ViewConciliation' || this.actionCode === 'BankConciliation' || this.actionCode === 'BoomerConciliation'  || this.actionCode === 'Unmatched' 
		|| this.actionCode === 'VIEWTICKET_FOR_BWRMASTERTICKET' || this.actionCode === 'ViewBalance' || this.actionCode === 'ABValues' || this.actionCode === 'ViewRedempPLM' || this.actionCode === 'ViewDOT' 
		|| this.actionCode === 'ViewDBNew' || this.actionCode === 'ANTI_FRAUD_REFUND' || this.actionCode === 'DETERMINATE_OF_COMMISSION' || this.actionCode ==='ViewProMatchTkt'
		|| this.actionCode === 'IntConciliation' || this.actionCode === 'DuplicACCB' || this.actionCode === 'WorkProgAudit' || this.actionCode === 'VIEW_ERROR_MSN'
		|| this.actionCode === 'VIEW_INFO_SALE_RFND' || this.actionCode === 'VIEW_TRANSACTION_CARD' || this.actionCode === 'VIEW_TRANSACTION_RFND' 
		|| this.actionCode === 'RequestedBank' || this.actionCode === 'LinkBank' || this.actionCode === 'ViewValuesOUT' || this.actionCode === 'ViewControlFigures' || this.actionCode === 'ViewFlightConciliation' 
                || this.actionCode === 'ViewDuplicateACCB' || this.actionCode === 'PassengerInvoicesIP' || this.actionCode === 'InterlineVsSalesController' || this.actionCode === 'Dashboard1' || this.actionCode === 'PendingAccountingCoupons' 
                || this.actionCode === 'AbnormalValue') {
            win.setValue('cbxSelectBy', 'TKT');
            this.cbxSelectBy_closeHandler();
            win.setValue('txtFilterTicketCia', this.bean.IN_CIA);
            win.setValue('txtFilterTicketFormSer', this.bean.IN_FORMA+this.bean.IN_SERIE);
            //if(this.bean.IN_SEQ==="") this.bean.IN_SEQ = "00";
            if(this.bean.IN_SEQ!=="") win.setValue('txtFilterTicketSeq', this.bean.IN_SEQ);
            
            //this.loadTicket(this.bean);
            this.loadTicketSeq(this.bean);
        } else {
            this.imgBrowser_clickHandler();
        }
        console.log(this.bean);
        //this.imgSearch_clickHandler();
        global.clear();
        //this.controlLight();
    },
    startDisplayFromBrowser: function() {
        console.log('PERMC');
        console.log(userAccess);
        console.log(optionSelect);
        $.each(userAccess, function(x, y) {
            if (y.NPROG === optionSelect.nprog) {                
                PERMC = y.PERMC;
                console.log('Access:'+PERMC);
            }
        });
        
        if (this.params.actionCode !== undefined && this.params.bean !== undefined) {
            this.actionCode = this.params.actionCode;
            this.bean = this.params.bean;
        }
        if(this.actionCode==='WorkProgAudit'){
            Ext.getCmp(prototype.id+'-btnADM').show();
	}else{
            Ext.getCmp(prototype.id+'-btnADM').hide();
	}
        if (this.actionCode===this.ACT_VIEW_BY_TKT) {
            win.setValue('cbxSelectBy', 'TKT');
            this.cbxSelectBy_closeHandler();
            win.setValue('txtFilterTicketFormSer', this.bean.IN_FORMA+this.bean.IN_SERIE);
            win.setValue('txtFilterTicketSeq', this.bean.IN_SEQ);
            this.limpiarData();
            this.execSearch();
            this.controlLight();
        } else if (this.actionCode===this.ACT_VIEW_BY_TKT_ADM) {
            win.setValue('cbxSelectBy', 'ADM');
            this.cbxSelectBy_closeHandler();
            win.setValue('txtFilterTicketFormSer', this.bean.IN_FORMA+this.bean.IN_SERIE);
            win.setValue('txtFilterTicketSeq', this.bean.IN_SEQ);
            this.limpiarData();
            this.execSearch();
            this.controlLight();
        } else if (this.actionCode === 'VIEWTICKET_FOR_BWRMASTERTICKET' ) {
            win.setValue('cbxSelectBy', 'TKT');
            this.cbxSelectBy_closeHandler();
            win.setValue('txtFilterTicketCia', this.bean.IN_CIA);
            win.setValue('txtFilterTicketFormSer', this.bean.IN_FORMA+this.bean.IN_SERIE);
            win.setValue('txtFilterTicketSeq', this.bean.IN_SEQ);
            this.loadTicket(this.bean);
        }
        global.clear();
        //this.controlLight();
    },
    cbxSelectBy_closeHandler: function(field, eOpts) {
        
        switch (win.getValue('cbxSelectBy')) {
            case 'TKT':
                this.cleanFilter();
                this.limpiarData();
                Ext.getCmp(prototype.id+'-boxFilterByTKT').show();
                Ext.getCmp(prototype.id+'-boxFilterByPAX').hide();
                this.actionCode2 = this.SELECT_BY_TKT_2;
                win.focus('txtFilterTicketFormSer');
                break;
            case 'PAX':
                this.cleanFilter();
                this.limpiarData();
                Ext.getCmp(prototype.id+'-boxFilterByTKT').hide();
                Ext.getCmp(prototype.id+'-boxFilterByPAX').show();
                Ext.getCmp(prototype.id+'-lblPaxResults').hide();
                Ext.getCmp(prototype.id+'-cbxFilterPassengerName').hide();
                Ext.getCmp(prototype.id+'-lblTicketsFound').hide();
                Ext.getCmp(prototype.id+'-txtFilterTicketCia0').hide();
                Ext.getCmp(prototype.id+'-cbxFilterTicket').hide();
                win.focus('txtFilterPassengerName');
                
                this.actionCode2 = this.SELECT_BY_PAX;
                this.imgBrowser_clickHandler();
                break;
            case 'PNR':
                this.cleanFilter();
                this.limpiarData();
                Ext.getCmp(prototype.id+'-boxFilterByTKT').show();
                Ext.getCmp(prototype.id+'-boxFilterByPAX').hide();
                win.focus('txtFilterTicketFormSer');
                
                this.actionCode2 = this.SELECT_BY_PNR;
                this.imgBrowser_clickHandler();
                break;
            case 'CC':
                Ext.getCmp(prototype.id+'-boxFilterByTKT').show();
                Ext.getCmp(prototype.id+'-boxFilterByPAX').hide();
                win.focus('txtFilterTicketFormSer');
                
                this.actionCode2 = this.SELECT_BY_CC;
                this.imgBrowser_clickHandler();
                break;
            case 'ADM':
                Ext.getCmp(prototype.id+'-boxFilterByTKT').show();
                Ext.getCmp(prototype.id+'-boxFilterByPAX').hide();
                
                win.focus('txtFilterTicketFormSer');
                break;
            default:
                this.cleanFilter();
                this.limpiarData();
                Ext.getCmp(prototype.id+'-boxFilterByTKT').hide();
                Ext.getCmp(prototype.id+'-boxFilterByPAX').hide();
                break;
        }
    },
    gridDataTktRealUses_act1_clickHandler: function (column, e, row, column, x) {
        var data = x.record.data;
        console.log('gridDataTktRealUses_act1_clickHandler');
        console.log(data);
        var me01 = this;
        if(data.STAT === 'EXCH' || data.STAT === 'EXCH-VOID'){
            /*var ScrTKTForm = Ext.create('Ext.Praxis.view.screens.ScrTKTForm', { id: 'ScrTKTForm' });
            var controller = ScrTKTForm.getController();
            controller.VP_DOCUMENTO = data.FOR + data.SER;
            controller.VP_CIA = data.CIA;
            controller.VP_SEQ = '00';
            controller.actionCode = 'V';
            ScrTKTForm.show();*/
            console.log(data.SEQ+data.CIA+data.FOR + data.SER);
            var strSEQ = data.SEQ===''? '00':data.SEQ;
            var strCIA = data.CIA;
            var strDOCUMENTO = data.FOR + data.SER;
            win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,data.STAT);
	}
	if(data.STAT === 'RFND' || data.STAT === 'RFND-VOID'){
            var rec = {
                data:{
                    A713AIRLIN: '139',
                    A713CIA:data.CIA,
                    DOCUMENTO:data.FOR + data.SER,
                    A713SEQ:data.SEQ
                }
            };
            
            prototype.idRfnd = 'SalesReportFormRfnd';
            var viewRefund = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryRfnd', {
                id: prototype.idRfnd + '-dataEntryRfnd',
               params: {
                    rec: rec,
                    modo: 'R',
                    exchrate: Ext.getCmp(prototype.id+'-lblExchangeLocalRate').value,
                    locCurr: Ext.getCmp(prototype.id+'-lblCurrency').value
                }
            });
            viewRefund.show();
	}
	if(data.STAT === 'FLWN'){
            this.searchBeanTkt(data.CIA + data.FOR + data.SER + data.CPN,data.SEQ, data.SEQRO);
	}
        if(data.STAT === 'BILLED'){
            //this.searchBeanTkt(win.getValue('txtFilterTicketCia').trim() + win.getValue('txtFilterTicketFormSer').trim() + data.CPN,this.filterTKT.IN_SEQ, data.SEQ);
            var params = {};
            
            var bean104 = {};
            bean104.FUENTE = win.getValue('lblSource').trim().substr(0, 3);
            bean104.TDNR = data.CIA+data.FOR+data.SER;//this.beanResultSet01.fileA720.A720CIAI + this.beanResultSet01.fileA720.A720FORMAI + this.beanResultSet01.fileA720.A720SERIEI;
            bean104.AGTN = win.getValue('lblAgencyIATANumber').trim();//this.beanResultSet01.fileA720.A720AGENTE;

            params.bean = bean104;
            params.typeModal = 'PRORATE';
            Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
                id: 'ScrProrrateoNewForm',
                params: params
            }).show();
	
	}
	if(data.STAT === 'FLWN-EMD'){
//            var filterA1692 = {};
//            filterA1692.CCIA = String(data.CIA);
//            filterA1692.FORMA = String(data.FOR);
//            filterA1692.SERIE = String(data.SER);
//            filterA1692.CUPON = String(data.CPN);
//            roEMDInformation.searcheEntyTKT(filterA1692);
	}
	if(data.STAT === 'INTL'){
//            var filterSQP00277 = {};
//            filterSQP00277.IN_CIA = String(data.CIA);
//            filterSQP00277.IN_FORMA = String(data.FOR);
//            filterSQP00277.IN_SERIE = String(data.SER);
//            filterSQP00277.IN_CUPON = String(data.CPN);
//            roProMasterTicket.searchINTLEntyTKT(filterSQP00277);
	}
	if(data.STAT.length >= 9 && data.STAT.substr(data.STAT.length - 5, 5) === '-VOID'){
//            if(int(data.TTRANS) == 1 || int(data.TTRANS) == 2){
//                displayADJAcountiPopup();
//                twBrwrAdjAccountindEdit.cia     = data.CIA;
//                twBrwrAdjAccountindEdit.forma   = data.FOR;
//                twBrwrAdjAccountindEdit.serie   = data.SER;
//                twBrwrAdjAccountindEdit.Correla = data.CORRL;
//                twBrwrAdjAccountindEdit.CUPON   = data.CPN;
//                twBrwrAdjAccountindEdit.ESTADO  = data.ESTADO;
//                twBrwrAdjAccountindEdit.SEQ   = data.SEQ;
//                twBrwrAdjAccountindEdit.init();
//            }else{
//                displayAgentFormPopup();
//                twEtyNewAdjudgementUses.cia     = data.CIA;
//                twEtyNewAdjudgementUses.forma   = data.FOR;
//                twEtyNewAdjudgementUses.serie   = data.SER;
//                twEtyNewAdjudgementUses.Correla = data.CORRL;
//                twEtyNewAdjudgementUses.CUPON   = data.CPN;
//                twEtyNewAdjudgementUses.SEQ   = data.SEQ;
//                twEtyNewAdjudgementUses.ESTADO  = data.ESTADO;
//                twEtyNewAdjudgementUses.Cargar_Datos();
//            }
        }
	if(data.STAT.length > 4 && data.STAT.substr(0, 4) === 'ADD-'){
//            if(int(data.TTRANS) == 1 || int(data.TTRANS) == 2){
//                displayADJAcountiPopup();
//                twBrwrAdjAccountindEdit.cia     = data.CIA;
//                twBrwrAdjAccountindEdit.forma   = data.FOR;
//                twBrwrAdjAccountindEdit.serie   = data.SER;
//                twBrwrAdjAccountindEdit.Correla = data.CORRL;
//                twBrwrAdjAccountindEdit.CUPON   = data.CPN;
//                twBrwrAdjAccountindEdit.ESTADO  = data.ESTADO;
//                twBrwrAdjAccountindEdit.SEQ   = data.SEQ;
//                twBrwrAdjAccountindEdit.init();
//            }else{
//                displayAgentFormPopup();
//                twEtyNewAdjudgementUses.cia     = data.CIA;
//                twEtyNewAdjudgementUses.forma   = data.FOR;
//                twEtyNewAdjudgementUses.serie   = data.SER;
//                twEtyNewAdjudgementUses.Correla = data.CORRL;
//                twEtyNewAdjudgementUses.CUPON   = data.CPN;
//                twEtyNewAdjudgementUses.SEQ   = data.SEQ;
//                twEtyNewAdjudgementUses.ESTADO  = data.ESTADO;
//                twEtyNewAdjudgementUses.Cargar_Datos();
//            }
	}
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    btnTicket_clickHandler: function () {
        win.removeAll('gridDataAccounting');
        Ext.getCmp(prototype.id+'-gridDataAccounting').el.setStyle({height: '100%'});
        win.selectedChild('vskData', 'boxDataTkt');
    },
    btnAccounting_clickHandler: function () {
        win.selectedChild('vskData', 'gridDataAccounting');
        this.get_load_Accounting();
    },
    btnFacsimil_clickHandler: function () {
        console.log('FACSIMIL');
        if(win.getValue('lblTicketNumber') !== ''){
            var params = {};
            
            var bean104 = {};
            bean104.FUENTE = win.getValue('lblSource').trim().substr(0, 3);
            bean104.TDNR = this.beanResultSet01.fileA720.A720CIAI + this.beanResultSet01.fileA720.A720FORMAI + this.beanResultSet01.fileA720.A720SERIEI;
            bean104.AGTN = this.beanResultSet01.fileA720.A720AGENTE;

            params.bean = bean104;
            params.typeModal = 'FACSIMIL';
            Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
                id: 'ScrProrrateoNewForm',
                params: params
            }).show();
	}
    },
    btnProrrate_clickHandler: function () {
        if(win.getValue('lblTicketNumber') !== ''){
            //var params = {};
            
            /*var bean104 = {};
            bean104.FUENTE = win.getValue('lblSource').trim().substr(0, 3);
            bean104.TDNR = this.beanResultSet01.fileA720.A720CIAI + this.beanResultSet01.fileA720.A720FORMAI + this.beanResultSet01.fileA720.A720SERIEI;
            bean104.AGTN = this.beanResultSet01.fileA720.A720AGENTE;

            params.bean = bean104;
            params.typeModal = 'PRORATE';
            Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
                id: 'ScrProrrateoNewForm',
                params: params
            }).show();*/
            try{
                console.log('prorate call');
                console.log(this.beanResultSet01);        
                console.log(this.params);
                var paramsProrrate = {};
                paramsProrrate = {
                    IN_TIPOCAP: 'A',
                    IN_AIRLIN: this.beanResultSet01.fileA720.A720AIRLIN,
                    IN_GRUPO: this.beanResultSet01.fileA720.A720GRUPO,
                    IN_CIA: this.beanResultSet01.fileA720.A720CIAI,
                    IN_FORMA: this.beanResultSet01.fileA720.A720FORMAI,
                    IN_SERIE: this.beanResultSet01.fileA720.A720SERIEI,
                    IN_SEQ: this.beanResultSet01.fileA720.A720SEQ,
                    IN_FTE: this.beanResultSet01.fileA1530.A1530FUENT,
                    IN_TRX: this.beanResultSet01.fileA720.A720TRNCU,
                    IN_EDITABLE: false,
                    IN_TCAMB: this.beanResultSet01.fileA720.A720TCAMB,
                    IN_REVENUE: 'USD',
                    IN_STATUS: 'CLOSED',
                    IN_ERROR: '',
                    IN_TDOC: this.beanResultSet01.fileA720.A720TDOC,
                    IN_ISSUEDATE: this.beanResultSet01.fileA720.A720FECVTA,
                    IN_CUPON1: '',
                    IN_CUPON2: '',
                    IN_CUPON3: '',
                    IN_CUPON4: '',
                    IN_FORCE: '',
                    IN_IDFIL: this.beanResultSet01.fileA720.A720IDFIL
                };
                
                    Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryProrate', {
                    id: 'DataEntryProrate',
                    params: paramsProrrate
                }).show();

                
            }catch(e){
                    console.log('prorate');
                   console.log(e);
            }
            
            
	}
    },
    lnkLeg_clickHandler: function (obj, metaData, rowNum, column, obj2, rowData) {
        //alert(win.getValue('lblTicketNumber'));
        if(rowData.data.LEG === 'Y'){
            var params = {};
            console.log(rowData.data);
            
            var beanLeg = {};
            beanLeg.IN_CCUST = win.getValue('lblSource').trim().substr(0, 3);
            beanLeg.IN_CIA = rowData.data.CIA.trim();
            beanLeg.IN_FORMA = rowData.data.FOR.trim();
            beanLeg.IN_SERIE = rowData.data.SER.trim();
            beanLeg.IN_CUPON = rowData.data.CPN.trim();

            params.bean = beanLeg;
            Ext.create('Ext.Praxis.view.screens.ScrLegForm', {
                id: 'ScrLegForm',
                params: params
            }).show();
            Ext.getCmp(prototype.id+'-gridDataTkt').enable();
	}
    },
    lnkLegSales_clickHandler: function (obj, metaData, rowNum, column, obj2, rowData) {
        //alert(win.getValue('lblTicketNumber'));
        if(rowData.data.LEGSALES === 'Y'){
            var params = {};
            console.log(rowData.data);
            
            var beanLeg = {};
            beanLeg.IN_CCUST = win.getValue('lblSource').trim().substr(0, 3);
            beanLeg.IN_CIA = rowData.data.CIA.trim();
            beanLeg.IN_FORMA = rowData.data.FOR.trim();
            beanLeg.IN_SERIE = rowData.data.SER.trim();
            beanLeg.IN_SEQROL = rowData.data.SEQ.trim();
            beanLeg.IN_CUPON = rowData.data.CPN.trim();

            params.bean = beanLeg;
            Ext.create('Ext.Praxis.view.screens.ScrLegSalesForm', {
                id: 'ScrLegSalesForm',
                params: params
            }).show();
            Ext.getCmp(prototype.id+'-gridDataTkt').enable();
	}
    },
    imgPrev_clickHandler: function () {
        var me01 = this;
        win.setValue('lblRelatedTickets1', '');
        win.setValue('lblRelatedTickets2', '');
        win.setValue('lblRelatedTickets3', '');
        win.setValue('lblRelatedTickets4', '');        

        win.setValue('lblRelatedTickets1SEQ', '00');
        win.setValue('lblRelatedTickets2SEQ', '00');
        win.setValue('lblRelatedTickets3SEQ', '00');
        win.setValue('lblRelatedTickets4SEQ', '00');


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
                win.setValue('lblRelatedTickets1',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets1SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }
        if(nPosition2 >= 0 && nPosition2<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition2];
                win.setValue('lblRelatedTickets2',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets2SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }

        if(nPosition3 >= 0 && nPosition3<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition3];
                win.setValue('lblRelatedTickets3',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets3SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }

        if(nPosition4 >= 0 && nPosition4<me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition4];
                win.setValue('lblRelatedTickets4',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets4SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }
    },
    imgNext_clickHandler: function () {
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

        win.setValue('lblRelatedTickets1', '');
        win.setValue('lblRelatedTickets2', '');
        win.setValue('lblRelatedTickets3', '');
        win.setValue('lblRelatedTickets4', '');        

        win.setValue('lblRelatedTickets1SEQ', '00');
        win.setValue('lblRelatedTickets2SEQ', '00');
        win.setValue('lblRelatedTickets3SEQ', '00');
        win.setValue('lblRelatedTickets4SEQ', '00');


        if(nPosition1 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition1];
                win.setValue('lblRelatedTickets1',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets1SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }
        if(nPosition2 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition2];
                win.setValue('lblRelatedTickets2',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets2SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }
        if(nPosition3 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition3];
                win.setValue('lblRelatedTickets3',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets3SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }

        if(nPosition4 < me01.filterTKT.lstResultSet10.length)
        {	
                var beanResultSet10 = me01.filterTKT.lstResultSet10[nPosition4];
                win.setValue('lblRelatedTickets4',beanResultSet10.fileA1531.A1531NREF.substr(0, 13));
                win.setValue('lblRelatedTickets4SEQ',beanResultSet10.fileA1531.A1531SEQ730);
        }
    },
    
    btnDelivery_clickHandler: function () {
        var bean = {};
	bean.TDNR = win.getValue('txtFilterTicketCia').trim() + win.getValue('txtFilterTicketFormSer').trim();
	bean.FUENTE = win.getValue('lblSource').trim().substr(0,3);
        console.log('btnDelivery_clickHandler');
        if(bean.TDNR !== '' && bean.FUENTE !== ''){
            bean.A720TKVOID = this.gloA720TKVOID;
            console.log(bean);
            this.searchDelivery(bean);
	}
    },
    btnPayment_clickHandler: function () {
        var beanA2289 = {};
        beanA2289.IN_CIA = win.getValue('txtFilterTicketCia');
        beanA2289.IN_FORMA = win.getValue('txtFilterTicketFormSer').substring(0, 4);
        beanA2289.IN_SERIA = win.getValue('txtFilterTicketFormSer').substring(4, 10);
        
        var DataEntryLog = Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryLog', { id: 'DataEntryLogProMasterTicketForm' });
        var controller = DataEntryLog.getController();
        controller.beanA2289 = beanA2289;
        controller.actionCode = this.actionCode2;
        DataEntryLog.show();
    },
    btnSingleFormat_clickHandler: function () {
        var dataEntryADM = Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryADM', {id: 'DataEntryADMProMasterTicketForm'} );
        var controller = dataEntryADM.getController();
        controller.gridDataMemoAC = this.gridDataMemoAC;
        dataEntryADM.show();
    },
    btnSingleFormat_clickHandlerOLD: function () {
        var beanADMAccountig = {};
	beanADMAccountig.COMBOBY = '0';
	beanADMAccountig.OPCIONTYPE = '3';
	beanADMAccountig.VP_PREME = this.beanResultSet01.fileA720.A1672_PREME;
	beanADMAccountig.VL_VENTANA = 'ViewTicket';
	
        var ScrFormUnico = Ext.create('Ext.Praxis.view.screens.ScrFormUnico', { id: 'ScrFormUnico' });
        var controller = ScrFormUnico.getController();
//         controller.initial_admAccountingViewTicket(beanADMAccountig);
        ScrFormUnico.show();
    },
    btnPNR_clickHandler: function () {
        var FPROC = win.getValue('lblPeriodEndingDate').trim();
	var TRNCU = this.beanResultSet01.fileA720.A720TRNCU;
	var TKT = win.getValue('txtFilterTicketCia').trim() + win.getValue('txtFilterTicketFormSer').trim() + this.filterTKT.IN_SEQ;
	var PNR = win.getValue('lblPNR').trim();
	if(FPROC !== '' && TRNCU !== '' && TKT !== '' && PNR !== ''){
            this.searchPNR(FPROC, TRNCU, TKT);
	}
    },
    imgSearchTKT_clickHandler: function (cmp, a, event) {
        var p = '';
        switch (cmp.id) {
            case prototype.id+'-imgSearchTKT1': p = 'TKT1'; break;
            case prototype.id+'-imgSearchTKT2': p = 'TKT2'; break;
            case prototype.id+'-imgSearchTKT3': p = 'TKT3'; break;
            case prototype.id+'-imgSearchTKT4': p = 'TKT4'; break;
        }
        var strTKT = '';
        var strCIA = '';
        var strSEQ = '';
	switch(p){
            case 'TKT1':
                if(win.getValue('lblRelatedTickets1').trim().length > 0){
                    strCIA = win.getValue('lblRelatedTickets1').substr(0, 3);
                    strTKT = win.getValue('lblRelatedTickets1').trim();
                    strSEQ = win.getValue('lblRelatedTickets1SEQ').trim();
                    win.setValue('cbxSelectBy', 'TKT');
                    this.cbxSelectBy_closeHandler();
                    win.setValue('txtFilterTicketCia', strCIA);
                    win.setValue('txtFilterTicketFormSer', (strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                    win.setValue('txtFilterTicketSeq',(strSEQ.length == 2) ? strSEQ : '00');
                    this.imgSearch_clickHandler();
                }
                break;
            case 'TKT2':
                if(win.getValue('lblRelatedTickets2').trim().length > 0){
                    strCIA = win.getValue('lblRelatedTickets2').substr(0, 3);
                    strTKT = win.getValue('lblRelatedTickets2').trim();
                    strSEQ = win.getValue('lblRelatedTickets2SEQ').trim();
                    win.setValue('cbxSelectBy', 'TKT');
                    this.cbxSelectBy_closeHandler();
                    win.setValue('txtFilterTicketCia', strCIA);
                    win.setValue('txtFilterTicketFormSer', (strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                    win.setValue('txtFilterTicketSeq',(strSEQ.length == 2) ? strSEQ : '00');
                    this.imgSearch_clickHandler();
                }
                break;
            case 'TKT3':
                if(win.getValue('lblRelatedTickets3').trim().length > 0){
                    strCIA = win.getValue('lblRelatedTickets3').substr(0, 3);
                    strTKT = win.getValue('lblRelatedTickets3').trim();
                    strSEQ = win.getValue('lblRelatedTickets3SEQ').trim();
                    win.setValue('cbxSelectBy', 'TKT');
                    this.cbxSelectBy_closeHandler();
                    win.setValue('txtFilterTicketCia', strCIA);
                    win.setValue('txtFilterTicketFormSer', (strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                    win.setValue('txtFilterTicketSeq',(strSEQ.length == 2) ? strSEQ : '00');
                    this.imgSearch_clickHandler();
                }
                break;
            case 'TKT4':
                if(win.getValue('lblRelatedTickets4').trim().length > 0){
                    strCIA = win.getValue('lblRelatedTickets4').substr(0, 3);
                    strTKT = win.getValue('lblRelatedTickets4').trim();
                    strSEQ = win.getValue('lblRelatedTickets4SEQ').trim();
                    win.setValue('cbxSelectBy', 'TKT');
                    this.cbxSelectBy_closeHandler();
                    win.setValue('txtFilterTicketCia', strCIA);
                    win.setValue('txtFilterTicketFormSer', (strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                    win.setValue('txtFilterTicketSeq',(strSEQ.length == 2) ? strSEQ : '00');
                    this.imgSearch_clickHandler();
                }
                break;
	}
    },
    Tickets1_clickHandler: function (cmp, a, event) {
        alert(win.getValue('lblRelatedTickets1').trim());
        /*if(win.getValue('lblRelatedTickets1').trim().length > 0 && win.getValue('lblRelatedTickets1').substr(0, 3) === '139'){
            strTKT = win.getValue('lblRelatedTickets1').trim();
            strSEQ = (win.getValue('lblRelatedTickets1SEQ').trim().length === 2) ? win.getValue('lblRelatedTickets1SEQ').trim() : '00';
            var ScrTKTForm = Ext.create('Ext.Praxis.view.screens.ScrTKTForm', { id: 'ScrTKTForm' });
            var controller = ScrTKTForm.getController();
            controller.VP_DOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
            controller.VP_CIA = win.getValue('lblRelatedTickets1').substr(0, 3);
            controller.VP_SEQ = strSEQ;
            controller.actionCode = 'V';
            alert(controller.VP_DOCUMENTO + '/'+ controller.VP_CIA + '/' + controller.VP_SEQ)
            ScrTKTForm.show();                    
        }   */             
    },
    //</editor-fold>
    
    // agregado para ver grill Accounting : VH
    get_load_Accounting: function () {
        if (win.getValue('txtFilterTicketFormSer').trim().length === 10) {
            win.removeAll('gridDataAccounting');
            this.beanAccounting.VP_A1716CCUST = '139';
            this.beanAccounting.VP_A1716CIA = win.getValue('txtFilterTicketCia');
            this.beanAccounting.VP_A1716FORMA = win.getValue('txtFilterTicketFormSer').substring(0, 4);
            this.beanAccounting.VP_A1716SERIE = win.getValue('txtFilterTicketFormSer').substring(4, 10);
            this.beanAccounting.VP_A1716SEQT = this.filterTKT.IN_SEQ;	
            
            this.beanAccounting.VP_A1716SEQR = this.filterTKT.VP_A1716SEQR;	
            this.beanAccounting.VP_A1716SEQF = this.filterTKT.VP_A1716SEQF;	
            this.beanAccounting.VP_A1716SEQI = this.filterTKT.VP_A1716SEQI;	
            this.beanAccounting.VP_A1716SEQA = this.filterTKT.VP_A1716SEQA;	
            
            this.loadAccountig(this.beanAccounting);
        }
    },
    execSearch: function () {
        win.removeAll('gridDataAccounting');
        if(Ext.getCmp(prototype.id+'-gridDataAccounting')===undefined){
            console.log('undefined');
            Ext.getCmp(prototype.id+'-gridDataAccounting').el.setStyle({height: '100%'});
        }
        console.log('OAL0');
        switch (win.getValue('cbxSelectBy')) {
            case 'TKT':
                var strFilterTicketForSer = win.getValue('txtFilterTicketFormSer').trim();
                if (strFilterTicketForSer.length >= 10  && win.getValue('txtFilterTicketCia').trim().length === 3) {
                    /*if (win.getValue('txtFilterTicketCia') !== '139') {
                        var bean104 = {};
                        console.log('OAL1');
                        if(win.getValue('txtFilterTicketSeq').trim().length !== 2)
                            win.setValue('txtFilterTicketSeq','00');
                        if (win.getValue('txtFilterTicketCia').trim().length === 3 && win.getValue('txtFilterTicketFormSer').trim().length >= 3 && win.getValue('txtFilterTicketSeq').trim().length === 2) {
                            bean104.TDNR = win.getValue('txtFilterTicketCia').trim()+strFilterTicketForSer.substr(0, 4)+strFilterTicketForSer.substr(4, 6);
                            bean104.CPUI = strFilterTicketForSer.substr(10,1);
                            console.log('OAL2');
                            win.displayProFacsimilSearch(this, bean104,'ViewTicket');
                            //Ext.getCmp(prototype.id+'-lblCupon').hide();
                        } else {
                            //Ext.getCmp(prototype.id+'-lblCupon').show();
                        }
                    } else {*/
                        console.log('OAL3');
                        if(win.getValue('txtFilterTicketSeq').trim().length !== 2)
                            win.setValue('txtFilterTicketSeq','00');
                        this.bean.IN_CIA = win.getValue('txtFilterTicketCia').trim();
                        this.bean.IN_FORMA  = strFilterTicketForSer.substr(0, 4);
                        this.bean.IN_SERIE = strFilterTicketForSer.substr(4, 6);
                        this.bean.IN_SEQ = win.getValue('txtFilterTicketSeq').trim();
                        this.loadTicket(this.bean);
                        Ext.getCmp(prototype.id+'-lblCupon').hide();
                    //}
                } else {
                    global.Msg({msg: 'Enter the required fields'});
                }
                break;
            case 'PAX':
                var strFilterPassengerName = win.getValue('txtFilterPassengerName').trim();
                if(strFilterPassengerName.length > 0){
                    Ext.getCmp(prototype.id+'-lblPaxResults').hide();
                    Ext.getCmp(prototype.id+'-cbxFilterPassengerName').hide();
                    Ext.getCmp(prototype.id+'-lblTicketsFound').hide();
                    Ext.getCmp(prototype.id+'-txtFilterTicketCia0').hide();
                    Ext.getCmp(prototype.id+'-cbxFilterTicket').hide();
                    
                    this.filterPax.IN_TYPE = 'P';
                    this.filterPax.IN_CIA = win.getValue('txtFilterTicketCia0');
                    this.filterPax.IN_PAX = win.getValue('txtFilterPassengerName');
                    this.searchPax(this.filterPax);
                } else {
                    global.Msg({msg: 'Enter the required fields'});
                }
                break;
                
            case 'ADM':
                var strFilterTicketForSer = win.getValue('txtFilterTicketFormSer').trim();
                if (strFilterTicketForSer.length >= 10  && win.getValue('txtFilterTicketCia').trim().length === 3) {
                    console.log('ADM1');
                    var params = {};
                    var beanLeg = {};
                    if(win.getValue('txtFilterTicketSeq').trim().length !== 2)
                        win.setValue('txtFilterTicketSeq','00');
                    beanLeg.IN_CCUST = win.getValue('lblSource').trim().substr(0, 3);
                    beanLeg.IN_CIA = win.getValue('txtFilterTicketCia').trim();
                    beanLeg.IN_FORMA  = strFilterTicketForSer.substr(0, 4);
                    beanLeg.IN_SERIE = strFilterTicketForSer.substr(4, 6);
                    beanLeg.IN_SEQ = win.getValue('txtFilterTicketSeq').trim();
                    params.bean = beanLeg;
                    Ext.create('Ext.Praxis.view.screens.ScrAdmAcmForm', {
                        id: 'ScrAdmAcmForm',
                        params: params
                    }).show();
                    //Ext.getCmp(prototype.id+'-gridDataTkt').enable();
                    //Ext.getCmp(prototype.id+'-lblCupon').hide();
                } else {
                    global.Msg({msg: 'Enter the required fields'});
                }
                break;
        }
    },
    
    onResultLoadAccountig: function (gridDataTktAccountingAC) {
         try{
                console.log(gridDataTktAccountingAC);
                var fileBean = {};
                for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
                    fileBean = gridDataTktAccountingAC[i];
                    fileBean.A1530TCAMP = this.beanResultSet01.fileA1530.A1530TCAMP;
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
                Ext.getCmp(prototype.id+'-gridDataAccounting').bindStore(
                    Ext.create("Ext.Praxis.store.program.GridData", { data: gridDataTktAccountingAC })
                );
        }catch(e){
            
        }
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
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function (obj, e) {
        this.limpiarData();
        //this.bean = {};
        if (win.getValue('txtFilterTicketCia').trim().length === 3 && win.getValue('txtFilterTicketFormSer').trim().length === 10) {
            this.bean.IN_CIA = win.getValue('txtFilterTicketCia').trim();
            this.bean.IN_FORMA  = win.getValue('txtFilterTicketFormSer').trim().substr(0, 4);
            this.bean.IN_SERIE = win.getValue('txtFilterTicketFormSer').trim().substr(4, 6);
            this.loadTicketSeq(this.bean);
        }
        else if(this.bean.IN_FORMA !== null && this.bean.IN_FORMA.length === 4 && this.bean.IN_SERIE !== null && this.bean.IN_SERIE.length === 6) {
            this.loadTicketSeq(this.bean);
        }
        else {    
            this.execSearch();
        }
        this.controlLight();
    },
    imgExportText_clickHandler: function (obj, e) {        
        this.loadSabre();
    },
    imgBrowser_clickHandler: function () {
        prototype.url = URL_VIEWTICKET;
        console.log('this.dataEntry');
        console.log(this.actionCode2);
        console.log(this.dataEntry);
        console.log(prototype.id);
        var controller = this.dataEntry.getController();
        controller.ticketNumber = "";
        
        if (win.getValue('txtFilterTicketCia').trim().length === 3 && win.getValue('txtFilterTicketFormSer').trim().length === 10) {
            controller.ticketNumber = win.getValue('txtFilterTicketCia').trim()+win.getValue('txtFilterTicketFormSer').trim()
        }else {    
            controller.ticketNumber = "";
        }
        
        controller.actionCode = win.getValue('cbxSelectBy');
        controller.startDisplay();
        this.dataEntry.show();
        
        
        /*var DataEntryLog = Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntry', {id: 'DataEntryProMasterTicketForm'} );
        console.log('DataEntryLog');
        console.log(DataEntryLog);
        var controller = DataEntryLog.getController();
        controller.ticketNumber = "";
        controller.actionCode = this.actionCode2;
        controller.startDisplay();
        DataEntryLog.show();*/
        
        /*if(typeof Ext.getCmp(prototype.id+'-DataEntryProMasterTicketForm') !== 'undefined'){
            console.log('DataEntryProMasterTicketForm-undefined');
            Ext.getCmp(prototype.id+'-DataEntryProMasterTicketForm').destroy();
        }
        if(this.dataEntry.getController()===null)
        {
            var option = Ext.create('Ext.Praxis.view.program.ProMasterTicketForm.DataEntry', {id: 'DataEntryProMasterTicketForm'} );
            option.show();
        }
        else
        {
            var controller = this.dataEntry.getController();
            controller.ticketNumber = "";
            controller.actionCode = this.actionCode2;
            controller.startDisplay();
            this.dataEntry.show();            
        }*/
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    imgClear_clickHandler: function (obj, e) {
        this.limpiarData();
        win.setValue('cbxSelectBy', '');
        this.cbxSelectBy_closeHandler();
    },
    imgBack_clickHandler: function () {
        if (this.params.back === undefined) {
            global.showMenu();
        } else {
            win.backPrograma(this.params.back);
        }
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="controlLight">
    controlLight: function () {
        if(PERMC === 'Y'){
            Ext.getCmp(prototype.id+'-btnTicket').hide();
            Ext.getCmp(prototype.id+'-btnAccounting').hide();
            //Ext.getCmp(prototype.id+'-btnProrrate').hide();
            Ext.getCmp(prototype.id+'-btnDelivery').hide();
            Ext.getCmp(prototype.id+'-btnUsage').hide();
            Ext.getCmp(prototype.id+'-btnHistory').hide();
            Ext.getCmp(prototype.id+'-btnPayment').hide();
            Ext.getCmp(prototype.id+'-btnSingleFormat').hide();
            Ext.getCmp(prototype.id+'-btnADM').hide();
            Ext.getCmp(prototype.id+'-btnPNR').hide();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="searchPax">
    searchPax: function (filterPax) {
        Ext.Ajax.request({
            url: prototype.url+'/searchPax',
            method: 'POST',
            timeout: 60000000,
            params: filterPax,
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, options){
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstA720 = res.lstPax;
                    var fileA720 = {};
                    var i, n = 0;
                    switch(filterPax.IN_TYPE){
                        case 'P':
                            Ext.getCmp(prototype.id+'-cbxFilterPassengerName').getStore().removeAll();
                            win.setValue('cbxFilterPassengerName', '');
                            if(lstA720.length === 0){
                                Ext.getCmp(prototype.id+'-cbxFilterPassengerName').getStore().addSorted({
                                    code: '',
                                    name: 'Pax not found'
                                });
                            } else if(lstA720.length === 1){
                                fileA720 = lstA720[0];
                                Ext.getCmp(prototype.id+'-cbxFilterPassengerName').getStore().addSorted({
                                    code: fileA720.A720PAX,
                                    name: fileA720.A720PAX
                                });
                                filterPax.IN_TYPE = 'T';
				filterPax.IN_CIA = win.getValue('txtFilterTicketCia0');
				filterPax.IN_PAX = fileA720.A720PAX;
                                me.searchPax(filterPax);
                            }else if(lstA720.length > 1){
                                Ext.getCmp(prototype.id+'-cbxFilterPassengerName').getStore().addSorted({
                                    code: '',
                                    name: 'Select Pax'
                                });
                                for(i = 0; i < lstA720.length; i++){
                                    fileA720 = lstA720[i];
                                    Ext.getCmp(prototype.id+'-cbxFilterPassengerName').getStore().addSorted({
                                        code: fileA720.A720PAX,
                                        name: fileA720.A720PAX
                                    });
				}
                            }
                            Ext.getCmp(prototype.id+'-lblPaxResults').show();
                            Ext.getCmp(prototype.id+'-cbxFilterPassengerName').show();
                            win.focus('cbxFilterPassengerName');
                            break;
                        case 'T':
                            Ext.getCmp(prototype.id+'-cbxFilterTicket').getStore().removeAll();
                            if(lstA720.length === 0){
                                Ext.getCmp(prototype.id+'-cbxFilterTicket').getStore().addSorted({
                                    code: '',
                                    name: 'Ticket not found'
                                });
                            }else if(lstA720.length === 1){
                                fileA720 = lstA720[0];
                                Ext.getCmp(prototype.id+'-cbxFilterTicket').getStore().addSorted({
                                    code: fileA720.A720FORMAI,
                                    name: fileA720.A720SERIEI
                                });
                                
                                me.bean.IN_CIA = win.getValue('txtFilterTicketCia0');
                                me.bean.IN_FORMA  = fileA720.A720FORMAI;
                                me.bean.IN_SERIE = fileA720.A720SERIEI;
                                me.loadTicket(me.bean);
                            }else if(lstA720.length > 1){
                                Ext.getCmp(prototype.id+'-cbxFilterTicket').getStore().addSorted({
                                    code: '',
                                    name: 'Select Ticket'
                                });
                                for(i = 0; i < lstA720.length; i++){
                                    fileA720 = lstA720[i];
                                    Ext.getCmp(prototype.id+'-cbxFilterTicket').getStore().addSorted({
                                        code: fileA720.A720FORMAI+fileA720.A720SERIEI,
                                        name: fileA720.A720FORMAI+fileA720.A720SERIEI
                                    });
                                }
                            }
                            Ext.getCmp(prototype.id+'-lblTicketsFound').show();
                            Ext.getCmp(prototype.id+'-txtFilterTicketCia0').show();
                            Ext.getCmp(prototype.id+'-cbxFilterTicket').show();
                            win.focus('cbxFilterTicket');
                            break;
                    }
                } else global.Msg({ msg: "Bad Request" });
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="loadTicket">
    loadTicket: function (bean) {
        var me01 = this;
        console.log('loadTicket');
        console.log(bean);
        console.log(prototype.url+'/loadTicket');
        prototype.url = URL_VIEWTICKET;
        Ext.Ajax.request({
            url: prototype.url+'/loadTicket',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, options){
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    win.setValue('txtFilterTicketSeq', '');
                    me01.filterTKT = res.filterTKT;
                    if (me01.filterTKT.IN_SEQ.length === 0) {
                        var controller = me01.dataEntry.getController();
                        controller.ticketNumber = win.getValue('txtFilterTicketCia').trim()+win.getValue('txtFilterTicketFormSer').trim();
                        controller.actionCode = me01.SELECT_BY_TKT_2;
                        //controller.startDisplay();
                        //me01.dataEntry.show();
                    } else {
                        me01.beanResultSet01 = {};
                        me01.beanResultSet01.fileA720 = {};
                        me01.beanResultSet01.fileA1530 = {};
                        me01.beanResultSet01.fileA003 = {};
                        me01.beanResultSet01.fileA1007 = {};
                        me01.beanResultSet01.fileA003.A003KEY1 = "";
                        me01.beanResultSet01.fileA720.A720ROE = 0;
                        me01.beanResultSet01.fileA720.A720CIAI = "";
                        me01.beanResultSet01.fileA720.A720FORMAI = "";
                        me01.beanResultSet01.fileA720.A720SERIEI = "";
                        me01.beanResultSet01.fileA720.A720ACCO = "";
                        me01.beanResultSet01.fileA720.A720ACCD = "";
                        me01.beanResultSet01.fileA720.A720ORIGEX = 0;
                        me01.beanResultSet01.fileA720.A720TRFPAG = 0;
                        me01.beanResultSet01.fileA720.A720TTCOMM = 0;
                        me01.beanResultSet01.fileA720.A720TTSCMM = 0;
                        me01.beanResultSet01.fileA720.A720TARIFA = 0;
                        me01.beanResultSet01.fileA720.A720TYQ = 0;
                        me01.beanResultSet01.fileA720.A720FARE = 0;
                        me01.beanResultSet01.fileA720.A720ETKT = "";
                        me01.beanResultSet01.fileA720.A1672_AUDITED = 0;
                        me01.beanResultSet01.fileA720.A1672_MEMORAISED = 0;
                        me01.beanResultSet01.fileA1530.A1530FCONT = "";
                        me01.beanResultSet01.fileA1530.A1530TCAMB = 0;
                        me01.beanResultSet01.fileA1530.A1530FUENT = "";
                        me01.beanResultSet01.fileA1530.A1530PSVTA = "";
                        
                        win.setValue('lblTicketNumber', me01.beanResultSet01.fileA720.A720CIAI+' '+me01.beanResultSet01.fileA720.A720FORMAI+' '+me01.beanResultSet01.fileA720.A720SERIEI);
                        
                        //<editor-fold defaultstate="collapsed" desc="mostrarData">
                        var paramsConjuntion, paramsResultSet02, paramsResultSet03, paramsResultSet04, paramsResultSet05, paramsResultSet06, paramsResultSet07, paramsResultSet08, paramsResultSet09, paramsResultSet10, paramsResultSet11, paramsResultSet12, paramsResultSet13, paramsResultSet14, paramsResultSet15;
                        var strFareConstruction, strEndorsementAndRestrictions, strIssuedInExchangeFor, strReasonForIssuance, strTKtInConnexion, strRelated, strA1531VFOP, bolA730CUPON1, bolA730CUPON2, bolA730CUPON3, bolA730CUPON4, intTAXES, intRemainingFare=0, intRemainingSurcharge=0, intRemainingCommision=0;
                        var n;

                        if(me01.filterTKT.lstResultSet01.length > 0){
                            me01.beanResultSet01 = me01.filterTKT.lstResultSet01[0];
                        }
                        console.log('BEGIN beanResultSet01');
                        console.log(me01.beanResultSet01);
                        console.log('END beanResultSet01');
                        me01.gloA720TKVOID = me01.beanResultSet01.fileA720.A720TKVOID;
                        console.log('BEGIN CLEAN VOID');
                        Ext.getCmp(prototype.id+'-info-panel').el.setStyle({backgroundImage: ''});
                        console.log('END CLEAN VOID');
                        if(me01.gloA720TKVOID === 'V'){
                //            idFacsimil.addChild(image);
                //            with(image){x=0; y=0}
                            console.log('BEGIN VOID');
                            Ext.getCmp(prototype.id+'-info-panel').el.setStyle({backgroundImage: 'url(resources/img/icon/999x999/VOID_03_r1_c1.png)'});
                            console.log('END VOID');
                            Ext.getCmp(prototype.id+'-btnTicket').disable(true);
                            Ext.getCmp(prototype.id+'-btnAccounting').disable(true);
                            //Ext.getCmp(prototype.id+'-btnFacsimil').disable(true);
                            Ext.getCmp(prototype.id+'-btnProrrate').disable(true);
                            Ext.getCmp(prototype.id+'-btnDelivery').disable(true);
                            Ext.getCmp(prototype.id+'-btnPayment').disable(true);
                            Ext.getCmp(prototype.id+'-btnPNR').disable(true);
                            //Ext.getCmp(prototype.id+'-btnFacsimil0').show();
                            Ext.getCmp(prototype.id+'-btnDelivery0').show();
                        }else if(win.getValue('txtFilterTicketCia').trim()==='139'){
                            // with(idFacsimil){addChild(image); removeChild(image)}
                            Ext.getCmp(prototype.id+'-btnProrrate').show();
                            //Ext.getCmp(prototype.id+'-btnFacsimil0').show();
                            Ext.getCmp(prototype.id+'-btnDelivery0').show();
                            Ext.getCmp(prototype.id+'-btnPayment').show();  
                            Ext.getCmp(prototype.id+'-btnPNR').show();
                            
                            Ext.getCmp(prototype.id+'-btnTicket').enable(true);
                            Ext.getCmp(prototype.id+'-btnAccounting').enable(true);
                            //Ext.getCmp(prototype.id+'-btnFacsimil').enable(true);
                            Ext.getCmp(prototype.id+'-btnProrrate').enable(true);
                            Ext.getCmp(prototype.id+'-btnDelivery').enable(true);
                            //Ext.getCmp(prototype.id+'-btnFacsimil0').disable(true);
                            Ext.getCmp(prototype.id+'-btnDelivery0').disable(true);                            
                        } else {
                            Ext.getCmp(prototype.id+'-btnTicket').enable(true);
                            Ext.getCmp(prototype.id+'-btnAccounting').enable(true);
                            //Ext.getCmp(prototype.id+'-btnFacsimil').enable(true);
                            Ext.getCmp(prototype.id+'-btnProrrate').hide();
                            Ext.getCmp(prototype.id+'-btnDelivery').enable(true);
                            //Ext.getCmp(prototype.id+'-btnFacsimil0').hide();
                            Ext.getCmp(prototype.id+'-btnDelivery0').hide();
                            Ext.getCmp(prototype.id+'-btnPayment').hide();  
                            Ext.getCmp(prototype.id+'-btnPNR').hide();  
                        }
                        win.setValue('lblTicketNumber', me01.beanResultSet01.fileA720.A720CIAI+' '+me01.beanResultSet01.fileA720.A720FORMAI+' '+me01.beanResultSet01.fileA720.A720SERIEI);

                        win.setValue('lblPNR', me01.beanResultSet01.fileA720.A720PNR);
                        win.setValue('lblPeriodEndingDate', me01.beanResultSet01.fileA1530.A1530FHAST);
                        win.setValue('lblCurrency', me01.beanResultSet01.fileA1530.A1530MDA);
                        win.setValue('lblAgencyIATANumber', me01.beanResultSet01.fileA720.A720AGENTE);
                        win.setValue('lblAgencyIATADate', me01.beanResultSet01.fileA720.A720FECVTA);
                        win.setValue('lblAgencyIATAName', me01.beanResultSet01.fileA003.A003KEY1.substr(0, 30));
                        if (me01.beanResultSet01.fileA003.A003KEY1.length > 30) {
                            var tip = Ext.create('Ext.tip.ToolTip', {
                                target: prototype.id+'-lblAgencyIATAName',
                                html: me01.beanResultSet01.fileA003.A003KEY1
                            });
                        }
                        win.setValue('lblAgencyIATACity', (me01.beanResultSet01.fileA1007.A1007NOMCD !== '') ? me01.beanResultSet01.fileA1007.A1007NOMCD : ((me01.beanResultSet01.fileA003.A003CIUDAD !== '') ? me01.beanResultSet01.fileA003.A003CIUDAD : me01.beanResultSet01.fileA003.A003PROVIN));
                        win.setValue('lblAgencyGroup', '');
                        win.setValue('lblPassengerName', me01.beanResultSet01.fileA720.A720PAX);
                        //win.setValue('lblChargeback', me01.beanResultSet01.fileA720.A2289_ESTADO);
                        switch(me01.beanResultSet01.fileA720.A720TVENTA){
                            case 'I':
                                win.setValue('lblSegmentIndicator', 'Int');
                                break;
                            case 'D':
                                win.setValue('lblSegmentIndicator', 'Dom');
                                break;
                        }
                        win.setValue('lblTourCode', me01.beanResultSet01.fileA720.A720CODIT);
                        win.setValue('lblFRESV', me01.beanResultSet01.fileA720.A720FRESV);
                        win.setValue('lblSource', me01.beanResultSet01.fileA1530.A1530FUENT +"-"+me01.beanResultSet01.fileA1530.A1530PSVTA);
                        win.setValue('lblExchangeRate', me01.beanResultSet01.fileA720.A720ROE.toFixed(6));
                        win.setValue('lblExchangeLocalRate', me01.beanResultSet01.fileA1530.A1530TCAMB.toFixed(6));
                        strFareConstruction = '';
                        strEndorsementAndRestrictions = '';
                        strIssuedInExchangeFor = '';
                        strReasonForIssuance = '';
                        strTKtInConnexion = '';
                        strRelated = '';
                        if(me01.filterTKT.lstResultSet04.length > 0){
                            for(var i4 = 0; i4 < me01.filterTKT.lstResultSet04.length; i4++){
                                paramsResultSet04 = me01.filterTKT.lstResultSet04[i4];
                                switch(paramsResultSet04.fileA1721.A1721TIPO){
                                    case 'FC':
                                        strFareConstruction += paramsResultSet04.fileA1721.A1721FRCA;
                                        break;
                                    case 'ER':
                                        strEndorsementAndRestrictions += paramsResultSet04.fileA1721.A1721FRCA.trim();
                                        break;
                                    case 'OI':
                                        strIssuedInExchangeFor += paramsResultSet04.fileA1721.A1721FRCA;
                                        break;
                                    case 'RF':
                                        strReasonForIssuance += paramsResultSet04.fileA1721.A1721FRCA;
                                        break;
                                    case 'CX':
                                        strTKtInConnexion += paramsResultSet04.fileA1721.A1721FRCA;
                                        break;
                                    case 'AD':
                                        strRelated += paramsResultSet04.fileA1721.A1721FRCA;
                                        break;
                                }
                            }
                        }
                        win.setValue('lblEndorsementAndRestrictions', strEndorsementAndRestrictions);
                        win.setValue('lblGDS', me01.beanResultSet01.fileA720.A720SASI);
                        switch(me01.beanResultSet01.fileA720.A720TICAP){
                            case 'A':
                                win.setValue('lblQuotationType', 'Automatic');
                                break;
                            default:
                                win.setValue('lblQuotationType', me01.beanResultSet01.fileA720.A720TICAP);
                        }
                        win.setValue('lblIssuedInExchangeFor', strIssuedInExchangeFor);
                        win.setValue('lblOriDes', me01.beanResultSet01.fileA720.A720ACCO+'-'+me01.beanResultSet01.fileA720.A720ACCD);
                        win.setValue('lblDocumentType', me01.beanResultSet01.fileA720.A720TDOC);
                        win.setValue('lblDocumentTypeCod', me01.beanResultSet01.fileA720.A720TDOC_COD);
                        win.setValue('lblDocumentTypeCon', me01.beanResultSet01.fileA720.A720TDOC_CON);
                        win.setValue('chkOverCommision', false);
                        win.setValue('chkAccounted', (me01.beanResultSet01.fileA1530.A1530FCONT !== '') ? true : false);
                        win.setValue('chkElectronicticket', (me01.beanResultSet01.fileA720.A720ETKT === 'E') ? true : false);
                        win.setValue('chkAudited', (me01.beanResultSet01.fileA720.A1672_AUDITED > 0) ? true : false);
                        win.setValue('chkMemoRaised', (me01.beanResultSet01.fileA720.A1672_MEMORAISED > 0) ? true : false);
                        //win.setValue('lblMemoNumber', me01.beanResultSet01.fileA720.A2548_NMEMO);
                        
                        var bMemo = win.getValue('chkMemoRaised');
                        Ext.getCmp(prototype.id + '-btnSingleFormat').setVisible(bMemo);
                        
                        if(bMemo){
                            
                            var strMemo = me01.beanResultSet01.fileA720.A2548_NMEMO;
                            
                            if(strMemo.length>1){
                                strMemo = strMemo.substring(0, strMemo.length - 1);
                                var arrMemo = strMemo.split(';');
                                var m = 0;
                                me01.gridDataMemoAC = [];
                                
                                for(m=0;m<arrMemo.length;m++){
                                    var arrMemoFields = arrMemo[m].split('|');
                                    var strA2548NMEMO, strA2548NETO, strA2548TRNCU, strA2548PREME;

                                    strA2548NMEMO = arrMemoFields[0];
                                    strA2548NETO = Ext.util.Format.number(arrMemoFields[1], '0,000.00');
                                    strA2548TRNCU = arrMemoFields[2];
                                    strA2548PREME = arrMemoFields[3];

                                    strA2548NMEMO = strA2548NMEMO == "" ? "--" : strA2548NMEMO;
                                                                        
                                    me01.gridDataMemoAC.push({
                                        A2548NMEMO: strA2548NMEMO,
                                        A2548NETO: strA2548NETO,
                                        A2548TRNCU: strA2548TRNCU,
                                        A2548PREME: strA2548PREME
                                    });
                                }
                            }
                        }
                        
                        console.log({ gridDataMemoAC: me01.gridDataMemoAC });
                        
                        //Ext.getCmp(prototype.id+'-boxMemoNumber').setVisible(win.getValue('chkMemoRaised'));
                        win.setValue('lblBatch1', '');
                        win.setValue('lblBatch2', '');
                        win.setValue('lblBalanceBeginingFare', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720FARE, '0,000.00'));
                        win.setValue('lblBalanceBeginingSurcharge', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TYQ, '0,000.00'));
                        win.setValue('lblBalanceBeginingCommision', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TTCOMM+me01.beanResultSet01.fileA720.A720TTSCMM, '0,000.00'));
                        win.setValue('lblBalanceRemainingFare', '0.00');
                        win.setValue('lblBalanceRemainingSurcharge', '0.00');
                        win.setValue('lblBalanceRemainingCommision', Ext.util.Format.number(0, '0,000.00'));
                        if(me01.filterTKT.lstResultSet01.length > 1) Ext.getCmp(prototype.id+'-boxCoupons').setHeight(Ext.getCmp(prototype.id+'-boxCoupons').getHeight()+81);
                        var strTKTIND = '';

                        console.log(me01.filterTKT.lstResultSet01);
                        // <editor-fold defaultstate="collapsed" desc="gridDataTkt">
                        Ext.getCmp(prototype.id+'-gridDataTkt').getStore().removeAll();
                        n=0;
                        for(var i = 0; i < me01.filterTKT.lstResultSet01.length; i++){
                            paramsConjuntion = me01.filterTKT.lstResultSet01[i];
                            strTKTIND = paramsConjuntion.fileA720.A720SERIE.substr(4, 2);
                            if(i > 0) win.setValue('lblTicketNumberConjuntion', win.getValue('lblTicketNumberConjuntion')+((i > 1) ? '-' : '')+strTKTIND); //Exist Conjuntion TKT.
                            if(paramsConjuntion.fileA720.A720RUTA1 !== '' || paramsConjuntion.fileA720.A720CARRA1 !== ''){
                                Ext.getCmp(prototype.id+'-gridDataTkt').getStore().addSorted({
                                    TKTIND : strTKTIND,
                                    CIA : paramsConjuntion.fileA720.A720CIA,
                                    FOR : paramsConjuntion.fileA720.A720FORMA,
                                    SER : paramsConjuntion.fileA720.A720SERIE,
                                    SEQ : paramsConjuntion.fileA720.A720SEQ,
                                    CPN : '1',
                                    XO : paramsConjuntion.fileA720.A720CONEX1,
                                    ORI : paramsConjuntion.fileA720.A720RUTA0,
                                    DES : paramsConjuntion.fileA720.A720RUTA1,
                                    AL : paramsConjuntion.fileA720.A720CARRA1,
                                    FLIGHT : paramsConjuntion.fileA720.A720NVLO1,
                                    DATE : paramsConjuntion.fileA720.A720FVLO1,
                                    TIME : paramsConjuntion.fileA720.A720HVLO1,
                                    STAT : paramsConjuntion.fileA720.A720FBST1,
                                    CLS : paramsConjuntion.fileA720.A720BOOKI1,
                                    FAREBASIS : paramsConjuntion.fileA720.A720FBUSO1,
                                    CARR : paramsConjuntion.fileA720.A720CARRO1,
                                    FLIGHTOP: paramsConjuntion.fileA720.A720NVLOO1,
                                    BEFORE : paramsConjuntion.fileA720.A720NBDA1,
                                    AFTER : paramsConjuntion.fileA720.A720NADA1,
                                    ISCPN : ((paramsConjuntion.fileA720.A720RUTA0 !== '' && paramsConjuntion.fileA720.A720RUTA1 !== '' && (paramsConjuntion.fileA720.A720CARRA1 !== '**' || paramsConjuntion.fileA720.A720CARRA1 !== '..' || paramsConjuntion.fileA720.A720CARRA1 !== '')) ? 'Y' : 'N'),
                                    LEG :  (paramsConjuntion.fileA720.Leg1 === '0' ? 'N' : 'Y'),
                                    LEGSALES :  (paramsConjuntion.fileA720.LegSales1 === '0' ? 'N' : 'Y'),
                                    VALOL : paramsConjuntion.fileA720.A720VALOL1
                                });
                                if(paramsConjuntion.fileA720.A720RUTA2 !== '' || paramsConjuntion.fileA720.A720CARRA2 !== ''){
                                    Ext.getCmp(prototype.id+'-gridDataTkt').getStore().addSorted({
                                        TKTIND : strTKTIND,
                                        CIA : paramsConjuntion.fileA720.A720CIA,
                                        FOR : paramsConjuntion.fileA720.A720FORMA,
                                        SER : paramsConjuntion.fileA720.A720SERIE,
                                        SEQ : paramsConjuntion.fileA720.A720SEQ,
                                        CPN : '2',
                                        XO : paramsConjuntion.fileA720.A720CONEX2,
                                        ORI : paramsConjuntion.fileA720.A720RUTA1,
                                        DES : paramsConjuntion.fileA720.A720RUTA2,
                                        AL : paramsConjuntion.fileA720.A720CARRA2,
                                        FLIGHT : paramsConjuntion.fileA720.A720NVLO2,
                                        DATE : paramsConjuntion.fileA720.A720FVLO2,
                                        TIME : paramsConjuntion.fileA720.A720HVLO2,
                                        STAT : paramsConjuntion.fileA720.A720FBST2,
                                        CLS : paramsConjuntion.fileA720.A720BOOKI2,
                                        FAREBASIS : paramsConjuntion.fileA720.A720FBUSO2,
                                        CARR : paramsConjuntion.fileA720.A720CARRO2,
                                        FLIGHTOP: paramsConjuntion.fileA720.A720NVLOO2,
                                        BEFORE : paramsConjuntion.fileA720.A720NBDA2,
                                        AFTER : paramsConjuntion.fileA720.A720NADA2,
                                        ISCPN : ((paramsConjuntion.fileA720.A720RUTA1 !== '' && paramsConjuntion.fileA720.A720RUTA2 !== '' && (paramsConjuntion.fileA720.A720CARRA2 !== '**' || paramsConjuntion.fileA720.A720CARRA2 !== '..' || paramsConjuntion.fileA720.A720CARRA2 !== '')) ? 'Y' : 'N'),
                                        LEG :  (paramsConjuntion.fileA720.Leg2 === '0' ? 'N' : 'Y'),
                                        LEGSALES :  (paramsConjuntion.fileA720.LegSales2 === '0' ? 'N' : 'Y'),
                                        VALOL : paramsConjuntion.fileA720.A720VALOL2
                                    });
                                    if(paramsConjuntion.fileA720.A720RUTA3 !== '' || paramsConjuntion.fileA720.A720CARRA3 !== ''){
                                        Ext.getCmp(prototype.id+'-gridDataTkt').getStore().addSorted({
                                            TKTIND : strTKTIND,
                                            CIA : paramsConjuntion.fileA720.A720CIA,
                                            FOR : paramsConjuntion.fileA720.A720FORMA,
                                            SER : paramsConjuntion.fileA720.A720SERIE,
                                            SEQ : paramsConjuntion.fileA720.A720SEQ,
                                            CPN : '3',
                                            XO : paramsConjuntion.fileA720.A720CONEX3,
                                            ORI : paramsConjuntion.fileA720.A720RUTA2,
                                            DES : paramsConjuntion.fileA720.A720RUTA3,
                                            AL : paramsConjuntion.fileA720.A720CARRA3,
                                            FLIGHT : paramsConjuntion.fileA720.A720NVLO3,
                                            DATE : paramsConjuntion.fileA720.A720FVLO3,
                                            TIME : paramsConjuntion.fileA720.A720HVLO3,
                                            STAT : paramsConjuntion.fileA720.A720FBST3,
                                            CLS : paramsConjuntion.fileA720.A720BOOKI3,
                                            FAREBASIS : paramsConjuntion.fileA720.A720FBUSO3,
                                            CARR : paramsConjuntion.fileA720.A720CARRO3,
                                            FLIGHTOP: paramsConjuntion.fileA720.A720NVLOO3,
                                            BEFORE : paramsConjuntion.fileA720.A720NBDA3,
                                            AFTER : paramsConjuntion.fileA720.A720NADA3,
                                            ISCPN : ((paramsConjuntion.fileA720.A720RUTA2 !== '' && paramsConjuntion.fileA720.A720RUTA3 !== '' && (paramsConjuntion.fileA720.A720CARRA3 !== '**' || paramsConjuntion.fileA720.A720CARRA3 !== '..' || paramsConjuntion.fileA720.A720CARRA3 !== '')) ? 'Y' : 'N'),
                                            LEG :  (paramsConjuntion.fileA720.Leg3 === '0' ? 'N' : 'Y'),
                                            LEGSALES :  (paramsConjuntion.fileA720.LegSales3 === '0' ? 'N' : 'Y'),
                                            VALOL : paramsConjuntion.fileA720.A720VALOL3
                                        });
                                        if(paramsConjuntion.fileA720.A720RUTA4 !== '' || paramsConjuntion.fileA720.A720CARRA4 !== ''){
                                            Ext.getCmp(prototype.id+'-gridDataTkt').getStore().addSorted({
                                                TKTIND : strTKTIND,
                                                CIA : paramsConjuntion.fileA720.A720CIA,
                                                FOR : paramsConjuntion.fileA720.A720FORMA,
                                                SER : paramsConjuntion.fileA720.A720SERIE,
                                                SEQ : paramsConjuntion.fileA720.A720SEQ,
                                                CPN : '4',
                                                XO : paramsConjuntion.fileA720.A720CONEX4,
                                                ORI : paramsConjuntion.fileA720.A720RUTA3,
                                                DES : paramsConjuntion.fileA720.A720RUTA4,
                                                AL : paramsConjuntion.fileA720.A720CARRA4,
                                                FLIGHT : paramsConjuntion.fileA720.A720NVLO4,
                                                DATE : paramsConjuntion.fileA720.A720FVLO4,
                                                TIME : paramsConjuntion.fileA720.A720HVLO4,
                                                STAT : paramsConjuntion.fileA720.A720FBST4,
                                                CLS : paramsConjuntion.fileA720.A720BOOKI4,
                                                FAREBASIS : paramsConjuntion.fileA720.A720FBUSO4,
                                                CARR : paramsConjuntion.fileA720.A720CARRO4,
                                                FLIGHTOP: paramsConjuntion.fileA720.A720NVLOO4,
                                                BEFORE : paramsConjuntion.fileA720.A720NBDA4,
                                                AFTER : paramsConjuntion.fileA720.A720NADA4,
                                                ISCPN : ((paramsConjuntion.fileA720.A720RUTA3 !== '' && paramsConjuntion.fileA720.A720RUTA4 !== '' && (paramsConjuntion.fileA720.A720CARRA4 !== '**' || paramsConjuntion.fileA720.A720CARRA4 !== '..' || paramsConjuntion.fileA720.A720CARRA4 !== '')) ? 'Y' : 'N'),
                                                LEG :  (paramsConjuntion.fileA720.Leg4 === '0' ? 'N' : 'Y'),
                                                LEGSALES :  (paramsConjuntion.fileA720.LegSales4 === '0' ? 'N' : 'Y'),
                                                VALOL : paramsConjuntion.fileA720.A720VALOL4
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        // </editor-fold>
                        console.log("gridDataTkt: "+Ext.getCmp(prototype.id+'-gridDataTkt').getStore().data.length);
                        Ext.getCmp(prototype.id+'-gridDataTkt').getView().refresh();
                        
                        console.log(me01.filterTKT.lstResultSet02);
                        console.log(me01.filterTKT.lstResultSet03);
                        console.log(me01.filterTKT.lstResultSet11);
                        console.log(me01.filterTKT.lstResultSet12);
                        console.log(me01.filterTKT.lstResultSet13);
                        console.log(me01.filterTKT.lstResultSet15);
                        
                        // <editor-fold defaultstate="collapsed" desc="gridDataTktRealUses">
                        //Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().removeAll();
                        me.gridDataTktRealUsesAC = [ ];
                        //Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().setRemoteSort(false);
                        //Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().setSorters([{ property: 'CPN' }]);
                        var STR_MATCH='MATCH';
                        var STR_UNMATCH='UNMATCH';
                        n=0;
                        /* BEGIN - MATCH */
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet02">
                        
                        if(me01.filterTKT.lstResultSet02.length > 0){
                          for(var i2 = 0; i2 < me01.filterTKT.lstResultSet02.length; i2++){
                                paramsResultSet02 = me01.filterTKT.lstResultSet02[i2];
                                if(paramsResultSet02.fileA730.A730TYPCP1.trim()!=='' && paramsResultSet02.fileA730.A730TYPCP1.trim()!=='XX')
                                {
                                    bolA730CUPON1 = false;
                                    bolA730CUPON2 = false;
                                    bolA730CUPON3 = false;
                                    bolA730CUPON4 = false;
                                    if(paramsResultSet02.fileA730.A730CUPON1 !== ''){
                                        switch(paramsResultSet02.fileA730.A730CUPON1){
                                            case '1':
                                                bolA730CUPON1 = true;
                                                break;
                                            case '2':
                                                bolA730CUPON2 = true;
                                                break;
                                            case '3':
                                                bolA730CUPON3 = true;
                                                break;
                                            case '4':
                                                bolA730CUPON4 = true;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if(paramsResultSet02.fileA730.A730CUPON2 !== ''){
                                        switch(paramsResultSet02.fileA730.A730CUPON2){
                                            case '1':
                                                bolA730CUPON1 = true;
                                                break;
                                            case '2':
                                                bolA730CUPON2 = true;
                                                break;
                                            case '3':
                                                bolA730CUPON3 = true;
                                                break;
                                            case '4':
                                                bolA730CUPON4 = true;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if(paramsResultSet02.fileA730.A730CUPON3 !== ''){
                                        switch(paramsResultSet02.fileA730.A730CUPON3){
                                            case '1':
                                                bolA730CUPON1 = true;
                                                break;
                                            case '2':
                                                bolA730CUPON2 = true;
                                                break;
                                            case '3':
                                                bolA730CUPON3 = true;
                                                break;
                                            case '4':
                                                bolA730CUPON4 = true;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if(paramsResultSet02.fileA730.A730CUPON4 !== ''){
                                        switch(paramsResultSet02.fileA730.A730CUPON4){
                                            case '1':
                                                bolA730CUPON1 = true;
                                                break;
                                            case '2':
                                                bolA730CUPON2 = true;
                                                break;
                                            case '3':
                                                bolA730CUPON3 = true;
                                                break;
                                            case '4':
                                                bolA730CUPON4 = true;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if(bolA730CUPON1 === true){
                                        strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                        me01.gridDataTktRealUsesAC.push({
                                            TKTIND : strTKTIND,
                                            /*
                                            CIA : paramsResultSet02.fileA730.A730CIA,
                                            FOR : paramsResultSet02.fileA730.A730FORMA,
                                            SER : paramsResultSet02.fileA730.A730SERIE,
                                            */  
                                            STATUS : STR_MATCH,
                                            CIA : paramsResultSet02.fileA730.A730CIA720,
                                            FOR : paramsResultSet02.fileA730.A730FOR720,
                                            SER : paramsResultSet02.fileA730.A730SER720,
                                            SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                            CPN : '1',
                                            ORI : paramsResultSet02.fileA730.A730RUTA0,
                                            DES : paramsResultSet02.fileA730.A730RUTA1,
                                            AL: paramsResultSet02.fileA730.A730CARRA1,
                                            FLIGHT : paramsResultSet02.fileA730.A730NVLO1,
                                            DATE : paramsResultSet02.fileA730.A730FECVTA,
                                            //STAT : 'EXCH',
											STAT : paramsResultSet02.fileA730.A720TKVOID ==='V' ? 'EXCH-VOID' : 'EXCH',																		   
                                            AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR1, '0,000.00'),
                                            CRCY : paramsResultSet02.fileA730.A730MONREG,
                                            FARE : paramsResultSet02.fileA730.A730FBUSO1
                                        });
                                        //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                        //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                        //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                        //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                        intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                        //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                        intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                    }
                                    if(bolA730CUPON2 === true){
                                            strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    /*
                                                    CIA : paramsResultSet02.fileA730.A730CIA,
                                                    FOR : paramsResultSet02.fileA730.A730FORMA,
                                                    SER : paramsResultSet02.fileA730.A730SERIE,
                                                    */
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet02.fileA730.A730CIA720,
                                                    FOR : paramsResultSet02.fileA730.A730FOR720,
                                                    SER : paramsResultSet02.fileA730.A730SER720,
                                                    SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                                    CPN : '2',
                                                    ORI : paramsResultSet02.fileA730.A730RUTA1,
                                                    DES : paramsResultSet02.fileA730.A730RUTA2,
                                                    AL: paramsResultSet02.fileA730.A730CARRA2,
                                                    FLIGHT : paramsResultSet02.fileA730.A730NVLO2,
                                                    DATE : paramsResultSet02.fileA730.A730FECVTA,
                                                    //STAT : 'EXCH',
													STAT : paramsResultSet02.fileA730.A720TKVOID ==='V' ? 'EXCH-VOID' : 'EXCH',																		   
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR2, '0,000.00'),
                                                    CRCY : paramsResultSet02.fileA730.A730MONREG,
                                                    FARE : paramsResultSet02.fileA730.A730FBUSO2
                                            });

                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;

                                    }
                                    if(bolA730CUPON3 === true){
                                            strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    /*
                                                    CIA : paramsResultSet02.fileA730.A730CIA,
                                                    FOR : paramsResultSet02.fileA730.A730FORMA,
                                                    SER : paramsResultSet02.fileA730.A730SERIE,
                                                    */
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet02.fileA730.A730CIA720,
                                                    FOR : paramsResultSet02.fileA730.A730FOR720,
                                                    SER : paramsResultSet02.fileA730.A730SER720,
                                                    SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                                    CPN : '3',
                                                    ORI : paramsResultSet02.fileA730.A730RUTA2,
                                                    DES : paramsResultSet02.fileA730.A730RUTA3,
                                                    AL: paramsResultSet02.fileA730.A730CARRA3,
                                                    FLIGHT : paramsResultSet02.fileA730.A730NVLO3,
                                                    DATE : paramsResultSet02.fileA730.A730FECVTA,
                                                    //STAT : 'EXCH',
													STAT : paramsResultSet02.fileA730.A720TKVOID ==='V' ? 'EXCH-VOID' : 'EXCH',																		   
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR3, '0,000.00'),
                                                    CRCY : paramsResultSet02.fileA730.A730MONREG,
                                                    FARE : paramsResultSet02.fileA730.A730FBUSO3
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                    }
                                    if(bolA730CUPON4 === true){
                                            strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    /*
                                                    CIA : paramsResultSet02.fileA730.A730CIA,
                                                    FOR : paramsResultSet02.fileA730.A730FORMA,
                                                    SER : paramsResultSet02.fileA730.A730SERIE,
                                                    */
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet02.fileA730.A730CIA720,
                                                    FOR : paramsResultSet02.fileA730.A730FOR720,
                                                    SER : paramsResultSet02.fileA730.A730SER720,
                                                    SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                                    CPN : '4',
                                                    ORI : paramsResultSet02.fileA730.A730RUTA3,
                                                    DES : paramsResultSet02.fileA730.A730RUTA4,
                                                    AL: paramsResultSet02.fileA730.A730CARRA4,
                                                    FLIGHT : paramsResultSet02.fileA730.A730NVLO4,
                                                    DATE : paramsResultSet02.fileA730.A730FECVTA,
                                                    //STAT : 'EXCH',
													STAT : paramsResultSet02.fileA730.A720TKVOID ==='V' ? 'EXCH-VOID' : 'EXCH',																		   
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR4, '0,000.00'),
                                                    CRCY : paramsResultSet02.fileA730.A730MONREG,
                                                    FARE : paramsResultSet02.fileA730.A730FBUSO4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                    }
                                } // END IF SEQ
                            } // END FOR
                            
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet03">
                        if(me01.filterTKT.lstResultSet03.length > 0){
                            for(var i3 = 0; i3 < me01.filterTKT.lstResultSet03.length; i3++){
                                paramsResultSet03 = me01.filterTKT.lstResultSet03[i3];
                                if(paramsResultSet03.fileA713.A713SEQ.trim()!=='' && paramsResultSet03.fileA713.A713SEQ.trim()!=='XX')
                                {   
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(0, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '1' || paramsResultSet03.fileA713.A713CUPON2 === '1' || paramsResultSet03.fileA713.A713CUPON3 === '1' || paramsResultSet03.fileA713.A713CUPON4 === '1'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '1',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA0,
                                                    DES : paramsResultSet03.fileA713.A713RUTA1,
                                                    AL: paramsResultSet03.fileA713.A713CARRA1,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO1,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO1,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR1, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO1,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            ///intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            }
                                    }
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(1, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '2' || paramsResultSet03.fileA713.A713CUPON2 === '2' || paramsResultSet03.fileA713.A713CUPON3 === '2' || paramsResultSet03.fileA713.A713CUPON4 == '2'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '2',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA1,
                                                    DES : paramsResultSet03.fileA713.A713RUTA2,
                                                    AL: paramsResultSet03.fileA713.A713CARRA2,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO2,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO2,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR2, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO2,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;                                            
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            }
                                    }
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(2, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '3' || paramsResultSet03.fileA713.A713CUPON2 === '3' || paramsResultSet03.fileA713.A713CUPON3 === '3' || paramsResultSet03.fileA713.A713CUPON4 === '3'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '3',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA2,
                                                    DES : paramsResultSet03.fileA713.A713RUTA3,
                                                    AL: paramsResultSet03.fileA713.A713CARRA3,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO3,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO3,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR3, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO3,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            }
                                    }
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(3, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '4' || paramsResultSet03.fileA713.A713CUPON2 === '4' || paramsResultSet03.fileA713.A713CUPON3 === '4' || paramsResultSet03.fileA713.A713CUPON4 === '4'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_MATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '4',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA3,
                                                    DES : paramsResultSet03.fileA713.A713RUTA4,
                                                    AL: paramsResultSet03.fileA713.A713CARRA4,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO4,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO4,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR4, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO4,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {     
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            }
                                    }
                                } // END IF SEQ
                            } //END FOR
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet11">
                        if(me01.filterTKT.lstResultSet11.length > 0){
                            for(var i11 = 0; i11 < me01.filterTKT.lstResultSet11.length; i11++){
                                paramsResultSet11 = me01.filterTKT.lstResultSet11[i11];
                                if(paramsResultSet11.fileA1692.SEQRO.trim()!=='' && paramsResultSet11.fileA1692.SEQRO.trim()!=='XX')
                                {
                                    strTKTIND = (paramsResultSet11.fileA1692.SERIE.length === 6) ? paramsResultSet11.fileA1692.SERIE.substr(4, 2) : '';
                                    me01.filterTKT.VP_A1716SEQF = paramsResultSet11.fileA1692.SEQRO.trim();
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        STATUS : STR_MATCH,
                                        CIA : paramsResultSet11.fileA1692.CCIA,
                                        FOR : paramsResultSet11.fileA1692.FORMA,
                                        SER : paramsResultSet11.fileA1692.SERIE,
                                        SEQ : paramsResultSet11.fileA1692.SEQ.trim(),
                                        SEQRO : paramsResultSet11.fileA1692.SEQRO.trim(),
                                        CPN : paramsResultSet11.fileA1692.CUPON,
                                        ORI : paramsResultSet11.fileA1692.CDEPART,
                                        DES : paramsResultSet11.fileA1692.CARRIVA,
                                        AL: paramsResultSet11.fileA1692.CARR,
                                        FLIGHT : paramsResultSet11.fileA1692.NFLIGHT,
                                        DATE : paramsResultSet11.fileA1692.DFLIGHT,
                                        STAT : 'FLWN',
                                        AMOUNT : Ext.util.Format.number(paramsResultSet11.fileA1692.VCPN, '0,000.00'),
                                        CRCY : paramsResultSet11.fileA1692.MDACP,
                                        FARE : paramsResultSet11.fileA1692.FBASE
                                    });
                                    switch(paramsResultSet11.fileA1692.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                           // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    } // END IF
                                } // END IF SEQ
                            }// END FOR
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet12">
                        if(me01.filterTKT.lstResultSet12.length > 0){
                            for(i11 = 0; i11 < me01.filterTKT.lstResultSet12.length; i11++){
                                paramsResultSet12 = me01.filterTKT.lstResultSet12[i11];
                                if(paramsResultSet12.fileA1818.SEQRO.trim()!=='' && paramsResultSet12.fileA1818.SEQRO.trim()!=='XX')
                                {
                                    strTKTIND = (paramsResultSet12.fileA1818.SERIE.length === 6) ? paramsResultSet12.fileA1818.SERIE.substr(4, 2) : '';
                                    me01.filterTKT.VP_A1716SEQF = paramsResultSet12.fileA1818.SEQRO.trim();
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        STATUS : STR_MATCH,
                                        CIA : paramsResultSet12.fileA1818.CCIA,
                                        FOR : paramsResultSet12.fileA1818.FORMA,
                                        SER : paramsResultSet12.fileA1818.SERIE,
                                        SEQ : paramsResultSet12.fileA1818.SEQ.trim(),
                                        SEQRO : paramsResultSet12.fileA1818.SEQRO.trim(),
                                        CPN : paramsResultSet12.fileA1818.CUPON,
                                        ORI : paramsResultSet12.fileA1818.CDEPART,
                                        DES : paramsResultSet12.fileA1818.CARRIVA,
                                        AL: paramsResultSet12.fileA1818.CARR,
                                        FLIGHT : paramsResultSet12.fileA1818.NFLIGHT,
                                        DATE : paramsResultSet12.fileA1818.DFLIGHT,
                                        STAT : 'FLWN-EMD',
                                        AMOUNT : Ext.util.Format.number(paramsResultSet12.fileA1818.VCPN, '0,000.00'),
                                        CRCY : paramsResultSet12.fileA1818.MDACP,
                                        FARE : paramsResultSet12.fileA1818.FBASE
                                    });
                                    switch(paramsResultSet12.fileA1818.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                           // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    }
                                } // END FOR
                            } // END FOR
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet13">
                        if(me01.filterTKT.lstResultSet13.length > 0){
                            for(i11 = 0; i11 < me01.filterTKT.lstResultSet13.length; i11++){
                                paramsResultSet13 = me01.filterTKT.lstResultSet13[i11];
                                if(paramsResultSet13.fileA1200.SEQ.trim()!=='' && paramsResultSet13.fileA1200.SEQ.trim()!=='XX')
                                {  
                                    strTKTIND = (paramsResultSet13.fileA1200.SERIE.length === 6) ? paramsResultSet13.fileA1200.SERIE.substr(4, 2) : '';
                                    me01.filterTKT.VP_A1716SEQI = paramsResultSet13.fileA1200.SEQ.trim();
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        STATUS : STR_MATCH,
                                        CIA : paramsResultSet13.fileA1200.CCIA,
                                        FOR : paramsResultSet13.fileA1200.FORMA,
                                        SER : paramsResultSet13.fileA1200.SERIE,
                                        SEQ : paramsResultSet13.fileA1200.SEQ.trim(),
                                        CPN : paramsResultSet13.fileA1200.CUPON,
                                        ORI : paramsResultSet13.fileA1200.RUTA_FROM,
                                        DES : paramsResultSet13.fileA1200.RUTA_TO,
                                        AL: paramsResultSet13.fileA1200.CARR,
                                        FLIGHT : '',
                                        DATE : paramsResultSet13.fileA1200.DFLIGHT,
                                        STAT : 'INTL',
                                        AMOUNT : Ext.util.Format.number(paramsResultSet13.fileA1200.GROSS, '0,000.00'),
                                        CRCY : paramsResultSet13.fileA1200.CURRENC,
                                        FARE : paramsResultSet13.fileA1200.FBASIS
                                    });
                                    switch(paramsResultSet13.fileA1200.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                           // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    }
                                } // END IF SEQ
                            } // END FOR
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet15">
                        if(me01.filterTKT.lstResultSet15.length > 0){
                            for(var i16 = 0; i16 < me01.filterTKT.lstResultSet15.length; i16++){
                                paramsResultSet15 = me01.filterTKT.lstResultSet15[i16];
                                if(paramsResultSet15.fileA1747.SEQ.trim()!=='' && paramsResultSet15.fileA1747.SEQ.trim()!=='XX')
                                { 
                                    strTKTIND = (paramsResultSet15.fileA1747.SERIE.length === 6) ? paramsResultSet15.fileA1747.SERIE.substr(4, 2) : '';
                                    me01.gridDataTktRealUsesAC.push({
                                            TKTIND : strTKTIND,
                                            STATUS : STR_MATCH,
                                            CIA : paramsResultSet15.fileA1747.CCIA,
                                            FOR : paramsResultSet15.fileA1747.FORMA,
                                            SER : paramsResultSet15.fileA1747.SERIE,
                                            SEQ : paramsResultSet15.fileA1747.SEQ,
                                            CPN : paramsResultSet15.fileA1747.CUPON,
                                            ORI : paramsResultSet15.fileA1747.CDEPART,
                                            DES : paramsResultSet15.fileA1747.CARRIVA,
                                            AL: paramsResultSet15.fileA1747.CARR,
                                            FLIGHT : paramsResultSet15.fileA1747.NFLIGHT,
                                            DATE : paramsResultSet15.fileA1747.DFLIGHT,
                                            STAT : 'DISC',
                                            AMOUNT : Ext.util.Format.number(paramsResultSet15.fileA1747.VCPN, '0,000.00'),
                                            CRCY : paramsResultSet15.fileA1747.MDACP,
                                            FARE : paramsResultSet15.fileA1747.FBASE
                                    });
                                    switch(paramsResultSet15.fileA1747.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                           // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822 
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    }
                                }
                            } // END FOR
                        } // END IF
                        // </editor-fold>
                        
                        /* END - MATCH */
                        
                        /* BEGIN - UNMATCH */
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet02">

                         if(me01.filterTKT.lstResultSet02.length > 0){
                           for(var i2 = 0; i2 < me01.filterTKT.lstResultSet02.length; i2++){
                                 paramsResultSet02 = me01.filterTKT.lstResultSet02[i2];
                                 if(paramsResultSet02.fileA730.A730TYPCP1.trim()==='' || paramsResultSet02.fileA730.A730TYPCP1.trim()==='XX')
                                 {
                                     bolA730CUPON1 = false;
                                     bolA730CUPON2 = false;
                                     bolA730CUPON3 = false;
                                     bolA730CUPON4 = false;
                                     if(paramsResultSet02.fileA730.A730CUPON1 !== ''){
                                         switch(paramsResultSet02.fileA730.A730CUPON1){
                                             case '1':
                                                 bolA730CUPON1 = true;
                                                 break;
                                             case '2':
                                                 bolA730CUPON2 = true;
                                                 break;
                                             case '3':
                                                 bolA730CUPON3 = true;
                                                 break;
                                             case '4':
                                                 bolA730CUPON4 = true;
                                                 break;
                                             default:
                                                 break;
                                         }
                                     }
                                     if(paramsResultSet02.fileA730.A730CUPON2 !== ''){
                                         switch(paramsResultSet02.fileA730.A730CUPON2){
                                             case '1':
                                                 bolA730CUPON1 = true;
                                                 break;
                                             case '2':
                                                 bolA730CUPON2 = true;
                                                 break;
                                             case '3':
                                                 bolA730CUPON3 = true;
                                                 break;
                                             case '4':
                                                 bolA730CUPON4 = true;
                                                 break;
                                             default:
                                                 break;
                                         }
                                     }
                                     if(paramsResultSet02.fileA730.A730CUPON3 !== ''){
                                         switch(paramsResultSet02.fileA730.A730CUPON3){
                                             case '1':
                                                 bolA730CUPON1 = true;
                                                 break;
                                             case '2':
                                                 bolA730CUPON2 = true;
                                                 break;
                                             case '3':
                                                 bolA730CUPON3 = true;
                                                 break;
                                             case '4':
                                                 bolA730CUPON4 = true;
                                                 break;
                                             default:
                                                 break;
                                         }
                                     }
                                     if(paramsResultSet02.fileA730.A730CUPON4 !== ''){
                                         switch(paramsResultSet02.fileA730.A730CUPON4){
                                             case '1':
                                                 bolA730CUPON1 = true;
                                                 break;
                                             case '2':
                                                 bolA730CUPON2 = true;
                                                 break;
                                             case '3':
                                                 bolA730CUPON3 = true;
                                                 break;
                                             case '4':
                                                 bolA730CUPON4 = true;
                                                 break;
                                             default:
                                                 break;
                                         }
                                     }
                                     if(bolA730CUPON1 === true){
                                         strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                         me01.gridDataTktRealUsesAC.push({
                                             TKTIND : strTKTIND,
                                             /*
                                             CIA : paramsResultSet02.fileA730.A730CIA,
                                             FOR : paramsResultSet02.fileA730.A730FORMA,
                                             SER : paramsResultSet02.fileA730.A730SERIE,
                                             */ 
                                             STATUS : STR_UNMATCH,
                                             CIA : paramsResultSet02.fileA730.A730CIA720,
                                             FOR : paramsResultSet02.fileA730.A730FOR720,
                                             SER : paramsResultSet02.fileA730.A730SER720,
                                             SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                             CPN : '1',
                                             ORI : paramsResultSet02.fileA730.A730RUTA0,
                                             DES : paramsResultSet02.fileA730.A730RUTA1,
                                             AL: paramsResultSet02.fileA730.A730CARRA1,
                                             FLIGHT : paramsResultSet02.fileA730.A730NVLO1,
                                             DATE : paramsResultSet02.fileA730.A730FECVTA,
                                             STAT : 'EXCH',
                                             AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR1, '0,000.00'),
                                             CRCY : paramsResultSet02.fileA730.A730MONREG,
                                             FARE : paramsResultSet02.fileA730.A730FBUSO1
                                         });
                                         //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                         //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                         //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                         //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                         intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                         //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                         intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                     }
                                     if(bolA730CUPON2 === true){
                                             strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                             me01.gridDataTktRealUsesAC.push({
                                                     TKTIND : strTKTIND,
                                                     /*
                                                     CIA : paramsResultSet02.fileA730.A730CIA,
                                                     FOR : paramsResultSet02.fileA730.A730FORMA,
                                                     SER : paramsResultSet02.fileA730.A730SERIE,
                                                     */
                                                     STATUS : STR_UNMATCH,
                                                     CIA : paramsResultSet02.fileA730.A730CIA720,
                                                     FOR : paramsResultSet02.fileA730.A730FOR720,
                                                     SER : paramsResultSet02.fileA730.A730SER720,
                                                     SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                                     CPN : '2',
                                                     ORI : paramsResultSet02.fileA730.A730RUTA1,
                                                     DES : paramsResultSet02.fileA730.A730RUTA2,
                                                     AL: paramsResultSet02.fileA730.A730CARRA2,
                                                     FLIGHT : paramsResultSet02.fileA730.A730NVLO2,
                                                     DATE : paramsResultSet02.fileA730.A730FECVTA,
                                                     STAT : 'EXCH',
                                                     AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR2, '0,000.00'),
                                                     CRCY : paramsResultSet02.fileA730.A730MONREG,
                                                     FARE : paramsResultSet02.fileA730.A730FBUSO2
                                             });

                                             //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                             //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                             //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                             //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                             intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                             //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                             intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;

                                     }
                                     if(bolA730CUPON3 === true){
                                             strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                             me01.gridDataTktRealUsesAC.push({
                                                     TKTIND : strTKTIND,
                                                     /*
                                                     CIA : paramsResultSet02.fileA730.A730CIA,
                                                     FOR : paramsResultSet02.fileA730.A730FORMA,
                                                     SER : paramsResultSet02.fileA730.A730SERIE,
                                                     */
                                                     STATUS : STR_UNMATCH,
                                                     CIA : paramsResultSet02.fileA730.A730CIA720,
                                                     FOR : paramsResultSet02.fileA730.A730FOR720,
                                                     SER : paramsResultSet02.fileA730.A730SER720,
                                                     SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                                     CPN : '3',
                                                     ORI : paramsResultSet02.fileA730.A730RUTA2,
                                                     DES : paramsResultSet02.fileA730.A730RUTA3,
                                                     AL: paramsResultSet02.fileA730.A730CARRA3,
                                                     FLIGHT : paramsResultSet02.fileA730.A730NVLO3,
                                                     DATE : paramsResultSet02.fileA730.A730FECVTA,
                                                     STAT : 'EXCH',
                                                     AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR3, '0,000.00'),
                                                     CRCY : paramsResultSet02.fileA730.A730MONREG,
                                                     FARE : paramsResultSet02.fileA730.A730FBUSO3
                                             });
                                             //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                             //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                             //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                             //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                             intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                             //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                             intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                     }
                                     if(bolA730CUPON4 === true){
                                             strTKTIND = paramsResultSet02.fileA730.A730SERIE.substr(4, 2);
                                             me01.gridDataTktRealUsesAC.push({
                                                     TKTIND : strTKTIND,
                                                     /*
                                                     CIA : paramsResultSet02.fileA730.A730CIA,
                                                     FOR : paramsResultSet02.fileA730.A730FORMA,
                                                     SER : paramsResultSet02.fileA730.A730SERIE,
                                                     */
                                                     STATUS : STR_UNMATCH,
                                                     CIA : paramsResultSet02.fileA730.A730CIA720,
                                                     FOR : paramsResultSet02.fileA730.A730FOR720,
                                                     SER : paramsResultSet02.fileA730.A730SER720,
                                                     SEQ : paramsResultSet02.fileA730.A730SEQ720.trim(),
                                                     CPN : '4',
                                                     ORI : paramsResultSet02.fileA730.A730RUTA3,
                                                     DES : paramsResultSet02.fileA730.A730RUTA4,
                                                     AL: paramsResultSet02.fileA730.A730CARRA4,
                                                     FLIGHT : paramsResultSet02.fileA730.A730NVLO4,
                                                     DATE : paramsResultSet02.fileA730.A730FECVTA,
                                                     STAT : 'EXCH',
                                                     AMOUNT : Ext.util.Format.number(paramsResultSet02.fileA730.A730VALOR4, '0,000.00'),
                                                     CRCY : paramsResultSet02.fileA730.A730MONREG,
                                                     FARE : paramsResultSet02.fileA730.A730FBUSO4
                                             });
                                             //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                             //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                             //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                             //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                             intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                             //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                             intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                     }
                                 } // END IF SEQ
                             } // END FOR

                         } // END IF
                         // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet03">
                        if(me01.filterTKT.lstResultSet03.length > 0){
                            for(var i3 = 0; i3 < me01.filterTKT.lstResultSet03.length; i3++){
                                paramsResultSet03 = me01.filterTKT.lstResultSet03[i3];
                                if(paramsResultSet03.fileA713.A713SEQ.trim()==='' || paramsResultSet03.fileA713.A713SEQ.trim()==='XX')
                                {   
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(0, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '1' || paramsResultSet03.fileA713.A713CUPON2 === '1' || paramsResultSet03.fileA713.A713CUPON3 === '1' || paramsResultSet03.fileA713.A713CUPON4 === '1'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_UNMATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '1',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA0,
                                                    DES : paramsResultSet03.fileA713.A713RUTA1,
                                                    AL: paramsResultSet03.fileA713.A713CARRA1,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO1,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO1,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR1, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO1,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {     
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            }
                                    }
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(1, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '2' || paramsResultSet03.fileA713.A713CUPON2 === '2' || paramsResultSet03.fileA713.A713CUPON3 === '2' || paramsResultSet03.fileA713.A713CUPON4 == '2'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_UNMATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '2',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA1,
                                                    DES : paramsResultSet03.fileA713.A713RUTA2,
                                                    AL: paramsResultSet03.fileA713.A713CARRA2,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO2,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO2,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR2, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO2,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {     
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            }
                                    }
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(2, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '3' || paramsResultSet03.fileA713.A713CUPON2 === '3' || paramsResultSet03.fileA713.A713CUPON3 === '3' || paramsResultSet03.fileA713.A713CUPON4 === '3'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_UNMATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '3',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA2,
                                                    DES : paramsResultSet03.fileA713.A713RUTA3,
                                                    AL: paramsResultSet03.fileA713.A713CARRA3,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO3,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO3,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR3, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO3,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {      
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            }
                                    }
                                    //if(paramsResultSet03.fileA713.A713CPUI.substr(3, 1) == 'R'){
                                    if(paramsResultSet03.fileA713.A713CUPON1 === '4' || paramsResultSet03.fileA713.A713CUPON2 === '4' || paramsResultSet03.fileA713.A713CUPON3 === '4' || paramsResultSet03.fileA713.A713CUPON4 === '4'){
                                            strTKTIND = paramsResultSet03.fileA713.A713SERIE.substr(4, 2);
                                            me01.filterTKT.VP_A1716SEQR = paramsResultSet03.fileA713.A713SEQ.trim();
                                            me01.gridDataTktRealUsesAC.push({
                                                    TKTIND : strTKTIND,
                                                    STATUS : STR_UNMATCH,
                                                    CIA : paramsResultSet03.fileA713.A713CIA,
                                                    FOR : paramsResultSet03.fileA713.A713FORMA,
                                                    SER : paramsResultSet03.fileA713.A713SERIE,
                                                    SEQ : paramsResultSet03.fileA713.A713SEQ.trim(),
                                                    CPN : '4',
                                                    ORI : paramsResultSet03.fileA713.A713RUTA3,
                                                    DES : paramsResultSet03.fileA713.A713RUTA4,
                                                    AL: paramsResultSet03.fileA713.A713CARRA4,
                                                    FLIGHT : paramsResultSet03.fileA713.A713NVLO4,
                                                    //DATE : paramsResultSet03.fileA713.A713FVLO4,
                                                    DATE : paramsResultSet03.fileA713.A713FECVTA,
                                                    STAT : paramsResultSet03.fileA713.A713TDOC ==='VOID' ? 'RFND-VOID' : 'RFND',
                                                    AMOUNT : Ext.util.Format.number(paramsResultSet03.fileA713.A713VALOR4, '0,000.00'),
                                                    CRCY : paramsResultSet03.fileA713.A713MONREG,
                                                    FARE : paramsResultSet03.fileA713.A713FBUSO4,
                                                    CUPON1 : paramsResultSet03.fileA713.A713CUPON1,
                                                    CUPON2 : paramsResultSet03.fileA713.A713CUPON2,
                                                    CUPON3 : paramsResultSet03.fileA713.A713CUPON3,
                                                    CUPON4 : paramsResultSet03.fileA713.A713CUPON4
                                            });
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            if(paramsResultSet03.fileA713.A713TDOC !=='VOID')
                                            {
                                                intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                                //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            }
                                    }
                                } // END IF SEQ
                            } //END FOR
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet11">
                        if(me01.filterTKT.lstResultSet11.length > 0){
                            for(var i11 = 0; i11 < me01.filterTKT.lstResultSet11.length; i11++){
                                paramsResultSet11 = me01.filterTKT.lstResultSet11[i11];
                                if(paramsResultSet11.fileA1692.SEQRO.trim()==='' || paramsResultSet11.fileA1692.SEQRO.trim()==='XX')
                                {
                                    strTKTIND = (paramsResultSet11.fileA1692.SERIE.length === 6) ? paramsResultSet11.fileA1692.SERIE.substr(4, 2) : '';
                                    //me01.filterTKT.VP_A1716SEQF = paramsResultSet11.fileA1692.SEQ.trim();
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        STATUS : STR_UNMATCH,
                                        CIA : paramsResultSet11.fileA1692.CCIA,
                                        FOR : paramsResultSet11.fileA1692.FORMA,
                                        SER : paramsResultSet11.fileA1692.SERIE,
                                        SEQ : paramsResultSet11.fileA1692.SEQ.trim(),
                                        SEQRO : paramsResultSet11.fileA1692.SEQRO.trim(),
                                        CPN : paramsResultSet11.fileA1692.CUPON,
                                        ORI : paramsResultSet11.fileA1692.CDEPART,
                                        DES : paramsResultSet11.fileA1692.CARRIVA,
                                        AL: paramsResultSet11.fileA1692.CARR,
                                        FLIGHT : paramsResultSet11.fileA1692.NFLIGHT,
                                        DATE : paramsResultSet11.fileA1692.DFLIGHT,
                                        STAT : 'FLWN',
                                        AMOUNT : Ext.util.Format.number(paramsResultSet11.fileA1692.VCPN, '0,000.00'),
                                        CRCY : paramsResultSet11.fileA1692.MDACP,
                                        FARE : paramsResultSet11.fileA1692.FBASE
                                    });
                                    switch(paramsResultSet11.fileA1692.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    } // END IF
                                } // END IF SEQ
                            }// END FOR
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet12">
                        if(me01.filterTKT.lstResultSet12.length > 0){
                            for(i11 = 0; i11 < me01.filterTKT.lstResultSet12.length; i11++){
                                paramsResultSet12 = me01.filterTKT.lstResultSet12[i11];
                                if(paramsResultSet12.fileA1818.SEQRO.trim()==='' || paramsResultSet12.fileA1818.SEQRO.trim()==='XX')
                                {
                                    strTKTIND = (paramsResultSet12.fileA1818.SERIE.length === 6) ? paramsResultSet12.fileA1818.SERIE.substr(4, 2) : '';
                                    //me01.filterTKT.VP_A1716SEQF = paramsResultSet12.fileA1818.SEQ.trim();
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        STATUS : STR_UNMATCH,
                                        CIA : paramsResultSet12.fileA1818.CCIA,
                                        FOR : paramsResultSet12.fileA1818.FORMA,
                                        SER : paramsResultSet12.fileA1818.SERIE,
                                        SEQ : paramsResultSet12.fileA1818.SEQ.trim(),
                                        SEQRO : paramsResultSet12.fileA1818.SEQRO.trim(),
                                        CPN : paramsResultSet12.fileA1818.CUPON,
                                        ORI : paramsResultSet12.fileA1818.CDEPART,
                                        DES : paramsResultSet12.fileA1818.CARRIVA,
                                        AL: paramsResultSet12.fileA1818.CARR,
                                        FLIGHT : paramsResultSet12.fileA1818.NFLIGHT,
                                        DATE : paramsResultSet12.fileA1818.DFLIGHT,
                                        STAT : 'FLWN-EMD',
                                        AMOUNT : Ext.util.Format.number(paramsResultSet12.fileA1818.VCPN, '0,000.00'),
                                        CRCY : paramsResultSet12.fileA1818.MDACP,
                                        FARE : paramsResultSet12.fileA1818.FBASE
                                    });
                                    switch(paramsResultSet12.fileA1818.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822 
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); xpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    }
                                } // END FOR
                            } // END FOR
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet13">
                        if(me01.filterTKT.lstResultSet13.length > 0){
                            for(i11 = 0; i11 < me01.filterTKT.lstResultSet13.length; i11++){
                                paramsResultSet13 = me01.filterTKT.lstResultSet13[i11];
                                if(paramsResultSet13.fileA1200.SEQ.trim()==='' || paramsResultSet13.fileA1200.SEQ.trim()==='XX')
                                {  
                                    strTKTIND = (paramsResultSet13.fileA1200.SERIE.length === 6) ? paramsResultSet13.fileA1200.SERIE.substr(4, 2) : '';
                                    me01.filterTKT.VP_A1716SEQI = paramsResultSet13.fileA1200.SEQ.trim();
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        STATUS : STR_UNMATCH,
                                        CIA : paramsResultSet13.fileA1200.CCIA,
                                        FOR : paramsResultSet13.fileA1200.FORMA,
                                        SER : paramsResultSet13.fileA1200.SERIE,
                                        SEQ : paramsResultSet13.fileA1200.SEQ.trim(),
                                        CPN : paramsResultSet13.fileA1200.CUPON,
                                        ORI : paramsResultSet13.fileA1200.RUTA_FROM,
                                        DES : paramsResultSet13.fileA1200.RUTA_TO,
                                        AL: paramsResultSet13.fileA1200.CARR,
                                        FLIGHT : '',
                                        DATE : paramsResultSet13.fileA1200.DFLIGHT,
                                        STAT : 'INTL',
                                        AMOUNT : Ext.util.Format.number(paramsResultSet13.fileA1200.GROSS, '0,000.00'),
                                        CRCY : paramsResultSet13.fileA1200.CURRENC,
                                        FARE : paramsResultSet13.fileA1200.FBASIS
                                    });
                                    switch(paramsResultSet13.fileA1200.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    }
                                } // END IF SEQ
                            } // END FOR
                        } // END IF
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet15">
                        if(me01.filterTKT.lstResultSet15.length > 0){
                            for(var i16 = 0; i16 < me01.filterTKT.lstResultSet15.length; i16++){
                                paramsResultSet15 = me01.filterTKT.lstResultSet15[i16];
                                if(paramsResultSet15.fileA1747.SEQ.trim()==='' || paramsResultSet15.fileA1747.SEQ.trim()==='XX')
                                { 
                                    strTKTIND = (paramsResultSet15.fileA1747.SERIE.length === 6) ? paramsResultSet15.fileA1747.SERIE.substr(4, 2) : '';
                                    me01.gridDataTktRealUsesAC.push({
                                            TKTIND : strTKTIND,
                                            STATUS : STR_UNMATCH,
                                            CIA : paramsResultSet15.fileA1747.CCIA,
                                            FOR : paramsResultSet15.fileA1747.FORMA,
                                            SER : paramsResultSet15.fileA1747.SERIE,
                                            SEQ : paramsResultSet15.fileA1747.SEQ,
                                            CPN : paramsResultSet15.fileA1747.CUPON,
                                            ORI : paramsResultSet15.fileA1747.CDEPART,
                                            DES : paramsResultSet15.fileA1747.CARRIVA,
                                            AL: paramsResultSet15.fileA1747.CARR,
                                            FLIGHT : paramsResultSet15.fileA1747.NFLIGHT,
                                            DATE : paramsResultSet15.fileA1747.DFLIGHT,
                                            STAT : 'DISC',
                                            AMOUNT : Ext.util.Format.number(paramsResultSet15.fileA1747.VCPN, '0,000.00'),
                                            CRCY : paramsResultSet15.fileA1747.MDACP,
                                            FARE : paramsResultSet15.fileA1747.FBASE
                                    });
                                    switch(paramsResultSet15.fileA1747.CUPON){
                                        case '1':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL1;
                                            // intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '1'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ1;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                            break;
                                        case '2':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL2;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '2'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ2;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                            break;
                                        case '3':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL3;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '3'); zpp 20210822
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ3;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                            break;
                                        case '4':
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                            //intRemainingFare += beanResultSet01.fileA720.A720VALOL4;
                                            //intRemainingFare += me01.getTKTS_VALOL(strTKTIND, '4'); zpp 
                                            //intRemainingSurcharge += beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingSurcharge += me01.beanResultSet01.fileA720.A720LYQ4;
                                            //intRemainingCommision += (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                            intRemainingCommision += me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                            break;
                                    }
                                }
                            } // END FOR
                        } // END IF
                        // </editor-fold>
                        /* END - UNMATCH */
                        // <editor-fold defaultstate="collapsed" desc="lstResultSet14">
                        var objTktRealUses;
                        var bolTktRealUses;
                        var strSTAT;
                        var strREF;
                        if(me01.filterTKT.lstResultSet14.length > 0){
                            for(var i14 = 0; i14 < me01.filterTKT.lstResultSet14.length; i14++){
                                paramsResultSet14 = me01.filterTKT.lstResultSet14[i14];
                                //alert('me01.filterTKT.lstResultSet14.length:'+me01.filterTKT.lstResultSet14.length);
                        
                                bolTktRealUses = false;
                                for(var i15 = 0; i15 < Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().data.length; i15++){
                                    objTktRealUses = Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().data.items[i15].data;
                                    if(String(objTktRealUses.CPN) === paramsResultSet14.fileA2033.CUPON && (
                                                (String(objTktRealUses.STAT) === 'SALE' && paramsResultSet14.fileA2033.TTRAX === 1) ||
                                                (String(objTktRealUses.STAT) === 'EXCH' && paramsResultSet14.fileA2033.TTRAX === 2) ||
                                                (String(objTktRealUses.STAT) === 'EXCH' && paramsResultSet14.fileA2033.TTRAX === 6) ||
                                                (String(objTktRealUses.STAT) === 'RFND' && paramsResultSet14.fileA2033.TTRAX === 3) ||
                                                (String(objTktRealUses.STAT) === 'RFND' && paramsResultSet14.fileA2033.TTRAX === 7) ||
                                                (String(objTktRealUses.STAT) === 'ADAC' && paramsResultSet14.fileA2033.TTRAX === 4) ||
                                                (String(objTktRealUses.STAT) === 'FLWN' && paramsResultSet14.fileA2033.TTRAX === 5) ||
                                                (String(objTktRealUses.STAT) === 'FLWN' && paramsResultSet14.fileA2033.TTRAX === 13) ||
                                                (String(objTktRealUses.STAT) === 'INTL' && paramsResultSet14.fileA2033.TTRAX === 8) ||
                                                (String(objTktRealUses.STAT) === 'DISC' && paramsResultSet14.fileA2033.TTRAX === 9) ||
                                                (String(objTktRealUses.STAT) === 'INTC' && paramsResultSet14.fileA2033.TTRAX === 10)
                                            )
                                        ){
                                        bolTktRealUses = true;
                                        strTKTIND = objTktRealUses.TKTIND;
                                        strREF = '';
                                        if(paramsResultSet14.fileA2033.ESTTRX.trim() === 'AA0001' || paramsResultSet14.fileA2033.ESTTRX.trim() === 'AA0003'){
                                            strSTAT = String(objTktRealUses.STAT)+'-ADJ';
                                            strREF = 'VOID';
                                        }else if(paramsResultSet14.fileA2033.ESTTRX.trim() === 'AA0004'){
                                            strSTAT = String(objTktRealUses.STAT)+'-ADJ';
                                        }else{
                                            strSTAT = String(objTktRealUses.STAT);
                                        }
                                        me01.filterTKT.VP_A1716SEQA = paramsResultSet14.fileA2033.SEQ.trim();
                                        me01.gridDataTktRealUsesAC.push({
                                                TKTIND : strTKTIND,
                                                CIA : objTktRealUses.CIA,
                                                FOR : objTktRealUses.FOR,
                                                SER : objTktRealUses.SER,
                                                CPN : objTktRealUses.CPN,
                                                SEQ : paramsResultSet14.fileA2033.SEQ.trim(),
                                                ORI : objTktRealUses.ORI,
                                                DES : objTktRealUses.DES,
                                                AL: objTktRealUses.AL,
                                                FLIGHT : objTktRealUses.FLIGHT,
                                                DATE : objTktRealUses.DATE,
                                                STAT : strSTAT,
                                                REF  : strREF,
                                                AMOUNT : Ext.util.Format.number(objTktRealUses.AMOUNT, '0,000.00'),
                                                CRCY : objTktRealUses.CRCY,
                                                FARE : objTktRealUses.FARE,
                                                CORRL : paramsResultSet14.fileA2033.CORRL,
                                                ESTADO : paramsResultSet14.fileA2033.ESTADO,
                                                TTRANS : paramsResultSet14.fileA2033.TTRANS,
                                                TTRAX : paramsResultSet14.fileA2033.TTRAX
                                        });
                                        switch(paramsResultSet14.fileA2033.CUPON){
                                            case '1':
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOR1 / beanResultSet01.fileA720.A720TCAMB;
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOL1;
                                                intRemainingFare -= me01.getTKTS_VALOL(strTKTIND, '1');
                                                //intRemainingSurcharge -= beanResultSet01.fileA720.A720YQ1 / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingSurcharge -= me01.beanResultSet01.fileA720.A720LYQ1;
                                                //intRemainingCommision -= (beanResultSet01.fileA720.A720PRRCM1+beanResultSet01.fileA720.A720PRSCM1) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision -= me01.beanResultSet01.fileA720.A720LRRCM1+me01.beanResultSet01.fileA720.A720LRSCM1;
                                                break;
                                            case '2':
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOR2 / beanResultSet01.fileA720.A720TCAMB;
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOL2;
                                                intRemainingFare -= me01.getTKTS_VALOL(strTKTIND, '2');
                                                //intRemainingSurcharge -= beanResultSet01.fileA720.A720YQ2 / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingSurcharge -= me01.beanResultSet01.fileA720.A720LYQ2;
                                                //intRemainingCommision -= (beanResultSet01.fileA720.A720PRRCM2+beanResultSet01.fileA720.A720PRSCM2) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision -= me01.beanResultSet01.fileA720.A720LRRCM2+me01.beanResultSet01.fileA720.A720LRSCM2;
                                                break;
                                            case '3':
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOR3 / beanResultSet01.fileA720.A720TCAMB;
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOL3;
                                                intRemainingFare -= me01.getTKTS_VALOL(strTKTIND, '3');
                                                //intRemainingSurcharge -= beanResultSet01.fileA720.A720YQ3 / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingSurcharge -= me01.beanResultSet01.fileA720.A720LYQ3;
                                                //intRemainingCommision -= (beanResultSet01.fileA720.A720PRRCM3+beanResultSet01.fileA720.A720PRSCM3) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision -= me01.beanResultSet01.fileA720.A720LRRCM3+me01.beanResultSet01.fileA720.A720LRSCM3;
                                                break;
                                            case '4':
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOR4 / beanResultSet01.fileA720.A720TCAMB;
                                                //intRemainingFare -= beanResultSet01.fileA720.A720VALOL4;
                                                intRemainingFare -= me01.getTKTS_VALOL(strTKTIND, '4');
                                                //intRemainingSurcharge -= beanResultSet01.fileA720.A720YQ4 / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingSurcharge -= me01.beanResultSet01.fileA720.A720LYQ4;
                                                //intRemainingCommision -= (beanResultSet01.fileA720.A720PRRCM4+beanResultSet01.fileA720.A720PRSCM4) / beanResultSet01.fileA720.A720TCAMB;
                                                intRemainingCommision -= me01.beanResultSet01.fileA720.A720LRRCM4+me01.beanResultSet01.fileA720.A720LRSCM4;
                                                break;
                                        }
                                        break;
                                    }
                                }
                                if(bolTktRealUses === false){
                                    strREF = '';
                                    strTKTIND = (paramsResultSet14.fileA2033.SERIE.length === 6) ? paramsResultSet14.fileA2033.SERIE.substr(4, 2) : '';
                                    if(paramsResultSet14.fileA2033.ESTTRX.trim() === 'AA0001' || paramsResultSet14.fileA2033.ESTTRX.trim() === 'AA0003'){
                                        strSTAT = 'ADJ';
                                        strREF = 'VOID';
                                        switch(paramsResultSet14.fileA2033.TTRAX){
                                                    case 1:
                                                            strSTAT += '-SALE';
                                                            break;
                                                    case 2:
                                                            strSTAT += '-EXCH';
                                                            break;
                                                    case 6:
                                                            strSTAT += '-EXCH';
                                                            break;
                                                    case 3:
                                                            strSTAT += '-RFND';
                                                            break;
                                                    case 7:
                                                            strSTAT += '-RFND';
                                                            break;
                                                    case 4:
                                                            strSTAT += '-ADAC';
                                                            break;
                                                    case 5:
                                                            strSTAT += '-FLWN';
                                                            break;
                                                    case 13:
                                                            strSTAT += '-FLWN';
                                                            break;
                                                    case 8:
                                                            strSTAT += '-INTL';
                                                            break;
                                                    case 9:
                                                            strSTAT += '-DISC';
                                                            break;
                                                    case 10:
                                                            strSTAT += '-INTC';
                                                            break;
						}
                                    }else if(paramsResultSet14.fileA2033.ESTTRX.trim() === 'AA0004'){
                                        strSTAT = 'ADJ';
                                        switch(paramsResultSet14.fileA2033.TTRAX){
                                            case 1:
                                                strSTAT += '-SALE';
                                                break;
                                            case 2:
                                                strSTAT += '-EXCH';
                                                break;
                                            case 6:
                                                strSTAT += '-EXCH';
                                                break;
                                            case 3:
                                                strSTAT += '-RFND';
                                                break;
                                            case 7:
                                                strSTAT += '-RFND';
                                                break;
                                            case 4:
                                                strSTAT += '-ADAC';
                                                break;
                                            case 5:
                                                strSTAT += '-FLWN';
                                                break;
                                            case 13:
                                                strSTAT += '-FLWN';
                                                break;
                                            case 8:
                                                strSTAT += '-INTL';
                                                break;
                                            case 9:
                                                strSTAT += '-DISC';
                                                break;
                                            case 10:
                                                strSTAT += '-INTC';
                                                break;
                                        }
                                    }else{
                                        strSTAT = '';
                                    }
                                    me01.gridDataTktRealUsesAC.push({
                                        TKTIND : strTKTIND,
                                        CIA : paramsResultSet14.fileA2033.CIA,
                                        FOR : paramsResultSet14.fileA2033.FORMA,
                                        SER : paramsResultSet14.fileA2033.SERIE,
                                        SEQ : paramsResultSet14.fileA2033.SEQ.trim(),
                                        CPN : paramsResultSet14.fileA2033.CUPON,
                                        ORI : paramsResultSet14.fileA2033.RUTA_FROM,
                                        DES : paramsResultSet14.fileA2033.RUTA_TO,
                                        AL: paramsResultSet14.fileA2033.CARR,
                                        FLIGHT : paramsResultSet14.fileA2033.NFLIGHT,
                                        DATE : paramsResultSet14.fileA2033.DFLIGHT,
                                        STAT : strSTAT,
                                        REF : strREF,
                                        AMOUNT : Ext.util.Format.number(paramsResultSet14.fileA2033.GROSS, '0,000.00'),
                                        CRCY : paramsResultSet14.fileA2033.CURRENC,
                                        FARE : paramsResultSet14.fileA2033.FBASIS,
                                        CORRL : paramsResultSet14.fileA2033.CORRL,
                                        ESTADO : '',
                                        TTRANS : paramsResultSet14.fileA2033.TTRANS,
                                        TTRAX : paramsResultSet14.fileA2033.TTRAX
                                    });
                                }
                            }
                        }
                        // </editor-fold>
                //        var srt:Sort = new Sort();
                //        srt.fields = [
                //            new SortField('TKTIND', true, false, true),
                //            new SortField('CPN', true, false, true),
                //            new SortField('STAT', true, false, false)
                //        ];
                //        gridDataTktRealUsesAC.sort = srt;
                //        gridDataTktRealUsesAC.refresh();
                //        
                //        //Revisamos que si todos los cupones estan usados. (En este caso el Remanente sería CERO)
                //        var objCpn, objCpnUsed;
                //        var j, j2;
                //        var intCountCpnNotUsed = 0;
                //        for(j = 0; j < gridDataTktAC.length; j++){
                //            objCpn = gridDataTktAC.getItemAt(j);
                //            if(String(objCpn.ISCPN) === 'Y'){ //Si es un Cupón válido.
                //                intCountCpnNotUsed++;
                //                for(j2 = 0; j2 < gridDataTktRealUsesAC.length; j2++){
                //                        objCpnUsed = gridDataTktRealUsesAC.getItemAt(j2);
                //                        if(String(objCpn.CIA) === String(objCpnUsed.CIA) && String(objCpn.FOR) === String(objCpnUsed.FOR) && String(objCpn.SER) == String(objCpnUsed.SER) && String(objCpn.CPN) == String(objCpnUsed.CPN)){
                //                            intCountCpnNotUsed--;
                //                            break;
                //                        }
                //                }
                //            }
                //        }
                        // </editor-fold>
                        
                        console.log("gridDataTktRealUses: "+Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().data.length);
                        console.log({ gridDataTktRealUsesAC: me01.gridDataTktRealUsesAC });
                        
                        /*var ix = 0;
                        
                        for(ix = 0; ix<me01.gridDataTktRealUsesAC.length; ix++){
                            Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().addSorted(me01.gridDataTktRealUsesAC[ix]);
                        }*/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                        Ext.getCmp(prototype.id+'-gridDataTktRealUses').bindStore(
                            Ext.create("Ext.Praxis.store.program.MasterTicket.GridDataUses", { data: me01.gridDataTktRealUsesAC })
                        );
                        
                        Ext.getCmp(prototype.id+'-gridDataTktRealUses').getView().refresh();

                        win.setValue('lblFare', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TARIFA, '0,000.00'));
                        win.setValue('lblFareCurrency', me01.beanResultSet01.fileA720.A720MONEDA);
                        win.setValue('lblEqFarePaid', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TRFPAG, '0,000.00'));
                        win.setValue('lblEqFarePaidCurrency', me01.beanResultSet01.fileA720.A720MDAPAG);
                        win.setValue('lblCommision', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TTCOMM+me01.beanResultSet01.fileA720.A720TTSCMM, '0,000.00'));
                        win.setValue('lblCommisionCurrency', me01.beanResultSet01.fileA720.A720MDACM);
                        
                        if(me01.filterTKT.lstResultSet05.length > 0){
                            /*
                            for(var i5:uint = 0; i5 < me01.filterTKT.lstResultSet05.length; i5++){
                                    paramsResultSet05 = PX040S01A720ResultSet05(me01.filterTKT.lstResultSet05.getItemAt(i5));
                                    switch(i5){
                                            case 0:
                                                    lblTax1.text = paramsResultSet05.fileA1532.A1532VTAX.toFixed(2);
                                                    lblTax1Code.text = paramsResultSet05.fileA1532.A1532CTAX+'-'+paramsResultSet05.fileA1532.A1532MTAX;
                                                    break;
                                            case 1:
                                                    lblTax2.text = paramsResultSet05.fileA1532.A1532VTAX.toFixed(2);
                                                    lblTax2Code.text = paramsResultSet05.fileA1532.A1532CTAX+'-'+paramsResultSet05.fileA1532.A1532MTAX;
                                                    break;
                                            case 2:
                                                    lblTax3.text = paramsResultSet05.fileA1532.A1532VTAX.toFixed(2);
                                                    lblTax3Code.text = paramsResultSet05.fileA1532.A1532CTAX+'-'+paramsResultSet05.fileA1532.A1532MTAX;
                                                    break;
                                            default:
                                                    break;
                                    }
                            }
                            */
                        }
                        
                        intTAXES = 0;
                        if(me01.filterTKT.lstResultSet06.length > 0){
                            for(var i6 = 0; i6 < me01.filterTKT.lstResultSet06.length; i6++){
                                paramsResultSet06 = me01.filterTKT.lstResultSet06[i6];
                                intTAXES += paramsResultSet06.fileA1532.A1532VTAX;
                                switch(i6){
                                    case 0:
                                        win.setValue('lblTax1', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTax1Code',paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 1:
                                        win.setValue('lblTax2', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTax2Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 2:
                                        win.setValue('lblTax3', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTax3Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 3:
                                        win.setValue('lblTaxes1', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes1Code',paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 4:
                                        win.setValue('lblTaxes2', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes2Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 5:
                                        win.setValue('lblTaxes3', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes3Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 6:
                                        win.setValue('lblTaxes4', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes4Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 7:
                                        win.setValue('lblTaxes5', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes5Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 8:
                                        win.setValue('lblTaxes6', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes6Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 9:
                                        win.setValue('lblTaxes7', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes7Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 10:
                                        win.setValue('lblTaxes8', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes8Code', paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    case 11:
                                        win.setValue('lblTaxes9', Ext.util.Format.number(paramsResultSet06.fileA1532.A1532VTAX, '0,000.00'));
                                        win.setValue('lblTaxes9Code',paramsResultSet06.fileA1532.A1532CTAX+'-'+paramsResultSet06.fileA1532.A1532MTAX);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        if(me01.beanResultSet01.fileA720.A720TRFPAG > 0){
                            win.setValue('lblTotalAmount', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TRFPAG+intTAXES, '0,000.00'));
                        }else{
                            //lblTotalAmount.text = formatDblNumber.format(beanResultSet01.fileA720.A720FARE+intTAXES);
                            win.setValue('lblTotalAmount', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720TARIFA+intTAXES, '0,000.00'));
                        }
                        if(me01.beanResultSet01.fileA720.A720TRFPAG > 0){
                            win.setValue('lblTotalAmountCurrency',me01.beanResultSet01.fileA720.A720MDAPAG);
                        }else{
                            win.setValue('lblTotalAmountCurrency', me01.beanResultSet01.fileA720.A720MONEDA);
                        }
                        win.setValue('txaFareConstruction', strFareConstruction);
                        win.setValue('txaReference', strTKtInConnexion);
                        win.setValue('txaRelated', strRelated);
                        if(me01.filterTKT.lstResultSet07.length > 0){
                            for(var i7 = 0; i7 < me01.filterTKT.lstResultSet07.length; i7++){
                                paramsResultSet07 = me01.filterTKT.lstResultSet07[i7];

                                switch(i7){
                                    case 0:
                                        win.setValue('lblFOP1', paramsResultSet07.fileA1531.A1531TTARJ);
                                        //lblFOP1CCNumber.text = paramsResultSet07.fileA1531.A1531NREF.substr(0, 13);
                                        win.setValue('lblFOP1CCNumber', paramsResultSet07.fileA1531.A1531NREF.substr(0, 16));
                                        win.setValue('lblFOP1CCAprov', paramsResultSet07.fileA1531.A1531CAPL);
                                        win.setValue('lblFOP1CCAmount', Ext.util.Format.number(paramsResultSet07.fileA1531.A1531VFOP, '0,000.00')+' '+paramsResultSet07.fileA1531.A1531MFOP);
                                        break;
                                    case 1:
                                        win.setValue('lblFOP2', paramsResultSet07.fileA1531.A1531TTARJ);
                                        //lblFOP2CCNumber.text = paramsResultSet07.fileA1531.A1531NREF.substr(0, 13);
                                        win.setValue('lblFOP2CCNumber', paramsResultSet07.fileA1531.A1531NREF.substr(0, 16));
                                        win.setValue('lblFOP2CCAprov', paramsResultSet07.fileA1531.A1531CAPL);
                                        win.setValue('lblFOP2CCAmount', Ext.util.Format.number(paramsResultSet07.fileA1531.A1531VFOP, '0,000.00')+' '+paramsResultSet07.fileA1531.A1531MFOP);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        strA1531VFOP = 0;
                        if(me01.filterTKT.lstResultSet08.length > 0){
                            for(var i8 = 0; i8 < me01.filterTKT.lstResultSet08.length; i8++){
                                paramsResultSet08 = me01.filterTKT.lstResultSet08[i8];
                                strA1531VFOP += paramsResultSet08.fileA1531.A1531VFOP;
                            }
                        }
                        win.setValue('lblFOP3CAAmount', Ext.util.Format.number(strA1531VFOP, '0,000.00'));
                        win.setValue('lblFOP5EXAmount', Ext.util.Format.number(me01.beanResultSet01.fileA720.A720ORIGEX, '0,000.00'));
                        strA1531VFOP = 0;
                        if(me01.filterTKT.lstResultSet09.length > 0){
                            for(var i9 = 0; i9 < me01.filterTKT.lstResultSet09.length; i9++){
                                paramsResultSet09 = me01.filterTKT.lstResultSet09[i9];
                                strA1531VFOP += paramsResultSet09.fileA1531.A1531VFOP;
                            }
                        }
										 
										 
										  
										  
															
															
																	 
																								
																					   
										  
																	 
																				 
																				  
																	 
									 
																			 
									 
								 
										  
								 
																				 
																				  
																	 
									 
																			 
									 
								 
								
							 
						 
                        win.setValue('lblFOP4MoreAmount', Ext.util.Format.number(strA1531VFOP, '0,000.00'));
                        
                        nPosition1 = 0;
                        nPosition2 = 1;
                        nPosition3 = 2;
                        nPosition4 = 3;
                        if(me01.filterTKT.lstResultSet10.length<=4)
                        {
                                Ext.getCmp(prototype.id+'-btn-de-back-cjn').hide();
                                Ext.getCmp(prototype.id+'-btn-de-next-cjn').hide();
                        }
                        else
                        {
                                Ext.getCmp(prototype.id+'-btn-de-back-cjn').show();
                                Ext.getCmp(prototype.id+'-btn-de-next-cjn').show();
                        }
                        
                        if(me01.filterTKT.lstResultSet10.length > 0){
                            for(var i10 = 0; i10 < me01.filterTKT.lstResultSet10.length; i10++){
                                paramsResultSet10 = me01.filterTKT.lstResultSet10[i10];
                                switch(i10){
                                    case 0:
                                        win.setValue('lblRelatedTickets1', paramsResultSet10.fileA1531.A1531NREF.substr(0, 13));
                                        break;
                                    case 1:
                                        win.setValue('lblRelatedTickets2', paramsResultSet10.fileA1531.A1531NREF.substr(0, 13));
                                        break;
                                    case 2:
                                        win.setValue('lblRelatedTickets3', paramsResultSet10.fileA1531.A1531NREF.substr(0, 13));
                                        break;
                                    case 3:
                                        win.setValue('lblRelatedTickets4', paramsResultSet10.fileA1531.A1531NREF.substr(0, 13));
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        if(Ext.getCmp(prototype.id+'-gridDataTktRealUses').getStore().data.length > 0){ //Si existe cupones usados.
                            //var intBalanceRemainingFare:Number = ((beanResultSet01.fileA720.A720TRFPAG > 0) ? beanResultSet01.fileA720.A720TRFPAG : beanResultSet01.fileA720.A720TARIFA) - intRemainingFare;
                           intRemainingFare= me01.getTKTS_VALOL(); 
                            console.log('intRemainingFare');
                            console.log(intRemainingFare);
                            console.log(me01.beanResultSet01.fileA720.A720FARE);
                            var intBalanceRemainingFare = me01.beanResultSet01.fileA720.A720FARE - intRemainingFare;
                            //var intBalanceRemainingSurcharge:Number = beanResultSet01.fileA720.A720TQ - intRemainingSurcharge;
                            var intBalanceRemainingSurcharge = me01.beanResultSet01.fileA720.A720TYQ - intRemainingSurcharge;
                            //var intBalanceRemainingCommision:Number = (beanResultSet01.fileA720.A720COMMIS+beanResultSet01.fileA720.A720TSCM) - intRemainingCommision;
                            var intBalanceRemainingCommision = (me01.beanResultSet01.fileA720.A720TTCOMM+me01.beanResultSet01.fileA720.A720TTSCMM) - intRemainingCommision;

                //            if(intCountCpnNotUsed === 0){ //Si todos los cupones fueron usados.
                //                if(Math.abs(intBalanceRemainingFare) < 0.2) intBalanceRemainingFare = 0;
                //                if(Math.abs(intBalanceRemainingSurcharge) < 0.2) intBalanceRemainingSurcharge = 0;
                //                if(Math.abs(intBalanceRemainingCommision) < 0.2) intBalanceRemainingCommision = 0;
                //            }
                           var totuseadj=0;
                           for(var z14 = 0; z14 < me01.filterTKT.lstResultSet14.length; z14++){
                               totuseadj+=me01.filterTKT.lstResultSet14[z14].fileA2033.AMOUNTLOC;
                           }
                           //console.log(totuseadj);
                           /*
                            for(i = 0; i < lstA720.length; i++){
                                    fileA720 = lstA720[i];
                                    Ext.getCmp(prototype.id+'-cbxFilterTicket').getStore().addSorted({
                                        code: fileA720.A720FORMAI+fileA720.A720SERIEI,
                                        name: fileA720.A720FORMAI+fileA720.A720SERIEI
                                    });
                                }
                            */
                            if(intBalanceRemainingFare<0 && totuseadj!==0){
                                intBalanceRemainingFare=(intBalanceRemainingFare * -1);
                            } 
                            win.setValue('lblBalanceRemainingFare', Ext.util.Format.number((intBalanceRemainingFare-totuseadj), '0,000.00'));
                            win.setValue('lblBalanceRemainingSurcharge', Ext.util.Format.number(intBalanceRemainingSurcharge, '0,000.00'));
                            win.setValue('lblBalanceRemainingCommision', Ext.util.Format.number(intBalanceRemainingCommision, '0,000.00'));
                        }else{
                            win.setValue('lblBalanceRemainingFare', win.getValue('lblBalanceBeginingFare'));
                            win.setValue('lblBalanceRemainingSurcharge', win.getValue('lblBalanceBeginingSurcharge'));
                            win.setValue('lblBalanceRemainingCommision', win.getValue('lblBalanceBeginingCommision'));
                        }
                        Ext.getCmp(prototype.id+'-btnTicket').enable(true);
                        Ext.getCmp(prototype.id+'-btnAccounting').enable(true);
                        //Ext.getCmp(prototype.id+'-btnFacsimil').enable(true);
                        Ext.getCmp(prototype.id+'-btnProrrate').enable(true);
                        Ext.getCmp(prototype.id+'-btnDelivery').enable(true);
                        Ext.getCmp(prototype.id+'-gridDataTkt').enable(true);
                        Ext.getCmp(prototype.id+'-btnPayment').enable(true);
                        Ext.getCmp(prototype.id+'-btnPNR').enable(true);

                        switch(win.getValue('cbxSelectBy')){
                            case 'TKT':
                                win.focus('txtFilterTicketFormSer');
                                break;
                            case 'PAX':
                                win.focus('txtFilterPassengerName');
                                break;
                        }
                        //</editor-fold>
                    
                        me01.controlLight();
                    
                    }
                    Ext.getCmp(prototype.id+'-gridDataAccounting').el.setStyle({height: '100%'});
                } else global.Msg({ msg: "Bad Request" });
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="loadTicketSeq">
    loadTicketSeq: function (bean) {
        var me01 = this;
        console.log('loadTicketSeq');
        console.log(prototype.url+'/loadTicketSeq');
        prototype.url = URL_VIEWTICKET;
        Ext.Ajax.request({
            url: prototype.url+'/loadTicketSeq',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, options){
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    //win.setValue('txtFilterTicketSeq', '');
                    console.log(res.filterTKTSeq);
                    me01.filterTKTSeq = res.filterTKTSeq;
                        if(me01.filterTKTSeq.length === 0 && win.getValue('txtFilterTicketCia').trim().length === 3 && win.getValue('txtFilterTicketFormSer').trim().length ===10)
                        {
                            me01.bean.IN_CIA = win.getValue('txtFilterTicketCia').trim();
                            me01.bean.IN_FORMA  = win.getValue('txtFilterTicketFormSer').trim().substr(0, 4);
                            me01.bean.IN_SERIE = win.getValue('txtFilterTicketFormSer').trim().substr(4, 6);
                            me01.bean.IN_SEQ = "00";
                            console.log(me01.bean);
                            me01.loadTicket(me01.bean);
                            Ext.getCmp(prototype.id+'-lblCupon').hide();
                            me01.controlLight();
                        }
                        else if(me01.filterTKTSeq.length === 1){
                            //this.execSearch();
                            console.log(me01.filterTKTSeq[0]);
                            me01.bean.IN_CIA = me01.filterTKTSeq[0].IN_CIA;
                            me01.bean.IN_FORMA  = me01.filterTKTSeq[0].IN_FORMA;
                            me01.bean.IN_SERIE = me01.filterTKTSeq[0].IN_SERIE;
                            me01.bean.IN_SEQ = me01.filterTKTSeq[0].IN_SEQ;
                            console.log(me01.bean);
                            me01.loadTicket(me01.bean);
                            Ext.getCmp(prototype.id+'-lblCupon').hide();
                            me01.controlLight();
                        }
                        else
                        {
                            //global.Msg({ msg: "It's rolling" });
                            me01.imgBrowser_clickHandler();
                        }
                } else global.Msg({ msg: "Bad Request" });
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadSabre">
    loadSabre: function () {
        prototype.url = URL_VIEWTICKET;
        var Fproc = win.getValue('lblAgencyIATADate').trim();
	if(Fproc === '' || win.getValue('txtFilterTicketCia').trim().length!== 3 || win.getValue('txtFilterTicketFormSer').trim().length!==10){
            global.Msg({msg: 'Enter the Ticket Number'});
            
	}
        else {
            var VP_A1716CIA = win.getValue('txtFilterTicketCia').trim();
            var VP_A1716FORMA = win.getValue('txtFilterTicketFormSer').trim().substr(0,4);
            var VP_A1716SERIE = win.getValue('txtFilterTicketFormSer').trim().substr(4,6);
            var beanSabre = {};
            beanSabre.Fproc = Fproc;
            beanSabre.VP_A1716CIA = VP_A1716CIA;
            beanSabre.VP_A1716FORMA = VP_A1716FORMA;
            beanSabre.VP_A1716SERIE = VP_A1716SERIE;
            console.log(beanSabre);
            var me01 = this;
            Ext.Ajax.request({
                url: prototype.url+'/loadSabre',
                method: 'POST',
                timeout: 60000000,
                params: {beanSabre: JSON.stringify(beanSabre)},
                beforerequest: Ext.getBody().mask('Loading...'),
                success: function (response, opts) {
                    Ext.getBody().unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    var resFecVta = res.resFecVta;
                    if (res.success) 
                    {
                        var boValida = false;
                        if(Fproc !== resFecVta)
                        {    Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Sales dates are different.<br>Praxis Date: '+Fproc+' <br>Sabre Date: '+resFecVta+' <br> Download Sabre Text File?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function (btn) {
                                    console.log('url: ' + prototype.url + ' btn:' + btn);
                                    if (btn === 'ok') {
                                        me01.exportSabreTxt();
                                    }
                                }
                            });
                        } else 
                        {
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Download Sabre Text File ?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function (btn) {
                                    console.log('url: ' + prototype.url + ' btn:' + btn);
                                    if (btn === 'ok') {
                                        me01.exportSabreTxt();
                                    }
                                }
                            });
                        }
                        
                        console.log(res.resFecVta);
                    }
                    else global.Msg({msg: "Bad Request"});
                },
                failure: function (response, opts) {
                    Ext.getBody().unmask();
                    console.log('server-side failure with status code '+response.status);
                }
            });
        }
    },
    exportSabreTxt: function () {
        prototype.url = URL_VIEWTICKET;
        var TKT = win.getValue('txtFilterTicketCia').trim()+win.getValue('txtFilterTicketFormSer');
        console.log('exportSabreTxt: ' + prototype.url);
        global.getFile(prototype.url + '/getSabreFile?TKT=' + TKT);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadAccountig">
    loadAccountig: function (beanAccounting) {
        //Ext.getCmp(prototype.id+'-gridDataAccounting').el.setStyle({height: '100%'});
        prototype.url = URL_VIEWTICKET;
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
                if (res.success) me01.onResultLoadAccountig(res.lst_Accounting);
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
    searchDelivery: function (bean) {
        prototype.url = URL_VIEWTICKET;
        console.log(prototype.ProrrateoNew.url + '/searchDelivery');
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDelivery',
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
                                strVoid: me1.gloA720TKVOID
                            }
                        }).show();
                    }
                } else global.Msg({msg: "Bad Request"});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchBeanTkt">
    searchBeanTkt: function(strTicket, IN_SEQ, IN_SEQROLL) {
        //alert(strTicket +'/'+ IN_SEQ+ '/' +IN_SEQROLL);
        prototype.url = URL_VIEWTICKET;
        Ext.getCmp(prototype.id+'-boxDataTkt').el.setStyle({height: '100%'});
        Ext.Ajax.request({
            url: CONTEXTPATH+'/FlightConciliation/searchBeanTkt',
            method: 'POST',
            timeout: 60000000,
            params: {strTicket: strTicket, SEQ: IN_SEQ, SEQRO: IN_SEQROLL},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, opts) {
                Ext.getBody().unmask();
                win.lblUser_toolTip("Estructura: A1692");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanCons = res.beanConsTkt;
                    if (beanCons !== undefined) {
                        if (beanCons.strTicket === '') {
                            global.Msg({msg: 'Record not found'});
                        } else {
//                            var actionCode = '';
//                            if (me.status !== '' || beanCons.strDescSTVAL === '4' || beanCons.STVAL === '3' || beanCons.STCON !== '') {
//                                actionCode = 'S';
//                            } else {
//                                actionCode = 'U';
//                            }
                            var params = {
                                bean: beanCons,
                                actionCode: 'V',
                                msj: '',
                                soloValidar: 'true',
                                apagar: true
                            };
//                            if (abrir) {
                                Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryTicket', {
                                    id: 'DataEntryTicketFlightConciliationForm',
                                    params: params
                                }).show();
//                            } else {
//                                meEntryTick.p = params;
//                                meEntryTick.afterRender();
//                            }
                        }
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else global.Msg({msg: "Bad Request"});
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchPNR">
    searchPNR: function (FPROC, TRNCU, TKT) {
        prototype.url = URL_VIEWTICKET;
        var me01 = this;
        Ext.Ajax.request({
            url: prototype.url+'/searchPNR',
            method: 'POST',
            timeout: 60000000,
            params: {FPROC: FPROC, TRNCU: TRNCU, TKT: TKT},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function (response, opts) {
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                var texto = res.strTexto;
                if(texto !== ''){
//                    twCtrlPNR.strTexto = texto;
//                    twCtrlPNR.strVoid = gloA720TKVOID;
//                    twCtrlPNR.init();
                    global.Msg({msg: texto});
                }
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    /*getTKTS_VALOL: function(strTKTIND, strCPN) { zpp 20210822
        var store = Ext.getCmp(prototype.id+'-gridDataTkt').getStore();
        var intRtn = 0;
       // console.log(strTKTIND +'novo'+ strCPN);
        for(var k = 0; k < store.data.length; k++){
            if(strTKTIND === String(store.data.items[k].data.TKTIND) && strCPN === String(store.data.items[k].data.CPN)) {
                intRtn = Number(store.data.items[k].data.VALOL);
                console.log(intRtn);
                break;
           }
	}
	return intRtn;
    },*/
    getTKTS_VALOL: function() {
        var store = Ext.getCmp(prototype.id+'-gridDataTkt').getStore();
        var intRtn = 0;
         var intRtn2 = 0;
        for(var k = 0; k < store.data.length; k++){
          intRtn = Number(store.data.items[k].data.VALOL);
          intRtn2=(intRtn2+intRtn);
	}
	return intRtn2;
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    cleanFilter: function() {
        prototype.url = URL_VIEWTICKET;
        win.setValue('txtFilterTicketFormSer', '');
        win.setValue('txtFilterTicketSeq', '');
        win.setValue('txtFilterPassengerName', '');
        win.removeAll('cbxFilterPassengerName');
        win.removeAll('cbxFilterTicket');
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        win.setValue('lblTicketNumber', '');
        win.setValue('lblTicketNumberConjuntion', '');
        win.setValue('lblPNR', '');
        win.setValue('lblPeriodEndingDate', '');
        win.setValue('lblCurrency', '');
        win.setValue('lblAgencyIATANumber', '');
        win.setValue('lblAgencyIATADate', '');
        win.setValue('lblAgencyIATAName', '');
//	lblAgencyIATAName.toolTip = '';
        win.setValue('lblAgencyIATACity', '');
        win.setValue('lblAgencyGroup', '');
        win.setValue('lblPassengerName', '');
        win.setValue('lblSegmentIndicator', '');
        win.setValue('lblTourCode', '');
        win.setValue('lblSource', '');
        win.setValue('lblExchangeRate', '');
        win.setValue('lblExchangeLocalRate', '');
        win.setValue('lblEndorsementAndRestrictions', '');
        win.setValue('lblGDS', '');
        win.setValue('lblQuotationType', '');
        win.setValue('lblIssuedInExchangeFor', '');
        win.setValue('lblOriDes', '');
        win.setValue('lblDocumentType', '');
        win.setValue('lblDocumentTypeCod', '');
        win.setValue('lblDocumentTypeCon', '');
        win.setValue('chkOverCommision', false);
        win.setValue('chkAccounted', false);
        win.setValue('chkElectronicticket', false);
        win.setValue('chkAudited', false);
        win.setValue('chkMemoRaised', false);
        win.setValue('lblMemoNumber', '');
        //Ext.getCmp(prototype.id+'-boxMemoNumber').setVisible(win.getValue('chkMemoRaised'));
        win.setValue('lblBatch1', '');
        win.setValue('lblBatch2', '');
        win.setValue('lblBalanceBeginingFare', '');
        win.setValue('lblBalanceBeginingSurcharge', '');
        win.setValue('lblBalanceBeginingCommision', '');
        win.setValue('lblBalanceRemainingFare', '');
        win.setValue('lblBalanceRemainingSurcharge', '');
        win.setValue('lblBalanceRemainingCommision', '');
        win.removeAll('gridDataTkt');
        win.removeAll('gridDataTktRealUses');
//	gridDataTktAccountingAC.removeAll();
	win.setValue('lblFare', '');
	win.setValue('lblFareCurrency', '');
	win.setValue('lblEqFarePaid', '');
	win.setValue('lblEqFarePaidCurrency', '');
	win.setValue('lblCommision', '');
	win.setValue('lblCommisionCurrency', '');
	win.setValue('lblTax1', '');
	win.setValue('lblTax1Code', '');
	win.setValue('lblTax2', '');
	win.setValue('lblTax2Code', '');
	win.setValue('lblTax3', '');
	win.setValue('lblTax3Code', '');
	win.setValue('lblTotalAmount', '');
	win.setValue('lblTotalAmountCurrency', '');
        win.setValue('lblChargeback', '');
	win.setValue('txaFareConstruction', '');
	win.setValue('txaReference', '');
	win.setValue('txaRelated', '');
	win.setValue('lblTaxes1', '');
	win.setValue('lblTaxes1Code', '');
	win.setValue('lblTaxes2', '');
	win.setValue('lblTaxes2Code', '');
	win.setValue('lblTaxes3', '');
	win.setValue('lblTaxes3Code', '');
	win.setValue('lblTaxes4', '');
	win.setValue('lblTaxes4Code', '');
	win.setValue('lblTaxes5', '');
	win.setValue('lblTaxes5Code', '');
	win.setValue('lblTaxes6', '');
	win.setValue('lblTaxes6Code', '');
	win.setValue('lblTaxes7', '');
	win.setValue('lblTaxes7Code', '');
	win.setValue('lblTaxes8', '');
	win.setValue('lblTaxes8Code', '');
	win.setValue('lblTaxes9', '');
	win.setValue('lblTaxes9Code', '');
	win.setValue('lblFOP1', '');
	win.setValue('lblFOP1CCNumber', '');
	win.setValue('lblFOP1CCAmount', '');
	win.setValue('lblFOP1CCAprov', '');
	win.setValue('lblFOP2', '');
	win.setValue('lblFOP2CCNumber', '');
	win.setValue('lblFOP2CCAmount', '');
	win.setValue('lblFOP2CCAprov', '');
	win.setValue('lblFOP3CAAmount', '');
	win.setValue('lblFOP4MoreAmount', '');
	win.setValue('lblFOP5EXAmount', '');
	win.setValue('lblRelatedTickets1', '');
	win.setValue('lblRelatedTickets2', '');
	win.setValue('lblRelatedTickets3', '');
	win.setValue('lblRelatedTickets4', '');
        win.setValue('lblRelatedTickets1SEQ', '00');
	win.setValue('lblRelatedTickets2SEQ', '00');
	win.setValue('lblRelatedTickets3SEQ', '00');
	win.setValue('lblRelatedTickets4SEQ', '00');
        
        win.enabled('btnTicket', false);
        win.enabled('btnAccounting', false);
        //win.enabled('btnFacsimil', false);
        win.enabled('btnProrrate', false);
        win.enabled('btnDelivery', false);
        
        win.enabled('btnPayment', false);
        win.enabled('btnPNR', false);
        
								   
								   
        
        //Ext.getCmp(prototype.id+'-btnFacsimil0').hide();
        Ext.getCmp(prototype.id+'-btnDelivery0').hide();
        
        Ext.getCmp(prototype.id+'-boxCoupons').setHeight(132);
        win.selectedChild('vskData', 'boxDataTkt');
    },
    //</editor-fold>
    
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
});
