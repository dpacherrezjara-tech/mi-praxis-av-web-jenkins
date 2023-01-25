//console.log('xxxxxxxxxxxxx');
Ext.define('Ext.Praxis.controller.discharges.ParametersNoShow.CatTickedDesignatorEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id01 + '-dataEntryController',    
    url: CONTEXTPATH + '/ParametersNoShow',    
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs        
        this.get_load_grid_ticket_d();
    },   
    get_load_grid_ticket_d: function () {        
        var bean = {};
        var p = this.view.params;    
        //console.log(p);
        //console.log(p.A3975KEY1.split('|'));        
        bean.VP_OPCION = "0";
        bean.VP_A3975KEY1 = p.A3975KEY1.split('|')[1];
        bean.VP_A3975KEY2 = "";
        bean.VP_A3975DESC1 = "";
        bean.limit = "-1";
        bean.page = "-1";
        //console.log('get_load_grid_ticket_d...');
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {        
            proxy: {
                url: prototype.url + '/search_tbl_micelanea'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id01 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id01 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id01 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id01 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });        
        Ext.getCmp(prototype.id01 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id01 + '-paggin').setStore(storeGridDatas);
    
    },
    onCancelClick01: function (btn) {
        //console.log('xxxxxxxxx');
        Ext.getCmp(prototype.id01 + '-CatTickedDesignatorEntry').close();
    },        
    onbtnClick_upload_file: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Cargar archivo?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.getCmp(prototype.id01 + '-btn-upload').disable(true);
                    this.uploadFile_excel();
                }
            }
        });
    },
    uploadFile_excel:function(){
       var me = this;
        var file = Ext.getCmp(prototype.id01 + '-file').getValue();
        //console.log('file>' + file);
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Seleccione archivo", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id01 + '-file').focus();", 100);
            });
            return;
        }
        var VL_ACTION = 'R';//BORRAR Y CARGAR NUEVAMENTE
        if (Ext.getCmp(prototype.id01 + '-load_opt_chk').getValue())
            VL_ACTION = 'M'; //MANTENER REGISTROS QUE EXISTEN
        var p = this.view.params;    
        //console.log(p);        
        var vparams = {
            VP_ACTION: VL_ACTION,            
            VP_A3975KEY1: p.A3975KEY1.split('|')[1]
        };
        var form = Ext.getCmp(prototype.id01 + '-form').getForm();
        form.submit({
            url: prototype.url + '/upload_ticket_desig',
            waitMsg: 'Uploading...',
            params: vparams,
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id01 + '-btn-upload').enable(true);
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {                                               
                        me.get_load_grid_ticket_d();
                    }
                });
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        }); 
    }
     // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
//    pagFirst: function(obj, e) {
//        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin').moveFirst();
//        }
//    },
//    pagPrevious: function(obj, e) {
//        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin').movePrevious();
//        }
//    },
//    pagNext: function(obj, e) {
//        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin').moveNext();
//        }
//    },
//    pagLast: function(obj, e) {
//        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin').moveLast();
//        }
//    },
    // </editor-fold>
});
