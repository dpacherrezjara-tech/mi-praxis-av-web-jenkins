Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.DataEntryMPF060StatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMPF060StatementReconciliationsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    controllerParent: '',
    panelActual: '',
    paramsGrid: '',
    actionCode: '',
    bean: {},
    beanDetalleDE: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    searchParamsPending: {},
    beanDetails: {},
    beanScan: {},
    beanAgrupa: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        controllerParent = this.p.controllerParent;
        panelActual = this.p.panelActual;
        paramsGrid = this.p.paramsGrid;
//        this.obtainData();

    },
    afterRender: function () {
        console.log('afterRender');
        switch (this.actionCode) {
            case 'U':
                this.getData();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function () {
        console.log('obtainData');
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
                if (res.success) {
                    me.lstCard = res.lstCard;
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').setValue('');
                    if(res.userPermis.PERMM === 'Y'){
                        Ext.getCmp(prototype.id + '-btn-reverse').show();
                    }else{
                        Ext.getCmp(prototype.id + '-btn-reverse').hide();
                    }
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    mostrarData: function () {
        console.log('mostrarData');
        let tDoc = {
            'S': 'Sales',
            'D': 'Debits'
        }
        this.setValue('de-txtPRDA', this.beanResult.PAYDATE);
        this.setValue('de-txtMERCHID', this.beanResult.MERCHN);
        this.setValue('de-txtSAGENT', this.beanResult.SAGENT);
        this.setValue('de-txtTERMI', this.beanResult.TERMI);
        this.setValue('de-txtCOREP', this.beanResult.strDescripcionCOREP);
        this.setValue('de-txtCOUNTRY', this.beanResult.DESC_SCOUNTRY);
        this.setValue('de-txtNEGOC', this.beanResult.NEGOC);
        this.setValue('de-txtSOCIETYS', this.beanResult.SOCIETY);
        this.setValue('de-txtACCNUMBERL', this.beanResult.ACCNUMBER);
//        this.setValue('de-txtDATECI', this.beanResult.DATECI);
//        this.setValue('de-txtTRANCI', this.beanResult.TRANCI);
        this.setValue('de-txtVALDATEL', this.beanResult.VALDATE);
        this.setValue('de-txtSCURRENCYL', this.beanResult.SCURRENCY);
        this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.SVFOP, '0,000.00'));
        this.setValue('de-txtBSUMDATE', this.beanResult.SDATE);
        this.setValue('de-txtTDOC', tDoc[this.beanResult.TDOC]);
        this.setValue('de-txtBANDOC', this.beanResult.BANDOC);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtPAYDATE', this.beanResult.PAYDATE);
        this.setValue('de-txtSCARCODE', this.beanResult.SCARCOD);
        this.setValue('de-txtSCARDN', this.beanResult.SCARDN);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        
        this.setValue('de-txtDATEC', this.beanResult.DATEC);
        this.setValue('de-txtTRANC', this.beanResult.TRANC);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        console.log('llenarData');
        var bean = {};
        bean.SDATE = this.getValue("de-txtBSUMDATE");
        bean.SCOUNTRY = this.beanResult.SCOUNTRY
        bean.TDOC = this.beanResult.TDOC
        bean.CODEBANK = this.getValue("de-txtCODEBANK");
        bean.SCARCOD = this.getValue("de-txtSCARCODE");
        bean.SCARDN = this.getValue("de-txtSCARDN");
        bean.SAUTHOC = this.getValue("de-txtSAUTHOC");
        bean.SEQ = this.getValue("de-txtSEQ");
        bean.NEGOC = this.getValue("de-txtNEGOC");
        
        return bean;
    },
    getData: function () {
        console.log('getDataAAAA');
        console.log('meDE.bean', meDE.bean);
        meDE.beanDetalleDE.IN_SDATE = meDE.bean.data.SDATE;
        meDE.beanDetalleDE.IN_SCOUNTRY = meDE.bean.data.SCOUNTRY;
        meDE.beanDetalleDE.IN_TDOC = meDE.bean.data.TDOC;
        meDE.beanDetalleDE.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.beanDetalleDE.IN_SCARCOD = meDE.bean.data.SCARCOD;
        meDE.beanDetalleDE.IN_SCARDN = meDE.bean.data.SCARDN;
        meDE.beanDetalleDE.IN_SAUTHOC = meDE.bean.data.SAUTHOC;
        meDE.beanDetalleDE.IN_SEQ = meDE.bean.data.SEQ;
        console.log(meDE.beanDetalleDE, 'meDE.beanDetalleDE')
        var beanString = JSON.stringify(meDE.beanDetalleDE);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanMPF060',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryMPF060').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryMPF060').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data;
                
                meDE.mostrarData();
            }
        });
    },

    //</editor-fold>

    getExcel: function (records, index, sum, combination, diff) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    mostrarCombinacionValida: function (combination, diff) {
        console.log('Se encontró una combinación válida:');
        console.log('Valor deseado:', diff);
        console.log('Registros:');
        combination.forEach(function (record) {
            console.log(record.get('NETO'));
        });
    },
    desmarcarRegistros: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidCombination')) {
                record.set('isInValidCombination', false);
            }
        });
    },
    marcarClientes: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidClient')) {
                record.set('isInValidClient', true);
            }
        });
    },
    desmarcarClientes: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidClient')) {
                record.set('isInValidClient', false);
            }
        });
    },
    removeTKT: function (grid, rowIndex, colIndex) {

        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        this.calcularMontos();
        var checkbox = Ext.getCmp(prototype.id01 + '-chkMERCHANT');
        var estaMarcado = checkbox.getValue();
        if (estaMarcado) {
//            console.log('El checkbox está marcado');
            meDE.calcularDiferencias();
        } else {
//            console.log('El checkbox no está marcado');
        }
    },
    clear_keyDownHandler: function () {

        this.setValue('txtFromADATE', null);
        this.setValue('txtToADATE', null);
        this.setValue('txtFromSDATE', null);
        this.setValue('txtToSDATE', null);
        this.setValue('txtACCNUMBER', '');
        this.setValue('txtNETO', '');
        this.setValue('cmbSCARCOD', '');

    },
    selectAdateFiltro: function () {
        if (win.getValue('txtFromADATE').trim() === '') {
            this.inhabilitarFiltrosAdate();
        } else {
            this.habilitarFiltrosAdate();
        }
    },
    inhabilitarFiltrosAdate: function () {
        win.enabled('txtToADATE', false);
        win.setValue('txtToADATE', '');
    },
    habilitarFiltrosAdate: function () {
        win.enabled('txtToADATE', true);
    },
    selectSdateFiltro: function () {
        if (win.getValue('txtFromADATE').trim() === '') {
            this.inhabilitarFiltrosSdate();
        } else {
            this.habilitarFiltrosSdate();
        }
    },
    inhabilitarFiltrosSdate: function () {
        win.enabled('txtToSDATE', false);
        win.setValue('txtToSDATE', '');
    },
    habilitarFiltrosSdate: function () {
        win.enabled('txtToSDATE', true);
    },
    clear_tableNormal: function () {

        win.setValue('de-txtQty', '');
        win.setValue('de-txtSumAmount', '');
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataClear);

        this.sumAmount = 0;
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtSCOUNTRY', '');
        this.setValue('cmbSTVAL', '');
        this.setValue('txtADATE', '');
        this.setValue('txtCODEBANK', '');
        this.setValue('txtBANDOC', '');
        this.setValue('txtSCURRENCY', '');
        this.setValue('txtNETO', '');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    //
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onUpdateClick: function (btn) {
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
//                        var msjResult = this.validacionInsert(beanTemp);
                    beanTemp.option = 'U';
                    this.MaintenanceMPF060(beanTemp);

                    
                }
            }
        });
        
    },
    onCancelClick: function (btn) {
        
        this.view.close();
        
    },
    
    //<editor-fold defaultstate="collapsed" desc="executeOption">
    MaintenanceMPF060: function(beanTemp) {
//        var beanString = JSON.stringify(beanTemp);
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF060',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryMPF060').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryMPF060').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntryMPF060').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryMPF060').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    procesarRegistros: function (grilla) {
        var listaDeDatos = [];
        grilla.getStore().each(function (record) {
        console.log(record.get('TDOC'), 'recorget tdoc')  
        console.log(record.get('SCARCOD'), 'recorget tdoc')  
            let registro = {
                CODEBANK: Ext.getCmp(prototype.id + '-de-txtCODEBANK').getValue(),
                VALDATE: Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue(),
                DATECI: Ext.getCmp(prototype.id + '-de-txtDATECI').getValue(),
                TRANCI: Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue(),
                TDOC_E: Ext.getCmp(prototype.id + '-de-txtTDOC').getValue(),
                TDOC: record.get('TDOC').trim(),
                MERCHAND: Ext.getCmp(prototype.id + '-de-txtMERCHAND').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                COREPL: record.get('CORES').trim(),
                SDATE: record.get('SDATE').trim(),
                SAGENT: record.get('SAGENT').trim(),
                TERMI: record.get('TERMI').trim(),
                SCARCOD: record.get('SCARCOD').trim(),
                SCARDN: record.get('SCARDN').trim(),
                SAUTHOC: record.get('SAUTHOC').trim(),
                SCURRENCY: 'COP',
                TOTAL: record.get('TOTAL'),
                NETO: record.get('NETO'),
                RED: record.get('RED').trim(),
                SEQ: record.get('SEQ').trim(),
                NETOC: parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', ''))
            };

            listaDeDatos.push(registro);
        });

        console.log(listaDeDatos, 'listaDeDatos');
        var datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },
    validacionInsert: function (beanTemp) {
        var msjResult = '';

        if (this.getValue("de-txtdescTDOC") === '') {
            msjResult = "Document type cannot be empty.";
        }
        return msjResult;
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
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});