Ext.define('Ext.Praxis.controller.payments.RegistrationOfAccounting.DataEntryRegistrationOfAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRegistrationOfAccountingController',
    bean: {},
    init: function (view) {
        this.p = this.view.params;
        this.bean = this.p.rec;
    },
    afterRender: function () {
//        console.log(this.view.params.action);
//        
        if (this.view.params.action === 'R') {
            Ext.getCmp(prototype.id + '-dataEntry').setTitle('Reverting');
        }
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
        // Asignar fecha de inicio = Primer dia del semestre
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var startMonth = 0;
        if (currentMonth >= 6 ) {
            startMonth = currentMonth - 6;
        } else {
            startMonth = 0;
        }
        Ext.getCmp(prototype.id + '-PSTGD1').setValue(new Date(currentYear, startMonth, 01));
        
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
//        this.setValue('de-txtCODTRAN', '');        
    },
    //</editor-fold>
    cmbModo_clickHandler: function () {
        var vl_op01 = Ext.getCmp(prototype.id + '-op01').getValue();
        var vl_op02 = Ext.getCmp(prototype.id + '-op02').getValue();
        
        if (vl_op01) {
            //Ext.getCmp(prototype.id + '-op02').setValue(false);
            Ext.getCmp(prototype.id + '-cmb02').setVisible(false);
        }
        else if (vl_op02) {
            //Ext.getCmp(prototype.id + '-op01').setValue(false);
            Ext.getCmp(prototype.id + '-cmb02').setVisible(true);
        }
        
        
    },
    llenarData: function (beanTemp) {
//        beanTemp.VP_FECHA_INI = beanTemp.VP_FECHA_FIN !== "" ? beanTemp.VP_FECHA_FIN.substring(0,4) + '0101' : "";
        beanTemp.VP_FECHA_INI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD1').getValue(), 'Ymd');
        beanTemp.VP_FECHA_FIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD2').getValue(), 'Ymd');
        beanTemp.VP_FECHA_CIE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD3').getValue(), 'Ymd');
        beanTemp.VP_USER      = Ext.getCmp(prototype.id + '-USER').getValue() + '                       ';
        beanTemp.VP_USER      = beanTemp.VP_USER.substring(0,20);
        beanTemp.VP_TIPO = "";
        
        // Modo
        var vl_mode = "X";
        // Adicional
        var vl_additional = "X";
        // Procesador
        var vl_processor = "XX";
        
        var vl_op01 = Ext.getCmp(prototype.id + '-op01').getValue();
        var vl_op02 = Ext.getCmp(prototype.id + '-op02').getValue();
        
        var vl_cmb01 = Ext.getCmp(prototype.id + '-cmb01').getValue();
        var vl_cmb02 = Ext.getCmp(prototype.id + '-cmb02').getValue();
          
        // Se asignan valores
        if(vl_op01) vl_mode = 'C';
        if(vl_op02) vl_mode = 'E';

        if(vl_cmb01) vl_additional = vl_cmb01;
        if(vl_cmb01 === 'D' && vl_mode === 'E') vl_additional = 'B';
        if(vl_cmb02 && vl_mode === 'E') vl_processor = vl_cmb02;

        beanTemp.VP_TIPO = vl_mode + vl_additional + vl_processor;
       
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
                        if (this.view.params.action === 'I')
                            this.cargarArchivos(beanTemp);
                        if (this.view.params.action === 'R')
                            this.reversarContabilidad(beanTemp);
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

    //<editor-fold defaultstate="collapsed" desc="Cargar archivos">
    cargarArchivos: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/cargarArchivos',
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
                        var elem = document.getElementById('RegistrationOfAccountingFormMsg');
                        elem.innerHTML = objRtn.dbException.MESSAGE;
                        //me.onCancelClick();                           
                    }
                });
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Revertir archivos">
    reversarContabilidad: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/reversarContabilidad',
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
                        var elem = document.getElementById('RegistrationOfAccountingFormMsg');
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
            this.getValue("PSTGD2") === '' ||
            this.getValue("PSTGD3") === '' ||
            this.getValue("USER") === '' ) {
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