
Ext.define('Ext.Praxis.controller.payments.BankStatementExtract.DataEntryBankStatementExtractController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBankStatementExtractController',
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
    init: function(view) {
        prototype.id = 'BankStatementExtractForm';
        prototype.url = CONTEXTPATH + '/BankStatementExtract';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
    },
    afterRender: function() {
        this.mostrarData();
        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-update').show();
        Ext.getCmp(prototype.id + '-btn-delete').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').show();

        
    },
    mostrarData: function() {
//        console.log(this.beanResult);
        this.setValue('valueDate', this.bean.FECRFILE);
        this.setValue('processor', this.bean.CODEPROC);
        this.setValue('state', this.bean.STATP);
        
        this.setValue('message', this.bean.MENSA);
        this.setValue('hostShipping', this.bean.HOSEND);
        this.setValue('dateCreate', this.bean.FECR);
        
        this.setValue('creationTime', this.bean.HOCR);
        this.setValue('dateReceived', this.bean.FERECV);
        this.setValue('hourReceived', this.bean.HORECV);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        
        //Llenando el nuevo valor del comentario =======
        beanTemp.MENSA = this.getValue("message");
        
        //Guardando valores originales =========================
        beanTemp.FECRFILE = this.bean.FECRFILE;
        beanTemp.CODEPROC = this.bean.CODEPROC;
        beanTemp.STATP = this.bean.STATP;
        beanTemp.HOSEND = this.bean.HOSEND;
        beanTemp.FECR = this.bean.FECR;
        beanTemp.HOCR = this.bean.HOCR;
        beanTemp.FERECV = this.bean.FERECV;
        beanTemp.HORECV = this.bean.HORECV;
        beanTemp.CODEPROCESS = this.bean.CODEPROCESS;
        
    },
    toUpperCase: function(obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
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
                        this.maintenanceBean(beanTemp);
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
//                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        this.llenarData(beanTemp);
                        beanTemp.option = 'U';
                        var msjResult = this.validacionUpdate(beanTemp);
			var comentario = this.getValue('message');
                        if(msjResult === ''){
                            if(comentario !== ''){
                                this.executeOption(beanTemp);
                            }else{
                                global.Msg({msg: 'Comment field is required.'});
//                                Ext.getCmp(prototype.id + '-de-txtComment').focus(false, 200);
                            }
			}else{
                            global.Msg({msg: msjResult});
			}
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
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>
    
    validacionUpdate: function(btn) {
        var msjResult = '';
        return msjResult;
    },
    
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    executeOption: function(beanTemp) {
        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp)},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-buttonLog').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
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
        if (this.getValue("txtCODSOUR") == '') {
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
    }
// </editor-fold>
});