/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.DebitBilledReportForm.DataEntryDebitBilledController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDebitBilledController',
    beanTMP: {},
    beanTKT: {},
    beanGuardar: {},
    urlWin01: CONTEXTPATH + '/DebitBilledReportForm',
    lst_CardTypeAGNT: null,
    lst_CardType: null,
    init: function (view) {
        var me = this;
    },

    afterRender: function () {

        this.onLoadData();
        this.setStoresGrids();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id01 + '-gridReasons');
        var grid02 = Ext.getCmp(prototype.id01 + '-gridtktAGENT');
        var grid03 = Ext.getCmp(prototype.id01 + '-gridReasons2');
        var grid04 = Ext.getCmp(prototype.id01 + '-gridtktAGENT2');

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
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onLoadData: function () {
        var me = this;
        rec = me.view.params.rec;

        Ext.getCmp(prototype.id01 + '-txtCountry').setValue(rec.get('A2966PAIS'));
        Ext.getCmp(prototype.id01 + '-txtIata').setValue(rec.get('A2966IATA'));
        Ext.getCmp(prototype.id01 + '-txtSource').setValue(rec.get('A2966FTE'));
        Ext.getCmp(prototype.id01 + '-txtArea').setValue(rec.get('A2966AREADES'));
        Ext.getCmp(prototype.id01 + '-txtType').setValue(rec.get('A2966TYPEDES'));

        switch (String(rec.get('A2966TRNCU'))) {
            case 'ADM':
                Ext.getCmp(prototype.id01 + '-titu1').setTitle('DETAIL OF DEBIT ' + rec.get('A2966NMEMO'));
                break;
            case 'ACM':
                Ext.getCmp(prototype.id01 + '-titu1').setTitle('DETAIL OF CREDIT ' + rec.get('A2966NMEMO'));
                break;
            case 'NTD':
                Ext.getCmp(prototype.id01 + '-titu1').setTitle('DETAIL OF DEBIT NOTE ' + rec.get('A2966NMEMO'));
                break;
            case 'NTC':
                Ext.getCmp(prototype.id01 + '-titu1').setValue('DETAIL OF CREDIT NOTE ' + rec.get('A2966NMEMO'));
                break;
        }
        this.onLoaDatosSec(rec);
    },
    onLoaDatosSec: function (rec) {
        var me = this;
        me.beanTMP.NUMBERADM = Ext.String.trim(rec.get('A2966NMEMO'));
        me.beanTMP.COUNTRY = Ext.String.trim(rec.get('A2966PAIS'));
        me.beanTMP.TRNCU = Ext.String.trim(rec.get('A2966TRNCU'));
        me.beanTMP.CHANNEL = Ext.String.trim(rec.get('A2966FTE'));
        me.beanTMP.IATA = Ext.String.trim(rec.get('A2966IATA'));
        me.beanTMP.VP_TYPE = Ext.String.trim(rec.get('A2966TYPE'));
        me.beanTMP.VP_AREA = Ext.String.trim(rec.get('A2966AREA'));
        me.beanTMP.VP_NMERF = Ext.String.trim(rec.get('A2966NMERF'));
        me.beanTMP.VP_CNXPA = Ext.String.trim(rec.get('A2966CNXPA'));
        Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchDataGeneral',
            method: 'POST',
            timeout: '300000',
            params: {beanString: JSON.stringify(me.beanTMP)},
            success: function (response, options) {
                Ext.getCmp(prototype.id01 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                
                Ext.getCmp(prototype.id01 + '-gridReasons').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridReasons').getStore().loadData(res.lst_RazonEmision);
                Ext.getCmp(prototype.id01 + '-gridtktAGENT').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridtktAGENT').getStore().loadData(res.lst_lstTKTS);
                //
                Ext.getCmp(prototype.id01 + '-gridReasons2').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridReasons2').getStore().loadData(res.lst_RazonADMRefe);
                Ext.getCmp(prototype.id01 + '-gridtktAGENT2').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridtktAGENT2').getStore().loadData(res.lst_lstTKTSADMRefe);
                //datos del detalle del adm o acm
                Ext.getCmp(prototype.id01 + '-txtAudited').setValue(res.lst_dataIni[0].A2548REGIS);
                Ext.getCmp(prototype.id01 + '-txtDate').setValue(res.lst_dataIni[0].A2548FREGI);
                Ext.getCmp(prototype.id01 + '-txtNMemo').setValue(res.lst_dataIni[0].A2548NMEMO);

                Ext.getCmp(prototype.id01 + '-txtTotal').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalFare').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARID, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalTax').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXD, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalPenalty').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAD, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalcharges').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAMD, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalCommi').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMID, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTotalOverCom').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMD, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtToca').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCD, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtIvacharge').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TCARD, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtNeto').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));

                var titu1 = Ext.getCmp(prototype.id01 + '-titu2');
                var cabece1 = Ext.getCmp(prototype.id01 + '-cabece1');
                var cabece2 = Ext.getCmp(prototype.id01 + '-cabece2');
                var cabece3 = Ext.getCmp(prototype.id01 + '-cabece3');
                var cabece4 = Ext.getCmp(prototype.id01 + '-cabece4');
                var cabece5 = Ext.getCmp(prototype.id01 + '-cabece5');
                if (Ext.String.trim(res.lst_dataIni[0].A2548NMERF) !== '') {
                    titu1.show();
                    cabece1.show();
                    cabece2.show();
                    cabece3.show();
                    cabece4.show();
                    cabece5.show();
                    //datos del detalle del adm o acm
                        Ext.getCmp(prototype.id01 + '-txtAudited2').setValue(res.lst_dataIniADMRefe[0].A2548REGIS);
                        Ext.getCmp(prototype.id01 + '-txtDate2').setValue(res.lst_dataIniADMRefe[0].A2548FREGI);
                        Ext.getCmp(prototype.id01 + '-txtNMemo2').setValue(res.lst_dataIniADMRefe[0].A2548NMEMO);

                        Ext.getCmp(prototype.id01 + '-txtTotal2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548NETO, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtTotalFare2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548TARID, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtTotalTax2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548TTAXD, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtTotalPenalty2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548PENAD, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtTotalcharges2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548TTAMD, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtTotalCommi2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548COMID, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtTotalOverCom2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548SCOMD, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtToca2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548TAXCD, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtIvacharge2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548TCARD, '0,000.00'));
                        Ext.getCmp(prototype.id01 + '-txtNeto2').setValue(Ext.util.Format.number(res.lst_dataIniADMRefe[0].A2548NETO, '0,000.00'));
                        
                        Ext.getCmp(prototype.id01 + '-txtTotal').setValue(Ext.util.Format.number( (res.lst_dataIni[0].A2548NETO - res.lst_dataIniADMRefe[0].A2548NETO), '0,000.00'));
                    ///
                    switch (String(res.lst_dataIniADMRefe[0].A2548TRNCU)) {
                        case 'ADM':
                            Ext.getCmp(prototype.id01 + '-titu2').setTitle('DETAIL OF DEBIT ' + rec.get('A2548NMEMO'));
                            break;
                        case 'ACM':
                            Ext.getCmp(prototype.id01 + '-titu2').setTitle('DETAIL OF CREDIT ' + rec.get('A2548NMEMO'));
                            break;
                        case 'NTD':
                            Ext.getCmp(prototype.id01 + '-titu2').setTitle('DETAIL OF DEBIT NOTE ' + rec.get('A2548NMEMO'));
                            break;
                        case 'NTC':
                            Ext.getCmp(prototype.id01 + '-titu2').setValue('DETAIL OF CREDIT NOTE ' + rec.get('A2548NMEMO'));
                            break;
                    }
                } else {
                    titu1.hide();
                    cabece1.hide();
                    cabece2.hide();
                    cabece3.hide();
                    cabece4.hide();
                    cabece5.hide();
                    Ext.getCmp(prototype.id01 + '-win').setHeight(Ext.getCmp(prototype.id01 + '-win').getHeight() - 250);
                }

                /* var vl_A3402CDTAX = '';
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
                 me.lst_CardType = res.lst_CardType;*/
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
                if (grid03.getStore().getAt(i).get('A3404ERROR').length > 250) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 250 characters');
                    bvalida = false;
                    return;
                }
            }
            if (vl_razon.length > 440) {
                Ext.Msg.alert('.: PRAXIS :.', 'The description total must not exceed 440 characters');
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
        }



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