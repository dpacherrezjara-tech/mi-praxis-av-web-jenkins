Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.VentanaPendController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.VentanaPendController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    beanPendings: {},
    
    // </editor-fold>
    init: function(view) {
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        meDE = this;
//        this.p = this.view.params;
//        this.actionCode = this.p.action;
//        this.bean = this.p.rec;
//        this.lstCountry = this.p.lstCountry;
        this.obtainData();
    },
    afterRender: function() {
        this.getData()
//        switch (this.actionCode) {
//            case 'I':
//                Ext.getCmp(prototype.id + '-btn-save').show();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
//                
//                break;
//            case 'U':
//                this.getData();
//                this.DeshabilitarCampoClave();
//                Ext.getCmp(prototype.id + '-btn-save').hide();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
//                break;
//        }
    },
    searchQueryPend: function(){
        this.getData()
    },
    mostrarData: function() {
        this.setValue('de-txtTERMP', this.beanResult.TERMP);
        this.setValue('de-txtSAGENT', this.beanResult.SAGENT);
//        this.setValue('de-txtRSOCIAL', this.beanResult.RSOCIAL);
//        this.setValue('de-txtCIATA', this.beanResult.CIATA);
//        this.setValue('de-txtCANAL', this.beanResult.CANAL);
//        this.setValue('de-txtNameIATA', this.beanResult.strDescrip);
//        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
//        this.setValue('de-txtNameCTRY', this.beanResult.strDescripCtry);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        
    },
    obtainData: function (){
        
        this.dataObtain.CARD = 2;
        this.dataObtain.BANK = 2;
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText); 
                console.log(res, 'res')
                if (res.success) {
                    me.lstBank = res.lstBank;
                    me.lstCard = res.lstCard;
                    Ext.getCmp(prototype.id + '-cmbBank_PEND').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstBank, autoLoad: true
                    }));
                    Ext.getCmp(prototype.id + '-cmbBank_PEND').setValue('');
                    Ext.getCmp(prototype.id + '-cmbSCARCOD_PEND').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbSCARCOD_PEND').setValue('');   
                    
                 
//                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    setFormatParameter: function(){
        meDE.beanPendings = {}
        var fecha_a_validar = "";
        meDE.beanPendings.IN_ADATE = (Ext.getCmp(prototype.id + '-txtADATE_PEND').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtADATE_PEND').getValue("txtADATE_PEND"), 'Ymd');
        meDE.beanPendings.IN_SDATE = (Ext.getCmp(prototype.id + '-txtFromSDATE_PEND').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromSDATE_PEND').getValue("txtFromSDATE_PEND"), 'Ymd');
        meDE.beanPendings.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbSCARCOD_PEND').getValue();
        meDE.beanPendings.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-txtACCNUMBER_PEND').getValue();
        meDE.beanPendings.IN_strNETO = Ext.getCmp(prototype.id + '-txtNETO_PEND').getValue();
        meDE.beanPendings.IN_UNICODE = Ext.getCmp(prototype.id + '-txtUNICODE_PEND').getValue();
        meDE.beanPendings.IN_TDOC = Ext.getCmp(prototype.id + '-cmbDocType_PEND').getValue();
        meDE.beanPendings.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank_PEND').getValue();
        console.log(' meDE.beanPendings.IN_CODEBANK',  meDE.beanPendings.IN_CODEBANK)
        var beanString = JSON.stringify(meDE.beanPendings);
        searchParams = {
            beanString: beanString,
            bean: meDE.beanPendings
        };
        console.log(searchParams, 'searchParams') 
    },
    getData: function(){
        this.setFormatParameter()
        this.setGridDataPendings()
    },
    setGridDataPendings: function(){
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            
            var storeGridDataPending = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchPendings'
                }, listeners: {
                    beforeload: function (obj) {
//                        Ext.getCmp(prototype.id + '-ventanaPend').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
//                        Ext.getCmp(prototype.id + '-ventanaPend').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin_PEND');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage_PEND').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount_PEND').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total_PEND').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                            var data = obj.data.items[0].data;
//                            var value = Ext.getCmp(prototype.id + '-htDate');
//                            if (data.IN_DATE === "DATEP") {
//                                value.setText = "Deposit";
//                            } else {
//                                value.setText = "Payment";
//                            }
                        }
                        meDE.setWidthPie();
                    }
                }
            });
            global.clear();
            console.log('storeGridDataPending', storeGridDataPending)
            Ext.getCmp(prototype.id + '-gridDataPendings').bindStore(storeGridDataPending);
            Ext.getCmp(prototype.id + '-paggin_PEND').bindStore(storeGridDataPending);
        }
    },
    setWidthPieQueryPend: function () {
        
        Ext.getCmp(prototype.id + '-pie_PEND').setWidth(660);
        Ext.getCmp(prototype.id + '-pie_PEND').setVisible(true);
    },
    
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        beanTemp.TERMP = this.getValue("de-txtTERMP");
        beanTemp.SAGENT = this.getValue("de-txtSAGENT");

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        
    },
    
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function(obj, value, opts) {
        console.log(obj);
        console.log(value);
        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    exportQueryPend: function(){
       var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        } 
    },
    exportExcel: function () {
        
        this.setFormatParameter()
        global.getFile(prototype.url + '/getXLSXQueryPending?beanString=' + encodeURI(searchParams.beanString));
        this.setFormatParameter();
    },
    cleanFiltersQueryPend: function(){
        Ext.getCmp(prototype.id + '-txtADATE_PEND').setValue('');
        Ext.getCmp(prototype.id + '-txtFromSDATE_PEND').setValue('');
        Ext.getCmp(prototype.id + '-cmbSCARCOD_PEND').setValue('');
        Ext.getCmp(prototype.id + '-txtACCNUMBER_PEND').setValue('');
        Ext.getCmp(prototype.id + '-txtNETO_PEND').setValue('');
        Ext.getCmp(prototype.id + '-txtUNICODE_PEND').setValue('');
        Ext.getCmp(prototype.id + '-cmbDocType_PEND').setValue('');
    },
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceMPF016(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function(btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            this.MaintenanceMPF016(beanTemp);
                        }
                    }
                });
    },
    onDeleteClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.MaintenanceMPF016(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceMPF016: function(beanTemp) {
//        var beanString = JSON.stringify(beanTemp);
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF016',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtTERMP") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-txtTERMP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(true);
    },
    Habilitarlbl: function() {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function() {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function() {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    },
    getPaggin: function () {
        meDE.pagginActual = '-paggin_PEND';
    },
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meDE.pagginActual);
        pag.moveFirst();
    }, 
    pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meDE.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meDE.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meDE.pagginActual);
        pag.moveLast();
    },
// </editor-fold>
});