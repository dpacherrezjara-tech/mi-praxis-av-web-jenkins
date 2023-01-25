Ext.define('Ext.Praxis.controller.payments.InputsCatalog.DataEntryInputsCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInputsCatalogController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lst: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'InputsCatalogForm';
        prototype.url = CONTEXTPATH + '/InputsCatalog';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lst = this.p.lst;
//        console.log(this.p);
//        this.obtainData();
    },
    afterRender: function () {
//        console.log('afterRender');
        switch (this.actionCode) {
            case 'I':
                var cmbSTAT = Ext.getCmp(prototype.id + '-de-cmbSTAT');
                cmbSTAT.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", ""],
                        ["A", "A - ACTIVE"],
                        ["I", "I - INACTIVE"]
                    ]
                }));
                cmbSTAT.setValue('');

                var cmbFASE = Ext.getCmp(prototype.id + '-de-cmbFASE');
                cmbFASE.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", ""],
                        ["0", "0 - FASE 0"],
                        ["1", "1 - FASE I"],
                        ["2", "2 - FASE II"],
                        ["3", "3 - FASE III"],
                        ["4", "4 - FASE VI"]
                    ]
                }));
                cmbFASE.setValue('');

                var cmbINPTYPE = Ext.getCmp(prototype.id + '-de-cmbINPTYPE');
                cmbINPTYPE.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", ""],
                        ["D", "D - DATA"],
                        ["C", "C - CONTROL"],
                        ["M", "M - MISCELLANEOUS"]
                    ]
                }));
                cmbINPTYPE.setValue('');

                var cmbINPEXTE = Ext.getCmp(prototype.id + '-de-cmbINPEXTE');
                cmbINPEXTE.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", ""],
                        [".txt", ".TXT"],
                        [".TXT", ".TXT"],
                        [".DAT", ".DAT"],
                        [".CSV", ".CSV"],
                        [".cmp", ".CMP"]
                    ]
                }));
                cmbINPEXTE.setValue('');

                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        console.log(this.beanResult);
        this.setValue('de-txtAPLIC', this.beanResult.APLIC);
        this.setValue('de-txtSEQNUM', this.beanResult.SEQNUM);
        this.setValue('de-cmbSTAT', this.beanResult.STAT);
        this.setValue('de-txtNETDIR', this.beanResult.NETDIR);
        this.setValue('de-txtLIBNAME', this.beanResult.LIBNAME);
        this.setValue('de-txtTABLA', this.beanResult.TABLA);
        this.setValue('de-txtOUTNAME', this.beanResult.OUTNAME);
        this.setValue('de-txtQTYREG', this.beanResult.QTYREG);
        this.setValue('de-txtFECPROC', this.beanResult.FECPROC);
        this.setValue('de-cmbFASE', this.beanResult.FASE);
        this.setValue('de-txtINPNAME', this.beanResult.INPNAME);
        this.setValue('de-cmbINPEXTE', this.beanResult.INPEXTE);
        this.setValue('de-txtINPDESC', this.beanResult.INPDESC);
        this.setValue('de-cmbINPTYPE', this.beanResult.INPTYPE);
        
        if(this.beanResult.DENV.includes('1')){
            (Ext.getCmp(prototype.id + '-de-txtLun')).setValue(1);
        }
        if(this.beanResult.DENV.includes('2')){
            (Ext.getCmp(prototype.id + '-de-txtMar')).setValue(1);
        }
        if(this.beanResult.DENV.includes('3')){
            (Ext.getCmp(prototype.id + '-de-txtMie')).setValue(1);
        }
        if(this.beanResult.DENV.includes('4')){
            (Ext.getCmp(prototype.id + '-de-txtJue')).setValue(1);
        }
        if(this.beanResult.DENV.includes('5')){
            (Ext.getCmp(prototype.id + '-de-txtVie')).setValue(1);
        }
        if(this.beanResult.DENV.includes('6')){
            (Ext.getCmp(prototype.id + '-de-txtSab')).setValue(1);
        }
        if(this.beanResult.DENV.includes('7')){
            (Ext.getCmp(prototype.id + '-de-txtDom')).setValue(1);
        }

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);


    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
