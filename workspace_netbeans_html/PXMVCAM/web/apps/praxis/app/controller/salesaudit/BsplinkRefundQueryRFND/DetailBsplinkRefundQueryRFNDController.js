/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFNDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailBsplinkRefundQueryRFNDController',
    beanTMP: {},
    beanTKT: {},
    beanGuardar: {},
    urlWin01: '',
    urlWin02: '',
    lst_CardTypeAGNT: null,
    lst_CardType: null,
    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
        this.urlWin02 = Ext.String.trim(this.view.params.url02);
        // console.log(this.view.params.action)
    },
    /*OnBeforeShow: function(){
     this.urlWin01 = Ext.String.trim(this.view.params.url01);
     this.urlWin02 = Ext.String.trim(this.view.params.url02);
     },*/

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        /*
         * Ejecutamos validaciones de inicio y status del formulario
         */
        /*this.urlWin01 = Ext.String.trim(this.view.params.url01);
         this.urlWin02 = Ext.String.trim(this.view.params.url02);*/
        switch (String(this.view.params.action)) {
            case 'FORMQUERYRFND':

                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-gridRazones').hide();
                Ext.getCmp(prototype.id01 + '-btn-close').show();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').show();
                break;
            case 'FORMASSOCIATEDRFND':
                Ext.getCmp(prototype.id01 + '-contenedor-status').show();
                Ext.getCmp(prototype.id01 + '-win').setHeight(Ext.getCmp(prototype.id01 + '-win').getHeight() + 30);
                this.onLoadCmbStatus();
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-close').show();
                Ext.getCmp(prototype.id01 + '-gridRazones').show();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').hide();
                break;
        }

        this.onLoadData();
        this.setStoresGrids();
    },
    onLoadCargaData: function () {
        this.onLoadData();
        this.setStoresGrids();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id01 + '-gridtkt');
        var grid02 = Ext.getCmp(prototype.id01 + '-gridtktAGENT');
        var grid03 = Ext.getCmp(prototype.id01 + '-gridRazones');
        var grid04 = Ext.getCmp(prototype.id01 + '-gridRazonesDetall');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid01'
        });

        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid02'
        });

        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid04'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
    },
    onLoadCmbStatus: function () {
        var ComboEstatus = Ext.getCmp(prototype.id01 + '-ComboEstatus');

        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "R", "name": "REJECT"},
                {"code": "F", "name": "AUTHORISE"},
                {"code": "Z", "name": "UNDER INVESTIGATION"}
            ]
        }));
    },
    onCmbStatusAfterrender: function () {
        var ComboEstatus = Ext.getCmp(prototype.id01 + '-ComboEstatus');
        ComboEstatus.setValue('');
    },
    onSabreStatusClick: function () {
        var me = this;
        rec = me.view.params.rec;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormSabreEstatus({
            params: {
                rec_preme: Ext.getCmp(prototype.id01 + '-txtPreme').getValue(),
                rec_number: Ext.getCmp(prototype.id01 + '-txtNumber').getValue(),
                rec_tkt: Ext.getCmp(prototype.id01 + '-txtSNumber').getValue(),
                rec_aplidate: Ext.getCmp(prototype.id01 + '-txtAplidate').getValue(),
                rec_flagsoli: rec.get('A3389FLAG')
            }
        });
        win.show();
    },
    onLoadData: function () {
        var me = this;
        rec = me.view.params.rec;

        Ext.getCmp(prototype.id01 + '-txtCURRENCY').setValue(rec.get('A3389MDA'));
        Ext.getCmp(prototype.id01 + '-txtNumber').setValue(rec.get('A3389NUMER'));
        Ext.getCmp(prototype.id01 + '-txtAplidate').setValue(rec.get('A3389FAPPI'));
        Ext.getCmp(prototype.id01 + '-txtSale').setValue(rec.get('A3389TVTA'));
        Ext.getCmp(prototype.id01 + '-txtStatus').setValue(rec.get('A3389STATU'));
        Ext.getCmp(prototype.id01 + '-txtFROM').setValue(rec.get('A3389IATA'));
        Ext.getCmp(prototype.id01 + '-txtAGENTVAT').setValue(rec.get('A3389VATG'));
        Ext.getCmp(prototype.id01 + '-txtPASSENGER').setValue(rec.get('A3389PAX'));
        Ext.getCmp(prototype.id01 + '-txtDateModi').setValue(rec.get('A3389FMODI'));
        Ext.getCmp(prototype.id01 + '-txtUSER').setValue(rec.get('A3389REGAS'));
        Ext.getCmp(prototype.id01 + '-txtCOUNTRY').setValue(rec.get('A3389PAIS'));
        Ext.getCmp(prototype.id01 + '-txtSNumber').setValue(rec.get('A3389TKT'));
        Ext.getCmp(prototype.id01 + '-txtTKTDUPLI').setValue(rec.get('A3389TKTDUPLI'));
        Ext.getCmp(prototype.id01 + '-txtPreme').setValue(rec.get('A3389PREME'));

        Ext.getCmp(prototype.id01 + '-txaRemark').setValue(rec.get('A3389RAAR'));
        Ext.getCmp(prototype.id01 + '-txtHourRFND').setValue(rec.get('A3389HREGA'));
        Ext.getCmp(prototype.id01 + '-txtTypeRFND').setValue(rec.get('A3389RAUD'));

        Ext.getCmp(prototype.id01 + '-txtAuthorise').setValue(rec.get('A3389FAUTO')); // 
        Ext.getCmp(prototype.id01 + '-txtTime').setValue(rec.get('A3389HAUTO'));

        if (rec.get('A3389ARCH1') === '') {
            Ext.getCmp(prototype.id01 + '-txtImageView').hide();
        } else {
            Ext.getCmp(prototype.id01 + '-txtImageView').show();
        }
        var TKTDUPLI = '';
        if (rec.get('A3389TKTDUPLI2') !== undefined) {
            TKTDUPLI = rec.get('A3389TKTDUPLI2');
        } else {
            TKTDUPLI = 'NO';
        }
        if (TKTDUPLI !== 'SI') {
            if (rec.get('A3389TKTDUPLI') !== TKTDUPLI) {
                TKTDUPLI = rec.get('A3389TKTDUPLI');
            }
        }

        if (TKTDUPLI !== 'SI') {
            Ext.getCmp(prototype.id01 + '-txtRelatedFolios').hide();
        } else {
            Ext.getCmp(prototype.id01 + '-txtRelatedFolios').show();
        }
        if (rec.get('A3389PGNA') === '') {
            Ext.getCmp(prototype.id01 + '-txtPDI').hide();
        } else {
            Ext.getCmp(prototype.id01 + '-txtPDI').show();
        }




        switch (String(rec.get('A3389FLAG'))) {
            case 'A':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('ASSIGNED TO AUDITOR');
                break;
            case 'X':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('VOID');
                break;
            case 'B':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('CHANGE FOR ANOTHER');
                break;
            case 'C':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('INCONSISTENCY WITH THE ROBOT');
                break;
            case 'E':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('ERROR IN THE PROCESS');
                break;
            case 'R':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('REJECTED');
                break;
            case 'F':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('AUTHORISED');
                break;
            case 'Y':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('PENDING');
                break;
            case 'D':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('REEMBOLSABLE');
                break;
            case 'G':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('NO REEMBOLSABLE');
                break;
            case 'Z':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('UNDER INVESTIGATION');
                break;
        }

        if (parseFloat(rec.get('A3389VMSCA')) !== 0) {
            Ext.getCmp(prototype.id01 + '-txtCashAGENT').setValue('Yes');
        } else {
            Ext.getCmp(prototype.id01 + '-txtCashAGENT').setValue('No');
        }
        Ext.getCmp(prototype.id01 + '-txtCashAmoAGENT').setValue(rec.get('A3389VMSCA'));
        Ext.getCmp(prototype.id01 + '-txtMSCAAGENT').setValue('0.00');
        if (parseFloat(rec.get('A3389VMSCC')) !== 0) {
            Ext.getCmp(prototype.id01 + '-txtCCAGENT').setValue('Yes');
        } else {
            Ext.getCmp(prototype.id01 + '-txtCCAGENT').setValue('No');
        }

        Ext.getCmp(prototype.id01 + '-txtMSCCAGENT').setValue(Ext.util.Format.number(rec.get('A3389VMSCC'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtGROSSFAREAGENT').setValue(Ext.util.Format.number(rec.get('A3389TARIF'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtLessGROSSFAREAGENT').setValue(Ext.util.Format.number(rec.get('A3389TARIU'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREAGENT').setValue(Ext.util.Format.number(rec.get('A3389TARED'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(rec.get('A3389PORCO'), '0,000.00') + ' - ' + Ext.util.Format.number(rec.get('A3389COMIS'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtCommissionAGENT2').setValue(Ext.util.Format.number(rec.get('A3389COMIS'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtTotalTaxAGENT').setValue(Ext.util.Format.number(rec.get('A3389TTAX'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtPenaltyAGENT').setValue(Ext.util.Format.number(rec.get('A3389PENAL'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtTAXCPAGENT').setValue(Ext.util.Format.number(rec.get('A3389PORPE'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtREFUNDTOAGENT').setValue(Ext.util.Format.number(rec.get('A3389TOTAL'), '0,000.00'));
        if (rec.get('A3389PAIS') === 'CN') {
            Ext.getCmp(prototype.id01 + '-txaReference').setValue(me.ToGB2312(rec.get('A3389RAAG')));
        } else {
            Ext.getCmp(prototype.id01 + '-txaReference').setValue(rec.get('A3389RAAG'));
        }
        //alert(rec.get('A3389COMIS') + rec.get('A3389PORCO'));
        this.onLoadCalculosImpuestos(rec);
    },
    ToGB2312: function (str) {
        var cadena = str.replace(/\\u/gi, '%u');
        cadena = cadena.replace(/\\n/gi, "\n");
        cadena = cadena.replace(/\\t/gi, "\t");
        return unescape(cadena);
    },
    onLoadCalculosImpuestos: function (rec) {
        var me = this;
        me.beanTMP.IN_CIA = rec.get('A3389CCUST');
        me.beanTMP.IN_PREME = rec.get('A3389PREME');
        me.beanTMP.IN_DATEFROM = rec.get('A3389FAPPI');
        Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchQueryRFNDetail',
            method: 'POST',
            timeout: '300000',
            params: me.beanTMP,
            success: function (response, options) {
                Ext.getCmp(prototype.id01 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                // console.log(res);
                var vl_A3402CDTAX = '';
                var vl_A3402CDATO = '';

                // console.log(res.lst_TAXES);

                if (res.lst_TAXES.length > 0) {
                    Ext.each(res.lst_TAXES, function (value, index) {
                        if (value.A3402CDTAX !== '') {
                            if (value.A3402CORRL === 'YES') {
                                Ext.getCmp(prototype.id01 + '-txtFPAero').show();
                                Ext.getCmp(prototype.id01 + '-txtFPAero2').hide();
                            } else {
                                Ext.getCmp(prototype.id01 + '-txtFPAero').hide();
                                Ext.getCmp(prototype.id01 + '-txtFPAero2').show();
                            }
                            vl_A3402CDTAX = value.A3402CDTAX;
                        }

                        if (value.A3402CDATO !== '') {
                            vl_A3402CDATO = value.A3402CDATO;
                            if (value.A3402CORRL === 'YES') {
                                Ext.getCmp(prototype.id01 + '-txtFPAGENT').show();
                                Ext.getCmp(prototype.id01 + '-txtFPAGENT2').hide();
                            } else {
                                Ext.getCmp(prototype.id01 + '-txtFPAGENT').hide();
                                Ext.getCmp(prototype.id01 + '-txtFPAGENT2').show();
                            }
                        }
                    });

                    if (vl_A3402CDTAX === 'NOT' && vl_A3402CDATO === 'NOT') {
                        Ext.getCmp(prototype.id01 + '-txtFPDIFE').setValue('NOT');
                    } else {
                        Ext.getCmp(prototype.id01 + '-txtFPDIFE').setValue('YES');
                    }

                } else {
                    Ext.getCmp(prototype.id01 + '-txtFPAero').hide();
                    Ext.getCmp(prototype.id01 + '-txtFPAero2').show();
                    Ext.getCmp(prototype.id01 + '-txtFPAGENT').hide();
                    Ext.getCmp(prototype.id01 + '-txtFPAGENT2').show();

                    Ext.getCmp(prototype.id01 + '-txtFPDIFE').setValue('NOT');
                }
                // console.log(res.lst_RFNDAGNT[0]);
                if (res.lst_RFNDAGNT.length > 0) {
                    Ext.getCmp(prototype.id01 + '-txtAplicable').setValue(res.lst_RFNDAGNT[0].A3401STATU);
                    Ext.getCmp(prototype.id01 + '-txtRazon').setValue(res.lst_RFNDAGNT[0].A3401RAAG);
                    Ext.getCmp(prototype.id01 + '-txtGROSSFAREAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401TARIF, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401TARIF, '0,000.00'));

                    Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401COMIS, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtTotalTaxAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401TTAX, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtPenaltyAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401PENAL, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtTAXCPAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401IVAPE, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtREFUNDTOAero').setValue(Ext.util.Format.number(res.lst_RFNDAGNT[0].A3401NETO, '0,000.00'));
                }

                var vl_txtREFUNDTOAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtREFUNDTOAero').getValue().replace(',', ''));
                var vl_txtGROSSFAREAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtGROSSFAREAero').getValue().replace(',', ''));
                var vl_txtLessGROSSFAREAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtLessGROSSFAREAero').getValue().replace(',', ''));
                var vl_txtTotalGROSSFAREAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREAero').getValue().replace(',', ''));
                var vl_txtCommissionAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtCommissionAero').getValue().replace(',', ''));
                var vl_txtTotalTaxAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtTotalTaxAero').getValue().replace(',', ''));
                var vl_txtPenaltyAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtPenaltyAero').getValue().replace(',', ''));
                var vl_txtTAXCPAero = parseFloat(Ext.getCmp(prototype.id01 + '-txtTAXCPAero').getValue().replace(',', ''));

                if (vl_txtGROSSFAREAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtGROSSFAREAero').setValue('0.00');
                if (vl_txtGROSSFAREAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtLessGROSSFAREAero').setValue('0.00');
                if (vl_txtTotalGROSSFAREAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREAero').setValue('0.00');
                if (vl_txtCommissionAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue('0.00');
                if (vl_txtTotalTaxAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtTotalTaxAero').setValue('0.00');
                if (vl_txtPenaltyAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtPenaltyAero').setValue('0.00');
                if (vl_txtTAXCPAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtTAXCPAero').setValue('0.00');
                if (vl_txtREFUNDTOAero === 0)
                    Ext.getCmp(prototype.id01 + '-txtREFUNDTOAero').setValue('0.00');


                var vl_txtGROSSFAREAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtGROSSFAREAGENT').getValue().replace(',', ''));
                var vl_txtLessGROSSFAREAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtLessGROSSFAREAGENT').getValue().replace(',', ''));
                var vl_txtTotalGROSSFAREAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREAGENT').getValue().replace(',', ''));
                var vl_txtCommissionAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtCommissionAGENT2').getValue().replace(',', ''));
                var vl_txtTotalTaxAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtTotalTaxAGENT').getValue().replace(',', ''));
                var vl_txtPenaltyAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtPenaltyAGENT').getValue().replace(',', ''));
                var vl_txtTAXCPAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtTAXCPAGENT').getValue().replace(',', ''));
                var vl_txtREFUNDTOAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtREFUNDTOAGENT').getValue().replace(',', ''));

                if (vl_txtGROSSFAREAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtGROSSFAREAGENT').setValue('0.00');
                if (vl_txtLessGROSSFAREAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtLessGROSSFAREAGENT').setValue('0.00');
                if (vl_txtTotalGROSSFAREAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREAGENT').setValue('0.00');
                if (vl_txtCommissionAGENT === 0) {
                    Ext.getCmp(prototype.id01 + '-txtCommissionAGENT2').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue('0.00');
                }
                if (vl_txtTotalTaxAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtTotalTaxAGENT').setValue('0.00');
                if (vl_txtPenaltyAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtPenaltyAGENT').setValue('0.00');
                if (vl_txtTAXCPAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtTAXCPAGENT').setValue('0.00');
                if (vl_txtREFUNDTOAGENT === 0)
                    Ext.getCmp(prototype.id01 + '-txtREFUNDTOAGENT').setValue('0.00');
                if (Ext.getCmp(prototype.id01 + '-txtAplicable').getValue() === 'REEMBOLSABLE' &&
                        Ext.getCmp(prototype.id01 + '-txtRazon').getValue() === 'VERIFICAR REGLA DE TARIFA (PENALIDADES)') {

                    Ext.getCmp(prototype.id01 + '-txtREFUNDTOAero').setValue(Ext.util.Format.number((vl_txtTotalGROSSFAREAero + vl_txtTotalTaxAero) - (vl_txtPenaltyAero + vl_txtTAXCPAero), '0,000.00'));
                    vl_txtREFUNDTOAero = ((vl_txtTotalGROSSFAREAero + vl_txtTotalTaxAero) - (vl_txtPenaltyAero + vl_txtTAXCPAero));
                }
                //console.log(vl_txtGROSSFAREAero + '-' + vl_txtGROSSFAREAGENT)

                Ext.getCmp(prototype.id01 + '-txtGROSSFAREDIFE').setValue(Ext.util.Format.number(vl_txtGROSSFAREAero - vl_txtGROSSFAREAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtLessGROSSFAREDIFE').setValue(Ext.util.Format.number(vl_txtLessGROSSFAREAero - vl_txtLessGROSSFAREAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalGROSSFAREDIFE').setValue(Ext.util.Format.number(vl_txtTotalGROSSFAREAero - vl_txtTotalGROSSFAREAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(vl_txtCommissionAero - vl_txtCommissionAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalTaxDIFE').setValue(Ext.util.Format.number(vl_txtTotalTaxAero - vl_txtTotalTaxAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtPenaltyDIFE').setValue(Ext.util.Format.number(vl_txtPenaltyAero - vl_txtPenaltyAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTAXCPDIFE').setValue(Ext.util.Format.number(vl_txtTAXCPAero - vl_txtTAXCPAGENT, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtREFUNDTODIFE').setValue(Ext.util.Format.number(vl_txtREFUNDTOAero - vl_txtREFUNDTOAGENT, '0,000.00'));

                Ext.getCmp(prototype.id01 + '-gridtkt').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridtkt').getStore().loadData(res.lst_DOCUMENTSAGNT);

                Ext.getCmp(prototype.id01 + '-gridtktAGENT').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridtktAGENT').getStore().loadData(res.lst_DOCUMENTS);

                Ext.getCmp(prototype.id01 + '-gridRazones').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').getStore().loadData(res.lst_RAZON);

                me.lst_CardTypeAGNT = res.lst_CardTypeAGNT;
                me.lst_CardType = res.lst_CardType;
            }
        });
    },
    onSerecRelatedFolios: function () {
        var txtSNumber = Ext.getCmp(prototype.id01 + '-txtSNumber').getValue();
        var txtCOUNTRY = Ext.getCmp(prototype.id01 + '-txtCOUNTRY').getValue();
        var FormListRFND = Ext.create('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormListRFND', {id: 'FormListRFND'});
        var controller = FormListRFND.getController();
        controller.initial(txtSNumber, txtCOUNTRY, this.urlWin01);
        FormListRFND.show();
    },
    onImageViewClick: function () {
        this.onWinFileViewerClick();
    },
    onWinFormOfPaymentClick: function () {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormOfPaymentRFND({
            params: {
                lst_CardTypeAGNT: me.lst_CardTypeAGNT,
                lst_CardType: me.lst_CardType
            }
        });
        win.show();
    },
    onWinOriginalDataTaxesClick: function () {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.OriginalDataTaxesRFND({
            params: {
                rec: me.view.params.rec,
                url01: this.urlWin02
            }
        });
        win.show();
    },
    onWinFormRazonesClick: function () {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.BsplinkAssociatedRFND.FormRazonesRFND({
            params: {
                vl_pais: Ext.getCmp(prototype.id01 + '-txtCOUNTRY').getValue(),
                url01: this.urlWin02
            }
        });
        win.show();
    },
    onWinFileViewerClick: function () {
        // 139 - 0370663898
        // console.log(rec.get('A3389FREGI') + '-' + rec.get('A3389PAIS') + '-' + rec.get('A3389NUMER'));

        var me = this;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.BsplinkFileViewer({
            params: {
                rec: me.view.params.rec,
                url01: this.urlWin01
            }
        });
        win.show();
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var vl_razon = '';
        var vl_razon2 = '';
        var me = this;
        rec = me.view.params.rec;

        var vl_STATUS = Ext.getCmp(prototype.id01 + '-ComboEstatus').getValue();
        var grid03 = Ext.getCmp(prototype.id01 + '-gridRazones');
        var regs = grid03.getStore().getCount();
        if (Ext.getCmp(prototype.id01 + '-ComboEstatus').getValue() === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Status');
            bvalida = false;
        }
        if (Ext.getCmp(prototype.id01 + '-txtPreme').getValue() === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter preme RFND');
            bvalida = false;
        }
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter issue reason');
            bvalida = false;
        }
        if (regs !== 0) {
            for (var o = 0; o < regs; o++) {
                if (grid03.getStore().getAt(o).get('A3404CODRZ') !== '00002') {
                    vl_razon2 = vl_razon2 + grid03.getStore().getAt(o).get('A3404CODRZ');
                }
            }
            if (vl_razon2.length === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The free text must be used with another answer');
                bvalida = false;
            }
        }

        if (regs !== 0) {
            for (var i = 0; i < regs; i++) {
                vl_razon = vl_razon + grid03.getStore().getAt(i).get('A3404ERROR');
                if (grid03.getStore().getAt(i).get('A3404ERROR').length > 300) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 300 characters');
                    bvalida = false;
                    return;
                }
            }
            if (vl_razon.length > 420) {
                Ext.Msg.alert('.: PRAXIS :.', 'The description total must not exceed 420 characters');
                bvalida = false;
            }
        }
        for (var e = 0; e < regs; e++) {
            if (grid03.getStore().getAt(e).get('A3404FAMIL') === 'Authorise' && vl_STATUS === 'R') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the rejected status cannot be used with authorise answer');
                bvalida = false;
                return;
            }
            if (grid03.getStore().getAt(e).get('A3404FAMIL') !== 'Authorise' && vl_STATUS === 'F') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the authorise status cannot be used with rejected answer');
                bvalida = false;
                return;
            }
            if (grid03.getStore().getAt(e).get('A3404FAMIL') === 'Authorise' && vl_STATUS === 'Z') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the under investigation status cannot be used with Authorise answer');
                bvalida = false;
                return;
            }
        }
        if (vl_STATUS === 'F' || vl_STATUS === 'Z') {
            if (Ext.String.trim(rec.get('A3389FRERR')) === 'SALE' && parseFloat(rec.get('A3389TARIA')) > 0) {
                var txtREFUNDTOAGENT = parseFloat(Ext.getCmp(prototype.id01 + '-txtREFUNDTOAGENT').getValue().replace(',', ''));
                var vl_A3389TARIA = parseFloat(rec.get('A3389TARIA'));
                var vl_totaldif = (vl_A3389TARIA - txtREFUNDTOAGENT);
                if (vl_totaldif < 0) {

                    Ext.Msg.alert('.: PRAXIS :.', 'Total to refund cannot be higher than paid amount' + ' sale ' + rec.get('A3389TARIA') + '  refund ' + Ext.getCmp(prototype.id01 + '-txtREFUNDTOAGENT').getValue());
                    bvalida = false;
                    return;
                }
            }
        }
        //rec.get('A3389MDA')


        return bvalida;
    },
    onSaveClick: function (obj) {
        var vl_mensaje = 'Insert Data?';
        var me = this;
        if (me.validaRequiredFields()) {
            if (Ext.getCmp(prototype.id01 + '-txtTKTDUPLI').getValue() === 'SI') {
                vl_mensaje = 'The ticket has more than one document, do you want to continue?';
            }
            global.Msg({
                msg: vl_mensaje,
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.beanGuardar.IN_STATUS = Ext.getCmp(prototype.id01 + '-ComboEstatus').getValue();
                        me.beanGuardar.IN_PREME = Ext.getCmp(prototype.id01 + '-txtPreme').getValue();
                        me.beanGuardar.IN_A3389PAIS = Ext.getCmp(prototype.id01 + '-txtCOUNTRY').getValue();
                        me.beanGuardar.IN_FORMA = Ext.getCmp(prototype.id01 + '-txtSNumber').getValue();
                        me.beanGuardar.IN_DOCUMET = Ext.getCmp(prototype.id01 + '-txtTKTDUPLI').getValue();
                        var lstRazones = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.id01 + '-gridRazones').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.id01 + '-gridRazones').getStore().data.items[i].data;
                            lstRazones.push(bean);
                        }
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaManualRFND/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanGuardar),
                                beanlstRazones: JSON.stringify(lstRazones)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.id01 + '-win').close();

                                        }


                                    }});
                            }
                        });
                    }

                }
            });
        }




    },
    onPDIViewClick: function (obj) {
        var txtSNumber = Ext.getCmp(prototype.id01 + '-txtSNumber').getValue();
        var FormPDIRFND = Ext.create('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormPDIRFND', {id: 'FormPDIRFND'});
        var controller = FormPDIRFND.getController();
        controller.initial(txtSNumber, this.urlWin01);
        FormPDIRFND.show();



    },
    onCloseClick: function (obj) {
        Ext.getCmp(prototype.id01 + '-win').close();

    },
    onAddRazonClick: function (obj) {
        this.onWinFormRazonesClick();
    },
    OnChkRFNDRemove: function (grid, rowIndex, colIndex) {

        global.Msg({
            msg: 'DELETE RAZON?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                }
            }
        });

    }
});