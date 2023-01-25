Ext.define('Ext.Praxis.controller.flown.CodesAncillaries.DataEntryCodesAncillariesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCodesAncillariesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'CodesAncillariesForm';
        prototype.url = CONTEXTPATH + '/CodesAncillaries';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        this.obtainData();
    },
    afterRender: function () {
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
        // global.AccessControlMaganer();
    },
    obtainData: function () {

        var txtA051STATUS = Ext.getCmp(prototype.id + '-de-txtA051STATUS');
        txtA051STATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "ACTIVED"],
                ["D", "DISABLED"]
            ]
        }));
        txtA051STATUS.setValue('A');
    },
    mostrarData: function () {
        this.setValue('de-txtCODEM', this.beanResult.CODEM);
        this.setValue('de-txtDESCR', this.beanResult.DESCR);
//        this.setValue('de-txtRSOCIAL', this.beanResult.RSOCIAL);
//        this.setValue('de-txtCIATA', this.beanResult.CIATA);
//        this.setValue('de-txtCANAL', this.beanResult.CANAL);
//        this.setValue('de-txtNameIATA', this.beanResult.strDescrip);
//        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
//        this.setValue('de-txtNameCTRY', this.beanResult.strDescripCtry);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },

    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        var msj = '';

        beanTemp.A051KEY1 = 'CE';
        beanTemp.A051KEY2 = this.getValue("de-txtCodeAncillarie");
        beanTemp.A051DESCR1 = this.getValue("de-txtDesciption").trim();
        beanTemp.A051DESCR2 = 'PSV';
        beanTemp.A051CANTI1 = 0;
        beanTemp.A051CANTI2 = 0;
        beanTemp.A051FECHA1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtA051FECHA1').getValue(), 'Ymd');
        beanTemp.A051FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtA051FECHA2').getValue(), 'Ymd');
        beanTemp.A051COMENT = this.getValue("txtUSCR").trim() + '|' +
                this.getValue("txtFECR").trim() + '|' +
                this.getValue("txtHOCR").trim() + '|' +
                this.getValue("txtUSUP").trim() + '|' +
                this.getValue("txtFEUP").trim() + '|' +
                this.getValue("txtHOUP").trim();
        beanTemp.A051STATUS = this.getValue("de-txtA051STATUS");

        if (beanTemp.A051KEY2 === '') {
//            global.Msg({msg: 'Required Field, Code Ancillarie'});
            msj = 'Required Field, Code Ancillarie';
//            Ext.getCmp(prototype.id + '-txtCodeAncillarie').focus(false, 100);
//            return ;
        }
        if (beanTemp.A051FECHA1 === '') {
//            global.Msg({msg: 'Required Field, Effective Date From'});
            msj = 'Required Field, Effective Date From';
//            Ext.getCmp(prototype.id + '-txtA051FECHA1').focus(false, 100);
//            return ;
        }
        if (beanTemp.A051FECHA2 === '') {
//            global.Msg({msg: 'Required Field, Effective Date To'});
            msj = 'Required Field, Effective Date To';
//            Ext.getCmp(prototype.id + '-txtA051FECHA2').focus(false, 100);
//            return ;
        }

        return msj;
    },
    getData: function () {
        var data = meDE.bean.data;
        this.setValue('de-txtCodeAncillarie', data.A051KEY2.trim());
        this.setValue('de-txtDesciption', data.A051DESCR1.trim());
        this.setValue('de-txtA051FECHA1', data.A051FECHA1);
        this.setValue('de-txtA051FECHA2', data.A051FECHA2);
        if (data.A051STATUS.trim() === 'ACTIVED') {
            this.setValue('de-txtA051STATUS', 'A');
        } else {
            this.setValue('de-txtA051STATUS', 'D');
        }

        var rutaFile = data.A051COMENT.split('|');
        this.setValue('txtUSCR', rutaFile[0]);
        this.setValue('txtFECR', rutaFile[1]);
        this.setValue('txtHOCR', rutaFile[2]);
        this.setValue('txtUSUP', rutaFile[3]);
        this.setValue('txtFEUP', rutaFile[4]);
        this.setValue('txtHOUP', rutaFile[5]);

    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
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
    toUpperCase: function (obj, value, opts) {
        console.log(obj);
        console.log(value);
        console.log(opts);
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
                    var msjResult = this.llenarData(beanTemp);
                    console.log(msjResult);
                    if (msjResult === '') {
                        beanTemp.VP_ACTION = 'I';
                        this.setPX520S01A051(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
//                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        var msjResult = this.llenarData(beanTemp);
                        console.log(msjResult);
                        if (msjResult === '') {
                            beanTemp.VP_ACTION = 'U';
                            this.setPX520S01A051(beanTemp);
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
                    beanTemp.A051KEY1 = 'CE';
                    beanTemp.A051KEY2 = this.getValue("de-txtCodeAncillarie");
                    beanTemp.VP_ACTION = 'D';
                    this.setPX520S01A051(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    setPX520S01A051: function (beanTemp) {
        console.log('setPX520S01A051');
        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/setPX520S01A051',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
//                    global.Msg({msg: res.MESSAGE});
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.MESSAGE,
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                if (res.SQLCODE.toString() === '0') {
                                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                                    Ext.getCmp(prototype.id + '-dataEntry').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                } else {
//                                    set_Handler_form();
                                    console.log('yei');
                                }
                            }
                        }
                    });
                } else
                    global.Msg({msg: res.Mensaje});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEM") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-de-txtCODEM').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
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