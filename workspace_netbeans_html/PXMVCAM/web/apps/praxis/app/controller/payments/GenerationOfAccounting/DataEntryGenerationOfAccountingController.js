Ext.define('Ext.Praxis.controller.payments.GenerationOfAccounting.DataEntryGenerationOfAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryGenerationOfAccountingController',
    bean: {},
    init: function (view) {
        this.p = this.view.params;
        this.bean = this.p.rec;
    },
    afterRender: function () {
//        console.log(this.view.params.action);
        // Solo cuando sea Form: Download
        if (this.view.params.action === 'D') {
            var panel = Ext.getCmp(prototype.id01 + '-form-radiofields');
            panel.removeAll();
            for (var i = 1; i <= parseInt(this.bean.A4556NARCH); i++) {
//                console.log('i>>' + i);
                var radioField = Ext.create({
                    xtype: 'radiofield',
                    id: prototype.id01 + '-op' + i,
                    name: prototype.id01 + '-op',
                    boxLabel: this.bean.A4556TFILE_0 + ' ' + i,
                    margin: '2 2 2 10',
                    checked: i === 1 ? true : false
                });                
                panel.add(radioField);
            }
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
//        this.setValue('de-txtCODTRAN', '');        
    },
    //</editor-fold>
    llenarData: function (beanTemp) {
        beanTemp.VP_PSTGD1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD1').getValue(), 'Ymd');
        beanTemp.VP_PSTGD2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD2').getValue(), 'Ymd');
        beanTemp.VP_TIPO = "";  
        var vl_pasaje = "X";
        var vl_carga = "X";
        var vl_correo = "X";
        var vl_ajuste = "X";
        
        var vl_ck01 = Ext.getCmp(prototype.id + '-ck01').getValue();
        var vl_ck02 = Ext.getCmp(prototype.id + '-ck02').getValue();
        var vl_ck03 = Ext.getCmp(prototype.id + '-ck03').getValue();
        var vl_ck04 = Ext.getCmp(prototype.id + '-ck04').getValue();
                
        if(vl_ck01) vl_pasaje = 'P';
        if(vl_ck02) vl_carga = 'A';
        if(vl_ck03) vl_correo = 'C'; 
        if(vl_ck04) vl_ajuste = 'J'; 
        
        beanTemp.VP_TIPO = vl_pasaje+vl_carga+vl_correo+vl_ajuste; 
       
        
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to process ?',
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
                        this.procesarArchivos(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
    },
    onDeleteClick: function (btn) {
    },
    onCancelClick: function (btn) {
        this.view.close();
        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});   
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Procesar archivos">
    procesarArchivos: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/procesarArchivos',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: beanString
                        // option: beanTemp.option
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO                           
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});   
                        var elem = document.getElementById('GenerationOfAccountingFormMsg');
                        elem.innerHTML = objRtn.dbException.MESSAGE;
                        //me.onCancelClick();                           
                    }
                });
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("PSTGD1") === '' ||
                this.getValue("PSTGD2") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    onDownloadFilesClick: function () {
//        console.log('onDownloadFilesClick');
        var NARCH = 0;
        for (var i = 1; i <= parseInt(this.bean.A4556NARCH); i++) {
            if (Ext.getCmp(prototype.id01 + '-op' + i).getValue()) {
                console.log(Ext.getCmp(prototype.id01 + '-op' + i).getValue());
                NARCH = i;
                break;
            }
        }
        //console.log(NARCH);
        this.getDownloadFileTxt01(this.bean, NARCH);

    },
    getDownloadFileTxt01: function (rec, in_NARCH) {

        var str_msg = 'Download File ' + rec.A4556TFILE_0 + ' ' + in_NARCH + '?';
        var bean = {};
        bean.IN_TIPO = rec.A4556TFILE;
        bean.IN_LEXT = in_NARCH;
        bean.FNAME = rec.A4556TFILE_0 + in_NARCH;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: str_msg,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/getDownloadFileTxt?beanString=' + encodeURI(JSON.stringify(bean)));
                }
            }
        });
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