/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteContratoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id02 + '-dataEntryContratoController',
    url: CONTEXTPATH + '/CatalogoCliente',   
    init: function () {
        //var me = this;
    },    
    afterRender: function () {
        //SET store Grid
        var p = this.view.params;                
        Ext.getCmp(prototype.id02 + '-A4007CDCLI').setValue(p.rec.CDCLI);
        var grid01 = Ext.getCmp(prototype.id02 + '-gridData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataContrato', {});
        grid01.setStore(storeGridDatas);
        this.getDataInputs();        
        Ext.getCmp(prototype.id02 + '-btn-delete').hide();
        Ext.getCmp(prototype.id02 + '-btn-update').hide();
        Ext.getCmp(prototype.id02 + '-btn-save').hide();
        Ext.getCmp(prototype.id02 + '-btn-new').show();
        Ext.getCmp(prototype.id02 + '-btn-cancel').hide();
        Ext.getCmp(prototype.id02 + '-btn-edit').hide();                
    },
    onNewClick_id02: function () {
        //boton logo
        this.get_ClearField();
        Ext.getCmp(prototype.id02 + '-btn-delete').hide();
        Ext.getCmp(prototype.id02 + '-btn-update').hide();
        Ext.getCmp(prototype.id02 + '-btn-new').hide();
        Ext.getCmp(prototype.id02 + '-btn-save').show();
        Ext.getCmp(prototype.id02 + '-btn-cancel').show(); 
        Ext.getCmp(prototype.id02 + '-A4007CONTR').focus();
    },
    onCancelClick_id02:function(){
        Ext.getCmp(prototype.id02 + '-btn-delete').hide();
        Ext.getCmp(prototype.id02 + '-btn-update').hide();
        Ext.getCmp(prototype.id02 + '-btn-save').hide();
        Ext.getCmp(prototype.id02 + '-btn-new').show();
        Ext.getCmp(prototype.id02 + '-btn-cancel').hide();
    },
    onEditClick_id02:function(){
        Ext.getCmp(prototype.id02 + '-btn-delete').show();
        Ext.getCmp(prototype.id02 + '-btn-update').show();
        Ext.getCmp(prototype.id02 + '-btn-cancel').show();
        Ext.getCmp(prototype.id02 + '-btn-save').hide();
        Ext.getCmp(prototype.id02 + '-btn-new').hide();
        Ext.getCmp(prototype.id02 + '-btn-edit').hide();
        Ext.getCmp(prototype.id02 + '-A4007CONTR').focus();
    },
    getDataInputs: function () {      
        this.search_contrato();
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A4007CDCLI = Ext.getCmp(prototype.id02 + '-A4007CDCLI').getValue();
        var VL_A4007CONTR = Ext.getCmp(prototype.id02 + '-A4007CONTR').getValue();
        var VL_A4007DESCR = Ext.getCmp(prototype.id02 + '-A4007DESCR').getValue();
        var VL_A4007TCTR = Ext.getCmp(prototype.id02 + '-A4007TCTR').getValue();        
        var VL_A4007FALTA = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-A4007FALTA').getValue(), 'Ymd');
        var VL_A4007FBAJA = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-A4007FBAJA').getValue(), 'Ymd');       
        return {
            VP_ACTION: VP_ACTION,
            A4007CDCLI: VL_A4007CDCLI,
            A4007CONTR: VL_A4007CONTR,
            A4007DESCR: VL_A4007DESCR,
            A4007TCTR: VL_A4007TCTR,            
            A4007FALTA: VL_A4007FALTA,
            A4007FBAJA: VL_A4007FBAJA
        };
    },
    onSaveClick_id02: function (btn) {
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
                msg: 'Are you sure to insert?',
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
            url: this.url + '/ContratoCrud',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))                
            },
            beforerequest: Ext.getCmp(prototype.id02 + '-CatalogoClienteContrato').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id02 + '-CatalogoClienteContrato').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {                                                
                        me.search_contrato();
                    }
                });
            }
        });

    },
    onUpdateClick_id02: function (btn) {
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
    onDeleteClick_id02: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
//    onCancelClick: function (btn) {
//        Ext.getCmp(prototype.id + '-CatalogoClienteEntry').close();
//    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    validateForm: function (params) {
//        console.log(params);
        var mensaje = "";
        if (params.A4007CONTR === '') {
            mensaje = 'INGRESE CONTRATO';
            Ext.getCmp(prototype.id02 + '-A4007CONTR').focus();
            return mensaje;
        }
        if (params.A4007DESCR === '') {
            mensaje = 'INGRESE DESCRIPCION DE CONTRATO';
            Ext.getCmp(prototype.id02 + '-A4007DESCR').focus();
            return mensaje;
        }
        if (params.A4007TCTR === '' || params.A4007TCTR === null ) {
            mensaje = 'SELECCIONE TIPO';
            Ext.getCmp(prototype.id02 + '-A4007TCTR').focus();
            return mensaje;
        }
        if (params.A4007FALTA === '' ) {
            mensaje = 'SELECCIONE FECHA DE ALTA';
            Ext.getCmp(prototype.id02 + '-A4007FALTA').focus();
            return mensaje;
        }       
        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS                                
        Ext.getCmp(prototype.id02 + '-A4007CONTR').setValue('');
        Ext.getCmp(prototype.id02 + '-A4007DESCR').setValue('');
        Ext.getCmp(prototype.id02 + '-A4007TCTR').setValue('O');
        Ext.getCmp(prototype.id02 + '-A4007FALTA').setValue(new Date());
        Ext.getCmp(prototype.id02 + '-A4007FBAJA').setValue('20991231');
        Ext.getCmp(prototype.id02 + '-A4007REGIS').setValue('');
        Ext.getCmp(prototype.id02 + '-A4007FREGI').setValue('');
        Ext.getCmp(prototype.id02 + '-A4007HREGI').setValue('');        
        Ext.getCmp(prototype.id02 + '-A4007REVIS').setValue('');
        Ext.getCmp(prototype.id02 + '-A4007FREVI').setValue('');
        Ext.getCmp(prototype.id02 + '-A4007HREVI').setValue('');        
    },    
    search_contrato: function ( ) {
        var bean = {};        
        bean.VP_A4007CDCLI = Ext.getCmp(prototype.id02 + '-A4007CDCLI').getValue();
        bean.VP_A4007CONTR = "";
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {
            proxy: {
                url: prototype.url + '/search_contrato'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'No hay registro de contratos'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id02 + '-contenedor-grid-contrato');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id02 + '-info-contrato',
            id: prototype.id02 + '-content-info-contrato'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id02 + '-gridData').setStore(storeGridDatas);
    },
    PadLeft: function (number, width) {
        width -= number.toString().length;
        if (width > 0){
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // siempre devuelve tipo cadena
    },
    onEditClickContrato:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        //console.log(rec); 
        Ext.getCmp(prototype.id02 + '-A4007CDCLI').setValue(rec.data.A4007CDCLI);
        Ext.getCmp(prototype.id02 + '-A3953RSOCI').setValue( Ext.getCmp(prototype.id + '-A3953RSOCI').getValue().trim());
        Ext.getCmp(prototype.id02 + '-A4007CONTR').setValue(rec.data.A4007CONTR);
        Ext.getCmp(prototype.id02 + '-A4007DESCR').setValue(rec.data.A4007DESCR);
        Ext.getCmp(prototype.id02 + '-A4007TCTR').setValue(rec.data.A4007TCTR);
        Ext.getCmp(prototype.id02 + '-A4007FALTA').setValue(rec.data.A4007FALTA);
        Ext.getCmp(prototype.id02 + '-A4007FBAJA').setValue(rec.data.A4007FBAJA);
        //datos audit
        Ext.getCmp(prototype.id02 + '-A4007REGIS').setValue(rec.data.A4007REGIS);
        Ext.getCmp(prototype.id02 + '-A4007FREGI').setValue(rec.data.A4007FREGI);
        Ext.getCmp(prototype.id02 + '-A4007HREGI').setValue(rec.data.A4007HREGI);
        Ext.getCmp(prototype.id02 + '-A4007REVIS').setValue(rec.data.A4007REVIS);
        Ext.getCmp(prototype.id02 + '-A4007FREVI').setValue(rec.data.A4007FREVI);
        Ext.getCmp(prototype.id02 + '-A4007HREVI').setValue(rec.data.A4007HREVI);
        //
        Ext.getCmp(prototype.id02 + '-btn-edit').show();                
    }

});



