/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntrySalesReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    strBankCode: '',
    meDE: '',
    paramsDE: {},
    /**
     * Constructor
     */
    init: function(view) {
        meDE = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    // <editor-fold defaultstate="collapsed" desc="Configuracion y Validaciones">

    afterRender: function() {
        var p = this.view.params;
        this.setStoreData();
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    keyupContry: function(obj, e, eOpts) {
        if (obj.value.length !== 2) {
            Ext.getCmp(prototype.id + '-de-txtIATA').setReadOnly(true);
        } else {
            var A006KEY = obj.value.toUpperCase();
            this.verificarA006(A006KEY, 'country');
        }
    },
    keyupCurrency: function(obj, e, eOpts) {
        if (obj.value.length === 3) {
            var A006KEY = obj.value.toUpperCase();
            this.verificarA006(A006KEY, 'currency');
        }
    },
    keyupIata: function(obj, e, eOpts) {
        if (obj.value.length === 8) {
            var A003KEY = obj.value.toUpperCase();
            var A003PSALF = Ext.getCmp(prototype.id + '-de-txtCountry').getValue();
            this.verificarA003(A003KEY, A003PSALF);
        }
    },
    keyupBank: function(obj, e, eOpts) {
        if (obj.value.length === 3) {
            var A1007CTATO = obj.value.toUpperCase();
            var source = Ext.getCmp(prototype.id + '-de-txtSource').getValue();
            switch (source) {
                case 'ARC':
                    if (A1007CTATO === 'ELW (05)' || A1007CTATO === 'IAR (07)' || A1007CTATO === 'IAP (04)') {
                        //Segun la logica del flex, nunca entrara aqui porque el valor se examina cuando el numero de caracteres es 3   
                    } else {
                        Ext.getCmp(prototype.id + '-de-txtBank').setFieldStyle('background:yellow');
                    }
                    break;
                case 'MAN':
                    if (A1007CTATO === 'ELW (05)' || A1007CTATO === 'IAR (07)' || A1007CTATO === 'IAP (04)') {
                    } else {
                        this.verificarA1007(A1007CTATO);
                    }
                    break;
                default:
                    this.verificarA1007(A1007CTATO);
            }
        }
    },
    verificarA003: function(A003KEY, A003PSALF) {
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadA003',
            method: 'POST',
            timeout: 60000000,
            params: {
                A003KEY: A003KEY,
                A003PSALF: A003PSALF
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lst = res.lst;
                if (lst.length > 0) {
                    var item = lst[0];
                    Ext.getCmp(prototype.id + '-de-txtChannel').setValue(item.A003CANAL);
                    Ext.getCmp(prototype.id + '-de-txtCountry').setValue(item.A003PSALF);
                    Ext.getCmp(prototype.id + '-de-txtSabre').setValue(item.A003SABCTY);
                    Ext.getCmp(prototype.id + '-de-txtBank').setValue(item.A003CIUDAD);
                } else {
                    Ext.getCmp(prototype.id + '-de-txtChannel').setValue('');
                    Ext.getCmp(prototype.id + '-de-txtCountry').setValue('');
                    Ext.getCmp(prototype.id + '-de-txtSabre').setValue('');
                    Ext.getCmp(prototype.id + '-de-txtBank').setValue('');
                }


                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
            }
        });
    },
    verificarA006: function(A006KEY, option) {
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadA006',
            method: 'POST',
            timeout: 60000000,
            params: {
                A006KEY: A006KEY
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.objA006.A006RES === 0) {
                    switch (option) {
                        case 'country':
                            Ext.getCmp(prototype.id + '-de-txtCountry').setValue('');
                            Ext.getCmp(prototype.id + '-de-txtIATA').setValue('');
                            Ext.getCmp(prototype.id + '-de-txtIATA').setReadOnly(true);
                            Ext.getCmp(prototype.id + '-de-txtCountry').setFieldStyle('background:yellow');
                            break;
                        case 'currency':
                            Ext.getCmp(prototype.id + '-de-txtCurrency').setValue('');
                            Ext.getCmp(prototype.id + '-de-txtCurrency').setFieldStyle('background:yellow');
                            break;
                    }
                } else {
                    switch (option) {
                        case 'country':
                            Ext.getCmp(prototype.id + '-de-txtIATA').setReadOnly(false);
                            Ext.getCmp(prototype.id + '-de-txtCountry').setFieldStyle('background:white');
                            break;
                        case 'currency':
                            Ext.getCmp(prototype.id + '-de-txtCurrency').setFieldStyle('background:white');
                            break;
                    }
                }
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
            }
        });
    },
    verificarA1007: function(A1007CTATO) {
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadA1007',
            method: 'POST',
            timeout: 60000000,
            params: {
                A1007CTATO: A1007CTATO
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.objA1007.A1007RES === 0) {
                    Ext.getCmp(prototype.id + '-de-txtBank').setValue('');
                    Ext.getCmp(prototype.id + '-de-txtBank').setFieldStyle('background:yellow');
                } else {
                    Ext.getCmp(prototype.id + '-de-txtBank').setFieldStyle('background:white');
                }
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
            }
        });
    },
    setStoreData: function() {
        var cmbSource = Ext.getCmp(prototype.id + '-de-txtSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"],
                ["MAN", "MAN"]
            ]
        }));
        cmbSource.setValue("MAN");
        var cmbSalesType = Ext.getCmp(prototype.id + '-de-txtSalesType');
        cmbSalesType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["D", "DOMESTIC"],
                ["I", "INTERNATIONALt"]
            ]
        }));
        cmbSalesType.setValue("D");
        var cmbProStatus = Ext.getCmp(prototype.id + '-de-txtProStatus');
        cmbProStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "OPEN"],
                ["1", "CLOSE"]
            ]
        }));
        cmbProStatus.setValue("0");
    },
    changeCmbSource: function(obj, val) {

        switch (val) {
            case 'ARC':
                Ext.getCmp(prototype.id + '-de-txtCountry').setValue('US');
                Ext.getCmp(prototype.id + '-de-txtCurrency').setValue('USD');
                break;
            case 'BSP':
            case 'ASR':
            case 'MAN':
                Ext.getCmp(prototype.id + '-de-txtCountry').setValue('');
                Ext.getCmp(prototype.id + '-de-txtCurrency').setValue('');
                break;
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Pintado del Data Entry">

    getDataInputs: function() {

        var p = this.view.params;
        var data = p.data;
        Ext.getCmp(prototype.id + '-de-txtGroup').setValue(data.A1530GRUPO);
        Ext.getCmp(prototype.id + '-de-txtSource').setValue(data.A1530FUENT);
        Ext.getCmp(prototype.id + '-de-txtChannel').setValue(data.A1530SFUEN);
        Ext.getCmp(prototype.id + '-de-txtCountry').setValue(data.A1530PSVTA);
        Ext.getCmp(prototype.id + '-de-txtIATA').setValue(data.A1530AGENT);
        Ext.getCmp(prototype.id + '-de-txtSabre').setValue(data.A1530CSABR);
        Ext.getCmp(prototype.id + '-de-txtEndFrom').setValue(data.A1530FDESD.substr(0, 4) + '/' + data.A1530FDESD.substr(4, 2) + '/' + data.A1530FDESD.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-txtEndTo').setValue(data.A1530FHAST.substr(0, 4) + '/' + data.A1530FHAST.substr(4, 2) + '/' + data.A1530FHAST.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-txtProcessing').setValue(data.A1530FPROC.substr(0, 4) + '/' + data.A1530FPROC.substr(4, 2) + '/' + data.A1530FPROC.substr(6, 2));
        var A006KEY = data.A1530PSVTA;
        var A003KEY = data.A1530AGENT;
        var A003PSALF = data.A1530PSVTA;
        if (A006KEY.length === 2) {
            this.verificarA006(A006KEY, 'country');
        }

        if (A003KEY.length === 8) {
            this.verificarA003(A003KEY, A003PSALF);
        }
        if (Ext.getCmp(prototype.id + '-de-txtCountry').getValue().length > 0) {
            Ext.getCmp(prototype.id + '-de-txtIATA').setReadOnly(false);
        }

        var strBank = data.A1530CIUVT;
        var strBankCode = data.A1530BANCO;
        switch (strBank) {
            case 'IAP':
                strBank = strBank + ' (04)';
                break;
            case 'ELW':
                strBank = strBank + ' (05)';
                break;
            case 'IAR':
                strBank = strBank + ' (07)';
                break;
        }
        Ext.getCmp(prototype.id + '-de-txtBank').setValue(strBank);
        meDE.strBankCode = strBankCode;
        var A1007CTATO = strBank;
        if (A1007CTATO.length === 3) {
            switch (data.A1530FUENT.trim()) {
                case 'ARC':
                    if (A1007CTATO === 'ELW (05)' || A1007CTATO === 'IAR (07)' || A1007CTATO === 'IAP (04)') {
                        //Segun la logica del flex, nunca entrara aqui porque el valor se examina cuando el numero de caracteres es 3   
                    } else {
                        Ext.getCmp(prototype.id + '-de-txtBank').setFieldStyle('background:yellow');
                    }
                    break;
                case 'MAN':
                    if (A1007CTATO === 'ELW (05)' || A1007CTATO === 'IAR (07)' || A1007CTATO === 'IAP (04)') {
                    } else {
                        this.verificarA1007(A1007CTATO);
                    }
                    break;
                default:
                    this.verificarA1007(A1007CTATO);
            }
        }

        switch (data.A1530TVENT) {
            case 'DOMESTIC':
                Ext.getCmp(prototype.id + '-de-txtSalesType').setValue('D');
                break;
            case 'INTERNATIONAL':
                Ext.getCmp(prototype.id + '-de-txtSalesType').setValue('I');
                break;
        }


        Ext.getCmp(prototype.id + '-de-txtCurrency').setValue(data.A1530MDA);
        var A006KEY = data.A1530MDA;
        if (A006KEY.length === 3) {
            this.verificarA006(A006KEY, 'currency');
        }
        switch (data.A1530STPRO) {
            case 'OPEN':
                Ext.getCmp(prototype.id + '-de-txtProStatus').setValue('0');
                break;
            case 'CLOSED':
                Ext.getCmp(prototype.id + '-de-txtProStatus').setValue('2');
                break;
        }

        var A1530TICAP = 'M';
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Guardado y validacion de valores del Data Entry">
    getDataEntryValues: function(strOption) {

        var txtProStatus = Ext.getCmp(prototype.id + '-de-txtProStatus').getValue().trim();
        var strBank = Ext.getCmp(prototype.id + '-de-txtBank').getValue().trim();
        var strBankCode = meDE.strBankCode;
        var IN_ACTION = strOption;
        var A1530CCUST = '139';
        var A1530PSVTA = Ext.getCmp(prototype.id + '-de-txtCountry').getValue().trim();
        var A1530GRUPO = Ext.getCmp(prototype.id + '-de-txtGroup').getValue().trim();
        var A1530CIUVT = strBank;
        var A1530BANCO = strBankCode;
        var A1530CSABR = Ext.getCmp(prototype.id + '-de-txtSabre').getValue().trim();
        var A1530AGENT = Ext.getCmp(prototype.id + '-de-txtIATA').getValue().trim();
        var A1530TVENT = Ext.getCmp(prototype.id + '-de-txtSalesType').getValue();
        var A1530FUENT = Ext.getCmp(prototype.id + '-de-txtSource').getValue();
        var A1530SFUEN = Ext.getCmp(prototype.id + '-de-txtChannel').getValue();
        var A1530TICAP = 'M';
        var A1530STVOI = '';
        var A1530FCONT = '';
        var A1530IDCON = '';
        var A1530POLGL = '';
        var A1530POLAR = '';
        var A1530POLAP = '';
        var A1530FCADE = '';
        var A1530FCAHA = '';
        var A1530FDESD = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtEndFrom').getValue(), 'Ymd');
        var A1530FHAST = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtEndTo').getValue(), 'Ymd');
        var A1530DYRI = '';
        var A1530FSQN = '';
        var A1530FPROG = '';
        var A1530FPROC = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtProcessing').getValue(), 'Ymd');
        var A1530MPROC = '';
        var A1530SPROC = '';
        var A1530CPROC = '';
        var A1530MDA = Ext.getCmp(prototype.id + '-de-txtCurrency').getValue();
        var A1530IDFIL = '';
        var A1530STPRO = Ext.getCmp(prototype.id + '-de-txtProStatus').getValue();
        var A1530STERR = '';
        var A1530STS0 = '';
        var A1530STS1 = '';
        var A1530STS2 = '';
        var A1530STS3 = '';
        if (strBank.length >= 7 && strBank.length <= 8 && (strBank.substr(0, 3) === 'IAP' || strBank.substr(0, 3) === 'ELW' || strBank.substr(0, 3) === 'IAR')) {
            if (strBank.length === 7) {
                strBankCode = strBank.substr(4, 2);
            } else if (strBank.length === 8) {
                strBankCode = strBank.substr(5, 2);
            }
            strBank = strBank.substr(0, 3);
        }


        paramsDE = {
            txtProStatus: txtProStatus,
            strBank: strBank,
            strBankCode: strBankCode,
            IN_ACTION: IN_ACTION,
            A1530CCUST: A1530CCUST,
            A1530PSVTA: A1530PSVTA,
            A1530GRUPO: A1530GRUPO,
            A1530CIUVT: A1530CIUVT,
            A1530BANCO: A1530BANCO,
            A1530CSABR: A1530CSABR,
            A1530AGENT: A1530AGENT,
            A1530TVENT: A1530TVENT,
            A1530FUENT: A1530FUENT,
            A1530SFUEN: A1530SFUEN,
            A1530TICAP: A1530TICAP,
            A1530STVOI: A1530STVOI,
            A1530FCONT: A1530FCONT,
            A1530IDCON: A1530IDCON,
            A1530POLGL: A1530POLGL,
            A1530POLAR: A1530POLAR,
            A1530POLAP: A1530POLAP,
            A1530FCADE: A1530FCADE,
            A1530FCAHA: A1530FCAHA,
            A1530FDESD: A1530FDESD,
            A1530FHAST: A1530FHAST,
            A1530DYRI: A1530DYRI,
            A1530FSQN: A1530FSQN,
            A1530FPROG: A1530FPROG,
            A1530FPROC: A1530FPROC,
            A1530MPROC: A1530MPROC,
            A1530SPROC: A1530SPROC,
            A1530CPROC: A1530CPROC,
            A1530MDA: A1530MDA,
            A1530IDFIL: A1530IDFIL,
            A1530STPRO: A1530STPRO,
            A1530STERR: A1530STERR,
            A1530STS0: A1530STS0,
            A1530STS1: A1530STS1,
            A1530STS2: A1530STS2,
            A1530STS3: A1530STS3

        };
        console.log(paramsDE);
    },
    validateFieldsInsert: function(option) {
        this.getDataEntryValues(option);
        var msj = '';
        if (paramsDE.txtProStatus === '1') {
            msj = 'The group is readonly';
            return msj;
        }

        if (paramsDE.A1530PSVTA === '') {
            msj = 'Enter field, Country';
            return msj;
        }
        if (paramsDE.A1530AGENT === '') {
            msj = 'Enter field, IATA';
            return msj;
        }
        if (paramsDE.A1530CIUVT === '') {
            msj = 'Enter field, City/Bank';
            return msj;
        }
        if (paramsDE.A1530TVENT === '') {
            msj = 'Enter field, Sales Type';
            return msj;
        }
        if (paramsDE.A1530FDESD === '') {
            msj = 'Enter field, Ending Date From';
            return msj;
        }
        if (paramsDE.A1530FHAST === '') {
            msj = 'Enter field, Ending Date To';
            return msj;
        }
        if (paramsDE.A1530MDA === '') {
            msj = 'Enter field, Currency';
            return msj;
        }
        if (paramsDE.A1530FPROC === '') {
            msj = 'Enter field, Processing Date';
            return msj;
        }
        if (paramsDE.A1530FUENT === 'ASR') {
            if (paramsDE.A1530SFUEN === '') {
                msj = 'Enter field, Channel';
                return msj;
            } else {
                if (paramsDE.A1530CSABR === '') {
                    msj = 'Enter field, Sabre City';
                    return msj;
                }
            }
        }

        return msj;
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="CRUD">

    onSaveClick: function() {


        var msj = this.validateFieldsInsert('I');
        if (msj.trim() !== '') {
            global.Msg({
                msg: msj
            });
        }
        else {

            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.crud();
                    }
                }
            });
        }
    },
    onUpdateClick: function() {


        var msj = this.validateFieldsInsert('U');
        if (msj.trim() !== '') {
            global.Msg({
                msg: msj
            });
        }
        else {

            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.crud();
                    }
                }
            });
        }
    },
    onDeleteClick: function() {


        this.getDataEntryValues('D');
        var msj = '';
        if (paramsDE.txtProStatus === '1') {
            msj = 'The group is readonly';
            global.Msg({
                msg: msj
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to Delete record?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function() {

        Ext.Ajax.request({
            url: this.urlWin01 + '/setGroup',
            method: 'POST',
            timeout: 60000000,
            params: paramsDE,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.objRtn;
                var msj = data.dbException.MESSAGE;
                var sqlCode = data.dbException.SQLCODE;
                if (sqlCode !== '0') {
                    global.Msg({
                        msg: msj

                    });
                } else {
                    global.Msg({
                        msg: msj,
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                }
            }
        });
    },
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    // </editor-fold>


});


