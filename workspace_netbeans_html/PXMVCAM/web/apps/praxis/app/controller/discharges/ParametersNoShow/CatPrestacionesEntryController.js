
Ext.define('Ext.Praxis.controller.discharges.ParametersNoShow.CatPrestacionesEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id02 + '-dataEntryController',    
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
        Ext.getCmp(prototype.id02 + '-btn-update').hide();
        Ext.getCmp(prototype.id02 + '-btn-new').show();
        Ext.getCmp(prototype.id02 + '-btn-save').hide();
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
        Ext.getCmp(prototype.id02 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id02 + '-paggin').setStore(storeGridDatas);
    
    },
    onCancelClick01: function (btn) {        
        Ext.getCmp(prototype.id02 + '-CatPrestacionesEntry').close();
    },
    onDetailClick01: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        //console.log(rec);
        //var data = p.rec.data;
        Ext.getCmp(prototype.id02 + '-A3975KEY1').setValue(rec.data.A3975KEY1);
        Ext.getCmp(prototype.id02 + '-A3975KEY2').setValue(rec.data.A3975KEY2);
        Ext.getCmp(prototype.id02 + '-A3975DESC1').setValue(rec.data.A3975DESC1);
        Ext.getCmp(prototype.id02 + '-A3975STATU').setValue(rec.data.A3975STATU);
        Ext.getCmp(prototype.id02 + '-A3975REVIS').setValue(rec.data.A3975REVIS);
        Ext.getCmp(prototype.id02 + '-A3975FREVI').setValue(rec.data.A3975FREVI);
        Ext.getCmp(prototype.id02 + '-A3975HREVI').setValue(rec.data.A3975HREVI);
        Ext.getCmp(prototype.id02 + '-A3975REGIS').setValue(rec.data.A3975REGIS);
        Ext.getCmp(prototype.id02 + '-A3975FREGI').setValue(rec.data.A3975FREGI);
        Ext.getCmp(prototype.id02 + '-A3975HREGI').setValue(rec.data.A3975HREGI);
        Ext.getCmp(prototype.id02 + '-btn-update').show();
        Ext.getCmp(prototype.id02 + '-btn-new').show();
        Ext.getCmp(prototype.id02 + '-btn-save').hide();
    },
    onNewClick01: function(){        
        Ext.getCmp(prototype.id02 + '-A3975KEY1').setValue('PCC');
        Ext.getCmp(prototype.id02 + '-A3975KEY2').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975DESC1').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975STATU').setValue('A');
        Ext.getCmp(prototype.id02 + '-A3975REVIS').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975FREVI').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975HREVI').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975REGIS').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975FREGI').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975HREGI').setValue('');
        Ext.getCmp(prototype.id02 + '-A3975KEY2').focus();
        Ext.getCmp(prototype.id02 + '-btn-update').hide();
        Ext.getCmp(prototype.id02 + '-btn-new').hide();
        Ext.getCmp(prototype.id02 + '-btn-save').show();
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A3975KEY1 = Ext.getCmp(prototype.id02 + '-A3975KEY1').getValue();
        var VL_A3975KEY2 = Ext.getCmp(prototype.id02 + '-A3975KEY2').getValue();
        var VL_A3975DESC1 = Ext.getCmp(prototype.id02 + '-A3975DESC1').getValue();
        var VL_A3975STATU = Ext.getCmp(prototype.id02 + '-A3975STATU').getValue();       
        return {
            VP_ACTION: VP_ACTION,
            A3975KEY1: VL_A3975KEY1,
            A3975KEY2: VL_A3975KEY2,
            A3975DESC1: VL_A3975DESC1,
            A3975DESC2:"",                        
            A3975CANT1:0,
            A3975CANT2:0,
            A3975FECH1:"",
            A3975FECH2:"",
            A3975COME1:"",
            A3975COME2:"",
            A3975STAT1:"",
            A3975STAT2:"",
            A3975STATU: VL_A3975STATU
        };
    },
    onSaveClick01: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: '¿GUARDAR REGISTRO?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;
        var me = this;
        Ext.Ajax.request({
            url: this.url + '/set_crud_micelanea',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))
            },
            beforerequest: Ext.getCmp(prototype.id02 + '-CatPrestacionesEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id02 + '-CatPrestacionesEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO  
                        me.get_load_grid_ticket_d();
                        me.onNewClick01();
                    }
                });
            }
        });

    },
    onUpdateClick01: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    validateForm: function (params) {
        var mensaje = "";
        
        if (params.A3975KEY1 === '' ) {
            mensaje = 'INGRESE CODIGO';
            Ext.getCmp(prototype.id02 + '-A3975KEY1').focus();
            return mensaje;
        }
        if (params.A3975KEY2 === '') {
            mensaje = 'INGRESE PCC';
            Ext.getCmp(prototype.id02 + '-A3975KEY2').focus();
            return mensaje;
        }
        if (params.A3975DESC1 === '' ) {
            mensaje = 'INGRESE DESCRIPCION';
            Ext.getCmp(prototype.id02 + '-A3975DESC1').focus();
            return mensaje;
        }
        if (params.A3975STATU === '' ) {
            mensaje = 'SELECCIONE ESTADO';
            Ext.getCmp(prototype.id02 + '-A3975STATU').focus();
            return mensaje;
        }
        return mensaje;
    }
     
});
