/* global callbackMostrarData */



Ext.define('Ext.Praxis.controller.payments.EmailControl.DataEntryEmailControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEmailControlController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanTemp: {},
    beanResult: {},

    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'EmailControlForm';
        prototype.url = CONTEXTPATH + '/EmailControl';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;





//          this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#DataEntryPaymentScheduleForm-xpanel': {
//                afterrender: this.afterRender            
//            }
//
////            //-----------------Eventos Especificos -------------------    
//        });

    },

    afterRender: function () {

        this.obtainData();


        switch (this.actionCode) {


            case 'I':
//                this.setearCamposClave();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                // Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                // Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },

    obtainData: function () {

        Ext.Ajax.request({
            url: prototype.url + '/getPROCESS',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                var lstProcess = res.listaProcess;

                var storeDataProcess = Ext.create('Ext.data.Store', {
                    fields: ['PROCESS'],
                    data: lstProcess,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbPROCESSDE').bindStore(storeDataProcess);

                console.log("Procesos cargados TEST:", storeDataProcess.getData().items);

                // Ext.getCmp(prototype.id + '-cmbPROCESSDE').setValue('');

            }
        });
    },

    mostrarData: function () {




        this.setValue('cmbPROCESSDE', this.bean.PROCESS.trim());

        this.setValue('cmbSTATUSDE', this.bean.STATUS.trim());
        this.setValue('cmbROLDE', this.bean.ROL.trim());
        this.setValue('cmbTYPEDE', this.bean.PTYPE.trim());





        this.setValue('txtEMAILDE', this.bean.EMAIL.trim());




        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);



    },

    llenarData: function (beanTemp) {



        if (this.bean) {
            beanTemp.TRAN = this.bean.TRAN;
        } else {
            beanTemp.TRAN = '';
        }



        beanTemp.PROCESS = this.getValue("cmbPROCESSDE");
        beanTemp.STATUS = this.getValue("cmbSTATUSDE");
        beanTemp.ROL = this.getValue("cmbROLDE");
        beanTemp.PTYPE = this.getValue("cmbTYPEDE");
        beanTemp.EMAIL = this.getValue("txtEMAILDE");



    },

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
                    var msjResult = this.validateData(beanTemp);
                    if (msjResult === '') {
                        beanTemp.IN_OPTION = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);
                        this.MaintenanceMPF248(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },

    validateData: function (bean) {

        if (!bean.PROCESS) {
            Ext.getCmp(prototype.id + '-cmbPROCESSDE').focus();
            return 'Please select Process.';
        }

        if (!bean.STATUS) {
            Ext.getCmp(prototype.id + '-cmbSTATUSDE').focus();
            return 'Please select Status.';
        }

        if (!bean.ROL) {
            Ext.getCmp(prototype.id + '-cmbROLDE').focus();
            return 'Please select Role.';
        }

        if (!bean.PTYPE) {
            Ext.getCmp(prototype.id + '-cmbTYPEDE').focus();
            return 'Please select Type.';
        }

        if (!bean.EMAIL || bean.EMAIL.trim() === '') {
            Ext.getCmp(prototype.id + '-txtEMAILDE').focus();
            return 'Please enter Email.';
        }

        return '';
    },

    onUpdateClick: function (btn) {


        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);

                            beanTemp.IN_OPTION = 'U';
                            this.MaintenanceMPF248(beanTemp);
                        }
                    }
                });

    },

    onCancelClick: function (btn) {
        this.view.close();
    },

    MaintenanceMPF248: function (beanTemp) {

        console.log("ENTRO A MaintenanceMPF248");

        Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...');



        Ext.Ajax.request({
            url: prototype.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: Ext.encode(beanTemp)
            },

            success: function (response) {
                console.log(response.responseText);

                var res = Ext.JSON.decode(response.responseText);

                console.log(res);

                if (res.success) {

                    global.Msg({msg: res.Mensaje});

                    if (Ext.getCmp(prototype.id + '-dataEntry')) {
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                    }

                    Ext.getCmp(prototype.id + '-gridEmailControlDetail')
                            .getStore()
                            .reload();

                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },

    getValue: function (id) {
        console.log('VALIDAR ACA', prototype.id + '-' + id);
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
