Ext.define('Ext.Praxis.controller.sales.LoadCommissionADMACM.DataEntryLoadCommissionADMACMController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadCommissionADMACMController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    me: '',
    nRowUpd: '',
    // </editor-fold>
    init: function(view) {
        me = this;
    },
    afterRender: function(){
        this.setGridData();
    },
    onAgregarCOMMIClick: function(obj, nRow, obj, cmp, constructor) {
        var data = constructor.record.data;
        this.setValue('txtdate', data.A2960FPERI);
        this.setValue('txtlote', data.A2960LOTE);
        this.setValue('txtpais', data.A2960PAIVT);
        this.setValue('txtscheme', data.A2960CODAC);
        this.setValue('txttype', data.IN_SELET_TYPE.trim());
        this.nRowUpd = nRow;
    },
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onLoadClick: function() {
        var txtdate = this.getValue('txtdate');
        if (txtdate!=='') {
            var anio = txtdate.substring(0,4);
            var mes = txtdate.substring(4,6);
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.setFormatParameter(mes, anio);
                        this.getLoadCommiADMACM();
                    }
                }
            });
        } else global.Msg({ msg: 'Required Field, Period' });
    },
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(mes, anio) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtdate = this.getValue("txtdate");
        var txtlote = this.getValue("txtlote");
        var txttype = this.getValue("txttype");
        var txtpais = this.getValue("txtpais");
        var txtscheme = this.getValue("txtscheme");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_DATEFROM: txtdate+'01',
            IN_DATETO: txtdate+this.btnDias_clickHandler(mes, anio),
            IN_DATEPER1: txtdate,
            IN_LOTE: txtlote,
            IN_IATA: '',
            IN_SELET_TYPE: txttype,
            IN_SELET_BASE: 'A',
            IN_PAIS:txtpais,
            IN_CODAC:txtscheme
        };
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadCommissionADMACM.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {
                        IN_OPTION: '5', IN_DATEFROM: '', IN_DATETO: '',
                        IN_SELET_TYPE: '', IN_DATEPER1: '', IN_DATEPER2: ''
                    };
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2960Filter");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridGP').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    getLoadCommiADMACM: function() {
       
        Ext.Ajax.request({
            url: prototype.url+'/getLoadCommiADMACM',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp('DataEntryLoadCommissionADMACMForm').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    //console.log(res.sesion);
                    
                    //global.Msg({ msg: res.session });
                    //var mensaje = res.sesion;
                    if (res.sesion==='The record was saved successfully.') {
                        me.setGridData();
                        //var store = Ext.getCmp(prototype.id + '-gridGP').getStore();
                        //var rec = store.getAt(me.nRowUpd);
                        Ext.getCmp(prototype.id + '-txtdate').setValue('');
                        Ext.getCmp(prototype.id + '-txtlote').setValue('');
                        Ext.getCmp(prototype.id + '-txttype').setValue(''); 
                        Ext.getCmp(prototype.id + '-txtscheme').setValue('');
                        Ext.getCmp(prototype.id + '-txtpais').setValue('');
                        global.Msg({ msg: res.sesion });
                    }
                } else global.Msg({ msg: res.session });
                Ext.getCmp('DataEntryLoadCommissionADMACMForm').unmask();
            },
            failure: function(response, opts) {
                Ext.getCmp('DataEntryLoadCommissionADMACMForm').unmask();
            }
        });
    },
    
    btnDias_clickHandler: function(mes, anio) {
        var mes = Number(mes);
        var anno = Number(anio);
        switch (mes) {
            case 1 : case 3 : case 5 : case 7 : case 8 : case 10 : case 12 : return 31;
            case 2 : return (anno % 4 === 0) ? 29 : 28; break;
            default: return 30;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});