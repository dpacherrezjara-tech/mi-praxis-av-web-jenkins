Ext.define('Ext.Praxis.controller.screens.ScrFormUnicoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrFormUnicoController',
    urlWin01: CONTEXTPATH + '/ADMReport',
    BeanDatos: {},
    BeanCargarDatos: {},
    action: '',
    CantTkt: 0,
    GridRazonEmision: {},
    GridCalculosAreol: {},
    BeanCalculosImpuestos: {},

    BeanRazonEmision: {},
    BeanCalculosAreol: {},
    BeanDataCalculosImpu: {},
    BeanPDF: {},
    fileName: "",
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    OnBeforeShow: function () {
        prototype.id2 = 'DocumRelFormUnico';
        prototype.id3 = 'FormOfProvisions';
        prototype.id4 = 'FormUnicoSeguimieto';
        prototype.id5 = 'FormUnicoSeguimietoSubiArchivo';
        prototype.idformateoCta = 'FormformateoCta';

    },
    afterRender: function () {
        this.CleanFields();
        this.setStoresGrids();
        this.action = String(this.view.params.action);
        this.BeanCargarDatos.VP_PREME = String(this.view.params.VP_PREME);
        this.onLoadData(this.BeanCargarDatos);

    },
    onLoadData: function (BeanCargarDatos) {
        var me = this;
        Ext.getCmp(prototype.id1 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchDataIni',
            method: 'POST',
            timeout: '300000',
            params: BeanCargarDatos,
            success: function (response, options) {
                Ext.getCmp(prototype.id1 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.id1 + '-image').updateLayout();
                me.BeanDatos = res.lst_dataIni[0];
                var txtErrorRazones = Ext.getCmp(prototype.id1 + '-ErrorRazones');
                txtErrorRazones.hide();
                Ext.getCmp(prototype.id1 + '-MemoNumber').setValue(res.lst_dataIni[0].A2548NMEMO);
                 Ext.getCmp(prototype.id1 + '-NNotice').setValue(res.lst_dataIni[0].A2548NRCOR);
                Ext.getCmp(prototype.id1 + '-IssueDate').setValue(res.lst_dataIni[0].A2548FREGI);
                Ext.getCmp(prototype.id1 + '-Accepted').setValue(res.lst_dataIni[0].A2548FREGI);
                Ext.getCmp(prototype.id1 + '-Usser').setValue(res.lst_dataIni[0].A2548REGIS);
                Ext.getCmp(prototype.id1 + '-Transaction').setValue(res.lst_dataIni[0].A2548TRNCU);
                Ext.getCmp(prototype.id1 + '-SourceChannel').setValue(res.lst_dataIni[0].A2548FTE + '-' + res.lst_dataIni[0].A2548CANAL);
                Ext.getCmp(prototype.id1 + '-Ticket').setValue(res.lst_dataIni[0].A2548TIKET);
                Ext.getCmp(prototype.id1 + '-Issued').setValue(res.lst_dataIni[0].A2548FFILE);
                Ext.getCmp(prototype.id1 + '-UsserIss').setValue(res.lst_dataIni[0].A2548REGIS);
                Ext.getCmp(prototype.id1 + '-Coupon').setValue(res.lst_dataIni[0].A2548CPN);
                Ext.getCmp(prototype.id1 + '-TicketDate').setValue(res.lst_dataIni[0].A2548FVTA);
                Ext.getCmp(prototype.id1 + '-TransactionTKT').setValue(res.lst_dataIni[0].A2548TRNCO);

                Ext.getCmp(prototype.id1 + '-Sent').setValue(res.lst_dataIni[0].A2548FCONT);
                Ext.getCmp(prototype.id1 + '-UserSent').setValue(res.lst_dataIni[0].A2548REGIS);
                Ext.getCmp(prototype.id1 + '-IATA').setValue(res.lst_dataIni[0].A2548IATA);
                Ext.getCmp(prototype.id1 + '-IATAName').setValue(res.lst_dataIni[0].AGENCY);
                Ext.getCmp(prototype.id1 + '-Address').setValue(res.lst_dataIni[0].DIRAGENCY);
                Ext.getCmp(prototype.id1 + '-PassName').setValue(res.lst_dataIni[0].A2548EMPLE);
                Ext.getCmp(prototype.id1 + '-CTA').setValue(res.lst_dataIni[0].A2548CTAC);
                Ext.getCmp(prototype.id1 + '-cur').setValue(res.lst_dataIni[0].A2548MDA);
                var txtPDFASR = Ext.getCmp(prototype.id1 + '-PDFASR');
                var PDFBSP = Ext.getCmp(prototype.id1 + '-PDFBSP');
                var PDFARC = Ext.getCmp(prototype.id1 + '-PDFARC');

                if (res.lst_dataIni[0].A2548FTE === 'ARC') {
                    PDFARC.show();
                    txtPDFASR.hide();
                    PDFBSP.hide();
                }
                if (res.lst_dataIni[0].A2548FTE === 'ASR') {
                    txtPDFASR.show();
                    PDFARC.hide();
                    PDFBSP.hide();
                }
                if (res.lst_dataIni[0].A2548FTE === 'BSP') {
                    txtPDFASR.hide();
                    PDFARC.hide();
                    PDFBSP.show();
                }

                //PARA CARGAR EL SEGUNDO GRID ARELONIAE
                Ext.getCmp(prototype.id1 + '-FareAro').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARIF, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-TotalTaxAre').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAX, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-ServiceschargesAre').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SERVI, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-IvaAre').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548IVACS, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-CommissionAre').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMIS, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-SobreComiAre').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOM, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-TocaAre').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCM, '0,000.00'));


                //PARA CARGAR EL SEGUNDO GRID AGENCIA 
                Ext.getCmp(prototype.id1 + '-FareAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARIA, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-TotalTaxAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXA, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-ServiceschargesAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SERVA, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-IvaAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548IVACA, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-CommissionAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMIA, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-SobreComiAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMA, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-TocaAgent').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCA, '0,000.00'));

                //PARA CARGAR EL SEGUNDO GRID DIFERENCIA
                Ext.getCmp(prototype.id1 + '-FareDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARID, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-TotalTaxDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXD, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-ServiceschargesDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SERVD, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-IvaDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548IVACD, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-CommissionDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMID, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-SobreComiDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMD, '0,000.00'));
                Ext.getCmp(prototype.id1 + '-TocaDife').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCD, '0,000.00'));

                //total del debito
                Ext.getCmp(prototype.id1 + '-AmountPay').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));
                //datos de las grilla 
                //grilla aeroline
                Ext.getCmp(prototype.id1 + '-gridCalAirline').getStore().removeAll();
                Ext.getCmp(prototype.id1 + '-gridCalAirline').getStore().loadData(res.lst_CalculosAreol);
                if (res.lst_CalculosAreol.length !== 0) {
                    Ext.getCmp(prototype.id1 + '-CABErrorAirline').hide();
                    Ext.getCmp(prototype.id1 + '-ErrorAirline').hide();
                } else {
                    Ext.getCmp(prototype.id1 + '-CABErrorAirline').show();
                    Ext.getCmp(prototype.id1 + '-ErrorAirline').show();
                    Ext.getCmp(prototype.id1 + '-ErrorAirline').setValue('No Data Found Calculated Airline.');
                }
                //grilla gridTax
                Ext.getCmp(prototype.id1 + '-gridTax').getStore().removeAll();
                Ext.getCmp(prototype.id1 + '-gridTax').getStore().loadData(res.lst_CalculosImpuestos);
                if (res.lst_CalculosImpuestos.length !== 0) {
                    Ext.getCmp(prototype.id1 + '-CABErrorTax').hide();
                    Ext.getCmp(prototype.id1 + '-ErrorTax').hide();
                } else {
                    Ext.getCmp(prototype.id1 + '-CABErrorTax').show();
                    Ext.getCmp(prototype.id1 + '-ErrorTax').show();
                    Ext.getCmp(prototype.id1 + '-ErrorTax').setValue('No Data Found tax.');
                }

                //grilla gridTax
                Ext.getCmp(prototype.id1 + '-gridRazones').getStore().removeAll();
                Ext.getCmp(prototype.id1 + '-gridRazones').getStore().loadData(res.lst_RazonEmision);
                if (res.lst_RazonEmision.length !== 0) {
                    Ext.getCmp(prototype.id1 + '-CABErrorRazones').hide();
                    Ext.getCmp(prototype.id1 + '-ErrorRazones').hide();
                } else {
                    Ext.getCmp(prototype.id1 + '-CABErrorRazones').show();
                    Ext.getCmp(prototype.id1 + '-ErrorRazones').show();
                    Ext.getCmp(prototype.id1 + '-ErrorRazones').setValue('No Data Found Issue Reason.');
                }

            }
        });
    },

    //<editor-fold defaultstate="collapsed" desc="setStoresGrids">
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id1 + '-gridCalAirline');
        var grid01 = Ext.getCmp(prototype.id1 + '-gridRazones');
        var grid02 = Ext.getCmp(prototype.id1 + '-gridTax');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid00'
        });
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid02'
        });

        grid00.setStore(store00);
        grid01.setStore(store01);
        grid02.setStore(store02);

    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="onLoadData">

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="CleanFields">
    CleanFields: function () {
        var txtErrorRazones = Ext.getCmp(prototype.id1 + '-ErrorRazones');
        txtErrorRazones.hide();
        Ext.getCmp(prototype.id1 + '-MemoNumber').setValue('');
        Ext.getCmp(prototype.id1 + '-IssueDate').setValue('');
        Ext.getCmp(prototype.id1 + '-Accepted').setValue('');
        Ext.getCmp(prototype.id1 + '-Usser').setValue('');
        Ext.getCmp(prototype.id1 + '-Transaction').setValue('');
        Ext.getCmp(prototype.id1 + '-SourceChannel').setValue('');
        Ext.getCmp(prototype.id1 + '-Ticket').setValue('');
        Ext.getCmp(prototype.id1 + '-Issued').setValue('');
        Ext.getCmp(prototype.id1 + '-UsserIss').setValue('');
        Ext.getCmp(prototype.id1 + '-Coupon').setValue('');
        Ext.getCmp(prototype.id1 + '-TicketDate').setValue('');
        Ext.getCmp(prototype.id1 + '-TransactionTKT').setValue('');

        Ext.getCmp(prototype.id1 + '-Sent').setValue('');
        Ext.getCmp(prototype.id1 + '-UserSent').setValue('');
        Ext.getCmp(prototype.id1 + '-IATA').setValue('');
        Ext.getCmp(prototype.id1 + '-IATAName').setValue('');
        Ext.getCmp(prototype.id1 + '-Address').setValue('');
        Ext.getCmp(prototype.id1 + '-PassName').setValue('');
        Ext.getCmp(prototype.id1 + '-CTA').setValue('');
        Ext.getCmp(prototype.id1 + '-cur').setValue('');
        var txtPDFASR = Ext.getCmp(prototype.id1 + '-PDFASR');
        var PDFBSP = Ext.getCmp(prototype.id1 + '-PDFBSP');
        var PDFARC = Ext.getCmp(prototype.id1 + '-PDFARC');
        txtPDFASR.hide();
        PDFARC.hide();
        PDFBSP.hide();

        //PARA CARGAR EL SEGUNDO GRID ARELONIAE
        Ext.getCmp(prototype.id1 + '-FareAro').setValue('0');
        Ext.getCmp(prototype.id1 + '-TotalTaxAre').setValue('0');
        Ext.getCmp(prototype.id1 + '-ServiceschargesAre').setValue('0');
        Ext.getCmp(prototype.id1 + '-IvaAre').setValue('0');
        Ext.getCmp(prototype.id1 + '-CommissionAre').setValue('0');
        Ext.getCmp(prototype.id1 + '-SobreComiAre').setValue('0');
        Ext.getCmp(prototype.id1 + '-TocaAre').setValue('0');


        //PARA CARGAR EL SEGUNDO GRID AGENCIA 
        Ext.getCmp(prototype.id1 + '-FareAgent').setValue('0');
        Ext.getCmp(prototype.id1 + '-TotalTaxAgent').setValue('0');
        Ext.getCmp(prototype.id1 + '-ServiceschargesAgent').setValue('0');
        Ext.getCmp(prototype.id1 + '-IvaAgent').setValue('0');
        Ext.getCmp(prototype.id1 + '-CommissionAgent').setValue('0');
        Ext.getCmp(prototype.id1 + '-SobreComiAgent').setValue('0');
        Ext.getCmp(prototype.id1 + '-TocaAgent').setValue('0');

        //PARA CARGAR EL SEGUNDO GRID DIFERENCIA
        Ext.getCmp(prototype.id1 + '-FareDife').setValue('0');
        Ext.getCmp(prototype.id1 + '-TotalTaxDife').setValue('0');
        Ext.getCmp(prototype.id1 + '-ServiceschargesDife').setValue('0');
        Ext.getCmp(prototype.id1 + '-IvaDife').setValue('0');
        Ext.getCmp(prototype.id1 + '-CommissionDife').setValue('0');
        Ext.getCmp(prototype.id1 + '-SobreComiDife').setValue('0');
        Ext.getCmp(prototype.id1 + '-TocaDife').setValue('0');

        //total del debito
        Ext.getCmp(prototype.id1 + '-AmountPay').setValue('0');
        //datos de las grilla 
        //grilla aeroline
        Ext.getCmp(prototype.id1 + '-gridCalAirline').getStore().removeAll();
        Ext.getCmp(prototype.id1 + '-CABErrorAirline').hide();
        //grilla gridTax
        Ext.getCmp(prototype.id1 + '-gridTax').getStore().removeAll();
        Ext.getCmp(prototype.id1 + '-CABErrorTax').hide();
        Ext.getCmp(prototype.id1 + '-ErrorTax').hide();

        //grilla gridTax
        Ext.getCmp(prototype.id1 + '-gridRazones').getStore().removeAll();
        Ext.getCmp(prototype.id1 + '-CABErrorRazones').hide();
        Ext.getCmp(prototype.id1 + '-ErrorRazones').hide();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    onRelatedDocumentsClick: function () {
        //var action = this.action === null || this.action === undefined ? 'SNCAMBIO' : this.action;
        var rec = this.BeanDatos === null || this.BeanDatos === undefined ? {} : this.BeanDatos;
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.DocumRelFormUnico({
            params: {
                //action: action,
                rec: rec,
                url01: this.urlWin01
            }
        });
        win.show();
    },
    onSeguimietoClick: function () {
        var action = this.action === null || this.action === undefined ? 'SNCAMBIO' : this.action;
        var rec = this.BeanDatos === null || this.BeanDatos === undefined ? {} : this.BeanDatos;
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimieto({
            params: {
                action: action,
                rec: rec,
                url01: this.urlWin01
            }
        });
        win.show();
    },
    onProvisionsClick: function () {
        var rec = this.BeanDatos === null || this.BeanDatos === undefined ? {} : this.BeanDatos;
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.FormOfProvisions({
            params: {
                rec: rec,
                url01: this.urlWin01
            }
        });
        win.show();
    },
    onTasaIvaClick: function () {
        var rec = this.BeanDatos === null || this.BeanDatos === undefined ? {} : this.BeanDatos;
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.FormformateoCta({
            params: {
                rec: rec,
                url01: this.urlWin01
            }
        });
        win.show();
    },
    PDF_clickHandler: function (cmp) {
        var me = this;
        if (cmp === 2) {
            if (me.BeanDatos.A2548FTE !== 'ARC') {
                global.Msg({msg: 'The Source should be ARC'});
                return;
            }
        }
        if (cmp === 3) {
            if (me.BeanDatos.A2548FTE !== 'ASR') {
                global.Msg({msg: 'The Source should be ASR'});
                return;
            }
        }
        //filtros para el codigo de razon
        me.BeanPDF.COMBOBY = '0';
        me.BeanPDF.OPCIONTYPE = '6';
        me.BeanPDF.NUMBERADM = Ext.String.trim(me.BeanDatos.A2548CNXPA);
        me.BeanPDF.A2548PREME = Ext.String.trim(me.BeanDatos.A2548PREME);

        me.BeanPDF.A2548CODIT = Ext.String.trim(me.BeanDatos.A2548CODIT);
        me.BeanPDF.A2548NMEMO = Ext.String.trim(me.BeanDatos.A2548NMEMO);
        me.BeanPDF.A2548FREGI = Ext.String.trim(me.BeanDatos.A2548FREGI);
        me.BeanPDF.A2548FTE = Ext.String.trim(me.BeanDatos.A2548FTE);
        me.BeanPDF.A2548IATA = Ext.String.trim(me.BeanDatos.A2548IATA);
        me.BeanPDF.A2548EMPLE = Ext.String.trim(me.BeanDatos.A2548EMPLE);
        me.BeanPDF.A2548FVTA = Ext.String.trim(me.BeanDatos.A2548FVTA);
        me.BeanPDF.A2548PAIS = Ext.String.trim(me.BeanDatos.A2548PAIS);
        me.BeanPDF.A2548TRNCO = Ext.String.trim(me.BeanDatos.A2548TRNCO);
        me.BeanPDF.A2548FEMIT = Ext.String.trim(me.BeanDatos.A2548FEMIT);
        me.BeanPDF.A2548EMITI = Ext.String.trim(me.BeanDatos.A2548EMITI);
        me.BeanPDF.A2548FENVI = Ext.String.trim(me.BeanDatos.A2548FENVI);
        me.BeanPDF.A2548ENVIA = Ext.String.trim(me.BeanDatos.A2548ENVIA);
        me.BeanPDF.A2548FDISP = Ext.String.trim(me.BeanDatos.A2548FDISP);
        me.BeanPDF.A2548DISPU = Ext.String.trim(me.BeanDatos.A2548DISPU);
        me.BeanPDF.A2548FDISP = Ext.String.trim(me.BeanDatos.A2548FDISP);
        me.BeanPDF.A2548DISPU = Ext.String.trim(me.BeanDatos.A2548DISPU);
        me.BeanPDF.A2548CIUD = Ext.String.trim(me.BeanDatos.A2548CIUD);

        me.BeanPDF.A2548TRNCO = Ext.String.trim(me.BeanDatos.A2548TRNCO);
        me.BeanPDF.A2548CPN = Ext.String.trim(me.BeanDatos.A2548CPN);
        me.BeanPDF.A2548TRNCU = Ext.String.trim(me.BeanDatos.A2548TRNCU);
        me.BeanPDF.A2548FTE = Ext.String.trim(me.BeanDatos.A2548FTE);
        me.BeanPDF.A2548CANAL = Ext.String.trim(me.BeanDatos.A2548CANAL);
        me.BeanPDF.A2548OBSER = Ext.String.trim(me.BeanDatos.A2548OBSER);
        me.BeanPDF.A2548CANTIDAD = me.BeanDatos.A2548CANTIDAD;
        //txaObserva.text=data.A2548TEXT;
        me.BeanPDF.A2548TIKET = Ext.String.trim(me.BeanDatos.A2548TIKET);
        me.BeanPDF.A2548CIA = Ext.String.trim(me.BeanDatos.A2548CIA);
        me.BeanPDF.A2548FORMA = Ext.String.trim(me.BeanDatos.A2548FORMA);
        me.BeanPDF.A2548SERIE = Ext.String.trim(me.BeanDatos.A2548SERIE);
        me.BeanPDF.A2548SEQ = Ext.String.trim(me.BeanDatos.A2548SEQ);
        me.BeanPDF.A2548CPN = Ext.String.trim(me.BeanDatos.A2548CPN);

        //PARA CARGAR EL SEGUNDO GRID ARELONIAE
        me.BeanPDF.A2548TARIF = me.BeanDatos.A2548TARIF;
        me.BeanPDF.A2548COMIS = me.BeanDatos.A2548COMIS;
        me.BeanPDF.A2548SCOM = me.BeanDatos.A2548SCOM;
        me.BeanPDF.A2548TTAX = me.BeanDatos.A2548TTAX;
        me.BeanPDF.A2548SERVI = me.BeanDatos.A2548SERVI;
        me.BeanPDF.A2548IVACS = me.BeanDatos.A2548IVACS;
        me.BeanPDF.A2548TAXCM = me.BeanDatos.A2548TAXCM;
        //PARA CARGAR EL SEGUNDO GRID AGENCIA 
        me.BeanPDF.A2548TARIA = me.BeanDatos.A2548TARIA;
        me.BeanPDF.A2548TTAXA = me.BeanDatos.A2548TTAXA;
        me.BeanPDF.A2548SERVA = me.BeanDatos.A2548SERVA;
        me.BeanPDF.A2548IVACA = me.BeanDatos.A2548IVACA;
        me.BeanPDF.A2548COMIA = me.BeanDatos.A2548COMIA;
        me.BeanPDF.A2548SCOMA = me.BeanDatos.A2548SCOMA;
        me.BeanPDF.A2548TAXCA = me.BeanDatos.A2548TAXCA;

        //PARA CARGAR EL SEGUNDO GRID DIFERENCIA

        me.BeanPDF.A2548TARID = me.BeanDatos.A2548TARID;
        me.BeanPDF.A2548TTAXD = me.BeanDatos.A2548TTAXD;
        me.BeanPDF.A2548SERVD = me.BeanDatos.A2548SERVD;
        me.BeanPDF.A2548IVACD = me.BeanDatos.A2548IVACD;
        me.BeanPDF.A2548COMID = me.BeanDatos.A2548COMID;
        me.BeanPDF.A2548SCOMD = me.BeanDatos.A2548SCOMD;
        me.BeanPDF.A2548TAXCD = me.BeanDatos.A2548TAXCD;
        me.BeanPDF.A2548CANTIDAD = me.BeanDatos.A2548CANTIDAD;
        me.BeanPDF.A2548DISPU = me.BeanDatos.A2548DISPU;
        me.BeanPDF.AGENCY = Ext.String.trim(me.BeanDatos.AGENCY);
        me.BeanPDF.DIRAGENCY = Ext.String.trim(me.BeanDatos.DIRAGENCY);
        me.BeanPDF.A2548REGIS = Ext.String.trim(me.BeanDatos.A2548REGIS);
        me.BeanPDF.A2548FLAG = Ext.String.trim(me.BeanDatos.A2548FLAG);
        me.BeanPDF.A2548CNXPA = me.BeanDatos.A2548CNXPA;


        //PARA CARGAR EL SEGUNDO GRID A pagar a la Aerolínea
        me.BeanPDF.A2548NETO = me.BeanDatos.A2548NETO;
        me.BeanPDF.A2548MDA = me.BeanDatos.A2548MDA;

        //PARA OBTNER LA RAZONES

        var gridRazones = Ext.getCmp(prototype.id1 + '-gridRazones');
        var GridRazonEmisionTemp = new Array();
        gridRazones.store.data.each(function (rec) {
            GridRazonEmisionTemp.push({"A2548CODR1": rec.data.A2553CODE, "A2548DESC1": rec.data.A2553TYPO, "A2548EMISION": rec.data.A2553DESCR});
        });

        //PARA OBTNER LA CALCULOS AEROLINEA
        var gridCalAirline = Ext.getCmp(prototype.id1 + '-gridCalAirline');
        var GridCalculosAreolTemp = new Array();
        gridCalAirline.store.data.each(function (rec) {
            GridCalculosAreolTemp.push({
                "A1580FROM": rec.data.A1580FROM,
                "A1580TO": rec.data.A1580TO,
                "A1580RUTAC": rec.data.A1580RUTAC,
                "A1580CLASE": rec.data.A1580CLASE,
                "A1580FBASI": rec.data.A1580FBASI,
                "A1580FMIOR": rec.data.A1580FMIOR,
                "A1580QMIOR": rec.data.A1580QMIOR,
                "TotalFare": rec.data.TotalFare,
                "A1580CHAMI": rec.data.A1580CHAMI,
                "TotalTKT": rec.data.TotalTKT

            });
        });
        //PARA OBTNER LA CALCULOS AEROLINEA
        var gridTax = Ext.getCmp(prototype.id1 + '-gridTax');
        var BeanCalculosImpuestosTemp = new Array();
        gridTax.store.data.each(function (rec) {
            BeanCalculosImpuestosTemp.push({
                "A1673CDTAX": rec.data.A1673CDTAX,
                "A1673TXMIA": rec.data.A1673TXMIA,
                "A1673TXORI": rec.data.A1673TXORI,
                "A1673TXDIF": rec.data.A1673TXDIF
            });
        });

        if (cmp === 1 || cmp === 4) {
            this.GeneraPDF(this.BeanPDF, GridRazonEmisionTemp, GridCalculosAreolTemp, BeanCalculosImpuestosTemp);
        } else if (cmp === 2) {
            this.GeneraARCPDF(this.BeanPDF, GridRazonEmisionTemp, GridCalculosAreolTemp, BeanCalculosImpuestosTemp);
        } else if (cmp === 3) {
            this.GeneraASRPDF(this.BeanPDF, GridRazonEmisionTemp, GridCalculosAreolTemp, BeanCalculosImpuestosTemp);
        }
    },
    GeneraARCPDF: function (BeanPDFGeneral1, BeanRazonEmision1, BeanCalculosAreol1, BeanCalculosImpuestos1) {
        this.exportPdf(this.urlWin01 + '/getFormUnicoARCPDF/?BeanPDFGeneral=' + encodeURI(JSON.stringify(BeanPDFGeneral1)) + "&BeanRazonEmision=" + encodeURI(JSON.stringify(BeanRazonEmision1)) + "&BeanCalculosAreol=" + encodeURI(JSON.stringify(BeanCalculosAreol1)) + "&BeanCalculosImpuestos=" + encodeURI(JSON.stringify(BeanCalculosImpuestos1)));
    },
    GeneraASRPDF: function (BeanPDFGeneral1, BeanRazonEmision1, BeanCalculosAreol1, BeanCalculosImpuestos1) {
        this.exportPdf(this.urlWin01 + '/getFormUnicoASRPDF/?BeanPDFGeneral=' + encodeURI(JSON.stringify(BeanPDFGeneral1)) + "&BeanRazonEmision=" + encodeURI(JSON.stringify(BeanRazonEmision1)) + "&BeanCalculosAreol=" + encodeURI(JSON.stringify(BeanCalculosAreol1)) + "&BeanCalculosImpuestos=" + encodeURI(JSON.stringify(BeanCalculosImpuestos1)));
    },
    GeneraPDF: function (BeanPDFGeneral1, BeanRazonEmision1, BeanCalculosAreol1, BeanCalculosImpuestos1) {
        this.exportPdf(this.urlWin01 + '/getFormUnicoPDF/?BeanPDFGeneral=' + encodeURI(JSON.stringify(BeanPDFGeneral1)) + "&BeanRazonEmision=" + encodeURI(JSON.stringify(BeanRazonEmision1)) + "&BeanCalculosAreol=" + encodeURI(JSON.stringify(BeanCalculosAreol1)) + "&BeanCalculosImpuestos=" + encodeURI(JSON.stringify(BeanCalculosImpuestos1)));
    },
    exportPdf: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Pdf ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();

    }

});