//        console.log('llenarData');
        
        beanTemp.APLIC = this.getValue("de-txtAPLIC");
        beanTemp.SEQNUM = this.getValue("de-txtSEQNUM");
        beanTemp.STAT = this.getValue("de-cmbSTAT");
        beanTemp.NETDIR = this.getValue("de-txtNETDIR");
        beanTemp.LIBNAME = this.getValue("de-txtLIBNAME");
        beanTemp.TABLA = this.getValue("de-txtTABLA");
        beanTemp.OUTNAME = this.getValue("de-txtOUTNAME");
        beanTemp.QTYREG = this.getValue("de-txtQTYREG");
        beanTemp.TABLA = this.getValue("de-txtTABLA");
        beanTemp.FECPROC = this.getValue("de-txtFECPROC");
        beanTemp.FASE = this.getValue("de-cmbFASE");
        beanTemp.INPNAME = this.getValue("de-txtINPNAME");
        beanTemp.INPEXTE = this.getValue("de-cmbINPEXTE");
        beanTemp.INPDESC = this.getValue("de-txtINPDESC");
        beanTemp.INPTYPE = this.getValue("de-cmbINPTYPE");
        
        var DENValues = "";
        if ($(Ext.getCmp(prototype.id + '-de-txtLun')).prop('checked')) {
            DENValues =  DENValues + "1";
        }
        if ($(Ext.getCmp(prototype.id + '-de-txtMar')).prop('checked')) {
            DENValues =  DENValues + "2";
        }
        if ($(Ext.getCmp(prototype.id + '-de-txtMie')).prop('checked')) {
            DENValues =  DENValues + "3";
        }
        if ($(Ext.getCmp(prototype.id + '-de-txtJue')).prop('checked')) {
            DENValues =  DENValues + "4";
        }
        if ($(Ext.getCmp(prototype.id + '-de-txtVie')).prop('checked')) {
            DENValues =  DENValues + "5";
        }
        if ($(Ext.getCmp(prototype.id + '-de-txtSab')).prop('checked')) {
            DENValues =  DENValues + "6";
        }
        if ($(Ext.getCmp(prototype.id + '-de-txtDom')).prop('checked')) {
            DENValues =  DENValues + "7";
        }
        console.log(DENValues);
        beanTemp.DENV = DENValues;
        
        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

    },
    getData: function () {
        var cmbSTAT = Ext.getCmp(prototype.id + '-de-cmbSTAT');
        cmbSTAT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["A", "A - ACTIVE"],
                ["I", "I - INACTIVE"]
            ]
        }));

        var cmbFASE = Ext.getCmp(prototype.id + '-de-cmbFASE');
        cmbFASE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["0", "0 - FASE 0"],
                ["1", "1 - FASE I"],
                ["2", "2 - FASE II"],
                ["3", "3 - FASE III"],
                ["4", "4 - FASE VI"]
            ]
        }));

        var cmbINPTYPE = Ext.getCmp(prototype.id + '-de-cmbINPTYPE');
        cmbINPTYPE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["D", "D - DATA"],
                ["C", "C - CONTROL"],
                ["M", "M - MISCELLANEOUS"]
            ]
        }));

        var cmbINPEXTE = Ext.getCmp(prototype.id + '-de-cmbINPEXTE');
        cmbINPEXTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                [".txt", ".TXT"],
                [".TXT", ".TXT"],
                [".DAT", ".DAT"],
                [".CSV", ".CSV"],
                [".cmp", ".CMP"]
            ]
        }));

        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
        //this.setValue('-de-cmbUNIOPE', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);

                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceA2358(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        console.log('onUpdateClick');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    //scope: this,
                    //animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};

                            var msjResult = meDE.validacionUpdate(beanTemp);
                            if (msjResult === '') {
                                meDE.llenarData(beanTemp);
                                beanTemp.option = 'U';
                                meDE.MaintenanceA2358(beanTemp);
                            } else {
                                global.Msg({msg: msjResult});
                            }
                        }
                    }
                });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.MaintenanceA2358(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA2354">
    MaintenanceA2358: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2358',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString, option: beanTemp.option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
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

    validacionInsert: function (beanTemp) {
        var msjResult = '';
//        if (this.getValue("de-txtMERCHN") === '') {
//            msjResult = "You must enter the required field.";
//        }
//        if (this.getValue("de-txtMERCHP") === '') {
//            msjResult = "You must enter the required field.";
//        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
//        if (this.getValue("de-txtMERCHP").trim() === '') {
//            msjResult = "The field Merchant Payment cannot be left empty";
//        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtAPLIC').setEditable(false);
        Ext.getCmp(prototype.id + '-de-txtINPNAME').setReadOnly(true);
    },
    Habilitarlbl: function () {
//        Ext.getCmp(prototype.id + '-lblDescripcion').show();
//        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
//        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
//        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
//            Ext.getCmp(prototype.id + '-lbldes').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes').show();
//        }
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