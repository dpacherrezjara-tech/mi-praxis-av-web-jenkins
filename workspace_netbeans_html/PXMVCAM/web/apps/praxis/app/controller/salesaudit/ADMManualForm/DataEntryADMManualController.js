/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMManualForm.DataEntryADMManualController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryADMManualController',
    BeanSearch: {},
    BeanDataCalculos: {},
    beanGuardar: {},
    vl_trncu: '',
    urlWin01: CONTEXTPATH + '/ADMManualForm',
    lst_CardTypeAGNT: null,
    type: '',
    lst_CardType: null,
    init: function (view) {
        var me = this;
        //me.urlWin01 = Ext.String.trim(me.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {

        //Ext.getCmp(prototype.id01 + '-win').setHeight(Ext.getCmp(prototype.id01 + '-win').getHeight() + 30);
        this.setObtenerCombo();
        this.onLoadCmbStatus();
        Ext.getCmp(prototype.id01 + '-btn-save').show();
        Ext.getCmp(prototype.id01 + '-btn-close').show();
        //this.onLoadData();
        this.setStoresGrids();
    },
    setObtenerCombo: function () {
        var cmbCountry = Ext.getCmp(prototype.id01 + '-txtCountry');
        var ComboCurrency = Ext.getCmp(prototype.id01 + '-ComboCurrency');
        var me = this;
        Ext.Ajax.request({
            url: me.urlWin01 + '/loadCombo',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                ComboCurrency.setStore(res.lstCurrency);
                cmbCountry.setStore(res.lstCountry);

            }
        });
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id01 + '-gridrazon');
        var grid02 = Ext.getCmp(prototype.id01 + '-gridtaxAGENT');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid02'
        });
        grid01.setStore(store01);
        grid02.setStore(store02);
    },
    onLoadCmbStatus: function () {

        var CmboTransaction = Ext.getCmp(prototype.id01 + '-CmboTransaction');
        var CmboType1 = Ext.getCmp(prototype.id01 + '-CmboType1');
        var CmboType2 = Ext.getCmp(prototype.id01 + '-CmboType2');
        var CmboType3 = Ext.getCmp(prototype.id01 + '-CmboType3');
        var CmboType4 = Ext.getCmp(prototype.id01 + '-CmboType4');
        var CmboType5 = Ext.getCmp(prototype.id01 + '-CmboType5');
        var CmbSource = Ext.getCmp(prototype.id01 + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.id01 + '-ComboChannel');
        var ComboArea = Ext.getCmp(prototype.id01 + '-ComboArea');
        var CmboADMAssoci = Ext.getCmp(prototype.id01 + '-CmboADMAssoci');

        CmboTransaction.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "ADM", "name": "ADM"},
                {"code": "ACM", "name": "ACM"},
                {"code": "NTC", "name": "CREDIT NOTE"},
                {"code": "NTD", "name": "DEBIT NOTE"},
                {"code": "EXCH", "name": "EXCH"},
                {"code": "RFND", "name": "RFND"},
                {"code": "SALE", "name": "SALE"}
            ]
        }));
        CmboType1.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "5", "name": "ACM BSPLINK \ MM"},
                {"code": "6", "name": "ACM NA BSPLINK \ MM"}
            ]
        }));
        CmboType2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "11", "name": "ADM BSPLINK \ MM"},
                {"code": "12", "name": "ADM NA BSPLINK \ MM"}
            ]
        }));
        CmboType3.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "13", "name": "CREDIT NOTE"}
                //{"code": "14", "name": "CREDIT INVOICE"}
            ]
        }));
        CmboType4.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "15", "name": "DEBIT NOTE"}
                //{"code": "16", "name": "DEBIT INVOICE"}
            ]
        }));
        CmboType5.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "7", "name": "ACM"},
                {"code": "8", "name": "ADM"},
                {"code": "9", "name": "ADMM"},
                {"code": "10", "name": "ACMM"},
                {"code": "NTD", "name": "DEBIT NOTE"},
                {"code": "NTC", "name": "CREDIT NOTE"}
            ]
        }));

        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"}
            ]
        }));

        CmbChannel.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "ATO", "name": "ATO"},
                {"code": "CCT", "name": "CCT"},
                {"code": "CTO", "name": "CTO"},
                {"code": "WEB", "name": "WEB"},
                {"code": "FRA", "name": "FRA"}
            ]
        }));

        ComboArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "CM", "name": "COMISIONES"},
                {"code": "CR", "name": "CREDITO Y COBRANZA"},
                {"code": "VI", "name": "VENTA INDIRECTA"},
                {"code": "DI", "name": "VENTA DIRECTA"}
            ]
        }));
        
        CmboADMAssoci.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "JU", "name": "Justified"},
                {"code": "CU", "name": "Cleared Up"},
                {"code": "CO", "name": "Condoned"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "RE", "name": "Rejected"}
            ]
        }));
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbCurrenAfterRender: function (obj) {
        obj.setValue('SELECT');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.id01 + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
            case 'MAN':
                Ext.getCmp(prototype.id01 + '-ComboChannel').setVisible(false);
                break;
        }

    },
    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {
        var CmboType1 = Ext.getCmp(prototype.id01 + '-CmboType1');
        var CmboType2 = Ext.getCmp(prototype.id01 + '-CmboType2');
        var CmboType3 = Ext.getCmp(prototype.id01 + '-CmboType3');
        var CmboType4 = Ext.getCmp(prototype.id01 + '-CmboType4');
        var CmboType5 = Ext.getCmp(prototype.id01 + '-CmboType5');
        var CmboADMAssoci = Ext.getCmp(prototype.id01 + '-CmboADMAssoci');
        switch (String(newValue)) {
            case 'ADM':
                CmboType1.show();
                CmboType2.hide();
                CmboType3.hide();
                CmboType4.hide();
                CmboType5.hide();
                CmboADMAssoci.show();
                CmboType2.setValue('');
                CmboType3.setValue('');
                CmboType4.setValue('');
                CmboType5.setValue('');
                CmboADMAssoci.setValue('');
                break;
            case 'ACM':
                 CmboADMAssoci.show();
                CmboType1.hide();
                CmboType2.show();
                CmboType3.hide();
                CmboType4.hide();
                CmboType5.hide();
                CmboType1.setValue('');
                CmboType3.setValue('');
                CmboType4.setValue('');
                CmboType5.setValue('');
                CmboADMAssoci.setValue('');
                break;
            case 'NTD':
                CmboType1.hide();
                CmboType2.hide();
                CmboType3.show();
                CmboType4.hide();
                 CmboADMAssoci.show();
                CmboType5.hide();
                CmboType1.setValue('');
                CmboType2.setValue('');
                CmboType4.setValue('');
                CmboType5.setValue('');
                CmboADMAssoci.setValue('');
                break;
            case 'NTC':
                CmboType1.hide();
                CmboType2.hide();
                CmboType3.hide();
                CmboType4.show();
                 CmboADMAssoci.show();
                CmboType5.hide();
                CmboType1.setValue('');
                CmboType2.setValue('');
                CmboType3.setValue('');
                CmboType5.setValue('');
                CmboADMAssoci.setValue('');
                break;
            case 'EXCH':
            case 'RFND':
            case 'SALE':
                CmboType1.hide();
                CmboType2.hide();
                CmboType3.hide();
                CmboType4.hide();
                CmboADMAssoci.hide();
                CmboType5.show();
                CmboType1.setValue('');
                CmboType2.setValue('');
                CmboType3.setValue('');
                CmboType4.setValue('');
                CmboADMAssoci.setValue('');
                break;
            case '':
                CmboType1.hide();
                CmboType2.hide();
                CmboType3.hide();
                CmboType4.hide();
                CmboType5.hide();
                 CmboADMAssoci.hide();
                CmboType1.setValue('');
                CmboType2.setValue('');
                CmboType3.setValue('');
                CmboType4.setValue('');
                CmboType5.setValue('');
                CmboADMAssoci.setValue('');
                break;
        }
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var CmboType;
        var CmboTransaction = Ext.getCmp(prototype.id01 + '-CmboTransaction').getValue();
        var CmboType1 = Ext.getCmp(prototype.id01 + '-CmboType1').getValue();
        var CmboType2 = Ext.getCmp(prototype.id01 + '-CmboType2').getValue();
        var CmboType3 = Ext.getCmp(prototype.id01 + '-CmboType3').getValue();
        var CmboType4 = Ext.getCmp(prototype.id01 + '-CmboType4').getValue();
        var CmboType5 = Ext.getCmp(prototype.id01 + '-CmboType5').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue();
        var txtFDate = Ext.getCmp(prototype.id01 + '-txtFDate').getRawValue();
        var ComboSource = Ext.getCmp(prototype.id01 + '-ComboSource').getValue();
        var txtCountry = Ext.getCmp(prototype.id01 + '-txtCountry').getValue();
        var txtCia = Ext.getCmp(prototype.id01 + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id01 + '-txtSeq').getValue();



        if (CmboTransaction === '') {
            Ext.MessageBox.alert('PRAXIS', 'Select Of Transaction', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id01 + '-CmboTransaction').focus();", 100);
            });
            return;
        }
        if (CmboType1 === '' && CmboType2 === '' && CmboType3 === '' && CmboType4 === '' && CmboType5 === '') {
            global.Msg({msg: 'Select Of Type'});
            return;
        }
        if (CmboTransaction === 'ADM') {
            if (CmboType1 === '') {
                Ext.MessageBox.alert('PRAXIS', 'Select Of Type', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-CmboType1').focus();", 100);
                });
                return;
            } else {
                CmboType = CmboType1;
            }

        }
        if (CmboTransaction === 'ACM') {
            if (CmboType2 === '') {
                Ext.MessageBox.alert('PRAXIS', 'Select Of Type', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-CmboType2').focus();", 100);
                });
                return;
            } else {
                CmboType = CmboType2;
            }

        }
        if (CmboTransaction === 'NTD') {
            if (CmboType3 === '') {
                Ext.MessageBox.alert('PRAXIS', 'Select Of Type', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-CmboType3').focus();", 100);
                });
                return;
            } else {
                CmboType = CmboType3;
            }

        }
        if (CmboTransaction === 'NTC') {
            if (CmboType4 === '') {
                Ext.MessageBox.alert('PRAXIS', 'Select Of Type', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-CmboType4').focus();", 100);
                });
                return;
            } else {
                CmboType = CmboType4;
            }

        }
        if (CmboTransaction === 'EXCH' || CmboTransaction === 'RFND' || CmboTransaction === 'SALE') {
            if (CmboType5 === '') {
                Ext.MessageBox.alert('PRAXIS', 'Select Of Type', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-CmboType5').focus();", 100);
                });
                return;
            } else {
                CmboType = CmboType5;
            }

        }
        if (txtFrmaSerie === '') {
            Ext.MessageBox.alert('PRAXIS', 'Enter Ticket', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id01 + '-txtFrmaSerie').focus();", 100);
            });
            return;
        }
        if (CmboType === '') {
            global.Msg({msg: 'Select Of Type'});
            return;
        }
        if (txtFDate === '') {
            if (CmboType !== '5' && CmboType !== '6' && CmboType !== '11' && CmboType !== '12') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Date', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-txtFDate').focus();", 100);
                });
                return;
            }
        } else {
            if (global.existeFecha(txtFDate) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFDate), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-txtFDate').focus();", 100);
                });
                return;
            }
        }
        if (CmboType === '5' || CmboType === '6' || CmboType === '11' || CmboType === '12') {
            if (ComboSource === '') {
                Ext.MessageBox.alert('PRAXIS', 'Select Source', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-ComboSource').focus();", 100);
                });
                return;
            }
            if (txtCountry === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Country', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-txtCountry').focus();", 100);
                });
                return;
            }

        }
        me.type = CmboType;
        if (CmboType === '5' || CmboType === '12' || CmboType === '11' || CmboType === '6' || CmboType === '13' || CmboType === '14' || CmboType === '15' || CmboType === '16') {
            Ext.getCmp(prototype.id01 + '-gridTaxesADD').hide();
            me.BeanSearch.OPCIONTYPE = CmboType;
            me.BeanSearch.CIA = "";
            me.BeanSearch.FORMA = "";
            me.BeanSearch.SERIE = "";
            me.BeanSearch.CUPON = "";
            me.BeanSearch.SEQ = "";
            me.BeanSearch.DATEFROM = "";
            me.BeanSearch.DATETO = "";
            me.BeanSearch.NUMBERADM = txtFrmaSerie;
            me.BeanSearch.CHANNEL = ComboSource;
            me.BeanSearch.TRNCU = CmboTransaction;
            me.BeanSearch.COUNTRY = txtCountry;
            Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
            Ext.Ajax.request({
                url: me.urlWin01 + '/SearchDataACMADM',
                method: 'POST',
                timeout: '300000',
                params: {
                    beanString: JSON.stringify(me.BeanSearch)
                },
                // params: me.BeanSearch,
                success: function (response, options) {
                    Ext.getCmp(prototype.id01 + '-win').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        Ext.getCmp(prototype.id01 + '-gridtaxAGENT').getStore().removeAll();
                        Ext.getCmp(prototype.id01 + '-gridtaxAGENT').getStore().loadData(res.lst_CalculosImpuestos);
                        Ext.getCmp(prototype.id01 + '-ComboSource').setValue(res.lst_dataIni[0].A2548FTE);
                        Ext.getCmp(prototype.id01 + '-ComboChannel').setValue(res.lst_dataIni[0].A2548CANAL);
                        Ext.getCmp(prototype.id01 + '-txtCountry').setValue(Ext.String.trim(res.lst_dataIni[0].A2548PAIS));
                        Ext.getCmp(prototype.id01 + '-ComboCurrency').setValue(Ext.String.trim(res.lst_dataIni[0].A2548MDA));
                        Ext.getCmp(prototype.id01 + '-txtSeq').setValue('00');
                        Ext.getCmp(prototype.id01 + '-txtCupon').setValue(Ext.String.trim(res.lst_dataIni[0].A2548CPN));
                        Ext.getCmp(prototype.id01 + '-txtADMAssoci').setValue(res.lst_dataIni[0].A2548NMEMO);
                        Ext.getCmp(prototype.id01 + '-txtIata').setValue(res.lst_dataIni[0].A2548IATA);
                        Ext.getCmp(prototype.id01 + '-txtAgencia').setValue(res.lst_dataIni[0].AGENCY);
                        Ext.getCmp(prototype.id01 + '-txtAdrres').setValue(res.lst_dataIni[0].DIRAGENCY);
                        Ext.getCmp(prototype.id01 + '-txtCTA').setValue(Ext.String.trim(res.lst_dataIni[0].A2548CTAC));
                        Ext.getCmp(prototype.id01 + '-ComboArea').setValue(Ext.String.trim(res.lst_dataIni[0].A2548AREA));
                        Ext.getCmp(prototype.id01 + '-txtCargo').setValue('');
                        Ext.getCmp(prototype.id01 + '-txtIvaCargo').setValue('');
                        Ext.getCmp(prototype.id01 + '-txtExchange').setValue('');
                        Ext.getCmp(prototype.id01 + '-txtiatabaja').setValue('');
                        Ext.getCmp(prototype.id01 + '-txtExisteDBDT').setValue('');
                        Ext.getCmp(prototype.id01 + '-txtDECMO').setValue('');
                        if (CmboType === '5' || CmboType === '6' || CmboType === '7' || CmboType === '10' || CmboType === '13' || CmboType === 'ACM' || CmboType === 'NTC') {
                            //montos para las ACMS
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARIA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARIF, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARID, '0,000.00'));


                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMIA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMIS, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMID, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOM, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMD, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCM, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCD, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtTaxAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAX, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txTaxDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXD, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtServiChargeAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAA !== 0 ? res.lst_dataIni[0].A2548PENAA : 0, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtServiChargeAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAL !== 0 ? res.lst_dataIni[0].A2548PENAL : 0, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtServiChargeDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAD !== 0 ? res.lst_dataIni[0].A2548PENAD : 0, '0,000.00'));


                            Ext.getCmp(prototype.id01 + '-txtSubTotalCharge').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAMD, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtSubTotalChargeIva').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TCARD, '0,000.00'));
                            //totales
                            Ext.getCmp(prototype.id01 + '-txtSubTotalDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTotal').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));


                        } else {
                            //montos para las AEROLINEAS ADMS
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARIF, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARIA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TARID, '0,000.00'));


                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMIS, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMIA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548COMID, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOM, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548SCOMD, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCM, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TAXCD, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtTaxAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAX, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txTaxDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAXD, '0,000.00'));


                            Ext.getCmp(prototype.id01 + '-txtServiChargeAero').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAA !== 0 ? res.lst_dataIni[0].A2548PENAL : 0, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtServiChargeAGENT').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAL !== 0 ? res.lst_dataIni[0].A2548PENAA : 0, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtServiChargeDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548PENAD !== 0 ? res.lst_dataIni[0].A2548PENAD : 0, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtSubTotalCharge').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TTAMD, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtSubTotalChargeIva').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548TCARD, '0,000.00'));
                            //totales
                            Ext.getCmp(prototype.id01 + '-txtSubTotalDIFE').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTotal').setValue(Ext.util.Format.number(res.lst_dataIni[0].A2548NETO, '0,000.00'));
                        }




                    } else {
                        global.Msg({msg: "No Data Found", icon: 0, fn: function () {
                            }});
                    }
                }
            });
        } else {
            Ext.getCmp(prototype.id01 + '-gridTaxesADD').show();
            if (CmboTransaction !== 'RFND') {
                me.BeanDataCalculos.OPCIONTYPE = '1';
                me.BeanDataCalculos.VP_CUPON = '';
            } else {
                me.BeanDataCalculos.OPCIONTYPE = '2';
                me.BeanDataCalculos.VP_CUPON = "";
            }
            //BeanSearchDataACMADM.OPCIONTYPE='1';
            me.BeanDataCalculos.VP_CIA = txtCia;
            me.BeanDataCalculos.VP_FORMA = txtFrmaSerie.substring(0, 4);
            me.BeanDataCalculos.VP_SERIE = txtFrmaSerie.substring(4, 10);
            me.BeanDataCalculos.VP_SEQ = txtSeq;
            me.BeanDataCalculos.DATEFROM = txtFDate;
            Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
            Ext.Ajax.request({
                url: me.urlWin01 + '/SearchDataCalcuImpuestos',
                method: 'POST',
                timeout: '300000',
                params: {
                    beanString: JSON.stringify(me.BeanDataCalculos)
                },
                success: function (response, options, success) {
                    Ext.getCmp(prototype.id01 + '-win').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    //console.log(res.data[0].DIREC);
                    if (res.success) {
                        Ext.getCmp(prototype.id01 + '-gridtaxAGENT').getStore().removeAll();
                        Ext.getCmp(prototype.id01 + '-gridtaxAGENT').getStore().loadData(res.data);
                        Ext.getCmp(prototype.id01 + '-ComboSource').setValue(res.data[0].FUENT);
                        Ext.getCmp(prototype.id01 + '-ComboChannel').setValue(res.data[0].SFUEN);
                        Ext.getCmp(prototype.id01 + '-txtCountry').setValue(Ext.String.trim(res.data[0].COUNTRY));
                        Ext.getCmp(prototype.id01 + '-ComboCurrency').setValue(Ext.String.trim(res.data[0].MONEDA));
                        Ext.getCmp(prototype.id01 + '-txtSeq').setValue(res.data[0].A1673SEQ);
                        //Ext.getCmp(prototype.id01 + '-txtCupon').setValue((res.data[0].A2548CPN);
                        //Ext.getCmp(prototype.id01 + '-txtADMAssoci').setValue();
                        Ext.getCmp(prototype.id01 + '-txtIata').setValue(res.data[0].IATA);
                        Ext.getCmp(prototype.id01 + '-txtAgencia').setValue(res.data[0].AGENCIA);
                        Ext.getCmp(prototype.id01 + '-txtAdrres').setValue(res.data[0].DIREC);
                        Ext.getCmp(prototype.id01 + '-txtPASSENGER').setValue(res.data[0].PASSNAME);
                        Ext.getCmp(prototype.id01 + '-txtCargo').setValue(res.data[0].CARGOADM);
                        Ext.getCmp(prototype.id01 + '-txtIvaCargo').setValue(res.data[0].IVAADM);
                        Ext.getCmp(prototype.id01 + '-txtExchange').setValue(res.data[0].A1673RATE);
                        Ext.getCmp(prototype.id01 + '-txtiatabaja').setValue(res.data[0].A1673STATUS);
                        Ext.getCmp(prototype.id01 + '-txtExisteDBDT').setValue(res.data[0].A1673Existdebit);
                        Ext.getCmp(prototype.id01 + '-txtDECMO').setValue(res.data[0].CDGT_MONEDA);
                        if (CmboType === '5' || CmboType === '6' || CmboType === '7' || CmboType === '10' || CmboType === '13' || CmboType === 'ACM' || CmboType === 'NTC') {
                            //montos para las ACMS
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue(Ext.util.Format.number(res.data[0].TARIFA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(res.data[0].TARIFA, '0,000.00'));


                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(res.data[0].COMISION, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(res.data[0].COMISION, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue(Ext.util.Format.number(res.data[0].OVERCOMISION, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(res.data[0].OVERCOMISION, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue(Ext.util.Format.number(res.data[0].TAXONCOMI, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(res.data[0].TAXONCOMI, '0,000.00'));
                            me.onSumaTaxGrid();
                            /*Ext.getCmp(prototype.id01 + '-txtSubTotalAero').setValue(Ext.util.Format.number(res.data[0]., '0,000.00'));
                             Ext.getCmp(prototype.id01 + '-txtSubTotalAGENT').setValue(Ext.util.Format.number(res.data[0]., '0,000.00'));
                             Ext.getCmp(prototype.id01 + '-txtSubTotalDIFE').setValue(Ext.util.Format.number(res.data[0]., '0,000.00'));
                             
                             
                             Ext.getCmp(prototype.id01 + '-txtSubTotalCharge').setValue(Ext.util.Format.number(res.data[0]., '0,000.00'));
                             Ext.getCmp(prototype.id01 + '-txtSubTotalChargeIva').setValue(Ext.util.Format.number(res.data[0]., '0,000.00'));
                             Ext.getCmp(prototype.id01 + '-txtTotal').setValue(Ext.util.Format.number(res.data[0]., '0,000.00'));*/
                        } else {
                            //montos para las AEROLINEAS ADMS
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue(Ext.util.Format.number(res.data[0].TARIFA, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(res.data[0].TARIFA, '0,000.00'));



                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(res.data[0].COMISION, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(res.data[0].COMISION, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue(Ext.util.Format.number(res.data[0].OVERCOMISION, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(res.data[0].OVERCOMISION, '0,000.00'));

                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(false);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(true);
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue(Ext.util.Format.number(res.data[0].TAXONCOMI, '0,000.00'));
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue('0.00');
                            Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(res.data[0].TAXONCOMI, '0,000.00'));

                            me.onSumaTaxGrid();
                        }




                    } else {
                        global.Msg({msg: "No Data Found", icon: 0, fn: function () {
                            }});
                    }
                }
            });
        }



    },

    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnTaxRFNDRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        global.Msg({
            msg: 'DELETE TAX?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                    me.onSumaTaxGrid();
                }
            }
        });

    },
    onSumaTaxGrid: function () {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id01 + '-gridtaxAGENT');
        var regs = grid01.getStore().getCount();
        var Total = 0;
        var TotalPenal = 0;
        var monto = 0;
        var montoPenal = 0;
        for (var i = 0; i < regs; i++) {
            if (grid01.getStore().getAt(i).get('A1673CDTAX') === 'MPF' || grid01.getStore().getAt(i).get('A1673CDTAX') === 'CPN' || grid01.getStore().getAt(i).get('A1673CDTAX') === 'CP' || grid01.getStore().getAt(i).get('A1673CDTAX') === 'F11' || grid01.getStore().getAt(i).get('A1673CDTAX') === 'F31' || grid01.getStore().getAt(i).get('A1673CDTAX') === 'F71' || grid01.getStore().getAt(i).get('A1673CDTAX') === 'Z3') {
                montoPenal = grid01.getStore().getAt(i).get('A1673TXMIA');
                TotalPenal += parseFloat(montoPenal);
            } else {
                monto = grid01.getStore().getAt(i).get('A1673TXMIA');
                Total += parseFloat(monto);
            }

        }
        if (me.type === '5' || me.type === '6' || me.type === '7' || me.type === '10' || me.type === '13' || me.type === 'ACM' || me.type === 'NTC') {
            Ext.getCmp(prototype.id01 + '-txtTaxAero').setValue('0.00');
            Ext.getCmp(prototype.id01 + '-txtTaxAGENT').setValue(Ext.util.Format.number(Total, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txTaxDIFE').setValue(Ext.util.Format.number(Total, '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtServiChargeAero').setValue('0.00');
            Ext.getCmp(prototype.id01 + '-txtServiChargeAGENT').setValue(Ext.util.Format.number(TotalPenal, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtServiChargeDIFE').setValue(Ext.util.Format.number(TotalPenal, '0,000.00'));
        } else {
            Ext.getCmp(prototype.id01 + '-txtTaxAero').setValue(Ext.util.Format.number(Total, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtTaxAGENT').setValue('0.00');
            Ext.getCmp(prototype.id01 + '-txTaxDIFE').setValue(Ext.util.Format.number(Total, '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtServiChargeAero').setValue(Ext.util.Format.number(TotalPenal, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtServiChargeAGENT').setValue('0.00');
            Ext.getCmp(prototype.id01 + '-txtServiChargeDIFE').setValue(Ext.util.Format.number(TotalPenal, '0,000.00'));
        }

        me.onTotalManual();
    },
    onTotalManual: function () {
        var me = this;
        var fare = 0;
        var commission = 0;
        var overCommi = 0;
        var taxonCommi = 0;
        var totacargo = 0;
        var totalivaCargo = 0;
        var Tax = Ext.getCmp(prototype.id01 + '-txTaxDIFE').getValue().replace(new RegExp(',', 'g'), '');
        var taxpena = Ext.getCmp(prototype.id01 + '-txtServiChargeDIFE').getValue().replace(new RegExp(',', 'g'), '');

        var cargo = 0;
        var ivaCargo = 0;
        if (Ext.getCmp(prototype.id01 + '-txtCargoApli').getValue()) {
            cargo = Ext.getCmp(prototype.id01 + '-txtCargo').getValue();
            ivaCargo = Ext.getCmp(prototype.id01 + '-txtIvaCargo').getValue();
        }

        if (me.type === '5' || me.type === '6' || me.type === '7' || me.type === '10' || me.type === '13' || me.type === 'ACM' || me.type === 'NTC') {
            //montos para las ACMS
            fare = Ext.getCmp(prototype.id01 + '-txtFAREAGENT').getValue().replace(new RegExp(',', 'g'), '');
            commission = Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').getValue().replace(new RegExp(',', 'g'), '');
            overCommi = Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').getValue().replace(new RegExp(',', 'g'), '');
            taxonCommi = Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').getValue().replace(new RegExp(',', 'g'), '');
            cargo = 0;
            ivaCargo = 0;
        } else {
            //montos para las AEROLINEAS ADMS
            fare = Ext.getCmp(prototype.id01 + '-txtFAREAero').getValue().replace(new RegExp(',', 'g'), '');
            commission = Ext.getCmp(prototype.id01 + '-txtCommissionAero').getValue().replace(new RegExp(',', 'g'), '');
            overCommi = Ext.getCmp(prototype.id01 + '-txtOverCommiAero').getValue().replace(new RegExp(',', 'g'), '');
            taxonCommi = Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').getValue().replace(new RegExp(',', 'g'), '');

        }
        Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(fare, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(commission, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(overCommi, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(taxonCommi, '0,000.00'));

        var subtotal = (parseFloat(fare) + parseFloat(commission) + parseFloat(overCommi) + parseFloat(taxonCommi) + parseFloat(Tax) + parseFloat(taxpena));
        totacargo = ((subtotal * parseFloat(cargo)) / 100);
        ivaCargo = ((((subtotal * parseFloat(cargo)) / 100) * parseFloat(ivaCargo)) / 100);
        var total = (subtotal + totacargo + ivaCargo);

        Ext.getCmp(prototype.id01 + '-txtSubTotalCharge').setValue(Ext.util.Format.number(totacargo, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtSubTotalChargeIva').setValue(Ext.util.Format.number(ivaCargo, '0,000.00'));
        //totales
        Ext.getCmp(prototype.id01 + '-txtSubTotalDIFE').setValue(Ext.util.Format.number(subtotal, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtTotal').setValue(Ext.util.Format.number(total, '0,000.00'));


    },
    OnAddTaxRenderer: function (rec) {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.ADMManualForm.RFNDAddTax({
        });
        win.show();
    },
    OnRazonRemove: function (grid, rowIndex, colIndex) {
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
    },
    onAddRazonClick: function () {
        var me = this;
        if (Ext.getCmp(prototype.id01 + '-txtCountry').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', 'Enter Country', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id01 + '-txtCountry').focus();", 100);
            });
            return;
        }

        var win = new Ext.Praxis.view.salesaudit.ADMManualForm.FormRazonesADManual({
            params: {
                vl_pais: Ext.getCmp(prototype.id01 + '-txtCountry').getValue()
            }
        });
        win.show();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchkey: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    onSearchkeyCargos: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onSumaTaxGrid();
        }
    },
    onChkCargoApli: function () {
         this.onSumaTaxGrid();
    },
    onCmbTypeStatusChange: function () {
        var me = this;
        var CmboType = '';
        var CmboTypes = '';
        if (me.type === 'DataEntryADMManualController') {
            me.type = '';
        }
        var CmboTransaction = Ext.getCmp(prototype.id01 + '-CmboTransaction').getValue();
        var CmboType1 = Ext.getCmp(prototype.id01 + '-CmboType1').getValue();
        var CmboType2 = Ext.getCmp(prototype.id01 + '-CmboType2').getValue();
        var CmboType3 = Ext.getCmp(prototype.id01 + '-CmboType3').getValue();
        var CmboType4 = Ext.getCmp(prototype.id01 + '-CmboType4').getValue();
        var CmboType5 = Ext.getCmp(prototype.id01 + '-CmboType5').getValue();        
        ////
        if (me.type !== '') {
            if (me.type === '5' || me.type === '6' || me.type === '7' || me.type === '10' || me.type === '13' || me.type === 'ACM' || me.type === 'NTC') {
                CmboTypes='ACM';
            }else{
                 CmboTypes='ADM';
            }
        }

        if (CmboTransaction === 'ADM') {
            if (CmboType1 !== '') {
                CmboType = 'ACM';
            }
        }
        if (CmboTransaction === 'ACM') {
            if (CmboType2 !== '') {
                CmboType = 'ADM';
            }

        }
        if (CmboTransaction === 'NTD') {
            if (CmboType3 !== '') {
                CmboType = 'ACM';
            }            

        }
        if (CmboTransaction === 'NTC') {
            if (CmboType4 !== '') {
                CmboType = 'ADM';
            }

        }
        if (CmboTransaction === 'EXCH' || CmboTransaction === 'RFND' || CmboTransaction === 'SALE') {
            if (CmboType5 !== '') {
                if(CmboType5==='7'){
                    CmboType='ACM';
                }
                if(CmboType5==='8'){
                    CmboType='ADM';
                }
                if(CmboType5==='9'){
                    CmboType='ADM';
                }
                if(CmboType5==='10'){
                    CmboType='ACM';
                }
                if(CmboType5==='NTD'){
                    CmboType='ADM';
                }
                if(CmboType5==='NTC'){
                    CmboType='ACM';
                }
            }

        }
        me.type = CmboType;
        
        var txtFAREAero = Ext.getCmp(prototype.id01 + '-txtFAREAero').getValue().replace(new RegExp(',', 'g'), '');
        var txtFAREAGENT = Ext.getCmp(prototype.id01 + '-txtFAREAGENT').getValue().replace(new RegExp(',', 'g'), '');
        var txtFAREDIFE = Ext.getCmp(prototype.id01 + '-txtFAREDIFE').getValue().replace(new RegExp(',', 'g'), '');
        ///
        var txtCommissionAero = Ext.getCmp(prototype.id01 + '-txtCommissionAero').getValue().replace(new RegExp(',', 'g'), '');
        var txtCommissionAGENT = Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').getValue().replace(new RegExp(',', 'g'), '');
        var txtCommissionDIFE = Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').getValue().replace(new RegExp(',', 'g'), '');
        ///
        var txtOverCommiAero = Ext.getCmp(prototype.id01 + '-txtOverCommiAero').getValue().replace(new RegExp(',', 'g'), '');
        var txtOverCommiAGENT = Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').getValue().replace(new RegExp(',', 'g'), '');
        var txtOverCommiDIFE = Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').getValue().replace(new RegExp(',', 'g'), '');
        //
        var txtTaxonCommiAero = Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').getValue().replace(new RegExp(',', 'g'), '');
        var txtTaxonCommiAGENT = Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').getValue().replace(new RegExp(',', 'g'), '');
        var txtTaxonCommiDIFE = Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').getValue().replace(new RegExp(',', 'g'), '');
        //
        if (CmboTypes !== '') {
            if (CmboType !== CmboTypes || CmboType !== CmboTypes || CmboType !== CmboTypes || CmboType !== CmboTypes || CmboType !== CmboTypes || CmboType !== CmboTypes || CmboType !== CmboTypes) {
                if (CmboType === 'ACM' ) {
                    //montos para las ACMS
                    Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue(Ext.util.Format.number(txtFAREAero, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(txtFAREDIFE, '0,000.00'));


                    Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(txtCommissionAero, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(txtCommissionDIFE, '0,000.00'));

                    Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue(Ext.util.Format.number(txtOverCommiAero, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(txtOverCommiDIFE, '0,000.00'));

                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue(Ext.util.Format.number(txtTaxonCommiAero, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(txtTaxonCommiDIFE, '0,000.00'));
                } else {
                    //montos para las AEROLINEAS ADMS
                    Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue(Ext.util.Format.number(txtFAREAGENT, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(txtFAREDIFE, '0,000.00'));



                    Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(txtCommissionAGENT, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(txtCommissionDIFE, '0,000.00'));

                    Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue(Ext.util.Format.number(txtOverCommiAGENT, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(txtOverCommiDIFE, '0,000.00'));

                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(false);
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(true);
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue(Ext.util.Format.number(txtTaxonCommiAGENT, '0,000.00'));
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue('0.00');
                    Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(txtTaxonCommiDIFE, '0,000.00'));
                }

            }
        } else {
            if (CmboType === 'ACM') {
                //montos para las ACMS
                Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));


                Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));

                Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));

                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));

            } else {
                //montos para las AEROLINEAS ADMS
                Ext.getCmp(prototype.id01 + '-txtFAREAero').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtFAREAero').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtFAREAGENT').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtFAREDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));



                Ext.getCmp(prototype.id01 + '-txtCommissionAero').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));

                Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtOverCommiAero').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));

                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').setValue(Ext.util.Format.number(0, '0,000.00'));
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').setValue('0.00');
                Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').setValue(Ext.util.Format.number(0, '0,000.00'));

            }
        }
        me.onSumaTaxGrid();



    },

    validaRequiredFields: function () {
        var bvalida = true;
        var vl_razon = '';
        var vl_razon2 = '';
        var CmboTransaction = Ext.getCmp(prototype.id01 + '-CmboTransaction').getValue();
        var CmboType1 = Ext.getCmp(prototype.id01 + '-CmboType1').getValue();
        var CmboType2 = Ext.getCmp(prototype.id01 + '-CmboType2').getValue();
        var CmboType3 = Ext.getCmp(prototype.id01 + '-CmboType3').getValue();
        var CmboType4 = Ext.getCmp(prototype.id01 + '-CmboType4').getValue();
        var CmboType5 = Ext.getCmp(prototype.id01 + '-CmboType5').getValue();
        var ComboSource = Ext.getCmp(prototype.id01 + '-ComboSource').getValue();
        var ComboChannel = Ext.getCmp(prototype.id01 + '-ComboChannel').getValue();
        var txtCountry = Ext.getCmp(prototype.id01 + '-txtCountry').getValue();
        var ComboCurrency = Ext.getCmp(prototype.id01 + '-ComboCurrency').getValue();
        var txtCia = Ext.getCmp(prototype.id01 + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue();
        var txtFDate = Ext.getCmp(prototype.id01 + '-txtFDate').getValue();
        var txtIata = Ext.getCmp(prototype.id01 + '-txtIata').getValue();
        var txtCTA = Ext.getCmp(prototype.id01 + '-txtCTA').getValue();
        var ComboArea = Ext.getCmp(prototype.id01 + '-ComboArea').getValue();
        var ComboSource = Ext.getCmp(prototype.id01 + '-ComboSource').getValue();
        var txtObservation = Ext.getCmp(prototype.id01 + '-txtObservation').getValue();
        var CmboADMAssoci = Ext.getCmp(prototype.id01 + '-CmboADMAssoci').getValue();

        var grid03 = Ext.getCmp(prototype.id01 + '-gridrazon');
        var regs = grid03.getStore().getCount();

        if (CmboTransaction === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Transaction');
            bvalida = false;
        }
        if (CmboTransaction === 'ADM' || CmboTransaction === 'ACM' || CmboTransaction === 'NTC' ||  CmboTransaction === 'NTD') {
            if(CmboADMAssoci===''){
                Ext.Msg.alert('.: PRAXIS :.', 'Select Status ADM Associated');
                bvalida = false;
            }            
        }
        if (CmboType1 === '' && CmboType2 === '' && CmboType3 === '' && CmboType4 === '' && CmboType5 === '' && CmboType5 === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Type');
            bvalida = false;
        }
        if (ComboSource === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Source');
            bvalida = false;
        }
        if (ComboSource === 'ASR') {
            if (ComboChannel === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Channel');
                bvalida = false;
            }
        }
        if (txtCountry === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Country');
            bvalida = false;
        }
        if (ComboCurrency === 'SELECT' && ComboCurrency === '***') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Currency');
            bvalida = false;
        }
        if (txtCia === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Cia');
            bvalida = false;
        }
        if (txtFrmaSerie === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Ticket');
            bvalida = false;
        }
        if (txtFDate === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Issue Date');
            bvalida = false;
        }
        if (txtIata === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter txtIata');
            bvalida = false;
        }
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter issue reason');
            bvalida = false;
        }
        if (regs !== 0) {
            for (var i = 0; i < regs; i++) {
                vl_razon = vl_razon + grid03.getStore().getAt(i).get('A2560ERROR');
                if (grid03.getStore().getAt(i).get('A2560ERROR').length > 135) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 250 characters ' + grid03.getStore().getAt(i).get('A2560ERROR'));
                    bvalida = false;
                    return;
                }
            }
        }
        if (txtCTA !== '') {
            if (txtCTA.length !== 29) {
                Ext.Msg.alert('.: PRAXIS :.', 'La CTA debe tener 29 caracteres');
                bvalida = false;
            }

        }
        if (ComboArea === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Area');
            bvalida = false;
        }
        if (ComboCurrency.length !== 3) {
            Ext.Msg.alert('.: PRAXIS :.', 'La moneda debe tener 3 caracteres');
            bvalida = false;
        }
        if (ComboSource === 'BSP' || ComboSource === 'ARC') {
            if (ComboArea === 'DI') {
                Ext.Msg.alert('.: PRAXIS :.', 'Incorrect area for this source');
                bvalida = false;
            }
        }
        if (txtObservation.length > 300) {
            Ext.Msg.alert('.: PRAXIS :.', 'he description must not exceed 300 characters ');
            bvalida = false;
            return;
        }




        return bvalida;
    },
    replaceAll: function (value) {
        return value.replace(new RegExp(',', 'g'), '');
        //replace(new RegExp(',', 'g'), '');
    },
    onSaveClick: function (obj) {
        var vl_mensaje = 'Are you sure Data ?';
        var me = this;
        if (me.validaRequiredFields()) {
            if (Ext.getCmp(prototype.id01 + '-txtExisteDBDT').getValue().length > 0) {
                vl_mensaje = 'The ticket has debit / credit, do you want to continue?';
            }
            global.Msg({
                msg: vl_mensaje,
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {

                        var CmboType = '';
                        var CmboTRNCU = '';
                        var VL_TVTA = '';
                        var VL_TRNCO = '';
                        var CmboTransaction = Ext.getCmp(prototype.id01 + '-CmboTransaction').getValue();
                        var CmboType1 = Ext.getCmp(prototype.id01 + '-CmboType1').getValue();
                        var CmboType2 = Ext.getCmp(prototype.id01 + '-CmboType2').getValue();
                        var CmboType3 = Ext.getCmp(prototype.id01 + '-CmboType3').getValue();
                        var CmboType4 = Ext.getCmp(prototype.id01 + '-CmboType4').getValue();
                        var CmboType5 = Ext.getCmp(prototype.id01 + '-CmboType5').getValue();
                        if (CmboTransaction === 'ADM') {
                            CmboType = CmboType1;
                        }
                        if (CmboTransaction === 'ACM') {
                            CmboType = CmboType2;
                        }
                        if (CmboTransaction === 'NTD') {
                            CmboType = CmboType3;
                        }
                        if (CmboTransaction === 'NTC') {
                            CmboType = CmboType4;
                        }
                        if (CmboTransaction === 'EXCH' || CmboTransaction === 'RFND' || CmboTransaction === 'SALE') {
                            CmboType = CmboType5;
                        }

                        if (CmboType === '5') {
                            CmboTRNCU = 'ACMB';
                        }
                        if (CmboType === '6') {
                            CmboTRNCU = 'ACMA';
                        }
                        if (CmboType === '11') {
                            CmboTRNCU = 'ADMB';
                        }
                        if (CmboType === '12') {
                            CmboTRNCU = 'ADMA';
                        }
                        if (CmboType === '13') {
                            CmboTRNCU = 'NTC';
                        }
                        if (CmboType === '15') {
                            CmboTRNCU = 'NTD';
                        }
                        if (CmboType === '7') {
                            CmboTRNCU = 'ACM';
                        }
                        if (CmboType === '8') {
                            CmboTRNCU = 'ADM';
                        }
                        if (CmboType === '9') {
                            CmboTRNCU = 'ADMM';
                        }
                        if (CmboType === '10') {
                            CmboTRNCU = 'ACMM';
                        }
                        if (CmboType === 'NTD') {
                            CmboTRNCU = 'NTD';
                        }
                        if (CmboType === 'NTC') {
                            CmboTRNCU = 'NTC';
                        }

                        if (CmboTransaction === 'EXCH' || CmboTransaction === 'RFND' || CmboTransaction === 'SALE') {
                            VL_TRNCO = CmboTransaction;
                        } else {
                            VL_TRNCO = 'SALE';
                        }
                        var ComboSource = Ext.getCmp(prototype.id01 + '-ComboSource').getValue();
                        var ComboChannel = Ext.getCmp(prototype.id01 + '-ComboChannel').getValue();
                        var txtCountry = Ext.getCmp(prototype.id01 + '-txtCountry').getValue();
                        var ComboCurrency = Ext.getCmp(prototype.id01 + '-ComboCurrency').getValue();
                        var ComboArea = Ext.getCmp(prototype.id01 + '-ComboArea').getValue();
                        var txtFrmaSerie = Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue();
                        var txtSeq = Ext.getCmp(prototype.id01 + '-txtSeq').getValue();
                        var txtCupon = Ext.getCmp(prototype.id01 + '-txtCupon').getValue();
                        var txtFDate = Ext.getCmp(prototype.id01 + '-txtFDate').getRawValue();
                        var txtADMAssoci = Ext.getCmp(prototype.id01 + '-txtADMAssoci').getValue();
                        var txtIata = Ext.getCmp(prototype.id01 + '-txtIata').getValue();
                        var txtCTA = Ext.getCmp(prototype.id01 + '-txtCTA').getValue();
                        var txtExchange = Ext.getCmp(prototype.id01 + '-txtExchange').getValue();
                        var txtObservation = Ext.getCmp(prototype.id01 + '-txtObservation').getValue();
                        var CmboADMAssoci = Ext.getCmp(prototype.id01 + '-CmboADMAssoci').getValue();

                        //FARRE
                        var txtFAREAero = Ext.getCmp(prototype.id01 + '-txtFAREAero').getValue().replace(new RegExp(',', 'g'), '');
                        var txtFAREAGENT = Ext.getCmp(prototype.id01 + '-txtFAREAGENT').getValue().replace(new RegExp(',', 'g'), '');
                        var txtFAREDIFE = Ext.getCmp(prototype.id01 + '-txtFAREDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //TAXES
                        var txtTaxAero = Ext.getCmp(prototype.id01 + '-txtTaxAero').getValue().replace(new RegExp(',', 'g'), '');
                        var txtTaxAGENT = Ext.getCmp(prototype.id01 + '-txtTaxAGENT').getValue().replace(new RegExp(',', 'g'), '');
                        var txTaxDIFE = Ext.getCmp(prototype.id01 + '-txTaxDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //PENALIDAD
                        var txtServiChargeAero = Ext.getCmp(prototype.id01 + '-txtServiChargeAero').getValue().replace(new RegExp(',', 'g'), '');
                        var txtServiChargeAGENT = Ext.getCmp(prototype.id01 + '-txtServiChargeAGENT').getValue().replace(new RegExp(',', 'g'), '');
                        var txtServiChargeDIFE = Ext.getCmp(prototype.id01 + '-txtServiChargeDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //Commission
                        var txtCommissionAero = Ext.getCmp(prototype.id01 + '-txtCommissionAero').getValue().replace(new RegExp(',', 'g'), '');
                        var txtCommissionAGENT = Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').getValue().replace(new RegExp(',', 'g'), '');
                        var txtCommissionDIFE = Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //Over Commission
                        var txtOverCommiAero = Ext.getCmp(prototype.id01 + '-txtOverCommiAero').getValue().replace(new RegExp(',', 'g'), '');
                        var txtOverCommiAGENT = Ext.getCmp(prototype.id01 + '-txtOverCommiAGENT').getValue().replace(new RegExp(',', 'g'), '');
                        var txtOverCommiDIFE = Ext.getCmp(prototype.id01 + '-txtOverCommiDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //Tax on Commission
                        var txtTaxonCommiAero = Ext.getCmp(prototype.id01 + '-txtTaxonCommiAero').getValue().replace(new RegExp(',', 'g'), '');
                        var txtTaxonCommiAGENT = Ext.getCmp(prototype.id01 + '-txtTaxonCommiAGENT').getValue().replace(new RegExp(',', 'g'), '');
                        var txtTaxonCommiDIFE = Ext.getCmp(prototype.id01 + '-txtTaxonCommiDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //txtSubTotalDIFE
                        var txtSubTotalDIFE = Ext.getCmp(prototype.id01 + '-txtSubTotalDIFE').getValue().replace(new RegExp(',', 'g'), '');
                        //txtSubTotalCharge
                        var txtSubTotalCharge = Ext.getCmp(prototype.id01 + '-txtSubTotalCharge').getValue().replace(new RegExp(',', 'g'), '');
                        //txtSubTotalChargeIva
                        var txtSubTotalChargeIva = Ext.getCmp(prototype.id01 + '-txtSubTotalChargeIva').getValue().replace(new RegExp(',', 'g'), '');
                        var txtTotal = Ext.getCmp(prototype.id01 + '-txtTotal').getValue().replace(new RegExp(',', 'g'), '');

                        var lstRazones = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.id01 + '-gridrazon').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.id01 + '-gridrazon').getStore().data.items[i].data;
                            lstRazones.push(bean);
                        }
                        var lstTaxes = new Array();
                        //if (CmboTransaction !== 'ADM' && CmboTransaction !== 'ACM' && CmboTransaction !== 'NTC' && CmboTransaction !== 'NTD') {
                        var gridtax = Ext.getCmp(prototype.id01 + '-gridtaxAGENT');
                        gridtax.store.data.each(function (rec) {
                            lstTaxes.push({"A1673MONED": rec.data.A1673MONED, "A1673CDTAX": rec.data.A1673CDTAX, "A1673TXMIA": rec.data.A1673TXMIA,"A1673CDATO": rec.data.A1673CDATO});
                        });
                        //}
                        if (txtCountry === 'MX') {
                            VL_TVTA = 'D';
                        } else {
                            VL_TVTA = 'I';
                        }

                        me.beanGuardar.A2548TRNCU = CmboTRNCU;
                        me.beanGuardar.A2548TRNCO = VL_TRNCO;
                        me.beanGuardar.A2548FTE = ComboSource;
                        me.beanGuardar.A2548CANAL = ComboChannel;
                        me.beanGuardar.A2548PAIS = txtCountry;
                        me.beanGuardar.A2548MDA = ComboCurrency;
                        me.beanGuardar.A2548AREA = ComboArea;
                        me.beanGuardar.A2548TIKET = txtFrmaSerie;
                        me.beanGuardar.A2548SEQ = txtSeq;
                        me.beanGuardar.A2548CPN = txtCupon;
                        me.beanGuardar.A2548FVTA = txtFDate;
                        me.beanGuardar.A2548IATA = txtIata;
                        me.beanGuardar.A2548NMEMO = txtADMAssoci;
                        me.beanGuardar.A2548CTAC = txtCTA;
                        me.beanGuardar.A2548TVTA = VL_TVTA;
                        me.beanGuardar.A2548OBSER = txtObservation;
                        me.beanGuardar.A2548ASOCI = CmboADMAssoci;


                        me.beanGuardar.A2548TARIF = txtFAREAero === '' ? 0 : txtFAREAero;
                        
                        me.beanGuardar.A2548TARIA = txtFAREAGENT === '' ? 0 : txtFAREAGENT;
                        me.beanGuardar.A2548TARID = txtFAREDIFE === '' ? 0 : txtFAREDIFE;

                        me.beanGuardar.A2548TTAX = txtTaxAero === '' ? 0 : txtTaxAero;
                        me.beanGuardar.A2548TTAXA = txtTaxAGENT === '' ? 0 : txtTaxAGENT;
                        me.beanGuardar.A2548TTAXD = txTaxDIFE === '' ? 0 : txTaxDIFE;

                        me.beanGuardar.A2548PENAL = txtServiChargeAero === '' ? 0 : txtServiChargeAero;
                        me.beanGuardar.A2548PENAA = txtServiChargeAGENT === '' ? 0 : txtServiChargeAGENT;
                        me.beanGuardar.A2548PENAD = txtServiChargeDIFE === '' ? 0 : txtServiChargeDIFE;

                        me.beanGuardar.A2548COMIS = txtCommissionAero === '' ? 0 : txtCommissionAero;
                        me.beanGuardar.A2548COMIA = txtCommissionAGENT === '' ? 0 : txtCommissionAGENT;
                        me.beanGuardar.A2548COMID = txtCommissionDIFE === '' ? 0 : txtCommissionDIFE;

                        me.beanGuardar.A2548SCOM = txtOverCommiAero === '' ? 0 : txtOverCommiAero;
                        me.beanGuardar.A2548SCOMA = txtOverCommiAGENT === '' ? 0 : txtOverCommiAGENT;
                        me.beanGuardar.A2548SCOMD = txtOverCommiDIFE === '' ? 0 : txtOverCommiDIFE;

                        me.beanGuardar.A2548TAXCM = txtTaxonCommiAero === '' ? 0 : txtTaxonCommiAero;
                        me.beanGuardar.A2548TAXCA = txtTaxonCommiAGENT === '' ? 0 : txtTaxonCommiAGENT;
                        me.beanGuardar.A2548TAXCD = txtTaxonCommiDIFE === '' ? 0 : txtTaxonCommiDIFE;

                        me.beanGuardar.A2548TOTAL = txtSubTotalDIFE === '' ? 0 : txtSubTotalDIFE;
                        me.beanGuardar.A2548TCARD = txtSubTotalCharge === '' ? 0 : txtSubTotalCharge;
                        me.beanGuardar.A2548TTAMD = txtSubTotalChargeIva === '' ? 0 : txtSubTotalChargeIva;
                        me.beanGuardar.A2548NETO = txtTotal === '' ? 0 : txtTotal;
                        
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaManualADM/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanGuardar),
                                beanlstRazones: JSON.stringify(lstRazones),
                                beanlstTaxes: JSON.stringify(lstTaxes)
                            },
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
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
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

    onCloseClick: function (obj) {
        Ext.getCmp(prototype.id01 + '-win').close();
    },
    imgSearch_clickHandler_Duplicates: function () {
        var me = this;
        var Type = '';
        var CmboTransaction = Ext.getCmp(prototype.id01 + '-CmboTransaction').getValue();
        if (CmboTransaction === 'ADM') {
            Type = '1';
        }
        if (CmboTransaction === 'ACM') {
            Type = '1';
        }
        if (CmboTransaction === 'NTD') {
            Type = '1';
        }
        if (CmboTransaction === 'NTC') {
            Type = '1';
        }

        if (Ext.getCmp(prototype.id01 + '-txtFrmaSerie').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', 'Enter TICKET', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id01 + '-txtFrmaSerie').focus();", 100);
            });
            return;
        }
        if (Type !== '') {
            if (Ext.getCmp(prototype.id01 + '-txtCountry').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Country', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id01 + '-txtCountry').focus();", 100);
                });
                return;
            }
        }

        var win = new Ext.Praxis.view.salesaudit.ADMManualForm.FormListTKTADManual({
            params: {
                CmboType: Type

            }
        });
        win.show();
    }

});

