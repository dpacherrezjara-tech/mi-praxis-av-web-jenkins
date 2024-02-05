Ext.define('Ext.Praxis.controller.payments.GenerationOfAccounting.DataEntryGenerationOfAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryGenerationOfAccountingController',            
    bean: {},                
    init: function(view) {
        
    },
    afterRender: function() {
        
    },        
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
//        this.setValue('de-txtCODTRAN', '');        
    },
    //</editor-fold>
    llenarData: function(beanTemp) {        
        beanTemp.VP_PSTGD1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD1').getValue(), 'Ymd');
        beanTemp.VP_PSTGD2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-PSTGD2').getValue(), 'Ymd');
        beanTemp.VP_TIPO = "*";  //ALL              
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to process ?',
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
                        this.procesarArchivos(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });         
    },
    onUpdateClick: function(btn) {
//        Ext.Msg.show(
//            {
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to update ?',
//                buttons: Ext.MessageBox.YESNO,
//                scope: this,
//                animateTarget: btn,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function(btn) {
//                    if (btn === 'yes') {
//                        var beanTemp = {};
//                        this.llenarData(beanTemp);
//                        beanTemp.option = 'U';
//                        this.maintenanceBean(beanTemp);
//                    }
//                }
//            });
    },
    onDeleteClick: function(btn) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Are you sure to delete ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'yes') {
//                    var beanTemp = {};
//                    this.llenarData(beanTemp);
//                    beanTemp.option = 'D';
//                    this.maintenanceBean(beanTemp);
//                }
//            }
//        });
    },
    onCancelClick: function(btn) {
        this.view.close();
        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});   
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Procesar archivos">
    procesarArchivos: function(beanTemp) {
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
            success: function(response, opts) {                
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

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("PSTGD1") === '' || 
            this.getValue("PSTGD2") === '' ) {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
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