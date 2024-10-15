Ext.define('Ext.Praxis.controller.payments.GenerationOfAccounting.DataEntryGenerationOfAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryGenerationOfAccountingController',
    bean: {},
    init: function (view) {
        this.p = this.view.params;
        this.bean = this.p.rec;
    },
    afterRender: function () {
        this.loadProcessors();
        //this.getCustomer();
        // Download
        if (this.view.params.action === 'D') {
            var panel = Ext.getCmp(prototype.id01 + '-form-radiofields');
            panel.removeAll();
            for (var i = 1; i <= parseInt(this.bean.A4556NARCH); i++) {
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
        
        // Reversar
        if (this.view.params.action === 'R') {
            Ext.getCmp(prototype.id + '-dataEntry').setTitle('Reverting');
        }
    },
    //</editor-fold>
    loadProcessors: function() {
        var processors = new Array();
//        var paises = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/loadProcessors',
            method: 'POST',
            timeout: 60000,
            autoLoad: true,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;

                data.forEach(function callback(record, index, array) {
                    processors.push([record.A051KEY2, record.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'processors', autoLoad: true, data: processors, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmb02').bindStore(store);
            },
            failure: function(response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

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
        
        beanTemp.VP_CCUST = Ext.getCmp(prototype.id + '-CCUST').getValue();
        beanTemp.VP_FECHA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD').getValue(), 'Ymd');
        beanTemp.VP_TIPO = "";
        
        // Modo
        var vl_mode = "X";
        // Adicional
        var vl_additional = "X";
        // Procesador
        var vl_processor = "   ";
        
        var vl_op01 = Ext.getCmp(prototype.id + '-op01').getValue();
        var vl_op02 = Ext.getCmp(prototype.id + '-op02').getValue();
        
        var vl_cmb01 = Ext.getCmp(prototype.id + '-cmb01').getValue();
        var vl_cmb02 = Ext.getCmp(prototype.id + '-cmb02').getValue();
          
          // Se asignan valores
          if(vl_op01) vl_mode = 'C';
          if(vl_op02) vl_mode = 'E';
          
          if(vl_cmb01) vl_additional = vl_cmb01;
          if(vl_cmb02) vl_processor = vl_cmb02;
          
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
                            this.procesarArchivos(beanTemp);
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

    //<editor-fold defaultstate="collapsed" desc="Procesar archivos">
    procesarArchivos: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/procesarArchivos',
            method: 'POST',
            timeout: 60000,
            params: {
                beanString: beanString
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () { 
                        var elem = document.getElementById('GenerationOfAccountingFormMsg');
                        elem.innerHTML = objRtn.dbException.MESSAGE;                        
                    }
                });
            },
            error: function(){
                // will fire when timeout is reached
                global.Msg({
                    msg: "Server Timeout",
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () { 
                        var elem = document.getElementById('GenerationOfAccountingFormMsg');
                        elem.innerHTML = "Server Timeout";                       
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
            url: prototype.url + '/reversar',
            method: 'POST',
            timeout: 60000,
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
            },
            error: function(){
                // will fire when timeout is reached
                global.Msg({
                    msg: "Server Timeout",
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () { 
                        var elem = document.getElementById('GenerationOfAccountingFormMsg');
                        elem.innerHTML = "Server Timeout";                       
                    }
                });
            }
        });
    },
    //</editor-fold>
    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("PSTGD") === '' ) {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    onDownloadFilesClick: function () {

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

        var str_msg = 'Download File ' + rec.A4556TFILE_0 + ' ' + rec.A4556CPROC.trim() + ' ' + in_NARCH + '?';
        var bean = {};
        bean.IN_TIPO = rec.A4556TFILE;
        bean.IN_PROCESA = rec.A4556CPROC;
        bean.IN_LEXT = in_NARCH;
        if (rec.A4556CPROC.trim() !== '')
            bean.FNAME = rec.A4556FFILE + '_' + rec.A4556CCUST + '_' + rec.A4556TFILE_0 + '_' + rec.A4556CPROC.trim() + '_' + in_NARCH;
        else
            bean.FNAME = rec.A4556FFILE + '_' + rec.A4556CCUST + '_' + rec.A4556TFILE_0 + '_' + in_NARCH;

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